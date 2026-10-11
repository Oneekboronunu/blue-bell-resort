'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { 
  Play, 
  ExternalLink, 
  Sparkles, 
  Maximize2, 
  Compass, 
  BedDouble, 
  Car, 
  UtensilsCrossed,
  Share2,
  CheckCircle2
} from 'lucide-react';

export default function ResortWalkthroughSection() {
  const { siteSettings, language, openBookingModal } = useStore();
  const t = useTranslation(language);

  const rawVideoUrl = siteSettings.walkthrough_video_url || 'https://streamable.com/e/hspl4w';
  
  // Normalize Streamable URL to embed format
  const streamableId = rawVideoUrl.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/)?.[1] || 'hspl4w';
  const embedUrl = `https://streamable.com/e/${streamableId}?autoplay=0&muted=0&loop=1`;
  const streamableDirectUrl = `https://streamable.com/${streamableId}`;

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(streamableDirectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-resort-navy via-[#071f48] to-resort-navy text-white relative overflow-hidden">
      {/* Decorative luxury lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-resort-primary/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-resort-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-resort-gold/30 text-resort-goldLight text-xs font-semibold uppercase tracking-widest shadow-sm">
            <BluebellFlowerIcon className="w-4 h-4" color="#DFCCAB" />
            <span>Cinematic Virtual Tour</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {language === 'bn' ? 'ব্লু বেল রিসোর্ট ওয়াক-থ্রু ভিডিও' : 'Resort Walkthrough Video Tour'}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'আসার আগেই ঘুরে দেখুন আমাদের রিসোর্ট! শান্ত সমুদ্রের হাওয়া, লাক্সারি রুম ও মনোরম করিডোরের পূর্ণাঙ্গ ওয়াক-থ্রু অভিজ্ঞতা।' 
              : 'Experience Blue Bell Resort in motion. Take a cinematic walk through our ocean-view suites, peaceful corridors, lush garden pavilions, and dining retreat.'}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-2 border-resort-gold/40 bg-black/80 backdrop-blur-md group">
          
          {/* Streamable Iframe */}
          <div className="relative w-full aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 absolute inset-0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Blue Bell Resort Walkthrough Video"
            />
          </div>

          {/* Under-player Control & Info Bar */}
          <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-resort-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-resort-gold/20 border border-resort-gold/40 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 text-resort-gold fill-resort-gold" />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-white text-sm sm:text-base">
                  Blue Bell Resort Official Walkthrough
                </h4>
                <p className="text-[11px] text-slate-400">
                  Streamed via Streamable • 1080p Full HD Tour
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-all border border-white/10"
                title="Copy Streamable Link"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Video'}</span>
              </button>

              <a
                href={streamableDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-resort-gold hover:text-resort-navy text-slate-200 text-xs font-semibold transition-all border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open on Streamable</span>
              </a>

              <button
                onClick={() => openBookingModal({ type: 'room' })}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold uppercase tracking-wider shadow-gold transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-resort-goldLight" />
                <span>Book This Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5 hover:bg-white/10 transition-colors">
            <Compass className="w-5 h-5 text-resort-gold mx-auto" />
            <h5 className="font-serif font-bold text-white text-xs sm:text-sm">Oceanfront Location</h5>
            <p className="text-[11px] text-slate-400 font-light">Patenga Coastal Coastline</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5 hover:bg-white/10 transition-colors">
            <BedDouble className="w-5 h-5 text-resort-gold mx-auto" />
            <h5 className="font-serif font-bold text-white text-xs sm:text-sm">Luxury Suites</h5>
            <p className="text-[11px] text-slate-400 font-light">Italian Linens & Balcony</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5 hover:bg-white/10 transition-colors">
            <Car className="w-5 h-5 text-resort-gold mx-auto" />
            <h5 className="font-serif font-bold text-white text-xs sm:text-sm">Chauffeur Fleet</h5>
            <p className="text-[11px] text-slate-400 font-light">Rent a Car & Pickup 24/7</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5 hover:bg-white/10 transition-colors">
            <UtensilsCrossed className="w-5 h-5 text-resort-gold mx-auto" />
            <h5 className="font-serif font-bold text-white text-xs sm:text-sm">Coastal Cuisine</h5>
            <p className="text-[11px] text-slate-400 font-light">Fresh Seafood & Live BBQ</p>
          </div>
        </div>

      </div>
    </section>
  );
}
