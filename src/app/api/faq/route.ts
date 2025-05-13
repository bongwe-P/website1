import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // Using fs.promises for async file reading
import path from 'path';

// Define the structure of an FAQ item based on faq-data.json
interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

export async function GET() {
  try {
    // Construct the absolute path to the JSON file
    // __dirname is not available in ES modules by default with Next.js API routes.
    // process.cwd() gives the root of the project.
    const filePath = path.join(process.cwd(), 'src', 'lib', 'faq-data.json');
    
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON data
    const faqs: FAQ[] = JSON.parse(fileContent);
    
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error reading FAQ data:", error);
    // Log the specific error if it's an instance of Error
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "Failed to load FAQ data.", error: errorMessage },
      { status: 500 }
    );
  }
}
