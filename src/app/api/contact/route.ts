import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // In a real application, you would add logic here to:
    // 1. Validate the data server-side (though Zod on client-side helps).
    // 2. Send an email using a service like SendGrid, Resend, or Nodemailer.
    // 3. Save the submission to a database.
    console.log('Contact form data received on server:', data);

    // Simulate successful processing
    return NextResponse.json({ message: 'Form submitted successfully!', dataReceived: data }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: 'Error submitting form.', error: errorMessage }, { status: 500 });
  }
}
