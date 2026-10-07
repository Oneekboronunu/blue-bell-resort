'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store/useStore';
import { formatPrice } from '@/lib/formatters';
import { X, Calendar, User, Mail, Phone, Clock, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { BluebellDivider, BluebellFlowerIcon } from './BluebellMotif';

export default function BookingModal() {
  const { 
    bookingModal, 
    closeBookingModal, 
    addBooking, 
    rooms, 
    services, 
    siteSettings 
  } = useStore();

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [serviceDate, setServiceDate] = useState('');
  const [serviceRateType, setServiceRateType] = useState<'hourly' | 'daily' | 'fixed'>('hourly');
  const [hoursCount, setHoursCount] = useState(4);
  const [daysCount, setDaysCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (bookingModal.isOpen) {
      setSubmittedBooking(null);
      setErrorMsg('');
      setSelectedItemId(bookingModal.itemId || '');
      
      // Set default dates
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 2);
      
      setCheckIn(today.toISOString().split('T')[0]);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
      setServiceDate(today.toISOString().split('T')[0]);

      if (bookingModal.serviceRateType) {
        setServiceRateType(bookingModal.serviceRateType);
      }
    }
  }, [bookingModal.isOpen, bookingModal.itemId, bookingModal.serviceRateType]);

  if (!bookingModal.isOpen) return null;

  const isRoom = bookingModal.type === 'room';
  const selectedRoom = rooms.find(r => r.id === selectedItemId) || rooms[0];
  const selectedService = services.find(s => s.id === selectedItemId) || services[0];

  // Calculate estimated total
  let totalEstimated = 0;
  if (isRoom && selectedRoom) {
    let nights = 1;
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    totalEstimated = (selectedRoom.price_per_night || 0) * nights;
  } else if (!isRoom && selectedService) {
    if (selectedService.category === 'car_rental') {
      if (serviceRateType === 'hourly') {
        totalEstimated = (selectedService.hourly_rate || selectedService.price || 600) * hoursCount;
      } else {
        totalEstimated = (selectedService.daily_rate || 4500) * daysCount;
      }
    } else {
      totalEstimated = selectedService.price || 0;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    const itemName = isRoom ? selectedRoom?.name : selectedService?.name;
    const durationStr = isRoom 
      ? `${checkIn} to ${checkOut}` 
      : (selectedService?.category === 'car_rental' 
          ? (serviceRateType === 'hourly' ? `${hoursCount} Hours` : `${daysCount} Days`)
          : 'Standard Reservation');

    const newBooking = addBooking({
      type: bookingModal.type,
      item_id: selectedItemId,
      item_name: itemName || 'Resort Experience',
      guest_name: guestName.trim(),
      guest_email: guestEmail.trim() || 'guest@example.com',
      guest_phone: guestPhone.trim(),
      check_in: isRoom ? checkIn : undefined,
      check_out: isRoom ? checkOut : undefined,
      guests_count: isRoom ? guestsCount : undefined,
      service_date: !isRoom ? serviceDate : undefined,
      service_duration: !isRoom ? durationStr : undefined,
      service_rate_type: !isRoom ? serviceRateType : undefined,
      total_amount: totalEstimated,
      special_requests: specialRequests.trim(),
    });

    setSubmittedBooking(newBooking);
  };

  const handleWhatsAppNotify = () => {
    if (!submittedBooking) return;
    const rawPhone = (siteSettings.whatsapp || siteSettings.phone || '+8801819000000').replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('880') ? rawPhone : `880${rawPhone.replace(/^0+/, '')}`;

    const text = encodeURIComponent(
      `*New Reservation Request - ${siteSettings.hotel_name}*\n` +
      `Reference: ${submittedBooking.reference_no}\n` +
      `Item: ${submittedBooking.item_name}\n` +
      `Guest Name: ${submittedBooking.guest_name}\n` +
      `Phone: ${submittedBooking.guest_phone}\n` +
      `Total: ${siteSettings.currency_symbol} ${submittedBooking.total_amount.toLocaleString()}\n` +
      `Dates: ${isRoom ? `${checkIn} to ${checkOut}` : serviceDate}\n` +
      `Special Requests: ${submittedBooking.special_requests || 'None'}`
    );

    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-elevated border border-resort-gold/30 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-resort-primary text-white p-6 sm:p-7 relative">
          <button
            onClick={closeBookingModal}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 text-resort-goldLight text-xs font-semibold uppercase tracking-widest mb-1">
            <BluebellFlowerIcon className="w-4 h-4" color="#DFCCAB" />
            <span>{isRoom ? 'Suite Reservation' : 'Experience & Fleet Reservation'}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            {submittedBooking ? 'Reservation Confirmed' : (isRoom ? (selectedRoom?.name || 'Book Your Suite') : (selectedService?.name || 'Reserve Experience'))}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            {siteSettings.tagline} • {siteSettings.region}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submittedBooking ? (
            /* Success View */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-resort-gold/20 text-resort-primaryDark text-xs font-bold rounded-full mb-2">
                  Reference: {submittedBooking.reference_no}
                </span>
                <h4 className="font-serif text-2xl font-bold text-resort-primaryDark">
                  Thank You, {submittedBooking.guest_name}!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Your reservation request has been received by our front desk. We will reach out to you directly at <strong className="text-slate-800">{submittedBooking.guest_phone}</strong> to confirm your stay details.
                </p>
              </div>

              <div className="bg-resort-sand p-4 rounded-xl border border-resort-gold/30 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Item:</span>
                  <span className="font-semibold text-resort-primaryDark">{submittedBooking.item_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-bold text-resort-primary">{formatPrice(submittedBooking.total_amount, siteSettings.currency_symbol)}</span>
                </div>
                {isRoom ? (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-medium">{checkIn} → {checkOut}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Date:</span>
                    <span className="font-medium">{serviceDate} ({submittedBooking.service_duration})</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleWhatsAppNotify}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Connect Instantly on WhatsApp
                </button>
                <button
                  onClick={closeBookingModal}
                  className="px-6 py-3 bg-resort-sand hover:bg-resort-sandDark text-slate-800 text-xs font-semibold rounded-xl border border-resort-gold/30 transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Item Selector if needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isRoom ? 'Select Suite Type' : 'Select Experience / Service'}
                  </label>
                  <select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                  >
                    {isRoom ? (
                      rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} — {formatPrice(r.price_per_night, siteSettings.currency_symbol)}/night
                        </option>
                      ))
                    ) : (
                      services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.category === 'car_rental' ? `Hourly & Daily` : `${formatPrice(s.price, siteSettings.currency_symbol)}`})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Specific options for Car Rental */}
                {!isRoom && selectedService?.category === 'car_rental' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Rental Plan
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setServiceRateType('hourly')}
                        className={`flex-1 py-2 text-xs rounded-xl font-medium border transition-all ${
                          serviceRateType === 'hourly'
                            ? 'bg-resort-primary text-white border-resort-primary shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Hourly ({formatPrice(selectedService.hourly_rate || 600, siteSettings.currency_symbol)}/hr)
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceRateType('daily')}
                        className={`flex-1 py-2 text-xs rounded-xl font-medium border transition-all ${
                          serviceRateType === 'daily'
                            ? 'bg-resort-primary text-white border-resort-primary shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Full Day ({formatPrice(selectedService.daily_rate || 4500, siteSettings.currency_symbol)}/day)
                      </button>
                    </div>
                  </div>
                )}

                {/* Capacity display for Room */}
                {isRoom && selectedRoom && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests (Family)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Date & Duration Selection */}
              {isRoom ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                      required
                    />
                  </div>
                  {selectedService?.category === 'car_rental' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {serviceRateType === 'hourly' ? 'Number of Hours' : 'Number of Days'}
                      </label>
                      {serviceRateType === 'hourly' ? (
                        <input
                          type="number"
                          min={2}
                          max={24}
                          value={hoursCount}
                          onChange={(e) => setHoursCount(Math.max(2, Number(e.target.value)))}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                        />
                      ) : (
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={daysCount}
                          onChange={(e) => setDaysCount(Math.max(1, Number(e.target.value)))}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Guest Details */}
              <div className="pt-2 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-resort-primary uppercase tracking-widest">
                  Guest Contact Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Mahbubul Alam"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+880 1711-000000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="guest@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Special Inquiries / Arrival Timing / Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Let us know if you need early check-in, honeymoon decoration, airport pickup, or specific vehicle model..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-resort-gold focus:outline-none focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Price Calculation Summary & CTA */}
              <div className="bg-resort-sand p-4 rounded-xl border border-resort-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                    Estimated Total Bill
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-bold font-serif text-resort-primaryDark">
                      {formatPrice(totalEstimated, siteSettings.currency_symbol)}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isRoom ? '(inclusive of luxury amenities)' : '(estimated fare)'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-resort-goldLight" />
                    Confirm Reservation
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
