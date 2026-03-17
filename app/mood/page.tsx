'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeelingCard } from '@/components/FeelingCard';
import { Feeling } from '@/types';
import { useFeelings } from '@/hooks';
import { useToast } from '@/providers/ToastProvider';

const emojis = ['💭', '💗', '💫', '🌙', '✨', '🔥', '💚', '💙', '🌹', '😊'];

const romanticPhrases = [
  'Eres el six de mi seven',
  'Eres mi razón de sonreír',
  'Contigo me siento en casa',
  'Cada momento a tu lado es especial',
  'Mi corazón es todo tuyo',
  'Te amo más de lo que puedo expresar',
];

export default function moodPage() {
  const [feelings, setFeelings] = useState<Feeling[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchFeelings, addFeeling, deleteFeeling } = useFeelings();
  const { addToast } = useToast();

  useEffect(() => {
    const loadFeelings = async () => {
      setIsLoading(true);
      const data = await fetchFeelings();
      setFeelings(data);
      setIsLoading(false);
    };
    loadFeelings();
  }, [fetchFeelings]);

  const handleAddFeeling = async () => {
    if (!inputValue.trim()) {
      addToast('⚠️ Escribe algo antes de guardar', 'warning');
      return;
    }

    setIsLoading(true);
    const newFeeling = await addFeeling(inputValue);
    
    if (newFeeling) {
      setFeelings([newFeeling, ...feelings]);
      setInputValue('');
      addToast('💕 Sensación guardada', 'success');
    } else {
      addToast('❌ Error al guardar la sensación', 'error');
    }
    setIsLoading(false);
  };

  const handleRandomPhrase = () => {
    const randomPhrase = romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
    setInputValue(randomPhrase);
  };

  const handleDeleteFeeling = async (id: string) => {
    setIsLoading(true);
    const success = await deleteFeeling(id);
    if (success) {
      setFeelings(feelings.filter(f => f.id !== id));
      addToast('🗑️ Sensación eliminada', 'info');
    } else {
      addToast('❌ Error al eliminar', 'error');
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddFeeling();
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
            💭 Mood
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Expresa tus emociones aquí. Todo lo que sientes es importante y merece ser recordado (o no).
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 dark:from-rose-900/30 dark:via-pink-900/30 dark:to-purple-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm"
        >
          {/* Textarea */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Como te sientes hoy? 💭
            </label>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Comparte tus emociones y sensaciones..."
              rows={5}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 font-light resize-none disabled:opacity-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddFeeling}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-lg transition-all disabled:opacity-50"
            >
              {isLoading ? '⏳' : '💗'} Guardar Sensación
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRandomPhrase}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-purple-500/50 hover:bg-purple-500/70 text-white font-bold rounded-lg transition-all border border-purple-400/50 disabled:opacity-50"
            >
              ✨ Frase Romántica
            </motion.button>
          </div>
        </motion.div>

        {/* Feelings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {feelings.map((feeling) => (
              <div key={feeling.id}>
                <FeelingCard feeling={feeling} onDelete={handleDeleteFeeling} />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {feelings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Aún no hay nada guardado. ¡Comparte como te sientes! 💕
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}