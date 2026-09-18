import { Screen } from '../data/mock';
import { CheckCircle, Home, Eye } from '../components/Icons';

interface Props { navigate: (s: Screen) => void }

export default function PublishSuccess({ navigate }: Props) {
  return (
    <div className="screen-enter flex items-center justify-center min-h-[60vh] px-4 py-10">
      <div className="max-w-md w-full text-center">
        {/* Confetti-like decoration */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-24 h-24 bg-[#d1fae5] rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-[#059669]"/>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F59E0B] rounded-full opacity-70"/>
          <div className="absolute -bottom-1 -left-3 w-5 h-5 bg-[#1E3A8A] rounded-full opacity-50"/>
        </div>

        <h2 className="font-heading font-bold text-2xl text-[#111827] mb-2">¡Publicación Exitosa!</h2>
        <p className="text-[#6b7280] text-sm leading-relaxed mb-8">
          Tu propiedad ha sido publicada correctamente en DignaVivienda. Los inquilinos ya pueden verla y contactarte.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: '0', label: 'Visitas', color: 'text-[#1E3A8A]' },
            { value: '0', label: 'Solicitudes', color: 'text-[#059669]' },
            { value: '24h', label: 'Activa por', color: 'text-[#F59E0B]' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-[#e5e7eb] p-3">
              <p className={`font-heading font-bold text-xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#9ca3af]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('owner-dashboard')}
            className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16}/> Ir al Dashboard
          </button>
          <button
            onClick={() => navigate('publish-wizard')}
            className="w-full border border-[#e5e7eb] text-[#374151] font-medium py-3 rounded-xl text-sm hover:bg-[#f3f4f6] transition-colors"
          >
            Publicar otra propiedad
          </button>
        </div>
      </div>
    </div>
  );
}
