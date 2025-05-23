'use client';

import React, { useEffect } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"; // Corrected path
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form"; // Added Controller
import * as z from "zod";
import { Mail, Linkedin, Info, Phone, MessageSquare } from 'lucide-react'; // Added Phone and MessageSquare icons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Added ShadCN Select imports
// Removed chatbot import

// Define the form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const availableServices = [
  { value: "ai-customer-engagement", label: "AI Customer Engagement" },
  { value: "workflow-automation", label: "Workflow Automation" },
  { value: "sales-marketing-automation", label: "Sales & Marketing Automation" },
  { value: "data-analysis", label: "Data Analysis & Decision Support" },
  { value: "custom-ai-dev", label: "Custom AI Agent Development" },
  { value: "consulting", label: "Consulting & Training" },
  { value: "website-creation", label: "Modern Website Creation & Modernization" },
  { value: "ai-voice-solutions", label: "AI Voice Assistant Solutions" },
  { value: "general-inquiry", label: "General Inquiry" },
];

export default function ContactPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    control, // Destructure control from useForm
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "general-inquiry",
      message: "",
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const serviceQueryParam = queryParams.get('service'); // Renamed to avoid conflict with 'service' in availableServices
    const subjectQueryParam = queryParams.get('subject');
    const messageQueryParam = queryParams.get('message');


    if (serviceQueryParam && availableServices.find(s => s.value === serviceQueryParam)) {
      setValue('service', serviceQueryParam);
    }
    if (messageQueryParam) {
      setValue('message', decodeURIComponent(messageQueryParam));
    }
     // If subject indicates blog suggestion, and message is not already set to it
     if (subjectQueryParam === "Blog Topic Suggestion" && !messageQueryParam) {
        setValue('message', "I have a topic suggestion for the Fortune AI blog: ");
    }

  }, [setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submission successful:", result);
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. We'll get back to you soon.",
        });
        reset();
      } else {
        const errorResult = await response.json();
        console.error("Form submission error:", errorResult);
        toast({
          title: "Submission Failed",
          description: errorResult.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network or other error:", error);
      let errorMessage = "An unexpected error occurred. Please check your connection or try again later.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-16 md:pt-20">
      <header className="py-10 md:py-16 bg-gradient-to-br from-background to-card text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to start a project? We'd love to hear from you.
          </p>
        </RevealOnScroll>
      </header>

      {/* Chatbot Section Removed */}

      <section id="contact-form-section" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <RevealOnScroll className="md:pr-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} placeholder="Your Name" className="mt-1" />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="your@email.com" className="mt-1" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" {...register("company")} placeholder="Your Company Inc." className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="service">Service of Interest</Label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="service" className="w-full mt-1">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableServices.map(service => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.service && <p className="text-sm text-destructive mt-1">{errors.service.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" {...register("message")} placeholder="How can we help you?" rows={5} className="mt-1" />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-accent hover:bg-accent/80 text-accent-foreground">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </RevealOnScroll>

            <RevealOnScroll delay={200} className="mt-10 md:mt-0">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium text-foreground flex items-center"><Mail className="w-5 h-5 mr-2 text-primary"/> Email Us</h3>
                  <a href="mailto:fortuneaiagency@gmail.com" className="hover:text-primary transition-colors">fortuneaiagency@gmail.com</a>
                  <p className="text-sm">We typically respond within minutes.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground flex items-center"><Phone className="w-5 h-5 mr-2 text-primary"/> Call Us</h3>
                  <a href="tel:+27647668853" className="hover:text-primary transition-colors">+27 64 766 8853</a>
                  <p className="text-sm">Available during business hours.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground flex items-center"><MessageSquare className="w-5 h-5 mr-2 text-primary"/> WhatsApp</h3>
                  <a href="https://wa.me/27647668853" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+27 64 766 8853</a>
                  <p className="text-sm">Chat with us directly on WhatsApp.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground flex items-center"><Linkedin className="w-5 h-5 mr-2 text-primary"/> LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/phathutshedzo-fortune-bongwe/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Phathutshedzo Fortune Bongwe / Fortune AI</a>
                  <p className="text-sm">Connect with our founder and company.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground flex items-center"><Info className="w-5 h-5 mr-2 text-primary"/> Discovery Session</h3>
                  <p>Interested clients are invited for a "discovery session" to discuss their needs.</p>
                  <p className="text-sm">Mention this when you contact us!</p>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="text-sm">
                    Fortune AI is committed to helping businesses succeed with innovative AI solutions.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
