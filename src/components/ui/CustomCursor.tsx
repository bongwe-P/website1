'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const positionRef = useRef(position);

  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isCustomCursorActive, setIsCustomCursorActive] = useState(false);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // Effect to detect first mouse move and activate the custom cursor
  useEffect(() => {
    const handleFirstMouseMove = () => {
      setIsCustomCursorActive(true);
      // The listener is automatically removed due to { once: true }
    };

    // Check if we are likely on a device that supports hover (i.e., not primarily touch)
    // This is an additional hint. The main trigger is actual mouse movement.
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mediaQuery.matches) {
      document.addEventListener('mousemove', handleFirstMouseMove, { once: true });
    }

    return () => {
      // Ensure listener is removed if component unmounts before first mouse move
      document.removeEventListener('mousemove', handleFirstMouseMove);
    };
  }, []); // Runs once on mount

  // Effect to manage cursor logic when it's active
  useEffect(() => {
    if (!isCustomCursorActive) {
      // Ensure native cursor is visible if custom cursor becomes inactive
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        const cursorStyle = computedStyle.cursor;
        setIsPointer(cursorStyle === 'pointer');

        const isText = target.tagName === 'P' || target.tagName === 'SPAN' || 
                       target.tagName === 'H1' || target.tagName === 'H2' || 
                       target.tagName === 'H3' || target.tagName === 'A' || 
                       target.tagName === 'BUTTON' || target.closest('button, a');
        setIsHoveringText(Boolean(isText) && cursorStyle !== 'pointer');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const updateTrail = () => {
      setTrailPosition(prevTrail => ({
        x: prevTrail.x + (positionRef.current.x - prevTrail.x) * 0.2,
        y: prevTrail.y + (positionRef.current.y - prevTrail.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      // Only remove the class if the component is unmounting while active
      // If it's just becoming inactive, the class is removed at the start of this effect block
      // However, for robustness on unmount, we remove it here too.
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isCustomCursorActive]); // Re-run when custom cursor is activated/deactivated

  if (!isCustomCursorActive) {
    return null; // Don't render custom cursor elements if not active
  }

  return (
    <>
      {/* Trail Element */}
      <div
        className={cn(
          'custom-cursor-trail fixed rounded-full pointer-events-none z-[9999]',
          'bg-accent/30',
          isPointer ? 'w-6 h-6 opacity-50' : 'w-3 h-3 opacity-70',
          isHoveringText ? 'scale-150 opacity-40' : ''
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
