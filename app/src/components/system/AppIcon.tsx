import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useStore } from '@/store/useStore';
import {
  Compass, MessageCircle, Video, Image, Camera, Mail,
  MapPin, Clock, CloudSun, Home, FileText, BarChart3,
  CheckCircle2, Calendar, Tv, Mic, BookOpen, ShoppingBag,
  CreditCard, Heart, Settings, Folder, Radar, Lightbulb,
  Users, Calculator, Ruler, Languages, Phone, Music,
} from 'lucide-react';
import type { AppDefinition } from '@/types';
import LgCalendar from './liquid-glass/calendar';
import LgClock from './liquid-glass/clock';
import LgComboChart from './liquid-glass/combo-chart';
import LgContacts from './liquid-glass/contacts';
import LgDocument from './liquid-glass/document';
import LgEmail from './liquid-glass/email';
import LgFile from './liquid-glass/file';
import LgHome from './liquid-glass/home';
import LgIdea from './liquid-glass/idea';
import LgMarker from './liquid-glass/marker';
import LgMusic from './liquid-glass/music';
import LgOpenedFolder from './liquid-glass/opened-folder';
import LgPhone from './liquid-glass/phone';
import LgPicture from './liquid-glass/picture';
import LgSettings from './liquid-glass/settings';
import LgSpeechBubble from './liquid-glass/speech-bubble';
import LgSun from './liquid-glass/sun';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  compass: Compass,
  'message-circle': LgSpeechBubble,
  video: Video,
  image: LgPicture,
  camera: Camera,
  mail: LgEmail,
  'map-pin': LgMarker,
  clock: LgClock,
  'cloud-sun': LgSun,
  home: LgHome,
  'file-text': LgDocument,
  'bar-chart-3': LgComboChart,
  'check-circle-2': CheckCircle2,
  calendar: LgCalendar,
  tv: Tv,
  mic: Mic,
  'book-open': LgFile,
  'shopping-bag': ShoppingBag,
  'credit-card': CreditCard,
  heart: Heart,
  settings: LgSettings,
  folder: LgOpenedFolder,
  radar: Radar,
  lightbulb: LgIdea,
  users: LgContacts,
  calculator: Calculator,
  ruler: Ruler,
  languages: Languages,
  phone: LgPhone,
  music: LgMusic,
};

interface AppIconProps {
  app: AppDefinition;
  onClick?: () => void;
  size?: 'normal' | 'small';
  showLabel?: boolean;
}

export default function AppIcon({ app, onClick, size = 'normal', showLabel = true }: AppIconProps) {
  const IconComponent = ICON_MAP[app.icon] || Compass;
  const iconSize = size === 'normal' ? 27 : 20;
  const containerSize = size === 'normal' ? 54 : 44;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const screenEl = buttonRef.current.closest('.relative.w-full.h-full.overflow-hidden') || document.body;
      const screenRect = screenEl.getBoundingClientRect();
      
      const x = (rect.left + rect.width / 2) - screenRect.left;
      const y = (rect.top + rect.height / 2) - screenRect.top;
      
      useStore.getState().setActiveIconOrigin({ x, y });
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="flex flex-col items-center gap-0.5 relative justify-center outline-none select-none transition-transform"
    >
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          borderRadius: '26%',
          background: `linear-gradient(145deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, transparent 42%), linear-gradient(145deg, ${app.color} 0%, rgba(255,255,255,0.08) 52%, rgba(0,0,0,0.20) 100%)`,
          boxShadow: '0 8px 18px rgba(0,0,0,0.28), inset 0 1.5px 1px rgba(255,255,255,0.62), inset 0 -1px 2px rgba(0,0,0,0.22)',
          border: '1px solid rgba(255,255,255,0.34)',
          backdropFilter: 'blur(10px) saturate(1.25)',
          WebkitBackdropFilter: 'blur(10px) saturate(1.25)',
        }}
      >
        {/* Shimmer overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-45 bg-gradient-to-br from-white/45 via-white/8 to-transparent"
          style={{ mixBlendMode: 'overlay' }}
        />
        <div 
          className="absolute -top-[62%] -left-[58%] w-[120%] h-[105%] rounded-full bg-gradient-to-b from-white/28 via-white/6 to-transparent pointer-events-none"
          style={{ transform: 'rotate(-45deg)' }}
        />

        <IconComponent size={iconSize} color="white" strokeWidth={2.05} className="relative z-10 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
        
        {app.badge && (
          <div
            className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-[#ff375f] flex items-center justify-center border border-white/80"
            style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.32), inset 0 1px 1px rgba(255,255,255,0.45)' }}
          >
            <span className="text-[9px] font-bold text-white px-0.5 leading-none">{app.badge}</span>
          </div>
        )}
      </div>
      {showLabel && (
        <span
          className="text-[10px] font-semibold text-center leading-tight tracking-[0.01em]"
          style={{
            color: '#f3f4f6',
            textShadow: '0 1px 3px rgba(0,0,0,0.6)',
            maxWidth: `${containerSize + 12}px`,
          }}
        >
          {app.name === 'AppStore' ? 'App Store' : app.name === 'FindMy' ? 'Find My' : app.name === 'VoiceMemos' ? 'Voice Memos' : app.name}
        </span>
      )}
    </motion.button>
  );
}
