'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'Greeting', href: '#greeting' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Calculate offset for fixed navbar if necessary, here it's handled by pt-16 on main
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#hero" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors" onClick={(e) => handleNavClick(e, '#hero')}>
            <Sparkles className="h-7 w-7" />
            <span>FortuneAI</span>
          </Link>
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-200">
                <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
          {/* Mobile menu button can be added here using Sheet for an off-canvas menu */}
        </div>
      </div>
    </header>
  );
}
