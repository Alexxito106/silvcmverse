import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '@/types';
import { toPng } from 'html-to-image';
import { useToast } from '@/providers/ToastProvider';
import { deleteMemory } from '@/lib/memories';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

interface MemoryDetailModalProps {
  memory: Memory | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

function exportAsJSON(memory: Memory): void {
  const dataStr = JSON.stringify(memory, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `recuerdo_${memory.id}_${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ memory, onClose, onDelete }) => {
  const { addToast } = useToast();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  if (!memory) return null;

  const handleExport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      try {
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          quality: 0.95,
        });

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `recuerdo_${memory.id}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        addToast('📸 Recuerdo guardado como imagen', 'success');
      } catch (imageError) {
        console.error('Image export failed, trying JSON fallback:', imageError);
        exportAsJSON(memory);
        addToast('💾 Recuerdo guardado como JSON (imagen no compatible)', 'warning');
      }
    } catch (error) {
      console.error('Error exporting memory:', error);
      addToast('❌ Error al guardar', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await deleteMemory(memory.id);
      onDelete(memory.id);
      addToast('🗑️ Recuerdo eliminado', 'info');
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error deleting memory:', errorMessage);
      addToast(`❌ Error al eliminar: ${errorMessage}`, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-0"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
        >
          {/* Close Button */}
          <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detalles del Recuerdo</h2>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div
            ref={cardRef}
            className="p-8 bg-white dark:bg-gray-900 space-y-6"
          >
            {/* Image */}
            {memory.imagen_url && (
              <div className="w-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src={memory.imagen_url}
                  alt={memory.titulo}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Date */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                📅 {memory.fecha}
              </span>
              {memory.imagen_url && <span className="text-2xl">📸</span>}
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {memory.titulo}
              </h1>
            </div>

            {/* Poem/Content */}
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-light text-lg leading-relaxed whitespace-pre-wrap">
                {memory.poema}
              </p>
            </div>

            {/* Tags */}
            {memory.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {memory.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex gap-3">
              <button
                onClick={handleExport}
                disabled={isDeleting || isExporting}
                className="flex-1 px-6 Clickpy-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
              >
                {isExporting ? '⏳ Guardando...' : '📥 Guardar como Imagen'}
              </button>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting || isExporting}
                  className="px-6 py-3 bg-red-400/20 hover:bg-red-400/40 text-red-700 dark:text-red-300 font-semibold rounded-lg transition-all disabled:opacity-50"
                >
                  {isDeleting ? '⏳' : '🗑️ Eliminar'}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isLoading={isDeleting}
      />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
