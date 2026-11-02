import React, { useState } from 'react';
import { Perfume, DiscoverySetItem } from '../types/perfume';
import { Plus, Check, Trash2, Sparkles, Box, ShoppingBag, X } from 'lucide-react';

interface DiscoverySetBuilderProps {
  isOpen?: boolean;
  perfumes: Perfume[];
  onAddSetToCart: (setItem: DiscoverySetItem) => void;
  onClose: () => void;
}

export const DiscoverySetBuilder: React.FC<DiscoverySetBuilderProps> = ({
  isOpen = true,
  perfumes,
  onAddSetToCart,
  onClose,
}) => {
  const [selectedVials, setSelectedVials] = useState<Perfume[]>([]);
  const [vialMl, setVialMl] = useState<number>(2); // 2ml or 5ml
  const [engravingText, setEngravingText] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const SET_CAPACITY = 5;

  const toggleSelectPerfume = (perfume: Perfume) => {
    if (selectedVials.find((p) => p.id === perfume.id)) {
      setSelectedVials(selectedVials.filter((p) => p.id !== perfume.id));
    } else {
      if (selectedVials.length < SET_CAPACITY) {
        setSelectedVials([...selectedVials, perfume]);
      }
    }
  };

  const removeVial = (index: number) => {
    const updated = [...selectedVials];
    updated.splice(index, 1);
    setSelectedVials(updated);
  };

  // Pricing:
  const unitPrice = vialMl === 2 ? 890 : 1950;
  const rawTotal = selectedVials.length * unitPrice;
  const discountRate = selectedVials.length === SET_CAPACITY ? 0.2 : 0; // 20% off full set
  const discountAmount = Math.round(rawTotal * discountRate);
  const finalPrice = rawTotal - discountAmount;

  const handleAddToCart = () => {
    if (selectedVials.length === 0) return;

    const setItem: DiscoverySetItem = {
      id: `discovery-set-${Date.now()}`,
      type: 'discovery_set',
      title: `Индивидуальный Discovery Set (${selectedVials.length}x${vialMl} мл)`,
      vials: selectedVials.map((p) => ({ perfume: p, ml: vialMl })),
      customBoxName: engravingText.trim() || undefined,
      price: finalPrice,
      quantity: 1,
    };

    onAddSetToCart(setItem);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-white border border-purple-200 shadow-2xl overflow-hidden text-[#26232E] flex flex-col max-h-[92vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white text-purple-600 border border-purple-200 shadow-xs">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#26232E]">
                Конструктор Discovery Set
              </h2>
              <p className="text-xs text-[#6E6A7A] font-sans">
                Соберите свой персональный бокс из 5 нежных ароматов со скидкой -20%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs text-[#6E6A7A] hover:text-[#26232E] px-3.5 py-2 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 transition-colors cursor-pointer font-medium"
            >
              Закрыть
            </button>
            <button
              onClick={onClose}
              aria-label="Закрыть окно"
              className="p-2 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#6E6A7A] hover:text-[#26232E] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          
          {/* Top visual: Box Showcase + Selected Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-gradient-to-r from-purple-50/70 via-rose-50/50 to-purple-50/70 p-6 rounded-3xl border border-purple-100">
            {/* Box Image with velvet & silk aesthetics */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-purple-200 shadow-md">
              <img
                src="/src/assets/images/floral_discovery_set_box_1793627466203.jpg"
                alt="Шкатулка Discovery Set"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {engravingText && (
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-xs font-serif tracking-widest text-white bg-purple-900/80 px-3 py-1 rounded-lg border border-purple-300/40 backdrop-blur-sm">
                    «{engravingText}»
                  </span>
                </div>
              )}
            </div>

            {/* Selected 5 slots status */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-purple-800 font-sans font-bold">
                    Ваш набор: {selectedVials.length} из {SET_CAPACITY} флаконов
                  </span>
                  <p className="text-xs text-[#6E6A7A] mt-0.5">
                    Выберите формат миниатюр:
                  </p>
                </div>

                {/* 2ml or 5ml switch */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-purple-200 shadow-xs">
                  <button
                    onClick={() => setVialMl(2)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      vialMl === 2
                        ? 'bg-purple-100 text-purple-900 font-bold border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E]'
                    }`}
                  >
                    2 мл (Спрей)
                  </button>
                  <button
                    onClick={() => setVialMl(5)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      vialMl === 5
                        ? 'bg-purple-100 text-purple-900 font-bold border border-purple-300'
                        : 'text-[#6E6A7A] hover:text-[#26232E]'
                    }`}
                  >
                    5 мл (Спрей)
                  </button>
                </div>
              </div>

              {/* 5 Slots */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: SET_CAPACITY }).map((_, idx) => {
                  const vial = selectedVials[idx];
                  return (
                    <div
                      key={idx}
                      className={`relative aspect-[3/4] rounded-2xl border flex flex-col items-center justify-center p-2 text-center transition-all ${
                        vial
                          ? 'bg-white border-purple-300 shadow-sm'
                          : 'bg-white/60 border-dashed border-purple-200 text-[#8E8A99]'
                      }`}
                    >
                      {vial ? (
                        <>
                          <div className="w-6 h-10 rounded-md bg-gradient-to-b from-purple-200 to-rose-200 border border-purple-300 shadow-xs mb-1.5 flex items-center justify-center text-[9px] font-bold text-purple-950 select-none">
                            {vialMl}ml
                          </div>
                          <p className="text-[10px] font-serif font-bold text-[#26232E] line-clamp-1">
                            {vial.name}
                          </p>
                          <button
                            onClick={() => removeVial(idx)}
                            className="absolute -top-1 -right-1 p-1 rounded-full bg-white hover:bg-rose-100 text-zinc-400 hover:text-rose-600 border border-purple-200 cursor-pointer shadow-xs"
                            title="Удалить из набора"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </>
                      ) : (
                        <div className="space-y-1">
                          <Plus className="w-4 h-4 mx-auto text-purple-400" />
                          <span className="text-[10px] block font-sans font-medium text-purple-700/80">
                            Слот {idx + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Box Engraving Input */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-[#4E4A56] mb-1">
                  Персонализация шкатулки (золотое тиснение на крышке):
                </label>
                <input
                  type="text"
                  placeholder="Например: Для любимой · Весенняя коллекция"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 text-xs bg-white border border-purple-200 focus:border-purple-400 rounded-xl text-[#26232E] placeholder-[#9E9AA8] focus:outline-none shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Fragrance Selector Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#26232E] font-sans">
                Выберите 5 ароматов в ваш набор:
              </h3>
              <span className="text-xs text-[#6E6A7A]">
                Нажмите на карточку, чтобы добавить или убрать
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {perfumes.map((p) => {
                const isSelected = !!selectedVials.find((v) => v.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleSelectPerfume(p)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 border-purple-400 text-purple-950 shadow-sm'
                        : 'bg-white border-purple-100 text-[#4E4A56] hover:border-purple-200'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover bg-purple-50 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden flex-1">
                      <p className="text-[10px] text-purple-700/80 uppercase font-semibold tracking-wider truncate">
                        {p.familyRu}
                      </p>
                      <h4 className="text-xs font-serif font-bold text-[#26232E] truncate">
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-[#7A7485] truncate">
                        {p.notes.top[0]?.name}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-purple-200 flex items-center justify-center text-purple-400">
                          <Plus className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Checkout Strip */}
        <div className="px-6 py-4 border-t border-purple-100 bg-purple-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-sans">
            <div>
              <span className="text-[#6E6A7A] block">Выбрано:</span>
              <span className="font-bold text-[#26232E]">
                {selectedVials.length} из {SET_CAPACITY} флаконов
              </span>
            </div>

            {selectedVials.length === SET_CAPACITY && (
              <div className="px-2.5 py-1 rounded-lg bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Применена скидка набора -20%</span>
              </div>
            )}

            <div>
              <span className="text-[#6E6A7A] block">Стоимость набора:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-serif font-bold text-rose-600 tabular-nums">
                  {finalPrice.toLocaleString('ru-RU')} ₽
                </span>
                {discountAmount > 0 && (
                  <span className="text-xs text-zinc-400 line-through tabular-nums">
                    {rawTotal.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={selectedVials.length === 0}
            className={`py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
              selectedVials.length === 0
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white shadow-md shadow-purple-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Набор добавлен!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Добавить Discovery Set в корзину</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
