'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { formatPrice } from '@/lib/formatters';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { 
  Car, 
  PlaneTakeoff, 
  UtensilsCrossed, 
  Building2, 
  Compass, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Clock, 
  Calendar,
  PhoneCall,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function ServicesPage() {
  const { services, siteSettings, language, openBookingModal } = useStore();
  const t = useTranslation(language);

  // Car Rental interactive estimator state
  const [carDurationType, setCarDurationType] = useState<'hourly' | 'daily'>('hourly');
  const [carUnits, setCarUnits] = useState(4); // 4 hours or 1 day

  const carService = services.find(s => s.category === 'car_rental') || services[0];
  const hourlyRate = carService?.hourly_rate || 600;
  const dailyRate = carService?.daily_rate || 4500;

  const carEstimatedPrice = carDurationType === 'hourly'
    ? hourlyRate * carUnits
    : dailyRate * carUnits;

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
    <div className="space-y-16 pb-24">
      
      {/* Page Header */}
      <section className="relative py-20 bg-resort-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=80"
            alt="Services Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/75 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
            <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
            <span>Resort Concierge & Fleet</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            {t.services.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>
      </section>

      {/* 1. FEATURED RENT A CAR SPOTLIGHT & CALCULATOR */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-resort-gold/40 shadow-elevated grid grid-cols-1 lg:grid-cols-12">
          
          {/* Image & Badges */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80"
              alt="Rent a Car Fleet"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-resort-navy/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-3 py-1 bg-resort-gold text-resort-navy text-xs font-bold uppercase tracking-wider rounded-lg inline-block">
                Premium Chauffeur & Self-Drive Fleet
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Luxury Vehicles for Chattogram Exploration
              </h3>
              <p className="text-xs text-slate-200 line-clamp-2">
                Toyota Premio, Allion, Prado SUV, Harrier, and Executive Hiace Microbus available 24/7.
              </p>
            </div>
          </div>

          {/* Interactive Car Rental Calculator */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-resort-primary font-bold text-xs uppercase tracking-widest">
                <Car className="w-4 h-4 text-resort-gold" />
                <span>Rent a Car Instant Estimator</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Transparent Hourly & Daily Rates
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Whether you need a swift 3-hour transfer through the city or a full-day coastal drive along Patenga, customize your booking below.
              </p>

              {/* Rate Selector Mode */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Rental Duration Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setCarDurationType('hourly');
                      setCarUnits(4);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      carDurationType === 'hourly'
                        ? 'border-resort-primary bg-resort-primary/5 ring-1 ring-resort-primary'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">Hourly Rental</span>
                      <Clock className="w-4 h-4 text-resort-primary" />
                    </div>
                    <span className="text-xs font-serif font-bold text-resort-primary block mt-1">
                      {formatPrice(hourlyRate, siteSettings.currency_symbol)} / hour
                    </span>
                    <span className="text-[10px] text-slate-500">Min 2 hours package</span>
                  </button>

                  <button
                    onClick={() => {
                      setCarDurationType('daily');
                      setCarUnits(1);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      carDurationType === 'daily'
                        ? 'border-resort-primary bg-resort-primary/5 ring-1 ring-resort-primary'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">Full Day Package</span>
                      <Calendar className="w-4 h-4 text-resort-primary" />
                    </div>
                    <span className="text-xs font-serif font-bold text-resort-primary block mt-1">
                      {formatPrice(dailyRate, siteSettings.currency_symbol)} / day
                    </span>
                    <span className="text-[10px] text-slate-500">10-hour day limit</span>
                  </button>
                </div>
              </div>

              {/* Units Counter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {carDurationType === 'hourly' ? 'Number of Hours:' : 'Number of Days:'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={carDurationType === 'hourly' ? 2 : 1}
                    max={carDurationType === 'hourly' ? 12 : 14}
                    value={carUnits}
                    onChange={(e) => setCarUnits(Number(e.target.value))}
                    className="w-full accent-resort-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="px-3 py-1.5 rounded-lg bg-resort-sand border border-resort-gold/30 text-xs font-bold text-resort-primary min-w-[70px] text-center">
                    {carUnits} {carDurationType === 'hourly' ? 'Hrs' : 'Days'}
                  </span>
                </div>
              </div>

              {/* Estimate Summary */}
              <div className="p-4 rounded-2xl bg-resort-sand border border-resort-gold/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Estimated Rental Cost:
                  </span>
                  <span className="text-2xl font-serif font-bold text-resort-primary">
                    {formatPrice(carEstimatedPrice, siteSettings.currency_symbol)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <span>Chauffeur & Fuel included</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openBookingModal({
                type: 'service',
                itemId: carService.id,
                itemName: `Rent a Car (${carDurationType === 'hourly' ? `${carUnits} Hours` : `${carUnits} Days`})`,
                itemPrice: carEstimatedPrice,
                serviceRateType: carDurationType,
                hourlyRate: hourlyRate,
                dailyRate: dailyRate,
              })}
              className="w-full py-4 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-resort-goldLight" />
              <span>Reserve Car With Chauffeur</span>
            </button>
          </div>

        </div>
      </div>

      <BluebellDivider text="All Resort Amenities & Services" />

      {/* 2. SERVICES CATALOG GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.filter(s => s.is_visible).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-resort-gold/30 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
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

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-resort-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

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
                  className="w-full py-3 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-resort-goldLight" />
                  <span>Reserve Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
