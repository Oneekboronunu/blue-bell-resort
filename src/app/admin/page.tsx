'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { formatPrice, formatDateTime } from '@/lib/formatters';
import { 
  BedDouble, 
  Car, 
  CalendarCheck, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  MessageSquare, 
  Phone,
  Plus,
  Settings,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { 
    bookings, 
    rooms, 
    services, 
    media, 
    siteSettings, 
    updateBookingStatus 
  } = useStore();

  const totalInquiries = bookings.length;
  const newInquiries = bookings.filter(b => b.status === 'new').length;
  const confirmedInquiries = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);

  const availableRoomsCount = rooms.filter(r => r.is_available).length;
  const activeServicesCount = services.filter(s => s.is_visible).length;

  const handleWhatsAppGuest = (booking: any) => {
    const rawPhone = (booking.guest_phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('880') ? rawPhone : `880${rawPhone.replace(/^0+/, '')}`;
    const text = encodeURIComponent(
      `Hello ${booking.guest_name}, this is the reservations team from ${siteSettings.hotel_name}. Regarding your booking request for ${booking.item_name} (Ref: ${booking.reference_no}), we are pleased to assist you.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome & Quick Info Bar */}
      <div className="bg-white p-6 rounded-2xl border border-resort-gold/30 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-resort-goldDark">
            Operations & Live State
          </span>
          <h1 className="font-serif text-2xl font-bold text-resort-primaryDark">
            Welcome to {siteSettings.hotel_name} Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Active Property Location: <strong className="text-slate-700">{siteSettings.region}</strong> ({siteSettings.latitude.toFixed(4)}, {siteSettings.longitude.toFixed(4)})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/rooms"
            className="px-4 py-2 bg-resort-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-resort-primaryLight transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Suites</span>
          </Link>
          <Link
            href="/admin/services"
            className="px-4 py-2 bg-resort-sand text-resort-primaryDark text-xs font-bold rounded-xl border border-resort-gold/30 hover:bg-resort-sandDark transition-colors flex items-center gap-1.5"
          >
            <Car className="w-3.5 h-3.5 text-resort-gold" />
            <span>Services & Fleet</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Inquiries
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-resort-primary">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-slate-900">{totalInquiries}</span>
            {newInquiries > 0 && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                {newInquiries} New
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">{confirmedInquiries} reservations confirmed</p>
        </div>

        {/* Estimated Value */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Inquiry Volume
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-resort-primary">
              {formatPrice(totalRevenue, siteSettings.currency_symbol)}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Cumulative inquiry pipeline</p>
        </div>

        {/* Active Suites */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Suites Available
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <BedDouble className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-slate-900">{availableRoomsCount}</span>
            <span className="text-xs text-slate-500">/ {rooms.length} total</span>
          </div>
          <p className="text-[11px] text-slate-500">Instant availability toggle in Rooms</p>
        </div>

        {/* Active Services */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Fleet & Services
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-slate-900">{activeServicesCount}</span>
            <span className="text-xs text-slate-500">Active</span>
          </div>
          <p className="text-[11px] text-slate-500">Rent a Car & VIP Transfers active</p>
        </div>

      </div>

      {/* Recent Booking Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Recent Booking & Service Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Every guest submission on the website appears here instantly.
            </p>
          </div>

          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-resort-primary hover:text-resort-primaryLight flex items-center gap-1"
          >
            <span>View All ({bookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
              <tr>
                <th className="p-4">Ref & Date</th>
                <th className="p-4">Guest Details</th>
                <th className="p-4">Item / Suite</th>
                <th className="p-4">Duration / Date</th>
                <th className="p-4">Total Bill</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-medium">
                    <span className="text-resort-primary font-bold">{b.reference_no}</span>
                    <span className="block text-[10px] text-slate-400 font-sans">{formatDateTime(b.created_at)}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{b.guest_name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{b.guest_phone}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-800 block">{b.item_name}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{b.type}</span>
                  </td>

                  <td className="p-4 text-[11px] text-slate-600">
                    {b.type === 'room' ? (
                      <span>{b.check_in} → {b.check_out}</span>
                    ) : (
                      <span>{b.service_date} ({b.service_duration || 'Standard'})</span>
                    )}
                  </td>

                  <td className="p-4 font-serif font-bold text-resort-primary text-sm">
                    {formatPrice(b.total_amount, siteSettings.currency_symbol)}
                  </td>

                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : b.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      <option value="new">● New</option>
                      <option value="confirmed">✓ Confirmed</option>
                      <option value="cancelled">✕ Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleWhatsAppGuest(b)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                      title="Direct WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/admin/rooms"
          className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:border-resort-gold transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <BedDouble className="w-6 h-6 text-resort-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-resort-primary" />
          </div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Rooms & Suites Manager</h4>
          <p className="text-xs text-slate-500 mt-1">
            Edit rates in ৳, upload high-res images/videos, set room tags and amenities.
          </p>
        </Link>

        <Link
          href="/admin/services"
          className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:border-resort-gold transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <Car className="w-6 h-6 text-resort-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-resort-primary" />
          </div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Services & Car Rental</h4>
          <p className="text-xs text-slate-500 mt-1">
            Configure hourly and daily car rental pricing, restaurant dining, and event halls.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:border-resort-gold transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <Settings className="w-6 h-6 text-resort-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-resort-primary" />
          </div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Branding & Location</h4>
          <p className="text-xs text-slate-500 mt-1">
            Update hotel name, tagline, logo, phone, WhatsApp, coordinates, and Google Maps pin.
          </p>
        </Link>
      </div>

    </div>
  );
}
