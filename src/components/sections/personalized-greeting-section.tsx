'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalizedGreetingClientSchema, type PersonalizedGreetingClientValues } from '@/lib/types';
import { getPersonalizedGreetingAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RevealOnScroll } from '@/components/RevealOnScroll';

export function PersonalizedGreetingSection() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<PersonalizedGreetingClientValues>({
    resolver: zodResolver(PersonalizedGreetingClientSchema),
    defaultValues: {
      companyGoals: '',
    },
  });

  const {formState: {isSubmitting}} = form;

  async function onSubmit(values: PersonalizedGreetingClientValues) {
    setGreeting(null);
    setError(null);

    const result = await getPersonalizedGreetingAction(values);

    if (result.success && result.greeting) {
      setGreeting(result.greeting);
    } else {
      setError(result.message || "An unexpected error occurred.");
    }
  }

  return (
    <section id="greeting" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-4xl font-bold text-center mb-4 tracking-tight">Experience AI Personalization</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Tell us your company's goals, and let our AI craft a unique greeting just for you.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
        <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Wand2 className="text-primary h-7 w-7" />
              Generate Your Personalized Greeting
            </CardTitle>
            <CardDescription>
              Enter your company's primary objectives below to see our AI in action.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="companyGoals" className="text-base font-medium">Your Company Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          id="companyGoals"
                          placeholder="e.g., 'To expand our market share in the renewable energy sector by 20% within the next two years.'"
                          className="min-h-[100px] resize-none focus:ring-accent rounded-md"
                          {...field}
                          aria-describedby="companyGoals-message"
                        />
                      </FormControl>
                      <FormMessage id="companyGoals-message" />
                    </FormItem>
                  )}
                />
                {greeting && (
                  <Alert variant="default" className="bg-primary/10 border-primary/30 rounded-md">
                    <Wand2 className="h-5 w-5 text-primary" />
                    <AlertTitle className="text-primary font-semibold">Personalized Greeting:</AlertTitle>
                    <AlertDescription className="text-foreground">
                      {greeting}
                    </AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert variant="destructive" className="rounded-md">
                    <AlertTitle className="font-semibold">Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Greeting
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
