// src/components/sections/WhoWeAreSection.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll'; // Added

const WhoWeAreSection = () => {
  return (
    <section className="py-12 md:py-20 bg-card text-card-foreground"> {/* Changed background */}
      <div className="container mx-auto px-4">
        <RevealOnScroll> {/* Added RevealOnScroll */}
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Meet Fortune AI
            </h2>
            <p className="text-lg text-muted-foreground mb-8 md:px-6">
              Founded by <strong className="text-primary">Phathutshedzo Fortune Bongwe</strong>, a passionate Computer Science and Business Computing student, Fortune AI is on a mission to democratize AI-powered automation. We build intelligent agents to help businesses like yours enhance efficiency, make smarter decisions, and unlock new levels of productivity.
            </p>
            <p className="text-lg text-muted-foreground mb-10 md:px-6">
              We believe in making sophisticated AI tools accessible and impactful for everyone, from startups to established enterprises.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/about">
                <Users className="w-5 h-5 mr-2" /> Learn More About Our Story
              </Link>
            </Button>
          </div>
        </RevealOnScroll> {/* Added RevealOnScroll */}
      </div>
    </section>
  );
};

export default WhoWeAreSection;
