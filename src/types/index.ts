export interface Memory {
  id: string;
  titulo: string;
  poema: string;
  fecha: string;
  imagen_url?: string;
  tags: string[];
  created_at: string;
}

// Local storage version (deprecated, kept for backward compatibility)
export interface MemoryLocal {
  id: string;
  date: string;
  title: string;
  poem: string;
  image?: string;
  tags: string[];
  createdAt: number;
}

export interface Feeling {
  id: string;
  texto: string;
  created_at: string;
}

// Local storage version (deprecated)
export interface FeelingLocal {
  id: string;
  text: string;
  emoji?: string;
  createdAt: number;
}

export interface Letter {
  id: string;
  texto: string;
  password?: string;
  created_at: string;
}

// Local storage version (deprecated)
export interface LetterLocal {
  id: string;
  content: string;
  isRevealed: boolean;
  createdAt: number;
  revealedAt?: number;
}

export interface Flower {
  id: string;
  tipo: string; // emoji
  created_at: string;
}

export interface Bouquet {
  id: string;
  flores: string[]; // array of flower emojis
  created_at: string;
}

// Local storage version (deprecated)
export interface BouquetLocal {
  id: string;
  name: string;
  type: 'tulips' | 'roses' | 'daisies';
  emoji: string;
  sentAt: number;
}

export interface Statistics {
  visits: number;
  lettersWritten: number;
  flowersSent: number;
  feelingsCreated: number;
  memoriesCreated: number;
  lastVisit: number;
}

export interface Particle {
  id: string;
  type: 'heart' | 'star' | 'flower' | 'sparkle';
  x: number;
  y: number;
  duration: number;
  emoji?: string;
}
