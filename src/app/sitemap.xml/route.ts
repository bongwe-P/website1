
import { getAllBlogPosts } from '@/lib/blog-data'; // Corrected import

const URL = 'https://fortuneai.co.za';

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    '', // Homepage
    '/about',
    '/blogs',
    '/contact',
    '/portfolio',
    '/services',
  ];

  const sitemapEntries = staticPages.map((path) => ({
    url: `${URL}${path}`,
    lastModified: today,
  }));

  // Fetch blog posts using the function
  const blogPosts = getAllBlogPosts(); 

  const blogPostEntries = blogPosts.map((post) => ({
    url: `${URL}/blogs/${post.slug}`,
    lastModified: post.date || today, // Use post date if available, otherwise today
  }));

  const allEntries = [...sitemapEntries, ...blogPostEntries];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allEntries
    .map(
      (entry) => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
