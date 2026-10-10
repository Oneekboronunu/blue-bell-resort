'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { useTranslation } from '@/lib/i18n/translations';
import { BluebellLogo } from '@/components/common/BluebellMotif';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Sparkles, 
  Globe, 
  Calendar,
  Lock,
  MessageSquare
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { siteSettings, language, setLanguage, openBookingModal } = useStore();
  const t = useTranslation(language);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.rooms, href: '/rooms' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.gallery, href: '/gallery' },
    { name: t.nav.location, href: '/location' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null; // Admin has its own dedicated header/sidebar

  return (
    <>
      {/* Top Luxury Announcement & Quick Contact Bar */}
      <div className="bg-resort-navy text-slate-200 text-[11px] border-b border-resort-gold/20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${siteSettings.phone}`} 
              className="flex items-center gap-1.5 hover:text-resort-goldLight transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-resort-gold" />
              <span>{siteSettings.phone}</span>
            </a>
            <a 
              href={`mailto:${siteSettings.email}`} 
              className="flex items-center gap-1.5 hover:text-resort-goldLight transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-resort-gold" />
              <span>{siteSettings.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-resort-gold" />
              <span>{siteSettings.region}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5">
              <Globe className="w-3 h-3 text-resort-goldLight" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  language === 'en' ? 'bg-resort-gold text-resort-navy' : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  language === 'bn' ? 'bg-resort-gold text-resort-navy' : 'text-slate-300 hover:text-white'
                }`}
              >
                বাং
              </button>
            </div>

            {/* Facebook Link */}
            <a
              href={siteSettings.social_links?.facebook || 'https://facebook.com/bluebellresort'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white bg-white/10 hover:bg-[#1877F2] transition-all px-2.5 py-1 rounded-full border border-white/10"
              title="Official Facebook Page"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* Admin Portal Link */}
            <Link 
              href="/admin" 
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-resort-goldLight transition-colors px-2 py-0.5 rounded"
            >
              <Lock className="w-3 h-3 text-resort-gold" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-card border-b border-resort-gold/20 py-3'
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <BluebellLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-xs uppercase tracking-widest font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-resort-primary font-bold bg-resort-gold/15 shadow-sm'
                      : 'text-slate-700 hover:text-resort-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-resort-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Book Now CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openBookingModal({ type: 'room' })}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-resort-primary hover:bg-resort-primaryLight text-white text-[11px] sm:text-xs uppercase tracking-widest font-bold rounded-xl shadow-gold hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-resort-goldLight animate-pulse" />
              <span>{t.nav.bookNow}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-resort-primary hover:bg-slate-100 transition-colors lg:hidden border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-resort-primary" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-resort-gold/20 px-6 py-5 space-y-4 animate-fade-in shadow-xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-resort-gold" />
                <span className="text-xs text-slate-500 font-medium">Language:</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    language === 'en' ? 'bg-resort-gold text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    language === 'bn' ? 'bg-resort-gold text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  বাং
                </button>
              </div>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-semibold text-resort-primary flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5 text-resort-gold" />
                Admin Portal
              </Link>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
                      isActive
                        ? 'bg-resort-primary text-white'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal({ type: 'room' });
                }}
                className="w-full py-3 bg-resort-primary text-white text-xs uppercase tracking-widest font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-resort-goldLight" />
                <span>{t.nav.bookNow}</span>
              </button>

              <a
                href={siteSettings.social_links?.facebook || 'https://facebook.com/bluebellresort'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#1877F2] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Visit Facebook Page</span>
              </a>

              <a
                href={`tel:${siteSettings.phone}`}
                className="w-full py-2.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-resort-gold" />
                <span>Call {siteSettings.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
