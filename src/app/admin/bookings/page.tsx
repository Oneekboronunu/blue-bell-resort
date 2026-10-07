'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { BookingStatus, BookingType } from '@/types';
import { formatPrice, formatDateTime } from '@/lib/formatters';
import { 
  CalendarCheck, 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User,
  BedDouble,
  Car,
  FileText
} from 'lucide-react';

export default function AdminBookingsPage() {
  const { bookings, siteSettings, updateBookingStatus } = useStore();

  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | BookingType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesType = typeFilter === 'all' || b.type === typeFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      !query ||
      b.guest_name.toLowerCase().includes(query) ||
      b.reference_no.toLowerCase().includes(query) ||
      b.guest_phone.toLowerCase().includes(query) ||
      b.item_name.toLowerCase().includes(query);

    return matchesStatus && matchesType && matchesSearch;
  });

  const handleWhatsAppGuest = (booking: any) => {
    const rawPhone = (booking.guest_phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('880') ? rawPhone : `880${rawPhone.replace(/^0+/, '')}`;
    const text = encodeURIComponent(
      `Hello ${booking.guest_name}, this is the reservations team from ${siteSettings.hotel_name}.\n\nRegarding your reservation for: *${booking.item_name}*\nBooking Reference: *${booking.reference_no}*\nStatus: ${booking.status.toUpperCase()}\nEstimated Total: ${siteSettings.currency_symbol} ${booking.total_amount.toLocaleString()}\n\nHow may we assist with your check-in or arrival timing?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Guest Reservations & Inquiries
          </h1>
          <p className="text-xs text-slate-500">
            View, confirm, and manage all incoming suite bookings and resort service requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Total Inquiries:</span>
          <span className="px-2.5 py-1 bg-resort-primary text-white text-xs font-bold rounded-lg">
            {bookings.length}
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ref, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['all', 'new', 'confirmed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-white text-resort-primary shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['all', 'room', 'service'] as const).map((tp) => (
              <button
                key={tp}
                onClick={() => setTypeFilter(tp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  typeFilter === tp
                    ? 'bg-white text-resort-primary shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tp === 'room' ? 'Suites' : tp === 'service' ? 'Services' : 'All Types'}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
            <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No matching reservations found</p>
            <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 md:p-6 space-y-4 hover:shadow-card transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-resort-primary bg-resort-primary/10 px-2.5 py-1 rounded-lg">
                    {b.reference_no}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Received: {formatDateTime(b.created_at)}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Status:</span>
                  <select
                    value={b.status}
                    onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer ${
                      b.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : b.status === 'cancelled'
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    <option value="new">● New Inquiry</option>
                    <option value="confirmed">✓ Confirmed</option>
                    <option value="cancelled">✕ Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Guest & Item Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Guest Details */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Guest Information
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{b.guest_name}</div>
                  <div className="text-slate-600 font-mono flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-resort-gold" />
                    <span>{b.guest_phone}</span>
                  </div>
                  {b.guest_email && (
                    <div className="text-slate-500 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-resort-gold" />
                      <span className="truncate">{b.guest_email}</span>
                    </div>
                  )}
                </div>

                {/* Item & Dates */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Reservation Specifics
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{b.item_name}</div>
                  {b.type === 'room' ? (
                    <div className="text-slate-600">
                      <strong>Dates:</strong> {b.check_in} → {b.check_out} ({b.guests_count || 2} Guests)
                    </div>
                  ) : (
                    <div className="text-slate-600">
                      <strong>Date:</strong> {b.service_date} ({b.service_duration || 'Standard'})
                    </div>
                  )}
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider">
                    Type: <strong className="text-slate-800">{b.type}</strong>
                  </div>
                </div>

                {/* Total & Quick Contact Actions */}
                <div className="space-y-3 bg-resort-sand/60 p-3.5 rounded-xl border border-resort-gold/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Estimated Bill
                    </span>
                    <span className="font-serif text-xl font-bold text-resort-primary">
                      {formatPrice(b.total_amount, siteSettings.currency_symbol)}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleWhatsAppGuest(b)}
                      className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <a
                      href={`tel:${b.guest_phone}`}
                      className="py-2 px-3 bg-resort-primary hover:bg-resort-primaryLight text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Special Requests */}
              {b.special_requests && (
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Special Request / Message: </strong>
                    <span>{b.special_requests}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
