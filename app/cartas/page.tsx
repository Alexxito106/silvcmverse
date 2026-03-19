'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterDisplay } from '@/components/LetterDisplay';
import { Letter } from '@/types';
import { useLetters } from '@/hooks';
import { useToast } from '@/providers/ToastProvider';

export default function CartasPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchLetters, addLetter, deleteLetter } = useLetters();
  const { addToast } = useToast();
  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadLetters = async () => {
      setIsLoading(true);
      const data = await fetchLetters();
      setLetters(data);
      setIsLoading(false);
    };
    loadLetters();
  }, [fetchLetters]);

  const handleSaveLetter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      addToast('⚠️ Escribe algo en la carta', 'warning');
      return;
    }

    setIsLoading(true);
    const newLetter = await addLetter(content, password || undefined);
    
    if (newLetter) {
      setLetters([newLetter, ...letters]);
      setContent('');
      setPassword('');
      setIsWriting(false);
      addToast('💌 Carta guardada con amor', 'success');
    } else {
      addToast('❌ Error al guardar la carta', 'error');
    }
    setIsLoading(false);
  };

  const handleDeleteLetter = async (id: string) => {
    setIsLoading(true);
    const success = await deleteLetter(id);
    if (success) {
      setLetters(letters.filter((l) => l.id !== id));
      setRevealedLetters(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      addToast('🗑️ Carta eliminada', 'info');
    } else {
      addToast('❌ Error al eliminar', 'error');
    }
    setIsLoading(false);
  };

  const handleRevealLetter = (id: string, correctPassword: boolean) => {
    if (correctPassword || !letters.find(l => l.id === id)?.password) {
      setRevealedLetters(prev => new Set(prev).add(id));
      addToast('🔓 Carta revelada', 'success');
    } else {
      addToast('❌ Contraseña incorrecta', 'error');
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:pt-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 gradient-text">
            💌 Cartas Secretas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Escribe cartas protegidas con contraseña. Cada carta es un tesoro edsperando ser abiertos.
          </p>
        </motion.div>

        {/* Write Button */}
        <motion.div className="mb-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWriting(!isWriting)}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50"
          >
            {isWriting ? '✕ Cancelar' : '✍️ Escribir Carta'}
          </motion.button>
        </motion.div>

        {/* Write Form */}
        <AnimatePresence>
          {isWriting && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber-100/50 via-orange-100/50 to-rose-100/50 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm"
            >
              <form onSubmit={handleSaveLetter} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Tu Carta 💌
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu carta aquí... Tus palabras serán guardadas..."
                    rows={8}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 font-light disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Contraseña (opcional) 🔐
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Protege tu carta con una contraseña"
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Si dejas este campo vacío, la carta será pública. Si lo llenas, necesitarás la contraseña para revelarla.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? '⏳' : '📮'} Guardar Carta
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWriting(false)}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-gray-300/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letters Grid */}
        <div className="space-y-6">
          <AnimatePresence>
            {letters.map((letter) => (
              <div key={letter.id}>
                <LetterDisplay
                  letter={letter}
                  isRevealed={revealedLetters.has(letter.id)}
                  onDelete={handleDeleteLetter}
                  onReveal={handleRevealLetter}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {letters.length === 0 && !isWriting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Aún no hay cartas guardadas. ¡Escribe la primera! 💌
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}