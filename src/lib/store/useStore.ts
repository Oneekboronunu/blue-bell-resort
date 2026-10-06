import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, Language, ProductVariant, Order, CorporateQuote } from '@/types';
import { translations } from '@/lib/i18n/translations';
import { PRODUCTS } from '@/data/products';
import { INITIAL_ORDERS, INITIAL_CORPORATE_QUOTES } from '@/data/initialStoreData';

interface StoreState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;

  // Products Management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  resetDefaultProducts: () => void;

  // Orders Management & Sales Tracking
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getTotalRevenue: () => number;
  getOrdersCountByStatus: (status: Order['status']) => number;

  // Corporate Leads
  corporateQuotes: CorporateQuote[];
  addCorporateQuote: (quote: Omit<CorporateQuote, 'id' | 'date' | 'status'>) => void;
  updateQuoteStatus: (id: string, status: CorporateQuote['status']) => void;
  deleteCorporateQuote: (id: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Search History & Analytics
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  searchAnalytics: { query: string; count: number; timestamp: number }[];
  failedSearches: { query: string; timestamp: number }[];
  logFailedSearch: (query: string) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (message: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Language
      language: 'bn',
      t: translations.bn,
      setLanguage: (lang: Language) => {
        set({
          language: lang,
          t: translations[lang] || translations.bn,
        });
      },

      // Products Management
      products: PRODUCTS,
      addProduct: (product: Product) => {
        set((state) => ({
          products: [product, ...state.products],
        }));
        get().showToast(
          get().language === 'bn'
            ? `"${product.name_bn}" পণ্যটি সফলভাবে যুক্ত হয়েছে!`
            : `Product "${product.name_en}" added successfully!`
        );
      },
      updateProduct: (id: string, updated: Partial<Product>) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated, updated_at: new Date().toISOString() } : p)),
        }));
        get().showToast(
          get().language === 'bn' ? 'পণ্য আপডেট সম্পন্ন হয়েছে!' : 'Product updated successfully!'
        );
      },
      deleteProduct: (id: string) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
        get().showToast(
          get().language === 'bn' ? 'পণ্যটি তালিকা থেকে মুছে ফেলা হয়েছে' : 'Product deleted successfully'
        );
      },
      updateStock: (id: string, newStock: number) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p)),
        }));
      },
      resetDefaultProducts: () => {
        set({ products: PRODUCTS });
        get().showToast(
          get().language === 'bn' ? 'ডিফল্ট পণ্য তালিকা রিস্টোর করা হয়েছে' : 'Default product catalog restored'
        );
      },

      // Orders Management
      orders: INITIAL_ORDERS,
      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
      updateOrderStatus: (orderId: string, status: Order['status']) => {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        set((state) => ({
          orders: state.orders.map((ord) => {
            if (ord.id === orderId || ord.orderNumber === orderId) {
              const updatedTimeline = ord.timeline.map((step) => {
                if (step.status === status) {
                  return { ...step, completed: true, current: true, time: timeNow };
                }
                return { ...step, current: false };
              });
              return { ...ord, status, timeline: updatedTimeline };
            }
            return ord;
          }),
        }));
        get().showToast(
          get().language === 'bn'
            ? `অর্ডার #${orderId} এর স্ট্যাটাস আপডেট হয়েছে: ${status}`
            : `Order #${orderId} status updated to: ${status}`
        );
      },
      deleteOrder: (orderId: string) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== orderId && o.orderNumber !== orderId),
        }));
      },
      getTotalRevenue: () => {
        return get().orders.reduce((sum, ord) => sum + ord.total, 0);
      },
      getOrdersCountByStatus: (status: Order['status']) => {
        return get().orders.filter((o) => o.status === status).length;
      },

      // Corporate Quotes
      corporateQuotes: INITIAL_CORPORATE_QUOTES,
      addCorporateQuote: (data) => {
        const newQuote: CorporateQuote = {
          ...data,
          id: `cq-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          status: 'new',
        };
        set((state) => ({
          corporateQuotes: [newQuote, ...state.corporateQuotes],
        }));
      },
      updateQuoteStatus: (id: string, status: CorporateQuote['status']) => {
        set((state) => ({
          corporateQuotes: state.corporateQuotes.map((q) => (q.id === id ? { ...q, status } : q)),
        }));
      },
      deleteCorporateQuote: (id: string) => {
        set((state) => ({
          corporateQuotes: state.corporateQuotes.filter((q) => q.id !== id),
        }));
      },

      // Cart
      cart: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addToCart: (product: Product, quantity = 1, variant?: ProductVariant) => {
        const currentCart = get().cart;
        const targetVariantId = variant ? variant.id : undefined;

        const existingIndex = currentCart.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedVariant?.id === targetVariantId
        );

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = [...currentCart];
          newCart[existingIndex].quantity += quantity;
        } else {
          newCart = [
            ...currentCart,
            {
              product,
              selectedVariant: variant,
              quantity,
            },
          ];
        }

        const isBn = get().language === 'bn';
        const prodName = isBn ? product.name_bn : product.name_en;
        const toastText = isBn
          ? `"${prodName}" কার্টে যোগ করা হয়েছে`
          : `Added "${prodName}" to cart`;

        set({ cart: newCart, isCartOpen: true });
        get().showToast(toastText);
      },

      removeFromCart: (productId: string, variantId?: string) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(item.product.id === productId && item.selectedVariant?.id === variantId)
          ),
        }));
      },

      updateCartQuantity: (productId: string, quantity: number, variantId?: string) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, variantId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.product.id === productId && item.selectedVariant?.id === variantId) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getCartCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => {
          const price = item.selectedVariant
            ? (item.selectedVariant.sale_price ?? item.selectedVariant.price)
            : (item.product.sale_price ?? item.product.price);
          return total + price * item.quantity;
        }, 0);
      },

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId: string) => {
        const current = get().wishlist;
        const exists = current.includes(productId);
        const next = exists
          ? current.filter((id) => id !== productId)
          : [...current, productId];

        const isBn = get().language === 'bn';
        const msg = exists
          ? (isBn ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'Removed from wishlist')
          : (isBn ? 'পছন্দের তালিকায় যুক্ত হয়েছে' : 'Saved to wishlist');

        set({ wishlist: next });
        get().showToast(msg);
      },
      isInWishlist: (productId: string) => get().wishlist.includes(productId),

      // Quick View
      quickViewProduct: null,
      setQuickViewProduct: (product: Product | null) =>
        set({ quickViewProduct: product }),

      // Search History & Analytics
      recentSearches: ['Floor Cleaner', '5L Hand Wash', 'Power Max', 'Jasmine Freshener'],
      searchAnalytics: [
        { query: '5 liter floor cleaner', count: 18, timestamp: Date.now() - 3600000 },
        { query: 'hospital disinfectant', count: 14, timestamp: Date.now() - 7200000 },
        { query: 'softtouch hand wash 5L', count: 12, timestamp: Date.now() - 10800000 },
        { query: 'dishwash liquid 5L', count: 9, timestamp: Date.now() - 14400000 },
        { query: 'automatic air freshener', count: 7, timestamp: Date.now() - 18000000 },
      ],
      addRecentSearch: (query: string) => {
        if (!query.trim()) return;
        const trimmed = query.trim();
        const currentRecent = get().recentSearches.filter(
          (q) => q.toLowerCase() !== trimmed.toLowerCase()
        );
        const currentAnalytics = [...get().searchAnalytics];
        const existingIdx = currentAnalytics.findIndex(
          (a) => a.query.toLowerCase() === trimmed.toLowerCase()
        );

        if (existingIdx > -1) {
          currentAnalytics[existingIdx].count += 1;
          currentAnalytics[existingIdx].timestamp = Date.now();
        } else {
          currentAnalytics.unshift({ query: trimmed, count: 1, timestamp: Date.now() });
        }

        set({
          recentSearches: [trimmed, ...currentRecent].slice(0, 8),
          searchAnalytics: currentAnalytics.slice(0, 30),
        });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),

      failedSearches: [
        { query: '20 liter floor cleaner', timestamp: Date.now() - 86400000 },
        { query: 'toilet paper rolls bulk', timestamp: Date.now() - 172800000 },
        { query: 'automatic touchless sanitizer dispenser', timestamp: Date.now() - 259200000 },
      ],
      logFailedSearch: (query: string) => {
        if (!query.trim()) return;
        set((state) => ({
          failedSearches: [
            { query: query.trim(), timestamp: Date.now() },
            ...state.failedSearches.slice(0, 49),
          ],
        }));
      },

      // Toast
      toastMessage: null,
      showToast: (message: string) => {
        set({ toastMessage: message });
        setTimeout(() => {
          if (get().toastMessage === message) {
            set({ toastMessage: null });
          }
        }, 3000);
      },
    }),
    {
      name: 'carnival-mart-storage-v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        language: state.language,
        products: state.products,
        orders: state.orders,
        corporateQuotes: state.corporateQuotes,
        cart: state.cart,
        wishlist: state.wishlist,
        recentSearches: state.recentSearches,
        searchAnalytics: state.searchAnalytics,
        failedSearches: state.failedSearches,
      }),
    }
  )
);
