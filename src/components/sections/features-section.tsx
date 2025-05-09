import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Zap, ShieldCheck, type LucideIcon } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: 'AI-Powered Predictions',
    description: 'Leverage cutting-edge AI to forecast market trends and make data-driven decisions with unparalleled accuracy.',
  },
  {
    icon: Target,
    title: 'Personalized Strategies',
    description: 'Receive custom business strategies tailored to your company\'s unique goals, challenges, and operational context.',
  },
  {
    icon: Zap,
    title: 'Automated Insights',
    description: 'Gain actionable insights automatically, saving you valuable time and effort in data collection and analysis.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Reliable Platform',
    description: 'Your data is protected with state-of-the-art security measures, ensuring confidentiality and integrity at all times.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-center mb-4 tracking-tight">Why Choose <span className="text-primary">FortuneAI</span>?</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Our platform is engineered to provide you with a distinct competitive advantage through intelligent automation and predictive capabilities.
          </p>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 150}>
              <Card className="h-full bg-card hover:shadow-xl hover:border-accent transition-all duration-300 transform hover:-translate-y-1 rounded-lg overflow-hidden">
                <CardHeader className="items-center p-6">
                  <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-2xl text-center font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground text-center text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
