import Link from 'next/link';
import Image from 'next/image'; // Import the Image component

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
      </div>
    </footer>
  );
}
