import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import StatusBar from '../system/StatusBar';
import AppIcon from '../system/AppIcon';
import type { AppDefinition } from '@/types';
import { CloudRain, Cpu, Play, Pause, ChevronRight } from 'lucide-react';

const PAGE_1_APPS: AppDefinition[] = [
  { name: 'Safari', icon: 'compass', color: 'linear-gradient(135deg, #007aff, #5856d6)' },
  { name: 'Messages', icon: 'message-circle', color: 'linear-gradient(135deg, #34c759, #30d158)' },
  { name: 'FaceTime', icon: 'video', color: 'linear-gradient(135deg, #34c759, #30d158)' },
  { name: 'Photos', icon: 'image', color: 'linear-gradient(135deg, #ff2d55, #ff6b35)' },
  { name: 'Camera', icon: 'camera', color: 'linear-gradient(135deg, #8e8e93, #636366)' },
  { name: 'Mail', icon: 'mail', color: 'linear-gradient(135deg, #007aff, #5856d6)' },
  { name: 'Maps', icon: 'map-pin', color: 'linear-gradient(135deg, #34c759, #30b950)' },
  { name: 'Clock', icon: 'clock', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'Weather', icon: 'cloud-sun', color: 'linear-gradient(135deg, #007aff, #5ac8fa)' },
  { name: 'Home', icon: 'home', color: 'linear-gradient(135deg, #ff9500, #ffcc00)' },
  { name: 'Notes', icon: 'file-text', color: 'linear-gradient(135deg, #ffcc00, #ff9500)' },
  { name: 'Stocks', icon: 'bar-chart-3', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'Settings', icon: 'settings', color: 'linear-gradient(135deg, #8e8e93, #d1d1d6)' },
];

const PAGE_2_APPS: AppDefinition[] = [
  { name: 'Reminders', icon: 'check-circle-2', color: 'linear-gradient(135deg, #ff3b30, #ff6b35)' },
  { name: 'Calendar', icon: 'calendar', color: 'linear-gradient(135deg, #ff3b30, #ff6b35)' },
  { name: 'TV', icon: 'tv', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'Podcasts', icon: 'mic', color: 'linear-gradient(135deg, #af52de, #bf5af2)' },
  { name: 'Books', icon: 'book-open', color: 'linear-gradient(135deg, #ff9500, #ffcc00)' },
  { name: 'AppStore', icon: 'shopping-bag', color: 'linear-gradient(135deg, #007aff, #5856d6)' },
  { name: 'Wallet', icon: 'credit-card', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'Health', icon: 'heart', color: 'linear-gradient(135deg, #ff3b30, #ff6b35)' },
  { name: 'Settings', icon: 'settings', color: 'linear-gradient(135deg, #8e8e93, #aeaeb2)' },
  { name: 'Files', icon: 'folder', color: 'linear-gradient(135deg, #007aff, #5ac8fa)' },
  { name: 'FindMy', icon: 'radar', color: 'linear-gradient(135deg, #34c759, #30d158)' },
  { name: 'Tips', icon: 'lightbulb', color: 'linear-gradient(135deg, #ff9500, #ffcc00)' },
  { name: 'Contacts', icon: 'users', color: 'linear-gradient(135deg, #8e8e93, #aeaeb2)' },
  { name: 'Calculator', icon: 'calculator', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'VoiceMemos', icon: 'mic', color: 'linear-gradient(135deg, #ff3b30, #5856d6)' },
  { name: 'Compass', icon: 'compass', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'Measure', icon: 'ruler', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
  { name: 'Translate', icon: 'languages', color: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' },
];

const DOCK_APPS: AppDefinition[] = [
  { name: 'Safari', icon: 'compass', color: 'linear-gradient(135deg, #007aff, #5856d6)' },
  { name: 'Messages', icon: 'message-circle', color: 'linear-gradient(135deg, #34c759, #30d158)' },
  { name: 'Mail', icon: 'mail', color: 'linear-gradient(135deg, #007aff, #5856d6)' },
  { name: 'Music', icon: 'music', color: 'linear-gradient(135deg, #ff2d55, #af52de)' },
  { name: 'Files', icon: 'folder', color: 'linear-gradient(135deg, #007aff, #5ac8fa)' },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    }
  }
};

const iconItemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 280, damping: 20 } 
  }
};

export default function HomeScreen() {
  const launchApp = useStore((s) => s.launchApp);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [eqHeights, setEqHeights] = useState([5, 8, 4, 12, 6]);

  // Simulate responsive audio elements
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setEqHeights(Array.from({ length: 5 }, () => Math.floor(Math.random() * 16) + 4));
    }, 180);
    return () => clearInterval(t);
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 select-none overflow-hidden bg-black">
      {/* Wallpaper */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src="assets/ipados26-kit-wallpaper.jpg"
          alt="Wallpaper"
          className="w-full h-full object-cover scale-[1.02] filter brightness-[0.95]"
        />
      </div>

      {/* Futuristic Ambient Glow behind top elements */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Status Bar */}
      <StatusBar />

      {/* Main Home Screen Grid container */}
      <div className="relative z-10 flex flex-col h-full pt-8 pb-1 px-2.5 justify-between">
        
        {/* Swipeable Viewport */}
        <div className="flex-1 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {currentPage === 0 ? (
              <motion.div
                key="page1"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 160 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col gap-4 mt-2"
              >
                {/* WIDGETS SECTION */}
                <div className="grid grid-cols-2 gap-2 px-0">
                  
                  {/* Recent Messages AI Neural Sync Direct Link */}
                  <div
                    onClick={() => launchApp('Messages')}
                    className="p-2.5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all active:scale-[0.98] border border-emerald-500/15"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16, 24, 40, 0.65) 0%, rgba(10, 36, 28, 0.5) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-400/90 font-bold tracking-wider uppercase">Messages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-2 border border-white/5 my-1.5">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[11px] font-bold text-white/95">Recent Messages</span>
                        <span className="text-[9px] text-white/50">Active Now</span>
                      </div>
                      <p className="text-[11px] text-white/80 leading-relaxed font-medium line-clamp-2">
                        Hey! Did you see the new iOS update? It looks amazing!
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-emerald-400 font-semibold pt-1">
                      <span>Open Messages</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Multi-layered Intelligent Widget Capsule */}
                  <div className="grid grid-rows-2 gap-2">
                    
                    {/* Live Liquid Glass Climate */}
                    <div
                      onClick={() => launchApp('Weather')}
                      className="p-2 rounded-xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all border border-sky-500/10"
                      style={{
                        background: 'rgba(16, 24, 40, 0.6)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <CloudRain className="w-7 h-7 text-sky-400" />
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-[14px]">22°C</span>
                          <span className="text-[9px] text-white/60 font-medium">Space</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col gap-0.5">
                        <span className="text-[9px] text-sky-300 font-semibold tracking-wider uppercase">Weather</span>
                        <span className="text-[10px] text-emerald-400 font-bold">99.8% AQI</span>
                      </div>
                    </div>

                    {/* Futuristic Music Streamer Widget */}
                    <div
                      className="p-2 rounded-xl flex items-center justify-between border border-pink-500/10"
                      style={{
                        background: 'rgba(16, 24, 40, 0.6)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div
                        onClick={() => launchApp('Music')}
                        className="flex items-center gap-2 flex-1 cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-lg overflow-hidden bg-pink-500/20 flex items-center justify-center relative">
                          <img
                            src="assets/album1.jpg"
                            alt="Album"
                            className={`w-full h-full object-cover ${isPlaying ? 'animate-spin [animation-duration:8s]' : ''}`}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {!isPlaying && <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-[10px] text-white">💿</div>}
                        </div>
                        <div className="flex flex-col w-[80px]">
                          <span className="text-white font-bold text-[11px] truncate leading-tight">Now Playing</span>
                          <span className="text-[9px] text-white/50 truncate font-semibold">Music</span>
                        </div>
                      </div>

                      {/* Music Controls */}
                      <div className="flex items-center gap-3">
                        {isPlaying ? (
                          <div className="flex items-end gap-[2px] h-3 px-1">
                            {eqHeights.map((h, i) => (
                              <div
                                key={i}
                                className="w-[2px] bg-pink-400 rounded-full transition-all duration-150"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                        ) : null}
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/15 hvr active:scale-90"
                        >
                          {isPlaying ? (
                            <Pause className="w-3 h-3 text-pink-300" fill="currentColor" />
                          ) : (
                            <Play className="w-3 h-3 text-white pl-[1px]" fill="currentColor" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* APP GRID PAGE 1 */}
                <motion.div 
                  variants={gridContainerVariants}
                  initial="visible"
                  animate="visible"
                  className="grid grid-cols-4 gap-y-1.5 gap-x-1 px-0 mt-0.5 justify-items-center"
                >
                  {PAGE_1_APPS.map((app) => (
                    <motion.div
                      key={app.name}
                      variants={iconItemVariants}
                    >
                      <AppIcon app={app} onClick={() => launchApp(app.name)} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="page2"
                variants={gridContainerVariants}
                initial="visible"
                animate="visible"
                exit={{ opacity: 0, x: -160 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-4 gap-y-1.5 gap-x-1 px-0 mt-2 justify-items-center"
              >
                {PAGE_2_APPS.map((app) => (
                  <motion.div
                    key={app.name}
                    variants={iconItemVariants}
                  >
                    <AppIcon app={app} onClick={() => launchApp(app.name)} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Page Dots Indicators */}
        <div className="flex justify-center gap-1.5 mb-1">
          <button
            onClick={() => setCurrentPage(0)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentPage === 0 ? 'w-5 bg-white' : 'w-2 bg-white/40'
            }`}
            title="Page 1"
          />
          <button
            onClick={() => setCurrentPage(1)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentPage === 1 ? 'w-5 bg-white' : 'w-2 bg-white/40'
            }`}
            title="Page 2"
          />
        </div>

        {/* Levitating Liquid Glass Capsule Dock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, type: 'spring', stiffness: 180, damping: 20 }}
          className="mx-auto select-none mt-auto mb-0.5 px-3 py-1.5 rounded-[22px] flex gap-2 relative"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(28px) saturate(220%)',
            WebkitBackdropFilter: 'blur(28px) saturate(220%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255,255,255,0.15)',
          }}
        >
          {DOCK_APPS.map((app) => (
            <motion.div
              key={app.name}
              whileHover={{ y: -6, scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <AppIcon
                key={app.name}
                app={app}
                onClick={() => launchApp(app.name)}
                showLabel={false}
              />
            </motion.div>
          ))}

          {/* Elegant active dock reflection/glow loop */}
          <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-4/5 h-[1.5px] bg-gradient-to-r from-red-500/20 via-pink-500/50 via-cyan-400/50 to-blue-500/20 blur-[1px]" />
        </motion.div>

      </div>
    </div>
  );
}
