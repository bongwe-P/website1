import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, Zap, Target, PieChart, UserCog, Users, Code, Brain, PhoneCall, MessageSquareHeart, Laptop } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our AI & Digital Services - FortuneAI',
  description: 'Explore FortuneAI\'s comprehensive suite of services: AI-powered customer engagement, workflow automation, sales & marketing automation, data analysis, custom AI agent development, AI consulting, website creation, and app development.',
  openGraph: {
    title: 'Our AI & Digital Services - FortuneAI',
    description: 'Explore FortuneAI\'s comprehensive suite of services, including AI automation, data analysis, custom AI development, and modern web solutions.',
  },
  twitter: {
    title: 'Our AI & Digital Services - FortuneAI',
    description: 'Explore FortuneAI\'s comprehensive suite of services, including AI automation, data analysis, custom AI development, and modern web solutions.',
  },
};

const siteBaseUrl = 'https://www.fortuneai.co.za'; // Added for schema

const services = [
  {
    id: 'ai-customer-engagement',
    name: 'AI-Powered Customer Engagement',
    description: '24/7 chatbots, virtual assistants for inquiries, support, appointments, and lead qualification.',
    details: 'Supercharge your customer interactions with AI. We deploy intelligent chatbots and virtual assistants that operate around the clock, providing instant responses to inquiries, offering comprehensive support, seamlessly scheduling appointments, and effectively qualifying leads. This not only enhances customer satisfaction by providing immediate assistance but also frees up your human team to focus on more complex and strategic tasks, boosting overall operational efficiency.',
    ctaLink: '/contact?service=ai-customer-engagement',
    ctaText: 'Automate Customer Service',
    Icon: MessageSquareHeart,
  },
  {
    id: 'workflow-automation',
    name: 'Workflow & Process Automation',
    description: 'Automating data entry, invoicing, email responses, report generation, and other repetitive tasks.',
    details: 'Reclaim countless hours and minimize human error by automating your core business processes. Our AI solutions can handle tedious tasks like data entry, invoice processing, generating standard email responses, compiling reports, and much more. This streamlining of operations not only boosts productivity but also improves accuracy and allows your employees to concentrate on high-value activities that drive growth.',
    ctaLink: '/contact?service=workflow-automation',
    ctaText: 'Optimize Your Workflows',
    Icon: Zap,
  },
  {
    id: 'sales-marketing-automation',
    name: 'Sales & Marketing Automation',
    description: 'Lead nurturing, campaign execution, lead scoring, personalized follow-ups, social media automation, AI voice assistants for call scheduling and outreach, and marketing copy generation.',
    details: 'Revolutionize your sales and marketing efforts with intelligent automation. We implement AI-driven systems for sophisticated lead nurturing sequences, automated campaign execution across multiple channels, intelligent lead scoring to prioritize high-potential prospects, and personalized automated follow-ups. Our services now include AI voice assistants capable of scheduling calls and even making initial outreach calls, significantly boosting your sales team’s efficiency. We also leverage AI to generate compelling marketing copy and automate social media management, ensuring a consistent and engaging brand presence.',
    ctaLink: '/contact?service=sales-marketing-automation',
    ctaText: 'Boost Your Sales Engine',
    Icon: Target,
  },
  {
    id: 'data-analysis-decision-support',
    name: 'Data Analysis & Decision Support',
    description: 'Processing business data, generating insights/reports, and creating real-time dashboards/alerts.',
    details: 'Transform your raw data into actionable intelligence. Our AI-powered analytics platforms process vast amounts of business data to uncover hidden patterns, generate comprehensive reports, and create intuitive real-time dashboards with custom alerts. This enables you to make data-driven decisions with confidence, identify emerging market trends, optimize your strategies, and discover new growth opportunities that might otherwise go unnoticed.',
    ctaLink: '/contact?service=data-analysis',
    ctaText: 'Unlock Data Insights',
    Icon: PieChart,
  },
  {
    id: 'custom-ai-agent-development',
    name: 'Custom AI Agent Development',
    description: 'Bespoke multi-agent systems, virtual project managers, specialized agents trained on your client context, and AI voice assistants for specific tasks.',
    details: 'Get AI solutions built specifically for your unique business needs. We specialize in developing custom AI agents, including sophisticated multi-agent systems for complex workflow automation, virtual project managers to oversee tasks and timelines, and specialized agents trained on your proprietary data and client context. This includes crafting AI voice assistants designed for specific operational functions, ensuring seamless integration and maximum impact on your unique challenges.',
    ctaLink: '/contact?service=custom-ai-dev',
    ctaText: 'Get Custom AI Solutions',
    Icon: UserCog,
  },
  {
    id: 'consulting-training',
    name: 'AI Strategy, Consulting & Training',
    description: 'Strategic AI adoption roadmaps, project planning, implementation guidance, change management, and comprehensive team training sessions.',
    details: 'Successfully navigate the complexities of AI adoption with our expert guidance. We provide strategic consulting to develop clear AI adoption roadmaps, detailed project planning, hands-on implementation support, and effective change management strategies. Furthermore, we empower your team with comprehensive training sessions tailored to different skill levels, ensuring they are proficient and confident in using new AI tools and systems.',
    ctaLink: '/contact?service=consulting',
    ctaText: 'Empower Your Team',
    Icon: Brain,
  },
  {
    id: 'website-creation-modernization',
    name: 'Modern Website Creation & Modernization',
    description: "Building responsive, conversion-focused websites, like the one you're on, or even more advanced platforms with integrated AI features.",
    details: 'Establish or upgrade your digital storefront with a cutting-edge website. We design and develop responsive, visually stunning, and conversion-focused websites that deliver exceptional user experiences. Whether you need a brand new site, a redesign of an existing one, or the integration of advanced AI features (like chatbots or personalized content delivery), we build platforms that not only look great but are also optimized for performance, SEO, and achieving your specific business goals.',
    ctaLink: '/contact?service=website-creation',
    ctaText: 'Build/Upgrade Your Website',
    Icon: Code,
  },
  {
    id: 'custom-app-web-development',
    name: 'Custom App & Web App Development',
    description: 'Building tailored web and mobile applications to solve specific business challenges and create unique user experiences.',
    details: 'Beyond standard websites, we develop custom web applications and mobile apps designed to meet your unique operational needs or innovative product ideas. From complex internal tools to customer-facing platforms, our development process focuses on scalability, usability, and robust performance to deliver solutions that provide a distinct competitive advantage.',
    ctaLink: '/contact?service=custom-app-web-development',
    ctaText: 'Develop Your Custom App',
    Icon: Laptop,
  },
  {
    id: 'ai-voice-solutions',
    name: 'AI Voice Assistant Solutions',
    description: 'Intelligent voice assistants for call scheduling, automated phone calls, customer service, and internal task automation.',
    details: 'Leverage the power of voice with our custom AI voice assistant solutions. We design and deploy intelligent voice agents that can manage call scheduling, make automated yet personalized phone calls for sales or surveys, provide voice-based customer service, and even automate internal tasks through voice commands. This technology can significantly improve efficiency and create novel interaction channels with your clients and for your team.',
    ctaLink: '/contact?service=ai-voice-solutions',
    ctaText: 'Implement Voice AI',
    Icon: PhoneCall,
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
  const generateServiceSchema = (service: typeof services[0]) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.details, // Using more detailed description
    url: `${siteBaseUrl}/services#${service.id}`,
    provider: {
      '@type': 'Organization',
      name: 'FortuneAI',
      url: siteBaseUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    // Example of potentialAction for a service
    potentialAction: {
      '@type': 'ReserveAction', // Or OrderAction, etc.
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteBaseUrl}${service.ctaLink}`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/IOSPlatform',
          'http://schema.org/AndroidPlatform'
        ]
      },
      name: service.ctaText
    }
  });

  return (
    <>
      {/* Add JSON-LD schema for each service */} 
      {services.map(service => (
        <script
          key={service.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }}
        />
      ))}
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
              <Button size="lg" variant="outline" className="border-accent-foreground text-accent hover:bg-accent-foreground hover:text-accent" asChild>
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </>
  );
}
