import React from 'react';
import { FAMILIES_INFO } from '../data/perfumeNotes';
import { OlfactoryFamily } from '../types/perfume';
import { Flower2, Sparkles, Wind, Trees, Sun } from 'lucide-react';

interface FamilyGuideProps {
  selectedFamily: OlfactoryFamily | 'all';
  onSelectFamily: (family: OlfactoryFamily | 'all') => void;
}

export const FamilyGuide: React.FC<FamilyGuideProps> = ({
  selectedFamily,
  onSelectFamily,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'floral':
        return <Flower2 className="w-5 h-5 text-rose-500" />;
      case 'fresh':
        return <Wind className="w-5 h-5 text-purple-500" />;
      case 'gourmand':
        return <Sparkles className="w-5 h-5 text-pink-500" />;
      case 'oriental':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'woody':
        return <Trees className="w-5 h-5 text-violet-500" />;
      default:
        return null;
    }
  };

  return (
    <section id="families" className="py-16 border-b border-purple-100 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-purple-700 font-sans font-semibold mb-2">
              <span>Ольфакторная навигация</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#26232E]">
              Гид по нежным парфюмерным семействам
            </h2>
          </div>
          <p className="text-sm text-[#5E5968] max-w-md font-sans">
            От свежести утренних лавандовых полей до бархатного прикосновения пудровой розы и мадагаскарской ванили.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FAMILIES_INFO.map((family) => {
            const isSelected = selectedFamily === family.id;
            return (
              <button
                key={family.id}
                onClick={() => onSelectFamily(isSelected ? 'all' : (family.id as OlfactoryFamily))}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between h-full cursor-pointer group ${
                  isSelected
                    ? 'bg-purple-50/80 border-purple-400 shadow-md shadow-purple-500/10'
                    : 'bg-white border-purple-100 hover:bg-purple-50/40 hover:border-purple-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 group-hover:bg-white transition-colors">
                      {getIcon(family.id)}
                    </div>
                    <span className="text-[11px] font-sans text-purple-700/80 tracking-wider uppercase font-medium">
                      {family.sub}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#26232E] mb-2 group-hover:text-purple-700 transition-colors">
                    {family.name}
                  </h3>

                  <p className="text-xs text-[#6E6A7A] leading-relaxed font-sans mb-4">
                    {family.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-100">
                  <p className="text-[10px] uppercase tracking-wider text-purple-600/80 font-sans font-semibold mb-1.5">
                    Характерные ноты:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {family.keyNotes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-[#4E4A56] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedFamily !== 'all' && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onSelectFamily('all')}
              className="text-xs text-purple-700 hover:text-purple-800 underline font-medium cursor-pointer"
            >
              Сбросить фильтр семейства и показать все
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
