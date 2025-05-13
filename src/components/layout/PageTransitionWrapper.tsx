'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    // y: 20, // Optional: slight upward movement on enter
  },
  in: {
    opacity: 1,
    // y: 0,
  },
  out: {
    opacity: 0,
    // y: -20, // Optional: slight downward movement on exit
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate', // Or 'easeInOut', 'circOut', etc.
  duration: 0.4, // Adjust duration as needed
};

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence 
      mode="wait" 
      initial={false}
    >
      <motion.div
        key={pathname} // Keying by pathname is crucial for AnimatePresence to detect page changes
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ width: '100%', height: '100%' }} // Ensure the motion div takes up space if needed
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
