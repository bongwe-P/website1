// src/app/portfolio/[id]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Target as TargetIcon, BarChart2, Award } from 'lucide-react'; // Example icons

interface PortfolioItemPageProps {
  params: {
    id: string;
  };
}

// Placeholder data - in a real app, this would come from a CMS or database
const getCaseStudyData = async (id: string) => {
  // Simulate fetching data
  return {
    id,
    clientName: `Client ${id.toUpperCase()}`,
    projectTitle: `AI Automation for ${id.toUpperCase()}`,
    projectOverview: `A brief description of the project undertaken for Client ${id.toUpperCase()}, focusing on the primary objectives and the scope of work involved. This project aimed to revolutionize their operations through bespoke AI solutions. `,
    clientChallenge: [
      `The client faced significant challenges with manual data entry, leading to inefficiencies and errors. `,
      `Lack of real-time insights impacted their ability to make quick, data-driven decisions. `,
      `Customer support was overwhelmed, struggling to keep up with inquiry volumes. `,
    ],
    ourSolution: [
      {
        title: "Intelligent Automation Agent",
        description: "Developed and deployed an AI agent to automate data extraction from various sources, data validation, and entry into their CRM system. This included NLP capabilities for understanding unstructured data.",
        icon: <CheckCircle className="w-6 h-6 text-green-500" />
      },
      {
        title: "Real-time Analytics Dashboard",
        description: "Implemented a custom dashboard providing real-time visualization of key performance indicators, powered by AI-driven data analysis from multiple business systems.",
        icon: <BarChart2 className="w-6 h-6 text-blue-500" />
      },
      {
        title: "AI-Powered Chatbot",
        description: "Integrated an AI chatbot on their website and support channels to handle common customer queries, freeing up human agents for complex issues.",
        icon: <CheckCircle className="w-6 h-6 text-green-500" />
      }
    ],
    measurableResults: [
      {
        metric: "40% Reduction in Manual Data Entry Time",
        description: "The automation agent significantly cut down the hours spent on manual data tasks.",
        icon: <Award className="w-6 h-6 text-yellow-500" />
      },
      {
        metric: "25% Improvement in Decision-Making Speed",
        description: "Real-time dashboard provided actionable insights, leading to faster and more informed decisions.",
        icon: <Award className="w-6 h-6 text-yellow-500" />
      },
      {
        metric: "30% Increase in Customer Satisfaction for Support",
        description: "The AI chatbot effectively resolved a large volume of queries, improving response times.",
        icon: <Award className="w-6 h-6 text-yellow-500" />
      }
    ],
    technologiesUsed: ["Python", "Next.js", "Genkit", "Langchain", "Tailwind CSS"],
    clientTestimonial: {
      quote: "Fortune AI transformed our operations. Their custom AI solution was a game-changer, delivering tangible results and significant ROI. We couldn't be happier!",
      author: `CEO, Client ${id.toUpperCase()}`
    },
    imageSrc: "/placeholder-case-study.jpg" // Replace with actual image path or use a dynamic one
  };
};

export async function generateMetadata({ params }: PortfolioItemPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudyData(params.id);
  return {
    title: `Case Study: ${caseStudy.projectTitle} | Fortune AI`,
    description: caseStudy.projectOverview.substring(0, 160) + "...",
  };
}

const PortfolioItemPage: React.FC<PortfolioItemPageProps> = async ({ params }) => {
  const caseStudy = await getCaseStudyData(params.id);

  if (!caseStudy) {
    return <p>Case study not found.</p>;
  }

  return (
    <div className="pt-16 md:pt-20 pb-12">
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <div className="container mx-auto px-4">
          <p className="text-primary font-semibold mb-2">Case Study: {caseStudy.clientName}</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{caseStudy.projectTitle}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {caseStudy.projectOverview}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-12 md:mt-16">
        {/* Optional: Image for the case study */}
        {/* <img src={caseStudy.imageSrc} alt={caseStudy.projectTitle} className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mb-12" /> */}

        <section id="challenge" className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center">
            <TargetIcon className="w-8 h-8 text-destructive mr-3" /> The Challenge
          </h2>
          <ul className="list-disc list-outside pl-5 space-y-2 text-muted-foreground">
            {caseStudy.clientChallenge.map((challenge, index) => (
              <li key={index} className="text-lg">{challenge}</li>
            ))}
          </ul>
        </section>

        <section id="solution" className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center">
            <BrainCircuit className="w-8 h-8 text-primary mr-3" /> Our Solution
          </h2>
          <div className="space-y-8">
            {caseStudy.ourSolution.map((solutionItem, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-md flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{solutionItem.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{solutionItem.title}</h3>
                  <p className="text-muted-foreground">{solutionItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center">
            <BarChart2 className="w-8 h-8 text-green-600 mr-3" /> Measurable Results
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudy.measurableResults.map((result, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  {result.icon}
                  <h3 className="text-xl font-semibold text-foreground ml-3">{result.metric}</h3>
                </div>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {caseStudy.technologiesUsed && caseStudy.technologiesUsed.length > 0 && (
          <section id="tech-stack" className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologiesUsed.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {caseStudy.clientTestimonial && (
           <section id="testimonial" className="mb-12 md:mb-16 p-8 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Client Testimonial</h2>
            <blockquote className="text-xl italic text-center mb-4">
              <p>"{caseStudy.clientTestimonial.quote}"</p>
            </blockquote>
            <p className="text-right font-semibold">- {caseStudy.clientTestimonial.author}</p>
          </section>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Make sure to import BrainCircuit from lucide-react or another appropriate icon provider
import { BrainCircuit } from 'lucide-react'; 

export default PortfolioItemPage;
