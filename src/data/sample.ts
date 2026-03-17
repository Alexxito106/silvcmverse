import { Memory } from '@/types';

export const sampleMemories: Memory[] = [
  {
    id: 'mem_1',
    titulo: 'Nuestro Primer Encuentro',
    poema: 'En un día como hoy,\nmi corazón aprendió a volar.\nTus ojos eran el cielo\ny todo lo demás desapareció.',
    fecha: new Date(2024, 0, 15).toISOString(),
    tags: ['amor', 'primero', 'especial'],
    created_at: new Date(2024, 0, 15).toISOString(),
  },
  {
    id: 'mem_2',
    titulo: 'Atardecer en el Parque',
    poema: 'El cielo se tiñó de rosa,\ncomo el color de tus mejillas.\nCada momento a tu lado\nes una eternidad de dicha.',
    fecha: new Date(2024, 1, 14).toISOString(),
    tags: ['atardecer', 'naturaleza', 'amor'],
    created_at: new Date(2024, 1, 14).toISOString(),
  },
  {
    id: 'mem_3',
    titulo: 'Lluvia y Risas',
    poema: 'Bajo la lluvia danzamos,\nsin miedo al mundo.\nTus manos en las mías\neran todo lo que necesitaba.',
    fecha: new Date(2024, 2, 20).toISOString(),
    tags: ['lluvia', 'diversión', 'conexión'],
    created_at: new Date(2024, 2, 20).toISOString(),
  },
];

export const romanticQuotes = [
  'El amor es el puente entre dos almas.',
  'Eres la razón por la que mi corazón sigue latiendo.',
  'Contigo, cada momento es un poema.',
  'Tu amor es mi mayor aventura.',
  'Eres el infinito hecho persona.',
];
