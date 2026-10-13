import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Search } from 'lucide-react';

const FEATURED = [
  { title: 'iOS 26: The Future', subtitle: 'Discover the new Liquid Glass experience', image: 'assets/appstore-hero.jpg', color: '#5856d6' },
];

const NATIVE_APPS = [
  { name: 'Safari', category: 'Browser', rating: 4.8, reviews: '2.1M', icon: 'compass', color: '#007aff' },
  { name: 'Photos', category: 'Photography', rating: 4.9, reviews: '3.5M', icon: 'image', color: '#ff2d55' },
  { name: 'Music', category: 'Entertainment', rating: 4.7, reviews: '1.8M', icon: 'music', color: '#ff2d55' },
  { name: 'Maps', category: 'Navigation', rating: 4.6, reviews: '980K', icon: 'map', color: '#34c759' },
  { name: 'Notes', category: 'Productivity', rating: 4.8, reviews: '2.3M', icon: 'edit', color: '#ffcc00' },
  { name: 'Files', category: 'Productivity', rating: 4.5, reviews: '750K', icon: 'folder', color: '#5ac8fa' },
];

export default function AppStoreApp() {
  const [installing, setInstalling] = useState<Record<string, boolean>>({});

  const handleInstall = (appName: string) => {
    setInstalling({ ...installing, [appName]: true });
    setTimeout(() => {
      setInstalling((prev) => ({ ...prev, [appName]: false }));
    }, 2000);
  };

  return (
    <div className="absolute inset-0 bg-[#f5f5f7] flex flex-col">
      {/* Search Bar */}
      <div className="px-4 pt-3 pb-2 bg-white/90 shrink-0">
        <div className="flex items-center bg-[#e5e5ea] rounded-[10px] px-3 h-[36px]">
          <Search size={16} color="#8e8e93" />
          <span className="ml-2 text-[17px] text-gray-500">Search</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Featured */}
        {FEATURED.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-3 rounded-[16px] overflow-hidden relative"
          >
            <img src={item.image} alt={item.title} className="w-full h-[180px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <div className="text-[11px] text-white/70 uppercase tracking-wider">Featured</div>
              <div className="text-[20px] font-bold text-white">{item.title}</div>
              <div className="text-[13px] text-white/80">{item.subtitle}</div>
            </div>
          </motion.div>
        ))}

        {/* Native Apps Section */}
        <div className="px-4 mt-4">
          <div className="text-[22px] font-bold text-black mb-3">Apple Apps</div>
          {NATIVE_APPS.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 py-3 border-b border-gray-200"
            >
              <div
                className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center"
                style={{ background: app.color }}
              >
                <span className="text-white text-[24px] font-bold">{app.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-medium text-black">{app.name}</div>
                <div className="text-[12px] text-gray-500">{app.category}</div>
                <div className="flex items-center gap-1">
                  <Star size={12} color="#ff9500" fill="#ff9500" />
                  <span className="text-[12px] text-gray-500">{app.rating}</span>
                  <span className="text-[12px] text-gray-400">({app.reviews})</span>
                </div>
              </div>
              <button
                onClick={() => handleInstall(app.name)}
                className="w-[70px] h-[28px] rounded-full bg-[#e5e5ea] hover:bg-gray-300 transition-colors flex items-center justify-center"
              >
                {installing[app.name] ? (
                  <motion.div
                    className="w-[16px] h-[16px] border-2 border-[#007aff] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <span className="text-[13px] font-semibold text-[#007aff]">GET</span>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center justify-around py-2 border-t border-gray-200 bg-white/90 shrink-0">
        {['Today', 'Games', 'Apps', 'Search'].map((t) => (
          <button key={t} className={`text-[10px] ${t === 'Today' ? 'text-[#007aff]' : 'text-[#8e8e93]'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
