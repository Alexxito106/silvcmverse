'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particle } from '@/types';
import { generateId } from '@/lib/utils';

interface ParticleSystemProps {
  particles?: (Particle | null)[];
}

// Global particle instance for use throughout the app
let globalParticleSystem: { createParticle?: (x: number, y: number, type?: Particle['type'], emoji?: string) => void } = {};

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ particles: initialParticles = [] }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = useCallback(
    (x: number, y: number, type: Particle['type'] = 'sparkle', emoji?: string) => {
      const newParticle: Particle = {
        id: generateId(),
        type,
        x,
        y,
        duration: 2,
        emoji: emoji || getEmojiForType(type),
      };
      setParticles((prev) => [...prev, newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, newParticle.duration * 1000);

      return newParticle;
    },
    []
  );

  // Store the create particle function in global scope
  React.useEffect(() => {
    globalParticleSystem.createParticle = createParticle;
  }, [createParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <ParticleItem key={particle.id} particle={particle} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ParticleItemProps {
  particle: Particle;
}

const ParticleItem: React.FC<ParticleItemProps> = ({ particle }) => {
  const randomX = (Math.random() - 0.5) * 200;
  const randomY = -200 - Math.random() * 100;

  return (
    <motion.div
      initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
      animate={{ x: particle.x + randomX, y: particle.y + randomY, opacity: 0, scale: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: particle.duration }}
      className="fixed text-2xl"
      style={{ pointerEvents: 'none' }}
    >
      {particle.emoji}
    </motion.div>
  );
};

function getEmojiForType(type: Particle['type']): string {
  const emojis = {
    heart: '❤️',
    star: '⭐',
    flower: ['🌹', '🌷', '🌸', '🌼'][Math.floor(Math.random() * 4)],
    sparkle: '✨',
  };
  return emojis[type];
}

export const useParticleSystem = () => {
  const createParticle = (x: number, y: number, type: Particle['type'] = 'sparkle', emoji?: string) => {
    if (globalParticleSystem.createParticle) {
      globalParticleSystem.createParticle(x, y, type, emoji);
    }
  };

  return { createParticle };
};
