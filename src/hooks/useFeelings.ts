import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Feeling } from '@/types';

export const useFeelings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeelings = useCallback(async (): Promise<Feeling[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('sensaciones')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching feelings';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addFeeling = useCallback(async (texto: string): Promise<Feeling | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('sensaciones')
        .insert([
          {
            texto,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (err) throw err;
      return data?.[0] || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding feeling';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFeeling = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('sensaciones')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting feeling';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchFeelings,
    addFeeling,
    deleteFeeling,
    loading,
    error,
  };
};
