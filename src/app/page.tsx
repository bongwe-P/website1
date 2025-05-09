import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PersonalizedGreetingSection } from '@/components/sections/personalized-greeting-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactFormSection } from '@/components/sections/contact-form-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PersonalizedGreetingSection />
      <TestimonialsSection />
      <ContactFormSection />
    </>
  );
}
