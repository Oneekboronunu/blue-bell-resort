'use client';

import React from 'react';
import { useStore } from '@/lib/store/useStore';
import { MapPin, Navigation, ExternalLink, Phone, Compass } from 'lucide-react';

interface DynamicGoogleMapProps {
  height?: string;
  className?: string;
  showOverlayCard?: boolean;
}

export default function DynamicGoogleMap({
  height = 'h-[450px]',
  className = '',
  showOverlayCard = true,
}: DynamicGoogleMapProps) {
  const { siteSettings } = useStore();

  const lat = siteSettings.latitude || 22.3626557;
  const lng = siteSettings.longitude || 91.7825618;
  const address = siteSettings.address || 'Marine View Road, Patenga Coastline, Chattogram, Bangladesh';
  
  // Directions URL for Google Maps
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const googleMapsUrl = siteSettings.google_maps_link || `https://www.google.com/maps/place/Blue+Bell+Resort/@${lat},${lng},712m`;

  // Dynamic Iframe URL: supports keyless fallback or API key embed
  const embedUrl = siteSettings.google_maps_embed_key
    ? `https://www.google.com/maps/embed/v1/place?key=${siteSettings.google_maps_embed_key}&q=${lat},${lng}&zoom=16`
    : `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-resort-gold/30 shadow-card bg-slate-100 ${className}`}>
      {/* Dynamic Google Maps Iframe */}
      <iframe
        title="Blue Bell Resort Location"
        src={embedUrl}
        className={`w-full ${height} border-0 filter grayscale-[10%] contrast-[105%] hover:grayscale-0 transition-all duration-700`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating Interactive Hotel Info & Directions Card */}
      {showOverlayCard && (
        <div className="absolute top-4 left-4 right-4 md:right-auto md:max-w-md bg-white/95 backdrop-blur-md p-5 rounded-xl border border-resort-gold/30 shadow-elevated transition-all">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-resort-primary text-white rounded-lg shadow-sm shrink-0">
              <MapPin className="w-5 h-5 text-resort-goldLight" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-resort-goldDark bg-resort-gold/10 px-2 py-0.5 rounded">
                  {siteSettings.region || 'Chattogram, Bangladesh'}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-resort-primaryDark mt-0.5 truncate">
                {siteSettings.hotel_name || 'Blue Bell Resort'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {address}
              </p>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                GPS: {lat.toFixed(6)}, {lng.toFixed(6)}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-resort-goldLight" />
              Get Directions
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-resort-sand hover:bg-resort-sandDark text-resort-primaryDark text-xs font-medium rounded-lg border border-resort-gold/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-resort-gold" />
              Open in Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
