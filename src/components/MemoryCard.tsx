import React from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Memory } from '@/types';
import { useToast } from '@/providers/ToastProvider';
import { deleteMemory } from '@/lib/memories';
import { MemoryDetailModal } from './MemoryDetailModal';

interface MemoryCardProps {
  memory: Memory;
  onDelete?: (id: string) => void;
}

/**
 * Export memory as JSON (fallback if image export fails)
 */
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

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete }) => {
  const { addToast } = useToast();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);

  const handleExport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      try {
        // Try using html-to-image first (better at handling modern CSS colors)
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
        // Fallback to JSON export
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error deleting memory:', errorMessage);
      addToast(`❌ Error al eliminar: ${errorMessage}`, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20, rotateZ: -2 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
        whileHover={{ rotateZ: 1, y: -5, scale: 1.02 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="group h-full cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <div
          ref={cardRef}
          className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-800"
        >
        {/* Image Section - Polaroid Style */}
        {memory.imagen_url ? (
          <div className="relative w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 overflow-hidden">
            <img
              src={memory.imagen_url}
              alt={memory.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="relative w-full h-48 bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-blue-100/50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
            <span className="text-6xl opacity-30">📷</span>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {/* Date tag */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {memory.fecha}
            </span>
            {memory.imagen_url && <span className="text-xl">📸</span>}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {memory.titulo}
          </h3>

          {/* Poem */}
          <p className="text-gray-700 dark:text-gray-300 italic font-light text-sm leading-relaxed mb-3 line-clamp-3 flex-grow">
            {memory.poema}
          </p>

          {/* Tags */}
          {memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {memory.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleExport}
              disabled={isDeleting || isExporting}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white text-sm font-semibold rounded transition-all duration-300 hover:shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-1 md:group-hover:translate-y-0 disabled:opacity-50"
            >
              {isExporting ? '⏳' : '📥'} Guardar
            </button>
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting || isExporting}
                className="px-3 py-2 bg-red-400/20 hover:bg-red-400/40 text-red-700 dark:text-red-300 text-sm font-semibold rounded transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-1 md:group-hover:translate-y-0 disabled:opacity-50"
              >
                {isDeleting ? '⏳' : '🗑️'}
              </button>
            )}
          </div>
        </div>
      </div>
      </motion.div>

      <MemoryDetailModal 
        memory={showDetail ? memory : null}
        onClose={() => setShowDetail(false)}
        onDelete={onDelete}
      />
    </>
  );
};
