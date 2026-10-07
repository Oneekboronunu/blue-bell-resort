'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';

export function BluebellFlowerIcon({ className = 'w-6 h-6', color = '#0B3C8C' }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central stem */}
      <path 
        d="M24 44V22C24 16 28 10 34 6" 
        stroke={color} 
        strokeWidth="2.2" 
        strokeLinecap="round" 
      />
      {/* Leaf left */}
      <path 
        d="M24 34C18 34 14 28 16 22C19 22 23 27 24 34Z" 
        fill={color} 
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="1.8"
      />
      {/* Primary Bluebell Bell Blossom */}
      <path 
        d="M26 12C26 12 33 13 36 18C38 22 37 28 35 30C33 32 30 31 29 28C28 31 24 32 23 29C22 26 24 20 26 12Z" 
        fill={color}
        stroke="#C5A880"
        strokeWidth="1.5"
      />
      {/* Delicate drooping bell petal flourish */}
      <path 
        d="M32 22C31 25 33 28 36 29" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      {/* Subtle gold pistil accent */}
      <circle cx="28" cy="27" r="1.5" fill="#D4AF37" />
    </svg>
  );
}

export function BluebellDivider({ 
  className = 'my-8',
  text,
  dark = false
}: { 
  className?: string; 
  text?: string;
  dark?: boolean;
}) {
  const lineColor = dark ? 'bg-resort-gold/30' : 'bg-resort-gold/40';
  const iconColor = dark ? '#DFCCAB' : '#0B3C8C';

  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <div className={`h-[1px] w-16 md:w-28 ${lineColor} rounded-full`} />
      <div className="flex items-center space-x-2">
        <span className="w-1.5 h-1.5 rounded-full bg-resort-gold" />
        <BluebellFlowerIcon className="w-5 h-5 animate-pulse" color={iconColor} />
        {text && (
          <span className={`text-xs uppercase tracking-[0.25em] font-medium ${dark ? 'text-resort-goldLight' : 'text-resort-primary'}`}>
            {text}
          </span>
        )}
        <span className="w-1.5 h-1.5 rounded-full bg-resort-gold" />
      </div>
      <div className={`h-[1px] w-16 md:w-28 ${lineColor} rounded-full`} />
    </div>
  );
}

export function BluebellLogo({
  variant = 'default', // 'default' (blue/dark) or 'light' (white background container for dark headers) or 'admin'
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
}: {
  variant?: 'default' | 'light' | 'admin';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const { siteSettings } = useStore();

  const sizeClasses = {
    sm: { img: 'h-8 md:h-9 max-w-[140px]', icon: 'w-7 h-7', text: 'text-lg', tag: 'text-[9px]' },
    md: { img: 'h-11 md:h-12 max-w-[190px]', icon: 'w-9 h-9', text: 'text-xl md:text-2xl', tag: 'text-[10px]' },
    lg: { img: 'h-14 md:h-16 max-w-[240px]', icon: 'w-12 h-12', text: 'text-2xl md:text-3xl', tag: 'text-xs' },
  }[size];

  const logoUrl = siteSettings.logo_url || '/logo.png';

  const isDarkVariant = variant === 'light' || variant === 'admin';

  return (
    <Link 
      href={variant === 'admin' ? '/admin' : '/'} 
      className={`group inline-flex items-center transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <div className={`flex items-center rounded-xl transition-all ${
        isDarkVariant 
          ? 'bg-white p-1.5 sm:p-2 rounded-xl shadow-elevated border border-resort-gold/40' 
          : 'p-1'
      }`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={logoUrl} 
          alt={siteSettings.hotel_name || 'Blue Bell Resort'} 
          className={`${sizeClasses.img} w-auto object-contain`}
        />
      </div>
    </Link>
  );
}

export function BluebellLoader({ message = 'Loading Blue Bell Resort...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-resort-gold/30 border-t-resort-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BluebellFlowerIcon className="w-6 h-6 animate-bounce" color="#0B3C8C" />
        </div>
      </div>
      <p className="text-sm font-serif text-resort-primary tracking-wider">{message}</p>
    </div>
  );
}
