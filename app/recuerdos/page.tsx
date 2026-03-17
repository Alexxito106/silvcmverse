'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryCard } from '@/components/MemoryCard';
import { MemoryForm } from '@/components/MemoryForm';
import { Memory } from '@/types';
import { useMemories } from '@/hooks';
import { useToast } from '@/providers/ToastProvider';

export default function RecuerdosPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const { fetchMemories, deleteMemory } = useMemories();
  const { addToast } = useToast();

  useEffect(() => {
    const loadMemories = async () => {
      const data = await fetchMemories();
      setMemories(data);
    };
    loadMemories();
  }, []);

  const handleSaveMemory = async (memory: Memory) => {
    setMemories([memory, ...memories]);
    addToast('✨ Recuerdo guardado de alguna forma', 'success');
    setIsAddingMemory(false);
  };

  const handleDeleteMemory = async (id: string) => {
    const success = await deleteMemory(id);
    if (success) {
      setMemories(memories.filter(m => m.id !== id));
      addToast('🗑️ Recuerdo eliminado', 'info');
    } else {
      addToast('❌ Error al eliminar', 'error');
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 gradient-text">
            📝 Recuerdos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            El album personal de momentos especiales. Cada recuerdo es importante, tanto como las obras de arte que haces.
          </p>
        </motion.div>

        {/* Add Memory Button */}
        <motion.div className="mb-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingMemory(!isAddingMemory)}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full shadow-lg transition-all"
          >
            {isAddingMemory ? '✕ Cancelar' : '➕ Nuevo Recuerdo'}
          </motion.button>
        </motion.div>

        {/* Add Memory Form */}
        <AnimatePresence>
          {isAddingMemory && (
            <MemoryForm 
              onSave={handleSaveMemory}
              onCancel={() => setIsAddingMemory(false)}
            />
          )}
        </AnimatePresence>

        {/* Memories Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {memories.map((memory) => (
              <div key={memory.id}>
                <MemoryCard memory={memory} onDelete={handleDeleteMemory} />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {memories.length === 0 && !isAddingMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No hay recuerdos aún. ¡Crea el primero! 🌹
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}