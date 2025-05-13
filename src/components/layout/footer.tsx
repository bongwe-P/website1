import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { Mail, Phone, MessageSquare, Linkedin } from 'lucide-react'; // Import icons

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background border-t border-border/50 py-8 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="FortuneAI Logo" width={100} height={100} />
        </div>
        <p className="text-sm text-muted-foreground">&copy; {currentYear} FortuneAI. All rights reserved.</p>
        <div className="mt-2 space-x-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</Link>
          <span className="text-muted-foreground">&bull;</span>
          <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</Link>
        </div>
        <div className="mt-6 text-sm text-muted-foreground space-y-2 md:space-y-0 md:flex md:flex-wrap md:justify-center md:items-center md:gap-x-6 md:gap-y-2">
          <a href="mailto:fortuneaiagency@gmail.com" className="flex items-center justify-center hover:text-accent transition-colors">
            <Mail className="w-4 h-4 mr-1.5" /> fortuneaiagency@gmail.com
          </a>
          <a href="tel:+27647668853" className="flex items-center justify-center hover:text-accent transition-colors">
            <Phone className="w-4 h-4 mr-1.5" /> +27 64 766 8853
          </a>
          <a href="https://wa.me/27647668853" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-accent transition-colors">
            <MessageSquare className="w-4 h-4 mr-1.5" /> WhatsApp
          </a>
          <a href="https://www.linkedin.com/in/phathutshedzo-fortune-bongwe/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-accent transition-colors">
            <Linkedin className="w-4 h-4 mr-1.5" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
