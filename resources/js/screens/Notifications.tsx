import { useState } from 'react';
import { Screen, NOTIFICATIONS, Notification } from '../data/mock';
import { Bell, MessageSquare, Home, CheckCircle, Shield } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

const ICON_MAP: Record<Notification['type'], React.ReactNode> = {
  message: <MessageSquare size={16} className="text-[#1E3A8A]"/>,
  request: <Home size={16} className="text-[#059669]"/>,
  property: <Home size={16} className="text-[#F59E0B]"/>,
  verify: <Shield size={16} className="text-[#059669]"/>,
};

const BG_MAP: Record<Notification['type'], string> = {
  message: 'bg-[#dbeafe]',
  request: 'bg-[#d1fae5]',
  property: 'bg-[#fef3c7]',
  verify: 'bg-[#d1fae5]',
};

export default function Notifications({ navigate }: Props) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-[#111827]">Notificaciones</h2>
          <p className="text-[#6b7280] text-sm">{notifs.filter(n => !n.read).length} sin leer</p>
        </div>
        {notifs.some(n => !n.read) && (
          <button onClick={markAllRead} className="text-sm text-[#1E3A8A] hover:underline font-medium">
            Marcar todo como leído
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifs.map(n => (
          <div
            key={n.id}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? {...x, read: true} : x))}
            className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
              n.read ? 'bg-white border border-[#f3f4f6] hover:border-[#e5e7eb]' : 'bg-[#eff6ff] border border-[#bfdbfe]'
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${BG_MAP[n.type]}`}>
              {ICON_MAP[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${n.read ? 'text-[#374151]' : 'text-[#111827] font-medium'}`}>{n.text}</p>
              <p className="text-xs text-[#9ca3af] mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-[#1E3A8A] flex-shrink-0 mt-1.5"/>}
          </div>
        ))}
      </div>
    </div>
  );
}
