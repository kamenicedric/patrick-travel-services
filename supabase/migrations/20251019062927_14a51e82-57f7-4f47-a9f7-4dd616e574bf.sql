



-- Créer les types enum
CREATE TYPE public.app_role AS ENUM ('admin', 'client');
CREATE TYPE public.dossier_status AS ENUM ('en_attente', 'en_cours', 'approuve', 'rejete', 'complete');

-- Table profiles pour informations utilisateurs
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nom TEXT,
  prenom TEXT,
  telephone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Table user_roles pour gestion des rôles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Fonction pour vérifier si un utilisateur a un rôle
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins peuvent voir tous les rôles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Table dossiers pour les demandes d'immigration
CREATE TABLE public.dossiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT,
  pays_destination TEXT,
  type_visa TEXT,
  status dossier_status NOT NULL DEFAULT 'en_attente',
  date_soumission TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_derniere_mise_a_jour TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes_admin TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.dossiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own dossiers"
  ON public.dossiers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own dossiers"
  ON public.dossiers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dossiers"
  ON public.dossiers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all dossiers"
  ON public.dossiers FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all dossiers"
  ON public.dossiers FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Table documents pour fichiers uploadés
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id UUID REFERENCES public.dossiers(id) ON DELETE CASCADE NOT NULL,
  nom_fichier TEXT NOT NULL,
  type_document TEXT,
  url_fichier TEXT NOT NULL,
  taille_fichier INTEGER,
  uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view documents of own dossiers"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.dossiers
      WHERE dossiers.id = documents.dossier_id
      AND dossiers.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents to own dossiers"
  ON public.documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.dossiers
      WHERE dossiers.id = documents.dossier_id
      AND dossiers.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all documents"
  ON public.documents FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload documents"
  ON public.documents FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Table messages pour la messagerie
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id UUID REFERENCES public.dossiers(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contenu TEXT NOT NULL,
  lu BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages of own dossiers"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.dossiers
      WHERE dossiers.id = messages.dossier_id
      AND dossiers.user_id = auth.uid()
    ) OR auth.uid() = sender_id
  );

CREATE POLICY "Users can send messages to own dossiers"
  ON public.messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.dossiers
      WHERE dossiers.id = messages.dossier_id
      AND dossiers.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all messages"
  ON public.messages FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can mark own messages as read"
  ON public.messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.dossiers
      WHERE dossiers.id = messages.dossier_id
      AND dossiers.user_id = auth.uid()
    )
  );

-- Créer le bucket pour les documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Politiques de stockage pour les documents
CREATE POLICY "Users can view documents in own dossiers"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents' AND
    (
      auth.uid()::text = (storage.foldername(name))[1] OR
      public.has_role(auth.uid(), 'admin')
    )
  );

CREATE POLICY "Users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can upload any document"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Fonction pour créer un profil automatiquement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nom, prenom)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'nom',
    NEW.raw_user_meta_data->>'prenom'
  );
  
  -- Assigner le rôle client par défaut
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');
  
  RETURN NEW;
END;
$$;

-- Trigger pour créer automatiquement le profil
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger pour profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger pour dossiers
CREATE TRIGGER update_dossiers_updated_at
  BEFORE UPDATE ON public.dossiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Activer realtime pour messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;