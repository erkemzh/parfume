import React, { useState, useEffect, useMemo } from 'react';
import { Perfume, PerfumeFormat, OlfactoryFamily, PerfumeSeason, TimeOfDay, OrderItem, CartItem, DiscoverySetItem, Order } from './types/perfume';
import { INITIAL_PERFUMES } from './data/initialPerfumes';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FamilyGuide } from './components/FamilyGuide';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { DiscoverySetBuilder } from './components/DiscoverySetBuilder';
import { SommelierQuizModal } from './components/SommelierQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FlowerMatcherModal } from './components/FlowerMatcherModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  // 1. Persistent Perfumes Catalog (Version-tagged for 20 unique items with distinct images)
  const [perfumes, setPerfumes] = useState<Perfume[]>(() => {
    try {
      const saved = localStorage.getItem('aura_perfumes_catalog_v3_20');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved perfumes', e);
    }
    return INITIAL_PERFUMES;
  });

  useEffect(() => {
    localStorage.setItem('aura_perfumes_catalog_v3_20', JSON.stringify(perfumes));
  }, [perfumes]);

  // 2. Persistent Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('aura_orders_v2_floral');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'AF-718290',
        date: '2 ноября 2026, 12:15',
        customerName: 'Анастасия Белова',
        phone: '+7 903 552-19-84',
        email: 'anastasia@gmail.com',
        address: 'г. Москва, Чистопрудный бульвар, д. 12, кв. 34',
        items: [
          {
            id: 'cart-init-1',
            type: 'single',
            perfume: INITIAL_PERFUMES[0],
            format: INITIAL_PERFUMES[0].formats[3],
            quantity: 1,
          },
        ],
        freeSample: {
          name: 'Aura de Rose & Soie (Extrait 1.5 мл)',
          brand: 'Maison Soie & Pétales',
        },
        giftWrapping: true,
        giftCardMessage: 'Прекрасной весенней поры и нежнейшего цветочного вдохновения!',
        subtotal: 16800,
        discount: 0,
        deliveryFee: 0,
        total: 17300,
        status: 'в обработке',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('aura_orders_v2_floral', JSON.stringify(orders));
  }, [orders]);

  // 3. Cart State
  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart_v2_floral');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem('aura_cart_v2_floral', JSON.stringify(cartItems));
  }, [cartItems]);

  const [freeSample, setFreeSample] = useState<{ name: string; brand: string } | undefined>(undefined);
  const [giftWrapping, setGiftWrapping] = useState<boolean>(false);
  const [giftCardMessage, setGiftCardMessage] = useState<string>('');

  // 4. Modals State
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isFlowerMatcherOpen, setIsFlowerMatcherOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // 5. Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // 6. Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<OlfactoryFamily | 'all'>('all');
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<PerfumeSeason | 'all'>('all');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDay | 'all'>('all');
  const [selectedAccord, setSelectedAccord] = useState<string | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Unique brands list for filter
  const brandsList = useMemo(() => {
    return Array.from(new Set(perfumes.map((p) => p.brand)));
  }, [perfumes]);

  // Filtered & Sorted Perfumes
  const filteredPerfumes = useMemo(() => {
    let result = [...perfumes];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.perfumer.toLowerCase().includes(q) ||
          p.familyRu.toLowerCase().includes(q) ||
          p.notes.top.some((n) => n.name.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.name.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.name.toLowerCase().includes(q))
      );
    }

    // Family Filter
    if (selectedFamily !== 'all') {
      result = result.filter((p) => p.family === selectedFamily);
    }

    // Collection Filter
    if (activeCollection !== 'all') {
      result = result.filter((p) => p.collection === activeCollection);
    }

    // Season Filter
    if (selectedSeason !== 'all') {
      result = result.filter((p) => p.season.includes(selectedSeason));
    }

    // Time of Day
    if (selectedTimeOfDay !== 'all') {
      result = result.filter(
        (p) => p.timeOfDay === selectedTimeOfDay || p.timeOfDay === 'versatile'
      );
    }

    // Accord Filter
    if (selectedAccord !== 'all') {
      result = result.filter(
        (p) => p.accords[selectedAccord] && p.accords[selectedAccord] > 50
      );
    }

    // Brand Filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'longevity':
        result.sort((a, b) => b.performance.longevityHours - a.performance.longevityHours);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return result;
  }, [
    perfumes,
    searchQuery,
    selectedFamily,
    activeCollection,
    selectedSeason,
    selectedTimeOfDay,
    selectedAccord,
    selectedBrand,
    sortBy,
  ]);

  // Cart operations
  const handleAddToCart = (perfume: Perfume, format?: PerfumeFormat) => {
    const fmt = format || perfume.formats[0];
    const itemId = `${perfume.id}_${fmt.id}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((it) => it.id === itemId);
      if (existingIdx >= 0) {
        const copy = [...prev];
        const existing = copy[existingIdx] as CartItem;
        copy[existingIdx] = {
          ...existing,
          quantity: existing.quantity + 1,
        };
        return copy;
      } else {
        const newItem: CartItem = {
          id: itemId,
          type: 'single',
          perfume,
          format: fmt,
          quantity: 1,
        };
        return [...prev, newItem];
      }
    });

    showToast(`«${perfume.name}» (${fmt.label}) добавлен в корзину`);
  };

  const handleAddDiscoverySet = (setItem: DiscoverySetItem) => {
    setCartItems((prev) => [...prev, setItem]);
    showToast(`Discovery Set из ${setItem.vials.length} ароматов добавлен в корзину (-20%)`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as OrderItem[];
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Товар удален из корзины');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setFreeSample(undefined);
    setGiftWrapping(false);
    setGiftCardMessage('');
    showToast(`Заказ ${newOrder.id} успешно оформлен!`);
  };

  // Admin Operations
  const handleAddPerfume = (newPerfume: Perfume) => {
    setPerfumes((prev) => [newPerfume, ...prev]);
    showToast(`Аромат «${newPerfume.name}» успешно добавлен в каталог`);
  };

  const handleUpdatePerfume = (updated: Perfume) => {
    setPerfumes((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Аромат «${updated.name}» обновлен`);
  };

  const handleDeletePerfume = (id: string) => {
    setPerfumes((prev) => prev.filter((p) => p.id !== id));
    showToast('Аромат удален из каталога');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Статус заказа #${orderId} изменен на «${status}»`);
  };

  // Smooth scroll to catalog
  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#26232E] flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
        onOpenDiscoveryBuilder={() => setIsDiscoveryOpen(true)}
        onOpenFlowerMatcher={() => setIsFlowerMatcherOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearchClick={handleScrollToCatalog}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={handleScrollToCatalog}
          onOpenSommelier={() => setIsSommelierOpen(true)}
          onOpenDiscoveryBuilder={() => setIsDiscoveryOpen(true)}
          onOpenFlowerMatcher={() => setIsFlowerMatcherOpen(true)}
        />

        {/* Family Guide */}
        <FamilyGuide
          selectedFamily={selectedFamily}
          onSelectFamily={(f) => {
            setSelectedFamily(f);
            handleScrollToCatalog();
          }}
        />

        {/* Interactive Features Callout: Flower Matcher & Discovery Set */}
        <section className="py-12 border-b border-purple-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Feature Card 1: Virtual Flower Matcher */}
              <div className="relative rounded-3xl p-8 border border-rose-200/90 bg-gradient-to-br from-rose-50/80 via-purple-50/70 to-pink-50/60 flex flex-col justify-between gap-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-rose-200 text-xs uppercase tracking-wider text-rose-800 font-bold">
                    <span>💐</span>
                    <span>Flower Matcher</span>
                    <span className="text-rose-300">·</span>
                    <span className="text-[10px] lowercase text-purple-700">интерактивно</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#26232E]">
                    Виртуальный Букет любимых цветов
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E5968] leading-relaxed">
                    Выберите 2–3 цветка (Майская роза, Пион, Ландыш, Лаванда, Сирень, Жасмин и др.), и система найдет духи, где эти ноты стоят во главе пирамиды.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setIsFlowerMatcherOpen(true)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>💐</span>
                    <span>Собрать свой букет</span>
                  </button>
                </div>
              </div>

              {/* Feature Card 2: Discovery Set Builder */}
              <div className="relative rounded-3xl p-8 border border-purple-200/90 bg-gradient-to-br from-purple-50/80 via-white to-amber-50/50 flex flex-col justify-between gap-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-purple-200 text-xs uppercase tracking-wider text-purple-800 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Discovery Set</span>
                    <span className="text-purple-300">·</span>
                    <span className="text-[10px] text-purple-700 font-semibold">-20% выгода</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#26232E]">
                    Конструктор сета из 5 миниатюр
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E5968] leading-relaxed">
                    Познакомьтесь с композициями из лаванды, роз, пионов и ванили в пастельной шкатулке с возможностью золотого тиснения вашего имени.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setIsDiscoveryOpen(true)}
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-purple-50 border border-purple-300 text-purple-900 font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Открыть конструктор сета</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="py-16 sm:py-20 border-b border-purple-100 bg-[#FAF7F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Catalog Section Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-purple-700 font-sans font-bold mb-2">
                <span>Цветочная селекция</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#26232E]">
                Коллекция нежных весенних ароматов
              </h2>
            </div>

            {/* Smart Filters & Search Bar */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCollection={activeCollection}
              onSelectCollection={setActiveCollection}
              selectedSeason={selectedSeason}
              onSelectSeason={setSelectedSeason}
              selectedTimeOfDay={selectedTimeOfDay}
              onSelectTimeOfDay={setSelectedTimeOfDay}
              selectedAccord={selectedAccord}
              onSelectAccord={setSelectedAccord}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              sortBy={sortBy}
              onSortChange={setSortBy}
              brands={brandsList}
              totalCount={filteredPerfumes.length}
            />

            {/* Products Grid */}
            {filteredPerfumes.length === 0 ? (
              <div className="py-24 text-center space-y-4 rounded-3xl bg-white border border-purple-100 shadow-sm">
                <p className="text-[#6E6A7A] text-sm">
                  По вашему запросу ароматов не найдено.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFamily('all');
                    setActiveCollection('all');
                    setSelectedSeason('all');
                    setSelectedTimeOfDay('all');
                    setSelectedAccord('all');
                    setSelectedBrand('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-semibold cursor-pointer"
                >
                  Сбросить все параметры поиска
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard
                    key={perfume.id}
                    perfume={perfume}
                    onSelect={(p) => setSelectedPerfume(p)}
                    onAddToCart={(p, fmt) => handleAddToCart(p, fmt)}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Philosophy & Craftsmanship Section */}
        <CraftsmanshipSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
        onOpenDiscoveryBuilder={() => setIsDiscoveryOpen(true)}
        onOpenFlowerMatcher={() => setIsFlowerMatcherOpen(true)}
      />

      {/* Modals & Slide-overs */}
      {isFlowerMatcherOpen && (
        <FlowerMatcherModal
          perfumes={perfumes}
          onClose={() => setIsFlowerMatcherOpen(false)}
          onSelectPerfume={(p) => setSelectedPerfume(p)}
          onAddToCart={(p, fmt) => handleAddToCart(p, fmt)}
        />
      )}

      <ProductModal
        perfume={selectedPerfume}
        allPerfumes={perfumes}
        onClose={() => setSelectedPerfume(null)}
        onAddToCart={(p, fmt) => handleAddToCart(p, fmt)}
        onSelectSimilar={(p) => setSelectedPerfume(p)}
      />

      {isDiscoveryOpen && (
        <DiscoverySetBuilder
          isOpen={isDiscoveryOpen}
          perfumes={perfumes}
          onAddSetToCart={handleAddDiscoverySet}
          onClose={() => setIsDiscoveryOpen(false)}
        />
      )}

      {isSommelierOpen && (
        <SommelierQuizModal
          perfumes={perfumes}
          onClose={() => setIsSommelierOpen(false)}
          onSelectPerfume={(p) => setSelectedPerfume(p)}
          onAddToCart={(p) => handleAddToCart(p)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        freeSample={freeSample}
        onSelectFreeSample={setFreeSample}
        giftWrapping={giftWrapping}
        onToggleGiftWrapping={setGiftWrapping}
        giftCardMessage={giftCardMessage}
        onGiftCardMessageChange={setGiftCardMessage}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          items={cartItems}
          freeSample={freeSample}
          giftWrapping={giftWrapping}
          giftCardMessage={giftCardMessage}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        perfumes={perfumes}
        onAddPerfume={handleAddPerfume}
        onUpdatePerfume={handleUpdatePerfume}
        onDeletePerfume={handleDeletePerfume}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white border border-purple-200 shadow-xl text-[#26232E] text-xs font-sans flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
