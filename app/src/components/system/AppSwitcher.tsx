import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { X } from 'lucide-react';

const APP_PREVIEWS: Record<string, { color: string; label: string }> = {
  Safari: { color: '#007aff', label: 'Safari' },
  Settings: { color: '#8e8e93', label: 'Settings' },
  Photos: { color: '#ff2d55', label: 'Photos' },
  Camera: { color: '#8e8e93', label: 'Camera' },
  Messages: { color: '#34c759', label: 'Messages' },
  Maps: { color: '#34c759', label: 'Maps' },
  Weather: { color: '#007aff', label: 'Weather' },
  Music: { color: '#ff2d55', label: 'Music' },
  Notes: { color: '#ffcc00', label: 'Notes' },
  Files: { color: '#007aff', label: 'Files' },
  Calculator: { color: '#1c1c1e', label: 'Calculator' },
  Clock: { color: '#1c1c1e', label: 'Clock' },
  AppStore: { color: '#007aff', label: 'App Store' },
};

export default function AppSwitcher() {
  const appSwitcherOpen = useStore((s) => s.appSwitcherOpen);
  const closeAppSwitcher = useStore((s) => s.closeAppSwitcher);
  const openApps = useStore((s) => s.openApps);
  const currentApp = useStore((s) => s.currentApp);
  const launchApp = useStore((s) => s.launchApp);
  const goHome = useStore((s) => s.goHome);

  if (!appSwitcherOpen) return null;

  const allApps = currentApp ? [...new Set([...openApps, currentApp])] : openApps;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30"
    >
      {/* Blurred background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(15px)',
        }}
        onClick={goHome}
      />

      {/* App cards */}
      <div className="relative flex items-center justify-center h-full gap-4 px-8 overflow-x-auto">
        {allApps.map((app, i) => {
          const preview = APP_PREVIEWS[app] || { color: '#8e8e93', label: app };
          return (
            <motion.div
              key={app}
              initial={{ y: '100%', scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: '100%', scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: i * 0.05 }}
              className="flex-shrink-0 relative"
              style={{ width: 'min(200px, 38vw)' }}
            >
              {/* App preview */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-[16px] overflow-hidden cursor-pointer"
                style={{
                  aspectRatio: '3/4',
                  background: preview.color,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                }}
                onClick={() => {
                  closeAppSwitcher();
                  launchApp(app);
                }}
              >
                {/* Preview content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-[24px] font-semibold opacity-50">{preview.label}</span>
                </div>

                {/* Close button */}
                <button
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    useStore.setState(s => ({ openApps: s.openApps.filter(a => a !== app) }));
                    if (currentApp === app) goHome();
                  }}
                >
                  <X size={14} color="white" />
                </button>
              </motion.div>

              {/* App icon below card */}
              <div className="flex items-center justify-center mt-2 gap-2">
                <div
                  className="w-8 h-8 rounded-[8px]"
                  style={{ background: preview.color }}
                />
                <span className="text-[13px] text-white/80">{preview.label}</span>
              </div>
            </motion.div>
          );
        })}

        {allApps.length === 0 && (
          <div className="text-white/50 text-center text-[17px]">No Recent Apps</div>
        )}
      </div>
    </motion.div>
  );
}
