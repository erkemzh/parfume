import React, { useState, useMemo, useEffect } from 'react';
import { Perfume, PerfumeFormat } from '../types/perfume';
import { X, Sparkles, Check, ShoppingBag, ArrowRight, RotateCcw, Heart } from 'lucide-react';

interface FlowerOption {
  id: string;
  name: string;
  botanical: string;
  icon: string;
  color: string;
  accentBg: string;
  description: string;
  keywords: string[];
}

const FLOWERS: FlowerOption[] = [
  {
    id: 'rose',
    name: 'Майская роза',
    botanical: 'Rosa centifolia · Grasse',
    icon: '🌸',
    color: '#E05D82',
    accentBg: 'from-rose-50 to-pink-100 border-rose-200',
    description: 'Бархатистая, утренняя, чувственная с медовым шлейфом',
    keywords: ['роза', 'розы', 'rose', 'damascena'],
  },
  {
    id: 'peony',
    name: 'Белый пион',
    botanical: 'Paeonia lactiflora',
    icon: '🌺',
    color: '#D45D79',
    accentBg: 'from-pink-50 to-rose-100 border-pink-200',
    description: 'Пышный, свежий, воздушный, как шелковое облако',
    keywords: ['пион', 'peony', 'pivoine'],
  },
  {
    id: 'muguet',
    name: 'Весенний ландыш',
    botanical: 'Convallaria majalis',
    icon: '🔔',
    color: '#4E9F76',
    accentBg: 'from-emerald-50 to-teal-100 border-emerald-200',
    description: 'Хрустальный, звонкий, прохладный аромат росы и мая',
    keywords: ['ландыш', 'muguet', 'лилия'],
  },
  {
    id: 'lavender',
    name: 'Прованская лаванда',
    botanical: 'Lavandula angustifolia · 1200m',
    icon: '🪻',
    color: '#8B5CF6',
    accentBg: 'from-purple-50 to-indigo-100 border-purple-200',
    description: 'Горная свежесть, умиротворение, чистый шелковый бриз',
    keywords: ['лаванда', 'лаванды', 'lavande', 'lavender'],
  },
  {
    id: 'lilac',
    name: 'Французская сирень',
    botanical: 'Syringa vulgaris',
    icon: '💜',
    color: '#9333EA',
    accentBg: 'from-violet-50 to-purple-100 border-violet-200',
    description: 'Ностальгическая, влажная после дождя, пышная и сладкая',
    keywords: ['сирень', 'сирени', 'lilas', 'lilac'],
  },
  {
    id: 'jasmine',
    name: 'Звездный жасмин',
    botanical: 'Jasminum grandiflorum',
    icon: '🌼',
    color: '#EAB308',
    accentBg: 'from-amber-50 to-yellow-100 border-amber-200',
    description: 'Искрящийся, медовый, лунный, без индольной тяжести',
    keywords: ['жасмин', 'жасмина', 'jasmin', 'jasmine', 'самбак'],
  },
  {
    id: 'magnolia',
    name: 'Нежная магнолия',
    botanical: 'Magnolia grandiflora',
    icon: '💮',
    color: '#F472B6',
    accentBg: 'from-pink-50 to-amber-50 border-pink-200',
    description: 'Фарфоровые лепестки с цитрусовым сиянием и сливочностью',
    keywords: ['магнолия', 'магнолии', 'magnolia'],
  },
  {
    id: 'iris',
    name: 'Королевский ирис',
    botanical: 'Iris pallida · 6 ans',
    icon: '🪻',
    color: '#7C3AED',
    accentBg: 'from-purple-50 to-fuchsia-100 border-purple-200',
    description: 'Аристократичная пудра, дорогой кашемир и светлая замша',
    keywords: ['ирис', 'ириса', 'iris'],
  },
  {
    id: 'orange-blossom',
    name: 'Флердоранж',
    botanical: 'Citrus aurantium blossom',
    icon: '🍊',
    color: '#F97316',
    accentBg: 'from-orange-50 to-amber-100 border-orange-200',
    description: 'Солнечные белые цветы апельсина, средиземноморский свет',
    keywords: ['флердоранж', 'апельсина', 'нероли', 'orange'],
  },
  {
    id: 'mimosa',
    name: 'Золотая мимоза',
    botanical: 'Acacia dealbata · Tanneron',
    icon: '🌾',
    color: '#EAB308',
    accentBg: 'from-yellow-50 to-amber-100 border-yellow-200',
    description: 'Пушистые желтые шарики, медовая пыльца, первое тепло',
    keywords: ['мимоза', 'мимозы', 'mimosa'],
  },
  {
    id: 'tuberose',
    name: 'Ночная тубероза',
    botanical: 'Polianthes tuberosa',
    icon: '🌷',
    color: '#EC4899',
    accentBg: 'from-rose-50 to-pink-100 border-rose-200',
    description: 'Гипнотический сливочный нектар, гардения и кокосовый шелк',
    keywords: ['тубероза', 'туберозы', 'tubereuse', 'гардения'],
  },
  {
    id: 'violet',
    name: 'Лесная фиалка',
    botanical: 'Viola odorata · Toulouse',
    icon: '💐',
    color: '#8B5CF6',
    accentBg: 'from-violet-50 to-indigo-100 border-violet-200',
    description: 'Бархатные фиолетовые лепестки в пудре, прохладная зелень',
    keywords: ['фиалка', 'фиалки', 'violette', 'violet'],
  },
];

interface FlowerMatcherModalProps {
  perfumes: Perfume[];
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume, format?: PerfumeFormat) => void;
}

export const FlowerMatcherModal: React.FC<FlowerMatcherModalProps> = ({
  perfumes,
  onClose,
  onSelectPerfume,
  onAddToCart,
}) => {
  // User selects 2-3 flowers
  const [selectedFlowerIds, setSelectedFlowerIds] = useState<string[]>(['rose', 'peony', 'muguet']);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleFlower = (flowerId: string) => {
    if (selectedFlowerIds.includes(flowerId)) {
      if (selectedFlowerIds.length > 1) {
        setSelectedFlowerIds(selectedFlowerIds.filter((id) => id !== flowerId));
      }
    } else {
      if (selectedFlowerIds.length < 3) {
        setSelectedFlowerIds([...selectedFlowerIds, flowerId]);
      } else {
        // Replace oldest selection if already 3
        setSelectedFlowerIds([...selectedFlowerIds.slice(1), flowerId]);
      }
    }
  };

  const selectedFlowers = useMemo(() => {
    return FLOWERS.filter((f) => selectedFlowerIds.includes(f.id));
  }, [selectedFlowerIds]);

  // Match algorithm: checks top notes and heart notes specifically, giving highest weight to top & heart
  const matchedPerfumes = useMemo(() => {
    if (selectedFlowers.length === 0) return [];

    const scored = perfumes.map((perfume) => {
      let matchScore = 0;
      const matchedNotes: string[] = [];

      const topAndHeartNotes = [...perfume.notes.top, ...perfume.notes.heart];
      const allNotes = [...topAndHeartNotes, ...perfume.notes.base];

      selectedFlowers.forEach((flower) => {
        let flowerMatched = false;

        // 1. Check top notes (highest weight: 45 pts)
        for (const note of perfume.notes.top) {
          const lowerName = note.name.toLowerCase();
          if (flower.keywords.some((k) => lowerName.includes(k))) {
            matchScore += 45;
            matchedNotes.push(`Верхняя: ${note.name}`);
            flowerMatched = true;
            break;
          }
        }

        // 2. Check heart notes (high weight: 40 pts)
        if (!flowerMatched) {
          for (const note of perfume.notes.heart) {
            const lowerName = note.name.toLowerCase();
            if (flower.keywords.some((k) => lowerName.includes(k))) {
              matchScore += 40;
              matchedNotes.push(`Сердце: ${note.name}`);
              flowerMatched = true;
              break;
            }
          }
        }

        // 3. Check accords or description
        for (const [accord] of Object.entries(perfume.accords)) {
          const lowerAcc = accord.toLowerCase();
          if (flower.keywords.some((k) => lowerAcc.includes(k))) {
            matchScore += 15;
            break;
          }
        }
      });

      // Normalize match percentage based on number of flowers
      const maxPossibleScore = selectedFlowers.length * 55;
      const matchPercentage = Math.min(
        99,
        Math.max(65, Math.round((matchScore / maxPossibleScore) * 100))
      );

      return {
        perfume,
        matchScore,
        matchPercentage,
        matchedNotes: Array.from(new Set(matchedNotes)),
      };
    });

    // Sort by match score descending
    return scored
      .filter((item) => item.matchScore > 20)
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [perfumes, selectedFlowers]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="flower-matcher-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-5xl bg-[#FAF7F5] border border-purple-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 px-6 py-5 bg-[#FAF7F5]/95 backdrop-blur-md border-b border-purple-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-100 to-purple-200 text-purple-700 flex items-center justify-center text-xl shadow-sm">
              💐
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-wider uppercase text-purple-700">
                <span>Интерактивная флористика</span>
                <span className="text-purple-300">·</span>
                <span>Flower Matcher</span>
              </div>
              <h2
                id="flower-matcher-title"
                className="text-xl sm:text-2xl font-serif font-bold text-[#26232E]"
              >
                Виртуальный Букет: соберите любимые цветы
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFlowerIds(['rose', 'peony', 'muguet'])}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-purple-700 hover:text-purple-900 hover:bg-purple-100/60 rounded-xl transition-colors cursor-pointer"
              title="Сбросить к образцу букета"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="p-2.5 rounded-full bg-white hover:bg-purple-100 text-[#5E5968] hover:text-[#26232E] border border-purple-200/80 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Subtitle / Instructions */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm sm:text-base text-[#5E5968]">
              Выберите <strong className="text-purple-900 font-semibold">2 или 3 цветка</strong> для вашего персонального букета. 
              Система подберет ароматы, где именно эти ноты стоят во главе пирамиды (в верхних нотах и нотах сердца).
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/70 text-purple-800 text-xs font-medium">
              <span>Собрано цветов:</span>
              <span className="font-bold">{selectedFlowerIds.length} из 3</span>
              {selectedFlowerIds.length === 3 && (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Букет готов!
                </span>
              )}
            </div>
          </div>

          {/* 1. Flower Picker Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7A7485]">
              Палитра цветов Грасса и Прованса (выберите 2–3)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {FLOWERS.map((flower) => {
                const isSelected = selectedFlowerIds.includes(flower.id);
                return (
                  <button
                    key={flower.id}
                    onClick={() => toggleFlower(flower.id)}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-36 ${
                      isSelected
                        ? 'bg-gradient-to-b from-white to-purple-50/80 border-purple-500 shadow-md shadow-purple-500/10 ring-2 ring-purple-400/40'
                        : 'bg-white/80 hover:bg-white border-purple-100/90 hover:border-purple-300 shadow-sm'
                    }`}
                  >
                    {/* Top row: Icon + Checkbadge */}
                    <div className="flex items-start justify-between">
                      <span className="text-3xl filter drop-shadow-sm">{flower.icon}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'border border-purple-200 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                    </div>

                    {/* Bottom: Name & botanical */}
                    <div>
                      <div className="font-serif font-bold text-sm text-[#26232E] leading-tight">
                        {flower.name}
                      </div>
                      <div className="text-[10px] text-[#7A7485] font-sans italic truncate mt-0.5">
                        {flower.botanical}
                      </div>
                      <div className="text-[10px] text-purple-700 font-sans line-clamp-1 mt-1 font-medium">
                        {flower.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Visual Assembled Bouquet Display */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50/70 via-purple-50/80 to-amber-50/60 border border-purple-200/90 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Bouquet Illustration & Stems */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative w-28 h-28 rounded-2xl bg-white/90 border border-purple-200 shadow-inner flex items-center justify-center overflow-hidden">
                  {/* Silk ribbon knot background */}
                  <div className="absolute inset-x-2 bottom-3 h-5 bg-gradient-to-r from-rose-300 via-purple-300 to-rose-300 rounded-full opacity-80 blur-[1px]" />
                  <div className="absolute bottom-1 text-[10px] text-purple-800 font-serif font-semibold tracking-wider">
                    🎀 ШЕЛКОВЫЙ БАНТ
                  </div>

                  {/* Dynamic Flower Blooms */}
                  <div className="flex items-center justify-center -space-x-3 mb-4">
                    {selectedFlowers.map((f, i) => (
                      <div
                        key={f.id}
                        className="w-12 h-12 rounded-full bg-white shadow-lg border-2 border-white flex items-center justify-center text-2xl transform transition-transform hover:scale-125"
                        style={{
                          transform: `translateY(${i % 2 === 0 ? '-4px' : '4px'}) rotate(${
                            (i - 1) * 12
                          }deg)`,
                        }}
                      >
                        {f.icon}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-purple-800 uppercase tracking-wider">
                    Собранная ольфакторная композиция
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-[#26232E] mt-0.5">
                    {selectedFlowers.map((f) => f.name).join(' + ')}
                  </h4>
                  <p className="text-xs text-[#5E5968] mt-1 max-w-md">
                    Гармония: {selectedFlowers.map((f) => f.description).join('; ')}.
                  </p>
                </div>
              </div>

              {/* Selected Pills list */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedFlowers.map((f) => (
                  <span
                    key={f.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-medium text-purple-900 shadow-sm"
                  >
                    <span>{f.icon}</span>
                    <span>{f.name}</span>
                    <button
                      onClick={() => toggleFlower(f.id)}
                      className="ml-1 text-purple-400 hover:text-purple-700 cursor-pointer"
                      title="Убрать цветок"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* 3. Matching Results Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#26232E] flex items-center gap-2">
                  <span>Парфюмы с нотами вашего букета</span>
                  <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                    Найдено: {matchedPerfumes.length}
                  </span>
                </h3>
                <p className="text-xs text-[#7A7485] font-sans mt-0.5">
                  Ароматы отсортированы по концентрации выбранных цветов в верхних нотах и сердце
                </p>
              </div>
            </div>

            {/* Matched Perfume Cards List */}
            {matchedPerfumes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-purple-100 p-8 space-y-3">
                <p className="text-sm text-[#5E5968]">
                  Попробуйте выбрать другое сочетание цветов для составления букета.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedPerfumes.map(({ perfume, matchPercentage, matchedNotes }) => (
                  <div
                    key={perfume.id}
                    className="group bg-white rounded-2xl border border-purple-100/90 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Perfume Image with Badge */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-50/50">
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-purple-200 text-[11px] font-bold text-purple-900 shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          <span>{matchPercentage}% совпадение</span>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-purple-950/75 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider">
                          {perfume.concentration}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-3">
                        <div className="text-[11px] uppercase tracking-wider text-purple-700 font-semibold font-sans">
                          {perfume.brand} · {perfume.familyRu}
                        </div>
                        <h4 className="font-serif font-bold text-lg text-[#26232E] group-hover:text-purple-700 transition-colors">
                          {perfume.name}
                        </h4>
                        <p className="text-xs text-[#5E5968] line-clamp-2 leading-relaxed">
                          {perfume.description}
                        </p>

                        {/* Matched Flowers highlight */}
                        <div className="pt-2 border-t border-purple-50 space-y-1.5">
                          <div className="text-[10px] font-semibold text-[#7A7485] uppercase tracking-wider">
                            Ноты букета в пирамиде:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {matchedNotes.map((noteText, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200/80 text-[11px] font-medium"
                              >
                                🌸 {noteText}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="p-5 pt-0 mt-3 border-t border-purple-50 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-[#7A7485]">отливант 2 мл</div>
                        <div className="text-base font-serif font-bold text-[#26232E]">
                          {perfume.formats[0]?.price.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectPerfume(perfume);
                          }}
                          className="px-3 py-2 rounded-xl border border-purple-200 hover:bg-purple-50 text-xs font-semibold text-purple-900 transition-colors cursor-pointer"
                        >
                          Пирамида
                        </button>
                        <button
                          onClick={() => onAddToCart(perfume, perfume.formats[0])}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>В корзину</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Bar */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-t border-purple-100 flex items-center justify-between gap-4">
          <div className="text-xs text-[#7A7485] hidden sm:block">
            К каждому заказу от 15 000 ₽ прилагается подарочный пробник 1.5 мл на ваш выбор.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-semibold transition-colors cursor-pointer ml-auto"
          >
            Закрыть подбор
          </button>
        </div>

      </div>
    </div>
  );
};
