import { Screen } from '../data/mock';
import { BarChart2, Users, Home, TrendingUp, Shield, AlertTriangle, CheckCircle, Eye } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

const MONTHLY = [
  { month: 'Abr', visits: 145, props: 8 },
  { month: 'May', visits: 189, props: 12 },
  { month: 'Jun', visits: 234, props: 15 },
  { month: 'Jul', visits: 198, props: 13 },
  { month: 'Ago', visits: 312, props: 20 },
  { month: 'Sep', visits: 287, props: 18 },
];
const MAX_VISITS = Math.max(...MONTHLY.map(m => m.visits));

export default function AdminDashboard({ navigate }: Props) {
  return (
    <div className="screen-enter px-4 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-[#111827]">Dashboard Administrativo</h2>
        <p className="text-[#6b7280] text-sm">Municipio de Ubaté · Septiembre 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <Home size={20}/>, bg: 'bg-[#dbeafe]', iconColor: 'text-[#1E3A8A]', value: '47', label: 'Propiedades activas', delta: '+12%' },
          { icon: <Users size={20}/>, bg: 'bg-[#d1fae5]', iconColor: 'text-[#059669]', value: '182', label: 'Usuarios registrados', delta: '+8%' },
          { icon: <CheckCircle size={20}/>, bg: 'bg-[#ede9fe]', iconColor: 'text-[#7c3aed]', value: '134', label: 'Identidades verificadas', delta: '+5%' },
          { icon: <AlertTriangle size={20}/>, bg: 'bg-[#fef3c7]', iconColor: 'text-[#92400e]', value: '3', label: 'Reportes pendientes', delta: '-2' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-[#e5e7eb] p-4">
            <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center mb-3 ${k.iconColor}`}>{k.icon}</div>
            <p className="font-heading font-bold text-2xl text-[#111827]">{k.value}</p>
            <p className="text-xs text-[#6b7280]">{k.label}</p>
            <p className="text-xs text-[#059669] font-semibold mt-1">{k.delta} este mes</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        {/* Chart */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
          <h3 className="font-heading font-semibold text-[#111827] mb-1">Visitas y Publicaciones</h3>
          <p className="text-xs text-[#6b7280] mb-5">Últimos 6 meses</p>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-40">
            {MONTHLY.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-[#1E3A8A] rounded-t-lg transition-all hover:bg-[#1e40af]"
                    style={{ height: `${(m.visits / MAX_VISITS) * 120}px` }}
                    title={`${m.visits} visitas`}
                  />
                </div>
                <span className="text-[10px] text-[#9ca3af] font-medium">{m.month}</span>
                <span className="text-[10px] font-bold text-[#1E3A8A]">{m.visits}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#f3f4f6]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#1E3A8A] rounded"/>
              <span className="text-xs text-[#6b7280]">Visitas a propiedades</span>
            </div>
          </div>
        </div>

        {/* Recent reports */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-[#111827]">Reportes Recientes</h3>
            <button className="text-xs text-[#1E3A8A] hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {[
              { type: 'Precio irreal', property: 'Habitación San Miguel', user: 'Jorge S.', time: 'Hace 1h', severity: 'high' },
              { type: 'Fotos falsas', property: 'Apto. La Esperanza', user: 'Anónimo', time: 'Hace 4h', severity: 'medium' },
              { type: 'Intento de estafa', property: 'Casa Centro', user: 'María L.', time: 'Ayer', severity: 'high' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${r.severity === 'high' ? 'bg-[#fee2e2]' : 'bg-[#fef3c7]'}`}>
                  <AlertTriangle size={14} className={r.severity === 'high' ? 'text-[#dc2626]' : 'text-[#92400e]'}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs text-[#111827]">{r.type}</p>
                  <p className="text-[10px] text-[#9ca3af] truncate">{r.property} · {r.user}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-[#9ca3af]">{r.time}</p>
                  <button className="text-[10px] text-[#1E3A8A] hover:underline font-medium">Revisar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats by barrio */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mt-5">
        <h3 className="font-heading font-semibold text-[#111827] mb-4">Propiedades por Barrio</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { barrio: 'Centro', count: 14, pct: 30 },
            { barrio: 'Los Pinos', count: 9, pct: 19 },
            { barrio: 'San Miguel', count: 7, pct: 15 },
            { barrio: 'La Esperanza', count: 6, pct: 13 },
            { barrio: 'Zona Rosa', count: 5, pct: 11 },
            { barrio: 'Centro Histórico', count: 3, pct: 6 },
            { barrio: 'Otros', count: 3, pct: 6 },
          ].slice(0, 6).map(b => (
            <div key={b.barrio}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#374151] font-medium">{b.barrio}</span>
                <span className="text-[#6b7280]">{b.count}</span>
              </div>
              <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: `${b.pct}%` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
