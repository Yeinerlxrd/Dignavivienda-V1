import { useState } from 'react';
import { Screen, CURRENT_USER } from '../data/mock';
import { Edit2, Star, CheckCircle, Phone, Award } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

const TABS = ['Mi Perfil', 'Editar Perfil', 'Reseñas'];

const REVIEWS = [
  { from: 'Carlos M.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format', rating: 5, text: 'Excelente inquilina, muy responsable y puntual con los pagos. Totalmente recomendada.', date: 'Agosto 2026', role: 'Propietario' },
  { from: 'Rosa E.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format', rating: 5, text: 'Muy buena comunicación y respetó todas las normas del inmueble. Sin problemas en absoluto.', date: 'Junio 2026', role: 'Propietario' },
  { from: 'Jorge S.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format', rating: 4, text: 'Buen trato, cumplió con lo acordado. Recomendada.', date: 'Abril 2026', role: 'Propietario' },
];

export default function UserProfile({ navigate }: Props) {
  const [tab, setTab] = useState(0);
  const u = CURRENT_USER;
  const [editForm, setEditForm] = useState({ name: u.name, email: u.email, phone: u.phone });

  return (
    <div className="screen-enter px-4 lg:px-8 py-6 max-w-2xl">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img src={u.photo} alt={u.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-[#dbeafe]"/>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#059669] rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle size={10} className="text-white"/>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-heading font-bold text-xl text-[#111827]">{u.name}</h2>
              <span className="badge-verified"><CheckCircle size={10}/>Verificado</span>
            </div>
            <p className="text-[#6b7280] text-sm">{u.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(u.rating) ? 'text-[#F59E0B]' : 'text-[#e5e7eb]'} style={i < Math.floor(u.rating) ? {fill:'currentColor'} : {}}/>
                ))}
                <span className="text-xs font-semibold text-[#374151] ml-1">{u.rating}</span>
              </div>
              <span className="text-xs text-[#9ca3af]">{u.reviewCount} reseñas</span>
              <span className="text-xs text-[#9ca3af]">Desde {u.joinedAt}</span>
            </div>
          </div>
          <button onClick={() => setTab(1)} className="p-2 rounded-xl border border-[#e5e7eb] hover:bg-[#f3f4f6] transition-colors text-[#6b7280]">
            <Edit2 size={15}/>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#f3f4f6] p-1 rounded-xl mb-5 w-fit">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === i ? 'bg-white text-[#1E3A8A] shadow-sm' : 'text-[#6b7280] hover:text-[#374151]'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 space-y-4">
          <h3 className="font-heading font-semibold text-[#111827]">Información Personal</h3>
          {[
            { label: 'Nombre completo', value: u.name },
            { label: 'Correo electrónico', value: u.email },
            { label: 'Teléfono', value: u.phone },
            { label: 'Rol', value: u.role === 'tenant' ? 'Inquilino' : 'Propietario' },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between py-3 border-b border-[#f3f4f6] last:border-0">
              <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">{f.label}</span>
              <span className="text-sm text-[#111827] font-medium">{f.value}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 bg-[#f0fdf4] rounded-xl p-3 mt-2">
            <Award size={16} className="text-[#059669]"/>
            <p className="text-xs text-[#065f46]">Tu identidad ha sido verificada. Eres un miembro de confianza de DignaVivienda.</p>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 space-y-4">
          <h3 className="font-heading font-semibold text-[#111827]">Editar Perfil</h3>
          {[
            { label: 'Nombre completo', key: 'name', type: 'text' },
            { label: 'Correo electrónico', key: 'email', type: 'email' },
            { label: 'Teléfono', key: 'phone', type: 'tel' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-[#374151] uppercase tracking-wide mb-1.5">{f.label}</label>
              <input
                type={f.type}
                value={(editForm as any)[f.key]}
                onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] transition-all"
              />
            </div>
          ))}
          <div className="pt-2">
            <button className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-xl text-sm transition-colors">
              Guardar cambios
            </button>
          </div>
        </div>
      )}

      {tab === 2 && (
        <div className="space-y-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e5e7eb] p-4">
              <div className="flex items-start gap-3">
                <img src={r.photo} alt={r.from} className="w-10 h-10 rounded-full object-cover flex-shrink-0"/>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-[#111827]">{r.from}</p>
                      <p className="text-xs text-[#9ca3af]">{r.role} · {r.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < r.rating ? 'text-[#F59E0B]' : 'text-[#e5e7eb]'} style={j < r.rating ? {fill:'currentColor'} : {}}/>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#374151] mt-2 leading-relaxed">{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
