import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Plus, Globe, AlarmClock, Timer, Hourglass } from 'lucide-react';

const WORLD_CLOCKS = [
  { city: 'Cupertino', timezone: 'America/Los_Angeles', offset: 'Today, -0 HRS' },
  { city: 'New York', timezone: 'America/New_York', offset: 'Today, +3 HRS' },
  { city: 'London', timezone: 'Europe/London', offset: 'Today, +8 HRS' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 'Tomorrow, +17 HRS' },
  { city: 'Sydney', timezone: 'Australia/Sydney', offset: 'Tomorrow, +19 HRS' },
];

const ALARMS = [
  { time: '7:00 AM', label: 'Wake Up', enabled: true },
  { time: '8:30 AM', label: 'Meeting', enabled: false },
  { time: '10:00 PM', label: 'Bedtime', enabled: true },
];

function AnalogClock({ timezone }: { timezone: string }) {
  const currentTime = useStore((s) => s.currentTime);
  const date = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  return (
    <svg viewBox="0 0 100 100" className="w-[50px] h-[50px]">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#333" strokeWidth="1" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="50" y1="8" x2="50" y2="14" stroke="#333" strokeWidth="1.5"
          transform={`rotate(${i * 30} 50 50)`} />
      ))}
      <line x1="50" y1="50" x2="50" y2="28" stroke="#333" strokeWidth="2" strokeLinecap="round"
        transform={`rotate(${hourDeg} 50 50)`} />
      <line x1="50" y1="50" x2="50" y2="18" stroke="#666" strokeWidth="1.5" strokeLinecap="round"
        transform={`rotate(${minuteDeg} 50 50)`} />
      <line x1="50" y1="50" x2="50" y2="16" stroke="#ff3b30" strokeWidth="0.8" strokeLinecap="round"
        transform={`rotate(${secondDeg} 50 50)`} />
      <circle cx="50" cy="50" r="3" fill="#ff3b30" />
    </svg>
  );
}

function WorldClockTab() {
  return (
    <div className="flex-1 overflow-y-auto">
      {WORLD_CLOCKS.map((clock, i) => (
        <div key={i} className="flex items-center px-4 py-3 border-b border-gray-200">
          <div className="flex-1">
            <div className="text-[28px] font-extralight text-black">
              {new Date().toLocaleTimeString('en-US', { timeZone: clock.timezone, hour: 'numeric', minute: '2-digit', hour12: true })}
            </div>
            <div className="text-[13px] text-gray-500">{clock.offset}</div>
          </div>
          <div className="mr-4">
            <AnalogClock timezone={clock.timezone} />
          </div>
          <div className="text-right">
            <div className="text-[17px] text-black">{clock.city}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlarmTab() {
  return (
    <div className="flex-1 overflow-y-auto px-4">
      <div className="text-[13px] text-gray-500 py-2">Sleep | Wake Up</div>
      {ALARMS.map((alarm, i) => (
        <div key={i} className="py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-[48px] font-extralight ${alarm.enabled ? 'text-black' : 'text-gray-400'}`}>
                {alarm.time}
              </div>
              <div className={`text-[13px] ${alarm.enabled ? 'text-gray-500' : 'text-gray-300'}`}>{alarm.label}</div>
            </div>
            <div
              className="w-[51px] h-[31px] rounded-full relative"
              style={{ background: alarm.enabled ? '#34c759' : '#e5e5ea' }}
            >
              <motion.div
                className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-sm"
                animate={{ left: alarm.enabled ? '22px' : '2px' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StopwatchTab() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running) {
      interval = setInterval(() => setElapsed((e) => e + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const format = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="text-[64px] font-extralight text-black tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {format(elapsed)}
      </div>
      <div className="flex gap-8 mt-8">
        <button
          onClick={() => setElapsed(0)}
          className="w-[72px] h-[72px] rounded-full bg-gray-200 flex items-center justify-center text-[16px] text-black"
        >
          Reset
        </button>
        <button
          onClick={() => setRunning(!running)}
          className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-[16px] ${running ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button className="w-[72px] h-[72px] rounded-full bg-gray-200 flex items-center justify-center text-[16px] text-black">
          Lap
        </button>
      </div>
    </div>
  );
}

function TimerTab() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    }
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const progress = timeLeft / 300;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative w-[240px] h-[240px]">
        <svg viewBox="0 0 240 240" className="w-full h-full -rotate-90">
          <circle cx="120" cy="120" r="110" fill="none" stroke="#e5e5ea" strokeWidth="8" />
          <circle
            cx="120" cy="120" r="110"
            fill="none"
            stroke={timeLeft === 0 ? '#ff3b30' : '#007aff'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 110}`}
            strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress)}`}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[48px] font-extralight text-black" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <button onClick={() => { setRunning(false); setTimeLeft(300); }} className="w-[72px] h-[72px] rounded-full bg-gray-200 text-[16px] text-black">
          Cancel
        </button>
        <button
          onClick={() => timeLeft > 0 && setRunning(!running)}
          className={`w-[72px] h-[72px] rounded-full text-[16px] ${running ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {running ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}

export default function ClockApp() {
  const [tab, setTab] = useState('world');

  const tabs = [
    { key: 'world', label: 'World Clock', icon: Globe },
    { key: 'alarm', label: 'Alarm', icon: AlarmClock },
    { key: 'stopwatch', label: 'Stopwatch', icon: Timer },
    { key: 'timer', label: 'Timer', icon: Hourglass },
  ];

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="w-8" />
        <span className="text-[17px] font-semibold text-black">
          {tabs.find((t) => t.key === tab)?.label}
        </span>
        <button><Plus size={22} color="#007aff" /></button>
      </div>

      {/* Content */}
      {tab === 'world' && <WorldClockTab />}
      {tab === 'alarm' && <AlarmTab />}
      {tab === 'stopwatch' && <StopwatchTab />}
      {tab === 'timer' && <TimerTab />}

      {/* Tab Bar */}
      <div className="flex items-center justify-around py-2 border-t border-gray-200 bg-white/90 shrink-0">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className="flex flex-col items-center gap-0.5">
            <t.icon size={20} color={tab === t.key ? '#007aff' : '#8e8e93'} />
            <span className={`text-[10px] ${tab === t.key ? 'text-[#007aff]' : 'text-[#8e8e93]'}`}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
