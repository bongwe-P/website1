'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBlogPostBySlug, BlogPost } from '@/lib/blog-data';
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
  BrainCircuit
} from 'lucide-react';

interface SuccessStoryDetails {
  clientName?: string;
  projectTitle?: string;
  projectOverview?: string;
  clientChallenge?: string[];
  ourSolution?: Array<{ title: string; description: string; iconName: string }>;
  measurableResults?: Array<{ metric: string; description: string; iconName: string }>;
  technologiesUsed?: string[];
  clientTestimonial?: { quote: string; author: string };
}

const IconMap: { [key: string]: React.ElementType } = {
  CheckCircle,
  BarChart2,
  Award,
  BrainCircuit,
  TargetIcon
};

const siteBaseUrl = 'https://www.fortuneai.co.za'; // Added for schema

export default function BlogPostClient() {
  const paramsFromHook = useParams<{ slug: string }>();
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(paramsFromHook?.slug);

  useEffect(() => {
    if (paramsFromHook && typeof paramsFromHook.slug === 'string' && paramsFromHook.slug !== currentSlug) {
      setCurrentSlug(paramsFromHook.slug);
    }
  }, [paramsFromHook, currentSlug]);


  if (currentSlug === undefined) {
    return (
      <div className="pt-16 md:pt-20 text-center py-10">
        <h1 className="text-2xl font-bold">Loading Post...</h1>
      </div>
    );
  }

  const post = getBlogPostBySlug(currentSlug) as BlogPost & SuccessStoryDetails;

  if (!post) {
    return (
      <div className="pt-16 md:pt-20 text-center py-10">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="mb-6">The blog post with slug "{currentSlug}" could not be found.</p>
        <Button asChild>
          <Link href="/blogs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
          </Link>
        </Button>
      </div>
    );
  }

  const isSuccessStory = post.category === 'Success Stories';

  const generateBlogPostingSchema = (post: BlogPost & SuccessStoryDetails) => {
    const absoluteImageUrl = post.imageUrl.startsWith('http') 
      ? post.imageUrl 
      : `${siteBaseUrl}${post.imageUrl.startsWith('/') ? post.imageUrl : '/' + post.imageUrl}`;

    return {
      '@context': 'https://schema.org',
      '@type': isSuccessStory ? 'Article' : 'BlogPosting', // Could be 'Article' for success stories if they are more formal
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteBaseUrl}/blogs/${post.slug}`,
      },
      headline: post.title,
      description: post.excerpt,
      image: absoluteImageUrl,
      author: {
        '@type': 'Organization',
        name: 'FortuneAI',
        url: siteBaseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'FortuneAI',
        logo: {
          '@type': 'ImageObject',
          url: `${siteBaseUrl}/logo.png`, 
        },
      },
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(), // Assuming dateModified is the same as datePublished, update if you have a modified date
      articleBody: post.content || post.projectOverview, // Use content or project overview
      keywords: post.tags ? post.tags.join(', ') : post.category // Add tags or category as keywords
    };
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogPostingSchema(post)) }}
      />
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
                  alt={`Image for blog post titled: ${post.title}`}
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
          <article className={`py-8 md:py-12 prose dark:prose-invert lg:prose-xl mx-auto px-4 ${isSuccessStory ? 'max-w-4xl' : 'max-w-3xl' }`}>
            {isSuccessStory ? (
              <>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={`Image for case study titled: ${post.title}`}
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
              <>
                <p>{post.excerpt}</p>
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
    </>
  );
}
