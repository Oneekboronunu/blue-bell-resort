import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  SiteSettings, 
  Room, 
  Service, 
  MediaItem, 
  Testimonial, 
  Booking, 
  AdminUser,
  BookingStatus 
} from '@/types';
import { 
  initialSiteSettings, 
  initialRooms, 
  initialServices, 
  initialMedia, 
  initialTestimonials, 
  initialBookings 
} from '@/data/seedData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface BookingModalState {
  isOpen: boolean;
  type: 'room' | 'service';
  itemId?: string;
  itemName?: string;
  itemPrice?: number;
  serviceRateType?: 'hourly' | 'daily' | 'fixed';
  hourlyRate?: number;
  dailyRate?: number;
}

interface ResortState {
  // Data
  siteSettings: SiteSettings;
  rooms: Room[];
  services: Service[];
  media: MediaItem[];
  testimonials: Testimonial[];
  bookings: Booking[];
  
  // Auth
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  
  // UI & i18n
  language: 'en' | 'bn';
  bookingModal: BookingModalState;
  
  // Actions - Settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  // Actions - Rooms
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  toggleRoomAvailability: (id: string) => void;
  
  // Actions - Services
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceVisibility: (id: string) => void;
  
  // Actions - Media
  addMediaItem: (item: Omit<MediaItem, 'id' | 'created_at'>) => void;
  deleteMediaItem: (id: string) => void;
  
  // Actions - Bookings
  addBooking: (booking: Omit<Booking, 'id' | 'reference_no' | 'created_at' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  
  // Actions - Auth
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  
  // Actions - UI
  setLanguage: (lang: 'en' | 'bn') => void;
  openBookingModal: (params: Omit<BookingModalState, 'isOpen'>) => void;
  closeBookingModal: () => void;
  resetToDefaults: () => void;
  syncWithSupabase: () => Promise<void>;
}

export const useStore = create<ResortState>()(
  persist(
    (set, get) => ({
      siteSettings: initialSiteSettings,
      rooms: initialRooms,
      services: initialServices,
      media: initialMedia,
      testimonials: initialTestimonials,
      bookings: initialBookings,
      
      isAdminAuthenticated: false,
      adminUser: null,
      
      language: 'en',
      bookingModal: {
        isOpen: false,
        type: 'room',
      },

      updateSiteSettings: (newSettings) => {
        set((state) => {
          const updated = { ...state.siteSettings, ...newSettings };
          // If Supabase is available, sync asynchronously
          if (isSupabaseConfigured && supabase) {
            supabase.from('site_settings').upsert({ id: 'current', ...updated }).then();
          }
          return { siteSettings: updated };
        });
      },

      addRoom: (roomData) => {
        const newRoom: Room = {
          ...roomData,
          id: `room-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        set((state) => {
          const updated = [newRoom, ...state.rooms];
          if (isSupabaseConfigured && supabase) {
            supabase.from('rooms').insert(newRoom).then();
          }
          return { rooms: updated };
        });
      },

      updateRoom: (id, roomData) => {
        set((state) => {
          const updated = state.rooms.map((room) =>
            room.id === id ? { ...room, ...roomData } : room
          );
          if (isSupabaseConfigured && supabase) {
            supabase.from('rooms').update(roomData).eq('id', id).then();
          }
          return { rooms: updated };
        });
      },

      deleteRoom: (id) => {
        set((state) => {
          const updated = state.rooms.filter((room) => room.id !== id);
          if (isSupabaseConfigured && supabase) {
            supabase.from('rooms').delete().eq('id', id).then();
          }
          return { rooms: updated };
        });
      },

      toggleRoomAvailability: (id) => {
        set((state) => {
          const updated = state.rooms.map((room) =>
            room.id === id ? { ...room, is_available: !room.is_available } : room
          );
          const target = updated.find((r) => r.id === id);
          if (target && isSupabaseConfigured && supabase) {
            supabase.from('rooms').update({ is_available: target.is_available }).eq('id', id).then();
          }
          return { rooms: updated };
        });
      },

      addService: (serviceData) => {
        const newService: Service = {
          ...serviceData,
          id: `serv-${Date.now()}`,
        };
        set((state) => {
          const updated = [newService, ...state.services];
          if (isSupabaseConfigured && supabase) {
            supabase.from('services').insert(newService).then();
          }
          return { services: updated };
        });
      },

      updateService: (id, serviceData) => {
        set((state) => {
          const updated = state.services.map((service) =>
            service.id === id ? { ...service, ...serviceData } : service
          );
          if (isSupabaseConfigured && supabase) {
            supabase.from('services').update(serviceData).eq('id', id).then();
          }
          return { services: updated };
        });
      },

      deleteService: (id) => {
        set((state) => {
          const updated = state.services.filter((service) => service.id !== id);
          if (isSupabaseConfigured && supabase) {
            supabase.from('services').delete().eq('id', id).then();
          }
          return { services: updated };
        });
      },

      toggleServiceVisibility: (id) => {
        set((state) => {
          const updated = state.services.map((service) =>
            service.id === id ? { ...service, is_visible: !service.is_visible } : service
          );
          const target = updated.find((s) => s.id === id);
          if (target && isSupabaseConfigured && supabase) {
            supabase.from('services').update({ is_visible: target.is_visible }).eq('id', id).then();
          }
          return { services: updated };
        });
      },

      addMediaItem: (itemData) => {
        const newItem: MediaItem = {
          ...itemData,
          id: `med-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        set((state) => {
          const updated = [newItem, ...state.media];
          if (isSupabaseConfigured && supabase) {
            supabase.from('media').insert(newItem).then();
          }
          return { media: updated };
        });
      },

      deleteMediaItem: (id) => {
        set((state) => {
          const updated = state.media.filter((item) => item.id !== id);
          if (isSupabaseConfigured && supabase) {
            supabase.from('media').delete().eq('id', id).then();
          }
          return { media: updated };
        });
      },

      addBooking: (bookingData) => {
        const refSuffix = Math.floor(1000 + Math.random() * 9000);
        const newBooking: Booking = {
          ...bookingData,
          id: `bkg-${Date.now()}`,
          reference_no: `BBR-${refSuffix}`,
          status: 'new',
          created_at: new Date().toISOString(),
        };
        set((state) => {
          const updated = [newBooking, ...state.bookings];
          if (isSupabaseConfigured && supabase) {
            supabase.from('bookings').insert(newBooking).then();
          }
          return { bookings: updated };
        });
        return newBooking;
      },

      updateBookingStatus: (id, status) => {
        set((state) => {
          const updated = state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          );
          if (isSupabaseConfigured && supabase) {
            supabase.from('bookings').update({ status }).eq('id', id).then();
          }
          return { bookings: updated };
        });
      },

      loginAdmin: async (email, password) => {
        if (isSupabaseConfigured && supabase) {
          try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) throw error;
            if (data.user) {
              set({
                isAdminAuthenticated: true,
                adminUser: {
                  id: data.user.id,
                  email: data.user.email || email,
                  name: data.user.user_metadata?.name || 'Administrator',
                  role: 'admin',
                },
              });
              return { success: true };
            }
          } catch (err: any) {
            return { success: false, error: err.message || 'Supabase authentication failed' };
          }
        }

        // Demo / Built-in Admin Access fallback
        if (
          (email.toLowerCase() === 'admin@bluebellresort.com' || email.toLowerCase() === 'admin@hotel.com' || email.toLowerCase() === 'admin') &&
          (password === 'bluebell2026' || password === 'admin123' || password === 'admin')
        ) {
          set({
            isAdminAuthenticated: true,
            adminUser: {
              id: 'admin-master',
              email: 'admin@bluebellresort.com',
              name: 'Resort General Manager',
              role: 'super_admin',
            },
          });
          return { success: true };
        }

        return { success: false, error: 'Invalid admin credentials. Use admin@bluebellresort.com / bluebell2026' };
      },

      logoutAdmin: () => {
        if (isSupabaseConfigured && supabase) {
          supabase.auth.signOut().then();
        }
        set({
          isAdminAuthenticated: false,
          adminUser: null,
        });
      },

      setLanguage: (lang) => {
        set({ language: lang });
      },

      openBookingModal: (params) => {
        set({
          bookingModal: {
            isOpen: true,
            ...params,
          },
        });
      },

      closeBookingModal: () => {
        set((state) => ({
          bookingModal: {
            ...state.bookingModal,
            isOpen: false,
          },
        }));
      },

      resetToDefaults: () => {
        set({
          siteSettings: initialSiteSettings,
          rooms: initialRooms,
          services: initialServices,
          media: initialMedia,
          testimonials: initialTestimonials,
          bookings: initialBookings,
        });
      },

      syncWithSupabase: async () => {
        if (!isSupabaseConfigured || !supabase) return;
        try {
          const [settingsRes, roomsRes, servicesRes, mediaRes, bookingsRes] = await Promise.all([
            supabase.from('site_settings').select('*').single(),
            supabase.from('rooms').select('*').order('created_at', { ascending: false }),
            supabase.from('services').select('*'),
            supabase.from('media').select('*').order('created_at', { ascending: false }),
            supabase.from('bookings').select('*').order('created_at', { ascending: false }),
          ]);

          if (settingsRes.data) set({ siteSettings: settingsRes.data });
          if (roomsRes.data && roomsRes.data.length > 0) set({ rooms: roomsRes.data });
          if (servicesRes.data && servicesRes.data.length > 0) set({ services: servicesRes.data });
          if (mediaRes.data && mediaRes.data.length > 0) set({ media: mediaRes.data });
          if (bookingsRes.data && bookingsRes.data.length > 0) set({ bookings: bookingsRes.data });
        } catch (e) {
          console.warn('Supabase initial fetch fallback to local store:', e);
        }
      },
    }),
    {
      name: 'bluebell_resort_store_v4',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
