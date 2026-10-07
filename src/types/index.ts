export type CurrencyCode = 'BDT' | 'USD' | 'EUR' | 'GBP';

export interface SiteSettings {
  hotel_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  currency: string;
  currency_symbol: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  latitude: number;
  longitude: number;
  google_maps_link: string;
  google_maps_embed_key?: string;
  region: string;
  check_in_time: string;
  check_out_time: string;
  hero_slides: HeroSlide[];
  social_links: {
    facebook?: string;
    instagram?: string;
    tripadvisor?: string;
    youtube?: string;
    linkedin?: string;
  };
  brand_colors: {
    primary: string;
    gold: string;
    sand: string;
  };
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  video_url?: string;
  cta_text?: string;
  cta_link?: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: string;
  tag?: string;
  short_description: string;
  description: string;
  price_per_night: number;
  original_price?: number;
  capacity_adults: number;
  capacity_children: number;
  bed_type: string;
  room_size: string;
  view: string;
  amenities: string[];
  is_featured: boolean;
  is_available: boolean;
  cover_image: string;
  images: string[];
  video_url?: string;
  rating: number;
  review_count: number;
  created_at?: string;
}

export type ServicePriceUnit = 'per_hour' | 'per_day' | 'fixed' | 'per_person' | 'custom';

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'car_rental' | 'airport_pickup' | 'restaurant' | 'event_hall' | 'guided_tours' | 'spa' | 'laundry' | 'other';
  short_description: string;
  description: string;
  price: number;
  price_unit: ServicePriceUnit;
  hourly_rate?: number;
  daily_rate?: number;
  image_url: string;
  icon_name: string;
  is_visible: boolean;
  featured: boolean;
  features: string[];
}

export type BookingStatus = 'new' | 'confirmed' | 'cancelled';
export type BookingType = 'room' | 'service';

export interface Booking {
  id: string;
  reference_no: string;
  type: BookingType;
  item_id: string;
  item_name: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in?: string;
  check_out?: string;
  guests_count?: number;
  service_date?: string;
  service_duration?: string;
  service_rate_type?: 'hourly' | 'daily' | 'fixed';
  total_amount: number;
  status: BookingStatus;
  special_requests?: string;
  created_at: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  category: 'rooms' | 'services' | 'resort' | 'dining' | 'events' | 'surroundings';
  size_bytes?: number;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

export interface Testimonial {
  id: string;
  name: string;
  name_bn?: string;
  location: string;
  location_bn?: string;
  avatar?: string;
  rating: number;
  comment: string;
  comment_bn?: string;
  stay_date: string;
  stay_date_bn?: string;
  room_stayed: string;
  room_stayed_bn?: string;
}
