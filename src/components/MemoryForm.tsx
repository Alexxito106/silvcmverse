'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Memory } from '@/types';
import { uploadMemoryImage, createMemory } from '@/lib/memories';
import { useToast } from '@/providers/ToastProvider';

interface MemoryFormProps {
  onSave: (memory: Memory) => void;
  onCancel: () => void;
}

export const MemoryForm: React.FC<MemoryFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    poema: '',
    fecha: new Date().toISOString().split('T')[0],
    tags: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleImageSelect = (file: File) => {
    console.log('🔹 Validating image:', file.name, file.size, file.type);
    
    if (!file.type.startsWith('image/')) {
      console.error('❌ Not an image file:', file.type);
      addToast('⚠️ Por favor selecciona una imagen válida', 'warning');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      console.error('❌ File too large:', file.size);
      addToast('⚠️ La imagen es demasiado grande (máximo 5MB)', 'warning');
      return;
    }

    console.log('✅ Image validated, setting file state');
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('✅ Image preview created');
      setImagePreview(e.target?.result as string);
    };
    reader.onerror = (error) => {
      console.error('❌ Error reading file:', error);
      addToast('❌ Error al leer la imagen', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🔹 File selected:', e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      handleImageSelect(e.target.files[0]);
      // Reset for next selection
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    console.log('🔹 Trigger file input, ref:', fileInputRef.current);
    if (fileInputRef.current && !isLoading) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔹 Form submitted with data:', { formData, imageFile });

    if (!formData.titulo.trim() || !formData.poema.trim()) {
      addToast('⚠️ Por favor completa el título y la información', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl: string | undefined = undefined;

      // Upload image if selected with retry logic for mobile
      if (imageFile) {
        console.log('🔹 Image file detected, starting upload:', imageFile.name, imageFile.size);
        addToast('📸 Subiendo imagen a la nube...', 'info');
        const tempId = Date.now().toString();
        
        let retries = 0;
        const maxRetries = 2;
        
        while (retries < maxRetries) {
          try {
            console.log(`🔹 Upload attempt ${retries + 1}/${maxRetries}`);
            imageUrl = await uploadMemoryImage(imageFile, tempId);
            console.log('✅ Image uploaded successfully:', imageUrl);
            break;
          } catch (imageError) {
            retries++;
            console.error(`❌ Upload attempt ${retries} failed:`, imageError);
            
            if (retries < maxRetries) {
              console.log(`🔄 Retrying... (${maxRetries - retries} retries left)`);
              addToast(`🔄 Reintentando carga de imagen (intento ${retries})...`, 'info');
              await new Promise(resolve => setTimeout(resolve, 1500)); // Wait 1.5s before retry
            } else {
              console.warn('⚠️ Image upload failed after retries, continuing without image');
              addToast('⚠️ No se pudo subir la imagen, guardando recuerdo sin ella', 'warning');
            }
          }
        }
      }

      // Create memory record in Supabase
      console.log('🔹 Creating memory with:', {
        titulo: formData.titulo,
        poema: formData.poema,
        fecha: formData.fecha,
        imageUrl,
        tags: formData.tags,
      });

      const newMemory = await createMemory(
        formData.titulo,
        formData.poema,
        formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t),
        imageUrl,
        formData.fecha
      );

      console.log('✅ Memory created successfully:', newMemory);
      addToast('✨ ¡Recuerdo guardado correctamente!', 'success');
      onSave(newMemory);
      
      // Reset form
      setFormData({ titulo: '', poema: '', fecha: new Date().toISOString().split('T')[0], tags: '' });
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('❌ Error saving memory:', error);
      const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
      console.error('Full error object:', error);
      addToast(
        `❌ Error: ${errorMsg.substring(0, 50)}...`,
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-pink-100/50 to-purple-100/50 dark:from-pink-900/30 dark:to-purple-900/30 border border-white/50 dark:border-white/10 backdrop-blur-sm md:mb-12 pb-40 md:pb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Título del Recuerdo ✨
          </label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            placeholder="Ej: Nuestro primer atardecer..."
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Fecha del Recuerdo 📅
          </label>
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Imagen 📷 (opcional)
          </label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            onTouchEnd={(e) => {
              e.preventDefault();
              triggerFileInput();
            }}
            className="relative border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg p-8 text-center bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="absolute -top-96 -left-96 opacity-0 pointer-events-none"
            />
            {imagePreview ? (
              <div className="relative inline-block mx-auto">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  disabled={isLoading}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-colors disabled:opacity-50"
                  title="Eliminar imagen"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-2xl">📸</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Máximo 5MB (PNG, JPG, WebP)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Poem */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Información 💭
          </label>
          <textarea
            value={formData.poema}
            onChange={(e) => setFormData({ ...formData, poema: e.target.value })}
            placeholder="Escribe un 'poema' o descripción del recuerdo..."
            disabled={isLoading}
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 font-light text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Etiquetas (separadas por coma) 🏷️
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Ej: amor, atardecer, especial"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 border border-white/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>

        {/* Buttons - Sticky on mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:relative md:flex gap-4 pt-4 md:pt-6 bg-gradient-to-t from-pink-100 to-pink-100/80 dark:from-pink-900/50 dark:to-pink-900/20 md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row gap-3 md:gap-4 border-t md:border-t-0 border-white/30 md:border-white/0 z-40">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-4 md:py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 md:active:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ⏳
                </motion.span>
                Guardando...
              </span>
            ) : (
              '💾 Guardar Recuerdo'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-4 md:py-3 bg-gray-300/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all hover:bg-gray-400/50 dark:hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 md:active:scale-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    </motion.div>
  );
};
