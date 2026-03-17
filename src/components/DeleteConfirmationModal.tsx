import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin') {
      setPassword('');
      setError('');
      setAttempt(0);
      onConfirm();
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
      setAttempt(prev => prev + 1);
    }
  };

  const handleCancel = () => {
    setPassword('');
    setError('');
    setAttempt(0);
    onCancel();
  };

  if (!isOpen) return null;

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
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ⚠️ Confirmar eliminación
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Introduce la contraseña para eliminar este recuerdo permanentemente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
                autoFocus
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center font-medium"
              >
                {error}
              </motion.p>
            )}

            {attempt > 0 && attempt < 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-yellow-600 dark:text-yellow-400 text-xs text-center"
              >
                Intento {attempt}/2 incorrectos
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
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
              >
                {isLoading ? '⏳ Eliminando...' : '🗑️ Eliminar'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
