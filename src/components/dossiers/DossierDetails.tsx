import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, FileText, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DocumentUpload from "./DocumentUpload";
import MessageriePanel from "./MessageriePanel";

interface DossierDetailsProps {
  dossier: any;
  onBack: () => void;
}

const statusColors: Record<string, string> = {
  en_attente: "bg-muted text-muted-foreground",
  en_cours: "bg-accent text-accent-foreground",
  approuve: "bg-gradient-success text-primary-foreground",
  rejete: "bg-destructive text-destructive-foreground",
  complete: "bg-secondary text-secondary-foreground",
};

const statusLabels: Record<string, string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  approuve: "Approuvé",
  rejete: "Rejeté",
  complete: "Complété",
};

const DossierDetails = ({ dossier, onBack }: DossierDetailsProps) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, [dossier.id]);

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("dossier_id", dossier.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Erreur chargement documents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>

      <Card className="p-6 mb-6 bg-gradient-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{dossier.titre}</h1>
            <div className="flex gap-2">
              <Badge variant="outline">{dossier.pays_destination}</Badge>
              <Badge variant="outline">{dossier.type_visa}</Badge>
            </div>
          </div>
          <Badge className={statusColors[dossier.status]}>
            {statusLabels[dossier.status]}
          </Badge>
        </div>

        {dossier.description && (
          <p className="text-muted-foreground mb-4">{dossier.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Date de soumission:</span>
            <p className="font-medium">
              {format(new Date(dossier.date_soumission), "PPP", { locale: fr })}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Dernière mise à jour:</span>
            <p className="font-medium">
              {format(new Date(dossier.date_derniere_mise_a_jour), "PPP", { locale: fr })}
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="messages">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <DocumentUpload dossierId={dossier.id} onUploadComplete={loadDocuments} />
          
          {loading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : documents.length === 0 ? (
            <Card className="p-8 text-center bg-gradient-card">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Aucun document uploadé</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-medium">{doc.nom_fichier}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type_document} • {format(new Date(doc.created_at), "PPp", { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={doc.url_fichier} target="_blank" rel="noopener noreferrer">
                      Voir
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages">
          <MessageriePanel dossierId={dossier.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DossierDetails;
