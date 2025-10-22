import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, FileText, LogOut, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logo from "@/assets/logo.jpg";
import AdminDossiersList from "../admin/AdminDossiersList";

const AdminDashboard = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalDossiers: 0,
    dossiersEnCours: 0,
    dossiersApprouves: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id", { count: "exact" });

      const { data: dossiers } = await supabase
        .from("dossiers")
        .select("status", { count: "exact" });

      const dossiersEnCours = dossiers?.filter((d) => d.status === "en_cours").length || 0;
      const dossiersApprouves = dossiers?.filter((d) => d.status === "approuve").length || 0;

      setStats({
        totalClients: profiles?.length || 0,
        totalDossiers: dossiers?.length || 0,
        dossiersEnCours,
        dossiersApprouves,
      });
    } catch (error) {
      console.error("Erreur chargement stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="PTS" className="h-10" />
            <span className="font-semibold">Administration</span>
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
        <h1 className="text-3xl font-bold mb-6">Tableau de bord Admin</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card">
            <Users className="h-8 w-8 text-accent mb-2" />
            <p className="text-2xl font-bold">{stats.totalClients}</p>
            <p className="text-sm text-muted-foreground">Clients</p>
          </Card>
          <Card className="p-6 bg-gradient-card">
            <FileText className="h-8 w-8 text-secondary mb-2" />
            <p className="text-2xl font-bold">{stats.totalDossiers}</p>
            <p className="text-sm text-muted-foreground">Dossiers totaux</p>
          </Card>
          <Card className="p-6 bg-gradient-card">
            <TrendingUp className="h-8 w-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{stats.dossiersEnCours}</p>
            <p className="text-sm text-muted-foreground">En cours</p>
          </Card>
          <Card className="p-6 bg-gradient-success">
            <FileText className="h-8 w-8 text-primary-foreground mb-2" />
            <p className="text-2xl font-bold text-primary-foreground">{stats.dossiersApprouves}</p>
            <p className="text-sm text-primary-foreground/80">Approuvés</p>
          </Card>
        </div>

        <AdminDossiersList />
      </main>
    </div>
  );
};

export default AdminDashboard;
