'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { cities } from '@/data/properties';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  initialValues?: {
    transaction?: string;
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const typeOptions = [
  { label: 'All types', value: '' },
  { label: '── Residential ──', value: '', disabled: true },
  { label: 'Apartment', value: 'Apartment' },
  { label: 'House', value: 'House' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Studio', value: 'Studio' },
  { label: 'Townhouse', value: 'Townhouse' },
  { label: 'Bungalow', value: 'Bungalow' },
  { label: 'Mansion', value: 'Mansion' },
  { label: 'Duplex', value: 'Duplex' },
  { label: '── Commercial ──', value: '', disabled: true },
  { label: 'Office Space', value: 'Commercial' },
  { label: 'Retail / Shop', value: 'Retail' },
  { label: 'Warehouse', value: 'Warehouse' },
  { label: 'Hotel / Lodge', value: 'Hotel' },
  { label: '── Land ──', value: '', disabled: true },
  { label: 'Residential Land', value: 'Land' },
  { label: 'Commercial Land', value: 'CommercialLand' },
  { label: 'Agricultural / Farmland', value: 'Farmland' },
  { label: 'Industrial Land', value: 'IndustrialLand' },
];

export default function SearchBar({ variant = 'hero', initialValues }: SearchBarProps) {
  const router = useRouter();
  const [transaction, setTransaction] = useState(initialValues?.transaction || 'sale');
  const [location, setLocation] = useState(initialValues?.location || '');
  const [propertyType, setPropertyType] = useState(initialValues?.type || '');
  const [minPrice, setMinPrice] = useState(initialValues?.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialValues?.maxPrice || '');
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = location ? cities.filter(c => c.name.toLowerCase().includes(location.toLowerCase())) : cities;

  const handleSearch = () => {
    const p = new URLSearchParams();
    p.set('transaction', transaction);
    if (location) p.set('location', location);
    if (propertyType) p.set('type', propertyType);
    if (minPrice) p.set('minPrice', minPrice);
    if (maxPrice) p.set('maxPrice', maxPrice);
    router.push(`/search?${p.toString()}`);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px',
    fontSize: '14px', outline: 'none', background: '#fff', color: '#212529',
  };

  // ========== COMPACT ==========
  if (variant === 'compact') {
    return (
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #E9ECEF', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
          {(['sale', 'rent'] as const).map(t => (
            <button key={t} onClick={() => setTransaction(t)} style={{
              flex: 1, padding: '8px', fontSize: '13px', fontWeight: 600, borderRadius: '6px', border: 'none', cursor: 'pointer',
              background: transaction === t ? '#133DBD' : '#F1F3F5', color: transaction === t ? '#fff' : '#6C757D',
            }}>
              For {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <MapPin size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#CED4DA' }} />
            <input type="text" placeholder="City or district" value={location}
              onChange={e => { setLocation(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              style={{ ...inputStyle, paddingLeft: '34px' }}
            />
            {showDropdown && filtered.length > 0 && (
              <div className="autocomplete-list">
                {filtered.map(c => (
                  <div key={c.name} className="autocomplete-item" style={{ display: 'flex', justifyContent: 'space-between' }} onMouseDown={() => { setLocation(c.name); setShowDropdown(false); }}>
                    <span style={{ color: '#495057' }}>{c.name}</span>
                    <span style={{ fontSize: '11px', color: '#CED4DA' }}>{c.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              {typeOptions.map((t, i) => <option key={`${t.value}-${i}`} value={t.value} disabled={t.disabled} style={t.disabled ? { fontWeight: 700, color: '#212529', fontSize: '11px' } : undefined}>{t.label}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#CED4DA', pointerEvents: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" placeholder="Min price" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
            <input type="number" placeholder="Max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
          </div>
          <button onClick={handleSearch} style={{
            width: '100%', padding: '10px', background: '#133DBD', color: '#fff', fontSize: '13px', fontWeight: 600,
            borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <Search size={16} /> Search
          </button>
        </div>
      </div>
    );
  }

  // ========== HERO ==========
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0' }}>
        {(['sale', 'rent'] as const).map(t => {
          const active = transaction === t;
          return (
            <button key={t} onClick={() => setTransaction(t)} style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              border: active ? '1px solid #DEE2E6' : '1px solid transparent',
              borderBottom: active ? '1px solid #fff' : '1px solid #DEE2E6',
              borderRadius: '8px 8px 0 0',
              background: active ? '#fff' : '#F1F3F5',
              color: active ? '#133DBD' : '#6C757D',
              position: 'relative',
              zIndex: active ? 10 : 1,
              marginBottom: active ? '-1px' : '0',
            }}>
              For {t}
            </button>
          );
        })}
        {/* Filler to complete the bottom border */}
        <div style={{ flex: 1, borderBottom: '1px solid #DEE2E6' }} />
      </div>

      {/* Search bar */}
      <div style={{
        background: '#fff',
        border: '1px solid #DEE2E6',
        borderTop: 'none',
        borderRadius: '0 8px 8px 8px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {/* Location */}
          <div style={{ position: 'relative', flex: '2 1 200px' }}>
            <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#CED4DA' }} />
            <input type="text" placeholder="Where do you want to live?" value={location}
              onChange={e => { setLocation(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              style={{ ...inputStyle, paddingLeft: '38px' }}
            />
            {showDropdown && filtered.length > 0 && (
              <div className="autocomplete-list">
                {filtered.map(c => (
                  <div key={c.name} className="autocomplete-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onMouseDown={() => { setLocation(c.name); setShowDropdown(false); }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={13} color="#CED4DA" />
                      <span style={{ fontSize: '14px', color: '#495057', fontWeight: 500 }}>{c.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#CED4DA' }}>{c.count} properties</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Type */}
          <div style={{ position: 'relative', flex: '1 1 140px' }}>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              {typeOptions.map((t, i) => <option key={`${t.value}-${i}`} value={t.value} disabled={t.disabled} style={t.disabled ? { fontWeight: 700, color: '#212529', fontSize: '11px' } : undefined}>{t.label}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#CED4DA', pointerEvents: 'none' }} />
          </div>
          {/* Budget */}
          <input type="number" placeholder="Min budget" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ ...inputStyle, flex: '1 1 100px' }} />
          <input type="number" placeholder="Max budget" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ ...inputStyle, flex: '1 1 100px' }} />
          {/* Search btn */}
          <button onClick={handleSearch} style={{
            padding: '10px 24px', background: '#133DBD', color: '#fff', fontWeight: 600, fontSize: '14px',
            borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            whiteSpace: 'nowrap',
          }}>
            <Search size={18} /> Search
          </button>
        </div>
        {/* Quick links */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F3F5' }}>
          <a href="/search" style={{ fontSize: '12px', fontWeight: 500, color: '#133DBD' }}>Advanced search</a>
          <a href="/search?view=map" style={{ fontSize: '12px', fontWeight: 500, color: '#133DBD' }}>Search on the map</a>
        </div>
      </div>
    </div>
  );
}
