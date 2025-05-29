import type { Metadata } from 'next';
import BlogsClient from './blogs-client'; // Import the new client component

export const metadata: Metadata = {
  title: 'FortuneAI Blog - AI Insights, Automation Tips & Business Growth Strategies',
  description: 'Stay informed with the FortuneAI blog. Discover the latest in AI, automation best practices, success stories, and practical tips for leveraging technology to grow your business.',
  openGraph: {
    title: 'FortuneAI Blog - AI Insights, Automation Tips & Business Growth Strategies',
    description: 'Explore articles on AI, business automation, and growth strategies on the FortuneAI blog.',
  },
  twitter: {
    title: 'FortuneAI Blog - AI Insights, Automation Tips & Business Growth Strategies',
    description: 'Explore articles on AI, business automation, and growth strategies on the FortuneAI blog.',
  },
};

// This page.tsx is now a Server Component
export default function BlogsPage() {
  return <BlogsClient />;
}
