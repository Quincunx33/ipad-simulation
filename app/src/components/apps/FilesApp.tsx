import { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, ChevronLeft, FileText, Image, Music, File } from 'lucide-react';

const FILE_STRUCTURE = [
  { name: 'iCloud Drive', type: 'folder', count: '12 items', color: '#007aff' },
  { name: 'On My iPad', type: 'folder', count: '8 items', color: '#5ac8fa' },
  { name: 'Downloads', type: 'folder', count: '24 items', color: '#8e8e93' },
  { name: 'Recently Deleted', type: 'folder', count: '3 items', color: '#ff3b30' },
];

const RECENT_FILES = [
  { name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', date: 'Today' },
  { name: 'Vacation Photo.jpg', type: 'image', size: '4.1 MB', date: 'Yesterday' },
  { name: 'Meeting Notes.txt', type: 'text', size: '12 KB', date: 'Yesterday' },
  { name: 'Song Demo.mp3', type: 'audio', size: '8.5 MB', date: '2 days ago' },
  { name: 'Budget.xlsx', type: 'file', size: '156 KB', date: 'Last week' },
  { name: 'Presentation.pptx', type: 'file', size: '3.2 MB', date: 'Last week' },
];

export default function FilesApp() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  if (currentFolder) {
    return (
      <div className="absolute inset-0 bg-white flex flex-col">
        <div className="flex items-center px-2 py-2 border-b border-gray-200 bg-white/90 shrink-0">
          <button onClick={() => setCurrentFolder(null)} className="flex items-center text-[#007aff]">
            <ChevronLeft size={20} />
            <span className="text-[17px]">Browse</span>
          </button>
          <span className="absolute left-0 right-0 text-center text-[17px] font-semibold text-black pointer-events-none">{currentFolder}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {RECENT_FILES.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-[12px] bg-[#f2f2f7] p-3 flex flex-col items-center"
              >
                <div className="w-[50px] h-[60px] rounded-[6px] bg-white flex items-center justify-center mb-2 shadow-sm">
                  {file.type === 'image' ? <Image size={24} color="#34c759" /> :
                   file.type === 'audio' ? <Music size={24} color="#af52de" /> :
                   file.type === 'pdf' ? <FileText size={24} color="#ff3b30" /> :
                   <File size={24} color="#007aff" />}
                </div>
                <span className="text-[12px] text-black text-center truncate w-full">{file.name}</span>
                <span className="text-[10px] text-gray-500">{file.size}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      <div className="px-4 pt-3 pb-2 bg-white/90 shrink-0">
        <h1 className="text-[34px] font-bold text-black">Browse</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        {/* Locations */}
        <div className="text-[13px] text-gray-500 uppercase mb-2 mt-2">Locations</div>
        {FILE_STRUCTURE.map((folder, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 py-3 border-b border-gray-100 text-left"
            onClick={() => setCurrentFolder(folder.name)}
          >
            <Folder size={28} color={folder.color} fill={folder.color} />
            <div className="flex-1">
              <div className="text-[16px] text-black">{folder.name}</div>
              <div className="text-[13px] text-gray-500">{folder.count}</div>
            </div>
            <ChevronLeft size={18} color="#c7c7cc" className="rotate-180" />
          </button>
        ))}

        {/* Recent Files */}
        <div className="text-[13px] text-gray-500 uppercase mb-2 mt-4">Recent Files</div>
        {RECENT_FILES.map((file, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#f2f2f7] flex items-center justify-center">
              {file.type === 'image' ? <Image size={18} color="#34c759" /> :
               file.type === 'audio' ? <Music size={18} color="#af52de" /> :
               file.type === 'pdf' ? <FileText size={18} color="#ff3b30" /> :
               <File size={18} color="#007aff" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-black truncate">{file.name}</div>
              <div className="text-[11px] text-gray-500">{file.size} · {file.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
