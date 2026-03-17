'use client';

import React, { useState, useEffect } from 'react';
import { ToastProvider } from './ToastProvider';
import { Navbar } from '@/components/Navbar';
import { ParticleSystem } from '@/components/ParticleSystem';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { WelcomeOverlay } from '@/components/WelcomeOverlay';
import { PasswordProtection } from '@/components/PasswordProtection';
import { hasSeenWelcome, incrementVisit } from '@/lib/storage';

interface RootProvidersProps {
  children: React.ReactNode;
}

/**
 * Root Provider Component
 * 
 * Wraps the entire application with necessary providers:
 * - ToastProvider: Global toast notifications
 * - ParticleSystem: Global particle effects
 * - KeyboardShortcuts: Global keyboard event handling
 * - WelcomeOverlay: First-time welcome screen
 */
export const RootProviders: React.FC<RootProvidersProps> = ({ children }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're running on client
    setIsClient(true);
    
    // Increment visit counter
    incrementVisit();
    
    // Show welcome if not seen before
    if (!hasSeenWelcome()) {
      setShowWelcome(true);
    }
  }, []);

  return (
    <PasswordProtection>
      <ToastProvider>
        {!isClient ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            <ParticleSystem />
            <KeyboardShortcuts />
            <WelcomeOverlay isVisible={showWelcome} onClose={() => setShowWelcome(false)} />
            <main className="md:pt-20 pb-32 md:pb-8">
              {children}
            </main>
          </>
        )}
      </ToastProvider>
    </PasswordProtection>
  );
};
