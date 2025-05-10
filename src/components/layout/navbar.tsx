'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

// Updated navItems to link to actual pages
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Insights', href: '/insights' }, // Link to the blog/insights page
  { name: 'Contact', href: '/contact' },   // Link to the contact page
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
  
  // handleNavClick is removed as it's not needed for direct page links

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo link now points to the homepage */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            <Sparkles className="h-7 w-7" />
            <span>FortuneAI</span>
          </Link>
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-200">
                {/* Link component handles page navigation, onClick for smooth scroll removed */}
                <Link href={item.href}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
          {/* Mobile menu button can be added here using Sheet for an off-canvas menu */}
          {/* TODO: Implement mobile navigation menu (hamburger menu) */}
        </div>
      </div>
    </header>
  );
}
