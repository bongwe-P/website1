'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Mail, Lightbulb } from 'lucide-react';
import { BlogPost, getAllBlogPosts } from '@/lib/blog-data'; // Keep this for blog data

// PostCard can be defined here as it was before
const PostCard = ({ post, index }: { post: BlogPost, index: number }) => (
  <RevealOnScroll delay={index * 100}>
    <Link href={`/insights/${post.slug}`} className="block bg-card rounded-lg shadow-lg overflow-hidden group h-full flex flex-col">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-primary mb-1 group-hover:underline">{post.category}</p>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
        <div className="mt-auto pt-2">
          {post.tags.map((tag: string) => (
            <span key={tag} className="inline-block bg-secondary text-secondary-foreground text-xs font-medium mr-2 mb-2 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  </RevealOnScroll>
);

export default function InsightsPage() {
  const allPostsData = getAllBlogPosts(); // Fetch data directly in the component

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(allPostsData);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const categories = useMemo(() => {
    const allCategories = allPostsData.map(post => post.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [allPostsData]);

  useEffect(() => {
    let postsToFilter = allPostsData;
    if (searchTerm) {
      postsToFilter = postsToFilter.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory !== 'all') {
      postsToFilter = postsToFilter.filter(post => post.category === selectedCategory);
    }
    setFilteredPosts(postsToFilter);
  }, [searchTerm, selectedCategory, allPostsData]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription for:', newsletterEmail);
    alert(`Thank you for subscribing with ${newsletterEmail}! (This is a demo)`);
    setNewsletterEmail('');
  };

  return (
    <div className="pt-16 md:pt-20">
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Insights & Trends</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest in AI, automation best practices, and tips for small businesses.
          </p>
        </RevealOnScroll>
      </header>

      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <Input 
            type="search" 
            placeholder="Search articles by title, content, or tag..." 
            className="max-w-md flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section id="blog-grid" className="pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: BlogPost, index: number) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <RevealOnScroll>
              <p className="text-center text-muted-foreground text-lg py-10">
                No posts found matching your criteria. Try adjusting your search or filters.
              </p>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <RevealOnScroll>
        <section id="insights-cta" className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated & Share Your Ideas</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest AI insights, or let us know if there's a specific topic you'd like us to cover.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow bg-background border-border focus:ring-primary"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Mail className="w-4 h-4 mr-2" /> Subscribe
                </Button>
              </form>

              <div className="flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary mr-3" />
                <p className="text-muted-foreground">
                  Have a topic suggestion? <Link href="/contact?subject=Topic+Suggestion&message=I%20have%20a%20topic%20suggestion%20for%20the%20Fortune%20AI%20blog:" className="text-primary hover:underline font-semibold">Let us know!</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
