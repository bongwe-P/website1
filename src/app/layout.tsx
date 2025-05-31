import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { PageTransitionWrapper } from '@/components/layout/PageTransitionWrapper';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { ChatbotInitializer } from '@/components/layout/ChatbotInitializer'; 

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteBaseUrl = 'https://www.fortuneai.co.za'; 

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Fortune AI - Unlock Your Business Potential',
    template: '%s | Fortune AI',
  },
  description: 'AI-driven insights and personalized strategies for business growth. Discover how Fortune AI can revolutionize your operations, boost efficiency, and unlock new opportunities.',
  keywords: ['AI solutions', 'business growth', 'personalized strategies', 'data insights', 'automation', 'machine learning', 'Fortune AI', 'South Africa', 'chatbot', 'AI assistant'],
  robots: 'index, follow',
  openGraph: {
    title: 'Fortune AI - Unlock Your Business Potential',
    description: 'AI-driven insights and personalized strategies for business growth. Discover how Fortune AI can revolutionize your operations, boost efficiency, and unlock new opportunities.',
    url: siteBaseUrl,
    siteName: 'Fortune AI',
    images: [
      {
        url: '/og-image.png', // Ensure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: 'Fortune AI Logo and Tagline',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fortune AI - Unlock Your Business Potential',
    description: 'AI-driven insights and personalized strategies for business growth. Discover how Fortune AI can revolutionize your operations, boost efficiency, and unlock new opportunities.',
    images: [`${siteBaseUrl}/twitter-image.png`], // Ensure this image exists in your public folder
    creator: '@YourTwitterHandle', // Replace with your actual Twitter handle
  },
  icons: {
    icon: '/favicon.ico', // Ensure this exists
    shortcut: '/favicon-16x16.png', // Ensure this exists
    apple: '/apple-touch-icon.png', // Ensure this exists
  },
  manifest: `${siteBaseUrl}/site.webmanifest`, // Ensure this file exists and is configured
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fortune AI',
  url: siteBaseUrl,
  logo: `${siteBaseUrl}/logo.png`, // Ensure this image exists
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+27-64-766-8853',
    contactType: 'customer service',
    areaServed: 'ZA', // South Africa
    availableLanguage: ['en']
  },
  sameAs: [
    'https://www.linkedin.com/in/phathutshedzo-bongwe-17b43b2b2',
    'https://www.instagram.com/bongwe__?igsh=cjJraXJxeHMwbDll&utm_source=qr',
    // Add other social media links if you have them (e.g., Twitter, Facebook)
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fortune AI',
  url: siteBaseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteBaseUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fortune AI',
    logo: {
      '@type': 'ImageObject',
      url: `${siteBaseUrl}/logo.png`,
    },
  },
};

const botApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fortune AI Assistant',
  applicationCategory: 'BusinessApplication',
  applicationSuite: 'Fortune AI Customer Support',
  operatingSystem: 'Web', // Indicates it runs in a browser
  softwareVersion: '1.0', // You can update this as you iterate
  description: 'An AI-powered chatbot to assist users and answer questions on the Fortune AI website.',
  interactionStatistic: [
    {
      '@type': 'InteractionCounter',
      interactionType: {'@type': 'ListenAction'}, // The bot listens for user input
      userInteractionCount: 0 // This would ideally be dynamic, but static is fine as a start
    },
    {
      '@type': 'InteractionCounter',
      interactionType: {'@type': 'CommunicateAction'}, // The bot communicates responses
      userInteractionCount: 0
    }
  ],
  potentialAction: {
    '@type': 'InteractAction',
    name: 'Chat with Fortune AI Assistant',
    target: siteBaseUrl, // The chatbot is available on the main site
    interactionType: {'@type': 'CommunicateAction'},
    agent: {
        '@type': 'Person', // Or Organization if preferred
        name: 'Fortune AI Assistant'
    }
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fortune AI'
  },
  featureList: [
    'Answers FAQs',
    'Provides information about Fortune AI services',
    'Assists with user queries'
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(botApplicationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Preloader />
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-grow pt-16 flex flex-col">
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </main>
        <Footer />
        <Toaster />
        <ChatbotInitializer /> 
      </body>
    </html>
  );
}
