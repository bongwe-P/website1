// src/app/insights/[slug]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation'; // Import useParams
import { getBlogPostBySlug } from '@/lib/blog-data';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag } from 'lucide-react';

// The page component still receives params and searchParams as props from Next.js,
// but we'll use the hook for dynamic segments in Client Components.
interface BlogPostPageProps {
  // params: { slug: string }; // No longer strictly needed if using useParams for slug
  // searchParams: { [key: string]: string | string[] | undefined };
}

const BlogPostPage: React.FC<BlogPostPageProps> = () => {
  const paramsFromHook = useParams<{ slug: string }>();
  const slug = paramsFromHook.slug; // Get slug from the hook

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="pt-16 md:pt-20 text-center py-10">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p>The blog post with slug "{slug}" could not be found.</p>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <RevealOnScroll>
        <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
          <div className="container mx-auto px-4">
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
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full max-w-3xl mx-auto h-auto object-cover rounded-lg shadow-lg my-6 md:my-8"
              />
            )}
          </div>
        </header>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <article className="py-8 md:py-12 prose dark:prose-invert lg:prose-xl max-w-3xl mx-auto px-4">
          <p>{post.excerpt}</p>
          <p className="mt-8 text-center text-muted-foreground">
            <em>Full blog post content will appear here. This is currently a placeholder using the excerpt.</em>
          </p>
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
    </div>
  );
};

export default BlogPostPage;
