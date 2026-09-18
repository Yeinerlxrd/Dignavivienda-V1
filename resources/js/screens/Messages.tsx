import { useState } from 'react';
import { Screen, CONVERSATIONS } from '../data/mock';
import { Send, ChevronLeft } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

export default function Messages({ navigate }: Props) {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [text, setText] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const active = CONVERSATIONS.find(c => c.id === activeId)!;

  const handleSend = () => {
    if (!text.trim()) return;
    setText('');
  };

  return (
    <div className="screen-enter h-[calc(100vh-3.5rem)] flex">
      {/* Conversations list */}
      <div className={`w-full lg:w-72 xl:w-80 flex-shrink-0 bg-white border-r border-[#e5e7eb] flex flex-col ${mobileView === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 border-b border-[#f3f4f6]">
          <h2 className="font-heading font-bold text-[#111827]">Mensajes</h2>
          <p className="text-xs text-[#6b7280]">{CONVERSATIONS.reduce((a, c) => a + c.unread, 0)} sin leer</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {CONVERSATIONS.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setActiveId(conv.id); setMobileView('chat'); }}
              className={`w-full flex items-start gap-3 p-4 border-b border-[#f9fafb] hover:bg-[#f9fafb] transition-colors text-left ${activeId === conv.id ? 'bg-[#eff6ff]' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <img src={conv.otherPhoto} alt={conv.otherUser} className="w-10 h-10 rounded-full object-cover"/>
                {conv.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1E3A8A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">{conv.unread}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-[#111827] truncate">{conv.otherUser}</p>
                  <span className="text-xs text-[#9ca3af] flex-shrink-0">{conv.lastTime}</span>
                </div>
                <p className="text-xs text-[#6b7280] truncate">{conv.propertyTitle}</p>
                <p className={`text-xs truncate mt-0.5 ${conv.unread > 0 ? 'font-semibold text-[#111827]' : 'text-[#9ca3af]'}`}>{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className={`flex-1 flex flex-col bg-[#f9fafb] ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}`}>
        {/* Chat header */}
        <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileView('list')} className="lg:hidden p-1 text-[#6b7280] hover:text-[#1E3A8A]">
            <ChevronLeft size={18}/>
          </button>
          <img src={active.otherPhoto} alt={active.otherUser} className="w-9 h-9 rounded-full object-cover"/>
          <div>
            <p className="font-semibold text-sm text-[#111827]">{active.otherUser}</p>
            <p className="text-xs text-[#059669]">● En línea · {active.propertyTitle}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {active.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'them' && (
                <img src={active.otherPhoto} alt="" className="w-7 h-7 rounded-full object-cover mr-2 self-end flex-shrink-0"/>
              )}
              <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.from === 'me'
                  ? 'bg-[#1E3A8A] text-white rounded-br-sm'
                  : 'bg-white border border-[#e5e7eb] text-[#111827] rounded-bl-sm'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-white/60' : 'text-[#9ca3af]'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-[#e5e7eb] p-3 flex gap-3 items-end">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
            placeholder="Escribe un mensaje…"
            rows={1}
            className="flex-1 border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-[#1E3A8A] transition-colors"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-[#1E3A8A] hover:bg-[#1e40af] text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <Send size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}
