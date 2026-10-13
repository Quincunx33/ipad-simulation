import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Navigation, MapPin } from 'lucide-react';

const MAP_LOCATIONS = [
  { name: 'Apple Park', address: 'One Apple Park Way, Cupertino', type: 'work' },
  { name: 'Home', address: '123 Main St, Cupertino', type: 'home' },
  { name: 'Starbucks', address: '456 Coffee Ave', type: 'favorite' },
  { name: 'Gym', address: '789 Fitness Blvd', type: 'favorite' },
];

export default function MapsApp() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#f5f0e8] flex flex-col">
      {/* Search Bar */}
      <div className="absolute top-2 left-3 right-3 z-10">
        <div className={`flex items-center h-[40px] rounded-[10px] px-3 shadow-md transition-colors ${searchFocused ? 'bg-white' : 'bg-white'}`}>
          <Search size={16} color="#8e8e93" />
          <input
            type="text"
            placeholder="Search for a place"
            className="flex-1 ml-2 bg-transparent text-[16px] outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
        </div>
      </div>

      {/* Simulated Map */}
      <div className="flex-1 relative overflow-hidden">
        {/* Grid pattern for map */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f5f0e8" />
          {/* Roads */}
          <rect x="30%" y="0" width="8" height="100%" fill="#ffffff" />
          <rect x="60%" y="0" width="6" height="100%" fill="#ffffff" />
          <rect x="0" y="25%" width="100%" height="8" fill="#ffffff" />
          <rect x="0" y="55%" width="100%" height="6" fill="#ffffff" />
          <rect x="0" y="75%" width="100%" height="8" fill="#ffffff" />
          {/* Secondary roads */}
          <rect x="15%" y="0" width="4" height="100%" fill="#f0ebe0" />
          <rect x="45%" y="0" width="4" height="100%" fill="#f0ebe0" />
          <rect x="80%" y="0" width="4" height="100%" fill="#f0ebe0" />
          <rect x="0" y="10%" width="100%" height="4" fill="#f0ebe0" />
          <rect x="0" y="40%" width="100%" height="4" fill="#f0ebe0" />
          <rect x="0" y="65%" width="100%" height="4" fill="#f0ebe0" />
          <rect x="0" y="90%" width="100%" height="4" fill="#f0ebe0" />
          {/* Park areas */}
          <rect x="5%" y="5%" width="20%" height="15%" rx="8" fill="#c8e6c9" opacity="0.5" />
          <rect x="65%" y="30%" width="25%" height="20%" rx="8" fill="#c8e6c9" opacity="0.5" />
          {/* Water */}
          <rect x="45%" y="70%" width="30%" height="25%" rx="8" fill="#b3e5fc" opacity="0.4" />
          {/* Buildings */}
          <rect x="35%" y="30%" width="8%" height="6%" rx="2" fill="#e0e0e0" opacity="0.6" />
          <rect x="50%" y="15%" width="10%" height="8%" rx="2" fill="#e0e0e0" opacity="0.6" />
          <rect x="70%" y="60%" width="8%" height="5%" rx="2" fill="#e0e0e0" opacity="0.6" />
        </svg>

        {/* Location Pins */}
        {[
          { x: '52%', y: '20%', label: 'Apple Park', color: '#007aff' },
          { x: '32%', y: '50%', label: 'Home', color: '#34c759' },
          { x: '68%', y: '45%', label: 'Starbucks', color: '#ff9500' },
        ].map((pin) => (
          <div key={pin.label} className="absolute flex flex-col items-center" style={{ left: pin.x, top: pin.y, transform: 'translate(-50%, -100%)' }}>
            <div className="bg-white rounded-lg px-2 py-0.5 shadow-md mb-1 whitespace-nowrap">
              <span className="text-[11px] font-medium text-black">{pin.label}</span>
            </div>
            <MapPin size={28} color={pin.color} fill={pin.color} />
          </div>
        ))}

        {/* Location Button */}
        <button className="absolute bottom-4 right-4 w-[36px] h-[36px] rounded-lg bg-white shadow-md flex items-center justify-center">
          <Navigation size={18} color="#007aff" />
        </button>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="shrink-0 bg-white rounded-t-[16px] shadow-lg p-4"
      >
        <div className="w-[36px] h-[4px] rounded-full bg-gray-300 mx-auto mb-3" />
        <div className="text-[13px] text-gray-500 mb-2">Favorites</div>
        {MAP_LOCATIONS.slice(0, 3).map((loc) => (
          <div key={loc.name} className="flex items-center gap-3 py-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${loc.type === 'home' ? 'bg-green-100' : loc.type === 'work' ? 'bg-blue-100' : 'bg-orange-100'}`}>
              <MapPin size={16} color={loc.type === 'home' ? '#34c759' : loc.type === 'work' ? '#007aff' : '#ff9500'} />
            </div>
            <div>
              <div className="text-[15px] font-medium text-black">{loc.name}</div>
              <div className="text-[12px] text-gray-500">{loc.address}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
