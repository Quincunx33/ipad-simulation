import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import {
  Wifi,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Plane,
  Moon,
  Sun,
  Volume2,
  Globe,
  RotateCw,
  Bluetooth,
  BellOff,
  Battery,
  LayoutGrid,
  Video,
  Scan,
  Settings,
  Music,
  Flashlight,
  Lock,
  ChevronDown,
} from 'lucide-react';

// Highly-polished Custom Vertical Slider Component matching iOS 26 precisely
interface VerticalSliderProps {
  value: number;
  onChange: (val: number) => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}

function VerticalSlider({ value, onChange, icon: Icon, label }: VerticalSliderProps) {
  const handleStartOrMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const relativeY = rect.bottom - clientY;
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
    onChange(percentage);
  };

  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 select-none">
      <div
        onMouseDown={(e) => {
          handleStartOrMove(e);
          const onMouseMove = (moveEvent: MouseEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relativeY = rect.bottom - moveEvent.clientY;
            const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
            onChange(percentage);
          };
          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }}
        onTouchStart={(e) => {
          handleStartOrMove(e);
          const onTouchMove = (moveEvent: TouchEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relativeY = rect.bottom - moveEvent.touches[0].clientY;
            const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
            onChange(percentage);
          };
          const onTouchEnd = () => {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
          };
          document.addEventListener('touchmove', onTouchMove);
          document.addEventListener('touchend', onTouchEnd);
        }}
        className="w-[54px] h-[116px] rounded-[24px] bg-[#2c2c2e]/70 border border-white/5 relative overflow-hidden cursor-ns-resize flex flex-col justify-end shadow-inner"
      >
        {/* Fill Indicator */}
        <div
          className="w-full bg-white/90 transition-all duration-75 pointer-events-none"
          style={{ height: `${value * 100}%` }}
        />
        {/* Embossed Icon inside the Cylinder pill */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
          <Icon
            size={18}
            className={`transition-colors drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.5)] ${
              value > 0.45 ? 'text-zinc-900 font-extrabold' : 'text-white'
            }`}
          />
        </div>
      </div>
      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider leading-none">
        {label}
      </span>
    </div>
  );
}

export default function ControlCenter() {
  const controlCenterOpen = useStore((s) => s.controlCenterOpen);
  const setControlCenterOpen = useStore((s) => s.setControlCenterOpen);
  const isAirplaneMode = useStore((s) => s.isAirplaneMode);
  const isWifiOn = useStore((s) => s.isWifiOn);
  const wifiNetwork = useStore((s) => s.wifiNetwork);
  const isBluetoothOn = useStore((s) => s.isBluetoothOn);
  const isDndOn = useStore((s) => s.isDndOn);
  const brightness = useStore((s) => s.brightness);
  const volume = useStore((s) => s.volume);

  const toggleAirplaneMode = useStore((s) => s.toggleAirplaneMode);
  const toggleWifi = useStore((s) => s.toggleWifi);
  const toggleBluetooth = useStore((s) => s.toggleBluetooth);
  const toggleDnd = useStore((s) => s.toggleDnd);
  const setBrightness = useStore((s) => s.setBrightness);
  const setVolume = useStore((s) => s.setVolume);

  // Simulated control states to mirror the screenshot exactly
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotationLock, setRotationLock] = useState(true);
  const [silentMode, setSilentMode] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [screenRecording, setScreenRecording] = useState(false);
  const [vpnActive, setVpnActive] = useState(false);

  if (!controlCenterOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-0 z-50 overflow-hidden"
    >
      {/* Dim overlay with click-to-dismiss */}
      <div
        className="absolute inset-0 bg-black/35"
        style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
        onClick={() => setControlCenterOpen(false)}
      />

      {/* Floating Panel positioned exactly like active top-down card */}
      <motion.div
        initial={{ y: -120, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -120, opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 29 }}
        className="absolute top-3.5 right-3.5 w-[372px] rounded-[32px] p-5 shadow-[0_24px_55px_rgba(0,0,0,0.7)] bg-[#101012]/80 border border-white/10 select-none overflow-hidden"
        style={{
          backdropFilter: 'blur(35px) saturate(210%)',
          WebkitBackdropFilter: 'blur(35px) saturate(210%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP ROW GRID */}
        <div className="grid grid-cols-2 gap-3.5 mb-4">
          {/* Card 1: Wi-Fi CLOUDFLARE in pure executive white style */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleWifi}
            className="rounded-[24px] p-3.5 flex flex-col justify-between items-start cursor-pointer transition-all h-[95px]"
            style={{
              background: isWifiOn ? '#ffffff' : 'rgba(30, 30, 34, 0.65)',
              color: isWifiOn ? '#000000' : '#ffffff',
              boxShadow: isWifiOn ? '0 10px 25px rgba(255,255,255,0.08)' : 'none',
              border: isWifiOn ? 'none' : '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isWifiOn ? 'bg-[#0076ff] text-white' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              <Wifi size={19} className={isWifiOn ? 'animate-pulse' : ''} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-[13px] font-extrabold tracking-tight leading-tight ${isWifiOn ? 'text-black' : 'text-white'}`}>
                Wi-Fi
              </span>
              <span className={`text-[10px] font-semibold truncate tracking-tight ${isWifiOn ? 'text-zinc-600' : 'text-zinc-500'}`}>
                {isWifiOn ? wifiNetwork : 'Disconnected'}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Media Block "Not Playing" */}
          <div
            className="rounded-[24px] p-3 flex flex-col justify-between bg-[#1c1c1e]/75 border border-white/5 h-[95px]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Media placeholder square */}
              <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-white/5 flex items-center justify-center shrink-0">
                <Music size={14} className="text-zinc-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11.5px] font-extrabold text-white leading-tight">
                  Not Playing
                </span>
                <span className="text-[9px] text-zinc-500 font-bold tracking-tight uppercase">
                  AirPlay Audio
                </span>
              </div>
            </div>

            {/* Media Control buttons Row */}
            <div className="flex items-center justify-between px-1">
              <button
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
                onClick={() => setIsPlaying(false)}
                title="Previous"
              >
                <SkipBack size={15} fill="currentColor" />
              </button>
              <button
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5"
                onClick={() => setIsPlaying(!isPlaying)}
                title="Play/Pause"
              >
                {isPlaying ? (
                  <Pause size={13} className="text-white fill-white ml-0" />
                ) : (
                  <Play size={13} className="text-white fill-white ml-0.5" />
                )}
              </button>
              <button
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
                onClick={() => setIsPlaying(false)}
                title="Next"
              >
                <SkipForward size={15} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: SLIDERS & VPN */}
        <div className="grid grid-cols-3 gap-3.5 mb-4">
          {/* Vertical Brightness pill */}
          <VerticalSlider
            value={brightness}
            onChange={setBrightness}
            icon={Sun}
            label="Brightness"
          />

          {/* Vertical Volume pill */}
          <VerticalSlider
            value={volume}
            onChange={setVolume}
            icon={Volume2}
            label="Volume"
          />

          {/* Vertical VPN Block matching screenshot */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVpnActive(!vpnActive)}
            className="rounded-[24px] p-3 flex flex-col justify-between items-start cursor-pointer transition-all h-[116px] border"
            style={{
              background: vpnActive
                ? 'linear-gradient(135deg, rgba(88,86,214,0.3) 0%, rgba(42,40,110,0.4) 100%)'
                : 'rgba(28, 28, 30, 0.65)',
              borderColor: vpnActive ? 'rgba(88,86,214,0.5)' : 'rgba(255,255,255,0.05)',
            }}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                vpnActive ? 'bg-[#5856d6] text-white animate-pulse' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              <Globe size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12.5px] font-bold text-white tracking-tight leading-tight">
                VPN
              </span>
              <span
                className={`text-[9.5px] font-extrabold uppercase tracking-widest leading-none mt-1 ${
                  vpnActive ? 'text-amber-400' : 'text-zinc-500'
                }`}
              >
                {vpnActive ? 'Active' : 'Off'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* MODULAR TOGGLES & CAPSULES */}
        <div className="space-y-3.5 mb-4">
          
          {/* Row 1: Rotation Lock, Focus Capsule, Bluetooth */}
          <div className="flex items-center gap-3">
            {/* Rotation Lock Circle (Pinkish highlighted alert style) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setRotationLock(!rotationLock)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all border outline-none shrink-0"
              style={{
                background: rotationLock ? 'rgba(255, 69, 58, 0.15)' : 'rgba(28, 28, 30, 0.65)',
                borderColor: rotationLock ? 'rgba(255, 69, 58, 0.4)' : 'rgba(255,255,255,0.05)',
                color: rotationLock ? '#ff453a' : '#d1d1d6',
              }}
              title="Rotation Lock"
            >
              <RotateCw size={19} className={rotationLock ? 'rotate-90' : ''} />
            </motion.button>

            {/* Focus capsule selector (Crescent moon icon pill) */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleDnd}
              className="flex-1 h-12 rounded-[24px] px-4 flex items-center justify-between transition-all border outline-none text-left"
              style={{
                background: isDndOn
                  ? 'linear-gradient(135deg, rgba(88,86,214,0.3) 0%, rgba(42,40,110,0.49) 100%)'
                  : 'rgba(28, 28, 30, 0.65)',
                borderColor: isDndOn ? 'rgba(88,86,214,0.5)' : 'rgba(255,255,255,0.05)',
              }}
              title="Focus Mode"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Moon
                  size={17}
                  className={isDndOn ? 'text-[#a2a0ff]' : 'text-zinc-400'}
                  fill={isDndOn ? 'currentColor' : 'none'}
                />
                <span className="text-[12.5px] font-extrabold text-white truncate">
                  {isDndOn ? 'Deep Work' : 'Focus'}
                </span>
              </div>
              <ChevronDown size={14} className="text-zinc-500 shrink-0" />
            </motion.button>

            {/* Bluetooth connection circle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleBluetooth}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all border outline-none shrink-0"
              style={{
                background: isBluetoothOn && !isAirplaneMode ? 'rgba(10, 132, 255, 0.15)' : 'rgba(28, 28, 30, 0.65)',
                borderColor: isBluetoothOn && !isAirplaneMode ? 'rgba(10, 132, 255, 0.4)' : 'rgba(255,255,255,0.05)',
                color: isBluetoothOn && !isAirplaneMode ? '#0a84ff' : '#d1d1d6',
              }}
              title="Bluetooth Connection"
            >
              <Bluetooth size={19} />
            </motion.button>
          </div>

          {/* Row 2: Silent Alarm status, Low Power Mode capsule, Airplane Mode */}
          <div className="flex items-center gap-3">
            {/* Silent Mode Bell slash (Pink style) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setSilentMode(!silentMode)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all border outline-none shrink-0"
              style={{
                background: silentMode ? 'rgba(255, 69, 58, 0.15)' : 'rgba(28, 28, 30, 0.65)',
                borderColor: silentMode ? 'rgba(255, 69, 58, 0.4)' : 'rgba(255,255,255,0.05)',
                color: silentMode ? '#ff453a' : '#d1d1d6',
              }}
              title="Silent Mode Alarm"
            >
              <BellOff size={18} />
            </motion.button>

            {/* Low Power Mode battery pill capsule */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLowPowerMode(!lowPowerMode)}
              className="flex-1 h-12 rounded-[24px] px-4 flex items-center gap-2.5 transition-all border outline-none text-left"
              style={{
                background: lowPowerMode
                  ? 'linear-gradient(135deg, rgba(255,214,10,0.2) 0%, rgba(130,105,4,0.3) 100%)'
                  : 'rgba(28, 28, 30, 0.65)',
                borderColor: lowPowerMode ? 'rgba(255,214,10,0.5)' : 'rgba(255,255,255,0.05)',
              }}
              title="Low Power Mode"
            >
              <Battery
                size={18}
                className={lowPowerMode ? 'text-[#ffd60a]' : 'text-zinc-400'}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-extrabold text-white leading-tight truncate">
                  Low Power Mode
                </span>
                <span className={`text-[9.5px] font-bold leading-none mt-0.5 ${lowPowerMode ? 'text-[#ffd60a]' : 'text-zinc-500'}`}>
                  {lowPowerMode ? 'On' : 'Off'}
                </span>
              </div>
            </motion.button>

            {/* Airplane Mode Circle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleAirplaneMode}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all border outline-none shrink-0"
              style={{
                background: isAirplaneMode ? 'rgba(255, 159, 10, 0.15)' : 'rgba(28, 28, 30, 0.65)',
                borderColor: isAirplaneMode ? 'rgba(255, 159, 10, 0.4)' : 'rgba(255,255,255,0.05)',
                color: isAirplaneMode ? '#ff9f0a' : '#d1d1d6',
              }}
              title="Airplane Mode"
            >
              <Plane size={18} />
            </motion.button>
          </div>

          {/* Row 3: Grid switcher option, Screen Recording Capsule, Scanner QR option */}
          <div className="flex items-center gap-3">
            {/* Grid options circles */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-zinc-800/80 border border-white/5 text-zinc-300 hover:brightness-110 shrink-0"
              onClick={() => {}}
              title="Grid Manager"
            >
              <LayoutGrid size={18} />
            </motion.button>

            {/* Screen Recording target pulse capsule */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setScreenRecording(!screenRecording)}
              className="flex-1 h-12 rounded-[24px] px-4 flex items-center gap-2.5 transition-all border outline-none text-left"
              style={{
                background: screenRecording
                  ? 'linear-gradient(135deg, rgba(48,209,88,0.2) 0%, rgba(18,100,38,0.3) 100%)'
                  : 'rgba(28, 28, 30, 0.65)',
                borderColor: screenRecording ? 'rgba(48,209,88,0.5)' : 'rgba(255,255,255,0.05)',
              }}
              title="Screen Capture Recording"
            >
              <Video
                size={18}
                className={screenRecording ? 'text-[#30d158] animate-pulse' : 'text-zinc-400'}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-extrabold text-white leading-tight truncate">
                  Screen Recording
                </span>
                <span className={`text-[9.5px] font-bold leading-none mt-0.5 ${screenRecording ? 'text-[#30d158]' : 'text-zinc-500'}`}>
                  {screenRecording ? 'Capturing' : 'Standby'}
                </span>
              </div>
            </motion.button>

            {/* Scanner QR Code Circle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-zinc-800/80 border border-white/5 text-zinc-300 hover:brightness-110 shrink-0"
              onClick={() => {}}
              title="Scanner Camera"
            >
              <Scan size={18} />
            </motion.button>
          </div>

        </div>

        {/* BOTTOM ROW: STATIC SYSTEM UTILITIES (Settings, Shazam/Music, Brightness sun, Lock padlock) */}
        <div className="grid grid-cols-4 gap-2 border-t border-white/5 pt-3.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setControlCenterOpen(false);
              useStore.getState().launchApp('Settings');
            }}
            className="h-11 rounded-full flex items-center justify-center bg-zinc-800/80 border border-white/5 text-zinc-400 hover:text-white transition-colors"
            title="Launch Settings"
          >
            <Settings size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {}}
            className="h-11 rounded-full flex items-center justify-center bg-zinc-800/80 border border-white/5 text-zinc-400 hover:text-[#0076ff] transition-colors"
            title="Music Identifier"
          >
            <Music size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {}}
            className="h-11 rounded-full flex items-center justify-center bg-zinc-800/80 border border-white/5 text-zinc-400 hover:text-amber-400 transition-colors"
            title="Flashlight Toggle"
          >
            <Flashlight size={18} />
          </motion.button>

          <button
            className="h-11 rounded-full flex items-center justify-center bg-zinc-800/80 border border-white/5 text-zinc-400 cursor-not-allowed"
            disabled
            title="Security Padlock status"
          >
            <Lock size={17} />
          </button>
        </div>

        {/* Swipe indicator bar at bottom */}
        <div className="w-full flex justify-center pt-4 opacity-30 select-none pointer-events-none">
          <div className="w-10 h-1 rounded-full bg-white" />
        </div>

      </motion.div>
    </motion.div>
  );
}
