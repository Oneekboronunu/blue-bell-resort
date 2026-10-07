-- ==============================================================================
-- BLUE BELL RESORT - SUPABASE DATABASE SCHEMA & SEED DATA
-- Luxury Hotel & Admin System (Chattogram, Bangladesh)
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'current',
    hotel_name TEXT NOT NULL DEFAULT 'Blue Bell Resort',
    tagline TEXT NOT NULL DEFAULT 'Where comfort meets calm',
    logo_url TEXT DEFAULT '',
    favicon_url TEXT DEFAULT '',
    currency TEXT NOT NULL DEFAULT 'BDT',
    currency_symbol TEXT NOT NULL DEFAULT '৳',
    phone TEXT NOT NULL DEFAULT '+880 1819-000000',
    whatsapp TEXT NOT NULL DEFAULT '+8801819000000',
    email TEXT NOT NULL DEFAULT 'concierge@bluebellresort.com',
    address TEXT NOT NULL DEFAULT 'Marine View Road, Patenga Coastline, Chattogram 4204, Bangladesh',
    latitude DOUBLE PRECISION NOT NULL DEFAULT 22.3626557,
    longitude DOUBLE PRECISION NOT NULL DEFAULT 91.7825618,
    google_maps_link TEXT DEFAULT 'https://www.google.com/maps/place/Blue+Bell+Resort/@22.3626557,91.7825618,712m',
    google_maps_embed_key TEXT DEFAULT '',
    region TEXT NOT NULL DEFAULT 'Chattogram, Bangladesh',
    check_in_time TEXT NOT NULL DEFAULT '02:00 PM',
    check_out_time TEXT NOT NULL DEFAULT '12:00 PM',
    hero_slides JSONB DEFAULT '[]'::jsonb,
    social_links JSONB DEFAULT '{}'::jsonb,
    brand_colors JSONB DEFAULT '{"primary": "#0B3C8C", "gold": "#C5A880", "sand": "#FAF7F2"}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROOMS TABLE
CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY DEFAULT ('room-' || extract(epoch from now())::bigint),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Deluxe',
    tag TEXT DEFAULT '',
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    price_per_night NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    capacity_adults INT NOT NULL DEFAULT 2,
    capacity_children INT NOT NULL DEFAULT 1,
    bed_type TEXT NOT NULL DEFAULT 'King Bed',
    room_size TEXT NOT NULL DEFAULT '450 sq.ft (42 m²)',
    view TEXT NOT NULL DEFAULT 'Ocean View',
    amenities TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT true,
    is_available BOOLEAN DEFAULT true,
    cover_image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    video_url TEXT DEFAULT '',
    rating NUMERIC(3, 2) DEFAULT 4.9,
    review_count INT DEFAULT 45,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SERVICES TABLE (Including Rent a Car Hourly/Daily)
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY DEFAULT ('serv-' || extract(epoch from now())::bigint),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'car_rental',
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    price_unit TEXT NOT NULL DEFAULT 'fixed',
    hourly_rate NUMERIC(10, 2) DEFAULT 600,
    daily_rate NUMERIC(10, 2) DEFAULT 4500,
    image_url TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Car',
    is_visible BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT true,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY DEFAULT ('med-' || extract(epoch from now())::bigint),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'image',
    category TEXT NOT NULL DEFAULT 'resort',
    size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BOOKINGS & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY DEFAULT ('bkg-' || extract(epoch from now())::bigint),
    reference_no TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL DEFAULT 'room', -- 'room' or 'service'
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT DEFAULT '',
    guest_phone TEXT NOT NULL,
    check_in DATE,
    check_out DATE,
    guests_count INT DEFAULT 2,
    service_date DATE,
    service_duration TEXT,
    service_rate_type TEXT,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'confirmed', 'cancelled'
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Site Settings: Public Read, Auth Admin Write
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin All Site Settings" ON site_settings FOR ALL TO authenticated USING (true);

-- Rooms: Public Read Available, Auth Admin All
CREATE POLICY "Public Read Rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Admin All Rooms" ON rooms FOR ALL TO authenticated USING (true);

-- Services: Public Read Visible, Auth Admin All
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin All Services" ON services FOR ALL TO authenticated USING (true);

-- Media: Public Read, Auth Admin All
CREATE POLICY "Public Read Media" ON media FOR SELECT USING (true);
CREATE POLICY "Admin All Media" ON media FOR ALL TO authenticated USING (true);

-- Bookings: Public Insert, Auth Admin All
CREATE POLICY "Public Insert Bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Bookings" ON bookings FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- REALISTIC SEED DATA INSERTION
-- ==============================================================================

INSERT INTO site_settings (id, hotel_name, tagline, latitude, longitude, region, phone, whatsapp, email)
VALUES (
    'current',
    'Blue Bell Resort',
    'Where comfort meets calm',
    22.3626557,
    91.7825618,
    'Chattogram, Bangladesh',
    '+880 1819-000000',
    '+8801819000000',
    'concierge@bluebellresort.com'
) ON CONFLICT (id) DO NOTHING;

-- Seed 4 Suites
INSERT INTO rooms (id, slug, name, type, tag, short_description, description, price_per_night, capacity_adults, capacity_children, bed_type, room_size, view, amenities, cover_image, images)
VALUES 
(
    'room-1',
    'standard-room',
    'Standard Room',
    'Standard',
    'Best Value',
    'Comfortable, cozy, and thoughtfully equipped with garden views for business or solo travelers.',
    'Designed for effortless relaxation, the Standard Room blends contemporary aesthetics with understated elegance.',
    4500,
    2,
    1,
    'Queen Bed',
    '320 sq.ft (30 m²)',
    'Lush Garden View',
    ARRAY['High-Speed Wi-Fi', 'Air Conditioning', '43" Smart TV', 'Rainfall Shower', 'Luxury Toiletries'],
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80',
    ARRAY['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80']
),
(
    'room-2',
    'deluxe-ocean-view',
    'Deluxe Room',
    'Deluxe',
    'Most Popular',
    'Spacious coastal sanctuary featuring a private balcony with panoramic sunset vistas.',
    'Elevate your stay in our Deluxe Room. Step onto your private balcony to take in the rejuvenating sea breeze and golden evening sunsets.',
    7500,
    2,
    1,
    'King Bed',
    '450 sq.ft (42 m²)',
    'Panoramic Coastal & Sunset View',
    ARRAY['Private Furnished Balcony', 'Nespresso Coffee Machine', '55" 4K Smart TV', 'Marble Bathroom with Tub'],
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&auto=format&fit=crop&q=80',
    ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&auto=format&fit=crop&q=80']
),
(
    'room-3',
    'family-suite',
    'Family Suite',
    'Family Suite',
    'Family Favorite',
    'Generous two-room interconnecting haven tailored for joyful family getaways and extended stays.',
    'The Family Suite offers optimal space and privacy for families or group travelers. Featuring two separate bedrooms and a living lounge.',
    12000,
    4,
    2,
    '1 King Bed + 2 Twin Beds',
    '720 sq.ft (67 m²)',
    'Resort Pool & Coastal Horizon',
    ARRAY['Two Separate Bedrooms', 'Spacious Living Lounge', '2 Smart TVs', 'Complimentary Gourmet Breakfast'],
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80',
    ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80']
),
(
    'room-4',
    'premium-royal-suite',
    'Premium Suite',
    'Premium Suite',
    'Ultimate Luxury',
    'The pinnacle of resort luxury with private terrace jacuzzi, dedicated butler, and panoramic sea views.',
    'Our crown jewel, the Premium Suite, redefines hospitality excellence with infinity jacuzzi and 24/7 butler concierge.',
    22000,
    3,
    2,
    'Grand Emperor Bed',
    '1100 sq.ft (102 m²)',
    'Unobstructed 180° Oceanfront View',
    ARRAY['Private Terrace with Jacuzzi', '24/7 Butler Service', 'VIP Airport Transfer Included', 'Italian Leather Lounge'],
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&auto=format&fit=crop&q=80',
    ARRAY['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&auto=format&fit=crop&q=80']
) ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO services (id, name, slug, category, short_description, description, price, price_unit, hourly_rate, daily_rate, image_url, icon_name, features)
VALUES
(
    'serv-1',
    'Rent a Car (Chauffeur & Self-Drive)',
    'rent-a-car',
    'car_rental',
    'Premium sedans, luxury SUVs, and executive microbuses available with hourly or daily rental packages.',
    'Explore Chattogram and scenic coastal routes with our premium fleet.',
    600,
    'per_hour',
    600,
    4500,
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80',
    'Car',
    ARRAY['Chauffeur & Self-Drive options', 'Hourly rate from ৳ 600 / hr', 'Full Day package: ৳ 4,500 / day', 'Prado, Premio, Allion, Hiace']
),
(
    'serv-2',
    'VIP Airport Pickup & Drop',
    'airport-pickup',
    'airport_pickup',
    'Seamless meet-and-greet transfers to and from Shah Amanat International Airport (CGP).',
    'Avoid travel hassles with our prompt VIP airport transfer service.',
    2500,
    'fixed',
    NULL,
    NULL,
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&auto=format&fit=crop&q=80',
    'PlaneTakeoff',
    ARRAY['Direct pickup from CGP Terminal', 'Flight tracking', 'Luggage assistance']
),
(
    'serv-3',
    'The Bluebell Gourmet Restaurant',
    'restaurant-dining',
    'restaurant',
    'Exquisite coastal seafood, authentic Chittagong Mezban, and international fine dining.',
    'Savor culinary perfection crafted by our master chefs.',
    1800,
    'per_person',
    NULL,
    NULL,
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
    'UtensilsCrossed',
    ARRAY['Fresh coastal seafood', 'Traditional Mezban delicacies', 'Candlelight beach dining']
),
(
    'serv-4',
    'Grand Event & Meeting Hall',
    'event-meeting-hall',
    'event_hall',
    'State-of-the-art banquet ballroom and conference hall for weddings, galas, and corporate retreats.',
    'Host memorable conferences and dream weddings accommodating up to 350 seated guests.',
    35000,
    'per_day',
    NULL,
    35000,
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80',
    'Building2',
    ARRAY['Capacity: 350 banquet / 500 theater', '4K Laser Projectors & Bose Sound', 'Dedicated event planner']
) ON CONFLICT (id) DO NOTHING;

-- 6. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY DEFAULT ('test-' || extract(epoch from now())::bigint),
    name TEXT NOT NULL,
    name_bn TEXT,
    location TEXT NOT NULL,
    location_bn TEXT,
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    comment_bn TEXT,
    stay_date TEXT,
    stay_date_bn TEXT,
    room_stayed TEXT,
    room_stayed_bn TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admin All Testimonials" ON testimonials FOR ALL TO authenticated USING (true);

-- Seed Bilingual Bengali Customer Feedback
INSERT INTO testimonials (id, name, name_bn, location, location_bn, rating, comment, comment_bn, stay_date, stay_date_bn, room_stayed, room_stayed_bn)
VALUES
(
    'test-1',
    'Tanvir Hossain',
    'তানভীর হোসেন',
    'Dhaka, Bangladesh',
    'ঢাকা, বাংলাদেশ',
    5,
    'Blue Bell Resort exceeded every expectation. The ocean breeze, pristine rooms, and attentive staff made our family holiday unforgettable. The car rental service was extremely smooth!',
    'ব্লু বেল রিসোর্টে আমাদের পারিবারিক ছুটি অসাধারণ কেটেছে। সমুদ্রের নির্মল বাতাস, চমৎকার পরিষ্কার-পরিচ্ছন্ন রুম এবং আন্তরিক স্টাফদের ব্যবহার আমাদের মুগ্ধ করেছে। তাদের কার রেন্টাল সার্ভিসও ছিল অত্যন্ত সময়ানুবর্তী ও আরামদায়ক।',
    'September 2026',
    'সেপ্টেম্বর ২০২৬',
    'Premium Suite',
    'প্রিমিয়াম স্যুট'
),
(
    'test-2',
    'Dr. Afsana Rahman',
    'ডাঃ আফসana রহমান',
    'Chattogram, Bangladesh',
    'চট্টগ্রাম, বাংলাদেশ',
    5,
    'Hosted our medical seminar and gala dinner at the Grand Hall. The audiovisual equipment, acoustics, and coastal Mezban catering were flawless. Truly the finest luxury resort in the region.',
    'গ্র্যান্ড হলে আমাদের মেডিকেল কনফারেন্স ও গালা ডিনারের আয়োজন করেছিলাম। সাউন্ড সিস্টেম, প্রজেক্টর এবং ব্লু বেল রেস্তোরাঁর ঐতিহ্যবাহী মেজবানি খাবার ছিল অতুলনীয়। চট্টগ্রামের সেরা ফাইভ-স্টার রিসোর্ট!',
    'October 2026',
    'অক্টোবর ২০২৬',
    'Event & Meeting Hall',
    'গ্র্যান্ড ইভেন্ট হল'
),
(
    'test-3',
    'Kazi Mahfuzul Haque',
    'কাজী মাহফুজুল হক',
    'Sylhet, Bangladesh',
    'সিলেট, বাংলাদেশ',
    5,
    'The private balcony jacuzzi and panoramic sunset view from the Royal Suite were breathtaking. The VIP airport pickup and 24/7 dedicated butler service made us feel truly privileged.',
    'প্রিমিয়াম স্যুটের প্রাইভেট ব্যালকনি আর ইনফিনিটি জ্যাকুজি থেকে সূর্যাস্ত দেখার অনুভূতি ভাষায় প্রকাশ করার মতো না। তাদের এয়ারপোর্ট পিকআপ ও সার্বক্ষণিক বাটলার সেবা ছিল সত্যিই প্রশংসনীয়।',
    'August 2026',
    'আগস্ট ২০২৬',
    'Premium Royal Suite',
    'রয়্যাল প্রিমিয়াম স্যুট'
),
(
    'test-4',
    'Sayma Chowdhury & Family',
    'সায়মা চৌধুরী ও পরিবার',
    'Dhanmondi, Dhaka',
    'ধানমন্ডি, ঢাকা',
    5,
    'Stayed 4 nights in the Family Suite with kids. Spacious interconnecting rooms, delicious breakfast buffet, and the fresh seafood barbecue at The Bluebell Restaurant was world-class.',
    'বাচ্চাদের নিয়ে ফ্যামিলি স্যুটে ৪ দিন ছিলাম। রুমগুলো বেশ বড় এবং খোলামেলা। রেস্তোরাঁর ফ্রেশ সামুদ্রিক রূপচাঁদা ও গলদা চিংড়ির বারবিকিউ ছিল সেরা। আমরা আবার অবশ্যই আসব।',
    'July 2026',
    'জুলাই ২০২৬',
    'Family Suite',
    'ফ্যামিলি স্যুট'
),
(
    'test-5',
    'Rezaul Karim',
    'রেজাউল করিম (উদ্যোক্তা)',
    'Chattogram, Bangladesh',
    'চট্টগ্রাম, বাংলাদেশ',
    5,
    'The tranquility and high-speed Wi-Fi made it perfect for focused business retreats. The Deluxe Ocean View room offered unmatched sunset calm after busy work days.',
    'ব্যবসায়িক প্রয়োজনে ডেলিগেটদের নিয়ে ডিলাক্স রুমে ছিলাম। নিরিবিলি পরিবেশ, হাই-স্পিড ওয়াইফাই এবং ২৪ ঘণ্টার রুম সার্ভিস কাজের জন্য একদম পারফেক্ট। বারান্দা থেকে সমুদ্রের দৃশ্য মন ভরিয়ে দেয়।',
    'September 2026',
    'সেপ্টেম্বর ২০২৬',
    'Deluxe Room',
    'ডিলাক্স ওশান ভিউ'
),
(
    'test-6',
    'Sakib Al Mahmud',
    'সাকিব আল মাহমুদ',
    'Cumilla, Bangladesh',
    'কুমিল্লা, বাংলাদেশ',
    5,
    'Booked their Prado SUV for a full-day coastal tour of Patenga and Karnaphuli Tunnel. Professional chauffeur, immaculate vehicle, and top-tier hospitality. 10/10 recommendation!',
    'পতেঙ্গা সমুদ্র সৈকত আর কর্ণফুলী টানেল ভ্রমণের জন্য তাদের গাইডেড ট্যুর ও প্রাডো কার সার্ভিস নিয়েছিলাম। খুব প্রফেশনাল ও নিরাপদ ড্রাইভিং। রিসোর্টের আতিথেয়তায় আমি ১০০ তে ১০০ দেব!',
    'October 2026',
    'অক্টোবর ২০২৬',
    'Rent a Car & Guided Tour',
    'রেন্ট-এ-কার ও গাইডেড ট্যুর'
) ON CONFLICT (id) DO NOTHING;
