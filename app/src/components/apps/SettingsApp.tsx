import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import StatusBar from '@/components/system/StatusBar';
import {
  ChevronLeft, ChevronRight, Wifi, Bluetooth, Signal,
  Plane, Moon, Bell, Speaker, Sun, Moon as MoonIcon,
  RotateCcw, Shield, AppWindow, Lock, Battery, Search, Star,
  CircleUser, Clock, Settings, Monitor, CreditCard, CloudUpload,
  MessageSquare, Music,
} from 'lucide-react';

type SettingsView = 'main' | 'general' | 'software-update' | 'display' | 'wifi' | 'bluetooth' | 'about' | 'battery' | 'sounds' | 'notifications' | 'privacy' | 'repair' | 'apple-id' | 'media-purchases' | 'home-dock' | 'wallpaper';

export default function SettingsApp() {
  const [view, setView] = useState<SettingsView>('main');
  const [prevView, setPrevView] = useState<SettingsView>('main');

  const navigateTo = (newView: SettingsView) => {
    setPrevView(view);
    setView(newView);
  };

  const goBack = () => {
    setView(prevView === view ? 'main' : prevView);
    setPrevView('main');
  };

  return (
    <div className="absolute inset-0 bg-[#f2f2f7] flex flex-col overflow-hidden">
      <div className="shrink-0">
        <StatusBar layout="relative" dark={true} />
      </div>
      <AnimatePresence mode="wait">
        {view === 'main' && <MainSettings key="main" onNavigate={navigateTo} />}
        {view === 'general' && <GeneralSettings key="general" onNavigate={navigateTo} onBack={goBack} />}
        {view === 'software-update' && <SoftwareUpdate key="software-update" onBack={() => navigateTo('general')} />}
        {view === 'display' && <DisplaySettings key="display" onBack={goBack} />}
        {view === 'wifi' && <WifiSettings key="wifi" onBack={goBack} />}
        {view === 'about' && <AboutSettings key="about" onBack={goBack} />}
        {view === 'repair' && <RepairSettings key="repair" onBack={goBack} />}
        {view === 'apple-id' && <AppleIdSettings key="apple-id" onBack={goBack} onNavigate={navigateTo} />}
        {view === 'media-purchases' && <MediaPurchasesSettings key="media-purchases" onBack={() => navigateTo('apple-id')} />}
        {view === 'home-dock' && <HomeDockSettings key="home-dock" onBack={goBack} />}
        {view === 'wallpaper' && <WallpaperSettings key="wallpaper" onBack={goBack} />}
        {view === 'bluetooth' && <BluetoothSettings key="bluetooth" onBack={goBack} />}
        {view === 'notifications' && <NotificationsSettings key="notifications" onBack={goBack} />}
        {view === 'privacy' && <PrivacySettings key="privacy" onBack={goBack} />}
        {view === 'sounds' && <SoundsSettings key="sounds" onBack={goBack} />}
        {view === 'battery' && <BatteryInfoView key="battery" onBack={goBack} />}
      </AnimatePresence>
    </div>
  );
}

function SettingsHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div
      className="relative flex items-center px-4 py-2.5 border-b border-gray-200/50 shrink-0 z-10"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)' }}
    >
      <button onClick={onBack} className="flex items-center gap-0 text-[#007aff] hover:opacity-70 transition-opacity shrink-0">
        <ChevronLeft size={20} />
        <span className="text-[17px]">Back</span>
      </button>
      <span className="absolute left-0 right-0 text-center text-[17px] font-semibold text-black pointer-events-none px-24">
        {title}
      </span>
      <span className="w-[51px] shrink-0" aria-hidden="true" />
    </div>
  );
}

function SettingsSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      {title && (
        <div className="px-4 py-1 text-[13px] text-[#8e8e93] uppercase tracking-wide font-normal">
          {title}
        </div>
      )}
      <div className="mx-4 rounded-[10px] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
}

function SettingsCell({
  icon: Icon,
  iconColor = '#007aff',
  iconBg = '#007aff15',
  label,
  detail,
  onClick,
  toggle,
  toggleValue,
  onToggle,
  danger,
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor?: string;
  iconBg?: string;
  label: string;
  detail?: string;
  onClick?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={toggle ? onToggle : onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50/50 transition-colors"
      style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}
    >
      <div
        className="w-[29px] h-[29px] rounded-[7px] flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        <Icon size={17} color={iconColor} />
      </div>
      <span className={`flex-1 text-[16px] ${danger ? 'text-red-500' : 'text-black'}`}>{label}</span>
      {toggle ? (
        <div
          className="w-[51px] h-[31px] rounded-full relative transition-colors duration-200"
          style={{ background: toggleValue ? '#34c759' : '#e5e5ea' }}
          onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
        >
          <motion.div
            className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-sm"
            animate={{ left: toggleValue ? '22px' : '2px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </div>
      ) : (
        <>
          {detail && <span className="text-[16px] text-[#8e8e93]">{detail}</span>}
          {!danger && <ChevronRight size={18} color="#c7c7cc" />}
        </>
      )}
    </button>
  );
}

function MainSettings({ onNavigate }: { onNavigate: (v: SettingsView) => void }) {
  const isAirplaneMode = useStore((s) => s.isAirplaneMode);
  const isWifiOn = useStore((s) => s.isWifiOn);
  const wifiNetwork = useStore((s) => s.wifiNetwork);
  const isBluetoothOn = useStore((s) => s.isBluetoothOn);
  const isDndOn = useStore((s) => s.isDndOn);
  const isDarkMode = useStore((s) => s.isDarkMode);
  const toggleAirplaneMode = useStore((s) => s.toggleAirplaneMode);
  const toggleDnd = useStore((s) => s.toggleDnd);
  const toggleDarkMode = useStore((s) => s.toggleDarkMode);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      {/* Nav Bar */}
      <div className="sticky top-0 z-10 px-4 pt-3 pb-1" style={{ background: 'rgba(242,242,247,0.9)', backdropFilter: 'blur(20px)' }}>
        <h1 className="text-[34px] font-bold text-black pt-1">Settings</h1>
        <div className="relative mt-2 mb-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[36px] rounded-[10px] bg-[#e5e5ea] pl-9 pr-4 text-[17px] placeholder:text-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Profile Card */}
      <button
        onClick={() => onNavigate('apple-id')}
        className="mx-4 mb-4 rounded-[10px] bg-white p-3 flex items-center gap-3 w-[calc(100%-32px)] text-left"
      >
        <div className="w-[60px] h-[60px] rounded-full bg-[#007aff] flex items-center justify-center shrink-0">
          <CircleUser size={32} color="white" />
        </div>
        <div>
          <div className="text-[20px] font-semibold text-black">Md. Quincunx</div>
          <div className="text-[14px] text-[#8e8e93]">quincunx33@icloud.com</div>
        </div>
        <ChevronRight size={18} color="#c7c7cc" className="ml-auto" />
      </button>

      <SettingsSection>
        <SettingsCell icon={Plane} iconColor="#ff9500" iconBg="#ff950015" label="Airplane Mode" toggle toggleValue={isAirplaneMode} onToggle={toggleAirplaneMode} />
        <SettingsCell icon={Wifi} iconColor="#007aff" iconBg="#007aff15" label="Wi-Fi" detail={isWifiOn ? wifiNetwork : 'Off'} onClick={() => onNavigate('wifi')} />
        <SettingsCell icon={Bluetooth} iconColor="#007aff" iconBg="#007aff15" label="Bluetooth" detail={isBluetoothOn ? 'On' : 'Off'} onClick={() => onNavigate('bluetooth')} />
        <SettingsCell icon={Signal} iconColor="#34c759" iconBg="#34c75915" label="Cellular Data" />
      </SettingsSection>

      <SettingsSection>
        <SettingsCell icon={Bell} iconColor="#ff9500" iconBg="#ff950015" label="Notifications" onClick={() => onNavigate('notifications')} />
        <SettingsCell icon={Speaker} iconColor="#ff3b30" iconBg="#ff3b3015" label="Sounds & Haptics" onClick={() => onNavigate('sounds')} />
        <SettingsCell icon={Moon} iconColor="#5856d6" iconBg="#5856d615" label="Focus" toggle toggleValue={isDndOn} onToggle={toggleDnd} />
      </SettingsSection>

      <SettingsSection>
        <SettingsCell icon={Monitor} iconColor="#5856d6" iconBg="#5856d615" label="Display & Brightness" onClick={() => onNavigate('display')} />
        <SettingsCell icon={MoonIcon} iconColor="#1c1c1e" iconBg="#1c1c1e15" label="Dark Mode" toggle toggleValue={isDarkMode} onToggle={toggleDarkMode} />
        <SettingsCell icon={AppWindow} iconColor="#007aff" iconBg="#007aff15" label="Home Screen & Dock" onClick={() => onNavigate('home-dock')} />
        <SettingsCell icon={Accessibility} iconColor="#007aff" iconBg="#007aff15" label="Accessibility" onClick={() => onNavigate('display')} />
        <SettingsCell icon={Wallpaper} iconColor="#007aff" iconBg="#007aff15" label="Wallpaper" onClick={() => onNavigate('wallpaper')} />
      </SettingsSection>

      <SettingsSection>
        <SettingsCell icon={Shield} iconColor="#8e8e93" iconBg="#8e8e9315" label="Privacy & Security" onClick={() => onNavigate('privacy')} />
      </SettingsSection>

      <SettingsSection>
        <SettingsCell icon={Settings} iconColor="#8e8e93" iconBg="#8e8e9315" label="General" onClick={() => onNavigate('general')} />
      </SettingsSection>

      <div className="h-4" />
    </motion.div>
  );
}

function GeneralSettings({ onNavigate, onBack }: { onNavigate: (v: SettingsView) => void; onBack: () => void }) {
  const enterRepairMode = useStore((s) => s.enterRepairMode);
  const goHome = useStore((s) => s.goHome);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="General" onBack={onBack} />
      <div className="mt-2">
        <SettingsSection>
          <SettingsCell icon={Info} iconColor="#8e8e93" iconBg="#8e8e9315" label="About" onClick={() => onNavigate('about')} />
          <SettingsCell icon={RotateCcw} iconColor="#8e8e93" iconBg="#8e8e9315" label="Software Update" onClick={() => onNavigate('software-update')} />
          <SettingsCell icon={AirDrop} iconColor="#007aff" iconBg="#007aff15" label="AirDrop" />
          <SettingsCell icon={Battery} iconColor="#34c759" iconBg="#34c75915" label="iPad Storage" onClick={() => onNavigate('battery')} />
        </SettingsSection>

        <SettingsSection title="Reset">
          <SettingsCell icon={RotateCcw} iconColor="#8e8e93" iconBg="#8e8e9315" label="Transfer or Reset iPad" />
        </SettingsSection>

        <SettingsSection title="Diagnostics">
          <SettingsCell icon={Wrench} iconColor="#ff9500" iconBg="#ff950015" label="Repair Simulator" onClick={() => { goHome(); setTimeout(() => enterRepairMode(), 300); }} />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function SoftwareUpdate({ onBack }: { onBack: () => void }) {
  const iosVersion = useStore((s) => s.iosVersion);
  const updateState = useStore((s) => s.updateState);
  const updateProgress = useStore((s) => s.updateProgress);
  const availableUpdate = useStore((s) => s.availableUpdate);
  const startUpdate = useStore((s) => s.startUpdate);
  const cancelUpdate = useStore((s) => s.cancelUpdate);
  const setUpdateProgress = useStore((s) => s.setUpdateProgress);
  const setUpdateState = useStore((s) => s.setUpdateState);
  const completeUpdate = useStore((s) => s.completeUpdate);
  const setBootStage = useStore((s) => s.setBootStage);

  const handleStartUpdate = () => {
    startUpdate();
    setTimeout(() => setUpdateState('downloading'), 2000);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUpdateProgress(100);
        setTimeout(() => {
          setUpdateState('preparing');
          setTimeout(() => {
            setUpdateState('verifying');
            setTimeout(() => {
              setUpdateState('installing');
              setBootStage('booting');
              setTimeout(() => {
                completeUpdate('iOS 26.1');
                setBootStage('homescreen');
              }, 5000);
            }, 2000);
          }, 3000);
        }, 500);
      } else {
        setUpdateProgress(progress);
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Software Update" onBack={onBack} />
      <div className="mt-4 px-4">
        {/* Current Version */}
        <div className="rounded-[14px] bg-white p-4 mb-4">
          <div className="text-[13px] text-[#8e8e93] mb-1">Current Version</div>
          <div className="text-[24px] font-semibold text-black">{iosVersion}</div>
          <div className="text-[14px] text-[#8e8e93]">Build 23A123</div>
        </div>

        {/* Available Update */}
        {availableUpdate && updateState === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[14px] bg-white p-4 mb-4"
          >
            <div className="text-[20px] font-semibold text-black mb-1">
              iOS {availableUpdate.version} Available
            </div>
            <div className="text-[14px] text-[#8e8e93] mb-3">
              {availableUpdate.size} · New features and improvements
            </div>
            <div className="text-[14px] text-gray-600 mb-4">
              • Liquid Glass UI enhancements<br />
              • Improved Neural Engine performance<br />
              • New spatial multitasking features<br />
              • Enhanced privacy controls
            </div>
            <button
              onClick={handleStartUpdate}
              className="w-full h-[44px] rounded-[10px] bg-[#007aff] text-white text-[17px] font-medium hover:bg-[#0056d6] transition-colors"
            >
              Download and Install
            </button>
          </motion.div>
        )}

        {/* Update in Progress */}
        {updateState !== 'idle' && updateState !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[14px] bg-white p-4 mb-4"
          >
            <div className="text-center">
              <div className="text-[17px] font-semibold text-black mb-3">
                {updateState === 'checking' && 'Checking for Update...'}
                {updateState === 'downloading' && 'Downloading Update...'}
                {updateState === 'preparing' && 'Preparing Update...'}
                {updateState === 'verifying' && 'Verifying Update...'}
                {updateState === 'installing' && 'Installing Update...'}
              </div>

              {updateState === 'checking' && (
                <div className="w-8 h-8 border-2 border-[#007aff] border-t-transparent rounded-full animate-spin mx-auto" />
              )}

              {(updateState === 'downloading' || updateState === 'verifying') && (
                <div className="w-full">
                  <div className="w-full h-[4px] rounded-full overflow-hidden bg-gray-200">
                    <motion.div
                      className="h-full bg-[#007aff] rounded-full"
                      style={{ width: `${updateProgress}%` }}
                    />
                  </div>
                  <div className="text-[14px] text-[#8e8e93] mt-2">
                    {Math.round(updateProgress)}%
                  </div>
                </div>
              )}

              {(updateState === 'preparing' || updateState === 'installing') && (
                <div className="w-8 h-8 border-2 border-[#007aff] border-t-transparent rounded-full animate-spin mx-auto" />
              )}

              <button
                onClick={cancelUpdate}
                className="mt-4 text-[#007aff] text-[15px] hover:opacity-70 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Completed */}
        {updateState === 'complete' && (
          <div className="rounded-[14px] bg-white p-4 text-center">
            <div className="text-[20px] font-semibold text-black mb-2">Update Complete</div>
            <div className="text-[14px] text-[#8e8e93]">Your iPad is now running {iosVersion}</div>
          </div>
        )}

        {/* Automatic Updates Toggle */}
        <SettingsSection>
          <SettingsCell icon={RotateCcw} iconColor="#34c759" iconBg="#34c75915" label="Automatic Updates" toggle toggleValue={true} onToggle={() => {}} />
        </SettingsSection>

        {/* Version History */}
        <div className="text-[13px] text-[#8e8e93] px-4 pt-4 pb-1 uppercase tracking-wide">Version History</div>
        <SettingsSection>
          <SettingsCell icon={Star} iconColor="#8e8e93" iconBg="#8e8e9315" label="iOS 26.0" detail="Installed" />
          <SettingsCell icon={Star} iconColor="#8e8e93" iconBg="#8e8e9315" label="iPadOS 17.7" detail="Oct 2024" />
          <SettingsCell icon={Star} iconColor="#8e8e93" iconBg="#8e8e9315" label="iPadOS 16.6" detail="Jul 2023" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function DisplaySettings({ onBack }: { onBack: () => void }) {
  const brightness = useStore((s) => s.brightness);
  const isTrueToneOn = useStore((s) => s.isTrueToneOn);
  const isNightShiftOn = useStore((s) => s.isNightShiftOn);
  const setBrightness = useStore((s) => s.setBrightness);
  const toggleTrueTone = useStore((s) => s.toggleTrueTone);
  const toggleNightShift = useStore((s) => s.toggleNightShift);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Display & Brightness" onBack={onBack} />
      <div className="mt-4 px-4">
        {/* Brightness Slider */}
        <div className="rounded-[14px] bg-white p-4 mb-4">
          <div className="flex items-center gap-3">
            <Sun size={20} color="#8e8e93" />
            <input
              type="range"
              min="0"
              max="100"
              value={brightness * 100}
              onChange={(e) => setBrightness(Number(e.target.value) / 100)}
              className="flex-1 h-[32px] accent-[#007aff]"
            />
          </div>
        </div>

        <SettingsSection>
          <SettingsCell icon={Sun} iconColor="#007aff" iconBg="#007aff15" label="True Tone" toggle toggleValue={isTrueToneOn} onToggle={toggleTrueTone} />
          <SettingsCell icon={MoonIcon} iconColor="#ff9500" iconBg="#ff950015" label="Night Shift" toggle toggleValue={isNightShiftOn} onToggle={toggleNightShift} />
        </SettingsSection>

        <SettingsSection title="Auto-Lock">
          <SettingsCell icon={Clock} iconColor="#8e8e93" iconBg="#8e8e9315" label="Auto-Lock" detail="2 Minutes" />
        </SettingsSection>

        <SettingsSection title="Text Size">
          <SettingsCell icon={TextSize} iconColor="#007aff" iconBg="#007aff15" label="Bold Text" toggle toggleValue={false} onToggle={() => {}} />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function WifiSettings({ onBack }: { onBack: () => void }) {
  const isWifiOn = useStore((s) => s.isWifiOn);
  const toggleWifi = useStore((s) => s.toggleWifi);
  const networks = ['HomeNetwork', 'Office_WiFi', 'Starbucks_Free', 'iPhone_Hotspot'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Wi-Fi" onBack={onBack} />
      <div className="mt-4 px-4">
        <div className="rounded-[14px] bg-white p-4 mb-4 flex items-center justify-between">
          <span className="text-[17px] text-black">Wi-Fi</span>
          <div
            className="w-[51px] h-[31px] rounded-full relative transition-colors duration-200"
            style={{ background: isWifiOn ? '#34c759' : '#e5e5ea' }}
            onClick={toggleWifi}
          >
            <motion.div
              className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-sm"
              animate={{ left: isWifiOn ? '22px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </div>

        {isWifiOn && (
          <SettingsSection title="Networks">
            {networks.map((network, i) => (
              <div key={network} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
                <Wifi size={17} color="#007aff" />
                <span className="flex-1 text-[16px] text-black">{network}</span>
                {i === 0 && <span className="text-[13px] text-[#34c759]">Connected</span>}
                <LockIcon size={14} color="#8e8e93" />
              </div>
            ))}
          </SettingsSection>
        )}
      </div>
    </motion.div>
  );
}

function AboutSettings({ onBack }: { onBack: () => void }) {
  const iosVersion = useStore((s) => s.iosVersion);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="About" onBack={onBack} />
      <div className="mt-4 px-4">
        <SettingsSection>
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
            <span className="flex-1 text-[16px] text-black">Name</span>
            <span className="text-[16px] text-[#8e8e93]">iPad mini</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
            <span className="flex-1 text-[16px] text-black">iOS Version</span>
            <span className="text-[16px] text-[#8e8e93]">{iosVersion}</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
            <span className="flex-1 text-[16px] text-black">Model Name</span>
            <span className="text-[16px] text-[#8e8e93]">iPad mini (5th generation)</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
            <span className="flex-1 text-[16px] text-black">Model Number</span>
            <span className="text-[16px] text-[#8e8e93]">MUU52LL/A</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
            <span className="flex-1 text-[16px] text-black">Serial Number</span>
            <span className="text-[16px] text-[#8e8e93]">ABC123456789</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5">
            <span className="flex-1 text-[16px] text-black">Chip</span>
            <span className="text-[16px] text-[#8e8e93]">A12 Bionic</span>
          </div>
        </SettingsSection>

        <SettingsSection title="Legal">
          <div className="px-4 py-2.5 text-[16px] text-black">Legal Notices</div>
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function RepairSettings({ onBack }: { onBack: () => void }) {
  const enterRepairMode = useStore((s) => s.enterRepairMode);
  const goHome = useStore((s) => s.goHome);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Diagnostics" onBack={onBack} />
      <div className="mt-4 px-4">
        <div className="rounded-[14px] bg-white p-4 text-center">
          <div className="text-[17px] font-semibold text-black mb-2">Repair Simulator</div>
          <div className="text-[14px] text-[#8e8e93] mb-4">
            Access the hardware teardown and repair simulation environment.
          </div>
          <button
            onClick={() => { goHome(); setTimeout(() => enterRepairMode(), 300); }}
            className="w-full h-[44px] rounded-[10px] bg-[#007aff] text-white text-[17px] font-medium hover:bg-[#0056d6] transition-colors"
          >
            Enter Repair Mode
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AppleIdSettings({ onBack, onNavigate }: { onBack: () => void; onNavigate: (v: SettingsView) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Apple ID" onBack={onBack} />
      <div className="mt-6 px-4">
        {/* Simulated Apple ID profile */}
        <div className="rounded-[14px] bg-white p-4 mb-4 flex items-center gap-3">
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#ff9500] to-[#ff375f] flex items-center justify-center text-white text-[26px] font-semibold shrink-0">
            Q
          </div>
          <div>
            <div className="text-[20px] font-semibold text-black">Md. Quincunx</div>
            <div className="text-[15px] text-[#8e8e93]">quincunx33@icloud.com</div>
            <div className="text-[13px] text-[#8e8e93] mt-0.5">Apple ID, iCloud+, Media &amp; Purchases</div>
          </div>
        </div>

        <SettingsSection>
          <SettingsCell icon={CreditCard} iconColor="#007aff" iconBg="#007aff15" label="Payment &amp; Shipping" />
          <SettingsCell icon={Star} iconColor="#ff9500" iconBg="#ff950015" label="Subscriptions" />
          <SettingsCell icon={Monitor} iconColor="#5856d6" iconBg="#5856d615" label="Media &amp; Purchases" onClick={() => onNavigate('media-purchases')} />
          <SettingsCell icon={Lock} iconColor="#8e8e93" iconBg="#8e8e9315" label="Sign-In &amp; Security" />
          <SettingsCell icon={CreditCard} iconColor="#34c759" iconBg="#34c75915" label="iCloud+" detail="50 GB" />
          <SettingsCell icon={Signal} iconColor="#ff3b30" iconBg="#ff3b3015" label="Find My" />
          <SettingsCell icon={Bell} iconColor="#ff9500" iconBg="#ff950015" label="Name, Phone Numbers, Email" />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Devices" detail="iPad mini 5" />
        </SettingsSection>

        <SettingsSection>
          <SettingsCell
            icon={RotateCcw}
            iconColor="#ff3b30"
            iconBg="#ff3b3015"
            label="Sign Out"
            danger
            onClick={() => alert('This is a simulated Apple ID — sign out is not available in this simulator.')}
          />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function MediaPurchasesSettings({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Media & Purchases" onBack={onBack} />
      <div className="mt-4 px-4">
        <SettingsSection>
          <SettingsCell icon={CloudUpload} iconColor="#007aff" iconBg="#007aff15" label="Apps" />
          <SettingsCell icon={CreditCard} iconColor="#007aff" iconBg="#007aff15" label="In-App Purchases &amp; Subscriptions" />
          <SettingsCell icon={CloudUpload} iconColor="#007aff" iconBg="#007aff15" label="Content &amp; Privacy" />
          <SettingsCell icon={CircleUser} iconColor="#007aff" iconBg="#007aff15" label="Account Details" detail="quincunx33@icloud.com" />
          <SettingsCell icon={Star} iconColor="#ff9500" iconBg="#ff950015" label="Purchased" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function HomeDockSettings({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Home Screen & Dock" onBack={onBack} />
      <div className="mt-4 px-4">
        <SettingsSection>
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Add to Home Screen" />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="App Library" />
        </SettingsSection>
        <SettingsSection title="Multitasking">
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Stage Manager" />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Gestures" />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Recent Apps in App Switcher" />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Multitasking Gestures" toggle toggleValue={false} onToggle={() => {}} />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Show Suggested Apps in Dock" />
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Show Recents" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function WallpaperSettings({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Wallpaper" onBack={onBack} />
      <div className="mt-4 px-4">
        <SettingsSection>
          <SettingsCell icon={Monitor} iconColor="#007aff" iconBg="#007aff15" label="Add New Wallpaper" />
        </SettingsSection>
        <SettingsSection title="Current Wallpaper">
          <div className="p-4 flex flex-col items-center">
            <img src="assets/ipados26-kit-wallpaper.jpg" alt="Wallpaper" className="w-28 h-44 rounded-xl object-cover border border-white/40 shadow-lg" />
            <div className="text-[15px] text-black mt-3 font-medium">iPadOS 26 Kit — Default</div>
          </div>
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function BluetoothSettings({ onBack }: { onBack: () => void }) {
  const isBluetoothOn = useStore((s) => s.isBluetoothOn);
  const toggleBluetooth = useStore((s) => s.toggleBluetooth);
  const devices = [
    { name: 'AirPods Pro', status: 'Connected', type: 'audio' },
    { name: 'Apple Pencil (1st gen)', status: '', type: 'accessory' },
    { name: 'Magic Keyboard', status: '', type: 'accessory' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Bluetooth" onBack={onBack} />
      <div className="mt-4 px-4">
        <div className="rounded-[14px] bg-white p-4 mb-4 flex items-center justify-between">
          <span className="text-[17px] text-black">Bluetooth</span>
          <div
            className="w-[51px] h-[31px] rounded-full relative transition-colors duration-200 cursor-pointer"
            style={{ background: isBluetoothOn ? '#34c759' : '#e5e5ea' }}
            onClick={toggleBluetooth}
          >
            <motion.div
              className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-sm"
              animate={{ left: isBluetoothOn ? '22px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        {isBluetoothOn && (
          <>
            <SettingsSection title="MY DEVICES">
              {devices.map((d) => (
                <div key={d.name} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
                  <Bluetooth size={17} color="#007aff" />
                  <span className="flex-1 text-[16px] text-black">{d.name}</span>
                  {d.status && <span className="text-[13px] text-[#34c759]">{d.status}</span>}
                </div>
              ))}
            </SettingsSection>
            <SettingsSection title="OTHER DEVICES">
              <div className="px-4 py-2.5 flex items-center gap-3">
                <span className="w-[17px]" />
                <span className="text-[16px] text-[#007aff]">Now Discoverable…</span>
              </div>
            </SettingsSection>
          </>
        )}
      </div>
    </motion.div>
  );
}

function NotificationsSettings({ onBack }: { onBack: () => void }) {
  const apps = [
    { name: 'Messages', icon: 'message-circle', color: '#34c759' },
    { name: 'Mail', icon: 'mail', color: '#007aff' },
    { name: 'FaceTime', icon: 'video', color: '#34c759' },
    { name: 'Music', icon: 'music', color: '#ff2d55' },
    { name: 'Weather', icon: 'cloud-sun', color: '#007aff' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Notifications" onBack={onBack} />
      <div className="mt-6 px-4">
        <SettingsSection>
          <SettingsCell icon={Bell} iconColor="#ff9500" iconBg="#ff950015" label="Show Previews" />
          <SettingsCell icon={Bell} iconColor="#ff9500" iconBg="#ff950015" label="Notification Grouping" />
        </SettingsSection>
        <div className="px-4 py-1 text-[13px] text-[#8e8e93] uppercase tracking-wide">Notification Style</div>
        <SettingsSection>
          {apps.map((a) => (
            <div key={a.name} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(120,120,128,0.12)' }}>
              <span className="w-[29px] h-[29px] rounded-[7px] flex items-center justify-center" style={{ background: a.color + '15' }}>
                <Bell size={17} color={a.color} />
              </span>
              <span className="flex-1 text-[16px] text-black">{a.name}</span>
              <span className="text-[13px] text-[#8e8e93]">On</span>
            </div>
          ))}
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function PrivacySettings({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Privacy & Security" onBack={onBack} />
      <div className="mt-4 px-4">
        <SettingsSection>
          <SettingsCell icon={Shield} iconColor="#ff3b30" iconBg="#ff3b3015" label="App Tracking Transparency" />
          <SettingsCell icon={Shield} iconColor="#ff3b30" iconBg="#ff3b3015" label="Recorded By" />
          <SettingsCell icon={Shield} iconColor="#ff3b30" iconBg="#ff3b3015" label="Privacy Report" />
        </SettingsSection>
        <SettingsSection>
          <SettingsCell icon={Shield} iconColor="#ff3b30" iconBg="#ff3b3015" label="Security" />
          <SettingsCell icon={Shield} iconColor="#ff3b30" iconBg="#ff3b3015" label="Safety Check" />
          <SettingsCell icon={Shield} iconColor="#ff3b30" iconBg="#ff3b3015" label="Analytics & Improvements" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function SoundsSettings({ onBack }: { onBack: () => void }) {
  const isMuted = useStore((s) => s.isMuted);
  const toggleMute = useStore((s) => s.toggleMute);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Sounds & Haptics" onBack={onBack} />
      <div className="mt-4 px-4">
        <div className="rounded-[14px] bg-white p-4 mb-4 flex items-center gap-3">
          <Speaker size={20} color="#8e8e93" />
          <input type="range" min="0" max="100" defaultValue={70} className="flex-1 h-[32px] accent-[#007aff]" />
        </div>
        <SettingsSection>
          <SettingsCell icon={Bell} iconColor="#ff3b30" iconBg="#ff3b3015" label="Change with Buttons" />
          <SettingsCell icon={RotateCcw} iconColor="#007aff" iconBg="#007aff15" label="Vibrate on Silent" toggle toggleValue={!isMuted} onToggle={toggleMute} />
        </SettingsSection>
        <SettingsSection title="Ringtone">
          <SettingsCell icon={MusicNote} iconColor="#007aff" iconBg="#007aff15" label="Ringtone" detail="Reflection" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

function BatteryInfoView({ onBack }: { onBack: () => void }) {
  const batteryLevel = useStore((s) => s.batteryLevel);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 overflow-y-auto"
    >
      <SettingsHeader title="Battery" onBack={onBack} />
      <div className="mt-4 px-4">
        <div className="rounded-[14px] bg-white p-4 mb-4 text-center">
          <Battery size={40} className="mx-auto mb-2" color="#34c759" />
          <div className="text-[20px] font-semibold text-black">{Math.round(batteryLevel * 100)}%</div>
          <div className="text-[14px] text-[#8e8e93]">Simulated battery level</div>
        </div>
        <SettingsSection>
          <SettingsCell icon={Battery} iconColor="#34c759" iconBg="#34c75915" label="Low Power Mode" />
          <SettingsCell icon={Battery} iconColor="#34c759" iconBg="#34c75915" label="Battery Health" detail="96%" />
        </SettingsSection>
        <div className="px-4 py-1 text-[13px] text-[#8e8e93] uppercase tracking-wide">Last 24 Hours</div>
        <SettingsSection>
          <SettingsCell icon={Signal} iconColor="#007aff" iconBg="#007aff15" label="Safari" detail="1h 12m" />
          <SettingsCell icon={MusicNote} iconColor="#ff2d55" iconBg="#ff2d5515" label="Music" detail="48m" />
          <SettingsCell icon={MessageSquare} iconColor="#34c759" iconBg="#34c75915" label="Messages" detail="22m" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

// Icon wrapper components
function Accessibility({ size, color }: { size?: number; color?: string }) {
  return <Settings size={size} color={color} />;
}
function Wallpaper({ size, color }: { size?: number; color?: string }) {
  return <Monitor size={size} color={color} />;
}
function Info({ size, color }: { size?: number; color?: string }) {
  return <span className="font-bold" style={{ fontSize: size, color }}>i</span>;
}
function AirDrop({ size, color }: { size?: number; color?: string }) {
  return <Signal size={size} color={color} />;
}
function Wrench({ size, color }: { size?: number; color?: string }) {
  return <Settings size={size} color={color} />;
}
function TextSize({ size, color }: { size?: number; color?: string }) {
  return <span className="font-bold" style={{ fontSize: size, color }}>Aa</span>;
}
function LockIcon({ size, color }: { size?: number; color?: string }) {
  return <Lock size={size} color={color} />;
}
function MusicNote({ size, color }: { size?: number; color?: string }) {
  return <Music size={size} color={color} />;
}
