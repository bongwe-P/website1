'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500); // Adjust delay as needed

    // After fade out animation, set isLoading to false to remove from DOM
    const fadeOutTimer = setTimeout(() => {
      if (isFadingOut) { // Check if it's still fading out (not unmounted early)
        setIsLoading(false);
      }
    }, 1500 + 500); // Delay + fade-out duration

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
  }, [isFadingOut]); // Re-run if isFadingOut changes, though initial run is key

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        'preloader fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="preloader-spinner w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin-slow"></div>
      <p className="mt-4 text-lg text-foreground">Loading Fortune AI...</p>
      {/* Optionally, replace spinner with an SVG or Lottie animation later */}
    </div>
  );
}
