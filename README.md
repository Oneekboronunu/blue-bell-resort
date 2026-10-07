# Blue Bell Resort — Luxury Hospitality Web Platform & Admin Dashboard

> *"Where comfort meets calm"* — A 5-star resort platform in Chattogram, Bangladesh.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase (PostgreSQL, Auth, Storage)** with state synchronization.

---

## 🌟 Property Highlights & Features

### 🏨 Guest Experience (Public Website)
- **Brand Palette & Identity**: Deep Blue (`#0B3C8C`), warm sand neutrals (`#FAF7F2`), champagne gold accents (`#C5A880`), subtle bluebell floral motif.
- **Hero Slider**: Full-screen imagery with serene motion, smooth slide transitions, and instant availability search widget.
- **Rooms & Suites Showcase**:
  - 4 Signature Suites: Standard Room, Deluxe Ocean View, Family Suite, Premium Royal Suite.
  - Prices in **BDT (৳)** with dynamic formatting.
  - Room detail pages with photo gallery, video tour player, amenity grid, and live stay price calculator.
- **Resort Services & Chauffeur Fleet**:
  - **Rent a Car**: Interactive hourly (৳600/hr) and full-day (৳4,500/day) fare estimator.
  - VIP Airport Pickup & Drop (Shah Amanat Int. Airport).
  - The Bluebell Gourmet Restaurant & private candlelit beach dining.
  - Grand Banquet & Event Hall (350+ guests).
  - Guided Coastal Tours & Serenity Spa.
- **Booking & Enquiry Modal**:
  - Real-time guest inquiry form for rooms and services.
  - Generates instant Reference ID (e.g., `BBR-8921`).
  - 1-Click direct WhatsApp Concierge notification link.
- **Dynamic Google Maps**:
  - Driven by admin-configurable GPS coordinates (`22.3626557, 91.7825618`).
  - Keyless fallback iframe embed (always functional).
  - "Get Directions" and "Open in Google Maps" direct routing.
- **Floating WhatsApp Concierge**: Instant mobile chat bubble.
- **i18n Ready**: Dual English and Bengali architecture.

---

### 🛡️ Admin Dashboard (`/admin`)
- **Authentication**: Secure administrative login with role verification.
  - **Demo Login**: `admin@bluebellresort.com` / `bluebell2026`
- **Dashboard Overview**: Inquiry metrics, revenue pipeline, suite availability, recent booking table with 1-click status updates.
- **Rooms Manager (`/admin/rooms`)**: Full CRUD, pricing, capacity, bed types, photo & video uploader, instant availability switch.
- **Services Manager (`/admin/services`)**: Full CRUD, hourly and daily car rental rate settings, visibility toggle.
- **Bookings Manager (`/admin/bookings`)**: Search and filter inquiries (New, Confirmed, Cancelled), direct WhatsApp and call triggers.
- **Media Library (`/admin/media`)**: Image/video upload, category tagging, copy public URL, preview modal.
- **Settings & Location (`/admin/settings`)**:
  - Live updates for Hotel Name, Tagline, Logo URL/upload, Currency (৳ BDT), Phone, WhatsApp, Email, Physical Address.
  - GPS Coordinates (Latitude: `22.3626557`, Longitude: `91.7825618`), Region, and Google Maps pin.
  - **Zero-code propagation**: Any change in admin immediately reflects on the public site!

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Custom Glassmorphism & Gold Tokens
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand with persistent storage
- **Backend / DB**: Supabase (PostgreSQL, Row Level Security, Auth)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the administrative dashboard.

---

## 🗄️ Supabase Database Migration
Execute `supabase/migrations/20261007_init_bluebell.sql` in your Supabase SQL Editor to set up:
- `site_settings`, `rooms`, `services`, `media`, `bookings` tables
- Row Level Security (RLS) policies for secure public reads and administrative writes
- Production seed records for Blue Bell Resort.

---

## 🌐 Deployment to Vercel
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Deploy!
