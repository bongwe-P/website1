import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Zap, TrendingUp, Database, Users, Code, Laptop, type LucideIcon } from 'lucide-react'; // Added Laptop for Website Creation
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  linkTo?: string; // Optional: link to a more detailed service page if needed in future
}

const services: Service[] = [
  {
    icon: MessageCircle,
    title: 'AI Customer Engagement',
    description: '24/7 chatbots & virtual assistants for support, inquiries, appointments, and lead qualification.',
    linkTo: '/services#customer-engagement' // Example link
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Automate data entry, invoicing, email responses, report generation, and other repetitive tasks.',
    linkTo: '/services#workflow-automation'
  },
  {
    icon: TrendingUp,
    title: 'Sales & Marketing Automation',
    description: 'Streamline lead nurturing, campaign execution, lead scoring, and personalized follow-ups.',
    linkTo: '/services#sales-marketing-automation'
  },
  {
    icon: Database,
    title: 'Data Analysis & Support',
    description: 'Process business data to generate insights, reports, and real-time dashboards/alerts for better decisions.',
    linkTo: '/services#data-analysis'
  },
  {
    icon: Code,
    title: 'Custom AI Development',
    description: 'Bespoke multi-agent systems and specialized AI agents trained on your unique business context.',
    linkTo: '/services#custom-ai'
  },
  {
    icon: Users,
    title: 'AI Consulting & Training',
    description: 'Strategic AI adoption consulting, planning, implementation guidance, and team training.',
    linkTo: '/services#consulting-training'
  },
  {
    icon: Laptop, // Icon for Website Creation
    title: 'Modern Website Creation',
    description: 'Building clean, modern, mobile-optimized websites focused on conversion and user experience.',
    linkTo: '/services#website-creation'
  }
];

export function ServicesOverviewSection() {
  return (
    <section id="services-overview" className="relative overflow-hidden py-16 md:py-24 bg-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[20%] top-[10%] h-[300px] w-[300px] animate-pulse rounded-full bg-primary/10 blur-3xl filter" />
        <div className="absolute right-[20%] bottom-[10%] h-[300px] w-[300px] animate-pulse rounded-full bg-accent/10 blur-3xl filter delay-2000" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-center mb-4 tracking-tight">
            Core <span className="text-primary">Services</span> We Offer
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Empowering your business with intelligent solutions tailored to your unique needs, from AI automation to compelling web presences.
          </p>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={index * 150}>
              <Card className="h-full bg-card hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 rounded-lg overflow-hidden group">
                <CardHeader className="items-center p-6">
                  <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                    <service.icon className={cn("h-10 w-10", "animate-icon-pulse")} style={{ animationDelay: `${index * 250}ms` }} />
                  </div>
                  <CardTitle className="text-2xl text-center font-semibold group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground text-center text-sm">{service.description}</p>
                </CardContent>
                {/* Optional: Add a specific link/button per service if needed later */}
                {/* {service.linkTo && (
                  <CardFooter className="p-6 pt-0 justify-center">
                    <Button variant="link" asChild className="text-primary group-hover:underline">
                      <Link href={service.linkTo}>Learn More</Link>
                    </Button>
                  </CardFooter>
                )} */}
              </Card>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll className="text-center mt-16">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/services">Explore All Our Services</Link>
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
