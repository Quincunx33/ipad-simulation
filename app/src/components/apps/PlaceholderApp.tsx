import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { useStore } from '@/store/useStore';
import StatusBar from '@/components/system/StatusBar';

export default function PlaceholderApp() {
  const currentApp = useStore((s) => s.currentApp) || 'App';
  const goHome = useStore((s) => s.goHome);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f2f2f7] text-[#1c1c1e]">
      <div className="shrink-0">
        <StatusBar layout="relative" dark={true} />
      </div>
      <header className="flex items-center justify-between border-b border-black/10 bg-white/85 px-4 py-3 backdrop-blur-xl">
        <button onClick={goHome} className="flex items-center gap-1 rounded-full px-2 py-1 text-[#007aff] active:bg-black/5">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Home</span>
        </button>
        <h1 className="text-base font-semibold">{currentApp}</h1>
        <button className="rounded-full p-1.5 text-[#007aff] active:bg-black/5" aria-label="More options">
          <MoreHorizontal size={20} />
        </button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#007aff] to-[#5ac8fa] text-4xl text-white shadow-lg shadow-blue-500/25">{currentApp.slice(0, 1)}</div>
        <h2 className="text-2xl font-bold">{currentApp}</h2>
        <p className="mt-2 max-w-xs text-sm text-black/50">This iPadOS 26 app surface is ready for interactive content.</p>
        <button onClick={goHome} className="mt-6 rounded-full bg-[#007aff] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 active:scale-95">Return to Home Screen</button>
      </main>
    </div>
  );
}

export { PlaceholderApp };

/**
 * This placeholder intentionally keeps all launcher entries interactive while
 * individual app implementations are expanded.
 */
