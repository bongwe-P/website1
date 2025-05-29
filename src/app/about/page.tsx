import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Target, Lightbulb, Handshake, ShieldCheck, BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About FortuneAI - Our Mission, Vision, and Values',
  description: 'Learn about FortuneAI, our mission to democratize AI through intelligent agents, our vision for the future of business automation, and the core values that drive us.',
  openGraph: {
    title: 'About FortuneAI - Our Mission, Vision, and Values',
    description: 'Learn about FortuneAI, our mission to democratize AI through intelligent agents, our vision for the future of business automation, and the core values that drive us.',
  },
  twitter: {
    title: 'About FortuneAI - Our Mission, Vision, and Values',
    description: 'Learn about FortuneAI, our mission to democratize AI through intelligent agents, our vision for the future of business automation, and the core values that drive us.',
  },
};

const MissionVisionSection = () => (
  <section id="mission-vision" className="py-12 md:py-20 bg-card text-card-foreground">
    <div className="container mx-auto px-4">
      <RevealOnScroll className="text-center">
        <BrainCircuit className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Vision</h2>
        <h3 className="text-2xl font-semibold text-primary mb-3">Mission</h3>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          "At Fortune AI, we empower businesses with intelligent agents that drive success. Our solutions are designed to easily integrate into your operations, providing insights and automation that enhances efficiency and decision-making."
        </p>
        <h3 className="text-2xl font-semibold text-primary mb-3">Vision</h3>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          To be a leading provider of AI automation solutions for businesses across Africa and beyond, pioneering the concept of "agents as the new apps" – powerful, intuitive AI tools accessible to everyone.
        </p>
      </RevealOnScroll>
    </div>
  </section>
);

const FounderStorySection = () => (
  <section id="founder-story" className="py-12 md:py-20">
    <div className="container mx-auto px-4">
      <RevealOnScroll className="text-center">
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">The Founder's Story</h2>
        <div className="max-w-3xl mx-auto text-lg text-muted-foreground space-y-4">
          <p>
            Fortune AI was founded by Phathutshedzo Fortune Bongwe, a driven Computer Science and Business Computing student at UCT. 
            With a deep passion for artificial intelligence and its potential to transform businesses, Phathutshedzo embarked on a mission to make these powerful tools accessible to all.
          </p>
          <p>
            The motivation behind Fortune AI is a commitment to building tools that make a real difference – democratizing AI by creating practical, cost-effective solutions that enhance efficiency and empower businesses to thrive in an increasingly digital world.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const OurApproachSection = () => (
  <section id="our-approach" className="py-12 md:py-20 bg-card text-card-foreground">
    <div className="container mx-auto px-4">
      <RevealOnScroll className="text-center">
        <Target className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Approach</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Lean & Remote Operations</h3>
            <p className="text-muted-foreground">We maintain a flexible, remote operational model to stay agile and keep costs down, passing those savings and efficiencies onto you.</p>
          </div>
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Practical & Cost-Effective</h3>
            <p className="text-muted-foreground">Our focus is on delivering AI solutions that provide tangible value without breaking the bank, ensuring a strong ROI.</p>
          </div>
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Consultative & Iterative</h3>
            <p className="text-muted-foreground">We start with a discovery session and often use prototyping to ensure we understand your needs, committing to continuous improvement.</p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const OurValuesSection = () => (
  <section id="our-values" className="py-12 md:py-20">
    <div className="container mx-auto px-4">
      <RevealOnScroll className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            { Icon: Lightbulb, name: 'Innovation', text: 'Continuously exploring new AI technologies to provide cutting-edge solutions.' },
            { Icon: Handshake, name: 'Client Success', text: 'Your success is our success. We partner with you to achieve your business goals.' },
            { Icon: Users, name: 'Accessibility', text: 'Making powerful AI tools understandable, usable, and affordable for all businesses.' },
            { Icon: ShieldCheck, name: 'Integrity', text: 'Operating with transparency, honesty, and a commitment to ethical AI practices.' },
          ].map((value, index) => (
            <RevealOnScroll key={value.name} delay={index * 100}>
              <div className="p-6 bg-card rounded-lg shadow-lg text-center h-full">
                <value.Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{value.name}</h3>
                <p className="text-muted-foreground text-sm">{value.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20"> 
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Fortune AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are dedicated to democratizing AI, empowering businesses with intelligent automation to drive growth and efficiency.
          </p>
        </RevealOnScroll>
      </header>
      
      <MissionVisionSection />
      <FounderStorySection />
      <OurApproachSection />
      <OurValuesSection />

      <RevealOnScroll>
        <section className="py-12 md:py-20 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Discover how our AI solutions can be tailored to your unique needs. 
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-background text-foreground hover:bg-background/90">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
