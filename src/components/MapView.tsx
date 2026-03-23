'use client';

import { useEffect, useRef } from 'react';
import type { Property } from '@/data/properties';

interface MapViewProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  singleMarker?: boolean;
}

export default function MapView({ properties, center, zoom = 12, height = '100%', singleMarker = false }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
      }

      const defaultCenter = center || [0.3136, 32.5811];
      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: !singleMarker }).setView(defaultCenter, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Big pin for single property view
      const pinIcon = L.divIcon({
        className: '',
        html: `<div style="position:relative;">
          <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="#133DBD"/>
            <circle cx="18" cy="18" r="8" fill="white"/>
            <path d="M18 12l-6 5h2v5h3v-3h2v3h3v-5h2l-6-5z" fill="#133DBD"/>
          </svg>
        </div>`,
        iconSize: [36, 48],
        iconAnchor: [18, 48],
      });

      // Small circle for multi-marker
      const smallIcon = L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;background:#133DBD;border:2.5px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const priceIcon = (price: string) => L.divIcon({
        className: '',
        html: `<div style="background:white;color:#212529;font-family:Poppins,sans-serif;font-size:11px;font-weight:600;padding:3px 8px;border-radius:4px;box-shadow:0 2px 6px rgba(0,0,0,0.2);border:1px solid #E9ECEF;white-space:nowrap;cursor:pointer;">${price}</div>`,
        iconAnchor: [30, 15],
      });

      properties.forEach(p => {
        let icon;
        if (singleMarker) {
          icon = pinIcon;
        } else {
          icon = priceIcon(
            p.price >= 1e9 ? `${(p.price/1e9).toFixed(1)}B` :
            p.price >= 1e6 ? `${(p.price/1e6).toFixed(0)}M` :
            p.price.toLocaleString()
          );
        }

        const marker = L.marker([p.location.lat, p.location.lng], { icon }).addTo(map);

        if (!singleMarker) {
          marker.bindPopup(`
            <div style="font-family:Poppins,sans-serif;padding:8px;min-width:200px;">
              <img src="${p.imageUrl}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:4px;margin-bottom:8px;background:#F1F3F5;" loading="lazy" />
              <div style="font-size:11px;color:#6C757D;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${p.type}</div>
              <div style="font-size:15px;font-weight:700;color:#212529;margin-bottom:4px;">UGX ${p.price >= 1e9 ? (p.price/1e9).toFixed(1)+'B' : p.price >= 1e6 ? (p.price/1e6).toFixed(0)+'M' : p.price.toLocaleString()}${p.transaction === 'rent' ? ' <span style="font-size:11px;font-weight:400;color:#6C757D">/mo</span>' : ''}</div>
              <div style="font-size:12px;color:#495057;">${p.specs.bedrooms > 0 ? p.specs.bedrooms + ' beds · ' : ''}${p.specs.area > 0 ? p.specs.area + ' m²' : p.specs.landArea ? p.specs.landArea.toLocaleString() + ' m²' : ''}</div>
              <div style="font-size:12px;color:#6C757D;margin-top:2px;">${p.location.district}, ${p.location.city}</div>
              <a href="/property/${p.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:#133DBD;font-weight:600;text-decoration:none;">View details &rarr;</a>
            </div>
          `, { maxWidth: 260, closeButton: true });
        }
      });

      if (properties.length > 1 && !center) {
        const bounds = L.latLngBounds(properties.map(p => [p.location.lat, p.location.lng]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }

      mapInstanceRef.current = map;
      setTimeout(() => map.invalidateSize(), 100);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties, center, zoom, singleMarker]);

  return <div ref={mapRef} style={{ height, width: '100%', borderRadius: '8px', background: '#F1F3F5' }} />;
}
