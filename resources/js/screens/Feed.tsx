import { useState } from 'react';
import { Screen, PROPERTIES, BARRIOSUBATE, Property } from '../data/mock';
import PropertyCard from '../components/PropertyCard';
import { Search, ChevronDown, X } from '../components/Icons';

interface Props { navigate: (s: Screen, data?: Property) => void }

const TYPES = ['Todos', 'Apartamento', 'Casa', 'Habitación', 'Local'];

export default function Feed({ navigate }: Props) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Todos');
  const [barrio, setBarrio] = useState('');
  const [priceMax, setPriceMax] = useState(2000000);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['p1', 'p4']));
  const [showFilters, setShowFilters] = useState(false);

  const filtered = PROPERTIES.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.barrio.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
    const matchType = type === 'Todos' || p.type === type;
    const matchBarrio = !barrio || p.barrio === barrio;
    const matchPrice = p.price <= priceMax;
    return matchSearch && matchType && matchBarrio && matchPrice;
  });

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="screen-enter">
      {/* Search hero */}
      <div className="bg-[#1E3A8A] px-4 lg:px-8 pt-6 pb-8">
        <h2 className="font-heading font-bold text-white text-xl mb-1">Encuentra tu hogar en Ubaté</h2>
        <p className="text-white/70 text-sm mb-4">{PROPERTIES.filter(p => p.status === 'active').length} propiedades disponibles</p>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por barrio, dirección o tipo…"
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] shadow"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#374151]">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6 px-4 lg:px-8 py-6">
        {/* Sidebar filters — desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 sticky top-20 space-y-5">
            <h3 className="font-heading font-semibold text-[#111827] text-sm">Filtros</h3>

            {/* Type */}
            <div>
              <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide block mb-2">Tipo</label>
              <div className="space-y-1">
                {TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      type === t ? 'bg-[#dbeafe] text-[#1E3A8A] font-semibold' : 'text-[#374151] hover:bg-[#f3f4f6]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Barrio */}
            <div>
              <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide block mb-2">Barrio</label>
              <select
                value={barrio}
                onChange={e => setBarrio(e.target.value)}
                className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3A8A]"
              >
                <option value="">Todos los barrios</option>
                {BARRIOSUBATE.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide block mb-2">
                Precio máximo: <span className="text-[#1E3A8A]">${(priceMax/1000).toFixed(0)}k</span>
              </label>
              <input
                type="range"
                min={200000} max={5000000} step={50000}
                value={priceMax}
                onChange={e => setPriceMax(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#9ca3af] mt-1">
                <span>$200k</span><span>$5M</span>
              </div>
            </div>

            {/* Clear */}
            {(type !== 'Todos' || barrio || priceMax < 5000000) && (
              <button
                onClick={() => { setType('Todos'); setBarrio(''); setPriceMax(2000000); }}
                className="w-full text-xs text-[#dc2626] hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter pills */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 lg:hidden">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  type === t ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-white text-[#374151] border-[#e5e7eb]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-[#6b7280] mb-4">
            {filtered.length === 0 ? 'Sin resultados' : `${filtered.length} propiedad${filtered.length !== 1 ? 'es' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#9ca3af]">
              <Search size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-semibold text-[#374151]">Sin resultados</p>
              <p className="text-sm">Intenta con otros filtros o términos de búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(p => (
                <PropertyCard
                  key={p.id}
                  property={{ ...p, isFavorite: favorites.has(p.id) }}
                  onView={() => navigate('property-detail', p)}
                  onFavorite={() => toggleFav(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
