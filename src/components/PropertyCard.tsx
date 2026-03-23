'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Home, Building2, LandPlot, Store } from 'lucide-react';
import { Property, formatPriceShort } from '@/data/properties';

const typeStyles: Record<string, { bg: string; icon: React.ReactNode }> = {
  Apartment: { bg: '#E3E8F0', icon: <Building2 size={40} strokeWidth={1.2} color="#8B9BB5" /> },
  House: { bg: '#E5EDE5', icon: <Home size={40} strokeWidth={1.2} color="#7BA07B" /> },
  Villa: { bg: '#EDE5E0', icon: <Home size={40} strokeWidth={1.2} color="#A08B7B" /> },
  Land: { bg: '#E0ECE5', icon: <LandPlot size={40} strokeWidth={1.2} color="#6B9B7B" /> },
  Commercial: { bg: '#E8E3F0', icon: <Store size={40} strokeWidth={1.2} color="#8B7BA0" /> },
  Studio: { bg: '#E0E5EC', icon: <Building2 size={40} strokeWidth={1.2} color="#7B8BA0" /> },
};

export default function PropertyCard({ property: p }: { property: Property }) {
  const [imgError, setImgError] = useState(false);
  const ts = typeStyles[p.type] || typeStyles.House;

  return (
    <Link href={`/property/${p.id}`} className="block">
      <article
        className="bg-white overflow-hidden group"
        style={{
          borderRadius: '8px',
          border: '1px solid #E9ECEF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {/* Image */}
        <div className="relative" style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
          {!imgError && p.imageUrl ? (
            <img
              src={p.imageUrl}
              alt={p.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#F1F3F5' }}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: ts.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {ts.icon}
            </div>
          )}

          {/* Badges */}
          {(p.isNew || p.featured) && (
            <div className="absolute flex gap-1" style={{ top: '8px', left: '8px' }}>
              {p.isNew && (
                <span style={{ padding: '2px 7px', background: '#28A745', color: '#fff', fontSize: '10px', fontWeight: 600, borderRadius: '3px', letterSpacing: '0.5px' }}>NEW</span>
              )}
              {p.featured && (
                <span style={{ padding: '2px 7px', background: '#FD7E14', color: '#fff', fontSize: '10px', fontWeight: 600, borderRadius: '3px', letterSpacing: '0.5px' }}>SPOTLIGHT</span>
              )}
            </div>
          )}

          {/* Favorite */}
          <button
            className="absolute opacity-0 group-hover:opacity-100"
            style={{ top: '8px', right: '8px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          >
            <Heart size={14} color="#6C757D" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '14px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>
            {p.type}
          </p>
          <p style={{ fontSize: '17px', fontWeight: 700, color: '#212529', marginBottom: '4px' }}>
            {formatPriceShort(p.price)}
            {p.transaction === 'rent' && <span style={{ fontSize: '12px', fontWeight: 400, color: '#6C757D' }}> /month</span>}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6C757D', marginBottom: '6px' }}>
            {p.specs.bedrooms > 0 && <span>{p.specs.bedrooms} bed{p.specs.bedrooms !== 1 ? 's' : ''}</span>}
            {p.specs.bedrooms > 0 && p.specs.area > 0 && <span style={{ color: '#DEE2E6' }}>|</span>}
            {p.specs.area > 0 && <span>{p.specs.area} m²</span>}
            {p.specs.landArea && p.specs.area === 0 && <span>{p.specs.landArea.toLocaleString()} m²</span>}
          </div>
          <p style={{ fontSize: '13px', color: '#495057' }}>
            {p.location.district}, {p.location.city}
          </p>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F1F3F5', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#F1F3F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 700, color: '#ADB5BD' }}>
              {p.agency.logo}
            </div>
            <span style={{ fontSize: '11px', color: '#CED4DA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.agency.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
