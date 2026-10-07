'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Car, Users } from 'lucide-react';

export default function AboutPage() {
  const { siteSettings, openBookingModal } = useStore();

  return (
    <div className="space-y-20 pb-24">
      
      {/* Page Header */}
      <section className="relative py-20 bg-resort-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&auto=format&fit=crop&q=80"
            alt="About Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/70 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
            <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
            <span>Our Heritage & Vision</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            About {siteSettings.hotel_name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            &ldquo;{siteSettings.tagline}&rdquo; — redefining luxury hospitality along the historic coastal shores of Chattogram, Bangladesh.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-resort-goldDark block">
              The Genesis of Calm
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-resort-primaryDark leading-tight">
              A Peaceful Coastal Haven Designed for True Restoration
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Founded with the conviction that true hospitality is an art of thoughtful discretion, <strong className="text-resort-primary">{siteSettings.hotel_name}</strong> was created to give discerning travelers, families, and business leaders an elevated retreat in Chattogram.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              From our architectural interplay of natural light and soothing sand tones to our bluebell blossom garden pavilions, every nuance invites relaxation. Our full-service fleet, banquet ballroom, and coastal culinary team ensure unforgettable stays.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80"
                alt="Blue Bell Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <BluebellDivider text="Our Core Values" />

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-resort-gold/30 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-resort-gold/15 flex items-center justify-center text-resort-primary">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Uncompromising Luxury</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Premium Italian linens, posturepedic bedding, marble baths, and curated designer amenities in every suite.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-resort-gold/30 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-resort-gold/15 flex items-center justify-center text-resort-primary">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Heartfelt Bengali Hospitality</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Authentic warmth, intuitive concierge assistance, and personalized attention for every guest request.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-resort-gold/30 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-resort-gold/15 flex items-center justify-center text-resort-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Safety & Exclusivity</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Round-the-clock security, private chauffeur logistics, hygienic dining, and seamless airport reception.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
