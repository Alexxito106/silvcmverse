'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setWelcomeSeen } from '@/lib/storage';

interface WelcomeOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ isVisible, onClose }) => {
  const [showText, setShowText] = useState(false);

  const handleClose = () => {
    setWelcomeSeen();
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative mx-4 max-w-2xl rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-12 shadow-2xl dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20"
            onAnimationComplete={() => setShowText(true)}
          >
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-4xl opacity-20 animate-pulse">✨</div>
            <div className="absolute bottom-4 right-4 text-4xl opacity-20 animate-pulse">🌹</div>
            <div className="absolute top-1/2 left-8 text-3xl opacity-15">💫</div>
            <div className="absolute bottom-1/3 right-8 text-3xl opacity-15">💕</div>

            <div className="relative z-10 text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={showText ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-2 font-serif text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-purple-300 dark:to-pink-300"
              >
                Bienvenida a
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={showText ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6 font-serif text-6xl font-bold text-transparent bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text dark:from-rose-300 dark:to-purple-300"
              >
                SilviVerse
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={showText ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mb-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-md mx-auto"
              >
                Un universo digital de recuerdos, algunos buenos y otros malos, estados de animo, amistad y amor. Hace tiempo te dije que estaba programando algo chulo. Me preguntaste que si tenias que ver, y pues como verás no es que tengas que ver, es que es para ti. Aun que se que no se te da bien la tecnologia JAJA.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showText ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex gap-4 justify-center"
              >
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 dark:from-pink-600 dark:to-rose-600"
                >
                  ✨ Explorar
                </button>

                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full font-semibold text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 backdrop-blur transition-all duration-300 hover:scale-105"
                >
                  Omitir
                </button>
              </motion.div>

              {/* Floating decorative text */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-8 text-3xl"
              >
                💌 💫 🌹
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
