import { useState } from 'react';
import { ChevronLeft, Plus, Share2, Trash2 } from 'lucide-react';

const DEFAULT_NOTES = [
  { id: 1, title: 'Grocery List', body: '- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee', date: 'Today' },
  { id: 2, title: 'Meeting Notes', body: 'Discuss Q3 goals:\n- Revenue target: $2M\n- New hires: 5 engineers\n- Product launch: September', date: 'Yesterday' },
  { id: 3, title: 'iOS 26 Ideas', body: '- Liquid Glass everywhere\n- Spatial multitasking\n- Neural engine UI\n- True Tone v2', date: '2 days ago' },
  { id: 4, title: 'Vacation Plans', body: 'Hawaii trip:\n- Book flights by Friday\n- Hotel: Hilton Waikiki\n- Rent a car', date: 'Last week' },
];

export default function NotesApp() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [editingBody, setEditingBody] = useState('');

  const handleSave = () => {
    if (selectedNote !== null) {
      setNotes(notes.map((n) => n.id === selectedNote ? { ...n, body: editingBody } : n));
    }
  };

  const activeNote = notes.find((n) => n.id === selectedNote);

  if (selectedNote !== null && activeNote) {
    return (
      <div className="absolute inset-0 bg-white flex flex-col">
        <div className="flex items-center justify-between px-2 py-2 border-b border-gray-200 bg-white/90 shrink-0">
          <button onClick={() => { handleSave(); setSelectedNote(null); }} className="flex items-center text-[#007aff]">
            <ChevronLeft size={20} />
            <span className="text-[17px]">Notes</span>
          </button>
          <span className="text-[12px] text-gray-500">{activeNote.date}</span>
          <div className="flex gap-3">
            <button><Share2 size={18} color="#007aff" /></button>
            <button><Trash2 size={18} color="#ff3b30" /></button>
          </div>
        </div>
        <div className="text-[22px] font-bold text-black px-4 pt-3">{activeNote.title}</div>
        <textarea
          value={editingBody}
          onChange={(e) => setEditingBody(e.target.value)}
          className="flex-1 p-4 text-[16px] text-black bg-transparent outline-none resize-none"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-white/90 shrink-0">
        <span className="text-[13px] text-[#007aff]">Folders</span>
        <span className="text-[17px] font-semibold text-black">All Notes</span>
        <span className="text-[28px] text-[#007aff]">
          <Plus size={24} />
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <button
            key={note.id}
            className="w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
            onClick={() => { setSelectedNote(note.id); setEditingBody(note.body); }}
          >
            <div className="text-[16px] font-semibold text-black">{note.title}</div>
            <div className="text-[13px] text-gray-500 mt-0.5 line-clamp-1">{note.body.replace(/\n/g, ' ')}</div>
            <div className="text-[11px] text-gray-400 mt-1">{note.date}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
