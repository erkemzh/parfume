import React, { useState } from 'react';
import { Perfume, PerfumeFormat, OlfactoryFamily, Order } from '../types/perfume';
import { INGREDIENT_DIRECTORY, BRANDS_DIRECTORY } from '../data/perfumeNotes';
import {
  Shield,
  Plus,
  Trash2,
  Edit3,
  X,
  Package,
  BarChart3,
  BookOpen,
  ShoppingBag,
  AlertCircle,
  LogOut,
  Save,
  Droplet,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  perfumes: Perfume[];
  onAddPerfume: (perfume: Perfume) => void;
  onUpdatePerfume: (perfume: Perfume) => void;
  onDeletePerfume: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  perfumes,
  onAddPerfume,
  onUpdatePerfume,
  onDeletePerfume,
  orders,
  onUpdateOrderStatus,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('aura_admin_auth') === 'true';
  });
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'stock' | 'notes' | 'analytics' | 'orders'>('products');

  // Product Form (Create / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('AURA FLORALE Paris');
  const [perfumer, setPerfumer] = useState('');
  const [family, setFamily] = useState<OlfactoryFamily>('fresh');
  const [collection, setCollection] = useState<'bestsellers' | 'season' | 'niche' | 'samples'>('bestsellers');
  const [price, setPrice] = useState<number>(16800);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(19500);
  const [image, setImage] = useState('');
  const [concentration, setConcentration] = useState<'Extrait de Parfum' | 'Eau de Parfum' | 'Parfum'>('Eau de Parfum');
  const [gender, setGender] = useState<'Унисекс' | 'Для неё' | 'Для него'>('Для неё');
  const [year, setYear] = useState<number>(2024);
  const [description, setDescription] = useState('');

  // Performance
  const [longevityHours, setLongevityHours] = useState<number>(12);
  const [longevityScore, setLongevityScore] = useState<number>(9.2);
  const [sillageScore, setSillageScore] = useState<number>(8.8);
  const [sillageDesc, setSillageDesc] = useState('Нежный шелковистый шлейф лаванды и белого ириса');

  // Notes
  const [topNoteNames, setTopNoteNames] = useState<string[]>(['Прованская горная лаванда', 'Калабрийский бергамот']);
  const [heartNoteNames, setHeartNoteNames] = useState<string[]>(['Белый пион', 'Королевский ирис']);
  const [baseNoteNames, setBaseNoteNames] = useState<string[]>(['Шелковый белый мускус', 'Майсурский сандал']);

  // Accords (Scores 0-100)
  const [lavenderChord, setLavenderChord] = useState<number>(95);
  const [floralChord, setFloralChord] = useState<number>(90);
  const [powderChord, setPowderChord] = useState<number>(85);
  const [freshChord, setFreshChord] = useState<number>(80);
  const [muskChord, setMuskChord] = useState<number>(75);
  const [creamyChord, setCreamyChord] = useState<number>(50);

  // Mood
  const [whenToWear, setWhenToWear] = useState('Весенние дни, свидания, легкий шелк');
  const [impression, setImpression] = useState('Исключительная нежность, чистота и шарм');
  const [styleMatch, setStyleMatch] = useState('Светло-лавандовый или бежевый кашемир');

  // Stock
  const [totalBulkMl, setTotalBulkMl] = useState<number>(500);

  // Helper auto-fill for convenience
  const handleAutoFill = () => {
    setLoginInput('Areyoujoking');
    setPasswordInput('Erkemmm01');
    setAuthError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput.trim() === 'Areyoujoking' && passwordInput.trim() === 'Erkemmm01') {
      setIsAuthenticated(true);
      sessionStorage.setItem('aura_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Неверный логин или пароль. Попробуйте снова.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aura_admin_auth');
  };

  const openCreateForm = () => {
    setEditingId(null);
    setName('');
    setBrand('AURA FLORALE Paris');
    setPerfumer('Anne Flipo');
    setFamily('fresh');
    setCollection('bestsellers');
    setPrice(16500);
    setOriginalPrice(19000);
    setImage('/src/assets/images/perfume_lavande_celeste_1793627467405.jpg');
    setConcentration('Eau de Parfum');
    setGender('Для неё');
    setYear(2024);
    setDescription('Авторский цветочный экстракт ручной работы с органическими маслами Грасса.');
    setLongevityHours(12);
    setLongevityScore(9.2);
    setSillageScore(8.8);
    setSillageDesc('Нежный шелковистый шлейф лаванды и белого ириса');
    setTopNoteNames(['Прованская горная лаванда', 'Калабрийский бергамот']);
    setHeartNoteNames(['Белый пион', 'Королевский ирис']);
    setBaseNoteNames(['Шелковый белый мускус', 'Майсурский сандал']);
    setLavenderChord(95);
    setFloralChord(90);
    setPowderChord(85);
    setFreshChord(80);
    setMuskChord(75);
    setCreamyChord(50);
    setWhenToWear('Весенние дни, романтические прогулки, шелковые платья');
    setImpression('Утонченная грация, нежность и спокойствие');
    setStyleMatch('Лавандовый кашемир, светлые оттенки, жемчуг');
    setTotalBulkMl(500);
    setIsFormOpen(true);
  };

  const openEditForm = (p: Perfume) => {
    setEditingId(p.id);
    setName(p.name);
    setBrand(p.brand);
    setPerfumer(p.perfumer);
    setFamily(p.family);
    setCollection(p.collection);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setImage(p.image);
    setConcentration(p.concentration);
    setGender(p.gender);
    setYear(p.year);
    setDescription(p.description);
    setLongevityHours(p.performance.longevityHours);
    setLongevityScore(p.performance.longevityScore);
    setSillageScore(p.performance.sillageScore);
    setSillageDesc(p.performance.sillageDescription);
    setTopNoteNames(p.notes.top.map((n) => n.name));
    setHeartNoteNames(p.notes.heart.map((n) => n.name));
    setBaseNoteNames(p.notes.base.map((n) => n.name));
    setLavenderChord(p.accords['Лавандовый'] || 50);
    setFloralChord(p.accords['Цветочный'] || 50);
    setPowderChord(p.accords['Пудровый'] || 50);
    setFreshChord(p.accords['Свежий'] || 50);
    setMuskChord(p.accords['Мускусный'] || 50);
    setCreamyChord(p.accords['Сливочный'] || 50);
    setWhenToWear(p.mood.whenToWear);
    setImpression(p.mood.impression);
    setStyleMatch(p.mood.style);
    setTotalBulkMl(p.totalBulkMlStock);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const mapNotes = (names: string[]) => {
      return names.map((n) => {
        const found = INGREDIENT_DIRECTORY.find((dir) => dir.name.toLowerCase() === n.toLowerCase());
        return found || { name: n, category: 'floral' as const, icon: '🌸' };
      });
    };

    const familyRuMap: Record<OlfactoryFamily, string> = {
      floral: 'Цветочные & Розовые',
      fresh: 'Лавандовые & Чистые',
      gourmand: 'Пудровые & Ванильные',
      oriental: 'Бежево-Амбровые',
      woody: 'Сандал & Белый Кедр',
    };

    const newFormats: PerfumeFormat[] = [
      { id: 'sample_2ml', label: 'Отливант 2 мл (спрей)', ml: 2, price: Math.round(price * 0.05), inStock: 50 },
      { id: 'sample_5ml', label: 'Отливант 5 мл (спрей)', ml: 5, price: Math.round(price * 0.11), inStock: 35 },
      { id: 'bottle_50ml', label: 'Фирменный флакон 50 мл', ml: 50, price: price, inStock: 12 },
      { id: 'bottle_100ml', label: 'Гран-флакон 100 мл', ml: 100, price: Math.round(price * 1.55), inStock: 8 },
    ];

    const perfumeObj: Perfume = {
      id: editingId || `custom-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      perfumer: perfumer.trim() || 'Maitre Parfumeur',
      family,
      familyRu: familyRuMap[family],
      collection,
      price,
      originalPrice,
      rating: 4.95,
      reviewsCount: 32,
      image: image.trim() || '/src/assets/images/perfume_lavande_celeste_1793627467405.jpg',
      concentration,
      gender,
      year,
      description: description.trim(),
      notes: {
        top: mapNotes(topNoteNames),
        heart: mapNotes(heartNoteNames),
        base: mapNotes(baseNoteNames),
      },
      accords: {
        'Лавандовый': lavenderChord,
        'Цветочный': floralChord,
        'Пудровый': powderChord,
        'Свежий': freshChord,
        'Мускусный': muskChord,
        'Сливочный': creamyChord,
      },
      performance: {
        longevityHours,
        longevityScore,
        sillageScore,
        sillageDescription: sillageDesc.trim(),
      },
      season: ['spring', 'summer', 'autumn'],
      timeOfDay: 'versatile',
      mood: {
        whenToWear: whenToWear.trim(),
        impression: impression.trim(),
        style: styleMatch.trim(),
      },
      formats: newFormats,
      similarPerfumeIds: perfumes.slice(0, 2).map((p) => p.id),
      totalBulkMlStock: totalBulkMl,
      createdAt: new Date().toISOString(),
    };

    if (editingId) {
      onUpdatePerfume(perfumeObj);
    } else {
      onAddPerfume(perfumeObj);
    }

    setIsFormOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl rounded-3xl bg-white border border-purple-200 shadow-2xl overflow-hidden text-[#26232E] flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-rose-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white border border-purple-200 text-purple-700 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#26232E] flex items-center gap-2">
                <span>Панель управления бутика</span>
                <span className="text-[10px] uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md font-sans font-bold">
                  Администратор
                </span>
              </h2>
              <p className="text-xs text-[#6E6A7A] font-sans">
                Управление нежными цветочными формулами, остатками масел в мл и заказами
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-[#6E6A7A] hover:text-[#26232E] px-3 py-1.5 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-purple-600" />
                <span>Выйти</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-6 bg-[#FAF7F5]">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center mx-auto shadow-sm">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#26232E]">
                  Вход для администратора
                </h3>
                <p className="text-xs text-[#6E6A7A] font-sans">
                  Введите учетные данные для управления каталогом
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-3xl border border-purple-100 shadow-md">
                <div>
                  <label className="block text-xs font-semibold text-[#4E4A56] mb-1 font-sans">
                    Логин (Login):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Логин"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-purple-400 text-sm text-[#26232E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4E4A56] mb-1 font-sans">
                    Пароль (Password):
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Пароль"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-purple-400 text-sm text-[#26232E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white font-bold text-sm transition-all shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  Войти в панель управления
                </button>
              </form>

              {/* Convenience Auto-fill Card */}
              <div className="p-4 rounded-2xl bg-white border border-purple-100 text-xs text-[#6E6A7A] space-y-2 text-center shadow-xs">
                <p>Ваши учетные данные доступа:</p>
                <div className="font-mono text-[#26232E]">
                  Логин: <strong className="text-purple-700">Areyoujoking</strong> · Пароль: <strong className="text-purple-700">Erkemmm01</strong>
                </div>
                <button
                  onClick={handleAutoFill}
                  className="text-purple-700 hover:text-purple-900 underline font-semibold cursor-pointer"
                >
                  Вставить данные в форму в один клик
                </button>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Workspace */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveTab('products'); setIsFormOpen(false); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'products'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E] bg-white border border-transparent'
                    }`}
                  >
                    <Package className="w-4 h-4 text-purple-600" />
                    <span>Товары ({perfumes.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('stock'); setIsFormOpen(false); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'stock'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E] bg-white border border-transparent'
                    }`}
                  >
                    <Droplet className="w-4 h-4 text-purple-600" />
                    <span>Учет распива (мл)</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('orders'); setIsFormOpen(false); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'orders'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E] bg-white border border-transparent'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                    <span>Заказы ({orders.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('notes'); setIsFormOpen(false); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'notes'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E] bg-white border border-transparent'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span>Справочник цветов</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('analytics'); setIsFormOpen(false); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'analytics'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E] bg-white border border-transparent'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    <span>Аналитика</span>
                  </button>
                </div>

                {activeTab === 'products' && (
                  <button
                    onClick={openCreateForm}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить цветочный аромат</span>
                  </button>
                )}
              </div>

              {/* TAB 1: PRODUCTS LIST OR FORM */}
              {activeTab === 'products' && (
                <div>
                  {isFormOpen ? (
                    <form onSubmit={handleSaveProduct} className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md space-y-6">
                      <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                        <h3 className="text-lg font-serif font-bold text-[#26232E]">
                          {editingId ? 'Редактирование аромата' : 'Добавление нового парфюма'}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="text-xs text-[#6E6A7A] hover:text-[#26232E]"
                        >
                          Отмена
                        </button>
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Название аромата *</label>
                          <input
                            type="text"
                            required
                            placeholder="Например: Lavande & Pivoine"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Парфюмерный дом *</label>
                          <input
                            type="text"
                            required
                            placeholder="AURA FLORALE Paris"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Парфюмер (Нос) *</label>
                          <input
                            type="text"
                            required
                            placeholder="Anne Flipo"
                            value={perfumer}
                            onChange={(e) => setPerfumer(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>

                      {/* Pricing & Classification */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Базовая цена (50 мл, ₽) *</label>
                          <input
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Старая цена</label>
                          <input
                            type="number"
                            value={originalPrice || ''}
                            onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Семейство *</label>
                          <select
                            value={family}
                            onChange={(e) => setFamily(e.target.value as OlfactoryFamily)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          >
                            <option value="floral">Цветочные & Розовые</option>
                            <option value="fresh">Лавандовые & Чистые</option>
                            <option value="gourmand">Пудровые & Ванильные</option>
                            <option value="oriental">Бежево-Амбровые</option>
                            <option value="woody">Сандал & Белый Кедр</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Коллекция</label>
                          <select
                            value={collection}
                            onChange={(e) => setCollection(e.target.value as any)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          >
                            <option value="bestsellers">Бестселлеры</option>
                            <option value="season">Ароматы сезона</option>
                            <option value="niche">Нишевые эксклюзивы</option>
                            <option value="samples">Отливанты & Сэмплы</option>
                          </select>
                        </div>
                      </div>

                      {/* Image & Concentration */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Ссылка на фото флакона (URL)</label>
                          <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="/src/assets/images/perfume_lavande_celeste_...jpg"
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4E4A56] mb-1">Концентрация</label>
                          <select
                            value={concentration}
                            onChange={(e) => setConcentration(e.target.value as any)}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                          >
                            <option value="Extrait de Parfum">Extrait de Parfum (35%+)</option>
                            <option value="Eau de Parfum">Eau de Parfum (20-25%)</option>
                            <option value="Parfum">Parfum</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-medium text-[#4E4A56] mb-1">Поэтичное описание аромата</label>
                        <textarea
                          rows={2}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      {/* Notes */}
                      <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-4">
                        <h4 className="text-xs uppercase tracking-wider text-purple-900 font-sans font-bold">
                          Пирамида нот (через запятую)
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-purple-800 font-medium mb-1">Верхние ноты:</label>
                            <input
                              type="text"
                              value={topNoteNames.join(', ')}
                              onChange={(e) => setTopNoteNames(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                              className="w-full p-2 rounded-xl bg-white border border-purple-200 text-xs text-[#26232E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-rose-800 font-medium mb-1">Ноты сердца:</label>
                            <input
                              type="text"
                              value={heartNoteNames.join(', ')}
                              onChange={(e) => setHeartNoteNames(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                              className="w-full p-2 rounded-xl bg-white border border-purple-200 text-xs text-[#26232E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-amber-800 font-medium mb-1">Базовые ноты:</label>
                            <input
                              type="text"
                              value={baseNoteNames.join(', ')}
                              onChange={(e) => setBaseNoteNames(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                              className="w-full p-2 rounded-xl bg-white border border-purple-200 text-xs text-[#26232E]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs text-[#4E4A56] mb-1">Стойкость (часов)</label>
                          <input
                            type="number"
                            value={longevityHours}
                            onChange={(e) => setLongevityHours(Number(e.target.value))}
                            className="w-full p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#4E4A56] mb-1">Оценка стойкости (1-10)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={longevityScore}
                            onChange={(e) => setLongevityScore(Number(e.target.value))}
                            className="w-full p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#4E4A56] mb-1">Оценка шлейфа (1-10)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={sillageScore}
                            onChange={(e) => setSillageScore(Number(e.target.value))}
                            className="w-full p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#4E4A56] mb-1">Остаток масел (мл)</label>
                          <input
                            type="number"
                            value={totalBulkMl}
                            onChange={(e) => setTotalBulkMl(Number(e.target.value))}
                            className="w-full p-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-[#26232E]"
                          />
                        </div>
                      </div>

                      {/* Submit Actions */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs text-[#6E6A7A] hover:bg-zinc-50"
                        >
                          Отмена
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>Сохранить в каталог</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Products Table */
                    <div className="overflow-x-auto rounded-3xl border border-purple-100 bg-white shadow-sm">
                      <table className="w-full text-left text-xs text-[#26232E]">
                        <thead className="bg-purple-50/70 text-[#6E6A7A] uppercase tracking-wider text-[11px] font-sans">
                          <tr>
                            <th className="p-4">Флакон</th>
                            <th className="p-4">Название & Дом</th>
                            <th className="p-4">Семейство</th>
                            <th className="p-4">Цена 50ml</th>
                            <th className="p-4">Стойкость</th>
                            <th className="p-4">Остаток распива</th>
                            <th className="p-4 text-right">Действия</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-100">
                          {perfumes.map((p) => (
                            <tr key={p.id} className="hover:bg-purple-50/40 transition-colors">
                              <td className="p-4">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-12 h-12 rounded-xl object-cover bg-purple-50 shadow-xs"
                                  referrerPolicy="no-referrer"
                                />
                              </td>
                              <td className="p-4">
                                <div className="font-serif font-bold text-sm text-[#26232E]">
                                  {p.name}
                                </div>
                                <div className="text-[11px] text-[#7A7485]">
                                  {p.brand} · {p.perfumer}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-purple-700 font-semibold">{p.familyRu}</span>
                              </td>
                              <td className="p-4 font-serif font-bold text-[#26232E] tabular-nums">
                                {p.price.toLocaleString('ru-RU')} ₽
                              </td>
                              <td className="p-4">
                                <span className="text-[#26232E] tabular-nums font-mono font-medium">
                                  {p.performance.longevityHours} ч ({p.performance.longevityScore}/10)
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="font-mono text-rose-600 font-bold tabular-nums">
                                  {p.totalBulkMlStock} мл
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditForm(p)}
                                    title="Редактировать"
                                    className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => onDeletePerfume(p.id)}
                                    title="Удалить"
                                    className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
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
                  )}
                </div>
              )}

              {/* TAB 2: STOCK */}
              {activeTab === 'stock' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-center justify-between shadow-xs">
                    <div>
                      <h4 className="text-sm font-bold text-[#26232E]">
                        Учет миллилитров цветочных масел для распива (Отливантов)
                      </h4>
                      <p className="text-xs text-[#6E6A7A]">
                        Контроль остатков для атомайзеров 2 мл и 5 мл
                      </p>
                    </div>
                    <div className="text-xs text-purple-700 font-bold font-mono">
                      Суммарно: {perfumes.reduce((sum, p) => sum + p.totalBulkMlStock, 0)} мл
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {perfumes.map((p) => (
                      <div
                        key={p.id}
                        className="p-5 rounded-3xl bg-white border border-purple-100 space-y-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover bg-purple-50"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h5 className="text-sm font-serif font-bold text-[#26232E]">{p.name}</h5>
                            <p className="text-[11px] text-[#7A7485]">{p.brand}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-[#6E6A7A]">Остаток масел:</span>
                            <span className="font-mono text-purple-700 font-bold">{p.totalBulkMlStock} мл</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-purple-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-rose-400 rounded-full"
                              style={{ width: `${Math.min(100, (p.totalBulkMlStock / 500) * 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-[11px] text-[#6E6A7A]">
                          <span>Флаконов 50ml: <strong className="text-[#26232E]">{p.formats[2]?.inStock || 10} шт.</strong></span>
                          <span>Отливантов 2ml: <strong className="text-[#26232E]">{p.formats[0]?.inStock || 40} шт.</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#8E8A99] font-sans">
                      Заказов пока не поступало.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
                            <div>
                              <span className="text-xs uppercase tracking-wider text-purple-700 font-mono font-bold">
                                Заказ #{ord.id}
                              </span>
                              <span className="text-[#7A7485] text-xs ml-3 font-sans">{ord.date}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-[#6E6A7A]">Статус:</span>
                              <select
                                value={ord.status}
                                onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                                className="px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200 text-[#26232E] font-medium focus:outline-none"
                              >
                                <option value="новый">Новый</option>
                                <option value="в обработке">В обработке</option>
                                <option value="отправлен">Отправлен</option>
                                <option value="доставлен">Доставлен</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#26232E]">
                            <div>
                              <p className="text-[#7A7485]">Клиент:</p>
                              <p className="font-bold">{ord.customerName}</p>
                              <p className="text-[#6E6A7A]">{ord.phone}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-[#7A7485]">Адрес доставки:</p>
                              <p>{ord.address}</p>
                            </div>
                          </div>

                          <div className="text-xs text-[#4E4A56] space-y-1 bg-purple-50/50 p-3 rounded-2xl border border-purple-100">
                            <p className="font-bold text-[#26232E] mb-1">Позиции:</p>
                            {ord.items.map((it: any, i) => (
                              <div key={i} className="flex justify-between">
                                <span>
                                  · {it.type === 'discovery_set' ? it.title : `${it.perfume.name} (${it.format.label})`} x{it.quantity}
                                </span>
                                <span className="font-serif font-bold text-[#26232E]">
                                  {it.type === 'discovery_set' ? (it.price * it.quantity).toLocaleString('ru-RU') : (it.format.price * it.quantity).toLocaleString('ru-RU')} ₽
                                </span>
                              </div>
                            ))}
                            {ord.freeSample && (
                              <div className="text-purple-700 pt-1 font-semibold">
                                · Подарочный сэмпл: {ord.freeSample.name}
                              </div>
                            )}
                            {ord.giftWrapping && (
                              <div className="text-rose-600 font-semibold">
                                · Подарочная шкатулка (+500 ₽)
                                {ord.giftCardMessage && ` | Текст: «${ord.giftCardMessage}»`}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#6E6A7A]">Итого:</span>
                            <span className="text-lg font-serif font-bold text-rose-600 tabular-nums">
                              {ord.total.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#26232E] font-sans">
                      Справочник цветов и ботанического сырья ({INGREDIENT_DIRECTORY.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {INGREDIENT_DIRECTORY.map((note, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-white border border-purple-100 shadow-xs flex items-center gap-3 text-xs"
                        >
                          <span className="text-xl select-none">{note.icon}</span>
                          <div>
                            <p className="font-bold text-[#26232E]">{note.name}</p>
                            <span className="text-[10px] text-purple-700 uppercase font-semibold">{note.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-purple-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#26232E] font-sans">
                      Ботанические парфюмерные дома ({BRANDS_DIRECTORY.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {BRANDS_DIRECTORY.map((brand) => (
                        <div
                          key={brand.id}
                          className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-1 text-xs"
                        >
                          <h5 className="font-serif font-bold text-sm text-[#26232E]">{brand.name}</h5>
                          <p className="text-[#6E6A7A]">{brand.country} · {brand.founded}</p>
                          <p className="text-[11px] text-purple-700 italic">{brand.specialty}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
                      <p className="text-xs text-[#7A7485] uppercase font-semibold">Всего ароматов</p>
                      <p className="text-3xl font-serif font-bold text-[#26232E] mt-1 tabular-nums">{perfumes.length}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
                      <p className="text-xs text-[#7A7485] uppercase font-semibold">Остаток масел (мл)</p>
                      <p className="text-3xl font-serif font-bold text-purple-700 mt-1 tabular-nums">
                        {perfumes.reduce((s, p) => s + p.totalBulkMlStock, 0)} мл
                      </p>
                    </div>
                    <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
                      <p className="text-xs text-[#7A7485] uppercase font-semibold">Всего заказов</p>
                      <p className="text-3xl font-serif font-bold text-[#26232E] mt-1 tabular-nums">{orders.length}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
                      <p className="text-xs text-[#7A7485] uppercase font-semibold">Выручка бутика</p>
                      <p className="text-3xl font-serif font-bold text-rose-600 mt-1 tabular-nums">
                        {orders.reduce((s, o) => s + o.total, 0).toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
