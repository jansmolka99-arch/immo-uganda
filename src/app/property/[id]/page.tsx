'use client';

import { use, Suspense, lazy } from 'react';
import Link from 'next/link';
import {
  Heart, Share2, MapPin, Bed, Bath, Maximize, Car,
  Calendar, Home, Zap, Phone, Mail, MessageCircle,
  ChevronRight, Building, Check, Star, Shield, ArrowLeft
} from 'lucide-react';
import { properties, formatPrice, toUSD, sqmToAcres } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';

const MapView = lazy(() => import('@/components/MapView'));

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>Property not found</p>
          <Link href="/search" style={{ fontSize: '14px', color: '#133DBD', fontWeight: 500 }}>Browse all properties</Link>
        </div>
      </div>
    );
  }

  const p = property;
  const similar = properties.filter(x => x.id !== p.id && x.type === p.type && x.transaction === p.transaction).slice(0, 4);
  const showLand = p.specs.landArea && p.specs.landArea > 0;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E9ECEF' }}>
        <div className="container" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#ADB5BD', overflow: 'auto', whiteSpace: 'nowrap' }}>
            <Link href="/" style={{ color: '#6C757D' }}>Home</Link>
            <ChevronRight size={12} />
            <Link href={`/search?transaction=${p.transaction}`} style={{ color: '#6C757D' }}>For {p.transaction}</Link>
            <ChevronRight size={12} />
            <Link href={`/search?transaction=${p.transaction}&location=${p.location.city}`} style={{ color: '#6C757D' }}>{p.location.city}</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#212529', fontWeight: 500 }}>{p.title}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        {/* Top: Image + Sidebar */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {/* Left column */}
          <div style={{ flex: '1 1 600px', minWidth: 0 }}>
            {/* Main image */}
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
              <img
                src={p.imageUrl}
                alt={p.title}
                style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block', background: '#F1F3F5' }}
                loading="eager"
              />
              {(p.isNew || p.featured) && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {p.isNew && <span style={{ padding: '3px 8px', background: '#28A745', color: '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '4px' }}>NEW</span>}
                  {p.featured && <span style={{ padding: '3px 8px', background: '#FD7E14', color: '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '4px' }}>SPOTLIGHT</span>}
                </div>
              )}
              <Link href="/search" style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.9)', borderRadius: '50%' }}>
                <ArrowLeft size={18} color="#495057" />
              </Link>
            </div>

            {/* Title + Price card */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '11px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    {p.type} &middot; For {p.transaction}
                  </p>
                  <h1 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, color: '#212529', marginBottom: '6px', lineHeight: 1.3 }}>{p.title}</h1>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6C757D' }}>
                    <MapPin size={13} color="#ADB5BD" />
                    {p.location.address}, {p.location.district}, {p.location.city}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#212529' }}>{formatPrice(p.price)}</p>
                  <p style={{ fontSize: '13px', color: '#ADB5BD' }}>{toUSD(p.price)}{p.transaction === 'rent' ? ' /month' : ''}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F3F5' }}>
                <Btn icon={<Heart size={13} />} label="Save" />
                <Btn icon={<Share2 size={13} />} label="Share" />
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#CED4DA' }}>Ref: IU-{String(p.id).padStart(6, '0')}</span>
              </div>
            </Card>

            {/* Key features */}
            <Card title="Key features">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                {p.specs.bedrooms > 0 && <Spec icon={<Bed size={18} />} label="Bedrooms" value={String(p.specs.bedrooms)} />}
                {p.specs.bathrooms > 0 && <Spec icon={<Bath size={18} />} label="Bathrooms" value={String(p.specs.bathrooms)} />}
                {p.specs.area > 0 && <Spec icon={<Maximize size={18} />} label="Living area" value={`${p.specs.area} m²`} />}
                {showLand && <Spec icon={<Home size={18} />} label="Land" value={sqmToAcres(p.specs.landArea!)} />}
                {p.specs.parking && p.specs.parking > 0 && <Spec icon={<Car size={18} />} label="Parking" value={String(p.specs.parking)} />}
                {p.specs.yearBuilt && <Spec icon={<Calendar size={18} />} label="Built" value={String(p.specs.yearBuilt)} />}
                {p.specs.floors && <Spec icon={<Building size={18} />} label="Floors" value={String(p.specs.floors)} />}
                {p.epc && <Spec icon={<Zap size={18} />} label="EPC" value={p.epc} />}
              </div>
            </Card>

            {/* Description */}
            <Card title="Description">
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: 1.7 }}>{p.description}</p>
            </Card>

            {/* Amenities */}
            {p.amenities.length > 0 && (
              <Card title="Amenities">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
                  {p.amenities.map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#495057' }}>
                      <Check size={14} color="#28A745" /> {a}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* EPC */}
            {p.epc && (
              <Card title="Energy performance">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxWidth: '400px' }}>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((level, i) => {
                    const w = [30, 40, 50, 60, 70, 85, 100];
                    const c = ['#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444', '#b91c1c'];
                    const active = p.epc === level;
                    return (
                      <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: `${w[i]}%`, height: '24px', borderRadius: '0 4px 4px 0',
                          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px',
                          fontSize: '11px', fontWeight: 700, color: '#fff', background: c[i],
                          opacity: active ? 1 : 0.3, outline: active ? '2px solid #212529' : 'none', outlineOffset: '1px',
                        }}>
                          {level}
                        </div>
                        {active && <span style={{ fontSize: '11px', fontWeight: 700, color: '#212529' }}>&larr; This property</span>}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Map */}
            <Card title="Location">
              <div style={{ height: '280px', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#F1F3F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#ADB5BD' }}>Loading map...</div>}>
                  <MapView properties={[property]} center={[p.location.lat, p.location.lng]} zoom={15} singleMarker />
                </Suspense>
              </div>
              {/* Address with Google Maps link */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px', background: '#F8F9FA', borderRadius: '8px' }}>
                <MapPin size={16} color="#133DBD" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#212529', marginBottom: '4px' }}>
                    {p.location.address}, {p.location.district}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>
                    {p.location.city}, Uganda
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${p.location.lat},${p.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#133DBD' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Right sidebar */}
          <div style={{ width: '300px', flexShrink: 0 }} className="hidden lg:!block">
            <div style={{ position: 'sticky', top: '76px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Contact */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F3F5' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#133DBD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>
                    {p.agency.logo}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#212529' }}>{p.agency.name}</p>
                    <p style={{ fontSize: '11px', color: '#ADB5BD', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={11} color="#F59E0B" fill="#F59E0B" /> 4.8 (127 reviews)
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <CtaBtn bg="#133DBD" color="#fff" icon={<Phone size={15} />} label="Request a call" />
                  <CtaBtn bg="#fff" color="#212529" icon={<Mail size={15} />} label="Send a message" border />
                  <CtaBtn bg="#25D366" color="#fff" icon={<MessageCircle size={15} />} label="WhatsApp" />
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F3F5', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#133DBD', fontWeight: 500, padding: '4px 0' }}>Schedule a viewing</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#133DBD', fontWeight: 500, padding: '4px 0' }}>Ask for the exact address</button>
                </div>
              </Card>

              {/* Details */}
              <Card>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>Property details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Row label="Reference" value={`IU-${String(p.id).padStart(6, '0')}`} />
                  <Row label="Listed on" value={new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <Row label="Type" value={p.type} />
                  {p.tenure && <Row label="Land tenure" value={p.tenure} />}
                  {p.specs.condition && <Row label="Condition" value={p.specs.condition} />}
                  {p.specs.furnished !== undefined && <Row label="Furnished" value={p.specs.furnished ? 'Yes' : 'No'} />}
                </div>
              </Card>

              {/* Safety */}
              <div style={{ background: '#FFF8E1', borderRadius: '10px', border: '1px solid #FFE082', padding: '16px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Shield size={18} color="#F57F17" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#E65100', marginBottom: '6px' }}>Safety tips</p>
                    <ul style={{ fontSize: '12px', color: '#795548', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <li>&bull; Never pay before visiting</li>
                      <li>&bull; Verify agent credentials</li>
                      <li>&bull; Check property documents</li>
                      <li>&bull; Report suspicious listings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile contact bar - visible only on mobile */}
        <div className="lg:hidden" style={{ marginTop: '16px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#133DBD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                {p.agency.logo}
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>{p.agency.name}</p>
                <p style={{ fontSize: '11px', color: '#ADB5BD' }}>
                  <Star size={10} color="#F59E0B" fill="#F59E0B" /> 4.8 (127 reviews)
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <CtaBtn bg="#133DBD" color="#fff" icon={<Phone size={14} />} label="Call" />
              <CtaBtn bg="#25D366" color="#fff" icon={<MessageCircle size={14} />} label="WhatsApp" />
            </div>
          </Card>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '16px' }}>Similar properties</h2>
            <div className="grid-cards">
              {similar.map(sp => <PropertyCard key={sp.id} property={sp} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E9ECEF', padding: '20px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      {title && <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#212529', marginBottom: '14px' }}>{title}</h2>}
      {children}
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#F8F9FA', borderRadius: '8px' }}>
      <span style={{ color: '#133DBD' }}>{icon}</span>
      <div>
        <p style={{ fontSize: '11px', color: '#ADB5BD' }}>{label}</p>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#212529' }}>{value}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
      <span style={{ color: '#6C757D' }}>{label}</span>
      <span style={{ fontWeight: 500, color: '#212529' }}>{value}</span>
    </div>
  );
}

function Btn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, color: '#6C757D', border: '1px solid #E9ECEF', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}>
      {icon} {label}
    </button>
  );
}

function CtaBtn({ bg, color, icon, label, border }: { bg: string; color: string; icon: React.ReactNode; label: string; border?: boolean }) {
  return (
    <button style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      padding: '10px', background: bg, color, fontSize: '13px', fontWeight: 600,
      borderRadius: '8px', border: border ? '1px solid #E9ECEF' : 'none', cursor: 'pointer',
    }}>
      {icon} {label}
    </button>
  );
}
