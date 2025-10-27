import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const phoneNumber = "+33668898692";
  const message = "Bonjour, j'ai besoin d'aide concernant mes démarches d'immigration.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#25D366] hover:bg-[#128C7E] text-white border-0 hover:scale-110"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};
