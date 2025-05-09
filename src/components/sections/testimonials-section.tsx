import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  avatarHint: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "FortuneAI transformed how we approach our business strategy. The insights are invaluable and have led to tangible growth!",
    name: 'Alice Johnson',
    title: 'CEO',
    company: 'Innovatech Solutions',
    avatarUrl: 'https://picsum.photos/100/100?random=10',
    avatarHint: 'profile avatar',
  },
  {
    quote: "The personalized strategies provided by FortuneAI were spot-on. We've seen a significant improvement in our campaign performance.",
    name: 'Robert Chen',
    title: 'Marketing Director',
    company: 'Growth Dynamics',
    avatarUrl: 'https://picsum.photos/100/100?random=11',
    avatarHint: 'person professional',
  },
  {
    quote: "An essential tool for any forward-thinking business. The AI predictions are scarily accurate and incredibly useful.",
    name: 'Maria Garcia',
    title: 'COO',
    company: 'Future Forward Inc.',
    avatarUrl: 'https://picsum.photos/100/100?random=12',
    avatarHint: 'professional woman',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-center mb-4 tracking-tight">Loved by Innovators</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Hear from business leaders who have leveraged FortuneAI to achieve remarkable results.
          </p>
        </RevealOnScroll>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={testimonial.name} delay={index * 150}>
              <Card className="h-full flex flex-col bg-card shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 rounded-lg overflow-hidden">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <Quote className="h-10 w-10 text-primary mb-6 self-start" />
                  <p className="text-foreground mb-6 flex-grow italic text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center mt-auto pt-6 border-t border-border/50">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full mr-4 border-2 border-accent"
                      data-ai-hint={testimonial.avatarHint}
                    />
                    <div>
                      <p className="font-semibold text-lg text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
