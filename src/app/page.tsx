'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { ServicesOverviewSection } from '@/components/sections/services-overview-section'; // Updated import
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactFormSection } from '@/components/sections/contact-form-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverviewSection /> {/* Updated component */}
      <WhoWeAreSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactFormSection />
    </>
  );
}
