'use client';

import { useEffect } from 'react';
import { incrementVisit, getStatistics } from '@/lib/storage';
import { Statistics } from '@/types';

export function useStatistics() {
  const [stats, setStats] = React.useState<Statistics | null>(null);

  useEffect(() => {
    incrementVisit();
    const currentStats = getStatistics();
    setStats(currentStats);
  }, []);

  return stats;
}

import * as React from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
