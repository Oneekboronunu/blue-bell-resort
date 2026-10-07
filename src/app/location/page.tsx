'use client';

import React from 'react';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import DynamicGoogleMap from '@/components/common/DynamicGoogleMap';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Plane, 
  Train, 
  Car, 
  Compass, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';

export default function LocationPage() {
  const { siteSettings, language } = useStore();
  const t = useTranslation(language);

  const lat = siteSettings.latitude || 22.3626557;
  const lng = siteSettings.longitude || 91.7825618;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const googleMapsUrl = siteSettings.google_maps_link || `https://www.google.com/maps/place/Blue+Bell+Resort/@${lat},${lng},712m`;

  const attractions = [
    {
      name: 'Patenga Sea Beach',
      distance: '3.5 km (8 mins drive)',
      desc: 'Famous coastal shoreline with scenic sunset views, street food, and speed boat rides.',
    },
    {
      name: 'Shah Amanat Int. Airport (CGP)',
      distance: '6.2 km (15 mins drive)',
      desc: 'Seamless direct connection to Dhaka, Middle East, and international hubs with our VIP transfer.',
    },
    {
      name: 'Bangabandhu Sheikh Mujibur Rahman Tunnel',
      distance: '5.0 km (10 mins drive)',
      desc: 'The landmark underwater tunnel connecting Chattogram to Anwara and Southern Cox’s Bazar route.',
    },
    {
      name: 'Chittagong Railway Station',
      distance: '14.0 km (25 mins drive)',
      desc: 'Direct rail link from Dhaka Subarna / Sonar Bangla Express.',
    },
    {
      name: 'Foy’s Lake & Amusement Complex',
      distance: '18.0 km (35 mins drive)',
      desc: 'Picturesque natural lake, boat safaris, water park, and lush hill green view.',
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      
      {/* Page Header */}
      <section className="relative py-20 bg-resort-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80"
            alt="Location Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/70 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
            <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
            <span>Map & Directions</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.location.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Dynamic Interactive Google Map */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-resort-goldDark block">
                Live Interactive Map
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-resort-primaryDark">
                Find Your Way to Serenity
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-resort-goldLight" />
                <span>{t.location.getDirections}</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 shadow-sm flex items-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-resort-gold" />
                <span>{t.location.openInMaps}</span>
              </a>
            </div>
          </div>

          <DynamicGoogleMap height="h-[520px]" />
        </div>

        {/* Address Card & Getting Here Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-resort-gold/30 shadow-card space-y-6">
            <h3 className="font-serif text-2xl font-bold text-resort-primaryDark pb-3 border-b border-slate-100">
              Resort Location Details
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-resort-gold/15 text-resort-primary mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Address</span>
                  <p className="text-slate-600 leading-relaxed">{siteSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-resort-gold/15 text-resort-primary mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">GPS Coordinates</span>
                  <p className="text-slate-600 font-mono">
                    Latitude: {lat.toFixed(7)}<br />
                    Longitude: {lng.toFixed(7)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-resort-gold/15 text-resort-primary mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Front Desk / Concierge</span>
                  <a href={`tel:${siteSettings.phone}`} className="text-resort-primary font-semibold hover:underline">
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-resort-gold/15 text-resort-primary mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Email Support</span>
                  <a href={`mailto:${siteSettings.email}`} className="text-resort-primary font-semibold hover:underline">
                    {siteSettings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${(siteSettings.whatsapp || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                Chat with Concierge for Directions
              </a>
            </div>
          </div>

          {/* Right: Nearby Attractions & Transit Distances */}
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-resort-gold/30 shadow-card space-y-6">
            <h3 className="font-serif text-2xl font-bold text-resort-primaryDark pb-3 border-b border-slate-100">
              Nearby Landmarks & Distances
            </h3>

            <div className="space-y-4">
              {attractions.map((attr, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-resort-sand/50 border border-resort-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-slate-900">{attr.name}</h4>
                    <p className="text-xs text-slate-600 font-light">{attr.desc}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-resort-gold/30 text-xs font-semibold text-resort-primary shrink-0 self-start sm:self-center font-mono">
                    {attr.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
