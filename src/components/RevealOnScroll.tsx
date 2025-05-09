'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // in ms
  threshold?: number;
  initialClass?: string;
  finalClass?: string;
  as?: keyof JSX.IntrinsicElements;
};

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  initialClass = "opacity-0 translate-y-10",
  finalClass = "opacity-100 translate-y-0",
  as: Component = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
            observer.unobserve(element);
          }, delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out", 
        isVisible ? finalClass : initialClass,
        className
      )}
    >
      {children}
    </Component>
  );
};
