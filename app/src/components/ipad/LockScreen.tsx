import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Fingerprint, Check, Sparkles, Palette, Type, CheckSquare } from 'lucide-react';
import StatusBar from '../system/StatusBar';

// Custom SVGs for ultra-accurate widgets matching the screenshot
const PrayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
    <path d="M12 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="currentColor" />
    <path d="M12 6c-3 0-5.5 2-6 5h12c-.5-3-3-5-6-5z" />
    <path d="M4 17h16" strokeLinecap="round" />
    <path d="M6 11v6H5v2h14v-2h-1v-6H6z" fill="currentColor" fillOpacity={0.15} />
  </svg>
);

const StudyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
    <path d="M12 6c-1.5-2.2-4-2.2-6-1v13c2-1.2 4.5-1.2 6 1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6c1.5-2.2 4-2.2 6-1v13c-2-1.2-4.5-1.2-6 1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v14" />
  </svg>
);

const TrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
    {/* Gym Posing Silhouette */}
    <circle cx="12" cy="5" r="2.2" fill="currentColor" />
    <path d="M6 10c0-1 1-1.5 2-1.5h8c1 0 2 .5 2 1.5" strokeLinecap="round" />
    <path d="M12 8.5v6" />
    <path d="M10 14.5h4L17 21" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 21l3-6.5" strokeLinecap="round" />
    <path d="M6 10l-2-3 2-1.5 M18 10l2-3-2-1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
    <path d="M18 3v13M15 3h6" strokeLinecap="round" />
    <path d="M6 3v5 M9 3v5 M12 3v5" strokeLinecap="round" />
    <path d="M6 8.5a3 3 0 0 0 6 0v-5.5H6v5.5z" fill="currentColor" fillOpacity={0.15} />
    <path d="M9 11.5v7.5M18 11.5v7.5" strokeLinecap="round" />
  </svg>
);

const SleepIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
    <path d="M2 20h20M5 11V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4" strokeLinecap="round" />
    <path d="M3 11h18v6H3v-6z" fill="currentColor" fillOpacity={0.15} />
    <path d="M6 13h4v1.5H6zM14 13h4v1.5H14z" />
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8 text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
    <path d="M21.5 2v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// High-fidelity sketch of fists wrapped with bandages at the bottom
const HandWrapsSketch = () => (
  <div className="absolute bottom-0 inset-x-0 h-[44%] pointer-events-none select-none z-0 overflow-hidden opacity-35">
    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" stroke="#ffffff" strokeWidth="1.1">
      <path d="M -10 260 C 50 250, 100 230, 130 190" strokeDasharray="3 1" strokeOpacity="0.4" />
      <path d="M -20 280 C 40 270, 90 250, 110 210" />
      <path d="M 110 210 C 120 180, 135 150, 150 140 C 160 135, 175 145, 170 160" />
      <path d="M 130 190 C 135 175, 145 165, 155 170" />
      <path d="M 80 230 L 105 200 M 90 240 L 115 210 M 70 225 L 95 195" strokeOpacity="0.7" />
      <path d="M 120 195 C 110 220, 90 235, 75 240" strokeOpacity="0.5" />
      <path d="M 135 185 C 125 210, 105 225, 90 230" strokeOpacity="0.5" />
      <path d="M 145 145 C 135 145, 130 155, 130 165 C 130 175, 140 180, 150 175" />
      <path d="M 152 140 C 145 142, 140 150, 142 160 C 144 170, 152 172, 158 165" />
      <path d="M 158 143 C 152 145, 148 152, 150 162 C 153 170, 160 168, 165 162" />
      <path d="M 410 260 C 350 250, 300 230, 270 190" strokeDasharray="3 1" strokeOpacity="0.4" />
      <path d="M 420 280 C 360 270, 310 250, 290 210" />
      <path d="M 290 210 C 280 180, 265 150, 250 140 C 240 135, 225 145, 230 160" />
      <path d="M 270 190 C 265 175, 255 165, 245 170" />
      <path d="M 320 230 L 295 200 M 310 240 L 285 210 M 330 225 L 305 195" strokeOpacity="0.75" />
      <path d="M 280 195 C 290 220, 310 235, 325 240" strokeOpacity="0.5" />
      <path d="M 265 185 C 275 210, 295 225, 310 230" strokeOpacity="0.5" />
      <path d="M 255 145 C 265 145, 270 155, 270 165 C 270 175, 260 180, 250 175" />
      <path d="M 248 140 C 255 142, 260 150, 258 160 C 256 170, 248 172, 242 165" />
      <path d="M 242 143 C 248 145, 252 152, 250 162 C 247 170, 240 168, 235 162" />
      <path d="M 170 160 C 185 165, 215 165, 230 160" strokeWidth="1.3" />
      <path d="M 155 170 C 175 185, 225 185, 245 170" strokeWidth="1.3" />
      <path d="M 160 142 C 180 150, 220 150, 240 142" />
      <path d="M 120 160 C 110 155, 95 165, 90 180" strokeOpacity="0.25" strokeDasharray="2 2" />
      <path d="M 280 160 C 290 155, 305 165, 310 180" strokeOpacity="0.25" strokeDasharray="2 2" />
    </svg>
  </div>
);

const SpiralGptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-amber-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18 M12 3c4.5 0 9 4.5 9 9s-4.5 9-9 9-9-4.5-9-9 4.5-9 9-9z" strokeOpacity={0.25} />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5-3.5-1.5-3.5-3.5 1.5-3.5 3.5-3.5z" />
    <path strokeLinecap="round" d="M8.5 14c-1 1-1.5 2-1.5 3s1.5 2 3.5 2" />
    <path strokeLinecap="round" d="M15.5 14c1 1 1.5 2 1.5 3s-1.5 2-3.5 2" />
  </svg>
);

const RadiantSunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-amber-400">
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" strokeLinecap="round" />
  </svg>
);

const DiamondSparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400 animate-pulse">
    <path d="M12 2c0 5 1.5 7 7 7-5.5 0-7 2-7 7 0-5-1.5-7-7-7 5.5 0 7-2 7-7z" />
  </svg>
);

const getAppColor = (app: string): string => {
  const colors: Record<string, string> = {
    Messages: '#007aff',
    Mail: '#fc3d39',
    Calendar: '#4cd964',
    Safari: '#fc3d39',
    Photos: '#ff2d55',
  };
  return colors[app] || '#8e8e93';
};

const formatTime = (date: Date | string | number): string => {
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return 'now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
};

export default function LockScreen() {
  const currentTime = useStore((s) => s.currentTime);
  const unlock = useStore((s) => s.unlock);
  const bootStage = useStore((s) => s.bootStage);
  const setNotificationCenterOpen = useStore((s) => s.setNotificationCenterOpen);
  const launchApp = useStore((s) => s.launchApp);
  const notifications = useStore((s) => s.notifications);

  const isCoverSheet = bootStage !== 'lockscreen';

  const [showFingerprint, setShowFingerprint] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState<'stack' | 'expanded'>('stack');
  const [aiAssistantOverlay, setAiAssistantOverlay] = useState<{ name: string; text: string } | null>(null);

  // iOS 26 Styling Options Store (Persisted locally in the component state)
  const [isEditing, setIsEditing] = useState(false);
  const [clockFont, setClockFont] = useState<'classic' | 'serif' | 'rounded' | 'mono' | 'space'>('classic');
  const [clockColor, setClockColor] = useState('#ff9500'); // Amber default from screenshot
  const [wallpaperType, setWallpaperType] = useState<'standard' | 'cosmic' | 'neon' | 'sunset' | 'aurora'>('standard');
  const [showWrapsOverlay, setShowWrapsOverlay] = useState(true);

  // Customizable Dynamic Widget Slot toggles
  const [enabledWidgets, setEnabledWidgets] = useState<string[]>(['pray', 'study', 'train', 'eat', 'sleep', 'repeat']);

  const dragControls = useAnimation();

  // Dynamic slide down entrance if it is the Cover Sheet
  useEffect(() => {
    if (isCoverSheet) {
      dragControls.set({ y: -800, opacity: 1 });
      dragControls.start({ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 28 } });
    } else {
      dragControls.set({ y: 0, opacity: 1 });
    }
  }, [isCoverSheet, dragControls]);

  // Handle dynamic unlocking response
  const handleUnlockAndFlicker = () => {
    if (isEditing) return; // Prevent unlocking in Edit Mode
    if (isCoverSheet) {
      dragControls.start({ y: -800, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }).then(() => {
        setNotificationCenterOpen(false);
        dragControls.set({ y: 0, opacity: 1 });
      });
      return;
    }
    if (showFingerprint) return;
    setShowFingerprint(true);
    setTimeout(() => {
      setAuthSuccess(true);
      setTimeout(async () => {
        await dragControls.start({ y: -800, opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } });
        unlock();
      }, 500);
    }, 1100);
  };

  const handleDragEnd = async (_event: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (isEditing) return;
    if (info.offset.y < -100 || info.velocity.y < -300) {
      await dragControls.start({ y: -800, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } });
      if (isCoverSheet) {
        setNotificationCenterOpen(false);
        dragControls.set({ y: 0, opacity: 1 });
      } else {
        unlock();
      }
    } else {
      dragControls.start({ y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } });
    }
  };

  const handleNotificationClick = (app: string) => {
    if (isCoverSheet) {
      dragControls.start({ y: -800, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }).then(() => {
        setNotificationCenterOpen(false);
        dragControls.set({ y: 0, opacity: 1 });
        launchApp(app);
      });
    } else {
      handleUnlockAndFlicker();
      setTimeout(() => {
        launchApp(app);
      }, 1600);
    }
  };

  const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayStr = daysShort[currentTime.getDay()];

  const rawHours = currentTime.getHours();
  const formatHours = rawHours % 12 || 12;
  const formatMinutes = currentTime.getMinutes().toString().padStart(2, '0');

  // Map Wallpaper type to dynamic background styles
  const getWallpaperBackground = () => {
    switch (wallpaperType) {
      case 'cosmic':
        return 'linear-gradient(135deg, #09090b 0%, #0c0a09 50%, #1c1917 100%)';
      case 'neon':
        return 'linear-gradient(220deg, #1e1b4b 0%, #311042 45%, #030008 100%)';
      case 'sunset':
        return 'linear-gradient(180deg, #451a03 0%, #1c0602 60%, #020000 100%)';
      case 'aurora':
        return 'radial-gradient(circle at top right, #022c22 0%, #061512 60%, #020617 100%)';
      case 'standard':
      default:
        return 'radial-gradient(circle at center, #262628 0%, #101011 100%)';
    }
  };

  // Map typography keys to CSS font style classes
  const getClockFontClass = () => {
    switch (clockFont) {
      case 'serif':
        return 'font-serif tracking-tight font-extrabold';
      case 'rounded':
        return 'font-sans font-extrabold tracking-tight';
      case 'mono':
        return 'font-mono uppercase tracking-normal font-bold';
      case 'space':
        return 'font-black tracking-[0.02em] uppercase font-mono';
      case 'classic':
      default:
        return 'font-sans font-[900] tracking-[-0.05em]';
    }
  };

  // Helper to toggle widgets on customization panel
  const toggleWidget = (widgetId: string) => {
    if (enabledWidgets.includes(widgetId)) {
      if (enabledWidgets.length > 1) {
        setEnabledWidgets(enabledWidgets.filter((w) => w !== widgetId));
      }
    } else {
      setEnabledWidgets([...enabledWidgets, widgetId]);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 overflow-hidden select-none touch-none"
      drag={isEditing ? false : 'y'}
      dragConstraints={{ top: -800, bottom: 0 }}
      dragElastic={{ top: 0.1, bottom: 0 }}
      dragMomentum={false}
      initial={isCoverSheet ? { y: -800 } : { y: 0 }}
      animate={dragControls}
      exit={{ y: -800, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      onDragEnd={handleDragEnd}
      style={{
        background: getWallpaperBackground(),
      }}
    >
      {/* Background Wallpaper image overlay with smooth edit-mode scale down */}
      <motion.div
        animate={{
          scale: isEditing ? 0.92 : 1,
          borderRadius: isEditing ? '28px' : '0px',
          y: isEditing ? -16 : 0,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="absolute inset-0 select-none overflow-hidden"
      >
        {/* Render base wallpaper image only for 'standard' to protect the aesthetic */}
        {wallpaperType === 'standard' && (
          <div className="absolute inset-0 pointer-events-none opacity-45 select-none z-0">
            <img
              src="assets/wallpaper-lock.jpg"
              alt="Wallpaper"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>
        )}

        {/* Hand Wraps Sketch Drawing overlay at the bottom */}
        {showWrapsOverlay && <HandWrapsSketch />}

        {/* Transparent Unlock Trigger (Clicks trigger biometrics) */}
        {!isEditing && <div className="absolute inset-0 z-10" onClick={handleUnlockAndFlicker} />}

        {/* Status Bar */}
        <StatusBar />

        {/* Dynamic Interactive Components Container */}
        <div className="relative z-20 flex flex-col items-center h-full pt-11 pb-6 px-5 justify-between">
          
          {/* TOP CLOCK WRAPPER (Interactive Tap-to-edit clock in Edit Mode) */}
          <motion.div
            onClick={(e) => {
              if (isEditing) e.stopPropagation();
            }}
            animate={isEditing ? { scale: 1.05 } : { scale: 1 }}
            className={`text-center w-full mt-4 cursor-default ${
              isEditing ? 'ring-2 ring-amber-500/30 rounded-2xl p-2 bg-black/20 backdrop-blur-sm' : ''
            }`}
          >
            {/* Dynamic Customizable Date Line */}
            <div
              className="tracking-[0.06em] font-bold text-center mb-0.5 filter drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.5)] transition-all"
              style={{ fontSize: '18px', color: clockColor }}
            >
              {dayStr} May 30
            </div>

            {/* Premium custom watch clock with precise font styles */}
            <div
              className={`leading-[0.82] flex justify-center items-center drop-shadow-[0_6px_22px_rgba(0,0,0,0.65)] ${getClockFontClass()}`}
              style={{ fontSize: '152px', color: clockColor }}
            >
              <span className="scale-x-[0.9] inline-block">{formatHours}</span>
              <span className="px-[2px] pb-4 scale-70 animate-pulse relative bottom-[8px] inline-block" style={{ opacity: 0.95 }}>:</span>
              <span className="scale-x-[0.9] inline-block">{formatMinutes}</span>
            </div>
          </motion.div>

          {/* CUSTOMIZABLE HORIZONTAL WIDGET SLOTS */}
          <motion.div
            animate={isEditing ? { scale: 1.05, border: '1px dashed rgba(245,158,11,0.3)', padding: '6px', borderRadius: '16px', background: 'rgba(0,0,0,0.2)' } : {}}
            className="grid grid-cols-6 gap-x-2.5 w-full max-w-[370px] mt-2 px-1 relative z-30 transition-all"
          >
            {enabledWidgets.includes('pray') && (
              <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform">
                <div className="w-13 h-13 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                  <PrayIcon />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#f5f5f7] mt-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none text-center">PRAY</span>
              </div>
            )}

            {enabledWidgets.includes('study') && (
              <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform">
                <div className="w-13 h-13 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                  <StudyIcon />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#f5f5f7] mt-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none text-center">STUDY</span>
              </div>
            )}

            {enabledWidgets.includes('train') && (
              <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform">
                <div className="w-13 h-13 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                  <TrainIcon />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#f5f5f7] mt-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none text-center">TRAIN</span>
              </div>
            )}

            {enabledWidgets.includes('eat') && (
              <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform">
                <div className="w-13 h-13 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                  <EatIcon />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#f5f5f7] mt-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none text-center">EAT</span>
              </div>
            )}

            {enabledWidgets.includes('sleep') && (
              <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform">
                <div className="w-13 h-13 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                  <SleepIcon />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#f5f5f7] mt-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none text-center">SLEEP</span>
              </div>
            )}

            {enabledWidgets.includes('repeat') && (
              <div className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform">
                <div className="w-13 h-13 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                  <RepeatIcon />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#f5f5f7] mt-1 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none text-center">REPEAT</span>
              </div>
            )}
          </motion.div>

          {/* NOTIFICATION STACK CARDS */}
          {enabledWidgets.length > 0 && !isEditing && (
            <div className="w-full max-w-[342px] flex flex-col relative z-30 mt-3 pt-1">
              <AnimatePresence mode="popLayout">
                {notifications.length === 0 ? (
                  <motion.div
                    key="no-notifications"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative z-30 rounded-[22px] py-4 px-3 text-center border border-white/5 bg-neutral-900/40 backdrop-blur-3xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] select-none"
                  >
                    <span className="text-[11.5px] font-extrabold tracking-widest text-zinc-400 uppercase">
                      No older notifications
                    </span>
                  </motion.div>
                ) : activeNotificationTab === 'stack' ? (
                  <motion.div
                    key="stacked-notifs"
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    onClick={() => setActiveNotificationTab('expanded')}
                    className="relative cursor-pointer select-none space-y-[-14px]"
                  >
                    {/* Primary top card - most recent notification */}
                    <motion.div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotificationClick(notifications[0].app);
                      }}
                      className="relative z-30 rounded-[20px] p-3 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
                      style={{
                        background: 'linear-gradient(185deg, rgba(28,28,30,0.68) 0%, rgba(18,18,18,0.78) 100%)',
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-5 h-5 rounded-[5px] flex items-center justify-center overflow-hidden border border-white/10"
                            style={{ background: getAppColor(notifications[0].app) }}
                          >
                            <span className="text-[9.5px] text-white font-extrabold uppercase leading-none">
                              {notifications[0].app[0]}
                            </span>
                          </div>
                          <span className="text-[13px] font-bold text-white/90">{notifications[0].app}</span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {formatTime(notifications[0].timestamp)}
                        </span>
                      </div>

                      <div className="flex flex-col mt-2.5">
                        <div className="text-[13.5px] font-bold text-white leading-tight">
                          {notifications[0].title}
                        </div>
                        <span className="text-[11.5px] text-zinc-400 mt-1 line-clamp-2 leading-snug">
                          {notifications[0].body}
                        </span>
                      </div>
                    </motion.div>

                    {/* Secondary stacked preview card */}
                    {notifications.length > 1 && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick(notifications[1].app);
                        }}
                        className="relative z-20 rounded-[20px] p-3 text-white border border-white/5 opacity-85 shadow-md scale-[0.96] translate-y-1 backdrop-blur-2xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(24,24,26,0.65) 0%, rgba(14,14,14,0.75) 100%)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-4 h-4 rounded-[4px] flex items-center justify-center overflow-hidden border border-white/5"
                              style={{ background: getAppColor(notifications[1].app) }}
                            >
                              <span className="text-[8px] text-white font-extrabold uppercase leading-none">
                                {notifications[1].app[0]}
                              </span>
                            </div>
                            <span className="text-[12px] font-semibold text-zinc-200">{notifications[1].app}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400">{formatTime(notifications[1].timestamp)}</span>
                        </div>
                        <div className="text-[11.5px] text-zinc-300 font-medium leading-tight mt-1.5 truncate">
                          <strong className="text-white font-semibold">{notifications[1].title}</strong>: {notifications[1].body}
                        </div>
                      </div>
                    )}

                    {/* Infinite stack count helper badge */}
                    {notifications.length > 2 && (
                      <div
                        className="relative z-10 rounded-[20px] py-1.5 px-4 shadow-sm scale-[0.92] translate-y-2 opacity-60 text-center backdrop-blur-xl border border-white/5 animate-pulse"
                        style={{
                          background: 'rgba(20, 20, 22, 0.6)',
                        }}
                      >
                        <span className="text-[11px] font-bold tracking-wide text-zinc-300">
                          +{notifications.length - 2} earlier notifications
                        </span>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded-notifs"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    onClick={() => setActiveNotificationTab('stack')}
                    className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 cursor-pointer scrollbar-thin"
                  >
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick(n.app);
                        }}
                        className="rounded-[20px] p-3 border border-white/10 backdrop-blur-2xl hover:bg-white/[0.04] transition-all"
                        style={{ background: 'rgba(28,28,30,0.75)' }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-4.5 h-4.5 rounded-[4px] flex items-center justify-center overflow-hidden border border-white/5"
                              style={{ background: getAppColor(n.app) }}
                            >
                              <span className="text-[9px] text-white font-extrabold uppercase leading-none">
                                {n.app[0]}
                              </span>
                            </div>
                            <span className="text-[12.5px] font-bold text-white">{n.app}</span>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-semibold">{formatTime(n.timestamp)}</span>
                        </div>
                        <div className="text-[13px] font-bold text-white">{n.title}</div>
                        <div className="text-[11.5px] text-zinc-400 mt-1 leading-normal font-medium">{n.body}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* THREE ACTIVE AI ASSISTANT LAUNCHERS AND THE CORRESPONDING EDIT ACTION BUTTON */}
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-7 mt-3 relative z-30 justify-center"
            >
              {/* Custom Elegant Lock Screen Editor trigger (Palette selector) */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="w-13 h-13 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-500/40 relative overflow-hidden transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(230,175,80,0.25) 0%, rgba(10,10,10,0.8) 100%)',
                  boxShadow: '0 4px 18px rgba(245,158,11,0.25), inset 0 1px 1px rgba(255,255,255,0.2)'
                }}
                title="Edit Lock Screen Style"
              >
                <Palette size={18} className="text-amber-400 animate-pulse" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAiAssistantOverlay({
                    name: 'ChatGPT 5.0 (Neural)',
                    text: 'How can I assist you on iOS 26 today? Neural Sync has initialized secure link.'
                  });
                }}
                className="w-13 h-13 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-500/25 relative overflow-hidden transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(230,175,80,0.1) 0%, rgba(20,20,20,0.6) 100%)',
                  boxShadow: '0 4px 12px rgba(230,175,80,0.12)'
                }}
              >
                <SpiralGptIcon />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAiAssistantOverlay({
                    name: 'Claude 4.5 Sonnet',
                    text: 'Greetings. File synchronization and UI animations are completely copied.'
                  });
                }}
                className="w-13 h-13 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-500/25 relative overflow-hidden transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(230,175,80,0.1) 0%, rgba(20,20,20,0.6) 100%)',
                  boxShadow: '0 4px 12px rgba(230,175,80,0.12)'
                }}
              >
                <RadiantSunIcon />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAiAssistantOverlay({
                    name: 'Gemini 2.0 Ultra',
                    text: 'Hi! Lock screen widgets and fluid zoom animations are successfully updated. Double tap style icon or drag up to unlock!'
                  });
                }}
                className="w-13 h-13 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-500/25 relative overflow-hidden transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(230,175,80,0.1) 0%, rgba(20,20,20,0.6) 100%)',
                  boxShadow: '0 4px 12px rgba(230,175,80,0.12)'
                }}
              >
                <DiamondSparkIcon />
              </motion.button>
            </motion.div>
          )}

          {/* SYSTEM ASSISTANT OVERLAYS */}
          <AnimatePresence>
            {aiAssistantOverlay && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                onClick={() => setAiAssistantOverlay(null)}
                className="absolute bottom-24 inset-x-4 z-40 p-4 rounded-2xl border border-amber-500/25 backdrop-blur-3xl shadow-xl flex flex-col gap-1.5 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(24,20,12,0.88) 0%, rgba(12,10,6,0.92) 100%)',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 15px rgba(230,175,80,0.15)'
                }}
              >
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Sparkles size={15} />
                  <span className="text-[12px] font-bold tracking-wider uppercase">{aiAssistantOverlay.name}</span>
                  <span className="text-[9px] px-1 bg-amber-400/10 text-amber-300 rounded ml-auto">Active Thread</span>
                </div>
                <p className="text-[13px] text-amber-100/90 leading-relaxed font-medium">
                  {aiAssistantOverlay.text}
                </p>
                <span className="text-[9px] text-amber-500/60 font-semibold self-end">Tap to dismiss</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FIngerprint Authenticator indicator box */}
          <AnimatePresence>
            {showFingerprint && !isEditing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 pointer-events-none"
              >
                <div className="relative flex flex-col items-center justify-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {!authSuccess && (
                      <>
                        <motion.div
                          className="absolute w-24 h-24 rounded-full border-2 border-amber-500/40"
                          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <motion.div
                          className="absolute w-24 h-24 rounded-full border-2 border-amber-500/40"
                          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                        />
                      </>
                    )}
                    <motion.div
                      animate={authSuccess ? {
                        color: clockColor,
                        scale: [1, 1.25, 1],
                      } : { color: '#ffffff' }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-black/50 rounded-full border border-white/10"
                    >
                      {authSuccess ? (
                        <Check size={58} strokeWidth={2.5} />
                      ) : (
                        <Fingerprint size={58} strokeWidth={1.5} className="animate-pulse" />
                      )}
                    </motion.div>
                  </div>
                  <span className="text-[13px] text-amber-400 font-bold tracking-wider uppercase">
                    {authSuccess ? 'Biometrics Verified' : 'Establishing Secure Neural Link...'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SWIPE PROMPT DESCRIPTOR */}
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 0.95, 0.5], y: [0, -4, 0] }}
              transition={{
                delay: 0.4,
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-30 flex flex-col items-center justify-center text-white/50 text-[11.5px] font-bold tracking-widest uppercase cursor-pointer mb-2 pointer-events-none"
            >
              <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white/60 rotate-45 mb-1.5 translate-y-[2px]" />
              <span>{isCoverSheet ? 'Swipe up to close' : 'Swipe up to unlock'}</span>
            </motion.div>
          )}

        </div>
      </motion.div>

      {/* DETAILED ACCENT DRAWER FOR LOCK SCREEN EDIT OPTIONS (iOS 26 Style Canvas Config) */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute bottom-0 inset-x-0 h-[48%] rounded-t-[34px] border-t border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto shadow-[0_-15px_45px_rgba(0,0,0,0.8)]"
            style={{
              background: 'linear-gradient(180deg, rgba(20,20,22,0.92) 0%, rgba(10,10,12,0.98) 100%)',
              backdropFilter: 'blur(35px) saturate(180%)',
            }}
          >
            {/* Custom Header with Dynamic trigger info */}
            <div className="flex items-center justify-between shrink-0 border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 text-amber-500">
                <Palette size={16} />
                <span className="text-[11.5px] font-[900] tracking-widest uppercase text-amber-400">
                  Lock Screen Canvas Studio
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-full">
                  iOS 26
                </span>
              </div>
              
              {/* Done / Commit Button */}
              <button
                onClick={() => setIsEditing(false)}
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-black font-[900] text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-full transition-all"
              >
                Done
              </button>
            </div>

            {/* Scrollable controls configuration list */}
            <div className="flex-1 space-y-4 pr-1">
              
              {/* Type 1: Digital Chrono Font selection */}
              <div>
                <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Type size={11} /> Widget Typography Style
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: 'classic', label: 'Classic' },
                    { id: 'serif', label: 'Serif' },
                    { id: 'rounded', label: 'Rounded' },
                    { id: 'mono', label: 'Monocode' },
                    { id: 'space', label: 'Space' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setClockFont(f.id as 'classic' | 'serif' | 'rounded' | 'mono' | 'space')}
                      className={`py-2 rounded-xl text-[11px] font-bold transition-all border ${
                        clockFont === f.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                          : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type 2: Chrono Accent Color Picker circles */}
              <div>
                <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Palette size={11} /> Chrono Accent Palette
                </span>
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {[
                    { hex: '#ff9500', name: 'Amber' },
                    { hex: '#ff453a', name: 'Crimson' },
                    { hex: '#30d158', name: 'Emerald' },
                    { hex: '#af52de', name: 'Lavender' },
                    { hex: '#0a84ff', name: 'Electric' },
                    { hex: '#ffd60a', name: 'Gold' },
                    { hex: '#ff2d55', name: 'Pink' },
                    { hex: '#ffffff', name: 'Pure White' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setClockColor(c.hex)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/10 hover:scale-110 active:scale-90 transition-all shrink-0"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {clockColor === c.hex && (
                        <Check size={14} className={c.hex === '#ffffff' ? 'text-black' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type 3: Wallpaper Variant Gradients */}
              <div>
                <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block mb-2">
                  Wallpaper Chromatic Gradients
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: 'standard', name: 'Standard' },
                    { id: 'cosmic', name: 'Cosmic' },
                    { id: 'neon', name: 'Cyber' },
                    { id: 'sunset', name: 'Sunset' },
                    { id: 'aurora', name: 'Aurora' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setWallpaperType(w.id as 'standard' | 'cosmic' | 'neon' | 'sunset' | 'aurora')}
                      className={`py-2 rounded-xl text-[10.5px] font-bold transition-all border ${
                        wallpaperType === w.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                          : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type 4: Toggle fist wraps / accessories rendering overlays and Choose Widget slots */}
              <div className="flex gap-4 border-t border-white/5 pt-3">
                <div className="w-1/2">
                  <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block mb-2">
                    Drawing overlay
                  </span>
                  <button
                    onClick={() => setShowWrapsOverlay(!showWrapsOverlay)}
                    className={`w-full py-2 px-3 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-between gap-2 ${
                      showWrapsOverlay
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-zinc-900/50 border-white/5 text-zinc-500'
                    }`}
                  >
                    <span>Fist Wraps Sketch</span>
                    <input
                      type="checkbox"
                      checked={showWrapsOverlay}
                      onChange={() => {}}
                      className="accent-amber-500 cursor-pointer"
                      title="Checkbox dynamic wraps"
                    />
                  </button>
                </div>

                <div className="w-1/2">
                  <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block mb-2 flex items-center gap-1">
                    <CheckSquare size={11} /> Widget Slots Layout
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {['pray', 'study', 'train', 'eat', 'sleep', 'repeat'].map((w) => (
                      <button
                        key={w}
                        onClick={() => toggleWidget(w)}
                        className={`px-2 py-1 rounded-md text-[9.5px] font-bold uppercase transition-all border ${
                          enabledWidgets.includes(w)
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-black/45 border-white/5 text-zinc-600'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="text-[9px] text-zinc-500 text-center uppercase tracking-widest shrink-0 mt-2 border-t border-white/5 pt-2 font-bold">
              Long-press the wallpaper at any time to configure locks
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
