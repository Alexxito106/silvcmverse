'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { WelcomeOverlay } from './WelcomeOverlay';
import { PasswordProtection } from './PasswordProtection';
import { ToastProvider } from '@/providers/ToastProvider';
import { ParticleSystem } from './ParticleSystem';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { hasSeenWelcome, incrementVisit } from '@/lib/storage';

export const RootLayoutClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    incrementVisit();
    
    // Show welcome if not seen before
    if (!hasSeenWelcome()) {
      setShowWelcome(true);
    }
  }, []);

  return (
    <PasswordProtection>
      <ToastProvider>
        <Navbar />
        <ParticleSystem />
        <KeyboardShortcuts />
        <WelcomeOverlay isVisible={showWelcome} onClose={() => setShowWelcome(false)} />
        <main className="md:pt-28 pb-32 md:pb-12">
          {children}
        </main>
      </ToastProvider>
    </PasswordProtection>
  );
};
