
'use client';

import { RevealOnScroll } from '@/components/RevealOnScroll';
import { TypewriterHeadline } from '@/components/ui/TypewriterHeadline';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-secondary pt-16">
      <div className="noise-overlay"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10"> {/* Adjusted padding slightly */}
        {/* Changed to single column layout, content will stack vertically */}
        <div className="grid grid-cols-1 gap-10 md:gap-16 items-center"> {/* Increased gap for better spacing */}
          {/* Text content - centered */}
          <div className="text-center"> {/* Centering text content */}
            <TypewriterHeadline
              text="Fortune AI" 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-primary to-accent bg-[length:300%_300%] animate-[gradientShift_8s_ease_infinite] text-transparent bg-clip-text [filter:drop-shadow(0_0_10px_hsl(var(--accent-hsl)))]"
            />
             <RevealOnScroll delay={200}>
              <TypewriterHeadline
                text="AI that works for you"
                typingSpeed={30}
                className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-muted-foreground max-w-xl mx-auto"
              />
            </RevealOnScroll>
            {/* Optional CTA button could go here if needed, e.g.,
            <RevealOnScroll delay={400}>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-accent/50 transition-shadow">
                <Link href="/services">Explore Services</Link>
              </Button>
            </RevealOnScroll>
            */}
          </div>

          {/* Image - removed */}
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl animate-pulse opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full filter blur-2xl animate-pulse opacity-30 animation-delay-2000 -z-10" style={{animationDelay: '2s'}}></div>
    </section>
  );
}

