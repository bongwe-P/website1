import type { Metadata } from 'next';
import ContactClient from './contact-client'; // Import the new client component

export const metadata: Metadata = {
  title: 'Contact FortuneAI - Get in Touch for AI Solutions',
  description: 'Contact FortuneAI to discuss your project, ask a question, or schedule a discovery session. We\'re here to help you leverage AI for business success.',
  openGraph: {
    title: 'Contact FortuneAI - Get in Touch for AI Solutions',
    description: 'Reach out to FortuneAI to explore AI-driven solutions for your business. We offer consultations to help you get started.',
  },
  twitter: {
    title: 'Contact FortuneAI - Get in Touch for AI Solutions',
    description: 'Reach out to FortuneAI to explore AI-driven solutions for your business. We offer consultations to help you get started.',
  },
};

// This page.tsx is now a Server Component
export default function ContactPage() {
  return <ContactClient />;
}
