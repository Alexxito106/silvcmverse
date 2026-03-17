import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Flower, Bouquet } from '@/types';

export const useFlowers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlowers = useCallback(async (): Promise<Flower[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('flores')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching flowers';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addFlower = useCallback(async (tipo: string): Promise<Flower | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('flores')
        .insert([
          {
            tipo,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (err) throw err;
      return data?.[0] || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding flower';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFlower = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('flores')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting flower';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Bouquet operations
  const fetchBouquets = useCallback(async (): Promise<Bouquet[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('bouquets')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching bouquets';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addBouquet = useCallback(async (flores: string[]): Promise<Bouquet | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('bouquets')
        .insert([
          {
            flores,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (err) throw err;
      return data?.[0] || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding bouquet';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBouquet = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('bouquets')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting bouquet';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchFlowers,
    addFlower,
    deleteFlower,
    fetchBouquets,
    addBouquet,
    deleteBouquet,
    loading,
    error,
  };
};
