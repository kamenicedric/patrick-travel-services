import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Upload } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface DossierCardProps {
  dossier: any;
  onViewDetails: (dossier: any) => void;
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

const DossierCard = ({ dossier, onViewDetails }: DossierCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all bg-gradient-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{dossier.titre}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{dossier.pays_destination}</Badge>
            <Badge variant="outline">{dossier.type_visa}</Badge>
          </div>
        </div>
        <Badge className={statusColors[dossier.status]}>
          {statusLabels[dossier.status]}
        </Badge>
      </div>

      {dossier.description && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {dossier.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Créé {formatDistanceToNow(new Date(dossier.created_at), { addSuffix: true, locale: fr })}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onViewDetails(dossier)}>
            <FileText className="h-4 w-4 mr-1" />
            Détails
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DossierCard;
