'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Bouquet } from '@/types';
import { useFlowers } from '@/hooks';
import { useToast } from '@/providers/ToastProvider';

const flowerTypes = [
  { name: 'Rosas', emoji: '🌹' },
  { name: 'Tulipanes', emoji: '🌷' },
  { name: 'Margaritas', emoji: '🌼' },
  { name: 'Flores de Cerezo', emoji: '🌸' },
  { name: 'Girasoles', emoji: '🌻' },
  { name: 'Lirios', emoji: '⚜️' },
];

export default function FloresPage() {
  const [placedFlowers, setPlacedFlowers] = useState<Array<{tipo: string; x: number; y: number }>>([]);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [selectedFlower, setSelectedFlower] = useState('🌹');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { fetchBouquets, addBouquet, addFlower } = useFlowers();
  const { addToast } = useToast();

  useEffect(() => {
    const loadBouquets = async () => {
      setIsLoading(true);
      const data = await fetchBouquets();
      setBouquets(data);
      setIsLoading(false);
    };
    loadBouquets();
  }, [fetchBouquets]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFlower = {
      tipo: selectedFlower,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    };

    setPlacedFlowers([...placedFlowers, newFlower]);
    addToast(`${selectedFlower} colocada`, 'success');
  };

  const handleSaveBouquet = async () => {
    if (placedFlowers.length === 0) {
      addToast('⚠️ Añade al menos una flor', 'warning');
      return;
    }

    setIsLoading(true);
    const flores = placedFlowers.map(f => f.tipo);
    const newBouquet = await addBouquet(flores);

    if (newBouquet) {
      setBouquets([newBouquet, ...bouquets]);
      setPlacedFlowers([]);
      addToast('💐 ¡Bouquet guardado!', 'success');
    } else {
      addToast('❌ Error al guardar', 'error');
    }
    setIsLoading(false);
  };

  const clearCanvas = () => {
    setPlacedFlowers([]);
    addToast('Lienzo limpiado', 'info');
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 gradient-text">
            🌹 Jardín de Flores
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Cultiva un jardín mágico. Haz clic en cualquier lugar para plantar flores. Envía ramos especiales.
          </p>
        </motion.div>

        {/* Flower selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-teal-100/50 via-green-100/50 to-emerald-100/50 dark:from-teal-900/30 dark:via-green-900/30 dark:to-emerald-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm"
        >
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Elige qué flor plantar:
          </p>
          <div className="flex flex-wrap gap-3">
            {flowerTypes.map((flower) => (
              <motion.button
                key={flower.emoji}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFlower(flower.emoji)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFlower === flower.emoji
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white scale-105 shadow-lg'
                    : 'bg-white/50 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/20'
                }`}
              >
                {flower.emoji} {flower.name}
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
            💡 Selecciona una flor y luego haz clic en el jardín para plantarla
          </p>
        </motion.div>

        {/* Interactive Garden */}
        <motion.div
          ref={containerRef}
          onClick={handleCanvasClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 relative w-full h-96 md:h-96 rounded-2xl cursor-crosshair overflow-hidden border-4 border-dashed border-pink-300/50 dark:border-pink-700/50 bg-gradient-to-br from-teal-50/50 via-lime-50/50 to-green-50/50 dark:from-teal-900/20 dark:via-lime-900/20 dark:to-green-900/20 backdrop-blur-sm"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/20 to-transparent"
            />
          </div>

          {/* Placed Flowers */}
          <AnimatePresence>
            {placedFlowers.map((flower, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute text-5xl cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${flower.x}%`,
                  top: `${flower.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPlacedFlowers(placedFlowers.filter((_, i) => i !== idx));
                }}
              >
                {flower.tipo}
              </motion.div>
            ))}
          </AnimatePresence>

          {placedFlowers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-center"
              >
                <p className="text-4xl mb-2">🌱</p>
                <p className="text-gray-600 dark:text-gray-400 font-light">
                  Haz clic para plantar flores...
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Action buttons */}
        <div className="mb-12 flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveBouquet}
            disabled={isLoading || placedFlowers.length === 0}
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? '⏳' : '💐'} Guardar Bouquet
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCanvas}
            disabled={isLoading}
            className="px-8 py-4 bg-gray-400/50 hover:bg-gray-400/70 text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-50"
          >
            🗑️ Limpiar
          </motion.button>
        </div>

        {/* Send Bouquets Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-pink-100/50 via-rose-100/50 to-red-100/50 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-red-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm"
        >
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎁 Enviar Ramos Especiales
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Crea ramos hermosos haciendo clic en cualquiera de estas flores para enviarlas directamente.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flowerTypes.map((flower) => (
              <motion.button
                key={flower.emoji}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  setIsLoading(true);
                  const newBouquet = await addBouquet([flower.emoji]);
                  if (newBouquet) {
                    setBouquets([newBouquet, ...bouquets]);
                    addToast(`🎁 ¡Ramo de ${flower.name} enviado! 💕`, 'success');
                  } else {
                    addToast('❌ Error al enviar', 'error');
                  }
                  setIsLoading(false);
                }}
                disabled={isLoading}
                className="p-6 rounded-lg bg-gradient-to-br from-white/80 to-white/60 dark:from-white/10 dark:to-white/5 border border-white/50 dark:border-white/20 hover:shadow-lg transition-all disabled:opacity-50"
              >
                <div className="text-4xl mb-2 text-center">{flower.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-center text-sm">
                  {flower.name}
                </h3>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bouquets history */}
        {bouquets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📜 Ramos Guardados ({bouquets.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {bouquets.map((bouquet) => (
                  <motion.div
                    key={bouquet.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-4 rounded-lg bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/20 backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    <div className="text-3xl mb-2 text-center">
                      {bouquet.flores.join(' ')}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(bouquet.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}