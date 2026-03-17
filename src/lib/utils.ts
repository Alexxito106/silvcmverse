'use client';

import { toPng } from 'html-to-image';

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-ES');
}

/**
 * Export element as PNG using html-to-image
 * Falls back to JSON if image export fails
 */
export async function exportMemoryCard(elementId: string, fileName: string, memory?: any): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    try {
      // Try using html-to-image (better at handling modern CSS colors)
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 0.95,
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName.replace('.json', '.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (imageError) {
      // Fallback to JSON export
      if (memory) {
        const dataStr = JSON.stringify(memory, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        throw imageError;
      }
    }
  } catch (error) {
    console.error('Error exporting memory card:', error);
    throw error;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

export const romanticPhrases = [
  '💌 Hoy pensé en ti viendo el atardecer.',
  '✨ Tu recuerdo es mi mejor compañía.',
  '🌙 Eres la razón de mis sueños.',
  '💝 Cada momento contigo es especial.',
  '🌸 Mi corazón late por ti.',
  '✨ Eres mi constelación favorita.',
  '💫 En tus ojos encontré mi hogar.',
  '🌹 Amor eterno en cada latido.',
  '✨ Tú eres mi infinito.',
  '💌 Cada día es mejor porque existes.',
];

export function getRandomRomanticPhrase(): string {
  return romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)];
}

export const flowers = {
  roses: { emoji: '🌹', name: 'Rosas' },
  tulips: { emoji: '🌷', name: 'Tulipanes' },
  daisies: { emoji: '🌼', name: 'Margaritas' },
  cherry: { emoji: '🌸', name: 'Flores de Cerezo' },
};

export const particles = {
  hearts: '❤️',
  stars: '⭐',
  sparkles: '✨',
  flowers: ['🌹', '🌷', '🌸', '🌼'],
};
