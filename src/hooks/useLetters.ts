import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Letter } from '@/types';

export const useLetters = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLetters = useCallback(async (): Promise<Letter[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('cartas')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching letters';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addLetter = useCallback(
    async (texto: string, password?: string): Promise<Letter | null> => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from('cartas')
          .insert([
            {
              texto,
              password: password || null,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (err) throw err;
        return data?.[0] || null;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error adding letter';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateLetter = useCallback(
    async (id: string, updates: Partial<Letter>): Promise<Letter | null> => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from('cartas')
          .update(updates)
          .eq('id', id)
          .select();

        if (err) throw err;
        return data?.[0] || null;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error updating letter';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteLetter = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('cartas')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting letter';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchLetters,
    addLetter,
    updateLetter,
    deleteLetter,
    loading,
    error,
  };
};
