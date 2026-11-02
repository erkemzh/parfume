import React from 'react';
import { PerfumeNote } from '../types/perfume';

interface OlfactoryPyramidProps {
  notes: {
    top: PerfumeNote[];
    heart: PerfumeNote[];
    base: PerfumeNote[];
  };
}

export const OlfactoryPyramid: React.FC<OlfactoryPyramidProps> = ({ notes }) => {
  return (
    <div className="w-full space-y-4">
      {/* Top Notes */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border border-purple-200/80 transition-all hover:border-purple-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-xs font-bold tracking-wider uppercase text-purple-900 font-sans">
              Верхние ноты (Первый вдох)
            </span>
          </div>
          <span className="text-[11px] text-[#6E6A7A] font-sans">
            Первые 15–30 минут
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {notes.top.map((note, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs text-[#26232E] shadow-xs font-medium"
            >
              <span className="text-sm select-none">{note.icon}</span>
              <span>{note.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heart Notes */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-100/50 to-rose-50 border border-rose-200/80 transition-all hover:border-rose-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-xs font-bold tracking-wider uppercase text-rose-900 font-sans">
              Ноты сердца (Цветочное тело)
            </span>
          </div>
          <span className="text-[11px] text-[#6E6A7A] font-sans">
            2 – 6 часов звучания
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {notes.heart.map((note, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs text-[#26232E] shadow-xs font-medium"
            >
              <span className="text-sm select-none">{note.icon}</span>
              <span>{note.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Base Notes */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-amber-100/50 to-purple-50 border border-amber-200/80 transition-all hover:border-amber-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span className="text-xs font-bold tracking-wider uppercase text-amber-900 font-sans">
              Базовые ноты (Шелковый шлейф)
            </span>
          </div>
          <span className="text-[11px] text-[#6E6A7A] font-sans">
            8 – 16+ часов на коже
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {notes.base.map((note, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs text-[#26232E] shadow-xs font-medium"
            >
              <span className="text-sm select-none">{note.icon}</span>
              <span>{note.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
