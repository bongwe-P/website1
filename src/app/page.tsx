import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesOverviewSection } from '@/components/sections/services-overview-section';
import { ROICallToActionSection } from '@/components/sections/ROICallToActionSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactFormSection } from '@/components/sections/contact-form-section';

export const metadata: Metadata = {
  title: 'FortuneAI - AI-Powered Business Solutions for Growth & Efficiency', // More specific title for home
  description: 'Transform your business with FortuneAI. We leverage cutting-edge AI to deliver personalized strategies for operational efficiency, enhanced customer engagement, and sustainable growth. Explore our services.',
  openGraph: {
    title: 'FortuneAI - AI-Powered Business Solutions for Growth & Efficiency',
    description: 'Transform your business with FortuneAI. We leverage cutting-edge AI to deliver personalized strategies for operational efficiency, enhanced customer engagement, and sustainable growth. Explore our services.',
    // You can specify a unique image for the homepage if desired, otherwise it uses the default from layout.tsx
    // images: [
    //   {
    //     url: 'https://www.fortuneai.com/home-og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'FortuneAI Homepage Hero Image',
    //   },
    // ],
  },
  twitter: {
    title: 'FortuneAI - AI-Powered Business Solutions for Growth & Efficiency',
    description: 'Transform your business with FortuneAI. We leverage cutting-edge AI to deliver personalized strategies for operational efficiency, enhanced customer engagement, and sustainable growth. Explore our services.',
    // You can specify a unique image for the homepage if desired
    // images: ['https://www.fortuneai.com/home-twitter-image.png'],
  },
};

export default function HomePage() {
  // 'use client' directive should NOT be here as metadata is a server feature
  // If this page needs client-side interactivity, it should be in components imported here.
  return (
    <>
      <HeroSection />
      <ServicesOverviewSection />
      <ROICallToActionSection />
      <WhoWeAreSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactFormSection />
    </>
  );
}
