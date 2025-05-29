'use client';

import { RevealOnScroll } from '@/components/RevealOnScroll';
import { ROICalculatorForm } from '@/components/sections/ROICalculatorForm';

export default function RoiCalculatorClient() {
  return (
    <div className="pt-16 md:pt-20">
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Workflow Automation ROI Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate the potential time and cost savings your business can achieve by automating repetitive tasks.
          </p>
        </RevealOnScroll>
      </header>

      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ROICalculatorForm />
        </div>
      </main>
    </div>
  );
}
