'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: '/', label: 'Inicio', emoji: '🏠', description: 'Inicio' },
    { href: '/recuerdos', label: 'Recuerdos', emoji: '📝', description: 'Mis recuerdos' },
    { href: '/mood', label: 'Mood', emoji: '💭', description: 'Cómo me siento' },
    { href: '/cartas', label: 'Cartas', emoji: '💌', description: 'Mensajes especiales' },
    { href: '/flores', label: 'Flores', emoji: '🌹', description: 'Mi ramo' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 hidden md:block bg-gradient-to-r from-white/85 via-pink-50/85 to-purple-50/85 dark:from-black/60 dark:via-purple-950/40 dark:to-black/60 backdrop-blur-xl border-b border-pink-200/40 dark:border-pink-900/40 shadow-lg shadow-pink-200/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-serif text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text dark:from-pink-300 dark:via-rose-300 dark:to-purple-300"
            >
              ✨ SilviVerse
            </motion.div>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {/* Background gradient for active */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-xl -z-10 shadow-lg shadow-pink-500/30"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}

                  {/* Hover background */}
                  {!isActive(item.href) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-purple-200/20 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity"
                    />
                  )}

                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.label}</span>

                  {/* Underline effect */}
                  {!isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side - Future additions */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-2.5 rounded-xl bg-gradient-to-r from-pink-100/50 to-purple-100/50 dark:from-pink-900/30 dark:to-purple-900/30 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-800/50 dark:hover:to-purple-800/50 transition-all cursor-pointer"
              title="Tema"
            >
              <span className="text-xl">🌙</span>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white/95 to-white/80 dark:from-black dark:via-black/95 dark:to-black/80 backdrop-blur-xl border-t border-pink-200/40 dark:border-pink-900/40 shadow-2xl">
        <div className="flex justify-around py-3 px-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50 text-pink-600 dark:text-pink-300 shadow-lg shadow-pink-400/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/30'
                }`}
                title={item.description}
              >
                <motion.span
                  className={`text-2xl transition-transform ${isActive(item.href) ? 'scale-110' : ''}`}
                  animate={isActive(item.href) ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  {item.emoji}
                </motion.span>
                <span className="text-xs font-semibold">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Spacer for mobile */}
      <div className="md:pt-24 md:hidden h-28" />
    </>
  );
};
