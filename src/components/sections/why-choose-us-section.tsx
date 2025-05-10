'use client';

import { RevealOnScroll } from '@/components/RevealOnScroll';
import { CheckCircle, Zap, Brain, Puzzle, TrendingUp, Clock } from 'lucide-react'; // Example icons

const benefits = [
  {
    icon: <Puzzle size={32} className="text-primary" />,
    title: "Easy Integration",
    description: "Our AI agents are designed to integrate smoothly with your current workflows, minimizing disruption and maximizing impact from day one.",
  },
  {
    icon: <Zap size={32} className="text-primary" />,
    title: "Enhanced Efficiency",
    description: "Automate repetitive tasks and free up your team to focus on strategic growth, dramatically increasing productivity.",
  },
  {
    icon: <Brain size={32} className="text-primary" />,
    title: "Data-Driven Insights",
    description: "Leverage AI-powered analytics to gain actionable insights from your data, enabling better, faster decision-making.",
  },
  {
    icon: <CheckCircle size={32} className="text-primary" />, // Placeholder, consider a more specific icon for custom solutions
    title: "Custom Solutions",
    description: "We develop AI agents tailored to your specific business needs, ensuring you get the most effective automation.",
  },
  {
    icon: <TrendingUp size={32} className="text-primary" />, // Placeholder, consider a specific icon for cost-effectiveness
    title: "Cost-Effectiveness",
    description: "Access powerful AI automation without the enterprise-level price tag, making advanced tech available to your business.",
  },
  {
    icon: <Clock size={32} className="text-primary" />,
    title: "Free Up Valuable Time",
    description: "Let our AI agents handle routine processes, so you and your team can concentrate on core business activities and innovation.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            Unlock Your Potential with <span className="text-primary">Fortune AI</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            Discover how our intelligent automation solutions can transform your business, making you more efficient, agile, and competitive.
          </p>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
              <div className="p-6 bg-card rounded-lg shadow-lg h-full flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
