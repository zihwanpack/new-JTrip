import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  key: string;
}

export const PageTransition = ({ children, key }: PageTransitionProps) => {
  return (
    <motion.div
      className="h-full w-full overflow-y-auto overflow-x-hidden"
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
