import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { PageTransitionWrapper } from '@/components/layout/PageTransitionWrapper';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader'; // Added import
// Removed TopProgressBar import

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FortuneAI - Unlock Your Business Potential',
  description: 'AI-driven insights and personalized strategies for business growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">{/* Apply dark class for dark theme by default */}
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true} 
      >
        <Preloader /> {/* Added Preloader */}
        <CustomCursor />
        {/* Removed TopProgressBar */}
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-grow pt-16 flex flex-col">
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
