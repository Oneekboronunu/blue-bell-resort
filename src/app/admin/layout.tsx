'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { BluebellLogo } from '@/components/common/BluebellMotif';
import { 
  LayoutDashboard, 
  BedDouble, 
  Car, 
  CalendarCheck, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldAlert, 
  Menu, 
  X,
  Bell,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    isAdminAuthenticated, 
    adminUser, 
    logoutAdmin, 
    bookings, 
    siteSettings 
  } = useStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  // Count new booking inquiries
  const newBookingsCount = bookings.filter(b => b.status === 'new').length;

  useEffect(() => {
    // If not authenticated and not on login page, redirect to login
    if (!isAdminAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAdminAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white">
        <div className="text-center space-y-3">
          <ShieldAlert className="w-12 h-12 text-resort-gold mx-auto animate-pulse" />
          <p className="text-sm font-serif">Checking administrative authorization...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Rooms & Suites', href: '/admin/rooms', icon: BedDouble },
    { name: 'Services & Fleet', href: '/admin/services', icon: Car },
    { 
      name: 'Bookings & Inquiries', 
      href: '/admin/bookings', 
      icon: CalendarCheck, 
      badge: newBookingsCount > 0 ? newBookingsCount : undefined 
    },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Settings & Location', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-resort-navy text-white p-4 flex items-center justify-between shadow-md">
        <BluebellLogo variant="light" size="sm" />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-40 w-64 bg-resort-navy text-slate-300 flex flex-col justify-between border-r border-resort-gold/20 shadow-xl transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <BluebellLogo variant="light" size="sm" />
            <div className="mt-2 text-[10px] text-resort-goldLight uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Management Hub</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-resort-gold text-resort-navy shadow-sm font-bold'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-slate-300 hover:text-resort-goldLight transition-colors p-2 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-resort-gold" />
              <span>View Public Website</span>
            </div>
          </Link>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs truncate">
              <p className="font-semibold text-white truncate">{adminUser?.name || 'Admin User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{adminUser?.email}</p>
            </div>
            <button
              onClick={logoutAdmin}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-100/70 overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-subtle">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Blue Bell Resort Management
            </span>
            <h2 className="text-lg font-bold text-slate-900 capitalize">
              {pathname.split('/')[2] ? pathname.split('/')[2].replace('-', ' ') : 'Overview Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-resort-sand hover:bg-resort-sandDark text-resort-primaryDark text-xs font-semibold rounded-lg border border-resort-gold/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-resort-gold" />
              Live Site
            </Link>

            <Link
              href="/admin/bookings"
              className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {newBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {newBookingsCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Children */}
        <div className="p-6 md:p-8 space-y-6">
          {children}
        </div>
      </main>

    </div>
  );
}
