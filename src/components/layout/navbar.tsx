'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

// Updated navItems to link to actual pages
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' }, // Corrected href for Blogs
  // { name: 'Insights', href: '/insights' }, // Removed Insights
  { name: 'Contact', href: '/contact' },
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
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Reverted navbar height */}
          <Link href="/" className="flex items-center">
            {/* Adjusted width, height, and added objectFit for desired appearance */}
            <Image src="/logo.png" alt="FortuneAI Logo" width={240} height={60} objectFit="cover" /> 
          </Link>
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-200">
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
