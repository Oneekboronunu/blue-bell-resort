'use client';

import React, { useState } from 'react';
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
  ArrowRight,
  Filter,
  Eye
} from 'lucide-react';

export default function RoomsPage() {
  const { rooms, siteSettings, language, openBookingModal } = useStore();
  const t = useTranslation(language);

  const [filterType, setFilterType] = useState('all');

  const filteredRooms = filterType === 'all'
    ? rooms
    : rooms.filter(r => r.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="space-y-16 pb-20">
      
      {/* Page Header */}
      <section className="relative py-20 bg-resort-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&auto=format&fit=crop&q=80"
            alt="Suites Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/70 to-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
            <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
            <span>Luxury Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.rooms.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-resort-gold/20">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-resort-gold" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Filter Suites:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Accommodations' },
              { id: 'standard', label: 'Standard Room' },
              { id: 'deluxe', label: 'Deluxe Room' },
              { id: 'family', label: 'Family Suite' },
              { id: 'premium', label: 'Premium Suite' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-resort-primary text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-resort-gold/30 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Gallery Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.cover_image || room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {room.tag && (
                    <span className="absolute top-4 left-4 bg-resort-primary/95 text-resort-goldLight text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {room.tag}
                    </span>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-sm font-bold text-resort-primaryDark shadow-sm font-serif">
                    {formatPrice(room.price_per_night, siteSettings.currency_symbol)}
                    <span className="text-xs font-sans font-normal text-slate-500"> / night</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-4 h-4 text-resort-gold" />
                      {room.capacity_adults} Adults, {room.capacity_children} Child
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <BedDouble className="w-4 h-4 text-resort-gold" />
                      {room.bed_type}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Maximize2 className="w-4 h-4 text-resort-gold" />
                      {room.room_size}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 hover:text-resort-primary transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {room.description}
                  </p>

                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-resort-primaryDark mb-2">
                      Key Suite Amenities
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.slice(0, 6).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-resort-gold shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-slate-100">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="py-3 text-center text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Full Suite Details</span>
                </Link>

                <button
                  onClick={() => openBookingModal({
                    type: 'room',
                    itemId: room.id,
                    itemName: room.name,
                    itemPrice: room.price_per_night,
                  })}
                  className="py-3 text-center text-xs font-bold text-white bg-resort-primary hover:bg-resort-primaryLight rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-resort-goldLight" />
                  <span>{t.rooms.bookThisRoom}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
