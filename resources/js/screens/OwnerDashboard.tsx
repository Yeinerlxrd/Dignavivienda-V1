import { useState } from 'react';
import { Screen, PROPERTIES, Property, fmtPrice } from '../data/mock';
import { Plus, Eye, Edit2, Trash2, TrendingUp, Users, DollarSign, Home, Check, X, ChevronRight } from '../components/Icons';

interface Props { navigate: (s: Screen, data?: Property) => void }

const TABS = ['Mis Propiedades', 'Solicitudes'];

export default function OwnerDashboard({ navigate }: Props) {
  const [tab, setTab] = useState(0);
  const myProps = PROPERTIES.filter(p => p.ownerId === 'u2'); // Carlos = demo owner

  const totalVisits = myProps.reduce((a, p) => a + p.visits, 0);
  const totalRequests = myProps.reduce((a, p) => a + p.requests, 0);
  const estimatedIncome = myProps.filter(p => p.status === 'active').reduce((a, p) => a + p.price, 0);

  return (
    <div className="screen-enter px-4 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-[#111827]">Mi Dashboard</h2>
          <p className="text-[#6b7280] text-sm">Bienvenido, Carlos Méndez</p>
        </div>
        <button
          onClick={() => navigate('publish-wizard')}
          className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus size={16}/> Publicar
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard icon={<Home size={20} className="text-[#1E3A8A]"/>} bg="bg-[#dbeafe]" label="Propiedades activas" value={`${myProps.filter(p => p.status === 'active').length}`}/>
        <KpiCard icon={<Eye size={20} className="text-[#059669]"/>} bg="bg-[#d1fae5]" label="Total visitas" value={`${totalVisits}`}/>
        <KpiCard icon={<Users size={20} className="text-[#F59E0B]"/>} bg="bg-[#fef3c7]" label="Solicitudes" value={`${totalRequests}`}/>
        <KpiCard icon={<DollarSign size={20} className="text-[#7c3aed]"/>} bg="bg-[#ede9fe]" label="Ingreso estimado" value={`$${(estimatedIncome/1000).toFixed(0)}k`}/>
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

      {tab === 0 ? (
        <PropertiesTable properties={myProps} navigate={navigate}/>
      ) : (
        <Requests/>
      )}
    </div>
  );
}

function KpiCard({ icon, bg, label, value }: { icon: React.ReactNode; bg: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4">
      <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
      <p className="font-heading font-bold text-2xl text-[#111827]">{value}</p>
      <p className="text-xs text-[#6b7280]">{label}</p>
    </div>
  );
}

function PropertiesTable({ properties, navigate }: { properties: Property[]; navigate: (s: Screen, d?: Property) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
              {['Propiedad', 'Precio', 'Barrio', 'Estado', 'Visitas', 'Solicitudes', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.map((p, i) => (
              <tr key={p.id} className={`border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors ${i === properties.length - 1 ? 'border-b-0' : ''}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-10 h-8 rounded-lg object-cover flex-shrink-0"/>
                    <div>
                      <p className="font-semibold text-[#111827] line-clamp-1">{p.title}</p>
                      <p className="text-xs text-[#9ca3af]">{p.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#1E3A8A] font-semibold whitespace-nowrap">{fmtPrice(p.price)}</td>
                <td className="px-4 py-3 text-[#374151]">{p.barrio}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                    p.status === 'active' ? 'bg-[#d1fae5] text-[#065f46]'
                    : p.status === 'inactive' ? 'bg-[#f3f4f6] text-[#6b7280]'
                    : 'bg-[#fee2e2] text-[#991b1b]'
                  }`}>
                    {p.status === 'active' ? 'Activa' : p.status === 'inactive' ? 'Inactiva' : 'Expirada'}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#374151] font-medium">{p.visits}</td>
                <td className="px-4 py-3 text-[#374151] font-medium">{p.requests}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => navigate('property-detail', p)} title="Ver" className="p-1.5 rounded-lg text-[#6b7280] hover:bg-[#dbeafe] hover:text-[#1E3A8A] transition-colors"><Eye size={14}/></button>
                    <button title="Editar" className="p-1.5 rounded-lg text-[#6b7280] hover:bg-[#fef3c7] hover:text-[#92400e] transition-colors"><Edit2 size={14}/></button>
                    <button title="Eliminar" className="p-1.5 rounded-lg text-[#6b7280] hover:bg-[#fee2e2] hover:text-[#dc2626] transition-colors"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const REQUESTS = [
  { id: 'r1', tenant: 'Valentina Morales', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&auto=format', property: 'Apartamento Moderno en el Centro', time: 'Hace 2 horas', verified: true },
  { id: 'r2', tenant: 'Diego Hernández', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&auto=format', property: 'Apartamento Moderno en el Centro', time: 'Ayer', verified: false },
  { id: 'r3', tenant: 'Camila Torres', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&auto=format', property: 'Apartamento Estudio', time: 'Hace 3 días', verified: true },
];

function Requests() {
  const [states, setStates] = useState<Record<string, 'pending' | 'accepted' | 'rejected'>>({ r1: 'pending', r2: 'pending', r3: 'pending' });

  return (
    <div className="space-y-3">
      {REQUESTS.map(r => (
        <div key={r.id} className="bg-white rounded-2xl border border-[#e5e7eb] p-4 flex items-center gap-4">
          <img src={r.photo} alt={r.tenant} className="w-11 h-11 rounded-full object-cover flex-shrink-0"/>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-semibold text-sm text-[#111827]">{r.tenant}</p>
              {r.verified && <span className="badge-verified text-[10px]">✓ Verificado</span>}
            </div>
            <p className="text-xs text-[#6b7280] truncate">{r.property} · {r.time}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {states[r.id] === 'pending' ? (
              <>
                <button
                  onClick={() => setStates(s => ({...s, [r.id]: 'accepted'}))}
                  className="flex items-center gap-1.5 bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Check size={12}/> Aceptar
                </button>
                <button
                  onClick={() => setStates(s => ({...s, [r.id]: 'rejected'}))}
                  className="flex items-center gap-1.5 bg-[#fee2e2] text-[#991b1b] hover:bg-[#fecaca] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <X size={12}/> Rechazar
                </button>
              </>
            ) : (
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${states[r.id] === 'accepted' ? 'bg-[#d1fae5] text-[#065f46]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
                {states[r.id] === 'accepted' ? '✓ Aceptado' : '✗ Rechazado'}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
