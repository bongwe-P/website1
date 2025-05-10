'use server';

import { z } from 'zod';
import { ContactFormSchema } from './types';
// import { generatePersonalizedGreeting, type PersonalizedGreetingInput } from '@/ai/flows/personalized-greeting'; // Removed import

export async function handleContactForm(values: z.infer<typeof ContactFormSchema>) {
  const validatedFields = ContactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid form data." };
  }

  // Simulate form submission (e.g., send email, save to DB)
  console.log("Contact form submitted:", validatedFields.data);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  return { success: true, message: "Your message has been sent successfully!" };
}

// Removed getPersonalizedGreetingAction function as it depended on the deleted flow
// export async function getPersonalizedGreetingAction(values: z.infer<typeof PersonalizedGreetingClientSchema>) {
//   const validatedFields = PersonalizedGreetingClientSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { success: false, greeting: null, message: "Invalid input for company goals." };
//   }
  
//   try {
//     const input: PersonalizedGreetingInput = { companyGoals: validatedFields.data.companyGoals };
//     const result = await generatePersonalizedGreeting(input);
//     if (result && result.greeting) {
//       return { success: true, greeting: result.greeting, message: null };
//     } else {
//       return { success: false, greeting: null, message: "Failed to generate greeting. AI did not return expected output." };
//     }
//   } catch (error) {
//     console.error("Error generating personalized greeting:", error);
//     return { success: false, greeting: null, message: "An error occurred while generating the greeting." };
//   }
// }
