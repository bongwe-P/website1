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
import { ChatbotInitializer } from '@/components/layout/ChatbotInitializer'; // Import the new component

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
  keywords: ['AI solutions', 'business growth', 'personalized strategies', 'data insights', 'automation', 'machine learning', 'Fortune AI', 'South Africa'],
  robots: 'index, follow',
  openGraph: {
    title: 'Fortune AI - Unlock Your Business Potential',
    description: 'AI-driven insights and personalized strategies for business growth. Discover how Fortune AI can revolutionize your operations, boost efficiency, and unlock new opportunities.',
    url: siteBaseUrl,
    siteName: 'Fortune AI',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fortune AI',
  url: siteBaseUrl,
  logo: `${siteBaseUrl}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+27-64-766-8853',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.linkedin.com/in/phathutshedzo-bongwe-17b43b2b2',
    'https://www.instagram.com/bongwe__?igsh=cjJraXJxeHMwbDll&utm_source=qr',
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
        <ChatbotInitializer /> {/* Add the new component here */}
      </body>
    </html>
  );
}
