import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadProps {
  dossierId: string;
  onUploadComplete: () => void;
}

const DocumentUpload = ({ dossierId, onUploadComplete }: DocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [typeDocument, setTypeDocument] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !typeDocument) {
      toast.error("Veuillez sélectionner un fichier et un type");
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${dossierId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("documents").insert({
        dossier_id: dossierId,
        nom_fichier: file.name,
        type_document: typeDocument,
        url_fichier: publicUrl,
        taille_fichier: file.size,
        uploaded_by: user.id,
      });

      if (dbError) throw dbError;

      toast.success("Document uploadé avec succès !");
      setFile(null);
      setTypeDocument("");
      onUploadComplete();
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <h3 className="text-lg font-semibold mb-4">Ajouter un document</h3>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Label htmlFor="type">Type de document *</Label>
          <Select value={typeDocument} onValueChange={setTypeDocument}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Passeport">Passeport</SelectItem>
              <SelectItem value="Photo d'identité">Photo d'identité</SelectItem>
              <SelectItem value="Certificat de naissance">Certificat de naissance</SelectItem>
              <SelectItem value="Diplôme">Diplôme</SelectItem>
              <SelectItem value="Relevé bancaire">Relevé bancaire</SelectItem>
              <SelectItem value="Lettre de motivation">Lettre de motivation</SelectItem>
              <SelectItem value="CV">CV</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="file">Fichier *</Label>
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Formats acceptés: PDF, JPG, PNG, DOC, DOCX (max 10MB)
          </p>
        </div>
        <Button
          type="submit"
          disabled={uploading || !file || !typeDocument}
          className="w-full bg-gradient-hero"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Upload en cours...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Uploader le document
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default DocumentUpload;
