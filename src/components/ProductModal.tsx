import React, { useState } from 'react';
import { Perfume, PerfumeFormat } from '../types/perfume';
import { OlfactoryPyramid } from './OlfactoryPyramid';
import { RadarChart } from './RadarChart';
import { X, Star, ShoppingBag, ShieldCheck, Clock, Wind, Sparkles, Check } from 'lucide-react';

interface ProductModalProps {
  perfume: Perfume | null;
  allPerfumes: Perfume[];
  onClose: () => void;
  onAddToCart: (perfume: Perfume, format: PerfumeFormat) => void;
  onSelectSimilar: (perfume: Perfume) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  perfume,
  allPerfumes,
  onClose,
  onAddToCart,
  onSelectSimilar,
}) => {
  if (!perfume) return null;

  const [selectedFormat, setSelectedFormat] = useState<PerfumeFormat>(
    perfume.formats[0] || {
      id: 'bottle_50ml',
      label: 'Флакон 50 мл',
      ml: 50,
      price: perfume.price,
      inStock: 10,
    }
  );
  const [activeTab, setActiveTab] = useState<'pyramid' | 'radar' | 'mood'>('pyramid');
  const [isAdded, setIsAdded] = useState(false);

  // Similar perfumes
  const similarPerfumes = allPerfumes.filter((p) =>
    perfume.similarPerfumeIds?.includes(p.id)
  );

  const handleAdd = () => {
    onAddToCart(perfume, selectedFormat);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-white border border-purple-200 shadow-2xl overflow-hidden my-6 text-[#26232E] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 border border-purple-200 text-[#6E6A7A] hover:text-[#26232E] hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 lg:p-10 space-y-10">
          
          {/* Top Section: Split Gallery & Main Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAF7F5] border border-purple-200/80 relative group shadow-md shadow-purple-500/5">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-purple-100 text-purple-800 font-sans tracking-wider uppercase font-semibold shadow-xs">
                    {perfume.concentration}
                  </span>
                  <span className="text-[#6E6A7A] font-sans font-medium">
                    Выпуск: {perfume.year} г.
                  </span>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs text-[#5E5968]">
                <div className="flex items-center gap-2 text-[#26232E]">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>100% Оригинальные масла из Грасса и Прованса</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Бесплатный сэмпл-пробник на выбор к каждому заказу</span>
                </div>
              </div>
            </div>

            {/* Product Details & Purchase Module (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="uppercase tracking-[0.2em] text-purple-700 font-bold">
                    {perfume.brand}
                  </span>
                  <span className="text-[#7A7485]">
                    Парфюмер: <strong className="text-[#26232E] font-semibold">{perfume.perfumer}</strong>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#26232E] leading-tight">
                  {perfume.name}
                </h1>

                {/* Rating & Family */}
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#6E6A7A] font-sans">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[#26232E] tabular-nums">{perfume.rating}</span>
                    <span className="text-[#8E8A99]">({perfume.reviewsCount} отзывов)</span>
                  </div>
                  <span className="text-purple-200">·</span>
                  <span>Семейство: <strong className="text-[#26232E]">{perfume.familyRu}</strong></span>
                  <span className="text-purple-200">·</span>
                  <span>Гендер: <strong className="text-[#26232E]">{perfume.gender}</strong></span>
                </div>
              </div>

              {/* Poetic description */}
              <p className="text-sm text-[#4E4A56] leading-relaxed font-sans">
                {perfume.description}
              </p>

              {/* Performance Gauges (Longevity & Sillage) */}
              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-4">
                <div className="text-xs uppercase tracking-wider text-purple-900 font-sans font-bold">
                  Характеристики раскрытия и шлейфа
                </div>

                {/* Longevity Gauge */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#26232E]">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-medium">Стойкость на коже</span>
                    </div>
                    <span className="font-serif font-bold text-purple-700 tabular-nums">
                      {perfume.performance.longevityHours} часов+ ({perfume.performance.longevityScore}/10)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-purple-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-rose-400"
                      style={{ width: `${(perfume.performance.longevityScore / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Sillage Gauge */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#26232E]">
                      <Wind className="w-3.5 h-3.5 text-rose-500" />
                      <span className="font-medium">Шлейфовость (Sillage)</span>
                    </div>
                    <span className="font-serif font-bold text-rose-600 tabular-nums">
                      {perfume.performance.sillageScore}/10
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-rose-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-400"
                      style={{ width: `${(perfume.performance.sillageScore / 10) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#6E6A7A] italic">
                    «{perfume.performance.sillageDescription}»
                  </p>
                </div>
              </div>

              {/* Volume & Form-Factor Selector */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider text-[#26232E] font-sans font-bold">
                  Выберите объем и формат:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {perfume.formats.map((fmt) => {
                    const isSelected = selectedFormat.id === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-100/80 border-purple-400 shadow-sm'
                            : 'bg-zinc-50/80 border-zinc-200 hover:border-purple-200 hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#26232E]">
                          {fmt.label}
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-sm font-serif font-bold text-purple-900 tabular-nums">
                            {fmt.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <span className="text-[10px] text-[#8E8A99]">
                            {fmt.inStock > 0 ? `В наличии: ${fmt.inStock}` : 'Под заказ'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Purchase module */}
              <div className="pt-4 border-t border-purple-100 flex items-center gap-4">
                <div>
                  <p className="text-xs text-[#7A7485] font-sans">К оплате:</p>
                  <p className="text-2xl font-serif font-bold text-[#26232E] tabular-nums">
                    {selectedFormat.price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-purple-600 via-purple-500 to-rose-500 hover:opacity-95 text-white shadow-purple-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Добавлено в корзину!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Добавить {selectedFormat.label}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Middle Section: Tabs for Olfactory Pyramid, Radar Chart, and Mood Cards */}
          <div className="space-y-6 pt-6 border-t border-purple-100">
            {/* Tab navigation */}
            <div className="flex items-center gap-2 border-b border-purple-100 pb-2">
              <button
                onClick={() => setActiveTab('pyramid')}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase font-sans transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                  activeTab === 'pyramid'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-[#7A7485] hover:text-[#26232E]'
                }`}
              >
                Пирамида аромата
              </button>
              <button
                onClick={() => setActiveTab('radar')}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase font-sans transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                  activeTab === 'radar'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-[#7A7485] hover:text-[#26232E]'
                }`}
              >
                Карта аккордов (Fragrance Map)
              </button>
              <button
                onClick={() => setActiveTab('mood')}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase font-sans transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                  activeTab === 'mood'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-[#7A7485] hover:text-[#26232E]'
                }`}
              >
                Настроение и стиль
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'pyramid' && (
              <div className="space-y-4">
                <p className="text-xs text-[#5E5968] max-w-xl font-sans">
                  Ольфакторная пирамида демонстрирует эволюцию звучания нот от первой росы распыления до глубокого кашемирового шлейфа.
                </p>
                <OlfactoryPyramid notes={perfume.notes} />
              </div>
            )}

            {activeTab === 'radar' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-purple-50/40 p-6 rounded-3xl border border-purple-100">
                <div className="md:col-span-6 flex justify-center py-4">
                  <RadarChart accords={perfume.accords} size={280} />
                </div>
                <div className="md:col-span-6 space-y-4">
                  <h4 className="text-lg font-serif font-bold text-[#26232E]">
                    Гармония аккордов в формуле
                  </h4>
                  <p className="text-xs text-[#5E5968] leading-relaxed font-sans">
                    Паутинка отображает соотношение лавандовых, цветочных, пудровых и сливочных аккордов.
                  </p>
                  <div className="space-y-2">
                    {Object.entries(perfume.accords).map(([chord, value]) => (
                      <div key={chord} className="space-y-1">
                        <div className="flex justify-between text-xs text-[#4E4A56] font-medium">
                          <span>{chord}</span>
                          <span className="tabular-nums font-mono text-purple-700">{value}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-purple-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-rose-400 rounded-full"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mood' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
                    Когда носить
                  </div>
                  <p className="text-sm text-[#4E4A56] leading-relaxed font-sans">
                    {perfume.mood.whenToWear}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-800 font-sans">
                    Какое производит впечатление
                  </div>
                  <p className="text-sm text-[#4E4A56] leading-relaxed font-sans">
                    {perfume.mood.impression}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans">
                    С каким стилем одежды
                  </div>
                  <p className="text-sm text-[#4E4A56] leading-relaxed font-sans">
                    {perfume.mood.style}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Section: "Похожие по звучанию" */}
          {similarPerfumes.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-purple-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#26232E]">
                  Похожие по нежности ароматы
                </h3>
                <span className="text-xs text-[#7A7485] font-sans">
                  Схожий ботанический профиль
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similarPerfumes.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar(sim)}
                    className="p-3 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-all flex items-center gap-3 cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <img
                      src={sim.image}
                      alt={sim.name}
                      className="w-16 h-16 rounded-xl object-cover bg-purple-50 shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-[#8E8A99] uppercase tracking-wider truncate">
                        {sim.brand}
                      </p>
                      <h4 className="text-sm font-serif font-bold text-[#26232E] group-hover:text-purple-700 transition-colors truncate">
                        {sim.name}
                      </h4>
                      <p className="text-xs font-serif font-bold text-rose-600 tabular-nums mt-0.5">
                        от {sim.formats[0]?.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
