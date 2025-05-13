'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Calculator } from 'lucide-react';

export function ROICallToActionSection() {
  return (
    <RevealOnScroll>
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <Calculator className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Unlock Your Potential: Calculate Your Savings
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Discover the potential cost savings and efficiency gains by automating your workflows. 
            Our ROI Calculator provides a clear estimate of how Fortune AI can impact your bottom line.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/80 text-accent-foreground">
            <Link href="/roi-calculator">Try Our ROI Calculator</Link>
          </Button>
        </div>
      </section>
    </RevealOnScroll>
  );
}
