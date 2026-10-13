import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2, Heart, Trash2 } from 'lucide-react';

const PHOTOS = Array.from({ length: 12 }, (_, i) => `assets/photo${i + 1}.jpg`);

export default function PhotosApp() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Nav Bar */}
      <div
        className="flex items-center px-2 py-2 shrink-0"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <span className="text-[17px] font-semibold text-black ml-2">Photos</span>
        <div className="ml-auto flex gap-4 text-[13px] text-[#007aff]">
          <button>Years</button>
          <button>Months</button>
          <button>Days</button>
          <button className="font-semibold">All</button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-[2px]">
        <div className="grid grid-cols-4 gap-[2px]">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="aspect-square"
              onClick={() => setSelectedPhoto(i)}
            >
              <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center justify-around py-2 border-t border-gray-200 bg-white/90 shrink-0">
        <button className="text-[10px] text-[#007aff] font-medium flex flex-col items-center gap-0.5">
          <span className="text-[17px]">Photos</span>
        </button>
        <button className="text-[10px] text-gray-500 flex flex-col items-center gap-0.5">
          <span className="text-[17px]">For You</span>
        </button>
        <button className="text-[10px] text-gray-500 flex flex-col items-center gap-0.5">
          <span className="text-[17px]">Albums</span>
        </button>
        <button className="text-[10px] text-gray-500 flex flex-col items-center gap-0.5">
          <span className="text-[17px]">Search</span>
        </button>
      </div>

      {/* Full Screen Viewer */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3">
              <button onClick={() => setSelectedPhoto(null)} className="text-white">
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-4">
                <button className="text-white"><Share2 size={20} /></button>
                <button className="text-white"><Heart size={20} /></button>
                <button className="text-white"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                src={PHOTOS[selectedPhoto]}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
