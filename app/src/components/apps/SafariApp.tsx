import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ChevronLeft, ChevronRight, Share, Bookmark, Search, Layers } from 'lucide-react';

const FAVORITES = [
  { name: 'Apple', color: '#1c1c1e', url: 'apple.com' },
  { name: 'Google', color: '#4285f4', url: 'google.com' },
  { name: 'YouTube', color: '#ff0000', url: 'youtube.com' },
  { name: 'Twitter', color: '#1da1f2', url: 'twitter.com' },
  { name: 'Reddit', color: '#ff4500', url: 'reddit.com' },
  { name: 'Amazon', color: '#ff9900', url: 'amazon.com' },
  { name: 'Netflix', color: '#e50914', url: 'netflix.com' },
  { name: 'Wikipedia', color: '#3366cc', url: 'wikipedia.org' },
];

export default function SafariApp() {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const goHome = useStore((s) => s.goHome);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setCurrentUrl(url.trim());
      setFocused(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Navigation Bar */}
      <div
        className="flex items-center gap-2 px-2 py-1 shrink-0"
        style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <ChevronLeft size={18} color="#8e8e93" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <ChevronRight size={18} color="#8e8e93" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1">
          <div className={`flex items-center h-[32px] rounded-[10px] px-3 transition-colors ${focused ? 'bg-white shadow-sm border border-[#007aff]' : 'bg-[#e5e5ea]'}`}>
            <Search size={14} color="#8e8e93" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder={currentUrl || 'Search or enter website name'}
              className="flex-1 ml-2 bg-transparent text-[14px] outline-none placeholder:text-gray-500"
            />
          </div>
        </form>

        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <Share size={16} color="#007aff" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <Layers size={16} color="#007aff" />
          </button>
        </div>
      </div>

      {/* Content */}
      {currentUrl ? (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="text-[#007aff] text-[40px] font-bold mb-2">
              {currentUrl.split('.')[0].charAt(0).toUpperCase() + currentUrl.split('.')[0].slice(1)}
            </div>
            <div className="text-gray-400 text-[15px]">https://www.{currentUrl}</div>
            <div className="mt-8 max-w-[400px] mx-auto text-left space-y-2">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/5" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Favorites */}
          <div className="text-[22px] font-bold text-black mb-3">Favorites</div>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {FAVORITES.map((fav) => (
              <motion.button
                key={fav.name}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1"
                onClick={() => { setUrl(fav.url); setCurrentUrl(fav.url); }}
              >
                <div
                  className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center"
                  style={{ background: fav.color }}
                >
                  <span className="text-white text-[20px] font-bold">{fav.name[0]}</span>
                </div>
                <span className="text-[11px] text-gray-600">{fav.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Frequently Visited */}
          <div className="text-[17px] font-semibold text-black mb-2">Frequently Visited</div>
          <div className="space-y-1">
            {['apple.com', 'google.com', 'youtube.com'].map((site) => (
              <button
                key={site}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-[15px] text-[#007aff]"
                onClick={() => { setUrl(site); setCurrentUrl(site); }}
              >
                {site}
              </button>
            ))}
          </div>

          {/* Privacy Report */}
          <div className="mt-6 rounded-[14px] bg-[#f2f2f7] p-4">
            <div className="text-[15px] font-semibold text-black mb-1">Privacy Report</div>
            <div className="text-[13px] text-gray-500">
              Safari prevented 12 trackers from profiling you in the last 7 days.
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div
        className="flex items-center justify-around px-4 py-1 shrink-0 border-t border-gray-200"
        style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <button onClick={goHome} className="text-[11px] text-[#007aff]">Done</button>
        <button className="text-[11px] text-gray-500"><ChevronLeft size={18} /></button>
        <button className="text-[11px] text-gray-500"><ChevronRight size={18} /></button>
        <button className="text-[11px] text-gray-500"><Share size={18} /></button>
        <button className="text-[11px] text-gray-500"><Bookmark size={18} /></button>
        <button className="text-[11px] text-gray-500"><Layers size={18} /></button>
      </div>
    </div>
  );
}
