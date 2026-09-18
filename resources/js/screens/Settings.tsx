import { useState } from 'react';
import { Screen } from '../data/mock';
import { Lock, Globe, Bell, Shield, Eye } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[#1E3A8A]' : 'bg-[#d1d5db]'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`}/>
    </button>
  );
}

export default function Settings({ navigate }: Props) {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifProp, setNotifProp] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [lang, setLang] = useState('es');

  const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-4">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 bg-[#f3f4f6] rounded-lg flex items-center justify-center text-[#6b7280]">{icon}</div>
        <h3 className="font-heading font-semibold text-[#111827]">{title}</h3>
      </div>
      {children}
    </div>
  );

  const Row = ({ label, desc, control }: { label: string; desc?: string; control: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#111827]">{label}</p>
        {desc && <p className="text-xs text-[#9ca3af] mt-0.5">{desc}</p>}
      </div>
      {control}
    </div>
  );

  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-lg">
      <h2 className="font-heading font-bold text-2xl text-[#111827] mb-6">Configuración</h2>

      <Section icon={<Bell size={16}/>} title="Notificaciones">
        <Row label="Notificaciones por correo" desc="Recibe alertas en tu email" control={<Toggle on={notifEmail} onChange={setNotifEmail}/>}/>
        <Row label="Notificaciones push" desc="Alertas en el navegador" control={<Toggle on={notifPush} onChange={setNotifPush}/>}/>
        <Row label="Nuevas propiedades" desc="Coincidencias con tu búsqueda" control={<Toggle on={notifProp} onChange={setNotifProp}/>}/>
      </Section>

      <Section icon={<Eye size={16}/>} title="Privacidad">
        <Row label="Perfil público" desc="Visible para otros usuarios" control={<Toggle on={profilePublic} onChange={setProfilePublic}/>}/>
        <Row label="Mostrar teléfono" desc="En tu perfil público" control={<Toggle on={showPhone} onChange={setShowPhone}/>}/>
      </Section>

      <Section icon={<Shield size={16}/>} title="Seguridad">
        <Row label="Autenticación de dos pasos" desc="Código por SMS al iniciar sesión" control={<Toggle on={twoFactor} onChange={setTwoFactor}/>}/>
        <Row label="Cambiar contraseña" control={
          <button className="text-sm text-[#1E3A8A] font-semibold hover:underline">Cambiar</button>
        }/>
        <Row label="Sesiones activas" control={
          <button className="text-sm text-[#dc2626] font-semibold hover:underline">Cerrar todas</button>
        }/>
      </Section>

      <Section icon={<Globe size={16}/>} title="Idioma">
        <Row label="Idioma de la aplicación" control={
          <select value={lang} onChange={e => setLang(e.target.value)}
            className="border border-[#e5e7eb] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1E3A8A]">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        }/>
      </Section>

      <div className="bg-[#fee2e2] rounded-2xl border border-[#fca5a5] p-4">
        <p className="text-sm font-semibold text-[#991b1b] mb-1">Zona de peligro</p>
        <p className="text-xs text-[#991b1b]/80 mb-3">Estas acciones son permanentes e irreversibles.</p>
        <button className="text-sm text-[#dc2626] font-semibold hover:underline">Eliminar mi cuenta</button>
      </div>
    </div>
  );
}
