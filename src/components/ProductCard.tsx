import React, { useState } from 'react';
import { Perfume, PerfumeFormat } from '../types/perfume';
import { Sparkles, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  perfume: Perfume;
  onSelect: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume, format: PerfumeFormat) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  perfume,
  onSelect,
  onAddToCart,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<PerfumeFormat>(
    perfume.formats[0] || {
      id: 'bottle_50ml',
      label: 'Флакон 50 мл',
      ml: 50,
      price: perfume.price,
      inStock: 10,
    }
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(perfume, selectedFormat);
  };

  return (
    <div
      onClick={() => onSelect(perfume)}
      className="group relative flex flex-col rounded-3xl bg-white border border-purple-100/90 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden cursor-pointer"
    >
      {/* Visual Image Showcase (65-70% height) */}
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-[#FAF7F5]">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Ambient gentle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-60" />

        {/* Top Badges / Metadata */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-sans tracking-widest uppercase text-purple-800 font-semibold bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-100 shadow-sm">
            {perfume.concentration}
          </span>

          <div className="flex items-center gap-1 text-[11px] font-sans text-amber-500 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-purple-100 shadow-sm tabular-nums">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-[#26232E]">{perfume.rating}</span>
          </div>
        </div>

        {/* Quick view hover icon button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-900/10 backdrop-blur-[2px]">
          <span className="px-4 py-2 rounded-xl bg-white/95 text-purple-900 text-xs font-semibold border border-purple-200 shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-purple-600" />
            <span>Пирамида нот</span>
          </span>
        </div>
      </div>

      {/* Card Content & Interaction */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Brand & Olfactory Family */}
          <div className="flex items-center justify-between text-xs font-sans mb-1">
            <span className="uppercase tracking-widest text-[11px] text-purple-700/80 font-semibold">
              {perfume.brand}
            </span>
            <span className="text-[#8E8A99] text-[11px]">
              {perfume.familyRu}
            </span>
          </div>

          {/* Fragrance Name */}
          <h3 className="text-xl font-serif font-bold text-[#26232E] group-hover:text-purple-700 transition-colors">
            {perfume.name}
          </h3>

          {/* Key accords summary line */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#5E5968]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">
              {perfume.notes.top[0]?.name} · {perfume.notes.heart[0]?.name} · {perfume.notes.base[0]?.name}
            </span>
          </div>

          {/* Performance: Longevity and Sillage tags */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-purple-100 text-[11px] text-[#6E6A7A] font-sans">
            <div>
              Стойкость: <span className="text-[#26232E] font-semibold">{perfume.performance.longevityHours}ч+</span>
            </div>
            <span className="text-purple-200">·</span>
            <div>
              Шлейф: <span className="text-[#26232E] font-semibold">{perfume.performance.sillageScore}/10</span>
            </div>
          </div>
        </div>

        {/* Volume / Format Switcher */}
        <div>
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar">
            {perfume.formats.slice(0, 4).map((fmt) => (
              <button
                key={fmt.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFormat(fmt);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedFormat.id === fmt.id
                    ? 'bg-purple-100 text-purple-900 border border-purple-300 font-semibold shadow-xs'
                    : 'bg-zinc-50 text-[#6E6A7A] hover:text-[#26232E] border border-zinc-200'
                }`}
              >
                {fmt.ml} мл
              </button>
            ))}
          </div>

          {/* Price Baseline and Buy Action */}
          <div className="flex items-center justify-between pt-3 border-t border-purple-100">
            <div>
              <p className="text-[10px] text-[#8E8A99] uppercase tracking-wider font-sans">
                {selectedFormat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-serif font-bold text-[#26232E] tabular-nums">
                  {selectedFormat.price.toLocaleString('ru-RU')} ₽
                </span>
                {perfume.originalPrice && selectedFormat.ml >= 50 && (
                  <span className="text-xs text-zinc-400 line-through tabular-nums">
                    {perfume.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>
            </div>

            {/* Buy button in gentle rose-purple gradient */}
            <button
              onClick={handleQuickAdd}
              aria-label={`Купить ${perfume.name}`}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 active:scale-95 text-white text-xs font-semibold shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>В корзину</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
