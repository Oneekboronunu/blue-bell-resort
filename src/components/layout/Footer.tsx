'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { BluebellLogo, BluebellDivider } from '@/components/common/BluebellMotif';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  Award,
  Lock
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { siteSettings, language } = useStore();
  const t = useTranslation(language);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null; // Admin has its own layout

  const lat = siteSettings.latitude || 22.3626557;
  const lng = siteSettings.longitude || 91.7825618;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const googleMapsUrl = siteSettings.google_maps_link || `https://www.google.com/maps/place/Blue+Bell+Resort/@${lat},${lng},712m`;

  return (
    <footer className="bg-resort-navy text-slate-300 relative overflow-hidden border-t-2 border-resort-gold/30">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-resort-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-resort-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 lg:pr-4">
            <BluebellLogo variant="light" size="lg" />
            <p className="text-xs text-slate-300 leading-relaxed font-light mt-3">
              &ldquo;{siteSettings.tagline}&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience the unmatched coastal beauty and refined tranquility of Chattogram. From handcrafted suites to curated chauffeured fleet services.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-resort-goldLight bg-white/5 border border-resort-gold/20 px-3 py-1.5 rounded-lg">
                <Award className="w-4 h-4 text-resort-gold" />
                <span>Premier Luxury Resort</span>
              </div>
              <a
                href={siteSettings.social_links?.facebook || 'https://facebook.com/bluebellresort'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white bg-[#1877F2] hover:bg-[#166fe5] px-3 py-1.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Page</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider text-resort-goldLight border-b border-white/10 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.rooms}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.location}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-resort-goldLight transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Signature Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider text-resort-goldLight border-b border-white/10 pb-2">
              {t.footer.resortServices}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors flex items-center justify-between">
                  <span>Rent a Car (Hourly & Daily)</span>
                  <span className="text-[10px] text-resort-gold font-mono">৳600/hr</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors flex items-center justify-between">
                  <span>VIP Airport Pickup & Drop</span>
                  <span className="text-[10px] text-resort-gold font-mono">CGP Terminal</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors flex items-center justify-between">
                  <span>The Bluebell Restaurant</span>
                  <span className="text-[10px] text-resort-gold font-mono">Coastal Cuisine</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors flex items-center justify-between">
                  <span>Grand Event & Banquet Hall</span>
                  <span className="text-[10px] text-resort-gold font-mono">350 Guests</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors flex items-center justify-between">
                  <span>Coastal Guided Tours</span>
                  <span className="text-[10px] text-resort-gold font-mono">Patenga Coast</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-resort-goldLight transition-colors flex items-center justify-between">
                  <span>Serenity Spa & Wellness</span>
                  <span className="text-[10px] text-resort-gold font-mono">Aromatherapy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Map Directions */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider text-resort-goldLight border-b border-white/10 pb-2">
              {t.footer.contactInfo}
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-resort-gold shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {siteSettings.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-resort-gold shrink-0" />
                <a href={`tel:${siteSettings.phone}`} className="hover:text-resort-goldLight transition-colors">
                  {siteSettings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${(siteSettings.whatsapp || '').replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {siteSettings.whatsapp || siteSettings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-resort-gold shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-resort-goldLight transition-colors">
                  {siteSettings.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-resort-gold hover:bg-resort-goldLight text-resort-navy text-xs font-bold rounded-lg shadow-sm transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Driving Directions
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-slate-200 text-[11px] rounded-lg border border-white/10 transition-colors"
              >
                <ExternalLink className="w-3 h-3 text-resort-gold" />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Floral Motif Divider */}
        <BluebellDivider dark className="my-10 opacity-70" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light pt-2">
          <p>
            © {new Date().getFullYear()} <strong className="text-white font-medium">{siteSettings.hotel_name}</strong>. {t.footer.allRightsReserved}
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-500">
              Coordinates: {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
            </span>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1.5 text-slate-400 hover:text-resort-goldLight transition-colors text-xs"
            >
              <Lock className="w-3 h-3 text-resort-gold" />
              <span>{t.footer.adminLogin}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
