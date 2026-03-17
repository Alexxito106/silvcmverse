'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const floatingEmojis = ['✨', '🌹', '💫', '💕', '🌸'];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0">
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, 300, 600],
              x: [0, 100 - i * 20, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="fixed text-4xl md:text-5xl"
            style={{
              left: `${10 + i * 20}%`,
              top: '-100px',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo and title */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <motion.h1
              className="font-serif text-5xl md:text-7xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 dark:from-pink-300 dark:via-purple-300 dark:to-rose-300"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨ SilviVerse ✨
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 italic mt-4">
              Un universo digital dedicado a una princesita
            </motion.p>
          </motion.div>

          {/* Hero description */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-light mb-8">
              Bienvenida, este lugar te está esperando, se que la tecnologia y tu no sois muy compatibles pero quiero dedicarte este espacio a ti,{' '}
              <span className="font-semibold gradient-text">espero que lo disfrutes &lt;3</span>.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              He intentado hacer algo bonico aqui, por ahora podras usar "recuerdos" que es como un album de fotos, "Mood" que es para escribir como te sientes en cada momento, "Cartas secretas", donde se pueden escribir cartas y si se desea, hacerlas secretas (usando una crontaseña sbs), y flores que es como un jardin para enviar "ramos" virtuales.
            </p>
          </motion.div>

          {/* Main CTA button */}
          <motion.div variants={itemVariants} className="mb-16 flex justify-center">
            <Link href="/recuerdos">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 md:px-14 py-4 md:py-5 rounded-full font-serif text-lg md:text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 hover:from-pink-600 hover:via-purple-600 hover:to-rose-600 transition-all duration-300 shadow-xl"
              >
                Explorar SilviVerse
              </motion.button>
            </Link>
          </motion.div>

          {/* Features grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { icon: '📝', title: 'Recuerdos', desc: 'Galería de "momentos" especiales' },
              { icon: '💭', title: 'Mood', desc: 'Notas de emociones' },
              { icon: '💌', title: 'Cartas', desc: 'Mensajes secretos o no' },
              { icon: '🌹', title: 'Flores', desc: 'Jardín interactivo (por hacer algo más)' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-pink-100/30 to-purple-100/30 dark:from-pink-900/20 dark:to-purple-900/20 border border-white/50 dark:border-white/10 backdrop-blur-sm text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation sections */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/recuerdos">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 dark:from-rose-900/30 dark:via-pink-900/30 dark:to-purple-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  📝 Recuerdos
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Pa crear un album de tus momentos más especiales.
                </p>
              </motion.div>
            </Link>

            <Link href="/mood">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-yellow-100/50 via-orange-100/50 to-red-100/50 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  💭 Mood
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Expresa tus emociones en pequeñas notas.
                </p>
              </motion.div>
            </Link>

            <Link href="/cartas">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-amber-100/50 via-rose-100/50 to-pink-100/50 dark:from-amber-900/30 dark:via-rose-900/30 dark:to-pink-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  💌 Cartas Secretas
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Escribe mensajes que se revelan con magia. Incluye una funcion con contraseña para secretos ocultos.
                </p>
              </motion.div>
            </Link>

            <Link href="/flores">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-teal-100/50 via-green-100/50 to-emerald-100/50 dark:from-teal-900/30 dark:via-green-900/30 dark:to-emerald-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  🌹 Jardín de Flores
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Cultiva un jardín interactivo. Cada flor que plantes "crecerá" en este lugar.
                </p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Footer message */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 italic text-lg">
              💕 Una princesa necesita su castillo, tu no tendras uno pero tienes esta página 💕
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
