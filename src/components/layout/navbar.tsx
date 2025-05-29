'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'ROI Calculator', href: '/roi-calculator' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

const siteBaseUrl = 'https://www.fortuneai.co.za'; // Added for schema

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateBreadcrumbSchema = () => {
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteBaseUrl}/`,
      },
    ];

    const pathSegments = pathname.split('/').filter(segment => segment);

    pathSegments.forEach((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      // Find nav item name, otherwise capitalize segment
      const navItem = navItems.find(item => item.href === href);
      const name = navItem ? navItem.name : segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Check if this segment is for a blog post slug
      if (pathname.startsWith('/blogs/') && index === 1 && pathSegments.length > 1 && !navItem) {
        // This is a dynamic slug, we don't have a pre-defined name. 
        // We could fetch post title here if needed, or use a generic name like "Post".
        // For simplicity, we'll use the slug itself or a generic name.
        // The actual post title would be in the BlogPosting schema for that page.
         breadcrumbs.push({
          '@type': 'ListItem',
          position: breadcrumbs.length + 1,
          name: segment, // Or a generic name like "Blog Post"
          item: `${siteBaseUrl}${href}`,
        });
      } else if (name) { // Only add if name is found or derived
        breadcrumbs.push({
          '@type': 'ListItem',
          position: breadcrumbs.length + 1,
          name: name,
          item: `${siteBaseUrl}${href}`,
        });
      }
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    };
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema()) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
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
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle> 
                <nav className="grid gap-4 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
