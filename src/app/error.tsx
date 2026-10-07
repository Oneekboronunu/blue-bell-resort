'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';
import { BluebellFlowerIcon } from '@/components/common/BluebellMotif';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6 bg-resort-sand/30">
      <div className="w-16 h-16 rounded-2xl bg-white border border-resort-gold/40 flex items-center justify-center shadow-card">
        <BluebellFlowerIcon className="w-8 h-8" color="#0B3C8C" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs uppercase font-bold tracking-widest text-resort-goldDark">
          SERVICE INTERRUPTION
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-resort-primaryDark">
          Something Went Wrong
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed font-light">
          We encountered an unexpected issue while preparing your resort experience. Please try refreshing or return to the main lobby.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-resort-primary hover:bg-resort-primaryLight text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-gold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-resort-gold/30 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-resort-gold" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
