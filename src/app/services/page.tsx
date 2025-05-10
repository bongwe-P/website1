'use client';

import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, Zap, Target, PieChart, UserCog, Users, Code } from 'lucide-react';
// Removed Metadata import

// Removed metadata export

const services = [
  {
    id: 'ai-customer-engagement',
    name: 'AI-Powered Customer Engagement',
    description: '24/7 chatbots, virtual assistants for inquiries, support, appointments, and lead qualification.',
    details: 'Enhance customer satisfaction and operational efficiency with intelligent AI agents that provide instant, accurate responses and streamline communication channels.',
    ctaLink: '/contact?service=ai-customer-engagement',
    ctaText: 'Automate Customer Service',
    Icon: Bot,
  },
  {
    id: 'workflow-automation',
    name: 'Workflow & Process Automation',
    description: 'Automating data entry, invoicing, email responses, report generation, and other repetitive tasks.',
    details: 'Free up your team\'s valuable time by automating routine business processes, reducing errors and improving overall productivity and focus on core activities.',
    ctaLink: '/contact?service=workflow-automation',
    ctaText: 'Optimize Your Workflows',
    Icon: Zap,
  },
  {
    id: 'sales-marketing-automation',
    name: 'Sales & Marketing Automation',
    description: 'Lead nurturing, campaign execution, lead scoring, personalized follow-ups, social media automation, and marketing copy generation.',
    details: 'Boost your sales pipeline and marketing ROI with AI-driven tools that personalize outreach, manage campaigns, and generate engaging content.',
    ctaLink: '/contact?service=sales-marketing-automation',
    ctaText: 'Boost Your Sales Engine',
    Icon: Target,
  },
  {
    id: 'data-analysis-decision-support',
    name: 'Data Analysis & Decision Support',
    description: 'Processing business data, generating insights/reports, and creating real-time dashboards/alerts.',
    details: 'Unlock the power of your data. We provide AI-driven analytics to help you make informed decisions, identify trends, and discover new opportunities.',
    ctaLink: '/contact?service=data-analysis',
    ctaText: 'Unlock Data Insights',
    Icon: PieChart,
  },
  {
    id: 'custom-ai-agent-development',
    name: 'Custom AI Agent Development',
    description: 'Bespoke multi-agent systems, virtual project managers, and specialized agents trained on your specific client context and business needs.',
    details: 'Get tailor-made AI solutions designed from the ground up to meet your unique challenges and integrate seamlessly with your existing operations.',
    ctaLink: '/contact?service=custom-ai-dev',
    ctaText: 'Get Custom AI Solutions',
    Icon: UserCog,
  },
  {
    id: 'consulting-training',
    name: 'AI Consulting & Training',
    description: 'Strategic AI adoption consulting, project planning, implementation guidance, and team training sessions.',
    details: 'Navigate the complexities of AI adoption with expert guidance. We help you strategize, plan, and upskill your team for successful AI integration.',
    ctaLink: '/contact?service=consulting',
    ctaText: 'Empower Your Team',
    Icon: Users,
  },
  {
    id: 'website-creation',
    name: 'Modern Website Creation',
    description: 'Building responsive, conversion-focused websites, like the one you\'re on, or even more advanced platforms.',
    details: 'Establish a strong online presence with a professionally designed website. We create sites that are not only visually appealing but also optimized for performance, user experience, and achieving your business objectives. We can build sites with integrated AI features too!',
    ctaLink: '/contact?service=website-creation',
    ctaText: 'Build Your Website',
    Icon: Code,
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => (
  <RevealOnScroll delay={index * 100}>
    <div className="bg-card p-6 rounded-lg shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-primary/30 hover:scale-105">
      <div className="mb-4 text-primary">
        <service.Icon className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-foreground">{service.name}</h3>
      <p className="text-muted-foreground mb-2 text-sm">{service.description}</p>
      <p className="text-sm text-muted-foreground/80 mb-4 flex-grow"><em>{service.details}</em></p>
      <Button asChild className="mt-auto bg-accent hover:bg-accent/80 text-accent-foreground w-full">
        <Link href={service.ctaLink}>{service.ctaText}</Link>
      </Button>
    </div>
  </RevealOnScroll>
);

export default function ServicesPage() {
  return (
    <div className="pt-16 md:pt-20">
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our AI Solutions & Digital Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how Fortune AI can help your business thrive with intelligent automation, data-driven strategies, and modern digital experiences.
          </p>
        </RevealOnScroll>
      </header>

      <section id="services-list" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index: number) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          <RevealOnScroll className="text-center mt-12">
            <p className="text-md text-muted-foreground">
              Our services can be standalone projects or integrated for ongoing solutions. We are flexible to meet your needs.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll>
        <section className="py-12 md:py-20 bg-accent text-accent-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Project?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Let us help you find the perfect solution to elevate your business. 
            </p>
            <Button size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent" asChild>
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
