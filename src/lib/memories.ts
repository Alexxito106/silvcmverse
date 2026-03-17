import { supabase } from './supabase';
import { Memory } from '@/types';

export interface SupabaseMemory {
  id: string;
  titulo: string;
  poema: string;
  fecha: string;
  imagen_url?: string;
  tags: string[];
  created_at: string;
}

/**
 * Fetch all memories from Supabase
 */
export async function fetchMemories(): Promise<Memory[]> {
  try {
    const { data, error } = await supabase
      .from('recuerdos')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching memories:', error);
      throw error;
    }

    return (data || []).map((memory: SupabaseMemory) => ({
      id: memory.id,
      titulo: memory.titulo,
      poema: memory.poema,
      fecha: memory.fecha,
      imagen_url: memory.imagen_url,
      tags: memory.tags || [],
      created_at: memory.created_at,
    }));
  } catch (error) {
    console.error('Failed to fetch memories:', error);
    throw error;
  }
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadMemoryImage(
  file: File,
  memoryId: string
): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${memoryId}.${fileExt}`;
    const filePath = `memories/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('recuerdos')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('recuerdos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
}

/**
 * Create a new memory in Supabase
 */
export async function createMemory(
  title: string,
  poem: string,
  tags: string[],
  imageUrl?: string,
  fecha?: string
): Promise<Memory> {
  try {
    const { data, error } = await supabase
      .from('recuerdos')
      .insert([
        {
          titulo: title,
          poema: poem,
          tags: tags,
          imagen_url: imageUrl,
          fecha: fecha || new Date().toISOString().split('T')[0],
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating memory:', error);
      throw error;
    }

    return {
      id: data.id,
      titulo: data.titulo,
      poema: data.poema,
      fecha: data.fecha,
      imagen_url: data.imagen_url,
      tags: data.tags || [],
      created_at: data.created_at,
    };
  } catch (error) {
    console.error('Failed to create memory:', error);
    throw error;
  }
}

/**
 * Delete a memory from Supabase
 */
export async function deleteMemory(memoryId: string): Promise<void> {
  try {
    // First, get the memory to find the image URL
    const { data: memory, error: fetchError } = await supabase
      .from('recuerdos')
      .select('imagen_url')
      .eq('id', memoryId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch memory: ${fetchError.message}`);
    }

    // Delete image from storage if it exists
    if (memory?.imagen_url) {
      const fileName = memory.imagen_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('recuerdos')
          .remove([`memories/${fileName}`]);
      }
    }

    // Delete memory record
    const { error: deleteError } = await supabase
      .from('recuerdos')
      .delete()
      .eq('id', memoryId);

    if (deleteError) {
      throw new Error(`Delete failed: ${deleteError.message} (Code: ${deleteError.code})`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error('Failed to delete memory:', errorMessage);
    throw error;
  }
}

/**
 * Update a memory in Supabase
 */
export async function updateMemory(
  memoryId: string,
  updates: {
    title?: string;
    poem?: string;
    tags?: string[];
    fecha?: string;
    imageUrl?: string;
  }
): Promise<Memory> {
  try {
    const updateData: any = {};

    // Map field names from update object to database column names
    if (updates.title !== undefined) updateData.titulo = updates.title;
    if (updates.poem !== undefined) updateData.poema = updates.poem;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.fecha !== undefined) updateData.fecha = updates.fecha;
    if (updates.imageUrl !== undefined) updateData.imagen_url = updates.imageUrl;

    // Safety check: ensure we're updating at least one field
    if (Object.keys(updateData).length === 0) {
      throw new Error('No fields to update');
    }

    console.log('Updating memory with data:', updateData);

    const { data, error } = await supabase
      .from('recuerdos')
      .update(updateData)
      .eq('id', memoryId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      titulo: data.titulo,
      poema: data.poema,
      fecha: data.fecha,
      imagen_url: data.imagen_url,
      tags: data.tags || [],
      created_at: data.created_at,
    };
  } catch (error) {
    console.error('Failed to update memory:', error);
    throw error;
  }
}
