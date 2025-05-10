
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterHeadlineProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
}

export function TypewriterHeadline({
  text,
  className,
  typingSpeed = 50, // Milliseconds per character
  cursorBlinkSpeed = 500, // Milliseconds for cursor blink
}: TypewriterHeadlineProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText(''); // Reset displayed text when 'text' prop changes
    setIsTypingComplete(false); // Reset completion status
    setShowCursor(true); // Ensure cursor is visible at the start of typing
    let i = 0;
    
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount or when dependencies change
  }, [text, typingSpeed]); // Re-run effect if text or typingSpeed changes

  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursorBlinkSpeed);
      return () => clearInterval(cursorInterval); // Cleanup interval
    }
    // For incomplete typing, cursor should ideally remain solid and visible
    // setShowCursor(true); // Ensured by initial state and reset in primary effect
  }, [isTypingComplete, cursorBlinkSpeed]);

  return (
    <h1 className={cn("relative", className)}>
      <span>{displayedText}</span>
      <span
        className={cn(
          "inline-block w-px bg-current", // Using w-px and bg-current for a sharper cursor
          isTypingComplete ? (showCursor ? 'opacity-100 animate-pulse' : 'opacity-0') : 'opacity-100',
          'ml-1 align-bottom' // Adjust alignment if needed
        )}
        style={{ animationDuration: `${cursorBlinkSpeed * 2}ms` }}
        aria-hidden="true"
      >
        &nbsp; {/* Non-breaking space to ensure height, cursor is styled with w-px and bg-current now */}
      </span>
    </h1>
  );
}
