
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { TypewriterHeadline } from '@/components/ui/TypewriterHeadline';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-secondary pt-16">
      <div className="noise-overlay"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10"> 
        <div className="grid grid-cols-1 gap-10 md:gap-16 items-center"> 
          <div className="text-center"> 
            <TypewriterHeadline
              text="Fortune AI" 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-primary to-accent bg-[length:300%_300%] animate-[gradientShift_8s_ease_infinite] text-transparent bg-clip-text [filter:drop-shadow(0_0_10px_hsl(var(--accent-hsl)))]"
            />
             <RevealOnScroll delay={200}>
              <TypewriterHeadline
                text="AI that works for you"
                typingSpeed={30}
                className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 text-muted-foreground max-w-xl mx-auto"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-32 sm:mt-64"> 
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-accent/50 transition-shadow w-full sm:w-auto animate-glow-pulse"
                >
                  <Link href="/services">Discover Features</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="border-primary text-primary hover:bg-primary/10 hover:text-primary px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow w-full sm:w-auto animate-glow-pulse-primary"
                >
                  <Link href="/contact">Book a Free Consultation</Link>
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl animate-pulse opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full filter blur-2xl animate-pulse opacity-30 animation-delay-2000 -z-10" style={{animationDelay: '2s'}}></div>
    </section>
  );
}

