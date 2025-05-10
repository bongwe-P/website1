'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormValues } from '@/lib/types';
import { handleContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function ContactFormSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const {formState: {isSubmitting}} = form;

  async function onSubmit(values: ContactFormValues) {
    const result = await handleContactForm(values);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
        variant: "default",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to send message.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24 bg-background"> {/* Modified classes */}
      {/* Animated gradient elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-accent/10 blur-3xl filter" />
        <div className="absolute right-[10%] bottom-[5%] h-[300px] w-[300px] animate-pulse rounded-full bg-primary/10 blur-3xl filter delay-3000" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
        <h2 className="text-4xl font-bold text-center mb-4 tracking-tight">Get in Touch</h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Have questions or want to learn more about FortuneAI? We'd love to hear from you.
        </p>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
        <Card className="max-w-2xl mx-auto shadow-lg rounded-lg"> {/* Card will sit on top of the animated background */}
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Mail className="text-primary h-7 w-7" />
              Send Us a Message
            </CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-base font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="John Doe" {...field} aria-describedby="name-message" className="rounded-md" />
                      </FormControl>
                      <FormMessage id="name-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email" className="text-base font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="you@example.com" {...field} aria-describedby="email-message" className="rounded-md" />
                      </FormControl>
                      <FormMessage id="email-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message" className="text-base font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help..."
                          className="min-h-[120px] resize-none rounded-md"
                          {...field}
                          aria-describedby="message-message"
                        />
                      </FormControl>
                      <FormMessage id="message-message" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                     <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        </RevealOnScroll>
      </div>
    </section>
  );
}
