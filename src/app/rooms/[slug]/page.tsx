'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { formatPrice } from '@/lib/formatters';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { 
  Users, 
  BedDouble, 
  Sparkles, 
  Check, 
  Maximize2, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Tv, 
  Wifi, 
  Coffee, 
  Bath,
  Play,
  X,
  Share2,
  ChevronRight
} from 'lucide-react';

export default function RoomDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { rooms, siteSettings, language, openBookingModal } = useStore();
  const t = useTranslation(language);

  const room = rooms.find(r => r.slug === slug || r.id === slug);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Live price calculation for sidebar
  const [calcCheckIn, setCalcCheckIn] = useState(() => new Date().toISOString().split('T')[0]);
  const [calcCheckOut, setCalcCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [calcGuests, setCalcGuests] = useState(2);

  if (!room) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-resort-primaryDark">Suite Not Found</h2>
        <p className="text-slate-600 text-sm">The accommodation you are looking for might have been moved or updated.</p>
        <Link href="/rooms" className="inline-block px-6 py-3 bg-resort-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider">
          Browse All Rooms
        </Link>
      </div>
    );
  }

  const currentCover = selectedImage || room.cover_image || room.images[0];
  const otherRooms = rooms.filter(r => r.id !== room.id).slice(0, 2);

  // Calculate nights
  let nights = 1;
  if (calcCheckIn && calcCheckOut) {
    const d1 = new Date(calcCheckIn);
    const d2 = new Date(calcCheckOut);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
  const estimatedTotal = (room.price_per_night || 0) * nights;

  return (
    <div className="space-y-12 pb-24">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-resort-sand/60 border-b border-resort-gold/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Link href="/" className="hover:text-resort-primary">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/rooms" className="hover:text-resort-primary">Rooms & Suites</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-resort-primaryDark">{room.name}</span>
          </div>

          <Link href="/rooms" className="flex items-center gap-1.5 text-resort-primary hover:text-resort-primaryLight font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Suites</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-resort-gold/20">
          <div>
            <div className="flex items-center gap-2 text-resort-goldDark text-xs font-bold uppercase tracking-widest mb-1.5">
              <BluebellFlowerIcon className="w-4 h-4" color="#0B3C8C" />
              <span>{room.type} • {room.view}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-resort-primaryDark">
              {room.name}
            </h1>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Starting Rate</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-bold text-resort-primaryDark">
                {formatPrice(room.price_per_night, siteSettings.currency_symbol)}
              </span>
              <span className="text-xs text-slate-500 font-sans">/ night</span>
            </div>
          </div>
        </div>

        {/* Gallery & Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          
          {/* Main Photo */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-card border border-resort-gold/30 bg-slate-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentCover}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              
              {room.video_url && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute bottom-4 left-4 bg-resort-navy/90 hover:bg-resort-navy text-white px-4 py-2 rounded-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 border border-resort-gold/40 shadow-elevated transition-all"
                >
                  <Play className="w-4 h-4 text-resort-gold fill-resort-gold" />
                  <span>Watch Suite Video Tour</span>
                </button>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {(room.images && room.images.length > 0 ? room.images : [room.cover_image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                    currentCover === img
                      ? 'border-resort-gold ring-2 ring-resort-gold/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${room.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specification Box */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-resort-gold/30 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-resort-primaryDark pb-2 border-b border-slate-100">
                Suite Key Specifications
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Max Capacity:</span>
                  <span className="font-semibold text-slate-800">{room.capacity_adults} Adults, {room.capacity_children} Child</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Bed Configuration:</span>
                  <span className="font-semibold text-slate-800">{room.bed_type}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Suite Dimensions:</span>
                  <span className="font-semibold text-slate-800">{room.room_size}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Window & Balcony View:</span>
                  <span className="font-semibold text-slate-800">{room.view}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Check-In / Out:</span>
                  <span className="font-semibold text-slate-800">{siteSettings.check_in_time} / {siteSettings.check_out_time}</span>
                </div>
              </div>

              {/* Instant Reservation Calculation Box */}
              <div className="bg-resort-sand p-4 rounded-xl border border-resort-gold/30 space-y-3 mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-resort-primaryDark block">
                  Quick Stay Calculator
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">Check-in</label>
                    <input
                      type="date"
                      value={calcCheckIn}
                      onChange={(e) => setCalcCheckIn(e.target.value)}
                      className="w-full text-[11px] bg-white border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">Check-out</label>
                    <input
                      type="date"
                      value={calcCheckOut}
                      min={calcCheckIn}
                      onChange={(e) => setCalcCheckOut(e.target.value)}
                      className="w-full text-[11px] bg-white border border-slate-300 rounded-lg p-1.5"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-resort-gold/20 flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] text-slate-500">{nights} Night{nights > 1 ? 's' : ''} Stay:</span>
                  </div>
                  <span className="font-serif text-lg font-bold text-resort-primary">
                    {formatPrice(estimatedTotal, siteSettings.currency_symbol)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openBookingModal({
                type: 'room',
                itemId: room.id,
                itemName: room.name,
                itemPrice: room.price_per_night,
              })}
              className="mt-6 w-full py-3.5 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-resort-goldLight" />
              <span>Reserve This Suite Now</span>
            </button>
          </div>

        </div>

        {/* Detailed Description & Full Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 pt-12 border-t border-resort-gold/20">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-resort-primaryDark">
                Suite Overview & Experience
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* All Amenities */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-resort-primaryDark">
                Full Suite Amenities & Privileges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-resort-gold/20 text-xs text-slate-800 shadow-subtle">
                    <div className="p-1 rounded-md bg-resort-gold/15 text-resort-primary">
                      <Check className="w-4 h-4 text-resort-goldDark" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resort Policies */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl font-bold text-resort-primaryDark">
                Hospitality Policies
              </h3>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs space-y-2.5 text-slate-600">
                <p>• <strong>Check-in:</strong> {siteSettings.check_in_time} | <strong>Check-out:</strong> {siteSettings.check_out_time}</p>
                <p>• <strong>Deposit & Confirmation:</strong> Flexible reservation inquiry with front-desk confirmation.</p>
                <p>• <strong>Housekeeping:</strong> Daily turndown service, fresh organic linens, and sanitized amenities.</p>
                <p>• <strong>Chauffeur Support:</strong> On-demand car rental and airport pickup available via concierge.</p>
              </div>
            </div>
          </div>

          {/* Related Suites */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-serif text-xl font-bold text-resort-primaryDark">
              Other Luxury Suites
            </h3>
            
            <div className="space-y-4">
              {otherRooms.map((r) => (
                <Link
                  key={r.id}
                  href={`/rooms/${r.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-resort-gold/30 shadow-subtle hover:shadow-card transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.cover_image || r.images[0]}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-resort-primary">
                        {r.name}
                      </h4>
                      <span className="text-[11px] text-slate-500">{r.view}</span>
                    </div>
                    <span className="font-serif font-bold text-resort-primary text-xs">
                      {formatPrice(r.price_per_night, siteSettings.currency_symbol)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Video Modal Player */}
      {isVideoModalOpen && room.video_url && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              src={room.video_url}
              controls
              autoPlay
              className="w-full aspect-video"
            />
          </div>
        </div>
      )}

    </div>
  );
}
