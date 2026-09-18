import { useState } from 'react';
import { Screen } from '../data/mock';
import { Flag, ChevronLeft, CheckCircle } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

const REASONS = [
  'Precio irreal o engañoso',
  'Fotos falsas o de otro inmueble',
  'Intento de estafa o fraude',
  'Propiedad no existe',
  'Información incompleta o falsa',
  'Comportamiento inapropiado del usuario',
  'Otro',
];

export default function Report({ navigate }: Props) {
  const [target, setTarget] = useState<'property' | 'user'>('property');
  const [reason, setReason] = useState('');
  const [detail, setDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="screen-enter flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#059669]"/>
          </div>
          <h3 className="font-heading font-bold text-xl text-[#111827] mb-2">Reporte enviado</h3>
          <p className="text-[#6b7280] text-sm mb-6">Gracias por ayudarnos a mantener la plataforma segura. Revisaremos tu reporte en las próximas 24 horas.</p>
          <button onClick={() => navigate('feed')} className="bg-[#1E3A8A] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#1e40af] transition-colors">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-lg mx-auto">
      <button onClick={() => navigate('feed')} className="flex items-center gap-1.5 text-[#6b7280] text-sm mb-6 hover:text-[#1E3A8A] transition-colors">
        <ChevronLeft size={16}/> Volver
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#fee2e2] rounded-xl flex items-center justify-center">
          <Flag size={18} className="text-[#dc2626]"/>
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-[#111827]">Reportar</h2>
          <p className="text-[#6b7280] text-sm">Ayúdanos a mantener la comunidad segura</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 space-y-5">
        {/* Target */}
        <div>
          <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">¿Qué deseas reportar?</label>
          <div className="grid grid-cols-2 gap-2">
            {(['property', 'user'] as const).map(t => (
              <button key={t} onClick={() => setTarget(t)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${target === t ? 'border-[#dc2626] bg-[#fee2e2] text-[#dc2626]' : 'border-[#e5e7eb] text-[#374151]'}`}>
                {t === 'property' ? '🏠 Publicación' : '👤 Usuario'}
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">Motivo del reporte</label>
          <div className="space-y-2">
            {REASONS.map(r => (
              <label key={r} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors">
                <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="accent-[#dc2626]"/>
                <span className="text-sm text-[#374151]">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div>
          <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">Descripción adicional (opcional)</label>
          <textarea
            value={detail}
            onChange={e => setDetail(e.target.value)}
            placeholder="Proporciona más detalles sobre el problema…"
            rows={3}
            className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#dc2626] transition-all resize-none"
          />
        </div>

        <button
          onClick={() => reason && setSubmitted(true)}
          disabled={!reason}
          className="w-full bg-[#dc2626] hover:bg-[#b91c1c] disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Flag size={15}/> Enviar reporte
        </button>
      </div>
    </div>
  );
}
