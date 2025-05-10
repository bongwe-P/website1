// src/app/blogs/[slug]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { getBlogPostBySlug, BlogPost } from '@/lib/blog-data'; // Ensure BlogPost is imported if not already
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CalendarDays,
  Tag,
  ArrowLeft,
  CheckCircle,
  Target as TargetIcon,
  BarChart2,
  Award,
  BrainCircuit // Assuming this is for success stories
} from 'lucide-react';

// Define a type for Success Story specific fields if they exist on the BlogPost object
// This is illustrative. You'd fetch the actual structure for success stories.
interface SuccessStoryDetails {
  clientName?: string;
  projectTitle?: string; // This might be the same as post.title
  projectOverview?: string; // This might be the same as post.excerpt
  clientChallenge?: string[];
  ourSolution?: Array<{ title: string; description: string; iconName: string }>; // iconName to map to Lucide icons
  measurableResults?: Array<{ metric: string; description: string; iconName: string }>;
  technologiesUsed?: string[];
  clientTestimonial?: { quote: string; author: string };
  // Add other fields specific to success stories from your blog-data.ts for post-8
}

const IconMap: { [key: string]: React.ElementType } = {
  CheckCircle,
  BarChart2,
  Award,
  BrainCircuit,
  TargetIcon
};

const BlogPostPage: React.FC = () => {
  const paramsFromHook = useParams<{ slug: string }>();
  const slug = paramsFromHook.slug;
  const post = getBlogPostBySlug(slug) as BlogPost & SuccessStoryDetails; // Cast to include potential success story fields

  if (!post) {
    return (
      <div className="pt-16 md:pt-20 text-center py-10">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="mb-6">The blog post with slug "{slug}" could not be found.</p>
        <Button asChild>
          <Link href="/blogs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
          </Link>
        </Button>
      </div>
    );
  }

  // Check if this post is a success story to render it differently
  const isSuccessStory = post.category === 'Success Stories';

  return (
    <div className="pt-16 md:pt-20">
      <RevealOnScroll>
        <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
          <div className="container mx-auto px-4">
            {isSuccessStory && post.clientName && (
              <p className="text-primary font-semibold mb-2">Case Study: {post.clientName}</p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1.5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5" />
                <span>{post.category}</span>
              </div>
            </div>
            {post.imageUrl && !isSuccessStory && (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full max-w-3xl mx-auto h-auto object-cover rounded-lg shadow-lg my-6 md:my-8"
              />
            )}
             {isSuccessStory && post.projectOverview && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
                {post.projectOverview}
              </p>
            )}
          </div>
        </header>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <article className={`py-8 md:py-12 prose dark:prose-invert lg:prose-xl max-w-3xl mx-auto px-4 ${isSuccessStory ? 'max-w-4xl' : 'max-w-3xl' }`}>
          {/* Conditional Rendering for Success Stories */}
          {isSuccessStory ? (
            <>
              {post.imageUrl && (
                 <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-auto max-h-[450px] object-cover rounded-lg shadow-lg mb-10 md:mb-12"
                />
              )}
              {post.clientChallenge && post.clientChallenge.length > 0 && (
                <section id="challenge" className="mb-10 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-5 flex items-center">
                    <TargetIcon className="w-8 h-8 text-destructive mr-3 flex-shrink-0" /> The Challenge
                  </h2>
                  <ul className="list-disc list-outside pl-5 space-y-2 text-muted-foreground">
                    {post.clientChallenge.map((challenge, index) => (
                      <li key={index} className="text-lg">{challenge}</li>
                    ))}
                  </ul>
                </section>
              )}

              {post.ourSolution && post.ourSolution.length > 0 && (
                <section id="solution" className="mb-10 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center">
                    <BrainCircuit className="w-8 h-8 text-primary mr-3 flex-shrink-0" /> Our Solution
                  </h2>
                  <div className="space-y-6">
                    {post.ourSolution.map((solutionItem, index) => {
                      const IconComponent = solutionItem.iconName ? IconMap[solutionItem.iconName] : CheckCircle;
                      return (
                        <div key={index} className="p-5 bg-card/80 rounded-lg shadow flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            <IconComponent className={`w-7 h-7 ${solutionItem.iconName === 'BarChart2' ? 'text-blue-500' : 'text-green-500'}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">{solutionItem.title}</h3>
                            <p className="text-muted-foreground">{solutionItem.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {post.measurableResults && post.measurableResults.length > 0 && (
                <section id="results" className="mb-10 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center">
                    <BarChart2 className="w-8 h-8 text-green-600 mr-3 flex-shrink-0" /> Measurable Results
                  </h2>
                  <div className="grid md:grid-cols-1 gap-5">
                    {post.measurableResults.map((result, index) => {
                       const IconComponent = result.iconName ? IconMap[result.iconName] : Award;
                      return (
                        <div key={index} className="p-5 bg-card/80 rounded-lg shadow">
                          <div className="flex items-center mb-2">
                            <IconComponent className="w-6 h-6 text-yellow-500 mr-2.5 flex-shrink-0" />
                            <h3 className="text-xl font-semibold text-foreground">{result.metric}</h3>
                          </div>
                          <p className="text-muted-foreground ml-8">{result.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
              
              {post.technologiesUsed && post.technologiesUsed.length > 0 && (
                <section id="tech-stack" className="mb-10 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-center">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {post.technologiesUsed.map((tech, index) => (
                      <Badge key={index} variant="default" className="px-3 py-1 text-sm bg-primary/15 text-primary-foreground hover:bg-primary/25">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {post.clientTestimonial && (
                <section id="testimonial" className="my-10 md:my-12 p-6 md:p-8 bg-gradient-to-r from-primary/80 to-accent/80 text-white rounded-lg shadow-xl">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-center text-background">Client Testimonial</h2>
                  <blockquote className="text-xl italic text-center mb-3">
                    <p>"{post.clientTestimonial.quote}"</p>
                  </blockquote>
                  <p className="text-right font-semibold text-background/90">- {post.clientTestimonial.author}</p>
                </section>
              )}
            </>
          ) : (
            // Default rendering for standard blog posts
            <>
              <p>{post.excerpt}</p>
              {/* Placeholder for full content for regular blog posts */}
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} /> // Assuming content is HTML
              ) : (
                <p className="mt-8 text-center text-muted-foreground">
                  <em>Full blog post content will appear here when available.</em>
                </p>
              )}
            </>
          )}
        </article>
      </RevealOnScroll>

      {post.tags && post.tags.length > 0 && (
        <RevealOnScroll delay={300}>
          <section className="py-8 max-w-3xl mx-auto px-4">
            <h3 className="text-lg font-semibold mb-3 text-center">Tags</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </section>
        </RevealOnScroll>
      )}

      <div className="text-center my-8 md:my-12">
        <Button asChild variant="outline">
          <Link href="/blogs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Blogs
          </Link>
        </Button>
      </div>

    </div>
  );
};

export default BlogPostPage;
