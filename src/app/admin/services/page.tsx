'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { Service, ServicePriceUnit } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Car, 
  PlaneTakeoff, 
  UtensilsCrossed, 
  Building2, 
  Compass, 
  Sparkles, 
  X,
  Check,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminServicesPage() {
  const { 
    services, 
    siteSettings, 
    addService, 
    updateService, 
    deleteService, 
    toggleServiceVisibility 
  } = useStore();

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [featuresInput, setFeaturesInput] = useState('');

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({ ...service });
    setFeaturesInput((service.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      category: 'car_rental',
      short_description: 'Luxury chauffeured transport experience.',
      description: 'Reliable and comfortable transfers with professional concierge support.',
      price: 600,
      price_unit: 'per_hour',
      hourly_rate: 600,
      daily_rate: 4500,
      image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80',
      icon_name: 'Car',
      is_visible: true,
      featured: true,
    });
    setFeaturesInput('Chauffeur included\nFuel & Tolls covered\n24/7 Availability');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const parsedFeatures = featuresInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload: any = {
      ...formData,
      slug,
      features: parsedFeatures,
    };

    if (editingService) {
      updateService(editingService.id, payload);
    } else {
      addService(payload);
    }

    setIsModalOpen(false);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Car': return <Car className="w-5 h-5" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Services & Fleet Management
          </h1>
          <p className="text-xs text-slate-500">
            Manage Rent a Car rates (hourly & daily), airport transfers, dining, and event bookings.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-4 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-resort-goldLight" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-2xl border shadow-card overflow-hidden flex flex-col justify-between transition-all ${
              service.is_visible ? 'border-slate-200/90' : 'border-rose-200 opacity-60'
            }`}
          >
            <div>
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 p-2 rounded-xl bg-resort-primary text-white shadow-sm">
                  {getIcon(service.icon_name)}
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                    service.is_visible ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                  }`}>
                    {service.is_visible ? 'Visible' : 'Hidden'}
                  </span>
                </div>

                {service.category === 'car_rental' ? (
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    <span className="bg-resort-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      ৳{service.hourly_rate || 600}/hr
                    </span>
                    <span className="bg-resort-gold text-resort-navy text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      ৳{service.daily_rate || 4500}/day
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-resort-primaryDark shadow-sm font-serif">
                    {formatPrice(service.price, siteSettings.currency_symbol)} {service.price_unit === 'per_person' && '/ person'}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">{service.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                  {service.short_description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  {service.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Check className="w-3.5 h-3.5 text-resort-gold shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
              <button
                onClick={() => toggleServiceVisibility(service.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                  service.is_visible
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                {service.is_visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{service.is_visible ? 'Hide Service' : 'Show Service'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(service)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  title="Edit Service"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${service.name}?`)) {
                      deleteService(service.id);
                    }
                  }}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-elevated border border-resort-gold/40 overflow-hidden my-8">
            
            <div className="bg-resort-navy text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold">
                  {editingService ? `Edit Service: ${editingService.name}` : 'Add New Resort Service'}
                </h3>
                <p className="text-xs text-slate-300">
                  Configure pricing models, car rental hours/days, and descriptions.
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="e.g. Rent a Car (Chauffeur & Self Drive)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category || 'car_rental'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  >
                    <option value="car_rental">Rent a Car Fleet</option>
                    <option value="airport_pickup">Airport Pickup & Drop</option>
                    <option value="restaurant">Fine Dining Restaurant</option>
                    <option value="event_hall">Grand Event Hall</option>
                    <option value="guided_tours">Guided Coastal Tours</option>
                    <option value="spa">Spa & Wellness</option>
                    <option value="laundry">Laundry & Dry Clean</option>
                    <option value="other">Other Service</option>
                  </select>
                </div>
              </div>

              {/* Specific pricing for Car Rental vs Standard */}
              {formData.category === 'car_rental' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-resort-sand/60 border border-resort-gold/30">
                  <div>
                    <label className="block text-xs font-bold text-resort-primaryDark mb-1">Hourly Rate (৳/hr)</label>
                    <input
                      type="number"
                      value={formData.hourly_rate || 600}
                      onChange={(e) => setFormData({ ...formData, hourly_rate: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-resort-primaryDark mb-1">Full Day Rate (৳/day)</label>
                    <input
                      type="number"
                      value={formData.daily_rate || 4500}
                      onChange={(e) => setFormData({ ...formData, daily_rate: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Price ({siteSettings.currency_symbol})</label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pricing Unit</label>
                    <select
                      value={formData.price_unit || 'fixed'}
                      onChange={(e) => setFormData({ ...formData, price_unit: e.target.value as ServicePriceUnit })}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    >
                      <option value="fixed">Fixed Rate</option>
                      <option value="per_person">Per Person</option>
                      <option value="per_day">Per Day</option>
                      <option value="per_hour">Per Hour</option>
                      <option value="custom">Custom Quote</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Icon Style</label>
                  <select
                    value={formData.icon_name || 'Car'}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  >
                    <option value="Car">Car Fleet (Car)</option>
                    <option value="PlaneTakeoff">Airport Shuttle (PlaneTakeoff)</option>
                    <option value="UtensilsCrossed">Restaurant / Food (UtensilsCrossed)</option>
                    <option value="Building2">Banquet / Hall (Building2)</option>
                    <option value="Compass">Tour Guide (Compass)</option>
                    <option value="Sparkles">Spa / Luxury (Sparkles)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={formData.short_description || ''}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Service Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Features List (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none resize-none text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-resort-goldLight" />
                  <span>Save Service</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
