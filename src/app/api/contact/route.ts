import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Email address to send contact form submissions to
const emailTo = process.env.EMAIL_TO;
// Email address to send from (must be a verified domain in Resend or onboarding@resend.dev)
const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'; 

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Email sending is disabled.');
    return NextResponse.json({ message: 'Error submitting form.', error: 'Email configuration error on server.' }, { status: 500 });
  }
  if (!emailTo) {
    console.error('EMAIL_TO is not set. Cannot determine where to send the email.');
    return NextResponse.json({ message: 'Error submitting form.', error: 'Email configuration error on server.' }, { status: 500 });
  }

  try {
    const data = await request.json();
    const { name, email, company, service, message } = data;

    // Construct email subject
    const subject = `New Contact Form: ${service || 'General Inquiry'} from ${name}`;

    // Construct HTML content for the email
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Service of Interest:</strong> ${service || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    // Send the email using Resend
    const { data: sendData, error: sendError } = await resend.emails.send({
      from: `Fortune AI Contact Form <${emailFrom}>`, // e.g., 'Your Name <you@yourverifieddomain.com>' or 'Fortune AI <onboarding@resend.dev>'
      to: [emailTo],
      replyTo: email, // Corrected: Set the user's email as the reply-to address
      subject: subject,
      html: htmlContent,
    });

    if (sendError) {
      console.error('Error sending email with Resend:', sendError);
      return NextResponse.json({ message: 'Error submitting form.', error: sendError.message || 'Failed to send email.' }, { status: 500 });
    }

    console.log('Contact form data received and email sent successfully via Resend:', sendData);
    return NextResponse.json({ message: 'Form submitted successfully! We will be in touch.', dataReceived: data }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form or sending email:', error);
    let errorMessage = 'An unknown server error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: 'Error submitting form.', error: errorMessage }, { status: 500 });
  }
}
