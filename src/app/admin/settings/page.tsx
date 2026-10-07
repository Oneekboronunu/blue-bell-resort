'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { SiteSettings } from '@/types';
import { 
  Save, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  MessageSquare, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  Navigation,
  ExternalLink
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { siteSettings, updateSiteSettings, resetToDefaults } = useStore();

  const [formData, setFormData] = useState<SiteSettings>({ ...siteSettings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        setFormData(prev => ({ ...prev, logo_url: res }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all site settings, rooms, and services to factory default seed data?')) {
      resetToDefaults();
      setFormData({ ...siteSettings });
      alert('All resort properties have been reset to seed data.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Resort Configuration & Location
          </h1>
          <p className="text-xs text-slate-500">
            Modify hotel branding, contact channels, GPS coordinates, and Google Maps pin.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default Seed Data</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings saved successfully! All updates are live instantly on the public website.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. GENERAL BRANDING & IDENTITY */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-resort-primaryDark">
              1. Brand Identity & Currency
            </h3>
            <p className="text-xs text-slate-500">
              Primary hotel name, tagline, logo wordmark, and currency display.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Hotel Property Name *
              </label>
              <input
                type="text"
                value={formData.hotel_name}
                onChange={(e) => handleChange('hotel_name', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Resort Tagline *
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Currency Code
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                placeholder="BDT"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                value={formData.currency_symbol}
                onChange={(e) => handleChange('currency_symbol', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                placeholder="৳"
              />
            </div>
          </div>

          {/* Logo URL / File Upload */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-700">
              Custom Logo Image (Leave empty to use default wordmark & Bluebell motif)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={formData.logo_url || ''}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                placeholder="https://... or upload below"
                className="flex-1 text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none font-mono"
              />
              <label className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors shrink-0">
                <ImageIcon className="w-4 h-4" />
                <span>Upload Logo File</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
            {formData.logo_url && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-flex items-center gap-4">
                <span className="text-[11px] text-slate-500">Logo Preview:</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.logo_url} alt="Logo Preview" className="h-8 max-w-[150px] object-contain" />
                <button
                  type="button"
                  onClick={() => handleChange('logo_url', '')}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Clear Logo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. CONTACT CHANNELS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-resort-primaryDark">
              2. Guest Contact & Concierge
            </h3>
            <p className="text-xs text-slate-500">
              Hotline phone numbers, WhatsApp numbers, email, and physical address.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Front Desk Telephone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                WhatsApp Concierge Number
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-emerald-500" />
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Concierge Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Physical Street Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Check-in Time
              </label>
              <input
                type="text"
                value={formData.check_in_time}
                onChange={(e) => handleChange('check_in_time', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Check-out Time
              </label>
              <input
                type="text"
                value={formData.check_out_time}
                onChange={(e) => handleChange('check_out_time', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. LOCATION & GOOGLE MAPS SETTINGS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-resort-primaryDark">
              3. Dynamic Location & Google Maps
            </h3>
            <p className="text-xs text-slate-500">
              Precise latitude, longitude, region, and Google Maps embed configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Latitude Coordinates *
              </label>
              <input
                type="number"
                step="0.0000001"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Longitude Coordinates *
              </label>
              <input
                type="number"
                step="0.0000001"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Region / District
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Google Maps Place Link
            </label>
            <input
              type="text"
              value={formData.google_maps_link}
              onChange={(e) => handleChange('google_maps_link', e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none font-mono"
              placeholder="https://www.google.com/maps/place/..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Google Maps Embed API Key (Optional)
            </label>
            <input
              type="text"
              value={formData.google_maps_embed_key || ''}
              onChange={(e) => handleChange('google_maps_embed_key', e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-resort-gold focus:outline-none font-mono"
              placeholder="If blank, automatic keyless fallback embed is used"
            />
          </div>

          {/* Quick Preview of Directions Link */}
          <div className="p-4 bg-resort-sand rounded-2xl border border-resort-gold/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Generated Driving Directions Route
              </span>
              <p className="text-xs font-mono text-resort-primary truncate max-w-lg">
                https://www.google.com/maps/dir/?api=1&destination={formData.latitude},{formData.longitude}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${formData.latitude},${formData.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-lg text-slate-700 hover:text-resort-primary border border-resort-gold/30 text-xs font-semibold flex items-center gap-1 shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Test Map</span>
            </a>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-resort-gold/40 shadow-elevated flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Changes will take effect instantly across all pages and booking calculators.
          </p>

          <button
            type="submit"
            className="px-8 py-3.5 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4 text-resort-goldLight" />
            <span>Save All Configurations</span>
          </button>
        </div>

      </form>

    </div>
  );
}
