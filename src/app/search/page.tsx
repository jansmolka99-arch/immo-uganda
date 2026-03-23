'use client';

import { useState, useMemo, Suspense, lazy } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid3X3, List, Map, ChevronDown } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import { properties, Property, formatPriceShort } from '@/data/properties';

const MapView = lazy(() => import('@/components/MapView'));

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F9FA' }}><p style={{ color: '#ADB5BD', fontSize: '14px' }}>Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('newest');
  const initialView = searchParams.get('view');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>(
    initialView === 'map' ? 'map' : initialView === 'list' ? 'list' : 'grid'
  );
  const [showFilters, setShowFilters] = useState(false);
  const [bedroomsFilter, setBedroomsFilter] = useState('');

  const transaction = searchParams.get('transaction') || '';
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const isNew = searchParams.get('new') === 'true';

  const filtered = useMemo(() => {
    let r = [...properties];
    if (transaction) r = r.filter(p => p.transaction === transaction);
    if (location) r = r.filter(p => p.location.city.toLowerCase().includes(location.toLowerCase()) || p.location.district.toLowerCase().includes(location.toLowerCase()));
    if (type) r = r.filter(p => p.type === type);
    if (minPrice) r = r.filter(p => p.price >= parseInt(minPrice));
    if (maxPrice) r = r.filter(p => p.price <= parseInt(maxPrice));
    if (isNew) r = r.filter(p => p.isNew);
    if (bedroomsFilter) r = r.filter(p => p.specs.bedrooms >= parseInt(bedroomsFilter));
    switch (sortBy) {
      case 'price-asc': r.sort((a, b) => a.price - b.price); break;
      case 'price-desc': r.sort((a, b) => b.price - a.price); break;
      case 'area-desc': r.sort((a, b) => b.specs.area - a.specs.area); break;
      default: r.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return r;
  }, [transaction, location, type, minPrice, maxPrice, isNew, bedroomsFilter, sortBy]);

  const title = [type || 'Properties', transaction === 'sale' ? 'for sale' : transaction === 'rent' ? 'for rent' : '', location ? `in ${location}` : 'in Uganda'].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA' }}>
      {/* Header */}
      <div className="bg-white" style={{ borderBottom: '1px solid #E9ECEF' }}>
        <div className="container" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#212529' }}>{title}</h1>
              <p style={{ fontSize: '13px', color: '#ADB5BD' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg text-[13px] bg-white appearance-none focus:outline-none"
                  style={{ border: '1px solid #E9ECEF' }}>
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="area-desc">Largest first</option>
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#CED4DA' }} />
              </div>
              <div className="flex overflow-hidden rounded-lg" style={{ border: '1px solid #E9ECEF' }}>
                {([
                  { m: 'grid' as const, icon: <Grid3X3 size={15} /> },
                  { m: 'list' as const, icon: <List size={15} /> },
                  { m: 'map' as const, icon: <Map size={15} /> },
                ]).map(({ m, icon }) => (
                  <button key={m} onClick={() => setViewMode(m)} className="p-2 transition-colors"
                    style={{ background: viewMode === m ? '#133DBD' : '#fff', color: viewMode === m ? '#fff' : '#ADB5BD' }}>
                    {icon}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] bg-white" style={{ border: '1px solid #E9ECEF' }}>
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map view */}
      {viewMode === 'map' ? (
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4">
          <div className="flex gap-4" style={{ height: 'calc(100vh - 180px)' }}>
            <div className="flex-1 rounded-lg overflow-hidden" style={{ border: '1px solid #E9ECEF' }}>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center" style={{ background: '#F1F3F5', color: '#ADB5BD', fontSize: '13px' }}>Loading map...</div>}>
                <MapView properties={filtered} />
              </Suspense>
            </div>
            <div className="hidden lg:block w-[320px] overflow-y-auto space-y-3 pr-1">
              {filtered.map(p => <MapCard key={p.id} property={p} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="container" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          {/* Mobile filters overlay */}
          {showFilters && (
            <div className="lg:hidden" style={{ marginBottom: '16px' }}>
              <SearchBar variant="compact" initialValues={{ transaction, location, type: type || '', minPrice, maxPrice }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Desktop sidebar */}
            <aside className="hidden lg:block" style={{ width: '260px', flexShrink: 0 }}>
              <div className="sticky" style={{ top: '76px' }}>
                <SearchBar variant="compact" initialValues={{ transaction, location, type: type || '', minPrice, maxPrice }} />
                <div style={{ marginTop: '16px', background: '#fff', borderRadius: '8px', border: '1px solid #E9ECEF', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#212529', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SlidersHorizontal size={14} /> More filters
                  </h3>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: '#6C757D' }}>Bedrooms</label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {['', '1', '2', '3', '4', '5'].map(v => (
                        <button key={v} onClick={() => setBedroomsFilter(v)}
                          style={{ flex: 1, padding: '6px 0', fontSize: '12px', fontWeight: 500, borderRadius: '4px', border: 'none', cursor: 'pointer',
                            background: bedroomsFilter === v ? '#133DBD' : '#F8F9FA', color: bedroomsFilter === v ? '#fff' : '#6C757D' }}>
                          {v || 'All'}{v ? '+' : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            {/* Results */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px 0' }}>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#212529' }}>No properties found</p>
                  <p style={{ fontSize: '13px', color: '#ADB5BD', marginTop: '4px' }}>Try adjusting your filters.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid-results">
                  {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {filtered.map(p => <ListCard key={p.id} property={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListCard({ property: p }: { property: Property }) {
  return (
    <a href={`/property/${p.id}`} className="block bg-white rounded-lg overflow-hidden group transition-all"
      style={{ border: '1px solid #E9ECEF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-[240px] shrink-0">
          <img src={p.imageUrl} alt={p.title} className="w-full h-[170px] sm:h-full object-cover" style={{ background: '#F1F3F5' }} loading="lazy" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p.type}</p>
              <h3 className="truncate" style={{ fontSize: '15px', fontWeight: 600, color: '#212529', margin: '2px 0 4px' }}>{p.title}</h3>
              <p className="line-clamp-2" style={{ fontSize: '13px', color: '#6C757D' }}>{p.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p style={{ fontSize: '17px', fontWeight: 700, color: '#212529', whiteSpace: 'nowrap' }}>{formatPriceShort(p.price)}</p>
              {p.transaction === 'rent' && <p style={{ fontSize: '11px', color: '#ADB5BD' }}>/month</p>}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2" style={{ fontSize: '13px', color: '#6C757D' }}>
            {p.specs.bedrooms > 0 && <span>{p.specs.bedrooms} bed{p.specs.bedrooms !== 1 ? 's' : ''}</span>}
            {p.specs.area > 0 && <span>{p.specs.area} m&sup2;</span>}
            <span className="ml-auto" style={{ fontSize: '12px', color: '#CED4DA' }}>{p.location.district}, {p.location.city}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function MapCard({ property: p }: { property: Property }) {
  return (
    <a href={`/property/${p.id}`} className="block bg-white rounded-lg overflow-hidden" style={{ border: '1px solid #E9ECEF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <img src={p.imageUrl} alt={p.title} className="w-full h-[130px] object-cover" style={{ background: '#F1F3F5' }} loading="lazy" />
      <div className="p-3">
        <p style={{ fontSize: '11px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p.type}</p>
        <p style={{ fontSize: '16px', fontWeight: 700, color: '#212529', marginTop: '2px' }}>
          {formatPriceShort(p.price)}{p.transaction === 'rent' ? <span style={{ fontSize: '11px', fontWeight: 400, color: '#ADB5BD' }}> /mo</span> : ''}
        </p>
        <p style={{ fontSize: '12px', color: '#6C757D', marginTop: '2px' }}>
          {p.specs.bedrooms > 0 ? `${p.specs.bedrooms} beds · ` : ''}{p.specs.area > 0 ? `${p.specs.area} m²` : ''}
        </p>
        <p style={{ fontSize: '12px', color: '#ADB5BD' }}>{p.location.district}, {p.location.city}</p>
      </div>
    </a>
  );
}
