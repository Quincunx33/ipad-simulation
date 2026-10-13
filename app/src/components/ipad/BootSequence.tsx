import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function BootSequence() {
  const unlock = useStore((s) => s.unlock);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),   // Logo fade in
      setTimeout(() => setStage(2), 1300),  // Loading pulse
      setTimeout(() => setStage(3), 2000),  // Progress bar
      setTimeout(() => setStage(4), 6000),  // Calibration flash
      setTimeout(() => setStage(5), 6050),  // Flash end
      setTimeout(() => {
        setStage(6);
        unlock();
      }, 6200),  // Lock screen
    ];
    return () => timers.forEach(clearTimeout);
  }, [unlock]);

  return (
    <motion.div
      className="absolute inset-0 bg-black flex flex-col items-center justify-center z-60"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Apple Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={stage >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative"
      >
        <img
          src="assets/apple-logo.png"
          alt="Apple"
          className="w-[80px] h-[80px] object-contain"
        />
        {/* Glow pulse */}
        {stage >= 2 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0)',
                '0 0 50px rgba(255,255,255,0.2)',
                '0 0 20px rgba(255,255,255,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {/* Progress Bar */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 w-[200px] h-[3px] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
        </motion.div>
      )}

      {/* Calibration Flash */}
      {stage === 4 && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.div>
  );
}
