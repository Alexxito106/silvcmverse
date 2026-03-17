'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Letter } from '@/types';
import { useToast } from '@/providers/ToastProvider';

interface LetterDisplayProps {
  letter: Letter;
  isRevealed?: boolean;
  onDelete?: (id: string) => void;
  onReveal?: (id: string, correct: boolean) => void;
}

export const LetterDisplay: React.FC<LetterDisplayProps> = ({
  letter,
  isRevealed = false,
  onDelete,
  onReveal,
}) => {
  const { addToast } = useToast();
  const [currentlyRevealed, setCurrentlyRevealed] = useState(isRevealed);
  const [passwordInput, setPasswordInput] = useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const createdDate = new Date(letter.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleReveal = () => {
    if (letter.password) {
      setShowPasswordForm(true);
    } else {
      setCurrentlyRevealed(true);
      if (onReveal) onReveal(letter.id, true);
      addToast('💌 Carta revelada', 'success');
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === letter.password) {
      setCurrentlyRevealed(true);
      setShowPasswordForm(false);
      setPasswordInput('');
      if (onReveal) onReveal(letter.id, true);
      addToast('✨ ¡Contraseña correcta! Carta revelada', 'success');
    } else {
      addToast('❌ Contraseña incorrecta', 'error');
      setPasswordInput('');
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      onDelete(letter.id);
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-amber-50/90 via-orange-50/90 to-rose-50/90 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-white/10 backdrop-blur-sm min-h-80">
        {/* Wax seal effect */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-400 to-rose-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl opacity-80">
          💌
        </div>

        {/* Date */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-6">
          📅 {createdDate}
          {letter.password && <span className="ml-2">🔐 Protegido</span>}
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          {currentlyRevealed ? (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-serif text-lg text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap font-light">
                {letter.texto}
              </p>
            </motion.div>
          ) : showPasswordForm ? (
            <motion.div
              key="password"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <p className="text-gray-600 dark:text-gray-400 font-light text-center">
                Esta carta está protegida con contraseña...
              </p>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Ingresa la contraseña"
                className="px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handlePasswordSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all"
                >
                  ✨ Revelar
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordInput('');
                  }}
                  className="px-6 py-2 bg-gray-300/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotateZ: [0, -2, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 font-light text-lg italic mb-6">
                Esta carta está cerrada con amor...
              </p>
              <button
                onClick={handleReveal}
                className="px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                ✨ Revelar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        {currentlyRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex justify-end gap-2"
          >
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 font-medium disabled:opacity-50"
              >
                {isDeleting ? '⏳' : '🗑️'} Eliminar
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
