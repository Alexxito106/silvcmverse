import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '@/types';

interface MemoryEditModalProps {
  isOpen: boolean;
  memory: Memory | null;
  onConfirm: (updatedMemory: Partial<Memory>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const MemoryEditModal: React.FC<MemoryEditModalProps> = ({
  isOpen,
  memory,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    poema: '',
    fecha: '',
    tags: '',
  });
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  useEffect(() => {
    if (memory && isOpen) {
      setFormData({
        titulo: memory.titulo,
        poema: memory.poema,
        fecha: memory.fecha,
        tags: memory.tags.join(', '),
      });
      setShowPasswordPrompt(true);
      setPassword('');
      setError('');
    }
  }, [memory?.id, isOpen]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin') {
      setPassword('');
      setError('');
      setShowPasswordPrompt(false);
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onConfirm({
      titulo: formData.titulo,
      poema: formData.poema,
      fecha: formData.fecha,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
    });

    setShowPasswordPrompt(true);
    setFormData({ titulo: '', poema: '', fecha: '', tags: '' });
  };

  const handleCancel = () => {
    setPassword('');
    setError('');
    setShowPasswordPrompt(true);
    setFormData({ titulo: '', poema: '', fecha: '', tags: '' });
    onCancel();
  };

  if (!isOpen || !memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCancel}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {showPasswordPrompt ? (
            // Password prompt
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🔐 Verificación de Acceso
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Introduce tu contraseña para editar este recuerdo
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 dark:border-pink-900/50 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors disabled:opacity-50"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm font-medium text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gray-300/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all hover:bg-gray-400/50 dark:hover:bg-gray-600/50 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || password === ''}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
                  >
                    Continuar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Edit form
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ✏️ Editar Recuerdo
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Título ✨
                  </label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    disabled={isLoading}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-pink-200 dark:border-pink-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Fecha 📅
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    disabled={isLoading}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-pink-200 dark:border-pink-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                  />
                </div>

                {/* Poem */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Información 💭
                  </label>
                  <textarea
                    value={formData.poema}
                    onChange={(e) => setFormData({ ...formData, poema: e.target.value })}
                    disabled={isLoading}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-pink-200 dark:border-pink-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 font-light disabled:opacity-50"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Etiquetas 🏷️
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Ej: amor, atardecer, especial"
                    disabled={isLoading}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-pink-200 dark:border-pink-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gray-300/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all hover:bg-gray-400/50 dark:hover:bg-gray-600/50 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
