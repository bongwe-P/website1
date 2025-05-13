import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(), // Added company (optional)
  service: z.string().optional(), // Added service (optional)
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

// Commenting out as the related flow and action have been removed
// export const PersonalizedGreetingClientSchema = z.object({
//   companyGoals: z.string().min(10, { message: "Company goals must be at least 10 characters."}),
// });

// export type PersonalizedGreetingClientValues = z.infer<typeof PersonalizedGreetingClientSchema>;
