'use client';

import { useState, useEffect, useRef } from 'react';
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
  
  const textRef = useRef(text);

  // Effect to handle changes in the text prop
  useEffect(() => {
    textRef.current = text; // Update the ref with the new text
    setDisplayedText('');    // Reset displayed text
    setIsTypingComplete(false); // Reset typing completion state
    setShowCursor(true);       // Ensure cursor is shown at the start
  }, [text]);

  // Effect for the typing animation
  useEffect(() => {
    if (!textRef.current) {
      setIsTypingComplete(true);
      return;
    }

    if (displayedText.length === textRef.current.length) {
        setIsTypingComplete(true);
        return;
    }

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        const currentLength = prev.length;
        if (currentLength < textRef.current.length) {
          return textRef.current.substring(0, currentLength + 1);
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
          return prev; 
        }
      });
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed, displayedText]); // Re-run if text, speed, or displayedText changes (for initial setup and completion)

  // Effect for cursor blinking
  useEffect(() => {
    if (isTypingComplete) {
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursorBlinkSpeed);
      return () => clearInterval(blinkInterval);
    } else {
      setShowCursor(true); // Keep cursor solid and visible while typing
    }
  }, [isTypingComplete, cursorBlinkSpeed]);

  return (
    <h1 className={cn("relative", className)}>
      <span>{displayedText}</span>
      <span
        className={cn(
          "inline-block w-px font-light", 
          showCursor ? 'opacity-100' : 'opacity-0',
          isTypingComplete && showCursor ? 'animate-pulse' : '', // Pulse only when complete and cursor is shown
          'ml-1' 
        )}
        style={{ animationDuration: `${cursorBlinkSpeed * 2}ms` }} 
      >
        |
      </span>
    </h1>
  );
}
