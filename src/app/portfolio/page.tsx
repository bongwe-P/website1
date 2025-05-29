import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio - Success Stories & Case Studies | FortuneAI',
  description: 'Discover how FortuneAI has empowered businesses with AI-driven solutions. Explore our case studies and see the tangible results we deliver in automation, efficiency, and growth.',
  openGraph: {
    title: 'Portfolio - Success Stories & Case Studies | FortuneAI',
    description: 'Explore FortuneAI\'s case studies and see the tangible results we deliver in automation, efficiency, and growth.',
  },
  twitter: {
    title: 'Portfolio - Success Stories & Case Studies | FortuneAI',
    description: 'Explore FortuneAI\'s case studies and see the tangible results we deliver in automation, efficiency, and growth.',
  },
};

// 'use client'; // Commented out

const portfolioItems = [
  {
    id: 'case-study-1',
    title: 'Automated Customer Support for E-commerceCo',
    challenge: 'E-commerceCo was struggling with high volumes of customer inquiries, leading to slow response times and customer dissatisfaction.',
    solution: 'Fortune AI developed and implemented a custom AI chatbot that handled 80% of common inquiries, freeing up human agents for complex issues.',
    results: 'Reduced response time by 90%, increased customer satisfaction by 25%, and saved 15 hours of agent work per week.',
    imageUrl: 'https://picsum.photos/seed/cs1/600/400',
    tags: ['Chatbot', 'Customer Support', 'E-commerce'],
  },
  {
    id: 'case-study-2',
    title: 'Streamlined Data Entry for FinanceFirm',
    challenge: 'FinanceFirm spent hundreds of hours monthly on manual data entry from various documents, leading to errors and inefficiencies.',
    solution: 'We deployed an AI-powered workflow automation tool that extracted, validated, and entered data automatically.',
    results: 'Achieved 99.5% data accuracy, reduced manual data entry time by 70%, and improved overall operational efficiency.',
    imageUrl: 'https://picsum.photos/seed/cs2/600/400',
    tags: ['Workflow Automation', 'Data Entry', 'Finance'],
  },
];

const PortfolioCard = ({ item, index }: { item: typeof portfolioItems[0], index: number }) => (
  <RevealOnScroll delay={index * 100}>
    <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-3 text-primary">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-2"><strong>Challenge:</strong> {item.challenge}</p>
        <p className="text-sm text-muted-foreground mb-2"><strong>Solution:</strong> {item.solution}</p>
        <p className="text-sm text-muted-foreground font-semibold mb-4"><strong>Results:</strong> {item.results}</p>
        <div className="mt-auto pt-4 border-t border-border">
          {item.tags.map((tag: string) => (
            <span key={tag} className="inline-block bg-secondary text-muted-foreground text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

export default function PortfolioPage() {
  return (
    <div className="pt-16 md:pt-20">
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Success Stories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how Fortune AI has helped businesses like yours achieve real results through intelligent automation.
          </p>
        </RevealOnScroll>
      </header>

      <section id="portfolio-grid" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index: number) => (
              <PortfolioCard key={item.id} item={item} index={index} />
            ))}
          </div>
          {portfolioItems.length === 0 && (
            <RevealOnScroll>
              <p className="text-center text-muted-foreground text-lg py-10">
                Our case studies are coming soon! Check back to see how we're helping businesses succeed.
              </p>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <RevealOnScroll>
        <section className="py-12 md:py-16 text-center bg-secondary">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to be our next success story?</h2>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/80 text-accent-foreground">
                <Link href="/contact">Get in Touch</Link>
            </Button>
        </section>
      </RevealOnScroll>
    </div>
  );
}
