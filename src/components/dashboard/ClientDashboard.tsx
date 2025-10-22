import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logo from "@/assets/logo.jpg";
import CreateDossierDialog from "../dossiers/CreateDossierDialog";
import DossierCard from "../dossiers/DossierCard";
import DossierDetails from "../dossiers/DossierDetails";

const ClientDashboard = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [dossiers, setDossiers] = useState<any[]>([]);
  const [selectedDossier, setSelectedDossier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDossiers();
  }, []);

  const loadDossiers = async () => {
    try {
      const { data, error } = await supabase
        .from("dossiers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDossiers(data || []);
    } catch (error: any) {
      toast.error("Erreur lors du chargement des dossiers");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  if (selectedDossier) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b bg-card shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logo} alt="PTS" className="h-10" />
              <span className="font-semibold">Espace Client</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          <DossierDetails
            dossier={selectedDossier}
            onBack={() => setSelectedDossier(null)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="PTS" className="h-10" />
            <span className="font-semibold">Espace Client</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Mes Dossiers</h1>
          <CreateDossierDialog onDossierCreated={loadDossiers} />
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : dossiers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Aucun dossier pour le moment</p>
            <CreateDossierDialog onDossierCreated={loadDossiers} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dossiers.map((dossier) => (
              <DossierCard
                key={dossier.id}
                dossier={dossier}
                onViewDetails={setSelectedDossier}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
