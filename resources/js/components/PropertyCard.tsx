import { Property, fmtPrice } from '../data/mock';
import { Bed, Bath, Maximize2, MapPin, Heart, CheckCircle } from './Icons';

interface Props {
  property: Property;
  onView: () => void;
  onFavorite?: () => void;
}

export default function PropertyCard({ property: p, onView, onFavorite }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      {/* Image */}
      <div className="relative h-48 bg-[#dbeafe] overflow-hidden" onClick={onView}>
        <img
          src={p.images[0]}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          {p.type}
        </div>
        {/* Favorite */}
        {onFavorite && (
          <button
            onClick={e => { e.stopPropagation(); onFavorite(); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              p.isFavorite
                ? 'bg-[#dc2626] text-white'
                : 'bg-white/90 text-[#6b7280] hover:bg-white hover:text-[#dc2626]'
            }`}
          >
            <Heart size={15} strokeWidth={p.isFavorite ? 0 : 1.8} style={p.isFavorite ? {fill:'currentColor'} : {}} />
          </button>
        )}
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-6 pb-3 px-3">
          <span className="text-white font-heading font-bold text-lg">{fmtPrice(p.price)}</span>
          <span className="text-white/80 text-xs ml-1">/mes</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4" onClick={onView}>
        <h3 className="font-heading font-semibold text-[#111827] text-sm leading-snug mb-1 line-clamp-1">
          {p.title}
        </h3>
        <div className="flex items-center gap-1 text-[#6b7280] text-xs mb-3">
          <MapPin size={12} />
          <span>{p.barrio}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#6b7280] border-t border-[#f3f4f6] pt-3">
          {p.rooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={13} className="text-[#9ca3af]" />
              {p.rooms} hab.
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={13} className="text-[#9ca3af]" />
            {p.bathrooms} baño{p.bathrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={13} className="text-[#9ca3af]" />
            {p.area} m²
          </span>

          {/* Owner verified */}
          {p.ownerVerified && (
            <span className="ml-auto flex items-center gap-1 text-[#059669]">
              <CheckCircle size={12} />
              <span className="text-[10px] font-semibold">Verificado</span>
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={onView}
          className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-[#1c1917] font-semibold py-2 rounded-xl text-sm transition-colors"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}
