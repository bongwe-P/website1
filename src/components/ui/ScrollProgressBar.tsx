'use client';

import { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScroll = window.scrollY;
    if (totalHeight > 0) {
      setScrollProgress((currentScroll / totalHeight) * 100);
    } else {
      setScrollProgress(0); // Avoid division by zero if page is not scrollable
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Call it once to set initial state if page is already scrolled (e.g. on refresh)
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="scroll-progress-bar fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-primary to-accent"
      style={{ width: `${scrollProgress}%` }}
    />
  );
}
