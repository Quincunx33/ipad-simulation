import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Palette, Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import BootSequence from './BootSequence';
import LockScreen from './LockScreen';
import HomeScreen from './HomeScreen';
import ControlCenter from '../system/ControlCenter';
import AppSwitcher from '../system/AppSwitcher';
import SafariApp from '../apps/SafariApp';
import SettingsApp from '../apps/SettingsApp';
import PhotosApp from '../apps/PhotosApp';
import CameraApp from '../apps/CameraApp';
import MessagesApp from '../apps/MessagesApp';
import MapsApp from '../apps/MapsApp';
import WeatherApp from '../apps/WeatherApp';
import MusicApp from '../apps/MusicApp';
import NotesApp from '../apps/NotesApp';
import FilesApp from '../apps/FilesApp';
import CalculatorApp from '../apps/CalculatorApp';
import ClockApp from '../apps/ClockApp';
import AppStoreApp from '../apps/AppStoreApp';
import RepairSimulator from '../apps/RepairSimulator';
import PlaceholderApp from '../apps/PlaceholderApp';
import DisplayEffects from '../system/DisplayEffects';

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  Safari: SafariApp,
  Settings: SettingsApp,
  Photos: PhotosApp,
  Camera: CameraApp,
  Messages: MessagesApp,
  Maps: MapsApp,
  Weather: WeatherApp,
  Music: MusicApp,
  Notes: NotesApp,
  Files: FilesApp,
  Calculator: CalculatorApp,
  Clock: ClockApp,
  AppStore: AppStoreApp,
  Repair: RepairSimulator,
  FaceTime: PlaceholderApp,
  Mail: PlaceholderApp,
  Home: PlaceholderApp,
  Stocks: PlaceholderApp,
  Reminders: PlaceholderApp,
  Calendar: PlaceholderApp,
  TV: PlaceholderApp,
  Podcasts: PlaceholderApp,
  Books: PlaceholderApp,
  Wallet: PlaceholderApp,
  Health: PlaceholderApp,
  FindMy: PlaceholderApp,
  Tips: PlaceholderApp,
  Contacts: PlaceholderApp,
  VoiceMemos: PlaceholderApp,
  Compass: PlaceholderApp,
  Measure: PlaceholderApp,
  Translate: PlaceholderApp,
};

interface DeviceColorTheme {
  name: string;
  banglaName: string;
  bezelBg: string;
  gasketColor: string;
  bodyBg: string;
  chamferHighlight: string;
  touchIdRing: string;
  buttonBg: string;
  homeButtonBg: string;
  innerBezelBorder: string;
  faceCameraBorder: string;
}

const COLOR_THEMES: Record<string, DeviceColorTheme> = {
  silver: {
    name: 'Silver',
    banglaName: 'Silver',
    bezelBg: '#f8f8fb',
    gasketColor: '#c9c9d0',
    bodyBg: 'linear-gradient(135deg, #ffffff 0%, #e8e8ed 42%, #b8b8c0 100%)',
    chamferHighlight: 'rgba(255, 255, 255, 0.98)',
    touchIdRing: '#9b9ba3',
    buttonBg: '#8f8f98',
    homeButtonBg: 'linear-gradient(180deg, #ffffff 0%, #e9e9ee 100%)',
    innerBezelBorder: 'rgba(40, 40, 48, 0.22)',
    faceCameraBorder: '#aeb0b8',
  },
  spaceGray: {
    name: 'Space Gray',
    banglaName: 'Space Gray',
    bezelBg: '#08080a',
    gasketColor: '#242426',
    bodyBg: 'linear-gradient(135deg, #3e3e40 0%, #29292b 50%, #151516 100%)',
    chamferHighlight: 'rgba(255, 255, 255, 0.22)',
    touchIdRing: '#5a5a5d',
    buttonBg: '#323234',
    homeButtonBg: 'linear-gradient(180deg, #101012 0%, #08080a 100%)',
    innerBezelBorder: 'rgba(255, 255, 255, 0.12)',
    faceCameraBorder: '#3e3e40',
  },
  gold: {
    name: 'Gold',
    banglaName: 'Gold',
    bezelBg: '#ffffff',
    gasketColor: '#fae2d4',
    bodyBg: 'linear-gradient(135deg, #fae2d4 0%, #f3c2a4 50%, #d89675 100%)',
    chamferHighlight: 'rgba(255, 245, 240, 0.95)',
    touchIdRing: '#db956f',
    buttonBg: '#d6a385',
    homeButtonBg: 'linear-gradient(180deg, #ffffff 0%, #fffdfc 100%)',
    innerBezelBorder: 'rgba(0, 0, 0, 0.06)',
    faceCameraBorder: '#dfab8f',
  }
};

export default function IPadFrame() {
  const bootStage = useStore((s) => s.bootStage);
  const currentApp = useStore((s) => s.currentApp);
  const controlCenterOpen = useStore((s) => s.controlCenterOpen);
  const notificationCenterOpen = useStore((s) => s.notificationCenterOpen);
  const appSwitcherOpen = useStore((s) => s.appSwitcherOpen);
  const isRepairMode = useStore((s) => s.isRepairMode);
  const lock = useStore((s) => s.lock);
  const goHome = useStore((s) => s.goHome);
  const openAppSwitcher = useStore((s) => s.openAppSwitcher);
  const toggleControlCenter = useStore((s) => s.toggleControlCenter);
  const setNotificationCenterOpen = useStore((s) => s.setNotificationCenterOpen);
  const setControlCenterOpen = useStore((s) => s.setControlCenterOpen);
  const setCurrentTime = useStore((s) => s.setCurrentTime);
  const brightness = useStore((s) => s.brightness);
  const activeIconOrigin = useStore((s) => s.activeIconOrigin);
  const volume = useStore((s) => s.volume);
  const setVolume = useStore((s) => s.setVolume);

  // Device customization states
  const [deviceColor, setDeviceColor] = useState<'silver' | 'spaceGray' | 'gold'>('spaceGray');
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [screenGlare, setScreenGlare] = useState(true);
  
  // 3D Parallax Tilt states
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reflectionOffset, setReflectionOffset] = useState({ x: 0, y: 0 });

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const screenRef = useRef<HTMLDivElement>(null);

  // Time updater
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    
    // If the user is active (dragging, drawing, or swiping), freeze the tilt to prevent erratic movement
    if (e.buttons > 0) {
      setRotation({ x: 0, y: 0 });
      setReflectionOffset({ x: 0, y: 0 });
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Elegant, premium 2.5 degrees tilt for perfect high-end feel without jittering click targets
    const factorX = -(y / (rect.height / 2)) * 2.5;
    const factorY = (x / (rect.width / 2)) * 2.5;
    setRotation({ x: factorX, y: factorY });
    setIsHovered(true);

    // Dynamic glass glare offset
    const glareX = (x / (rect.width / 2)) * 20;
    const glareY = (y / (rect.height / 2)) * 20;
    setReflectionOffset({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
    setReflectionOffset({ x: 0, y: 0 });
  };

  // Touch gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    // Turn off tilt movement instantly on touch to guarantee fluid application interaction
    setRotation({ x: 0, y: 0 });
    setReflectionOffset({ x: 0, y: 0 });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const startY = touchStartY.current;
    const startX = touchStartX.current;

    const screenEl = screenRef.current;
    if (!screenEl) return;
    const rect = screenEl.getBoundingClientRect();
    const relX = startX - rect.left;
    const relY = startY - rect.top;

    // Bottom edge swipe up - go home
    if (deltaY < -80 && relY > rect.height - 30) {
      if (appSwitcherOpen) {
        goHome();
      } else if (currentApp) {
        goHome();
      }
    }
    // Top-right swipe down - Control Center
    else if (deltaY > 60 && relX > rect.width * 0.6 && relY < 40) {
      toggleControlCenter();
    }
    // Top-left swipe down - Notification Center
    else if (deltaY > 60 && relX < rect.width * 0.4 && relY < 40) {
      setNotificationCenterOpen(true);
    }
    // Bottom double area swipe up - app switcher
    else if (deltaY < -120 && relY > rect.height - 80 && currentApp) {
      openAppSwitcher();
    }
    // Swipe up to close notification center
    else if (deltaY < -40 && notificationCenterOpen) {
      setNotificationCenterOpen(false);
    }
    // Swipe up to close control center
    else if (deltaY < -40 && controlCenterOpen) {
      setControlCenterOpen(false);
    }
  }, [currentApp, appSwitcherOpen, notificationCenterOpen, controlCenterOpen, goHome, toggleControlCenter, setNotificationCenterOpen, setControlCenterOpen, openAppSwitcher]);

  // Mouse gesture simulation
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartY.current = e.clientY;
    touchStartX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    const deltaY = e.clientY - touchStartY.current;
    const startY = touchStartY.current;
    const startX = touchStartX.current;

    const screenEl = screenRef.current;
    if (!screenEl) return;
    const rect = screenEl.getBoundingClientRect();
    const relX = startX - rect.left;
    const relY = startY - rect.top;

    if (deltaY < -60 && relY > rect.height - 30) {
      if (currentApp) goHome();
    } else if (deltaY > 50 && relX > rect.width * 0.6 && relY < 40) {
      toggleControlCenter();
    } else if (deltaY > 50 && relX < rect.width * 0.4 && relY < 40) {
      setNotificationCenterOpen(true);
    } else if (deltaY < -40 && controlCenterOpen) {
      setControlCenterOpen(false);
    } else if (deltaY < -40 && notificationCenterOpen) {
      setNotificationCenterOpen(false);
    } else if (deltaY < -100 && relY > rect.height - 80 && currentApp) {
      openAppSwitcher();
    }
  }, [currentApp, controlCenterOpen, notificationCenterOpen, goHome, toggleControlCenter, setNotificationCenterOpen, setControlCenterOpen, openAppSwitcher]);

  // Home button handler
  const handleHomeButton = useCallback(() => {
    if (bootStage === 'lockscreen') {
      useStore.getState().unlock();
    } else if (appSwitcherOpen) {
      goHome();
    } else if (currentApp) {
      goHome();
    }
  }, [bootStage, appSwitcherOpen, currentApp, goHome]);

  // Double click home button for app switcher
  const homeClickCount = useRef(0);
  const handleHomeButtonClick = useCallback(() => {
    homeClickCount.current += 1;
    if (homeClickCount.current === 1) {
      setTimeout(() => {
        if (homeClickCount.current === 1) {
          handleHomeButton();
        } else {
          openAppSwitcher();
        }
        homeClickCount.current = 0;
      }, 300);
    }
  }, [handleHomeButton, openAppSwitcher]);

  // Power button handler
  const handlePowerButton = useCallback(() => {
    if (bootStage !== 'off') {
      lock();
    }
  }, [bootStage, lock]);

  const CurrentAppComponent = currentApp && APP_COMPONENTS[currentApp.replace(/\s/g, '')] ? APP_COMPONENTS[currentApp.replace(/\s/g, '')] : null;
  const theme = COLOR_THEMES[deviceColor];

  return (
    <div className="flex xl:flex-row flex-col items-center justify-start xl:justify-center w-full min-h-[100dvh] overflow-x-hidden overflow-y-auto pb-28 xl:pb-4 p-2 lg:p-4"
      style={{ background: 'linear-gradient(180deg, #0d0f1a 0%, #171d37 50%, #2d1e3d 100%)' }}>

      {/* Main iPad Arena */}
      <div 
        className="flex-1 flex items-center justify-center relative select-none w-full min-h-[calc(100dvh-112px)] xl:min-h-0 xl:h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* iPad Device Container */}
        <div className="relative hover:cursor-grab active:cursor-grabbing transition-transform duration-300" style={{ perspective: '2000px' }}>
          
          {/* iPad Aluminum Body */}
          <motion.div
            className="relative flex items-center justify-center transition-shadow duration-300 h-[68dvh] sm:h-[78vh] xl:h-[min(96vh,860px)] max-w-[calc(100vw-24px)]"
            style={{
              width: 'auto',
              aspectRatio: '134.8/203.2',
              background: theme.bodyBg,
              borderRadius: '26px',
              padding: '6px',
              boxShadow: isHovered
                ? `0 35px 100px rgba(0,0,0,0.62), 0 0 0 1px rgba(20,20,28,0.48), inset 0 0 0 1px ${theme.chamferHighlight}`
                : `0 20px 70px rgba(0,0,0,0.58), 0 0 0 1px rgba(20,20,28,0.42), inset 0 0 0 1px ${theme.chamferHighlight}`,
            }}
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.6 }}
          >
            {/* PHYSICAL DETAIL: 3.5mm Headphone Jack (Top Left) */}
            <div
              className="absolute"
              style={{
                top: '-3px',
                left: '35px',
                width: '8px',
                height: '4px',
                background: '#151515',
                borderRadius: '2px 2px 0 0',
                border: '0.5px solid rgba(0,0,0,0.4)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.8)'
              }}
              title="3.5mm Headphone Jack"
            />

            {/* PHYSICAL DETAIL: Dual Microphones (Top Center) */}
            <div className="absolute flex gap-[3px]" style={{ top: '-1.5px', left: '50%', transform: 'translateX(-50%)' }}>
              <div className="w-[1.2px] h-[1.5px] bg-[#111] rounded-full border-[0.2px] border-white/10" />
              <div className="w-[1.2px] h-[1.5px] bg-[#111] rounded-full border-[0.2px] border-white/10" />
            </div>

            {/* PHYSICAL DETAIL: Power Button (Top Right) */}
            <button
              onClick={handlePowerButton}
              className="absolute z-[80] hover:brightness-110 active:scale-95 transition-all"
              style={{
                top: '-9px',
                right: '42px',
                width: '44px',
                height: '14px',
                padding: 0,
                background: theme.buttonBg,
                border: '1px solid rgba(0,0,0,0.25)',
                borderRadius: '5px 5px 2px 2px',
                cursor: 'pointer',
              }}
              title="Power Button"
            />

            {/* PHYSICAL DETAIL: Volume Buttons (Right Side near Top - iPad mini 5 exact layout) */}
            <div className="absolute z-[80] flex flex-col gap-[4px]" style={{ right: '-10px', top: '58px' }}>
              <button
                onClick={() => setVolume(Math.min(1, volume + 0.1))}
                style={{ width: '14px', height: '30px', padding: 0, background: theme.buttonBg, border: '1px solid rgba(0,0,0,0.25)', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}
                title="Volume Up"
                className="hover:brightness-110 active:scale-95 transition-all"
              />
              <button
                onClick={() => setVolume(Math.max(0, volume - 0.1))}
                style={{ width: '14px', height: '30px', padding: 0, background: theme.buttonBg, border: '1px solid rgba(0,0,0,0.25)', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}
                title="Volume Down"
                className="hover:brightness-110 active:scale-95 transition-all"
              />
            </div>

            {/* PHYSICAL DETAIL: Lightning Port (Bottom Center) */}
            <div
              className="absolute"
              style={{
                bottom: '-2.5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '26px',
                height: '3px',
                background: 'linear-gradient(180deg, #222 0%, #0d0d0d 100%)',
                borderRadius: '0 0 1.5px 1.5px',
                border: '1px solid #77777c',
                borderTop: 'none',
                boxShadow: 'inset 0 -1px 1.5px rgba(0,0,0,0.7)',
              }}
              title="Lightning Port"
            />

            {/* PHYSICAL DETAIL: Stereo Dual Speaker Grills (Bottom Edge) */}
            <div className="absolute flex gap-[1.5px]" style={{ bottom: '-0.5px', left: 'calc(50% - 35px)' }}>
              {[...Array(6)].map((_, i) => (
                <div key={`sp-l-${i}`} className="w-[1.2px] h-[1.2px] rounded-full bg-[#1c1c1e]" />
              ))}
            </div>
            <div className="absolute flex gap-[1.5px]" style={{ bottom: '-0.5px', right: 'calc(50% - 35px)' }}>
              {[...Array(6)].map((_, i) => (
                <div key={`sp-r-${i}`} className="w-[1.2px] h-[1.2px] rounded-full bg-[#1c1c1e]" />
              ))}
            </div>

            {/* iPad Glass Bezel Front Plate */}
            <div
              className="relative w-full h-full flex flex-col justify-between"
              style={{
background: theme.bezelBg,
                 borderRadius: '22px',
                padding: '48px 10px',
                boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2), 0 0.5px 1px rgba(255,255,255,0.4)',
                border: `0.5px solid ${theme.innerBezelBorder}`,
              }}
            >
              {/* Top Bezel Items: Front Camera & Ambient Light Sensor */}
              <div className="absolute top-[16px] left-[50%] -translate-x-[50%] flex items-center justify-center gap-4 w-full h-4 pointer-events-none">
                
                {/* Light Sensor Dot */}
                <div
                  style={{
                    width: '3.5px',
                    height: '3.5px',
                    borderRadius: '50%',
                    background: '#1a2233',
                    opacity: 0.55,
                  }}
                  title="Ambient Light Sensor"
                />

                {/* FaceTime HD Camera Lens with realistic reflections */}
                <div
                  style={{
                    width: '6.5px',
                    height: '6.5px',
                    borderRadius: '50%',
                    background: '#040b15',
                    border: `1.2px solid ${theme.faceCameraBorder}`,
                    boxShadow: 'inset 0 0.5px 2px rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="FaceTime Camera"
                >
                  {/* Cyan-blue lens flare element */}
                  <div className="w-[1.8px] h-[1.8px] rounded-full bg-[#00ddff]/70" style={{ transform: 'translate(0.5px, -0.5px)' }} />
                </div>

                <div className="w-[3.5px]" /> {/* Spacer matching alignment */}
              </div>

              {/* Screen Display Area */}
              <div
                ref={screenRef}
                className="relative w-full h-full overflow-hidden"
                style={{
                  background: '#000000',
                  borderRadius: '6px',
                  touchAction: 'none',
                  userSelect: 'none',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1), inset 0 2px 4px rgba(0,0,0,0.4)',
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                {/* Screen content */}
                <div className="absolute inset-0">
                  <AnimatePresence>
                    {bootStage === 'booting' && <BootSequence key="boot" />}
                  </AnimatePresence>

                  {bootStage !== 'booting' && !isRepairMode && (
                    <div className="absolute inset-0">
                      <HomeScreen />
                    </div>
                  )}

                  <AnimatePresence>
                    {bootStage === 'lockscreen' && <LockScreen key="lockscreen" />}
                  </AnimatePresence>

                  {/* App overlay */}
                  <AnimatePresence>
                    {currentApp && bootStage === 'app' && !isRepairMode && CurrentAppComponent && (
                      <motion.div
                        key={`app-${currentApp}`}
                        initial={{ opacity: 0, scale: 0.08, borderRadius: '22%' }}
                        animate={{ opacity: 1, scale: 1, borderRadius: '0%' }}
                        exit={{ opacity: 0, scale: 0.08, borderRadius: '22%' }}
                        transition={{ type: 'spring', stiffness: 330, damping: 27, mass: 0.85 }}
                        style={{
                          transformOrigin: activeIconOrigin ? `${activeIconOrigin.x}px ${activeIconOrigin.y}px` : 'center',
                        }}
                        className="absolute inset-0 z-20 overflow-hidden"
                      >
                        <CurrentAppComponent />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Repair Mode */}
                  <AnimatePresence>
                    {isRepairMode && (
                      <motion.div
                        key="repair"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30"
                      >
                        <RepairSimulator />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Control Center */}
                  <AnimatePresence>
                    {controlCenterOpen && <ControlCenter />}
                  </AnimatePresence>

                  {/* Notification Center */}
                  <AnimatePresence>
                    {notificationCenterOpen && <LockScreen key="coversheet" />}
                  </AnimatePresence>

                  {/* App Switcher */}
                  <AnimatePresence>
                    {appSwitcherOpen && <AppSwitcher />}
                  </AnimatePresence>

                  {/* Display Effects (True Tone, Night Shift, Brightness) */}
                  <DisplayEffects />

                  {/* Dynamic Interactive Glass Reflection Overlay */}
                  {screenGlare && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-transform duration-200"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.065) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                        transform: `translate(${reflectionOffset.x}px, ${reflectionOffset.y}px) scale(1.04)`,
                        zIndex: 1000,
                      }}
                    />
                  )}
                </div>

                {/* Brightness overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `rgba(0,0,0,${Math.max(0, 1 - brightness)})`,
                    zIndex: 997,
                  }}
                />
              </div>

              {/* Bottom Bezel Touch ID Home Button (Recessed with physical steel ring) */}
              <button
                onClick={handleHomeButtonClick}
                className="absolute active:scale-90 transition-all duration-100 group"
                style={{
                  bottom: '8px',
                  zIndex: 40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme.bezelBg === '#ffffff' ? '#ffffff' : '#0e0e11',
                  border: `1.5px solid ${theme.touchIdRing}`,
                  boxShadow: 'inset 0 1.5px 3.5px rgba(0,0,0,0.1), 0 0.5px 1px rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Home Button with Touch ID"
              >
                {/* Concentric inner glass circle */}
                <div 
                  className="w-[24px] h-[24px] rounded-full transition-colors duration-150 group-hover:bg-[#fafafa]/30 dark:group-hover:bg-[#1a1a1f]"
                  style={{
                    background: theme.homeButtonBg,
                  }}
                />
              </button>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Physical Device Controller Sidebar - Only visible on desktop/wide viewports */}
      <div 
        id="ipad-sidebar-controls"
        className="w-[280px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col justify-between text-white z-50 pointer-events-auto shadow-2xl overflow-y-auto max-xl:hidden h-[min(92vh,720px)] ml-3"
      >
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5 pb-3.5 border-b border-white/10">
            <div className="p-2 bg-[#007aff]/15 rounded-lg border border-[#007aff]/30">
              <Palette className="w-4 h-4 text-[#007aff]" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">iPad Body Customization</h2>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">iPad mini 5 Frame Tuning</p>
            </div>
          </div>

          {/* Color Finish Grid */}
          <div className="space-y-3 mb-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/45 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> Metal Finish (Body Color)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(['silver', 'spaceGray', 'gold'] as const).map((col) => {
                const isActive = deviceColor === col;
                return (
                  <button
                    key={col}
                    onClick={() => setDeviceColor(col)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                      isActive 
                        ? 'bg-white/10 border-[#007aff] shadow-[0_0_10px_rgba(0,122,255,0.35)] font-semibold' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full border border-white/20 mb-1.5 shadow-inner" 
                      style={{ 
                        background: col === 'silver' 
                          ? 'linear-gradient(135deg, #f2f2f7 0%, #b5b5ba 100%)' 
                          : col === 'spaceGray' 
                          ? 'linear-gradient(135deg, #3a3a3c 0%, #151516 100%)' 
                          : 'linear-gradient(135deg, #fae2d4 0%, #d89675 100%)' 
                      }} 
                    />
                    <span className="text-[10px] text-white/90">{col === 'silver' ? 'Silver' : col === 'spaceGray' ? 'Space Gray' : 'Gold'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Realistic Graphic Effects */}
          <div className="space-y-3 mb-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/45 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 3D Rendering Effects
            </h3>
            
            {/* Tilt Engine Switch */}
            <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-medium">Parallax Tilt (3D Parallax)</span>
                <span className="text-[9px] text-white/40">Device tilts with the mouse angle</span>
              </div>
              <button
                onClick={() => setTiltEnabled(!tiltEnabled)}
                className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${tiltEnabled ? 'bg-[#34c759]' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${tiltEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Reflection Shine Switch */}
            <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-medium">Glass Glare (Screen Glare)</span>
                <span className="text-[9px] text-white/40">Realistic light reflection</span>
              </div>
              <button
                onClick={() => setScreenGlare(!screenGlare)}
                className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${screenGlare ? 'bg-[#34c759]' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${screenGlare ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Interactive Hardware Buttons */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/45 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Hardware Controls
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleHomeButtonClick}
                className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl transition-all text-[11px] font-medium"
              >
                <div className="w-3.5 h-3.5 rounded-full border border-white/30 flex items-center justify-center text-[7px]" />
                <span>Home Button Click</span>
              </button>

              <button
                onClick={handlePowerButton}
                className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl transition-all text-[11px] font-medium"
              >
                <div className="w-3 h-1 bg-white/50 rounded-full" />
                <span>Lock / Unlock</span>
              </button>

              <button
                onClick={() => setVolume(Math.min(1, volume + 0.1))}
                className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl transition-all text-[11px] font-medium"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#34c759]" />
                <span>Volume Up</span>
              </button>

              <button
                onClick={() => setVolume(Math.max(0, volume - 0.1))}
                className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl transition-all text-[11px] font-medium"
              >
                <Volume2 className="w-3.5 h-3.5 text-white/30" />
                <span>Volume Down</span>
              </button>
            </div>
          </div>
        </div>

        {/* Device Specifications Footer */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-1 text-[10px] text-white/45 leading-normal">
          <div className="flex justify-between">
            <span>Model:</span> <span className="text-white/80 font-medium">iPad mini (5th Gen, 2019)</span>
          </div>
          <div className="flex justify-between">
            <span>Chip:</span> <span className="text-white/80 font-medium">A12 Bionic with Neural Engine</span>
          </div>
          <div className="flex justify-between">
            <span>Display:</span> <span className="text-white/80 font-medium">7.9" Retina True Tone</span>
          </div>
        </div>
      </div>

      {/* Mobile control sheet: compact phone-first controls */}
      <div className="absolute inset-x-3 bottom-3 xl:hidden z-50 rounded-2xl border border-white/10 bg-[#0b0d16]/90 p-3 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wide">iPad mini 5 Controls</p>
            <p className="text-[9px] text-white/45">Mobile preview mode</p>
          </div>
          <button
            onClick={() => {
              const colors: ('silver' | 'spaceGray' | 'gold')[] = ['silver', 'spaceGray', 'gold'];
              const nextIdx = (colors.indexOf(deviceColor) + 1) % colors.length;
              setDeviceColor(colors[nextIdx]);
            }}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-semibold"
          >
            <Palette className="mr-1 inline h-3 w-3 text-[#ff9500]" />
            {deviceColor === 'silver' ? 'Silver' : deviceColor === 'spaceGray' ? 'Space Gray' : 'Gold'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => setTiltEnabled(!tiltEnabled)} className={`rounded-xl border border-white/10 px-2 py-2 text-[9px] ${tiltEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/60'}`}>Tilt</button>
          <button onClick={() => setScreenGlare(!screenGlare)} className={`rounded-xl border border-white/10 px-2 py-2 text-[9px] ${screenGlare ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/60'}`}>Glare</button>
          <button onClick={handleHomeButtonClick} className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-[9px]">Home</button>
          <button onClick={handlePowerButton} className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-[9px]">Lock</button>
        </div>
      </div>

    </div>
  );
}
