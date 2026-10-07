'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import { BluebellFlowerIcon } from '@/components/common/BluebellMotif';

export default function NotFound() {
  const { siteSettings } = useStore();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6 bg-resort-sand/30">
      <div className="w-16 h-16 rounded-2xl bg-white border border-resort-gold/40 flex items-center justify-center text-resort-primary shadow-card">
        <BluebellFlowerIcon className="w-8 h-8" color="#0B3C8C" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs uppercase font-bold tracking-widest text-resort-goldDark">
          404 — SUITE OR PAGE NOT FOUND
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-resort-primaryDark">
          Experience Not Found
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed font-light">
          The page or suite you are searching for might have been updated or relocated. Let us guide you back to our luxury accommodations.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/rooms"
          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-resort-gold/30 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-resort-gold" />
          <span>Explore Suites</span>
        </Link>
      </div>
    </div>
  );
}
