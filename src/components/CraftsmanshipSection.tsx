import React from 'react';
import { Droplets, Sparkles, Feather, Flower2 } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 border-b border-purple-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-purple-700 font-sans font-bold">
              <span>Ботаническая философия</span>
              <span className="text-purple-300">·</span>
              <span>Грасс · Прованс</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#26232E] leading-tight">
              Бережный сбор лепестков на рассвете и чистые экстракты
            </h2>

            <p className="text-base text-[#5E5968] leading-relaxed font-sans">
              Цветы майской розы и лаванды собираются исключительно вручную в первые утренние часы до восхода жаркого солнца, пока лепестки сохраняют максимальную концентрацию эфирных масел.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#26232E] font-serif font-bold text-lg">
                  <Flower2 className="w-5 h-5 text-rose-500" />
                  <span>Майская роза Грасса</span>
                </div>
                <p className="text-xs text-[#6E6A7A] leading-relaxed font-sans">
                  Сотни свежих бутонов для получения всего одной драгоценной капли абсолюта.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#26232E] font-serif font-bold text-lg">
                  <Droplets className="w-5 h-5 text-purple-600" />
                  <span>35% Концентрация</span>
                </div>
                <p className="text-xs text-[#6E6A7A] leading-relaxed font-sans">
                  Категория Extrait de Parfum гарантирует стойкость и чистоту без спиртовой резкости.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#26232E] font-serif font-bold text-lg">
                  <Feather className="w-5 h-5 text-purple-600" />
                  <span>Культура распива</span>
                </div>
                <p className="text-xs text-[#6E6A7A] leading-relaxed font-sans">
                  Стеклянные мини-атомайзеры с нежным микрооблаком распыления.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#26232E] font-serif font-bold text-lg">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  <span>Пастельные шкатулки</span>
                </div>
                <p className="text-xs text-[#6E6A7A] leading-relaxed font-sans">
                  Нежно-розовый и лавандовый бархат с золотым тиснением и персональной гравировкой.
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-purple-50/70 via-rose-50/50 to-purple-50/70 border border-purple-200/80 shadow-xl space-y-6">
              <div className="text-purple-300 font-serif text-6xl leading-none select-none">
                “
              </div>

              <p className="text-xl sm:text-2xl font-serif italic text-[#26232E] leading-relaxed">
                Аромат цветов — это музыка природы, застывшая в воздухе. Он не кричит, он касается сердца невидимой шелковой вуалью нежности.
              </p>

              <div className="pt-6 border-t border-purple-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[#26232E] text-base">
                    Клер де Сен-Жермен
                  </h4>
                  <p className="text-xs text-[#7A7485] font-sans">
                    Ведущий ботанический парфюмер AURA FLORALE
                  </p>
                </div>
                <span className="text-xs font-mono text-purple-700 tracking-widest uppercase font-semibold">
                  GRASSE · FRANCE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
