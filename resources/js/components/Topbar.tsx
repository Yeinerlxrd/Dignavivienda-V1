import { Screen, NOTIFICATIONS } from '../data/mock';
import { Bell, MessageSquare, Menu } from './Icons';

interface Props {
  navigate: (s: Screen) => void;
  currentScreen: Screen;
  onMenuToggle: () => void;
  unreadNotifs: number;
  unreadMsgs: number;
}

export default function Topbar({ navigate, currentScreen, onMenuToggle, unreadNotifs, unreadMsgs }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-[#e5e7eb] h-14 flex items-center px-4 lg:px-6">
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="lg:hidden p-1.5 rounded-lg text-[#374151] hover:bg-[#f3f4f6]">
          <Menu size={20} />
        </button>
        <button onClick={() => navigate('feed')} className="flex items-center gap-2 font-heading font-bold text-[#1E3A8A] text-base">
          <div className="w-7 h-7 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white"/>
            </svg>
          </div>
          DignaVivienda
        </button>
      </div>

      {/* Center: search bar (desktop) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="w-full relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            placeholder="Buscar por barrio, precio…"
            className="w-full pl-9 pr-4 py-2 bg-[#f3f4f6] border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="ml-auto flex items-center gap-1">
        <IconBtn onClick={() => navigate('notifications')} badge={unreadNotifs}>
          <Bell size={18} />
        </IconBtn>
        <IconBtn onClick={() => navigate('messages')} badge={unreadMsgs}>
          <MessageSquare size={18} />
        </IconBtn>
        <button
          onClick={() => navigate('profile')}
          className="ml-1 w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#e5e7eb] hover:ring-[#1E3A8A] transition-all"
        >
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format"
            alt="Mi perfil"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}

function IconBtn({ onClick, badge, children }: { onClick: () => void; badge?: number; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="relative p-2 rounded-xl text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1E3A8A] transition-colors">
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-[#dc2626] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}
