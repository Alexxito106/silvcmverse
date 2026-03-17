'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feeling } from '@/types';
import { useToast } from '@/providers/ToastProvider';

interface FeelingCardProps {
  feeling: Feeling;
  onDelete?: (id: string) => void;
}

export const FeelingCard: React.FC<FeelingCardProps> = ({ feeling, onDelete }) => {
  const { addToast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      onDelete(feeling.id);
      setIsDeleting(false);
    }
  };

  const createdDate = new Date(feeling.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="bg-gradient-to-br from-rose-100/90 via-pink-100/90 to-purple-100/90 dark:from-rose-900/30 dark:via-pink-900/30 dark:to-purple-900/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-white/10 backdrop-blur-sm min-h-[150px] flex flex-col justify-between">
        {/* Floating emoji */}
        <div className="absolute top-3 right-4 text-3xl opacity-40">💭</div>

        {/* Date */}
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          {createdDate}
        </div>

        {/* Feeling text */}
        <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed italic font-light flex-grow">
          {feeling.texto}
        </p>

        {/* Delete button */}
        {onDelete && (
          <motion.button
            onClick={handleDelete}
            disabled={isDeleting}
            className="mt-4 text-sm font-medium text-red-600 dark:text-red-400 px-3 py-1 rounded-lg hover:bg-red-100/50 dark:hover:bg-red-900/30 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDeleting ? '⏳' : '🗑️'} Eliminar
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
