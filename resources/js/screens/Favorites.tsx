import { useState } from 'react';
import { Screen, PROPERTIES, Property } from '../data/mock';
import PropertyCard from '../components/PropertyCard';
import { Heart } from '../components/Icons';

interface Props { navigate: (s: Screen, data?: Property) => void }

export default function Favorites({ navigate }: Props) {
  const [favs, setFavs] = useState<Set<string>>(new Set(['p1', 'p4']));
  const favorites = PROPERTIES.filter(p => favs.has(p.id));

  return (
    <div className="screen-enter px-4 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-[#111827]">Mis Favoritos</h2>
        <p className="text-[#6b7280] text-sm">{favorites.length} propiedad{favorites.length !== 1 ? 'es' : ''} guardada{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={48} className="mx-auto text-[#e5e7eb] mb-4"/>
          <p className="font-heading font-semibold text-[#374151] mb-1">Sin favoritos aún</p>
          <p className="text-sm text-[#6b7280] mb-4">Guarda propiedades que te interesen para encontrarlas fácilmente.</p>
          <button onClick={() => navigate('feed')} className="bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1e40af] transition-colors">
            Explorar propiedades
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(p => (
            <PropertyCard
              key={p.id}
              property={{ ...p, isFavorite: true }}
              onView={() => navigate('property-detail', p)}
              onFavorite={() => setFavs(prev => { const n = new Set(prev); n.delete(p.id); return n; })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
