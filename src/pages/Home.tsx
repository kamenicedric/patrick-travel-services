import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, FileText, MessageSquare, Shield, CheckCircle, Users, TrendingUp, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logo from "@/assets/logo.jpg";
import canadaImg from "@/assets/countries/canada.jpg";
import australiaImg from "@/assets/countries/australia.jpg";
import germanyImg from "@/assets/countries/germany.jpg";
import portugalImg from "@/assets/countries/portugal.jpg";
import newZealandImg from "@/assets/countries/new-zealand.jpg";
import spainImg from "@/assets/countries/spain.jpg";
import usaImg from "@/assets/countries/usa.jpg";
import ukImg from "@/assets/countries/uk.jpg";
import franceImg from "@/assets/countries/france.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleProcedureRequest = (countryName: string) => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter ou créer un compte pour démarrer une procédure",
      });
      navigate("/auth?mode=signup");
    }
  };

  const topDestinations = [
    {
      name: "Canada",
      description: "Programme d'immigration économique très accessible",
      image: canadaImg,
      icon: "🇨🇦",
      score: "95/100",
      programs: "Express Entry, PNP, Études"
    },
    {
      name: "Australie",
      description: "Système de points avantageux pour les travailleurs qualifiés",
      image: australiaImg,
      icon: "🇦🇺",
      score: "92/100",
      programs: "SkillSelect, Working Holiday"
    },
    {
      name: "Allemagne",
      description: "Forte demande de main-d'œuvre qualifiée",
      image: germanyImg,
      icon: "🇩🇪",
      score: "90/100",
      programs: "Blue Card, Études, Formation"
    },
    {
      name: "Portugal",
      description: "Visa Golden et programme startup friendly",
      image: portugalImg,
      icon: "🇵🇹",
      score: "88/100",
      programs: "Golden Visa, D7, Startup"
    },
    {
      name: "Nouvelle-Zélande",
      description: "Qualité de vie exceptionnelle et accueil chaleureux",
      image: newZealandImg,
      icon: "🇳🇿",
      score: "87/100",
      programs: "Skilled Migrant, WHV"
    },
    {
      name: "Espagne",
      description: "Procédures simplifiées et coût de vie abordable",
      image: spainImg,
      icon: "🇪🇸",
      score: "85/100",
      programs: "Non-Lucrative, Golden Visa"
    }
  ];

  const mostPopular = [
    {
      name: "États-Unis",
      description: "Plus grande destination d'immigration au monde",
      image: usaImg,
      icon: "🇺🇸",
      immigrants: "50.6M",
      trend: "+15%"
    },
    {
      name: "Royaume-Uni",
      description: "Hub international pour les affaires et l'éducation",
      image: ukImg,
      icon: "🇬🇧",
      immigrants: "9.4M",
      trend: "+12%"
    },
    {
      name: "France",
      description: "Destination européenne prisée",
      image: franceImg,
      icon: "🇫🇷",
      immigrants: "8.5M",
      trend: "+8%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Patrick Travel Services" className="h-12 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/auth">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="bg-gradient-hero shadow-glow">Commencer</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Votre Partenaire de Confiance pour l'Immigration
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Gérez vos démarches d'immigration en toute simplicité avec une plateforme sécurisée et un accompagnement personnalisé
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-gradient-hero shadow-glow text-lg px-8 py-6">
                Démarrer Votre Dossier
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pays facilitant l'immigration */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Top Destinations 2025</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Pays Facilitant l'Immigration
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les destinations les plus accessibles avec des programmes d'immigration avantageux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map((country, idx) => (
              <Card 
                key={idx} 
                className="group hover-scale overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in hover:shadow-glow bg-gradient-card"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-32 relative overflow-hidden">
                  <img 
                    src={country.image} 
                    alt={country.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 right-4 text-6xl drop-shadow-lg">{country.icon}</div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-gray-800">Score: {country.score}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    {country.name}
                  </CardTitle>
                  <CardDescription className="text-base">{country.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Programmes disponibles:</p>
                    <p className="text-sm font-semibold">{country.programs}</p>
                  </div>
                  
                  <Button 
                    onClick={() => handleProcedureRequest(country.name)}
                    className="w-full bg-gradient-hero shadow-md hover:shadow-glow transition-all duration-300 group-hover:scale-105"
                  >
                    <Plane className="mr-2 h-5 w-5" />
                    Demande de Procédure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pays les plus immigrés */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Destinations Populaires</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Pays les Plus Immigrés</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les destinations qui accueillent le plus d'immigrants dans le monde
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mostPopular.map((country, idx) => (
              <Card 
                key={idx}
                className="group hover-scale overflow-hidden border-2 hover:border-secondary/50 transition-all duration-300 animate-fade-in hover:shadow-lg bg-gradient-card"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="h-24 relative overflow-hidden">
                  <img 
                    src={country.image} 
                    alt={country.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-lg">
                    {country.icon}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{country.name}</CardTitle>
                  <CardDescription>{country.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Immigrants</p>
                      <p className="text-2xl font-bold text-primary">{country.immigrants}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Tendance</p>
                      <p className="text-xl font-bold text-secondary flex items-center gap-1">
                        <TrendingUp className="h-5 w-5" />
                        {country.trend}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleProcedureRequest(country.name)}
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    <Plane className="mr-2 h-4 w-4" />
                    Demande de Procédure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Soumission de Dossiers",
                description: "Formulaires dynamiques et upload sécurisé de documents",
              },
              {
                icon: MessageSquare,
                title: "Assistance Personnalisée",
                description: "Messagerie directe avec nos conseillers experts",
              },
              {
                icon: Shield,
                title: "Suivi en Temps Réel",
                description: "Suivez l'avancement de votre dossier à chaque étape",
              },
            ].map((service, idx) => (
              <Card key={idx} className="p-6 shadow-md hover:shadow-lg transition-all bg-gradient-card hover-scale">
                <service.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Marie D.",
                text: "Service exceptionnel ! J'ai pu suivre mon dossier facilement et l'équipe a été très réactive.",
              },
              {
                name: "Jean K.",
                text: "Plateforme intuitive et professionnelle. Mon visa a été approuvé en quelques semaines.",
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 shadow-md bg-gradient-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <CheckCircle key={i} className="h-4 w-4 text-secondary fill-secondary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Patrick Travel Services. Tous droits réservés.</p>
          <p className="text-sm opacity-90">Tel: (+237) 656543469 / 652948297 - Email: erikayossa0507@gmail.com</p>
          <p className="text-sm opacity-90">Tradex Bonamoussadi, Douala-Cameroun</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
