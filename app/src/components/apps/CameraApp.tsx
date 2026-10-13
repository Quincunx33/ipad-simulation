import { useState } from 'react';
import { motion } from 'framer-motion';
import { SwitchCamera, Zap, Moon, Square, ChevronUp } from 'lucide-react';

const MODES = ['Time-Lapse', 'Video', 'Cinematic', 'PHOTO', 'Portrait', 'PANO'];

export default function CameraApp() {
  const [mode, setMode] = useState('PHOTO');
  const [flash, setFlash] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleShutter = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 150);
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      {/* Viewfinder */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src="assets/camera-bg.jpg"
          alt="Camera"
          className="w-full h-full object-cover"
        />

        {/* Capture flash */}
        {captured && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white"
          />
        )}

        {/* Top Controls */}
        <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-4">
          <button onClick={() => setFlash(!flash)}>
            <Zap size={20} color={flash ? '#ffcc00' : 'white'} fill={flash ? '#ffcc00' : 'none'} />
          </button>
          <button>
            <Moon size={20} color="white" />
          </button>
          <button>
            <Square size={18} color="white" />
          </button>
        </div>

        {/* Focus Box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] border border-yellow-400/70 rounded-sm" />
      </div>

      {/* Bottom Controls */}
      <div className="shrink-0 pb-4 pt-2 bg-black/50">
        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-4 px-4 overflow-x-auto">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`text-[11px] font-medium whitespace-nowrap transition-colors ${
                m === mode ? 'text-yellow-400' : 'text-white/60'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Shutter + Switch */}
        <div className="flex items-center justify-around px-8">
          {/* Thumbnail */}
          <button className="w-[40px] h-[40px] rounded-lg overflow-hidden border border-white/30">
            <img src="assets/photo1.jpg" alt="Recent" className="w-full h-full object-cover" />
          </button>

          {/* Shutter Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShutter}
            className="w-[72px] h-[72px] rounded-full border-[3px] border-white flex items-center justify-center"
          >
            <motion.div
              animate={{ width: captured ? '45px' : '54px', height: captured ? '45px' : '54px' }}
              className="bg-white rounded-full"
            />
          </motion.button>

          {/* Camera Switch */}
          <button>
            <SwitchCamera size={28} color="white" />
          </button>
        </div>

        <div className="flex justify-center mt-2">
          <ChevronUp size={20} color="white" />
        </div>
      </div>
    </div>
  );
}
