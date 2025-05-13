'use server';

import { z } from 'zod';
import { ContactFormSchema } from './types';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Email address to send contact form submissions to
const emailTo = process.env.EMAIL_TO;
// Email address to send from (must be a verified domain in Resend or onboarding@resend.dev for testing)
const emailFromSetting = process.env.EMAIL_FROM || 'onboarding@resend.dev'; 

export async function handleContactForm(values: z.infer<typeof ContactFormSchema>) {
  const validatedFields = ContactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Form validation failed:", validatedFields.error.flatten().fieldErrors);
    return { success: false, message: "Invalid form data. Please check your entries.", errors: validatedFields.error.flatten().fieldErrors };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Email sending is disabled.');
    return { success: false, message: 'Server configuration error. Could not send email.' };
  }
  if (!emailTo) {
    console.error('EMAIL_TO is not set. Cannot determine where to send the email.');
    return { success: false, message: 'Server configuration error. Could not send email.' };
  }

  const { name, email, company, service, message } = validatedFields.data;

  // Construct email subject
  const subject = `New Homepage Contact: ${service || 'General Inquiry'} from ${name}`;

  // Construct HTML content for the email
  const htmlContent = `
    <h2>New Homepage Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    <p><strong>Service of Interest:</strong> ${service || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
  `;

  try {
    const { data: sendData, error: sendError } = await resend.emails.send({
      from: `Fortune AI Contact <${emailFromSetting}>`, 
      to: [emailTo],
      replyTo: email, 
      subject: subject,
      html: htmlContent,
    });

    if (sendError) {
      console.error('Error sending email with Resend:', sendError);
      return { success: false, message: sendError.message || 'Failed to send email.' };
    }

    console.log('Contact form data sent successfully via Resend from server action:', sendData);
    return { success: true, message: "Your message has been sent successfully! We will be in touch." };

  } catch (error) {
    console.error('Error in handleContactForm while sending email:', error);
    let errorMessage = 'An unknown server error occurred while sending the email.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
