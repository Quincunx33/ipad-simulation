import { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';

const CITIES = [
  { name: 'Cupertino', temp: 72, condition: 'Sunny', high: 78, low: 58, humidity: 45, wind: 8, uv: 6, visibility: 10, pressure: 30.12, color: 'from-blue-400 to-blue-300' },
  { name: 'New York', temp: 58, condition: 'Partly Cloudy', high: 62, low: 48, humidity: 60, wind: 12, uv: 3, visibility: 8, pressure: 29.95, color: 'from-gray-400 to-blue-300' },
  { name: 'London', temp: 52, condition: 'Rainy', high: 55, low: 45, humidity: 80, wind: 15, uv: 2, visibility: 5, pressure: 29.85, color: 'from-gray-600 to-gray-400' },
];

const HOURLY = Array.from({ length: 12 }, (_, i) => ({
  time: `${(9 + i) % 12 || 12}${i < 3 ? 'AM' : 'PM'}`,
  temp: 70 + Math.floor(Math.sin(i * 0.5) * 8),
  icon: i < 3 ? 'sun' : i < 8 ? 'cloud-sun' : 'cloud',
}));

const DAILY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  high: 75 + Math.floor(Math.sin(i) * 10),
  low: 55 + Math.floor(Math.cos(i) * 8),
  condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Sunny', 'Rainy', 'Sunny', 'Cloudy'][i],
}));

export default function WeatherApp() {
  const [cityIdx, setCityIdx] = useState(0);
  const city = CITIES[cityIdx];

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${city.color} flex flex-col overflow-y-auto`}>
      {/* City Name */}
      <div className="text-center pt-4">
        <div className="flex items-center justify-center gap-2">
          {CITIES.map((c, i) => (
            <button key={c.name} onClick={() => setCityIdx(i)} className="text-[13px] text-white/60 hover:text-white transition-colors">
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Weather */}
      <motion.div
        key={city.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-white py-6"
      >
        <div className="text-[18px] font-medium">{city.name}</div>
        <div className="text-[72px] font-extralight leading-none">{city.temp}°</div>
        <div className="text-[18px]">{city.condition}</div>
        <div className="text-[16px] mt-1">H:{city.high}° L:{city.low}°</div>
      </motion.div>

      {/* Hourly Forecast */}
      <div className="mx-4 rounded-[14px] p-3 mb-3" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
        <div className="text-[12px] text-white/70 mb-2 uppercase">Hourly Forecast</div>
        <div className="flex gap-4 overflow-x-auto">
          {HOURLY.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 min-w-[36px]">
              <span className="text-[12px] text-white/80">{h.time}</span>
              <CloudSun size={18} color="white" />
              <span className="text-[14px] text-white font-medium">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="mx-4 rounded-[14px] p-3 mb-3" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
        <div className="text-[12px] text-white/70 mb-2 uppercase">7-Day Forecast</div>
        {DAILY.map((d, i) => (
          <div key={i} className="flex items-center py-1.5 gap-3">
            <span className="w-[40px] text-[14px] text-white">{d.day}</span>
            <CloudSun size={16} color="white" />
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-[4px] rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-white/60" style={{ width: `${((d.high - 40) / 50) * 100}%` }} />
              </div>
            </div>
            <span className="text-[14px] text-white/70 w-[30px] text-right">{d.low}°</span>
            <span className="text-[14px] text-white w-[30px] text-right">{d.high}°</span>
          </div>
        ))}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2 mx-4 mb-4">
        {[
          { label: 'UV Index', value: city.uv.toString(), icon: Sun },
          { label: 'Wind', value: `${city.wind} mph`, icon: Wind },
          { label: 'Humidity', value: `${city.humidity}%`, icon: Droplets },
          { label: 'Visibility', value: `${city.visibility} mi`, icon: Eye },
          { label: 'Pressure', value: `${city.pressure}"`, icon: Gauge },
        ].map((detail) => (
          <div key={detail.label} className="rounded-[14px] p-3" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            <div className="flex items-center gap-1 mb-1">
              <detail.icon size={12} color="rgba(255,255,255,0.7)" />
              <span className="text-[11px] text-white/70">{detail.label}</span>
            </div>
            <span className="text-[20px] text-white font-medium">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
