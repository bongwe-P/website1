import type { Metadata } from 'next';
import RoiCalculatorClient from './roi-calculator-client'; // Import the new client component

export const metadata: Metadata = {
  title: 'AI Workflow Automation ROI Calculator - FortuneAI',
  description: 'Estimate your potential cost savings and ROI by implementing AI-powered workflow automation with FortuneAI. Input your current process details to see the benefits.',
  openGraph: {
    title: 'AI Workflow Automation ROI Calculator - FortuneAI',
    description: 'Estimate potential savings from AI workflow automation. See how FortuneAI can help.',
  },
  twitter: {
    title: 'AI Workflow Automation ROI Calculator - FortuneAI',
    description: 'Estimate potential savings from AI workflow automation. See how FortuneAI can help.',
  },
};

// This page.tsx is now a Server Component
export default function ROICalculatorPage() {
  return <RoiCalculatorClient />;
}
