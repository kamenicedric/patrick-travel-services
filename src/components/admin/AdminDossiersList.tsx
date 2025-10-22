import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

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

const AdminDossiersList = () => {
  const [dossiers, setDossiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDossiers();
  }, []);

  const loadDossiers = async () => {
    try {
      const { data, error } = await supabase
        .from("dossiers")
        .select(`
          *,
          profiles!dossiers_user_id_fkey(nom, prenom, email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDossiers(data || []);
    } catch (error) {
      console.error("Erreur chargement dossiers:", error);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (dossierId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("dossiers")
        .update({ 
          status: newStatus as any,
          date_derniere_mise_a_jour: new Date().toISOString() 
        })
        .eq("id", dossierId);

      if (error) throw error;
      toast.success("Statut mis à jour");
      loadDossiers();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (loading) {
    return <p className="text-center text-muted-foreground">Chargement...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tous les Dossiers</h2>
      {dossiers.length === 0 ? (
        <Card className="p-8 text-center bg-gradient-card">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Aucun dossier</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {dossiers.map((dossier) => {
            const clientName = dossier.profiles
              ? `${dossier.profiles.prenom || ""} ${dossier.profiles.nom || ""}`.trim()
              : "Client";

            return (
              <Card key={dossier.id} className="p-4 bg-gradient-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{dossier.titre}</h3>
                      <Badge className={statusColors[dossier.status]}>
                        {statusLabels[dossier.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Client: {clientName}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">{dossier.pays_destination}</Badge>
                      <Badge variant="outline">{dossier.type_visa}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Créé le {format(new Date(dossier.created_at), "PPP", { locale: fr })}
                    </p>
                  </div>
                  <div className="w-48">
                    <Select
                      value={dossier.status}
                      onValueChange={(value) => handleStatusChange(dossier.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en_attente">En attente</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="approuve">Approuvé</SelectItem>
                        <SelectItem value="rejete">Rejeté</SelectItem>
                        <SelectItem value="complete">Complété</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDossiersList;
