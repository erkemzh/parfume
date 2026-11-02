import React from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenSommelier: () => void;
  onOpenDiscoveryBuilder: () => void;
  onOpenFlowerMatcher: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenSommelier,
  onOpenDiscoveryBuilder,
  onOpenFlowerMatcher,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-24 border-b border-purple-100 bg-gradient-to-b from-[#FAF7F5] via-[#FDF8F7] to-[#FAF5FA]">
      {/* Background ambient gentle pastel glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-200/40 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-rose-200/40 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text / Campaign Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-purple-700 font-semibold font-sans">
              <span>Ботанический релиз сезона</span>
              <span aria-hidden="true" className="text-purple-300">·</span>
              <span>Майская роза & Лаванда</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#26232E] leading-[1.1] tracking-tight">
              Искусство прованской лаванды и шелковых лепестков роз
            </h1>

            <p className="text-base sm:text-lg text-[#5E5968] font-sans leading-relaxed max-w-xl">
              Селективные ботанические экстракты с рекордной концентрацией органических масел. 
              Интерактивная пирамида нот, визуализация нежного шлейфа и онлайн-подбор идеального аромата по вашим любимым цветам.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenFlowerMatcher}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-pink-500 hover:opacity-95 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-500/20 hover:shadow-purple-500/30 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="text-base">💐</span>
                <span>Собрать Виртуальный Букет</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenSommelier}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50/50 border border-purple-200 text-[#26232E] font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Парфюм AI-Match</span>
              </button>

              <button
                onClick={onOpenDiscoveryBuilder}
                className="px-5 py-3.5 rounded-xl bg-purple-50/80 hover:bg-purple-100/70 border border-purple-200/80 text-purple-800 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-purple-600" />
                <span>Собрать Discovery Set</span>
              </button>
            </div>

            {/* Subtle editorial trust markers */}
            <div className="pt-8 border-t border-purple-100 grid grid-cols-3 gap-6 text-[#5E5968]">
              <div>
                <p className="text-2xl font-serif font-bold text-[#26232E] tabular-nums">100%</p>
                <p className="text-xs text-[#7A7485] uppercase tracking-wider font-sans mt-0.5">
                  Цветы Грасса
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#26232E] tabular-nums">35%+</p>
                <p className="text-xs text-[#7A7485] uppercase tracking-wider font-sans mt-0.5">
                  Концентрация масел
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-[#26232E] tabular-nums">16+ ч</p>
                <p className="text-xs text-[#7A7485] uppercase tracking-wider font-sans mt-0.5">
                  Стойкий нежный шлейф
                </p>
              </div>
            </div>
          </div>

          {/* Right Showcase Image Card (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-purple-200/80 bg-white shadow-2xl shadow-purple-500/10 transition-all duration-500 group-hover:border-purple-300">
              <div className="aspect-[4/5] relative">
                <img
                  src="/src/assets/images/hero_floral_luxury_perfume_1793627465855.jpg"
                  alt="Fleur & Lavande Impériale флакон парфюма"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-80" />
                
                {/* Overlay Card Details */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-purple-700 font-sans font-semibold">
                        Флагман релиза
                      </p>
                      <h3 className="text-xl font-serif font-bold text-[#26232E] mt-0.5">
                        Fleur & Lavande Impériale
                      </h3>
                      <p className="text-xs text-[#6E6A7A] mt-1">
                        Горная лаванда · Майская роза · Сливочный сандал
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400 line-through tabular-nums">27 000 ₽</p>
                      <p className="text-lg font-serif font-bold text-rose-600 tabular-nums">23 500 ₽</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
