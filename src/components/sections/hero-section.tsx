'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import Link from 'next/link';

export function HeroSection() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector('#features');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-secondary pt-16"> {/* pt-16 for navbar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <RevealOnScroll>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                <span className="block">Unlock Your</span>
                <span className="block text-primary">Business Potential</span>
                <span className="block">with FortuneAI</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
                Leverage the power of artificial intelligence to gain actionable insights,
                drive growth, and make smarter decisions for your company's future.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-accent/50 transition-shadow" asChild>
                <Link href="#features" onClick={handleCTAClick}>
                  Discover Features
                </Link>
              </Button>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={300} className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 group">
              <Image
                src="https://picsum.photos/800/600?random=1"
                alt="AI powered business insights"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
                data-ai-hint="abstract technology future"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl animate-pulse opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full filter blur-2xl animate-pulse opacity-30 animation-delay-2000 -z-10" style={{animationDelay: '2s'}}></div>
    </section>
  );
}
