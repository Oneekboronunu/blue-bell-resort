'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import DynamicGoogleMap from '@/components/common/DynamicGoogleMap';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function ContactPage() {
  const { siteSettings, language, addBooking } = useStore();
  const t = useTranslation(language);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Stay Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save as general inquiry booking
    addBooking({
      type: 'service',
      item_id: 'general-inquiry',
      item_name: `Contact Inquiry: ${subject}`,
      guest_name: name,
      guest_email: email || 'contact@example.com',
      guest_phone: phone,
      total_amount: 0,
      special_requests: message,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* Page Header */}
      <section className="relative py-20 bg-resort-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&auto=format&fit=crop&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/70 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
            <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
            <span>24/7 Front Desk & Concierge</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Connect With Our Team
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            We are here to assist your room reservations, banquet scheduling, car rentals, and bespoke requests.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Live Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-resort-gold/30 shadow-card space-y-6">
              <h3 className="font-serif text-2xl font-bold text-resort-primaryDark pb-2 border-b border-slate-100">
                Resort Concierge Desk
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-resort-gold/15 text-resort-primary mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Physical Address</span>
                    <p className="text-slate-600 leading-relaxed">{siteSettings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-resort-gold/15 text-resort-primary mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Telephone & Hotline</span>
                    <a href={`tel:${siteSettings.phone}`} className="text-resort-primary font-semibold hover:underline block">
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Direct WhatsApp Concierge</span>
                    <a 
                      href={`https://wa.me/${(siteSettings.whatsapp || '').replace(/[^0-9]/g, '')}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-semibold hover:underline block"
                    >
                      {siteSettings.whatsapp || siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-resort-gold/15 text-resort-primary mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Email Inquiries</span>
                    <a href={`mailto:${siteSettings.email}`} className="text-resort-primary font-semibold hover:underline block">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map Preview */}
            <DynamicGoogleMap height="h-[260px]" showOverlayCard={false} />
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-resort-gold/30 shadow-card">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Message Delivered</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for writing to {siteSettings.hotel_name}. Our front-desk concierge will review your message and reach out shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-resort-sand hover:bg-resort-sandDark text-resort-primaryDark text-xs font-bold rounded-xl border border-resort-gold/30 transition-all"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-resort-primaryDark">
                    Send Direct Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the details below and we will contact you directly via call or WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Farhan Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:border-resort-gold focus:outline-none focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1819-000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:border-resort-gold focus:outline-none focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:border-resort-gold focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:border-resort-gold focus:outline-none focus:bg-white"
                    >
                      <option value="Room Reservation Inquiry">Room Reservation Inquiry</option>
                      <option value="Rent a Car & Airport Transfer">Rent a Car & Airport Transfer</option>
                      <option value="Grand Hall / Wedding Event">Grand Hall / Wedding Event</option>
                      <option value="Restaurant / Dining Booking">Restaurant / Dining Booking</option>
                      <option value="Corporate Partnership">Corporate Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details regarding dates, room types, guest count, or corporate catering preferences..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-4 focus:border-resort-gold focus:outline-none focus:bg-white resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-resort-goldLight" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
