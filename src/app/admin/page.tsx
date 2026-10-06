'use client';

import React, { useState, useMemo } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import { Product, Order, CorporateQuote } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/lib/formatters';

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

  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'corporate' | 'search'>('dashboard');

  // Product Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Stats Calculations
  const totalRevenue = useMemo(() => getTotalRevenue(), [orders]);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'placed' || o.status === 'confirmed').length;
  const lowStockProducts = useMemo(() => products.filter((p) => p.stock <= 50), [products]);
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
      return matchSearch && matchCat;
    });
  }, [products, productSearch, selectedCatFilter]);

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
    features_en: ['High potency germ kill', 'Safe on floors and tiles'],
    features_bn: ['কার্যকর জীবাণুনাশক', 'মেঝে ও টাইলসের জন্য নিরাপদ'],
    specifications: { 'Volume': '5 Liters', 'Origin': 'Bangladesh' },
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
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProductForm(p);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name_en || !productForm.name_bn || !productForm.price) {
      alert('Please fill in product name and price.');
      return;
    }

    const matchedCat = CATEGORIES.find((c) => c.id === productForm.category_id);
    const category_en = matchedCat?.name_en || 'Cleaning Supplies';
    const category_bn = matchedCat?.name_bn || 'ক্লিনিং সাপ্লাইজ';

    const slug_en = productForm.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug_bn = slug_en;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        category_en,
        category_bn,
        slug_en,
        slug_bn,
      });
    } else {
      const newProd: Product = {
        ...(productForm as Product),
        id: productForm.id || `cm-prod-${Date.now()}`,
        slug_en,
        slug_bn,
        category_en,
        category_bn,
        tags: [productForm.brand || 'Carnival', productForm.size || '5L', category_en],
      };
      addProduct(newProd);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-16 font-sans">
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white">
                  Carnival Mart
                </span>
                <span className="text-xs text-brand-400 ml-1.5 font-bold uppercase tracking-wider px-1.5 py-0.5 bg-brand-950 rounded">
                  Admin Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-800 border-t border-slate-700/80 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview & Sales (বিক্রয় ও আয়)</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-brand-500 text-brand-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Manage Products (পণ্য নিয়ন্ত্রণ)</span>
              <span className="px-1.5 py-0.2 bg-slate-700 rounded-full text-[10px]">
                {totalProductsCount}
              </span>
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
              <span>Customer Orders (অর্ডারসমূহ)</span>
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
              <span>Corporate Leads (কর্পোরেট আবেদন)</span>
              <span className="px-1.5 py-0.2 bg-slate-700 rounded-full text-[10px]">
                {corporateQuotes.length}
              </span>
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
              <span>Search Insights (কাস্টমার চাহিদা)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Revenue */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Sales Revenue
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPrice(totalRevenue, 'en')}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% from last week</span>
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
                    Total Orders
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {totalOrdersCount}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                    {pendingOrdersCount} pending dispatch
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
                    Catalog Products
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {totalProductsCount}
                  </h3>
                  <span className="text-[11px] text-brand-700 font-medium mt-1 block">
                    Active on Storefront
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
                    Low Stock Alerts
                  </span>
                  <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
                    {lowStockProducts.length}
                  </h3>
                  <span className="text-[11px] text-amber-600 font-medium mt-1 block">
                    Needs canister refill
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Orders List with Quick Status Toggle */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Recent Customer Orders (সাম্প্রতিক অর্ডারসমূহ)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time sales & doorstep delivery dispatch status
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-5">Order ID</th>
                      <th className="p-3.5">Customer & Phone</th>
                      <th className="p-3.5">District / Location</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Status (Update)</th>
                      <th className="p-3.5 pr-5 text-right">Actions</th>
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
                            {order.items.length} product(s)
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-brand-700">
                          {formatPrice(order.total, 'en')}
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

        {/* ================= TAB 2: PRODUCTS MANAGEMENT ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by product name, brand, SKU..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-brand-600 outline-none"
                  />
                </div>

                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none bg-white font-medium"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={resetDefaultProducts}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-5">Product Details</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Size / Unit</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock Counter</th>
                      <th className="p-3.5">Badges</th>
                      <th className="p-3.5 pr-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 pl-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name_en}
                              className="w-12 h-12 rounded-lg border object-cover shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">{p.name_en}</div>
                              <div className="text-[11px] text-brand-700 font-medium line-clamp-1">{p.name_bn}</div>
                              <div className="text-[10px] text-slate-400">
                                SKU: <strong>{p.sku}</strong> • {p.brand}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                            {p.category_en}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-800">
                          {p.size}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">
                            {formatPrice(p.sale_price ?? p.price, 'en')}
                          </div>
                          {p.sale_price && p.sale_price < p.price && (
                            <div className="text-[10px] text-slate-400 line-through">
                              {formatPrice(p.price, 'en')}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateStock(p.id, p.stock - 5)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span
                              className={`font-bold px-2 py-0.5 rounded text-xs ${
                                p.stock <= 30
                                  ? 'bg-rose-50 text-rose-700 font-extrabold'
                                  : 'text-slate-800'
                              }`}
                            >
                              {p.stock}
                            </span>
                            <button
                              onClick={() => updateStock(p.id, p.stock + 10)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {p.offer && (
                              <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded">
                                Offer
                              </span>
                            )}
                            {p.featured && (
                              <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[10px] font-semibold rounded">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.name_en}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
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

        {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Orders' },
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
                      <th className="p-3.5 pl-5">Order ID & Date</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Address / District</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Dispatch Status</th>
                      <th className="p-3.5 pr-5 text-right">Invoice & Details</th>
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
                          {formatPrice(order.total, 'en')}
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
                            <option value="placed">Placed</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          <button
                            onClick={() => setViewingOrder(order)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            View Order
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
                Institutional Quotations & Corporate Supply Inquiries
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Leads submitted by hospitals, factories, offices, and restaurant chains
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 pl-4">Company & Contact</th>
                      <th className="p-3.5">Industry Sector</th>
                      <th className="p-3.5">Supply Frequency</th>
                      <th className="p-3.5">Requirements</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
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

        {/* ================= TAB 5: SEARCH DEMAND INSIGHTS ================= */}
        {activeTab === 'search' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Searched Queries */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>Top Customer Search Queries (সর্বোচ্চ সার্চ)</span>
              </h3>
              <p className="text-xs text-slate-500">
                What customers are searching for most frequently
              </p>

              <div className="divide-y divide-slate-100">
                {searchAnalytics.map((s, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{s.query}</span>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 font-bold rounded">
                      {s.count} searches
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unmet Customer Demand (0-result searches) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-4 h-4" />
                <span>Unmet Demand: 0-Result Queries (অনুপলব্ধ পণ্য)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Products customers tried searching for but are currently missing in stock
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

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {editingProduct ? 'Edit Product (পণ্য সম্পাদন করুন)' : 'Add New Product (নতুন পণ্য যোগ করুন)'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in the bilingual details. It will immediately appear on the storefront.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name_en || ''}
                    onChange={(e) => setProductForm({ ...productForm, name_en: e.target.value })}
                    placeholder="e.g. AMANA Floor Cleaner Lemon"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    পণ্যের নাম (বাংলায়) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name_bn || ''}
                    onChange={(e) => setProductForm({ ...productForm, name_bn: e.target.value })}
                    placeholder="যেমন: আমনা ফ্লোর ক্লিনার লেমন"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-600 font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={productForm.brand || 'Carnival Mart'}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    placeholder="e.g. AMANA"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={productForm.category_id || 'cleaning-supplies'}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Size / Volume</label>
                  <input
                    type="text"
                    value={productForm.size || '5 L'}
                    onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
                    placeholder="e.g. 5 L, 500 ml"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Regular Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sale / Offer Price (৳)</label>
                  <input
                    type="number"
                    value={productForm.sale_price || ''}
                    onChange={(e) => setProductForm({ ...productForm, sale_price: Number(e.target.value) || undefined })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={productForm.stock || 0}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.images?.[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description (English)</label>
                  <textarea
                    rows={3}
                    value={productForm.description_en || ''}
                    onChange={(e) => setProductForm({ ...productForm, description_en: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">বিবরণ (বাংলায়)</label>
                  <textarea
                    rows={3}
                    value={productForm.description_bn || ''}
                    onChange={(e) => setProductForm({ ...productForm, description_bn: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none resize-none font-bengali"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={productForm.featured ?? true}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={productForm.offer ?? true}
                    onChange={(e) => setProductForm({ ...productForm, offer: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Special Offer</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <button
              onClick={() => setViewingOrder(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                Official Order Invoice
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Order #{viewingOrder.orderNumber}
              </h2>
              <div className="text-xs text-slate-400">{viewingOrder.date}</div>
            </div>

            {/* Customer Details */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <strong className="text-slate-900">{viewingOrder.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <strong className="text-slate-900">{viewingOrder.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">District:</span>
                <span className="text-slate-900">{viewingOrder.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="text-slate-900">{viewingOrder.area}</span>
              </div>
              {viewingOrder.notes && (
                <div className="flex justify-between border-t border-slate-200 pt-1">
                  <span className="text-slate-500">Special Note:</span>
                  <span className="text-amber-700 font-medium">{viewingOrder.notes}</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="divide-y divide-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Purchased Items
              </h4>
              {viewingOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={item.image} alt={item.name} className="w-9 h-9 rounded border object-cover" />
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatPrice(item.total, 'en')}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">Grand Total:</span>
              <span className="font-extrabold text-brand-700 text-base">
                {formatPrice(viewingOrder.total, 'en')}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewingOrder(null)}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
