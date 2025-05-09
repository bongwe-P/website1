'use server';

/**
 * @fileOverview Generates a personalized greeting for a user based on their company's goals.
 *
 * - generatePersonalizedGreeting - A function that generates the personalized greeting.
 * - PersonalizedGreetingInput - The input type for the generatePersonalizedGreeting function.
 * - PersonalizedGreetingOutput - The return type for the generatePersonalizedGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGreetingInputSchema = z.object({
  companyGoals: z
    .string()
    .describe('The goals of the user company, in a sentence or two.'),
});
export type PersonalizedGreetingInput = z.infer<typeof PersonalizedGreetingInputSchema>;

const PersonalizedGreetingOutputSchema = z.object({
  greeting: z.string().describe('The personalized greeting for the user.'),
});
export type PersonalizedGreetingOutput = z.infer<typeof PersonalizedGreetingOutputSchema>;

export async function generatePersonalizedGreeting(
  input: PersonalizedGreetingInput
): Promise<PersonalizedGreetingOutput> {
  return personalizedGreetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGreetingPrompt',
  input: {schema: PersonalizedGreetingInputSchema},
  output: {schema: PersonalizedGreetingOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized greetings to new users.

  Based on the company goals, generate a personalized greeting that makes the user feel understood.

  Company Goals: {{{companyGoals}}}
  `,
});

const personalizedGreetingFlow = ai.defineFlow(
  {
    name: 'personalizedGreetingFlow',
    inputSchema: PersonalizedGreetingInputSchema,
    outputSchema: PersonalizedGreetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
