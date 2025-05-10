'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Determine if hovering over interactive elements or text
      const target = e.target as HTMLElement;
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        const cursorStyle = computedStyle.cursor;
        setIsPointer(cursorStyle === 'pointer');

        const isText = target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button, a');
        setIsHoveringText(Boolean(isText) && cursorStyle !== 'pointer'); // Ensure isText is a boolean
      }
    };

    // Trail effect
    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPosition(prevTrail => ({
        x: prevTrail.x + (position.x - prevTrail.x) * 0.2, // Adjust 0.2 for trail speed
        y: prevTrail.y + (position.y - prevTrail.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateTrail);

    // Hide native cursor by adding class to body
    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [position.x, position.y]); // Depend on position to restart trail if needed, though trail logic is continuous

  return (
    <>
      {/* Trail Element */}
      <div
        className={cn(
          'custom-cursor-trail fixed rounded-full pointer-events-none z-[9999]',
          'bg-accent/30',
          isPointer ? 'w-6 h-6 opacity-50' : 'w-3 h-3 opacity-70',
          isHoveringText ? 'scale-150 opacity-40' : '' // Example effect for text
        )}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out, transform 0.2s ease-out',
        }}
      />
      {/* Main Cursor Dot */}
      <div
        className={cn(
          'custom-cursor-dot fixed rounded-full pointer-events-none z-[9999]',
          'bg-accent',
          isPointer ? 'w-2 h-2' : 'w-2 h-2',
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}
