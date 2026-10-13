import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, ChevronDown } from 'lucide-react';

const ALBUMS = [
  { title: 'Neon Resonance', artist: 'Spectrum Pulse', cover: 'assets/album1.jpg' },
  { title: 'Aurora Echoes', artist: 'The Falling Leaves', cover: 'assets/album2.jpg' },
  { title: 'Echoes in Blue', artist: 'Celestial Drift', cover: 'assets/album3.jpg' },
  { title: 'Electric Beat', artist: 'Groove Theory', cover: 'assets/album4.jpg' },
];

const SONGS = [
  { title: 'Midnight Dreams', artist: 'Spectrum Pulse', duration: '3:42' },
  { title: 'Golden Hour', artist: 'The Falling Leaves', duration: '4:15' },
  { title: 'Ocean Waves', artist: 'Celestial Drift', duration: '5:01' },
  { title: 'Neon Lights', artist: 'Groove Theory', duration: '3:28' },
  { title: 'Starlight', artist: 'Spectrum Pulse', duration: '4:33' },
  { title: 'Summer Breeze', artist: 'The Falling Leaves', duration: '3:55' },
];

export default function MusicApp() {
  const [nowPlaying, setNowPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {nowPlaying ? (
          <motion.div
            key="player"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-center px-4 pt-3 pb-2 relative">
              <button onClick={() => setNowPlaying(false)} className="absolute left-4">
                <ChevronDown size={24} color="white" />
              </button>
              <div className="text-center">
                <div className="text-[12px] text-white/60 uppercase tracking-wider">Now Playing</div>
              </div>
            </div>

            {/* Album Art */}
            <div className="flex-1 flex items-center justify-center px-8">
              <motion.div
                animate={{ scale: isPlaying ? 1 : 0.97 }}
                transition={{ duration: 0.3 }}
                className="w-[280px] h-[280px] rounded-[12px] overflow-hidden shadow-2xl"
              >
                <img src={ALBUMS[currentSong % ALBUMS.length].cover} alt="Album" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Song Info */}
            <div className="px-8 pb-2">
              <div className="text-[22px] font-semibold text-white">{SONGS[currentSong].title}</div>
              <div className="text-[16px] text-white/60">{SONGS[currentSong].artist}</div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 py-3">
              <div className="w-full h-[4px] rounded-full bg-white/20">
                <div className="w-1/3 h-full rounded-full bg-white" />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[11px] text-white/50">1:14</span>
                <span className="text-[11px] text-white/50">{SONGS[currentSong].duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 pb-4">
              <button><Shuffle size={20} color="white" /></button>
              <button onClick={() => setCurrentSong(Math.max(0, currentSong - 1))}><SkipBack size={28} color="white" fill="white" /></button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-[64px] h-[64px] rounded-full bg-white flex items-center justify-center"
              >
                {isPlaying ? <Pause size={28} color="black" fill="black" /> : <Play size={28} color="black" fill="black" className="ml-1" />}
              </button>
              <button onClick={() => setCurrentSong(Math.min(SONGS.length - 1, currentSong + 1))}><SkipForward size={28} color="white" fill="white" /></button>
              <button><Repeat size={20} color="white" /></button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="px-4 pt-3">
              <h1 className="text-[34px] font-bold text-black mb-4">Music</h1>
              {/* Recently Added */}
              <div className="text-[20px] font-bold text-black mb-2">Recently Added</div>
              <div className="flex gap-3 overflow-x-auto pb-3">
                {ALBUMS.map((album, i) => (
                  <button key={i} onClick={() => { setCurrentSong(i); setNowPlaying(true); setIsPlaying(true); }} className="flex-shrink-0">
                    <div className="w-[140px] h-[140px] rounded-[8px] overflow-hidden">
                      <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[13px] font-medium text-black mt-1 text-left truncate w-[140px]">{album.title}</div>
                    <div className="text-[11px] text-gray-500 text-left">{album.artist}</div>
                  </button>
                ))}
              </div>

              {/* Songs List */}
              <div className="text-[20px] font-bold text-black mb-2 mt-2">Songs</div>
              {SONGS.map((song, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentSong(i); setNowPlaying(true); setIsPlaying(true); }}
                  className="w-full flex items-center gap-3 py-2 text-left"
                >
                  <div className="w-[44px] h-[44px] rounded-[6px] overflow-hidden">
                    <img src={ALBUMS[i % ALBUMS.length].cover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] text-black truncate">{song.title}</div>
                    <div className="text-[12px] text-gray-500">{song.artist}</div>
                  </div>
                  <span className="text-[13px] text-gray-400">{song.duration}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
