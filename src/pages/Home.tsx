import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, FileText, MessageSquare, Shield, CheckCircle, Users, TrendingUp, Globe, MapPin, Hotel, FileCheck, Languages, Stamp, HeartHandshake } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
import { ImmigrationAssistant } from "@/components/chat/ImmigrationAssistant";

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
          <div className="text-center max-w-3xl mx-auto mb-12">
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

      {/* À Propos */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">À Propos de Patrick Travel Services</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground">
              <p>
                <strong className="text-foreground">Patrick Travel Services</strong> est votre partenaire de confiance pour toutes vos démarches d'immigration et de voyage. Basés à Douala au Cameroun, nous mettons notre expertise au service de vos projets internationaux depuis de nombreuses années.
              </p>
              <p>
                Notre mission est de simplifier vos procédures administratives et de vous accompagner à chaque étape de votre parcours migratoire. Que vous souhaitiez étudier, travailler ou vous installer à l'étranger, notre équipe d'experts vous guide avec professionnalisme et dévouement.
              </p>
              <p>
                Nous offrons un accompagnement personnalisé incluant l'assistance visa, la réservation de billets d'avion, l'hébergement, l'assurance voyage, la traduction et la légalisation de documents. Notre plateforme sécurisée vous permet de suivre votre dossier en temps réel et de communiquer directement avec nos conseillers.
              </p>
              <div className="flex items-center justify-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm">Clients Satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm">Pays Couverts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm">Taux de Réussite</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pays facilitant l'immigration */}
      <section id="destinations" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden scroll-mt-20">
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
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                icon: FileText,
                title: "Soumission de Dossiers",
                description: "Formulaires dynamiques et upload sécurisé de documents",
              },
              {
                icon: Plane,
                title: "Billets d'Avion",
                description: "Réservation de vols aux meilleurs tarifs internationaux",
              },
              {
                icon: Hotel,
                title: "Hébergement",
                description: "Réservation d'hôtels et logements adaptés à votre séjour",
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

      {/* FAQ */}
      <section id="faq" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trouvez les réponses aux questions les plus courantes sur nos services
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Quels pays couvrez-vous pour l'immigration ?",
                  answer: "Nous accompagnons nos clients dans leurs démarches d'immigration vers tous les pays du monde. Notre équipe d'experts est spécialisée dans les procédures de nombreux pays, que ce soit pour des visas d'études, de travail, touristiques ou de résidence permanente."
                },
                {
                  question: "Combien de temps prend le traitement d'un dossier ?",
                  answer: "Le délai de traitement varie selon le type de visa et le pays de destination. En moyenne, comptez entre 2 à 12 semaines. Nous vous tenons informé à chaque étape et faisons notre maximum pour accélérer le processus."
                },
                {
                  question: "Quels documents sont nécessaires ?",
                  answer: "Les documents requis varient selon votre destination et le type de visa. Une fois votre dossier créé, vous recevrez une checklist personnalisée avec tous les documents nécessaires. Notre équipe vous accompagne dans la préparation de chaque document."
                },
                {
                  question: "Comment puis-je suivre l'avancement de mon dossier ?",
                  answer: "Vous pouvez suivre votre dossier en temps réel depuis votre espace client. Vous recevez également des notifications par email et pouvez échanger directement avec nos conseillers via la messagerie intégrée."
                },
                {
                  question: "Quels sont vos tarifs ?",
                  answer: "Nos tarifs dépendent du type de service et du pays de destination. Contactez-nous pour obtenir un devis personnalisé gratuit. Nous offrons des forfaits complets incluant l'assistance visa, les billets d'avion et l'hébergement."
                },
                {
                  question: "Que se passe-t-il si mon visa est refusé ?",
                  answer: "En cas de refus, nous analysons les raisons et vous conseillons sur les options disponibles : recours, nouvelle demande avec documents complémentaires, ou orientation vers une alternative adaptée à votre situation."
                }
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6 bg-card hover-scale">
                  <AccordionTrigger className="hover:no-underline">
                    <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-muted via-background to-muted border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* À Propos */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Patrick Travel Services" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Votre partenaire de confiance pour tous vos projets d'immigration et de voyage à travers le monde.
              </p>
              <div className="flex gap-3">
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Liens Rapides */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">À Propos</a></li>
                <li><a href="#destinations" className="hover:text-primary transition-colors scroll-smooth">Destinations</a></li>
                <li><a href="/auth" className="hover:text-primary transition-colors">Mon Espace Client</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors scroll-smooth">FAQ</a></li>
              </ul>
            </div>

            {/* Nos Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Nos Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Assistance Visa</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Billets d'Avion</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Réservation Hôtel</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Assurance Voyage</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Traduction & Légalisation</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Tradex Bonamoussadi<br />Douala, Cameroun</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <div>
                    <a href="tel:+237656543469" className="hover:text-primary transition-colors">(+237) 656 543 469</a><br />
                    <a href="tel:+237652948297" className="hover:text-primary transition-colors">(+237) 652 948 297</a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:erikayossa0507@gmail.com" className="hover:text-primary transition-colors">erikayossa0507@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2025 Patrick Travel Services. Tous droits réservés.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-primary transition-colors">Politique de Confidentialité</a>
                <a href="#" className="hover:text-primary transition-colors">CGV</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <ImmigrationAssistant />
    </div>
  );
};

export default Home;
