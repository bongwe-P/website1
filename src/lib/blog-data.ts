export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  // Add any other fields like full content if it will be stored here
  // content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Rise of AI Agents: What Small Businesses Need to Know',
    slug: 'rise-of-ai-agents-small-businesses',
    date: '2024-07-28',
    excerpt: 'AI agents are no longer just for large enterprises. Discover how they can revolutionize your small business operations.',
    imageUrl: 'https://picsum.photos/seed/blog1/600/400',
    category: 'AI Trends',
    tags: ['AI Agents', 'Small Business', 'Automation'],
  },
  {
    id: 'post-2',
    title: '5 Ways to Automate Your Customer Service with AI',
    slug: '5-ways-automate-customer-service-ai',
    date: '2024-07-20',
    excerpt: 'Customer service is critical. Learn five practical ways AI can help you improve response times and customer satisfaction.',
    imageUrl: 'https://picsum.photos/seed/blog2/600/400',
    category: 'Automation',
    tags: ['Customer Service', 'Chatbots', 'Efficiency'],
  },
  {
    id: 'post-3',
    title: 'Demystifying AI: A Guide for Non-Technical Founders',
    slug: 'demystifying-ai-non-technical-founders',
    date: '2024-07-15',
    excerpt: 'Feeling overwhelmed by AI jargon? This guide breaks down the essentials for business leaders.',
    imageUrl: 'https://picsum.photos/seed/blog3/600/400',
    category: 'AI Explained',
    tags: ['AI Basics', 'Founders', 'Technology'],
  },
  {
    id: 'post-4',
    title: 'The Future of Workflow Automation with Multi-Agent Systems',
    slug: 'future-workflow-automation-multi-agent-systems',
    date: '2024-07-10',
    excerpt: 'Explore how interconnected AI agents are set to redefine efficiency in complex business workflows.',
    imageUrl: 'https://picsum.photos/seed/blog4/600/400',
    category: 'Automation',
    tags: ['Multi-Agent Systems', 'Workflow', 'Future of Work'],
  },
  {
    id: 'post-5',
    title: 'Getting Started with AI: Practical Tips for Small Businesses',
    slug: 'getting-started-ai-small-businesses',
    date: '2024-07-05',
    excerpt: 'A beginner-friendly guide to integrating AI into your small business without breaking the bank.',
    imageUrl: 'https://picsum.photos/seed/blog5/600/400',
    category: 'AI Trends',
    tags: ['Small Business', 'AI Implementation', 'Cost-Effective AI'],
  },
];

// Function to get a single blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get all blog posts (useful for the insights page)
export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts;
};
