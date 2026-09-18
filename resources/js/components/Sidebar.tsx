import { Screen } from '../data/mock';
import {
  Home, Search, Heart, MessageSquare, Bell, Plus,
  User, Shield, BarChart2, Settings, LogOut
} from './Icons';

interface Props {
  navigate: (s: Screen) => void;
  currentScreen: Screen;
  role: 'tenant' | 'owner' | 'admin';
  isOpen: boolean;
  onClose: () => void;
}

const NAV_TENANT = [
  { icon: <Home size={18}/>, label: 'Inicio', screen: 'feed' as Screen },
  { icon: <Search size={18}/>, label: 'Explorar', screen: 'feed' as Screen },
  { icon: <Heart size={18}/>, label: 'Favoritos', screen: 'favorites' as Screen },
  { icon: <MessageSquare size={18}/>, label: 'Mensajes', screen: 'messages' as Screen },
  { icon: <Bell size={18}/>, label: 'Notificaciones', screen: 'notifications' as Screen },
];

const NAV_OWNER = [
  { icon: <Home size={18}/>, label: 'Dashboard', screen: 'owner-dashboard' as Screen },
  { icon: <Plus size={18}/>, label: 'Publicar Vivienda', screen: 'publish-wizard' as Screen },
  { icon: <Search size={18}/>, label: 'Mis Propiedades', screen: 'owner-dashboard' as Screen },
  { icon: <MessageSquare size={18}/>, label: 'Mensajes', screen: 'messages' as Screen },
  { icon: <Bell size={18}/>, label: 'Notificaciones', screen: 'notifications' as Screen },
];

const NAV_ADMIN = [
  { icon: <BarChart2 size={18}/>, label: 'Dashboard', screen: 'admin-dashboard' as Screen },
  { icon: <Home size={18}/>, label: 'Propiedades', screen: 'feed' as Screen },
  { icon: <Shield size={18}/>, label: 'Moderación', screen: 'report' as Screen },
  { icon: <MessageSquare size={18}/>, label: 'Mensajes', screen: 'messages' as Screen },
];

export default function Sidebar({ navigate, currentScreen, role, isOpen, onClose }: Props) {
  const nav = role === 'admin' ? NAV_ADMIN : role === 'owner' ? NAV_OWNER : NAV_TENANT;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-black/30" onClick={onClose} />
      )}

      <aside className={`
        fixed top-14 left-0 bottom-0 z-20 w-56 bg-white border-r border-[#e5e7eb]
        flex flex-col pt-4 pb-6 transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Navigation changes according to the authenticated user */}
        <div className="px-4 mb-4 h-2" />

        <nav className="flex-1 px-2 space-y-0.5">
          {nav.map(item => (
            <button
              key={item.label}
              onClick={() => { navigate(item.screen); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentScreen === item.screen
                  ? 'bg-[#dbeafe] text-[#1E3A8A]'
                  : 'text-[#374151] hover:bg-[#f3f4f6]'
              }`}
            >
              <span className={currentScreen === item.screen ? 'text-[#1E3A8A]' : 'text-[#9ca3af]'}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Divider */}
          <div className="pt-3 pb-1"><div className="border-t border-[#f3f4f6]"/></div>

          <button
            onClick={() => { navigate('profile'); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#f3f4f6] transition-colors"
          >
            <User size={18} className="text-[#9ca3af]" /> Mi Perfil
          </button>
          <button
            onClick={() => { navigate('security-center'); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#f3f4f6] transition-colors"
          >
            <Shield size={18} className="text-[#9ca3af]" /> Seguridad
          </button>
          <button
            onClick={() => { navigate('settings'); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#f3f4f6] transition-colors"
          >
            <Settings size={18} className="text-[#9ca3af]" /> Configuración
          </button>
        </nav>

        {/* Logout */}
        <div className="px-4 pt-4 border-t border-[#f3f4f6]">
          <form action="/logout" method="POST">
            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''} />
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#dc2626] hover:bg-[#fee2e2] transition-colors"
            >
              <LogOut size={18} /> Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
