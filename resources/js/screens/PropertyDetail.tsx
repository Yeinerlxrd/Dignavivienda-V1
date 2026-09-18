import { useState } from 'react';
import { Screen, Property, fmtPrice } from '../data/mock';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize2, CheckCircle, MessageSquare, Heart, Flag, Phone, Shield } from '../components/Icons';

interface Props { navigate: (s: Screen) => void; property: Property | null }

export default function PropertyDetail({ navigate, property: p }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [showContact, setShowContact] = useState(false);

  if (!p) {
    return (
      <div className="screen-enter flex items-center justify-center h-64 text-[#6b7280]">
        <p>Propiedad no encontrada.</p>
      </div>
    );
  }

  const imgs = p.images;

  return (
    <div className="screen-enter max-w-4xl mx-auto px-4 lg:px-8 py-6">
      {/* Back */}
      <button
        onClick={() => navigate('feed')}
        className="flex items-center gap-1.5 text-[#6b7280] text-sm mb-5 hover:text-[#1E3A8A] transition-colors"
      >
        <ChevronLeft size={16}/> Volver a listado
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left */}
        <div>
          {/* Image carousel */}
          <div className="relative h-72 lg:h-96 bg-[#dbeafe] rounded-2xl overflow-hidden mb-4">
            <img src={imgs[imgIdx]} alt={p.title} className="w-full h-full object-cover" />
            {imgs.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow transition-all"
                >
                  <ChevronLeft size={16}/>
                </button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % imgs.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow transition-all"
                >
                  <ChevronRight size={16}/>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-5' : 'bg-white/60'}`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">{p.type}</div>
          </div>

          {/* Thumbnails */}
          {imgs.length > 1 && (
            <div className="flex gap-2 mb-5">
              {imgs.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-[#1E3A8A]' : 'border-transparent opacity-60 hover:opacity-90'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          )}

          {/* Title + location */}
          <h1 className="font-heading font-bold text-2xl text-[#111827] mb-1">{p.title}</h1>
          <div className="flex items-center gap-1.5 text-[#6b7280] text-sm mb-4">
            <MapPin size={14}/>{p.address}, {p.barrio}, Ubaté
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {p.rooms > 0 && <SpecCard icon={<Bed size={20} className="text-[#1E3A8A]"/>} value={`${p.rooms}`} label="Habitaciones"/>}
            <SpecCard icon={<Bath size={20} className="text-[#1E3A8A]"/>} value={`${p.bathrooms}`} label={`Baño${p.bathrooms !== 1 ? 's' : ''}`}/>
            <SpecCard icon={<Maximize2 size={20} className="text-[#1E3A8A]"/>} value={`${p.area} m²`} label="Área"/>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-4">
            <h2 className="font-heading font-semibold text-[#111827] mb-3">Descripción</h2>
            <p className="text-[#374151] text-sm leading-relaxed">{p.description}</p>
          </div>

          {/* Report */}
          <button
            onClick={() => navigate('report')}
            className="flex items-center gap-2 text-xs text-[#6b7280] hover:text-[#dc2626] transition-colors"
          >
            <Flag size={12}/> Reportar este anuncio
          </button>
        </div>

        {/* Right: sticky panel */}
        <div className="space-y-4">
          {/* Price card */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 shadow-sm">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Precio mensual</p>
                <p className="font-heading font-bold text-2xl text-[#1E3A8A]">{fmtPrice(p.price)}</p>
              </div>
              <button onClick={() => setIsFav(f => !f)} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${isFav ? 'bg-[#fee2e2] border-[#fca5a5] text-[#dc2626]' : 'border-[#e5e7eb] text-[#9ca3af] hover:border-[#fca5a5] hover:text-[#dc2626]'}`}>
                <Heart size={16} style={isFav ? {fill:'currentColor'} : {}}/>
              </button>
            </div>

            <button
              onClick={() => navigate('messages')}
              className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mb-2"
            >
              <MessageSquare size={16}/> Enviar Mensaje
            </button>
            <button className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-[#1c1917] font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Phone size={16}/> Solicitar Visita
            </button>
          </div>

          {/* Owner card */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
            <h3 className="font-heading font-semibold text-[#111827] text-sm mb-4">Propietario</h3>
            <div className="flex items-center gap-3 mb-4">
              <img src={p.ownerPhoto} alt={p.ownerName} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e5e7eb]"/>
              <div>
                <p className="font-semibold text-sm text-[#111827]">{p.ownerName}</p>
                {p.ownerVerified ? (
                  <span className="badge-verified"><CheckCircle size={10}/>Identidad verificada</span>
                ) : (
                  <span className="text-xs text-[#F59E0B]">⚠ Sin verificar</span>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate('messages')}
              className="w-full border border-[#1E3A8A] text-[#1E3A8A] font-semibold py-2.5 rounded-xl text-sm hover:bg-[#dbeafe] transition-colors"
            >
              Contactar propietario
            </button>
          </div>

          {/* Security note */}
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-[#059669]"/>
              <p className="font-semibold text-sm text-[#065f46]">Transacción Segura</p>
            </div>
            <p className="text-xs text-[#065f46]/80 leading-relaxed">
              Nunca pagues dinero sin haber firmado el contrato digital. Usa DignaVivienda para todas las comunicaciones y pagos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-[#f8fafc] rounded-xl border border-[#e5e7eb] p-3 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="font-heading font-bold text-[#111827] text-base">{value}</p>
      <p className="text-xs text-[#6b7280]">{label}</p>
    </div>
  );
}
