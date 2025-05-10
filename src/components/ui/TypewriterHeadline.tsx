'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterHeadlineProps {
  text: string;
  className?: string;
  spanClassName?: string; // For styling part of the headline, e.g., the brand name
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
}

export function TypewriterHeadline({
  text,
  className,
  // spanClassName, // Removed as it's not currently used for the simple headline
  typingSpeed = 50, // Milliseconds per character
  cursorBlinkSpeed = 500, // Milliseconds for cursor blink
}: TypewriterHeadlineProps) {
  console.log('[TypewriterHeadline] Initial text prop:', text);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const textRef = useRef(text); 

  useEffect(() => {
    console.log('[TypewriterHeadline] useEffect - text prop:', text);
    textRef.current = text; // Ensure textRef always has the latest text prop value
    setDisplayedText('');
    setIsTypingComplete(false);
    let i = 0;
    const intervalId = setInterval(() => {
      // Use textRef.current for typing to ensure it uses the updated value
      if (i < textRef.current.length) { 
        setDisplayedText((prev) => prev + textRef.current.charAt(i));
        i++;
      } else { 
        clearInterval(intervalId);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, typingSpeed]); // text is a dependency, so this effect re-runs when text changes

  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursorBlinkSpeed);
      return () => clearInterval(cursorInterval);
    }
    setShowCursor(true); // Keep cursor solid while typing
  }, [isTypingComplete, cursorBlinkSpeed]);

  return (
    <h1 className={cn("relative", className)}>
      {/* Directly display displayedText, no more complex replacement needed for this use case */}
      <span>{displayedText}</span>
      <span
        className={cn(
          "inline-block w-1 font-light",
          showCursor ? 'opacity-100' : 'opacity-0',
          isTypingComplete ? 'animate-pulse' : '',
          'ml-1' // Small margin for the cursor
        )}
        style={{ animationDuration: `${cursorBlinkSpeed * 2}ms` }} // Ensure animation matches blink speed
      >
        |
      </span>
    </h1>
  );
}