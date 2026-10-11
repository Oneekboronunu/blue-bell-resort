'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { 
  Play, 
  Image as ImageIcon, 
  X, 
  Filter, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

function getStreamableEmbed(url: string) {
  const match = url.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/);
  if (match) {
    return `https://streamable.com/e/${match[1]}?autoplay=1&muted=0&loop=1`;
  }
  return url;
}

export default function GalleryPage() {
  const { media, siteSettings, language } = useStore();
  const t = useTranslation(language);

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredMedia = activeCategory === 'all'
    ? media
    : media.filter(m => m.category === activeCategory);

  const activeItem = activeLightboxIndex !== null ? filteredMedia[activeLightboxIndex] : null;

  return (
    <div className="space-y-16 pb-24">
      
      {/* Page Header */}
      <section className="relative py-20 bg-resort-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&auto=format&fit=crop&q=80"
            alt="Gallery Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-resort-navy via-resort-navy/70 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest">
            <BluebellFlowerIcon className="w-3.5 h-3.5" color="#DFCCAB" />
            <span>Visual Tour</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Resort Gallery & Cinematic Impressions
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in the captivating elegance, lush landscaped gardens, and ocean views of Blue Bell Resort.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* Featured Cinematic Walkthrough Video Banner */}
        <div className="bg-gradient-to-r from-resort-navy via-[#071f48] to-resort-navy rounded-3xl p-6 sm:p-8 border-2 border-resort-gold/40 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-resort-gold font-bold">
                ★ Featured Video Walkthrough
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Blue Bell Resort Live Video Tour
              </h3>
            </div>
            <a
              href="https://streamable.com/hspl4w"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-resort-gold hover:bg-resort-goldLight text-resort-navy font-bold text-xs uppercase tracking-wider rounded-xl transition-all self-start md:self-auto"
            >
              <span>Watch on Streamable</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>

          <div className="relative w-full aspect-video max-h-[550px] rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-resort-gold/20">
            <iframe
              src="https://streamable.com/e/hspl4w?autoplay=0&muted=0&loop=1"
              className="w-full h-full border-0 absolute inset-0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Resort Walkthrough Video Tour"
            />
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'resort', label: 'Resort & Grounds' },
            { id: 'rooms', label: 'Suites & Interiors' },
            { id: 'dining', label: 'Fine Dining' },
            { id: 'services', label: 'Fleet & VIP' },
            { id: 'events', label: 'Grand Hall & Events' },
            { id: 'surroundings', label: 'Coastal Surroundings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-resort-primary text-white shadow-sm font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-resort-gold/30 shadow-card cursor-pointer"
            >
              {item.type === 'video' ? (
                item.url.includes('streamable.com') ? (
                  <div className="w-full h-full relative bg-slate-950 flex items-center justify-center">
                    <iframe
                      src={`${getStreamableEmbed(item.url)}&autoplay=0&muted=1`}
                      className="w-full h-full border-0 pointer-events-none opacity-80"
                      title={item.title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-resort-primary/90 backdrop-blur-sm text-white flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-resort-gold text-resort-gold ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-resort-primary/80 backdrop-blur-sm text-white flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-resort-gold text-resort-gold ml-0.5" />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-resort-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                <span className="text-[10px] text-resort-goldLight font-bold uppercase tracking-wider">
                  {item.category} • {item.type}
                </span>
                <h4 className="font-serif text-white font-bold text-base mt-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 z-20 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev/Next Buttons */}
          {filteredMedia.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => (prev! - 1 + filteredMedia.length) % filteredMedia.length);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => (prev! + 1) % filteredMedia.length);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            {activeItem.type === 'video' ? (
              activeItem.url.includes('streamable.com') ? (
                <div className="w-full aspect-video max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-resort-gold/40">
                  <iframe
                    src={getStreamableEmbed(activeItem.url)}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={activeItem.title}
                  />
                </div>
              ) : (
                <video
                  src={activeItem.url}
                  controls
                  autoPlay
                  className="max-h-[75vh] w-auto rounded-xl shadow-2xl"
                />
              )
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            )}
            <div className="text-center text-white mt-4 space-y-1">
              <h3 className="font-serif text-xl font-bold">{activeItem.title}</h3>
              <p className="text-xs text-slate-400 capitalize">{activeItem.category} Collection</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
