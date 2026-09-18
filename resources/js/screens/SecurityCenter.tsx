import { useState } from 'react';
import { Screen } from '../data/mock';
import { Shield, AlertTriangle, Lock, CheckCircle, Flag, Info, Globe } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

const TIPS = [
  { icon: <Lock size={18} className="text-[#1E3A8A]"/>, bg: 'bg-[#dbeafe]', title: 'Nunca pagues sin contrato', body: 'No realices ningún pago antes de firmar el contrato digital en la plataforma. Si un propietario te pide un depósito por fuera, es una señal de alerta.' },
  { icon: <Shield size={18} className="text-[#059669]"/>, bg: 'bg-[#d1fae5]', title: 'Verifica la identidad', body: 'Solo interactúa con propietarios que tengan el sello de "Identidad Verificada". Puedes ver el estado de verificación en el perfil de cada usuario.' },
  { icon: <AlertTriangle size={18} className="text-[#92400e]"/>, bg: 'bg-[#fef3c7]', title: 'Desconfía de precios muy bajos', body: 'Un precio significativamente menor al mercado puede ser una trampa. Investiga el promedio de arriendo en el barrio antes de comprometerte.' },
  { icon: <Globe size={18} className="text-[#7c3aed]"/>, bg: 'bg-[#ede9fe]', title: 'Usa los canales de la plataforma', body: 'Todas las comunicaciones y pagos deben hacerse a través de DignaVivienda. Nunca compartas tu contraseña ni información bancaria por mensajes.' },
  { icon: <CheckCircle size={18} className="text-[#059669]"/>, bg: 'bg-[#d1fae5]', title: 'Visita la propiedad antes de firmar', body: 'Siempre agenda una visita presencial antes de comprometerte. Si el propietario se niega a mostrarte la propiedad, desconfía.' },
  { icon: <Flag size={18} className="text-[#dc2626]"/>, bg: 'bg-[#fee2e2]', title: 'Reporta actividad sospechosa', body: 'Si detectas una publicación falsa o intentos de fraude, repórtalo inmediatamente usando el botón "Reportar" en la publicación.' },
];

export default function SecurityCenter({ navigate }: Props) {
  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-3xl">
      {/* Header */}
      <div className="bg-[#1E3A8A] rounded-2xl p-6 mb-6 flex items-start gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Shield size={24} className="text-white"/>
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-white mb-1">Centro de Seguridad</h2>
          <p className="text-white/70 text-sm">Aprende a usar DignaVivienda de manera segura y protégete de fraudes en el mercado de alquiler.</p>
        </div>
      </div>

      {/* Tips grid */}
      <h3 className="font-heading font-semibold text-[#111827] mb-4">Consejos para evitar fraudes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {TIPS.map((tip, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#e5e7eb] p-4">
            <div className={`w-9 h-9 ${tip.bg} rounded-xl flex items-center justify-center mb-3`}>{tip.icon}</div>
            <h4 className="font-heading font-semibold text-[#111827] text-sm mb-1">{tip.title}</h4>
            <p className="text-xs text-[#6b7280] leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </div>

      {/* Report button */}
      <div className="bg-[#fee2e2] rounded-2xl border border-[#fca5a5] p-5 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Flag size={20} className="text-[#dc2626] flex-shrink-0 mt-0.5"/>
          <div>
            <p className="font-semibold text-[#991b1b] text-sm">¿Encontraste algo sospechoso?</p>
            <p className="text-xs text-[#991b1b]/80">Ayúdanos a mantener la plataforma segura reportando publicaciones o usuarios.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('report')}
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-4 py-2 rounded-xl text-sm flex-shrink-0 transition-colors"
        >
          Reportar
        </button>
      </div>

      {/* Legal links */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
        <h3 className="font-heading font-semibold text-[#111827] mb-3 flex items-center gap-2">
          <Info size={16} className="text-[#6b7280]"/>
          Marco Legal Colombiano
        </h3>
        <div className="space-y-2">
          {[
            { name: 'Ley 1581 de 2012', desc: 'Protección de Datos Personales en Colombia' },
            { name: 'Ley 527 de 1999', desc: 'Firmas y documentos digitales con validez legal' },
            { name: 'Ley 820 de 2003', desc: 'Régimen de arrendamiento de vivienda urbana' },
            { name: 'Decreto 1260 de 2023', desc: 'Reglamentación de plataformas de alquiler' },
          ].map(l => (
            <div key={l.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f9fafb] transition-colors cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-[#1E3A8A] flex-shrink-0"/>
              <div>
                <p className="text-sm font-semibold text-[#1E3A8A]">{l.name}</p>
                <p className="text-xs text-[#6b7280]">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
