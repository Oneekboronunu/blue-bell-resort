'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { MediaItem } from '@/types';
import { 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  ExternalLink,
  X,
  Play
} from 'lucide-react';

export default function AdminMediaPage() {
  const { media, addMediaItem, deleteMediaItem } = useStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload Form State
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaCategory, setMediaCategory] = useState<any>('resort');

  const filteredMedia = activeCategory === 'all'
    ? media
    : media.filter(m => m.category === activeCategory);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video');
      setMediaType(isVideo ? 'video' : 'image');
      if (!mediaTitle) setMediaTitle(file.name.replace(/\.[^/.]+$/, ''));

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle || !mediaUrl) return;

    addMediaItem({
      title: mediaTitle,
      url: mediaUrl,
      type: mediaType,
      category: mediaCategory,
    });

    setIsUploadModalOpen(false);
    setMediaTitle('');
    setMediaUrl('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Resort Media Library
          </h1>
          <p className="text-xs text-slate-500">
            Upload, inspect, and manage photos & videos for suites, dining, fleet, and public gallery.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4 text-resort-goldLight" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Assets' },
          { id: 'resort', label: 'Resort & Pool' },
          { id: 'rooms', label: 'Suites' },
          { id: 'dining', label: 'Dining' },
          { id: 'services', label: 'Fleet' },
          { id: 'events', label: 'Banquet Hall' },
          { id: 'surroundings', label: 'Surroundings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === tab.id
                ? 'bg-resort-primary text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video src={item.url} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="w-8 h-8 text-white fill-resort-gold" />
                  </div>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              <span className="absolute top-3 left-3 bg-resort-navy/90 text-resort-goldLight text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-serif font-bold text-slate-900 text-sm truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 capitalize">
                Type: {item.type}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete media asset "${item.title}"?`)) {
                      deleteMediaItem(item.id);
                    }
                  }}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                  title="Delete Asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Asset Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-elevated border border-resort-gold/40 overflow-hidden my-8">
            <div className="bg-resort-navy text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold">Add Media Asset</h3>
                <p className="text-xs text-slate-300">Upload an image/video or paste a direct public URL.</p>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-white/80 hover:text-white p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Title *</label>
                <input
                  type="text"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  placeholder="e.g. Infinity Pool Sunset View"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Media Type</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  >
                    <option value="image">Image (JPEG/PNG/WebP)</option>
                    <option value="video">Video (MP4/WebM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none"
                  >
                    <option value="resort">Resort & Grounds</option>
                    <option value="rooms">Suites & Rooms</option>
                    <option value="dining">Fine Dining</option>
                    <option value="services">Services & Fleet</option>
                    <option value="events">Grand Events</option>
                    <option value="surroundings">Surroundings</option>
                  </select>
                </div>
              </div>

              {/* File Picker or URL */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Direct URL or Local File</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-resort-gold focus:outline-none font-mono text-[11px]"
                  placeholder="https://images.unsplash.com/..."
                  required
                />

                <div className="pt-1">
                  <label className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-resort-gold rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-600">Choose File from Device</span>
                    <span className="text-[10px] text-slate-400">Image or MP4</span>
                    <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold rounded-xl shadow-gold"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
