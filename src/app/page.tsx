'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { formatPrice } from '@/lib/formatters';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import DynamicGoogleMap from '@/components/common/DynamicGoogleMap';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  BedDouble, 
  Car, 
  PlaneTakeoff, 
  UtensilsCrossed, 
  Building2, 
  Compass, 
  Sparkle,
  ArrowRight, 
  Check, 
  Star, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Play,
  Clock,
  Navigation
} from 'lucide-react';

export default function HomePage() {
  const { siteSettings, rooms, services, testimonials, language, openBookingModal } = useStore();
  const t = useTranslation(language);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = siteSettings.hero_slides || [];

  // Search filter state for Hero Bar
  const [searchRoomType, setSearchRoomType] = useState('all');
  const [searchGuests, setSearchGuests] = useState(2);

  // Testimonials Carousel state
  const [reviewRatingFilter, setReviewRatingFilter] = useState('all');
  const [reviewCarouselIndex, setReviewCarouselIndex] = useState(0);
  const [reviewDirection, setReviewDirection] = useState(1);
  const [isReviewPaused, setIsReviewPaused] = useState(false);

  const filteredTestimonials = testimonials.filter((t) => {
    if (reviewRatingFilter === 'all') return true;
    return t.rating === Number(reviewRatingFilter);
  });

  const itemsPerSlide = 3;
  const totalReviewSlides = Math.max(1, Math.ceil(filteredTestimonials.length / itemsPerSlide));
  const currentReviewSlideItems = filteredTestimonials.slice(
    (reviewCarouselIndex % totalReviewSlides) * itemsPerSlide,
    (reviewCarouselIndex % totalReviewSlides) * itemsPerSlide + itemsPerSlide
  );

  // Auto slide reviews with smooth gliding transition
  useEffect(() => {
    if (totalReviewSlides <= 1 || isReviewPaused) return;
    const interval = setInterval(() => {
      setReviewDirection(1);
      setReviewCarouselIndex((prev) => (prev + 1) % totalReviewSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalReviewSlides, isReviewPaused]);

  // Auto slide Hero
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || {
    title: 'Where Comfort Meets Calm',
    subtitle: 'An oasis of coastal serenity and timeless luxury in Chattogram, Bangladesh.',
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&auto=format&fit=crop&q=85',
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-6 h-6" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION & BOOKING SEARCH BAR */}
      <section className="relative h-[88vh] min-h-[620px] max-h-[880px] w-full overflow-hidden bg-resort-navy flex items-center justify-center">
        {/* Background Images with Fade Transition */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark luxury gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/55 to-black/40" />
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-3 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-md pointer-events-auto transition-all border border-white/10"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-3 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 backdrop-blur-md pointer-events-auto transition-all border border-white/10"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 pt-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-[0.25em] animate-fade-in">
            <BluebellFlowerIcon className="w-4 h-4" color="#DFCCAB" />
            <span>Chattogram Coastline • 5-Star Haven</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white drop-shadow-md">
            {activeSlide.title || siteSettings.tagline}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            {activeSlide.subtitle || 'Where comfort meets calm. Indulge in coastal tranquility, luxury suites, and bespoke hospitality.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openBookingModal({ type: 'room' })}
              className="px-8 py-3.5 bg-resort-gold hover:bg-resort-goldLight text-resort-navy font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold hover:shadow-elevated transition-all duration-300 hover:scale-[1.03] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.hero.search}</span>
            </button>
            
            <Link
              href="/rooms"
              className="px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs uppercase tracking-widest rounded-xl backdrop-blur-md border border-white/20 transition-all"
            >
              {t.hero.viewAllSuites}
            </Link>
          </div>
        </div>

        {/* Bottom Booking Search Bar Floating Widget */}
        <div className="absolute bottom-4 inset-x-4 md:inset-x-8 max-w-6xl mx-auto z-20 hidden md:block">
          <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-elevated border border-resort-gold/30">
            <div className="grid grid-cols-12 gap-3 items-center">
              
              {/* Room Selection */}
              <div className="col-span-3 border-r border-slate-200/80 pr-3">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.hero.roomType}
                </label>
                <div className="flex items-center gap-2 text-slate-800">
                  <BedDouble className="w-4 h-4 text-resort-primary" />
                  <select
                    value={searchRoomType}
                    onChange={(e) => setSearchRoomType(e.target.value)}
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Suites ({rooms.length})</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({formatPrice(r.price_per_night, siteSettings.currency_symbol)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests Count */}
              <div className="col-span-2 border-r border-slate-200/80 pr-3">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.hero.guests}
                </label>
                <div className="flex items-center gap-2 text-slate-800">
                  <Users className="w-4 h-4 text-resort-primary" />
                  <select
                    value={searchGuests}
                    onChange={(e) => setSearchGuests(Number(e.target.value))}
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Check-in */}
              <div className="col-span-2 border-r border-slate-200/80 pr-3">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.hero.checkIn}
                </label>
                <div className="flex items-center gap-2 text-slate-800">
                  <Calendar className="w-4 h-4 text-resort-primary" />
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="col-span-2 border-r border-slate-200/80 pr-3">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.hero.checkOut}
                </label>
                <div className="flex items-center gap-2 text-slate-800">
                  <Calendar className="w-4 h-4 text-resort-primary" />
                  <input
                    type="date"
                    defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Search / Book CTA */}
              <div className="col-span-3">
                <button
                  onClick={() => openBookingModal({
                    type: 'room',
                    itemId: searchRoomType !== 'all' ? searchRoomType : undefined,
                  })}
                  className="w-full py-3 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-resort-goldLight" />
                  <span>{t.hero.checkAvailability}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME & RESORT STORY */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-resort-goldDark text-xs font-bold uppercase tracking-[0.2em]">
              <BluebellFlowerIcon className="w-4 h-4" color="#0B3C8C" />
              <span>Welcome to {siteSettings.hotel_name}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-resort-primaryDark leading-tight">
              A Sanctuary Where Comfort Meets Coastal Serenity
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Nestled along the refreshing sea breezes of Chattogram, <strong className="text-resort-primary font-medium">{siteSettings.hotel_name}</strong> is designed to offer travelers a peaceful respite from everyday life. Every corner of our property reflects understated luxury, thoughtful hospitality, and authentic local charm.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Whether you are arriving for a leisurely coastal escape, a corporate conference, or an intimate seaside wedding, our dedicated concierge, chauffeur fleet, and fine dining chefs ensure an effortless stay.
            </p>

            {/* Quick Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-resort-gold/30 shadow-subtle flex items-start gap-3">
                <div className="p-2 rounded-lg bg-resort-gold/15 text-resort-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">5-Star Standards</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Meticulous hygiene & luxury amenities</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-resort-gold/30 shadow-subtle flex items-start gap-3">
                <div className="p-2 rounded-lg bg-resort-gold/15 text-resort-primary">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Chauffeur Fleet</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Hourly & full-day rental options</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-resort-primary hover:text-resort-primaryLight transition-colors"
              >
                <span>Read Full Resort Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border-4 border-white aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80"
                  alt="Blue Bell Resort Pool & Sunset"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Accent Card */}
              <div className="absolute -bottom-6 -left-6 bg-resort-navy text-white p-5 rounded-2xl shadow-elevated border border-resort-gold/30 max-w-[240px] hidden sm:block">
                <div className="flex items-center gap-1.5 text-resort-goldLight mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-resort-gold text-resort-gold" />
                  ))}
                </div>
                <p className="text-xs font-serif font-medium leading-snug">
                  &ldquo;The finest luxury stay on the Chattogram coastline.&rdquo;
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block uppercase tracking-wider">
                  Verified Guest Review
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bluebell Motif Divider */}
      <BluebellDivider text="Suites & Accommodations" />

      {/* 3. FEATURED ROOMS & SUITES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-resort-goldDark">
            Handcrafted Accommodations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-resort-primaryDark">
            {t.rooms.title}
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-white rounded-2xl overflow-hidden border border-resort-gold/30 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Room Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.cover_image || room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {room.tag && (
                    <span className="absolute top-3 left-3 bg-resort-primary/90 backdrop-blur-sm text-resort-goldLight text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {room.tag}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-resort-primaryDark shadow-sm font-serif">
                    {formatPrice(room.price_per_night, siteSettings.currency_symbol)}
                    <span className="text-[10px] font-sans font-normal text-slate-500"> / night</span>
                  </div>
                </div>

                {/* Room Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-resort-gold" />
                      {room.capacity_adults} Adults, {room.capacity_children} Child
                    </span>
                    <span className="font-medium text-slate-600">{room.room_size}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-resort-primary transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                    {room.short_description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-resort-sand text-slate-700 px-2 py-0.5 rounded-md border border-resort-gold/20"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                >
                  {t.rooms.viewDetails}
                </Link>
                <button
                  onClick={() => openBookingModal({ type: 'room', itemId: room.id, itemName: room.name, itemPrice: room.price_per_night })}
                  className="py-2.5 text-center text-xs font-bold text-white bg-resort-primary hover:bg-resort-primaryLight rounded-xl shadow-sm transition-colors"
                >
                  {t.nav.bookNow}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-resort-sand hover:bg-resort-sandDark text-resort-primaryDark font-bold text-xs uppercase tracking-widest rounded-xl border border-resort-gold/40 shadow-sm transition-all"
          >
            <span>Explore All Accommodations</span>
            <ArrowRight className="w-4 h-4 text-resort-gold" />
          </Link>
        </div>
      </section>

      {/* Bluebell Motif Divider */}
      <BluebellDivider text="Services & Fleet" />

      {/* 4. SERVICES & EXPERIENCES (Including Rent a Car Hourly/Daily) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-resort-goldDark">
            Curated Resort Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-resort-primaryDark">
            {t.services.title}
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => s.is_visible).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-resort-gold/30 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Service Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-resort-primary text-white shadow-sm">
                    {getServiceIcon(service.icon_name)}
                  </div>
                  {service.category === 'car_rental' ? (
                    <div className="absolute bottom-3 right-3 flex gap-1">
                      <span className="bg-resort-primary text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                        ৳{service.hourly_rate || 600}/hr
                      </span>
                      <span className="bg-resort-gold text-resort-navy text-[11px] font-bold px-2 py-0.5 rounded shadow">
                        ৳{service.daily_rate || 4500}/day
                      </span>
                    </div>
                  ) : (
                    <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-resort-primaryDark text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm font-serif">
                      {formatPrice(service.price, siteSettings.currency_symbol)} {service.price_unit === 'per_person' && '/ person'}
                    </span>
                  )}
                </div>

                {/* Service Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {service.short_description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-resort-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reserve Service CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal({
                    type: 'service',
                    itemId: service.id,
                    itemName: service.name,
                    itemPrice: service.price,
                    serviceRateType: service.category === 'car_rental' ? 'hourly' : 'fixed',
                    hourlyRate: service.hourly_rate,
                    dailyRate: service.daily_rate,
                  })}
                  className="w-full py-3 bg-resort-sand hover:bg-resort-sandDark text-resort-primaryDark hover:text-resort-primary font-bold text-xs uppercase tracking-wider rounded-xl border border-resort-gold/30 shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-resort-gold" />
                  <span>{t.services.bookService}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS & BENGALI FEEDBACK CAROUSEL */}
      <section className="bg-resort-navy text-white py-20 px-6 relative overflow-hidden">
        {/* Decorative background flourishes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-resort-primary/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-resort-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
              <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
              <span>{language === 'bn' ? 'সম্মানিত অতিথিদের রিভিউ' : 'Guest Impressions & Reviews'}</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {language === 'bn' ? 'আমাদের অতিথিরা যা বলছেন' : 'Words From Our Honored Guests'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
              {language === 'bn'
                ? 'বাজেট-ফ্রেন্ডলি থেকে শুরু করে লাক্সারি অভিজ্ঞতা—অতিথিদের অকপট অনুভূতি।'
                : 'Authentic 4-star and 5-star impressions from vacationers, delegates, and families.'}
            </p>
          </div>

          {/* Rating Filters & Carousel Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
              {[
                { id: 'all', label: language === 'bn' ? 'সকল রিভিউ (All)' : 'All Reviews' },
                { id: '5', label: '⭐⭐⭐⭐⭐ 5-Star' },
                { id: '4', label: '⭐⭐⭐⭐ 4-Star (Budget Friendly)' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setReviewRatingFilter(filter.id);
                    setReviewCarouselIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    reviewRatingFilter === filter.id
                      ? 'bg-resort-gold text-resort-navy shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows & Auto-play status */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
                {reviewCarouselIndex + 1} / {totalReviewSlides}
              </span>
              <button
                onClick={() => {
                  setReviewDirection(-1);
                  setReviewCarouselIndex((prev) => (prev - 1 + totalReviewSlides) % totalReviewSlides);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-resort-gold hover:text-resort-navy text-white transition-all border border-white/10 active:scale-95"
                aria-label="Previous Review Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setReviewDirection(1);
                  setReviewCarouselIndex((prev) => (prev + 1) % totalReviewSlides);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-resort-gold hover:text-resort-navy text-white transition-all border border-white/10 active:scale-95"
                aria-label="Next Review Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport with Silky Smooth Sliding Transition & Pause on Hover */}
          <div 
            className="overflow-hidden min-h-[300px] py-1"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
          >
            <AnimatePresence mode="wait" custom={reviewDirection}>
              <motion.div
                key={`${reviewCarouselIndex}-${reviewRatingFilter}`}
                custom={reviewDirection}
                initial={{ opacity: 0, x: reviewDirection > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reviewDirection > 0 ? -60 : 60 }}
                transition={{
                  x: { type: 'spring', stiffness: 280, damping: 28 },
                  opacity: { duration: 0.35 }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentReviewSlideItems.map((item) => {
                  const guestName = (language === 'bn' && item.name_bn) ? item.name_bn : item.name;
                  const guestLoc = (language === 'bn' && item.location_bn) ? item.location_bn : item.location;
                  const guestComment = (language === 'bn' && item.comment_bn) ? item.comment_bn : item.comment;
                  const guestRoom = (language === 'bn' && item.room_stayed_bn) ? item.room_stayed_bn : item.room_stayed;
                  const stayDate = (language === 'bn' && item.stay_date_bn) ? item.stay_date_bn : item.stay_date;

                  return (
                    <div
                      key={item.id}
                      className="bg-white/10 hover:bg-white/15 border border-resort-gold/30 p-6 sm:p-7 rounded-3xl backdrop-blur-md space-y-5 flex flex-col justify-between shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.01]"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-resort-gold text-resort-gold" />
                            ))}
                            <span className="text-xs font-bold text-resort-goldLight ml-1">
                              {item.rating}.0
                            </span>
                          </div>
                          <span className="text-[10px] text-resort-goldLight bg-resort-gold/15 px-2.5 py-0.5 rounded-full font-mono border border-resort-gold/20">
                            {stayDate}
                          </span>
                        </div>

                        <p className={`text-xs sm:text-sm text-slate-100 leading-relaxed font-light ${
                          language === 'bn' ? 'font-sans' : 'font-serif italic'
                        }`}>
                          &ldquo;{guestComment}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-resort-gold text-resort-navy font-bold text-xs flex items-center justify-center shadow-sm">
                            {guestName.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-serif font-bold text-white text-sm leading-tight">
                              {guestName}
                            </h5>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {guestLoc}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] bg-white/10 text-resort-goldLight px-2.5 py-1 rounded-lg border border-white/10 font-mono shrink-0">
                          {guestRoom}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Pagination Dots */}
          {totalReviewSlides > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              {[...Array(totalReviewSlides)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setReviewDirection(idx > reviewCarouselIndex ? 1 : -1);
                    setReviewCarouselIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    reviewCarouselIndex === idx
                      ? 'w-8 bg-resort-gold'
                      : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 text-xs text-resort-goldLight bg-white/5 border border-resort-gold/20 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-resort-gold" />
              <span>১০০% যাচাইকৃত অতিথি রিভিউ (100% Verified Guest Feedback)</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. DYNAMIC GOOGLE MAP & LOCATION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-resort-goldDark">
            Prime Coastal Location
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-resort-primaryDark">
            {t.location.title}
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>

        <DynamicGoogleMap height="h-[480px]" />
      </section>

    </div>
  );
}
