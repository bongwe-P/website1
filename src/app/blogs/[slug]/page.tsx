import type { Metadata } from 'next';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog-data';
import BlogPostClient from './blog-post-client'; // Import the new client component

const siteBaseUrl = 'https://www.fortuneai.co.za';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    };
  }

  // Ensure imageUrl is absolute, prepending domain if necessary
  const absoluteImageUrl = post.imageUrl.startsWith('http') 
    ? post.imageUrl 
    : `${siteBaseUrl}${post.imageUrl.startsWith('/') ? post.imageUrl : '/' + post.imageUrl}`;

  return {
    title: `${post.title} - FortuneAI Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - FortuneAI Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['FortuneAI Team'], 
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - FortuneAI Blog`,
      description: post.excerpt,
      images: [absoluteImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient />;
}
