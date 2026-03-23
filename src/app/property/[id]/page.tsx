'use client';

import { use, Suspense, lazy } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Maximize, Car,
  Calendar, Home, Zap, Phone, Mail, MessageCircle,
  ChevronRight, Building, Check, Star, Shield
} from 'lucide-react';
import { properties, formatPrice } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';

const MapView = lazy(() => import('@/components/MapView'));

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-[20px] font-bold text-immo-gray-900 mb-1">Property not found</p>
          <Link href="/search" className="text-[14px] text-immo-blue font-medium hover:underline">Browse all properties</Link>
        </div>
      </div>
    );
  }

  const similar = properties
    .filter(p => p.id !== property.id && p.type === property.type && p.transaction === property.transaction)
    .slice(0, 4);

  const p = property;

  return (
    <div className="bg-immo-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-immo-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-2.5 flex items-center gap-1.5 text-[12px] text-immo-gray-500 overflow-x-auto">
          <Link href="/" className="hover:text-immo-blue shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href={`/search?transaction=${p.transaction}`} className="hover:text-immo-blue shrink-0">For {p.transaction === 'sale' ? 'sale' : 'rent'}</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href={`/search?transaction=${p.transaction}&location=${p.location.city}`} className="hover:text-immo-blue shrink-0">{p.location.city}</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-immo-gray-700 font-medium truncate">{p.title}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6 rounded-lg overflow-hidden">
          <div className="md:col-span-3 relative">
            <img src={p.imageUrl} alt={p.title} className="w-full h-[300px] md:h-[420px] object-cover bg-immo-gray-100" />
            <div className="absolute top-3 left-3 flex gap-1.5">
              {p.isNew && <span className="px-2 py-0.5 bg-immo-green text-white text-[11px] font-semibold rounded uppercase">New</span>}
              {p.featured && <span className="px-2 py-0.5 bg-immo-orange text-white text-[11px] font-semibold rounded uppercase">Spotlight</span>}
            </div>
            <Link href="/search" className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <ArrowLeft size={16} className="text-immo-gray-700" />
            </Link>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2">
            <img src={`https://picsum.photos/seed/immo${p.id + 50}/400/300`} alt="" className="w-full h-full object-cover bg-immo-gray-100" />
            <div className="relative">
              <img src={`https://picsum.photos/seed/immo${p.id + 80}/400/300`} alt="" className="w-full h-full object-cover bg-immo-gray-100" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[13px] font-semibold cursor-pointer hover:bg-black/50 transition-colors">
                View all photos
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Title & Price */}
            <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[11px] font-medium text-immo-gray-500 uppercase tracking-wide mb-1">{p.type} · For {p.transaction}</p>
                  <h1 className="text-[22px] font-bold text-immo-gray-900 mb-1.5">{p.title}</h1>
                  <p className="flex items-center gap-1 text-[13px] text-immo-gray-600">
                    <MapPin size={13} className="text-immo-gray-400" />
                    {p.location.address}, {p.location.district}, {p.location.city}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[26px] font-bold text-immo-gray-900">{formatPrice(p.price)}</p>
                  {p.transaction === 'rent' && <p className="text-[12px] text-immo-gray-500">per month</p>}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-immo-gray-100">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-immo-gray-600 border border-immo-gray-200 rounded-md hover:bg-immo-gray-50 transition-colors">
                  <Heart size={13} /> Save
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-immo-gray-600 border border-immo-gray-200 rounded-md hover:bg-immo-gray-50 transition-colors">
                  <Share2 size={13} /> Share
                </button>
                <span className="ml-auto text-[11px] text-immo-gray-400">Ref: IU-{String(p.id).padStart(6, '0')}</span>
              </div>
            </div>

            {/* Key specs */}
            <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 className="text-[16px] font-bold text-immo-gray-900 mb-4">Key features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {p.specs.bedrooms > 0 && <Spec icon={<Bed size={18} />} label="Bedrooms" value={String(p.specs.bedrooms)} />}
                {p.specs.bathrooms > 0 && <Spec icon={<Bath size={18} />} label="Bathrooms" value={String(p.specs.bathrooms)} />}
                {p.specs.area > 0 && <Spec icon={<Maximize size={18} />} label="Living area" value={`${p.specs.area} m²`} />}
                {p.specs.landArea && p.specs.landArea > 0 && <Spec icon={<Home size={18} />} label="Land area" value={`${p.specs.landArea.toLocaleString()} m²`} />}
                {p.specs.parking && p.specs.parking > 0 && <Spec icon={<Car size={18} />} label="Parking" value={`${p.specs.parking}`} />}
                {p.specs.yearBuilt && <Spec icon={<Calendar size={18} />} label="Year built" value={String(p.specs.yearBuilt)} />}
                {p.specs.floors && <Spec icon={<Building size={18} />} label="Floors" value={String(p.specs.floors)} />}
                {p.epc && <Spec icon={<Zap size={18} />} label="Energy class" value={p.epc} />}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 className="text-[16px] font-bold text-immo-gray-900 mb-3">Description</h2>
              <p className="text-[14px] text-immo-gray-700 leading-relaxed">{p.description}</p>
            </div>

            {/* Amenities */}
            {p.amenities.length > 0 && (
              <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h2 className="text-[16px] font-bold text-immo-gray-900 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {p.amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 text-[13px] text-immo-gray-700">
                      <Check size={14} className="text-immo-green shrink-0" /> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EPC */}
            {p.epc && (
              <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h2 className="text-[16px] font-bold text-immo-gray-900 mb-3">Energy performance</h2>
                <div className="space-y-1">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((level, i) => {
                    const w = [30, 40, 50, 60, 70, 85, 100];
                    const c = ['#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444', '#b91c1c'];
                    const active = p.epc === level;
                    return (
                      <div key={level} className="flex items-center gap-2">
                        <div
                          className="h-6 rounded-r-sm flex items-center justify-end pr-2 text-[11px] font-bold text-white"
                          style={{ width: `${w[i]}%`, background: c[i], opacity: active ? 1 : 0.35, outline: active ? '2px solid #212529' : 'none', outlineOffset: '1px' }}
                        >
                          {level}
                        </div>
                        {active && <span className="text-[11px] font-bold text-immo-gray-900">&larr; This property</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h2 className="text-[16px] font-bold text-immo-gray-900 mb-3">Location</h2>
              <div className="h-[280px] rounded-lg overflow-hidden">
                <Suspense fallback={<div className="w-full h-full bg-immo-gray-100 flex items-center justify-center text-[13px] text-immo-gray-500">Loading map...</div>}>
                  <MapView
                    properties={[property]}
                    center={[p.location.lat, p.location.lng]}
                    zoom={15}
                    singleMarker
                  />
                </Suspense>
              </div>
              <p className="text-[13px] text-immo-gray-500 mt-2">{p.location.address}, {p.location.district}, {p.location.city}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] shrink-0 space-y-5">
            {/* Contact */}
            <div className="bg-white rounded-lg border border-immo-gray-200 p-5 sticky top-[76px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-immo-gray-100">
                <div className="w-10 h-10 bg-immo-blue rounded-lg flex items-center justify-center text-white text-[13px] font-bold">
                  {p.agency.logo}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-immo-gray-900">{p.agency.name}</p>
                  <div className="flex items-center gap-1 text-[11px] text-immo-gray-500">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    4.8 (127 reviews)
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-immo-blue text-white text-[13px] font-semibold rounded-lg hover:bg-immo-blue-dark transition-colors">
                  <Phone size={15} /> Request a call
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-immo-gray-900 text-[13px] font-semibold rounded-lg border border-immo-gray-200 hover:bg-immo-gray-50 transition-colors">
                  <Mail size={15} /> Send a message
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-[13px] font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors">
                  <MessageCircle size={15} /> WhatsApp
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-immo-gray-100 space-y-1">
                <button className="w-full text-center text-[12px] text-immo-blue font-medium hover:underline">Schedule a viewing</button>
                <button className="w-full text-center text-[12px] text-immo-blue font-medium hover:underline">Ask for the exact address</button>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg border border-immo-gray-200 p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h3 className="text-[13px] font-bold text-immo-gray-900 mb-3">Property details</h3>
              <div className="space-y-2 text-[13px]">
                <Row label="Reference" value={`IU-${String(p.id).padStart(6, '0')}`} />
                <Row label="Listed on" value={new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
                <Row label="Type" value={p.type} />
                {p.specs.condition && <Row label="Condition" value={p.specs.condition} />}
                {p.specs.furnished !== undefined && <Row label="Furnished" value={p.specs.furnished ? 'Yes' : 'No'} />}
              </div>
            </div>

            {/* Safety */}
            <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
              <div className="flex gap-2.5">
                <Shield size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-semibold text-amber-900 mb-1">Safety tips</p>
                  <ul className="text-[11px] text-amber-700 space-y-0.5">
                    <li>&bull; Never pay before visiting</li>
                    <li>&bull; Verify agent credentials</li>
                    <li>&bull; Check property documents</li>
                    <li>&bull; Report suspicious listings</li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="text-[20px] font-bold text-immo-gray-900 mb-5">Similar properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map(sp => <PropertyCard key={sp.id} property={sp} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 bg-immo-gray-50 rounded-md">
      <span className="text-immo-blue">{icon}</span>
      <div>
        <p className="text-[11px] text-immo-gray-500">{label}</p>
        <p className="text-[13px] font-semibold text-immo-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-immo-gray-500">{label}</span>
      <span className="font-medium text-immo-gray-900">{value}</span>
    </div>
  );
}
