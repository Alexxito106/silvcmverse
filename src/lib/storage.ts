'use client';

import { Memory, Feeling, Letter, Bouquet, Statistics } from '@/types';

const IS_BROWSER = typeof window !== 'undefined';

// Storage keys
const STORAGE_KEYS = {
  WELCOME_SEEN: 'silviverse_welcome_seen',
  MEMORIES: 'silviverse_memories',
  FEELINGS: 'silviverse_feelings',
  LETTERS: 'silviverse_letters',
  BOUQUETS: 'silviverse_bouquets',
  STATISTICS: 'silviverse_statistics',
};

// Initialize default statistics
export function initializeStatistics(): Statistics {
  return {
    visits: 1,
    lettersWritten: 0,
    flowersSent: 0,
    feelingsCreated: 0,
    memoriesCreated: 0,
    lastVisit: Date.now(),
  };
}

// Welcome overlay
export function hasSeenWelcome(): boolean {
  if (!IS_BROWSER) return true;
  return localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN) === 'true';
}

export function setWelcomeSeen(): void {
  if (!IS_BROWSER) return;
  localStorage.setItem(STORAGE_KEYS.WELCOME_SEEN, 'true');
}

// Memories
export function getMemories(): Memory[] {
  if (!IS_BROWSER) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.MEMORIES);
  return stored ? JSON.parse(stored) : [];
}

export function saveMemory(memory: Memory): void {
  if (!IS_BROWSER) return;
  const memories = getMemories();
  memories.push(memory);
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  incrementStatistic('memoriesCreated');
}

export function deleteMemory(id: string): void {
  if (!IS_BROWSER) return;
  const memories = getMemories().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
}

// Feelings
export function getFeelings(): Feeling[] {
  if (!IS_BROWSER) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.FEELINGS);
  return stored ? JSON.parse(stored) : [];
}

export function saveFeling(feeling: Feeling): void {
  if (!IS_BROWSER) return;
  const feelings = getFeelings();
  feelings.push(feeling);
  localStorage.setItem(STORAGE_KEYS.FEELINGS, JSON.stringify(feelings));
  incrementStatistic('feelingsCreated');
}

export function deleteFeeling(id: string): void {
  if (!IS_BROWSER) return;
  const feelings = getFeelings().filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEYS.FEELINGS, JSON.stringify(feelings));
}

// Letters
export function getLetters(): Letter[] {
  if (!IS_BROWSER) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.LETTERS);
  return stored ? JSON.parse(stored) : [];
}

export function saveLetter(letter: Letter): void {
  if (!IS_BROWSER) return;
  const letters = getLetters();
  letters.push(letter);
  localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify(letters));
  incrementStatistic('lettersWritten');
}

export function deleteLetter(id: string): void {
  if (!IS_BROWSER) return;
  const letters = getLetters().filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify(letters));
}

// Bouquets
export function getBouquets(): Bouquet[] {
  if (!IS_BROWSER) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.BOUQUETS);
  return stored ? JSON.parse(stored) : [];
}

export function saveBouquet(bouquet: Bouquet): void {
  if (!IS_BROWSER) return;
  const bouquets = getBouquets();
  bouquets.push(bouquet);
  localStorage.setItem(STORAGE_KEYS.BOUQUETS, JSON.stringify(bouquets));
  incrementStatistic('flowersSent');
}

// Statistics
export function getStatistics(): Statistics {
  if (!IS_BROWSER) return initializeStatistics();
  const stored = localStorage.getItem(STORAGE_KEYS.STATISTICS);
  if (!stored) {
    const stats = initializeStatistics();
    setStatistics(stats);
    return stats;
  }
  return JSON.parse(stored);
}

export function setStatistics(stats: Statistics): void {
  if (!IS_BROWSER) return;
  localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
}

export function incrementStatistic(key: keyof Omit<Statistics, 'lastVisit'>): void {
  if (!IS_BROWSER) return;
  const stats = getStatistics();
  stats[key] = (stats[key] as number) + 1;
  stats.lastVisit = Date.now();
  setStatistics(stats);
}

export function incrementVisit(): void {
  if (!IS_BROWSER) return;
  const stats = getStatistics();
  stats.visits += 1;
  stats.lastVisit = Date.now();
  setStatistics(stats);
}
