'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import FacebookCommunitySection from '@/components/common/FacebookCommunitySection';
import { BluebellDivider, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  Calendar,
  Share2,
  ThumbsUp,
  MapPin,
  Phone
} from 'lucide-react';

export default function FacebookPage() {
  const { siteSettings, language } = useStore();
  const t = useTranslation(language);

  const fbUrl = siteSettings.social_links?.facebook || 'https://facebook.com/bluebellresort';

  return (
    <div className="space-y-16 pb-20">
      
      {/* Facebook Hero Banner */}
      <section className="bg-gradient-to-r from-resort-navy via-[#0c2f6d] to-[#1877F2]/90 text-white py-20 px-6 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#1877F2]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-resort-gold/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-3xl bg-white p-2.5 shadow-2xl border-2 border-resort-gold/40 flex items-center justify-center shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Blue Bell Resort" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    Blue Bell Resort
                  </h1>
                  <CheckCircle2 className="w-6 h-6 text-[#1877F2] fill-white" />
                </div>
                <p className="text-xs sm:text-sm text-resort-goldLight font-medium">
                  @bluebellresort • Luxury Resort & Hospitality
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                  <span><strong>12.4K</strong> followers</span>
                  <span>•</span>
                  <span><strong>99%</strong> positive response</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-105"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Visit Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Main Facebook Community Feed Component */}
      <FacebookCommunitySection />

    </div>
  );
}
