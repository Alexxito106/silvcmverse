import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Memory } from '@/types';

export const useMemories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = useCallback(async (): Promise<Memory[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('recuerdos')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching memories';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addMemory = useCallback(
    async (memory: Omit<Memory, 'id' | 'created_at'> & { imagen_data?: File }) => {
      setLoading(true);
      setError(null);
      try {
        let imagen_url: string | undefined;

        // Upload image if provided
        if (memory.imagen_data) {
          const fileExt = memory.imagen_data.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `recuerdos/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('recuerdos')
            .upload(filePath, memory.imagen_data);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from('recuerdos')
            .getPublicUrl(filePath);

          imagen_url = data?.publicUrl;
        }

        const { data, error: err } = await supabase
          .from('recuerdos')
          .insert([
            {
              titulo: memory.titulo,
              poema: memory.poema,
              fecha: memory.fecha,
              imagen_url,
              tags: memory.tags,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (err) throw err;
        return data?.[0] || null;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error adding memory';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateMemory = useCallback(async (id: string, updates: Partial<Memory>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('recuerdos')
        .update(updates)
        .eq('id', id)
        .select();

      if (err) throw err;
      return data?.[0] || null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating memory';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMemory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('recuerdos')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting memory';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchMemories,
    addMemory,
    updateMemory,
    deleteMemory,
    loading,
    error,
  };
};
