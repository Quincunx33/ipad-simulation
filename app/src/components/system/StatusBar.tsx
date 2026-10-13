import { useStore } from '@/store/useStore';

interface StatusBarProps {
  dark?: boolean;
  /** 'relative' lays out the status bar inline and reserves 32px of space (for in-app views). */
  layout?: 'absolute' | 'relative';
}

// Low-power high-fidelity custom SVGs to match the iOS 26 iPad mini 5 screenshot exactly
const WifiIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-[15px] h-[15px] filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)] shrink-0">
    <path d="M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    <path d="M4.8 11.2a1 1 0 0 1 0-1.4 10 10 0 0 1 14.4 0 1 1 0 0 1-1.4 1.4 8 8 0 0 0-11.6 0z" />
    <path d="M1.2 7.6a1 1 0 0 1 0-1.4 15 15 0 0 1 21.6 0 1 1 0 0 1-1.4 1.4 13 13 0 0 0-18.8 0z" />
  </svg>
);

const FocusDndIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="0.5" className="w-[13.5px] h-[13.5px] opacity-90 filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)] shrink-0">
    {/* Dynamic DND Crescent moon matching screenshot focus icon */}
    <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9z" />
  </svg>
);

const LockIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="w-[11.5px] h-[11.5px] filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]">
    <rect x="5" y="11" width="14" height="10" rx="2.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function StatusBar({ dark = false, layout = 'absolute' }: StatusBarProps) {
  const currentTime = useStore((s) => s.currentTime);
  const isWifiOn = useStore((s) => s.isWifiOn);
  const batteryLevel = useStore((s) => s.batteryLevel);
  const isCharging = useStore((s) => s.isCharging);
  const isLocked = useStore((s) => s.isLocked);
  const isDndOn = useStore((s) => s.isDndOn);
  const isAirplaneMode = useStore((s) => s.isAirplaneMode);
  const currentApp = useStore((s) => s.currentApp);

  // Time calculations
  const hours24 = currentTime.getHours();
  const hours = hours24 % 12 || 12;
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  // Decide colors based on theme context (lockscreen uses translucent white, home inside light apps can be dark)
  const textColor = dark ? '#000000' : '#ffffff';
  const roundedPercent = Math.round(batteryLevel * 100);

  // iOS Battery indicator fill styles (green for charging, red for low, white/black normally)
  const getBatteryFillColor = () => {
    if (isCharging) return '#34c759'; // iOS Green
    if (batteryLevel <= 0.20) return '#ff3b30'; // iOS Red
    return textColor;
  };

  return (
    <div
      className={layout === 'relative'
        ? "relative left-0 right-0 flex items-center justify-between px-4 sm:px-6 shrink-0 select-none font-sans"
        : "absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 z-[70] pointer-events-none select-none font-sans"}
      style={{
        height: '32px',
        color: textColor,
      }}
    >
      {/* 1. LEFT CORNER: Displays "iPad" if locked, or "current dynamic time" if unlocked */}
      <div className="min-w-0 flex-1 flex items-center justify-start text-[12px] sm:text-[13px] font-semibold tracking-normal">
        {isLocked ? (
          <span className="filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]">
            iPad
          </span>
        ) : (
          <span className="font-semibold tracking-tight tabular-nums filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]">
            {timeStr}
          </span>
        )}
      </div>

      {/* 2. CENTER LOCK STATUS ICON (Classic Padlock centered at status bar on screen lock) */}
      <div className="flex-1 flex justify-center items-center">
        {isLocked && <LockIcon color={textColor} />}
      </div>

      {/* 3. RIGHT SYSTEM STATUS BAR GROUP (Wifi, Focus, Percentage, Battery Pill) */}
      <div className="min-w-0 flex-1 flex justify-end items-center gap-[5px] sm:gap-[7px] overflow-hidden">
        {/* iOS Green Recording Indicator dot - only appears when camera/mic is actually active */}
        {currentApp === 'Camera' && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-[2px] shadow-[0_0_3px_#34d399] filter drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.4)] shrink-0 animate-pulse" />
        )}

        {/* Airplane Mode status suffix */}
        {isAirplaneMode && (
          <span className="text-[10px] font-bold tracking-tight mr-1 filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]">
            Airplane
          </span>
        )}

        {/* iOS Wi-Fi Indicator waves */}
        {isWifiOn && <WifiIcon color={textColor} />}

        {/* Focus/DND moon badge - only appears when a Focus/DND mode is active */}
        {isDndOn && <FocusDndIcon color={textColor} />}

        {/* Battery Percentage Number + Battery container */}
        <div className="flex items-center gap-[5px] select-none">
          <span className="text-[11px] sm:text-[12.5px] font-bold tracking-tight font-sans tabular-nums filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]">
            {roundedPercent}%
          </span>
          
          {/* Authentic iOS Battery pill body shape */}
          <div
            className="relative w-[21px] h-[10.5px] rounded-[3px] border-[1px] p-[1px] flex items-center justify-start shrink-0 filter drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.2)]"
            style={{ borderColor: textColor }}
          >
            <div
              className="h-full rounded-[1.2px] transition-all duration-300"
              style={{
                width: `${batteryLevel * 100}%`,
                backgroundColor: getBatteryFillColor(),
              }}
            />
            {/* Battery standard capsule tip */}
            <div
              className="absolute -right-[2px] w-[1px] h-[3.8px] rounded-r-[0.8px] opacity-80"
              style={{ backgroundColor: textColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
