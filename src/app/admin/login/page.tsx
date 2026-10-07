'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { BluebellLogo, BluebellFlowerIcon } from '@/components/common/BluebellMotif';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, siteSettings } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await loginAdmin(email, password);
    setIsLoading(false);

    if (res.success) {
      router.push('/admin');
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@bluebellresort.com');
    setPassword('bluebell2026');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-resort-navy text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-resort-primary/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-resort-gold/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 border border-resort-gold/30 shadow-elevated mb-2">
            <BluebellFlowerIcon className="w-8 h-8" color="#DFCCAB" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            {siteSettings.hotel_name || 'Blue Bell Resort'}
          </h1>
          <p className="text-xs text-resort-goldLight uppercase tracking-widest font-semibold">
            Administrative Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl text-slate-800 p-8 rounded-3xl border border-resort-gold/40 shadow-elevated space-y-6">
          
          <div>
            <h2 className="font-serif text-xl font-bold text-resort-primaryDark">
              Executive Sign In
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your authorized staff credentials to manage bookings, suites, and property settings.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium animate-fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="admin@bluebellresort.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-3 focus:border-resort-gold focus:outline-none focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-3 focus:border-resort-gold focus:outline-none focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-resort-primary hover:bg-resort-primaryLight text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-resort-goldLight" />
              <span>{isLoading ? 'Authenticating...' : 'Access Admin Hub'}</span>
            </button>
          </form>

          {/* 1-Click Demo Login Helper */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2.5 px-3 bg-resort-sand hover:bg-resort-sandDark text-resort-primaryDark text-xs font-bold rounded-xl border border-resort-gold/30 flex items-center justify-center gap-2 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-resort-gold" />
              <span>Fill Demo Master Credentials</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Default: admin@bluebellresort.com / bluebell2026
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-resort-goldLight transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Return to Public Guest Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
