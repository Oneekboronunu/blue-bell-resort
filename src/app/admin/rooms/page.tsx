'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { Room } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Users, 
  BedDouble, 
  Sparkles, 
  Image as ImageIcon,
  Video,
  ExternalLink
} from 'lucide-react';

export default function AdminRoomsPage() {
  const { 
    rooms, 
    siteSettings, 
    addRoom, 
    updateRoom, 
    deleteRoom, 
    toggleRoomAvailability 
  } = useStore();

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Room>>({});
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [imagesInput, setImagesInput] = useState('');

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setFormData({ ...room });
    setAmenitiesInput(room.amenities.join(', '));
    setImagesInput(room.images.join('\n'));
    setIsAddModalOpen(true);
  };

  const openNewModal = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      slug: '',
      type: 'Deluxe',
      tag: 'New Suite',
      price_per_night: 6500,
      capacity_adults: 2,
      capacity_children: 1,
      bed_type: 'King Bed',
      room_size: '400 sq.ft (37 m²)',
      view: 'Ocean View',
      short_description: 'Sophisticated coastal suite with high-end luxury amenities.',
      description: 'Relax in exceptional comfort with plush bedding, private balcony, and attentive resort concierge.',
      cover_image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80',
      ],
      is_available: true,
      is_featured: true,
      rating: 4.9,
      review_count: 10,
    });
    setAmenitiesInput('High-Speed Wi-Fi, Climate Control, 55" Smart TV, Nespresso Bar, Luxury Toiletries');
    setImagesInput('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80');
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const parsedAmenities = amenitiesInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const parsedImages = imagesInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const roomPayload: any = {
      ...formData,
      slug,
      amenities: parsedAmenities,
      images: parsedImages.length > 0 ? parsedImages : [formData.cover_image || ''],
    };

    if (editingRoom) {
      updateRoom(editingRoom.id, roomPayload);
    } else {
      addRoom(roomPayload);
    }

    setIsAddModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({
          ...prev,
          cover_image: result,
          images: [result, ...(prev.images || [])],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Rooms & Suites Inventory
          </h1>
          <p className="text-xs text-slate-500">
            Manage your hotel accommodations, nightly rates in ৳, photos, and availability.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-4 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-resort-goldLight" />
          <span>Add New Suite</span>
        </button>
      </div>

      {/* Rooms Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.cover_image || room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                    room.is_available ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {room.is_available ? '● Available' : '✕ Unavailable'}
                  </span>
                  {room.tag && (
                    <span className="bg-resort-primary/90 text-resort-goldLight text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {room.tag}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-resort-primaryDark shadow-sm font-serif">
                  {formatPrice(room.price_per_night, siteSettings.currency_symbol)}
                  <span className="text-[10px] font-sans font-normal text-slate-500"> / night</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-slate-900">{room.name}</h3>
                  <span className="text-xs text-slate-500 font-medium">{room.type}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                  {room.short_description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 py-2 border-y border-slate-100">
                  <div>
                    <span className="text-slate-400">Capacity: </span>
                    <strong className="text-slate-700">{room.capacity_adults} Adults, {room.capacity_children} Child</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Bed: </span>
                    <strong className="text-slate-700">{room.bed_type}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Size: </span>
                    <strong className="text-slate-700">{room.room_size}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">View: </span>
                    <strong className="text-slate-700">{room.view}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 4).map((a, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {a}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-[10px] text-slate-400">+{room.amenities.length - 4} more</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
              <button
                onClick={() => toggleRoomAvailability(room.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  room.is_available
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                }`}
              >
                Toggle Availability
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(room)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  title="Edit Suite"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${room.name}?`)) {
                      deleteRoom(room.id);
                    }
                  }}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                  title="Delete Suite"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-elevated border border-resort-gold/40 overflow-hidden my-8">
            
            <div className="bg-resort-navy text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold">
                  {editingRoom ? `Edit: ${editingRoom.name}` : 'Add New Suite'}
                </h3>
                <p className="text-xs text-slate-300">
                  Update pricing, media, specifications, and amenities.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Suite Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="e.g. Royal Ocean Suite"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nightly Price ({siteSettings.currency_symbol}) *</label>
                  <input
                    type="number"
                    value={formData.price_per_night || 0}
                    onChange={(e) => setFormData({ ...formData, price_per_night: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category / Type</label>
                  <input
                    type="text"
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="Standard / Deluxe / Suite"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="e.g. Most Popular"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bed Configuration</label>
                  <input
                    type="text"
                    value={formData.bed_type || ''}
                    onChange={(e) => setFormData({ ...formData, bed_type: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="King Bed / 2 Twin"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adults Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity_adults || 2}
                    onChange={(e) => setFormData({ ...formData, capacity_adults: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Children Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity_children || 0}
                    onChange={(e) => setFormData({ ...formData, capacity_children: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Room Size</label>
                  <input
                    type="text"
                    value={formData.room_size || ''}
                    onChange={(e) => setFormData({ ...formData, room_size: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="450 sq.ft (42 m²)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Window & Balcony View</label>
                <input
                  type="text"
                  value={formData.view || ''}
                  onChange={(e) => setFormData({ ...formData, view: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  placeholder="Panoramic Ocean Sunset View"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.short_description || ''}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  placeholder="One sentence summary for catalog cards"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amenities (comma separated)
                </label>
                <input
                  type="text"
                  value={amenitiesInput}
                  onChange={(e) => setAmenitiesInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  placeholder="High-Speed Wi-Fi, 4K TV, Marble Tub, Nespresso Bar"
                />
              </div>

              {/* Cover Image & Upload */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700">Cover Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.cover_image || ''}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    className="flex-1 text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  <label className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gallery Photos (one URL per line)
                </label>
                <textarea
                  rows={2}
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Video Tour URL (Optional MP4 link)
                </label>
                <input
                  type="text"
                  value={formData.video_url || ''}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  placeholder="https://assets.mixkit.co/videos/preview/..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-resort-goldLight" />
                  <span>Save Suite Data</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
