'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FlowerProps {
  emoji: string;
  x: number;
  y: number;
  onRemove?: () => void;
}

export const Flower: React.FC<FlowerProps> = ({ emoji, x, y, onRemove }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onRemove) onRemove();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      style={{ left: x, top: y }}
      className="fixed text-4xl pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
};
