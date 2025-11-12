import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select,
   SelectContent,
    SelectItem,
     SelectTrigger,
      SelectValue } from "@/components/ui/select";

import { Plus } from "lucide-react";
import { toast } from "sonner";

interface CreateDossierDialogProps {
  onDossierCreated: () => void;
}

const CreateDossierDialog = ({ onDossierCreated }: CreateDossierDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    pays_destination: "",
    type_visa: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { error } = await supabase.from("dossiers").insert({
        user_id: user.id,
        titre: formData.titre,
        description: formData.description,
        pays_destination: formData.pays_destination,
        type_visa: formData.type_visa,
      });

      if (error) throw error;

      toast.success("Dossier créé avec succès !");
      setOpen(false);
      setFormData({ titre: "", description: "", pays_destination: "", type_visa: "" });
      onDossierCreated();
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-hero shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Créer un nouveau dossier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau Dossier d'Immigration</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titre">Titre du dossier *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              placeholder="Ex: Demande de visa étudiant Canada"
              required
            />
          </div>
                    <div>
            <Label htmlFor="pays_destination">Pays de destination *</Label>
            <Input
              id="pays_destination"
              value={formData.pays_destination}
              onChange={(e) => setFormData({ ...formData, pays_destination: e.target.value })}
              placeholder="Ex: Canada, France, Japon, Brésil..."
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Nous accompagnons l'immigration vers tous les pays du monde
            </p>
          </div>

          <div>
            <Label htmlFor="type_visa">Type de visa *</Label>
            <Select
              value={formData.type_visa}
              onValueChange={(value) => setFormData({ ...formData, type_visa: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Étudiant">Visa Étudiant</SelectItem>
                <SelectItem value="Travail">Visa de Travail</SelectItem>
                <SelectItem value="Touriste">Visa Touriste</SelectItem>
                <SelectItem value="Affaires">Visa d'Affaires</SelectItem>
                <SelectItem value="Familial">Regroupement Familial</SelectItem>
                <SelectItem value="Résidence">Résidence Permanente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Détails supplémentaires sur votre demande..."
              rows={4}
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="bg-gradient-hero" disabled={loading}>
              {loading ? "Création..." : "Créer le dossier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDossierDialog;
