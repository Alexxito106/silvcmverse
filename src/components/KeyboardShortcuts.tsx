'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/providers/ToastProvider';

export const KeyboardShortcuts: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Show quick navigation
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        addToast('🔍 Búsqueda rápida (instrucciónes: próximamente)', 'info');
      }

      // Ctrl/Cmd + S: Save (navigate to current page action)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();

        // Add different actions based on current page
        if (pathname === '/recuerdos') {
          addToast('💾 Usa el botón "Nuevo Recuerdo" para guardar', 'info');
        } else if (pathname === '/sensaciones') {
          addToast('💾 Presiona Ctrl+Enter en el textarea para guardar', 'info');
        } else if (pathname === '/cartas') {
          addToast('💾 Usa el botón "Guardar Carta" para guardar', 'info');
        } else if (pathname === '/flores') {
          addToast('💾 Haz clic para plantar flores o envía ramos', 'info');
        } else {
          addToast('💾 Acción guardada', 'success');
        }
      }

      // Ctrl/Cmd + 1-5: Quick navigation
      const shortcuts: { [key: string]: string } = {
        '1': '/',
        '2': '/recuerdos',
        '3': '/sensaciones',
        '4': '/cartas',
        '5': '/flores',
      };

      if ((e.ctrlKey || e.metaKey) && shortcuts[e.key]) {
        e.preventDefault();
        router.push(shortcuts[e.key]);
        addToast('🚀 Navegación rápida', 'success');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname, addToast]);

  return null;
};
