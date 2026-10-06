'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  Building,
  Search,
  ArrowUpRight,
  Eye,
  Filter,
  X,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  UploadCloud,
  Image as ImageIcon,
  Check,
  Layers,
  Save,
  Tag
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import { Product, Order, CorporateQuote } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/lib/formatters';

// Admin credentials
const ADMIN_EMAIL = 'yasinworks925@gmail.com';
const ADMIN_PASS = 'hedahedaheda1234';
const AUTH_STORAGE_KEY = 'carnival_admin_authenticated';

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetDefaultProducts,
    orders,
    updateOrderStatus,
    deleteOrder,
    getTotalRevenue,
    corporateQuotes,
    updateQuoteStatus,
    deleteCorporateQuote,
    searchAnalytics,
    failedSearches,
    language,
    setLanguage,
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (err) {
      // Storage access check
    } finally {
      setAuthChecking(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setLoginError('');

    setTimeout(() => {
      if (loginEmail.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && loginPassword === ADMIN_PASS) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        } catch (err) {}
      } else {
        setLoginError('ইমেইল বা পাসওয়ার্ড সঠিক নয়। দয়া করে আবার চেষ্টা করুন। (Invalid email or password)');
      }
      setIsSubmittingAuth(false);
    }, 400);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {}
    setIsAuthenticated(false);
    setLoginPassword('');
    setLoginError('');
  };

  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'corporate' | 'search'>('products');

  // Product Modals & Filters
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageInputUrl, setImageInputUrl] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Stats Calculations
  const totalRevenue = useMemo(() => getTotalRevenue(), [orders]);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'placed' || o.status === 'confirmed').length;
  const lowStockProducts = useMemo(() => products.filter((p) => p.stock <= 30), [products]);
  const outOfStockProducts = useMemo(() => products.filter((p) => p.stock === 0), [products]);
  const totalProductsCount = products.length;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name_en.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.name_bn.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase());
      const matchCat = selectedCatFilter === 'all' || p.category_id === selectedCatFilter;
      
      let matchStock = true;
      if (stockStatusFilter === 'in_stock') matchStock = p.stock > 30;
      if (stockStatusFilter === 'low_stock') matchStock = p.stock > 0 && p.stock <= 30;
      if (stockStatusFilter === 'out_of_stock') matchStock = p.stock === 0;

      return matchSearch && matchCat && matchStock;
    });
  }, [products, productSearch, selectedCatFilter, stockStatusFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusFilter === 'all') return true;
      return o.status === orderStatusFilter;
    });
  }, [orders, orderStatusFilter]);

  // Add/Edit Product Form State
  const initialFormState: Partial<Product> = {
    name_en: '',
    name_bn: '',
    brand: 'AMANA',
    category_id: 'cleaning-supplies',
    category_en: 'Cleaning Supplies',
    category_bn: 'ক্লিনিং সাপ্লাইজ',
    size: '5 L',
    unit: 'L',
    price: 650,
    sale_price: 550,
    stock: 100,
    description_en: '',
    description_bn: '',
    images: ['https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&auto=format&fit=crop&q=80'],
    featured: true,
    popular: true,
    offer: true,
    offer_tag_en: 'SAVE ৳100',
    offer_tag_bn: '৳১০০ সাশ্রয়',
    sku: `CM-${Math.floor(1000 + Math.random() * 9000)}`,
    currency: 'BDT',
    rating: 4.9,
    review_count: 12,
    features_en: ['Commercial grade active ingredients', 'Kills 99.9% harmful germs and bacteria', 'Safe for tiles, marble and hard floors'],
    features_bn: ['কমার্শিয়াল গ্রেড ফর্মুলেশন', '৯৯.৯% ক্ষতিকর জীবাণু ধ্বংস করে', 'টাইলস, মার্বেল ও মেঝের জন্য শতভাগ নিরাপদ'],
    specifications: { 'Volume': '5 Liters', 'Origin': 'Bangladesh', 'Grade': 'Institutional / Household' },
    keywords_en: ['floor cleaner', '5l'],
    keywords_bn: ['ফ্লোর ক্লিনার'],
    search_aliases: ['floor cleaner', '5 liter floor'],
  };

  const [productForm, setProductForm] = useState<Partial<Product>>(initialFormState);

  const handleOpenAdd = () => {
    setProductForm({
      ...initialFormState,
      sku: `CM-${Math.floor(1000 + Math.random() * 9000)}`,
      id: `cm-prod-${Date.now()}`,
      images: ['https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&auto=format&fit=crop&q=80'],
    });
    setEditingProduct(null);
    setImageInputUrl('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      ...p,
      images: p.images && p.images.length > 0 ? [...p.images] : ['https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&auto=format&fit=crop&q=80']
    });
    setImageInputUrl('');
    setIsAddModalOpen(true);
  };

  // Image Upload handler (Base64 file reader)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        setProductForm((prev) => ({
          ...prev,
          images: [base64Url, ...(prev.images || []).filter(img => img !== base64Url)],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = () => {
    if (!imageInputUrl.trim()) return;
    setProductForm((prev) => ({
      ...prev,
      images: [imageInputUrl.trim(), ...(prev.images || [])],
    }));
    setImageInputUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProductForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name_en || !productForm.name_bn || !productForm.price) {
      alert('অনুগ্রহ করে পণ্যের নাম (English ও বাংলা) এবং মূল্য পূরণ করুন।');
      return;
    }

    const matchedCat = CATEGORIES.find((c) => c.id === productForm.category_id);
    const category_en = matchedCat?.name_en || 'Cleaning Supplies';
    const category_bn = matchedCat?.name_bn || 'ক্লিনিং সাপ্লাইজ';

    const slug_en = productForm.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug_bn = slug_en;

    const finalImages = productForm.images && productForm.images.length > 0 
      ? productForm.images 
      : ['https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&auto=format&fit=crop&q=80'];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        images: finalImages,
        category_en,
        category_bn,
        slug_en,
        slug_bn,
      });
      setSaveSuccessMsg(`"${productForm.name_en}" সফলভাবে আপডেট করা হয়েছে!`);
    } else {
      const newProd: Product = {
        ...(productForm as Product),
        id: productForm.id || `cm-prod-${Date.now()}`,
        images: finalImages,
        slug_en,
        slug_bn,
        category_en,
        category_bn,
        tags: [productForm.brand || 'Carnival', productForm.size || '5L', category_en],
      };
      addProduct(newProd);
      setSaveSuccessMsg(`নতুন পণ্য "${newProd.name_en}" সফলভাবে যুক্ত করা হয়েছে!`);
    }

    setIsAddModalOpen(false);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // ----------------------------------------------------
  // RENDER: Loading or Login Screen if Not Authenticated
  // ----------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-white font-medium text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-brand-500" />
          <span>প্রশাসক প্যানেল লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="max-w-md w-full">
          {/* Brand Logo & Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group mb-3">
              <img src="/logo.png" alt="Carnival Mart" className="h-12 w-auto object-contain drop-shadow" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Carnival Mart Admin Panel
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              প্রশাসক অ্যাকাউন্টে লগইন করুন (Authorized Personnel Only)
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/50 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-200">সুরক্ষিত অ্যাডমিন লগইন</h2>
                <p className="text-[11px] text-slate-400">Please enter your verified credentials</p>
              </div>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-rose-400 text-xs animate-fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ইমেইল এড্রেস (Admin Email)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="yasinworks925@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  পাসওয়ার্ড (Password)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all tracking-wider"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 mt-2"
              >
                {isSubmittingAuth ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>মূল ওয়েবসাইটে ফিরে যান (Back to Storefront)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: Authenticated Admin Dashboard
  // ----------------------------------------------------
  return (
    <div className="bg-slate-100 min-h-screen pb-16 font-sans">
      {/* Save Success Alert Notification */}
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-5 h-5" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Carnival Mart" className="h-8 w-auto object-contain" />
              <div className="hidden sm:block">
                <span className="font-black text-sm tracking-tight text-white block leading-none">
                  CARNIVAL MART
                </span>
                <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">
                  Admin Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>পণ্য যোগ করুন (Add Product)</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
            >
              <span>ওয়েবসাইট দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-800 border-t border-slate-700/80 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>সকল পণ্য ও ছবি এডিট ({totalProductsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>বিক্রয় ও রাজস্ব (Sales Overview)</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>কাস্টমার অর্ডার ({totalOrdersCount})</span>
              {pendingOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-extrabold rounded-full text-[10px]">
                  {pendingOrdersCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'corporate'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>কর্পোরেট আবেদন ({corporateQuotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'search'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>সার্চ অ্যানালিটিক্স</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* ================= TAB 1: ALL PRODUCTS & IMAGE EDIT ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Top Quick Action Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Search box */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="পণ্য বা ব্র্যান্ড বা SKU দিয়ে খুঁজুন..."
                    className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-brand-600 outline-none"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Dropdown */}
                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white font-medium text-slate-700"
                >
                  <option value="all">সকল ক্যাটাগরি (All Categories)</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name_bn} ({c.name_en})
                    </option>
                  ))}
                </select>

                {/* Stock Filter */}
                <select
                  value={stockStatusFilter}
                  onChange={(e) => setStockStatusFilter(e.target.value as any)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white font-medium text-slate-700"
                >
                  <option value="all">সব স্টক স্ট্যাটাস</option>
                  <option value="in_stock">পর্যাপ্ত স্টক (&gt; 30)</option>
                  <option value="low_stock">স্বল্প স্টক (1-30)</option>
                  <option value="out_of_stock">স্টক শেষ (0)</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={resetDefaultProducts}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                  title="Reload initial catalog"
                >
                  ডিফল্ট প্রোডাক্ট রিলোড
                </button>
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন পণ্য যোগ করুন</span>
                </button>
              </div>
            </div>

            {/* Products Table with Rich Image Thumbnails & Direct Steppers */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900">
                    ক্যাটালগ পণ্য তালিকা ({filteredProducts.length} টি পাওয়া গেছে)
                  </h2>
                  <span className="text-[11px] text-slate-500">
                    — যেকোনো পণ্যের ছবি ও তথ্য সরাসরি এডিট করুন
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-5">ছবি ও পণ্যের নাম</th>
                      <th className="p-3.5">ক্যাটাগরি</th>
                      <th className="p-3.5">সাইজ/ভলিউম</th>
                      <th className="p-3.5">মূল্য (Price)</th>
                      <th className="p-3.5">স্টক কাউন্টার (+/-)</th>
                      <th className="p-3.5">অফার/ট্যাগ</th>
                      <th className="p-3.5 pr-5 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 pl-5">
                          <div className="flex items-center gap-3">
                            <div className="relative group/thumb shrink-0">
                              <img
                                src={p.images[0] || 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&auto=format&fit=crop&q=80'}
                                alt={p.name_en}
                                className="w-14 h-14 rounded-xl border border-slate-200 object-cover bg-slate-50"
                              />
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center text-white transition-opacity"
                                title="Change photo"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="min-w-0 max-w-xs sm:max-w-sm">
                              <div className="font-bold text-slate-900 line-clamp-1 text-xs">{p.name_bn}</div>
                              <div className="text-[11px] text-slate-600 line-clamp-1">{p.name_en}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                SKU: <span className="font-mono font-bold text-slate-600">{p.sku}</span> • {p.brand}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium inline-block">
                            {p.category_bn || p.category_en}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-800">
                          {p.size}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 text-xs">
                            {formatPrice(p.sale_price ?? p.price, 'bn')}
                          </div>
                          {p.sale_price && p.sale_price < p.price && (
                            <div className="text-[10px] text-slate-400 line-through">
                              {formatPrice(p.price, 'bn')}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateStock(p.id, Math.max(0, p.stock - 5))}
                              className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs active:scale-95"
                              title="Decrease stock by 5"
                            >
                              -
                            </button>
                            <span
                              className={`font-bold px-2 py-0.5 rounded text-xs min-w-[32px] text-center ${
                                p.stock === 0
                                  ? 'bg-rose-100 text-rose-800'
                                  : p.stock <= 30
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-slate-100 text-slate-800'
                              }`}
                            >
                              {p.stock}
                            </span>
                            <button
                              onClick={() => updateStock(p.id, p.stock + 10)}
                              className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs active:scale-95"
                              title="Increase stock by 10"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {p.offer && (
                              <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded">
                                {p.offer_tag_bn || 'অফার'}
                              </span>
                            )}
                            {p.featured && (
                              <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[10px] font-semibold rounded">
                                ফিচারড
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-brand-700 hover:text-brand-800 hover:bg-brand-50 rounded-lg transition-colors flex items-center gap-1 font-bold text-[11px]"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>এডিট</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`আপনি কি "${p.name_bn}" পণ্যটি মুছে ফেলতে চান?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: DASHBOARD OVERVIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Revenue */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    মোট বিক্রয় রাজস্ব (Total Revenue)
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPrice(totalRevenue, 'bn')}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>লাইভ বিক্রয় ক্যালকুলেটর</span>
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    মোট অর্ডার (Total Orders)
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {totalOrdersCount} টি
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                    {pendingOrdersCount} টি নতুন পেন্ডিং অর্ডার
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              {/* Active Products */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ক্যাটালগ পণ্য সংখ্যা
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {totalProductsCount} টি
                  </h3>
                  <span className="text-[11px] text-brand-700 font-medium mt-1 block">
                    ওয়েবসাইটে সক্রিয়
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              {/* Low Stock Alert */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    লো-স্টক সতর্কতা
                  </span>
                  <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
                    {lowStockProducts.length} টি
                  </h3>
                  <span className="text-[11px] text-amber-600 font-medium mt-1 block">
                    রিফিল প্রয়োজন
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    সাম্প্রতিক অর্ডারসমূহ (Recent Customer Orders)
                  </h2>
                  <p className="text-xs text-slate-500">
                    হোম ডেলিভারি ও রিয়েলটাইম স্ট্যাটাস
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                >
                  <span>সব অর্ডার দেখুন</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-5">অর্ডার নম্বর</th>
                      <th className="p-3.5">গ্রাহক ও ফোন</th>
                      <th className="p-3.5">জেলা / ঠিকানা</th>
                      <th className="p-3.5">পণ্য</th>
                      <th className="p-3.5">মোট মূল্য</th>
                      <th className="p-3.5">পেমেন্ট</th>
                      <th className="p-3.5">ডেলিভারি স্ট্যাটাস</th>
                      <th className="p-3.5 pr-5 text-right">ইনভয়েস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 pl-5 font-bold text-slate-900">
                          {order.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-900">{order.customerName}</div>
                          <div className="text-[11px] text-slate-400">{order.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <div>{order.district}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
                            {order.area}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-medium text-slate-700">
                            {order.items.length} টি পণ্য
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-brand-700">
                          {formatPrice(order.total, 'bn')}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded uppercase text-[10px]">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderNumber, e.target.value as any)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border outline-none cursor-pointer ${
                              order.status === 'delivered'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : order.status === 'shipped'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : order.status === 'processing'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="placed">Placed (গৃহীত)</option>
                            <option value="confirmed">Confirmed (কনফার্মড)</option>
                            <option value="processing">Processing (প্যাকিং)</option>
                            <option value="shipped">Shipped (কুরিয়ারে)</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered (সম্পন্ন)</option>
                          </select>
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          <button
                            onClick={() => setViewingOrder(order)}
                            className="p-1.5 text-slate-500 hover:text-brand-600 rounded-md hover:bg-slate-100"
                            title="View invoice details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'সব অর্ডার (All)' },
                { id: 'placed', label: 'Placed (গৃহীত)' },
                { id: 'confirmed', label: 'Confirmed (কনফার্মড)' },
                { id: 'processing', label: 'Processing (প্যাকিং)' },
                { id: 'shipped', label: 'Shipped (কুরিয়ারে)' },
                { id: 'delivered', label: 'Delivered (সম্পন্ন)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOrderStatusFilter(f.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    orderStatusFilter === f.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-5">অর্ডার ও তারিখ</th>
                      <th className="p-3.5">গ্রাহকের নাম ও ফোন</th>
                      <th className="p-3.5">ডেলিভারি ঠিকানা</th>
                      <th className="p-3.5">মোট বিল</th>
                      <th className="p-3.5">পেমেন্ট মেথড</th>
                      <th className="p-3.5">স্ট্যাটাস আপডেট</th>
                      <th className="p-3.5 pr-5 text-right">ইনভয়েস বিবরণ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 pl-5">
                          <div className="font-extrabold text-slate-900">{order.orderNumber}</div>
                          <div className="text-[10px] text-slate-400">{order.date}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-900">{order.customerName}</div>
                          <div className="text-[11px] text-slate-500">{order.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-slate-800">{order.district}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {order.area}
                          </div>
                        </td>
                        <td className="p-3.5 font-bold text-brand-700 text-sm">
                          {formatPrice(order.total, 'bn')}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-bold rounded uppercase text-[10px]">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderNumber, e.target.value as any)}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg border outline-none bg-slate-50 cursor-pointer"
                          >
                            <option value="placed">Placed (গৃহীত)</option>
                            <option value="confirmed">Confirmed (কনফার্মড)</option>
                            <option value="processing">Processing (প্যাকিং)</option>
                            <option value="shipped">Shipped (কুরিয়ারে)</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered (সম্পন্ন)</option>
                          </select>
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          <button
                            onClick={() => setViewingOrder(order)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            বিস্তারিত
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CORPORATE LEADS ================= */}
        {activeTab === 'corporate' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
              <h2 className="text-base font-bold text-slate-900 mb-1">
                প্রাতিষ্ঠানিক ও কর্পোরেট সাপ্লাই আবেদন ({corporateQuotes.length})
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                হাসপাতাল, হোটেল, রেস্তোরাঁ ও অফিস কর্তৃক জমাকৃত কোটেশন রিকোয়েস্ট
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-4">প্রতিষ্ঠান ও যোগাযোগ</th>
                      <th className="p-3.5">সেক্টর / ধরন</th>
                      <th className="p-3.5">সাপ্লাই ফ্রিকোয়েন্সি</th>
                      <th className="p-3.5">প্রয়োজনীয় পণ্যের তালিকা</th>
                      <th className="p-3.5">তারিখ</th>
                      <th className="p-3.5">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {corporateQuotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5 pl-4">
                          <div className="font-bold text-slate-900">{q.company}</div>
                          <div className="text-slate-600">{q.name} • {q.phone}</div>
                          {q.email && <div className="text-[11px] text-slate-400">{q.email}</div>}
                        </td>
                        <td className="p-3.5 font-medium text-brand-700">{q.sector}</td>
                        <td className="p-3.5">{q.frequency || 'Monthly Contract'}</td>
                        <td className="p-3.5 max-w-xs text-slate-600">{q.requirements}</td>
                        <td className="p-3.5 text-slate-400">{q.date}</td>
                        <td className="p-3.5">
                          <select
                            value={q.status}
                            onChange={(e) => updateQuoteStatus(q.id, e.target.value as any)}
                            className="px-2 py-1 text-xs font-bold rounded-lg border outline-none bg-white"
                          >
                            <option value="new">New Lead</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="closed">Closed / Won</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SEARCH INSIGHTS ================= */}
        {activeTab === 'search' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Searched Queries */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>সর্বোচ্চ কাস্টমার সার্চ কুয়েরি (Top Searches)</span>
              </h3>
              <p className="text-xs text-slate-500">
                ওয়েবসাইটে গ্রাহকরা যেসকল কি-ওয়ার্ড সবচেয়ে বেশি খুঁজছেন
              </p>

              <div className="divide-y divide-slate-100">
                {searchAnalytics.map((s, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{s.query}</span>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 font-bold rounded">
                      {s.count} বার সার্চ
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unmet Customer Demand */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-4 h-4" />
                <span>অনুপলব্ধ চাহিদা: ০-রেজাল্ট সার্চ (Unmet Demand)</span>
              </h3>
              <p className="text-xs text-slate-500">
                যে পণ্যগুলো গ্রাহক খুঁজলেও ওয়েবসাইটে পায়নি (নতুন পণ্য অ্যাড করার সুযোগ)
              </p>

              <div className="divide-y divide-slate-100">
                {failedSearches.map((f, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">"{f.query}"</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(f.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD / EDIT PRODUCT & IMAGE MANAGER ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-50 text-brand-700 px-2.5 py-1 rounded-md">
                {editingProduct ? 'পণ্য সংশোধন (Edit Mode)' : 'নতুন পণ্য তৈরি (Create Mode)'}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                {editingProduct ? `সম্পাদন: ${editingProduct.name_bn}` : 'নতুন ক্যাটালগ পণ্য যুক্ত করুন'}
              </h2>
              <p className="text-xs text-slate-500">
                এখানে ছবি আপলোড বা তথ্য পরিবর্তন করলে তা সরাসরি লাইভ ওয়েবসাইটে আপডেট হবে।
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              {/* IMAGE UPLOAD & GALLERY SECTION */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brand-600" />
                    <span>পণ্যের ছবি আপলোড ও প্রিভিউ (Product Images)</span>
                  </label>
                  <span className="text-[11px] text-slate-400">কম্পিউটার থেকে ছবি দিন বা লিঙ্ক পেস্ট করুন</span>
                </div>

                {/* Thumbnails list */}
                <div className="flex flex-wrap items-center gap-3">
                  {(productForm.images || []).map((imgUrl, idx) => (
                    <div key={idx} className="relative group/img w-20 h-20 rounded-xl border-2 border-slate-200 overflow-hidden bg-white shadow-xs">
                      <img src={imgUrl} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-sm"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[9px] text-center font-bold py-0.5">
                          প্রধান ছবি
                        </span>
                      )}
                    </div>
                  ))}

                  {/* File Upload Button */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 hover:bg-brand-50 flex flex-col items-center justify-center text-brand-700 cursor-pointer transition-colors p-2 text-center"
                    title="Upload from computer"
                  >
                    <UploadCloud className="w-5 h-5 mb-0.5" />
                    <span className="text-[10px] font-bold leading-tight">ছবি আপলোড</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Image URL Direct Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    value={imageInputUrl}
                    onChange={(e) => setImageInputUrl(e.target.value)}
                    placeholder="অথবা সরাসরি ছবির URL পেস্ট করুন (https://...)"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs outline-none focus:ring-1 focus:ring-brand-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs shrink-0 transition-colors"
                  >
                    লিঙ্ক যুক্ত করুন
                  </button>
                </div>
              </div>

              {/* BILINGUAL NAMES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">
                    পণ্যের নাম (বাংলায়) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name_bn || ''}
                    onChange={(e) => setProductForm({ ...productForm, name_bn: e.target.value })}
                    placeholder="যেমন: আমনা ফ্লোর ক্লিনার লেমন"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-brand-600 font-bengali text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name_en || ''}
                    onChange={(e) => setProductForm({ ...productForm, name_en: e.target.value })}
                    placeholder="e.g. AMANA Floor Cleaner Lemon"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-brand-600 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* BRAND, CATEGORY, SIZE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">ব্র্যান্ড (Brand)</label>
                  <input
                    type="text"
                    value={productForm.brand || 'Carnival Mart'}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    placeholder="e.g. AMANA"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">ক্যাটাগরি (Category)</label>
                  <select
                    value={productForm.category_id || 'cleaning-supplies'}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_bn} ({c.name_en})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">সাইজ / ভলিউম (Size)</label>
                  <input
                    type="text"
                    value={productForm.size || '5 L'}
                    onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
                    placeholder="যেমন: 5 L, 500 ml, 1 L"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-medium"
                  />
                </div>
              </div>

              {/* PRICING & STOCK */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">নিয়মিত মূল্য (Regular ৳) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">অফার মূল্য (Sale ৳)</label>
                  <input
                    type="number"
                    value={productForm.sale_price || ''}
                    onChange={(e) => setProductForm({ ...productForm, sale_price: Number(e.target.value) || undefined })}
                    placeholder="ডিসকাউন্ট না থাকলে খালি রাখুন"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-bold text-brand-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">স্টক পরিমাণ (Stock Qty)</label>
                  <input
                    type="number"
                    value={productForm.stock || 0}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-bold"
                  />
                </div>
              </div>

              {/* DESCRIPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">পণ্য বিবরণী (বাংলায়)</label>
                  <textarea
                    rows={3}
                    value={productForm.description_bn || ''}
                    onChange={(e) => setProductForm({ ...productForm, description_bn: e.target.value })}
                    placeholder="পণ্যের কার্যকারিতা ও বিস্তারিত বিবরণ লিখুন..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none resize-none font-bengali text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Description (English)</label>
                  <textarea
                    rows={3}
                    value={productForm.description_en || ''}
                    onChange={(e) => setProductForm({ ...productForm, description_en: e.target.value })}
                    placeholder="Enter full English description..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none resize-none text-xs"
                  />
                </div>
              </div>

              {/* BADGES & HIGHLIGHTS */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={productForm.featured ?? true}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>হোমপেজ ফিচারড পণ্য (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={productForm.offer ?? true}
                    onChange={(e) => setProductForm({ ...productForm, offer: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>বিশেষ অফার ব্যাজ (Special Offer)</span>
                </label>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-extrabold shadow-md flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'পরিবর্তন সংরক্ষণ করুন' : 'পণ্য প্রকাশ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ORDER DETAILS INVOICE ================= */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setViewingOrder(null)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <button
              onClick={() => setViewingOrder(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                অফিসিয়াল ইনভয়েস ও মেমো
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Order #{viewingOrder.orderNumber}
              </h2>
              <div className="text-xs text-slate-400">{viewingOrder.date}</div>
            </div>

            {/* Customer Details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">গ্রাহকের নাম:</span>
                <strong className="text-slate-900 font-bold">{viewingOrder.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মোবাইল নম্বর:</span>
                <strong className="text-slate-900 font-bold">{viewingOrder.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">জেলা (District):</span>
                <span className="text-slate-900 font-semibold">{viewingOrder.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">সম্পূর্ণ ঠিকানা:</span>
                <span className="text-slate-900 font-medium">{viewingOrder.area}</span>
              </div>
              {viewingOrder.notes && (
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">বিশেষ নোট:</span>
                  <span className="text-amber-700 font-semibold">{viewingOrder.notes}</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="divide-y divide-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                অর্ডারের পণ্যসমূহ
              </h4>
              {viewingOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg border object-cover shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">পরিমাণ: {item.quantity} টি</div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatPrice(item.total, 'bn')}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">সর্বমোট বিল:</span>
              <span className="font-black text-brand-700 text-lg">
                {formatPrice(viewingOrder.total, 'bn')}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewingOrder(null)}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

