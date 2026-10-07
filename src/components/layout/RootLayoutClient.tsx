'use client';

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import BookingModal from '@/components/common/BookingModal';
import { useStore } from '@/lib/store/useStore';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { syncWithSupabase } = useStore();

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-resort-sand/40 selection:bg-resort-gold/30 selection:text-resort-primaryDark">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <BookingModal />
    </div>
  );
}
