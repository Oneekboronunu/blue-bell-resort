'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { MessageSquare, X, Send, PhoneCall } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { siteSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const rawPhone = (siteSettings.whatsapp || siteSettings.phone || '+8801819000000').replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('880') ? rawPhone : `880${rawPhone.replace(/^0+/, '')}`;

  const defaultMsg = `Hello ${siteSettings.hotel_name || 'Blue Bell Resort'}! I would like to inquire about booking availability and luxury services.`;

  const handleSend = () => {
    const textToSend = encodeURIComponent(customMsg.trim() || defaultMsg);
    const url = `https://wa.me/${cleanPhone}?text=${textToSend}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Concierge Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-elevated border border-resort-gold/30 overflow-hidden animate-fade-in text-slate-800">
          <div className="bg-resort-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-sm">
                BB
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold leading-none text-white">
                  Resort Concierge
                </h4>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Response</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-resort-sand/50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed shadow-sm">
              👋 Welcome to <strong className="text-resort-primaryDark">{siteSettings.hotel_name}</strong>. How may our hospitality concierge assist your stay today?
            </div>

            <textarea
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message or room enquiry here..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-resort-gold focus:ring-1 focus:ring-resort-gold resize-none bg-white"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={handleSend}
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </button>
              <a
                href={`tel:${siteSettings.phone}`}
                className="p-2 bg-resort-primary hover:bg-resort-primaryLight text-white rounded-lg text-xs transition-colors"
                title="Call Direct"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Concierge on WhatsApp"
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-elevated transition-all duration-300 hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300" />
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
}
