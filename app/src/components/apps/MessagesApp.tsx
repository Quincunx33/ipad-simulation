import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Camera, Mic, AppWindow } from 'lucide-react';

const CONVERSATIONS = [
  { id: 1, name: 'Tasfia', message: 'Hey! Did you see the new iOS update? It looks amazing!', time: '5m', unread: 2, color: '#e74c3c' },
  { id: 2, name: 'Mom', message: 'Call me when you can. Love you!', time: '30m', unread: 1, color: '#e67e22' },
  { id: 3, name: 'Work Group', message: 'Meeting at 3 PM today', time: '1h', unread: 0, color: '#3498db' },
  { id: 4, name: 'Alex', message: 'Want to grab lunch tomorrow?', time: '2h', unread: 0, color: '#2ecc71' },
  { id: 5, name: 'Lisa', message: 'Thanks for the help!', time: '3h', unread: 0, color: '#9b59b6' },
];

const CHAT_MESSAGES = [
  { id: 1, text: 'Hey! Did you see the new iOS update?', sent: false },
  { id: 2, text: 'Yes! iOS 26 looks incredible with the Liquid Glass UI!', sent: true },
  { id: 3, text: 'The spatial multitasking is a game changer', sent: false },
  { id: 4, text: 'I know right?! I can\'t wait to try it on my iPad', sent: true },
  { id: 5, text: 'Let me know how it goes!', sent: false },
];

export default function MessagesApp() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(CHAT_MESSAGES);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: inputText, sent: true }]);
    setInputText('');
  };

  if (selectedChat !== null) {
    const chat = CONVERSATIONS.find((c) => c.id === selectedChat);
    return (
      <div className="absolute inset-0 bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center px-2 py-2 bg-white/90 border-b border-gray-200 shrink-0">
          <button onClick={() => setSelectedChat(null)} className="flex items-center text-[#007aff]">
            <ChevronLeft size={20} />
            <span className="text-[17px]">Messages</span>
          </button>
          <div className="absolute left-0 right-0 text-center pointer-events-none">
            <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center text-white text-[14px] font-semibold"
              style={{ background: chat?.color }}>
              {chat?.name[0]}
            </div>
            <span className="text-[13px] text-black font-medium">{chat?.name}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#f2f2f7]">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-[18px] text-[15px] ${
                  msg.sent
                    ? 'bg-[#007aff] text-white rounded-br-[4px]'
                    : 'bg-[#e5e5ea] text-black rounded-bl-[4px]'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white border-t border-gray-200 shrink-0">
          <button><Camera size={22} color="#007aff" /></button>
          <button><AppWindow size={22} color="#007aff" /></button>
          <div className="flex-1 bg-[#f2f2f7] rounded-[18px] px-3 py-1.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="iMessage"
              className="w-full bg-transparent text-[16px] outline-none"
            />
          </div>
          {inputText ? (
            <button onClick={handleSend} className="text-[#007aff] text-[17px] font-medium">Send</button>
          ) : (
            <button><Mic size={22} color="#007aff" /></button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      <div className="px-4 pt-3 pb-2 bg-white/90 shrink-0">
        <div className="text-[34px] font-bold text-black mb-2">Messages</div>
        <div className="flex items-center bg-[#e5e5ea] rounded-[10px] px-3 h-[36px]">
          <span className="text-gray-500 text-[17px]">Search</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {CONVERSATIONS.map((conv) => (
          <button
            key={conv.id}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left"
            onClick={() => setSelectedChat(conv.id)}
          >
            <div
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-white text-[18px] font-semibold shrink-0"
              style={{ background: conv.color }}
            >
              {conv.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <span className="text-[16px] font-semibold text-black">{conv.name}</span>
                <span className="ml-auto text-[13px] text-gray-500">{conv.time}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[14px] text-gray-500 truncate">{conv.message}</span>
                {conv.unread > 0 && (
                  <div className="ml-2 min-w-[20px] h-[20px] rounded-full bg-[#007aff] flex items-center justify-center">
                    <span className="text-[12px] text-white font-medium">{conv.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
