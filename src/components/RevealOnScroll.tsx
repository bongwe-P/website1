'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType, // General type for components or string tags
  type ElementRef  // Utility to get the instance type (e.g., HTMLDivElement from 'div')
} from 'react';
import { cn } from '@/lib/utils'; // Assuming this utility exists

// Props specific to RevealOnScroll's functionality.
type RevealOnScrollBaseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  initialClass?: string;
  finalClass?: string;
};

// Generic props type for the polymorphic component.
// C extends ElementType: C is the type of the component/tag to render.
// React.ComponentPropsWithRef<C>: Gets all props for C, including the correct 'ref' type.
// Omit<..., ...>: Removes props defined in RevealOnScrollBaseProps or 'as' to avoid clashes.
type RevealOnScrollProps<C extends ElementType = 'div'> = RevealOnScrollBaseProps &
  Omit<React.ComponentPropsWithRef<C>, keyof RevealOnScrollBaseProps | 'as'> & {
    as?: C; // The 'as' prop allows specifying the component/tag.
  };

export function RevealOnScroll<C extends ElementType = 'div'>({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  initialClass = "opacity-0 translate-y-10",
  finalClass = "opacity-100 translate-y-0",
  as,
  ...restProps // Collects all other valid props for the ComponentToRender
}: RevealOnScrollProps<C>) {
  const [isVisible, setIsVisible] = useState(false);

  // Determine the component/tag to render. Defaults to 'div'.
  // Explicitly type ComponentToRender as ElementType for clarity in its usage.
  const ComponentToRender: ElementType = as || 'div';

  // Create an internal ref. For IntersectionObserver, `Element` is generally sufficient.
  // If you need specific methods from HTMLDivElement etc., this ref would need to be
  // `useRef<ElementRef<typeof ComponentToRender>>(null)`, but that leads back to the original problem.
  // Using `useRef<Element>(null)` is a good compromise for internal observer logic.
  const elementRef = useRef<Element>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            setIsVisible(true);
            observer.unobserve(currentElement);
          }, delay);
        } else {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        }
      },
      { threshold }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // `delay` and `threshold` are dependencies.
    // `elementRef` itself is stable; `elementRef.current` changes do not trigger `useEffect` re-runs.
    // The effect correctly uses `currentElement` captured at the time of effect execution.
  }, [delay, threshold]);

  return (
    <ComponentToRender
      // Type assertion is used here.
      // `elementRef` is `RefObject<Element>`.
      // `ComponentToRender` (e.g., a 'div') expects `RefObject<HTMLDivElement>`.
      // `RefObject<Element>` is not directly assignable to `RefObject<HTMLDivElement>`.
      // `as any` is the simplest escape hatch.
      // A slightly more precise (but still an assertion) cast could be
      // `as React.Ref<ElementRef<typeof ComponentToRender>>` if ElementRef<typeof ComponentToRender>
      // was guaranteed not to be `unknown`. Given the error, `as any` is safer here.
      ref={elementRef as any}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? finalClass : initialClass,
        className
      )}
      {...restProps} // Spread the remaining valid props for ComponentToRender
    >
      {children}
    </ComponentToRender>
  );
}