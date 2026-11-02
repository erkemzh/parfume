import React, { useState } from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { PerfumeSeason, TimeOfDay } from '../types/perfume';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCollection: string;
  onSelectCollection: (col: string) => void;
  selectedSeason: PerfumeSeason | 'all';
  onSelectSeason: (s: PerfumeSeason | 'all') => void;
  selectedTimeOfDay: TimeOfDay | 'all';
  onSelectTimeOfDay: (t: TimeOfDay | 'all') => void;
  selectedAccord: string | 'all';
  onSelectAccord: (accord: string | 'all') => void;
  selectedBrand: string | 'all';
  onSelectBrand: (b: string | 'all') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  brands: string[];
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  activeCollection,
  onSelectCollection,
  selectedSeason,
  onSelectSeason,
  selectedTimeOfDay,
  onSelectTimeOfDay,
  selectedAccord,
  onSelectAccord,
  selectedBrand,
  onSelectBrand,
  sortBy,
  onSortChange,
  brands,
  totalCount,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const collections = [
    { id: 'all', label: 'Все ароматы' },
    { id: 'bestsellers', label: 'Бестселлеры' },
    { id: 'season', label: 'Ароматы сезона' },
    { id: 'niche', label: 'Нишевые эксклюзивы' },
    { id: 'samples', label: 'Отливанты & Сэмплы' },
  ];

  const accordsList = [
    'Лавандовый',
    'Розовый',
    'Цветочный',
    'Пудровый',
    'Сливочный',
    'Ванильный',
    'Свежий',
    'Мускусный',
    'Древесный',
  ];

  const seasonsList: { id: PerfumeSeason; label: string }[] = [
    { id: 'spring', label: 'Весна' },
    { id: 'summer', label: 'Лето' },
    { id: 'autumn', label: 'Осень' },
    { id: 'winter', label: 'Зима' },
  ];

  const hasActiveAdvancedFilters =
    selectedSeason !== 'all' ||
    selectedTimeOfDay !== 'all' ||
    selectedAccord !== 'all' ||
    selectedBrand !== 'all';

  const resetAllFilters = () => {
    onSelectSeason('all');
    onSelectTimeOfDay('all');
    onSelectAccord('all');
    onSelectBrand('all');
    onSearchChange('');
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Top Row: Collection Tabs & Search / Filter Button */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Collection Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white border border-purple-100 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => onSelectCollection(col.id)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeCollection === col.id
                  ? 'bg-gradient-to-r from-purple-100 to-rose-100 text-purple-900 font-semibold shadow-sm border border-purple-200'
                  : 'text-[#6E6A7A] hover:text-[#26232E]'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {/* Search, Sort and Advanced Filter Trigger */}
        <div className="flex items-center gap-3">
          {/* Quick search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Поиск по цветам, нотам..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-purple-200 focus:border-purple-400 rounded-xl text-xs text-[#26232E] placeholder-[#9E9AA8] focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 bg-white border border-purple-200 focus:border-purple-400 rounded-xl text-xs text-[#26232E] focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="popular">По популярности</option>
            <option value="price_asc">Сначала доступные</option>
            <option value="price_desc">Сначала премиальные</option>
            <option value="longevity">По стойкости шлейфа</option>
            <option value="rating">По рейтингу</option>
          </select>

          {/* Advanced Filters Button */}
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
              hasActiveAdvancedFilters || isAdvancedOpen
                ? 'bg-purple-100/70 border-purple-300 text-purple-900'
                : 'bg-white border-purple-200 text-[#5E5968] hover:border-purple-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" />
            <span>Фильтры</span>
            {hasActiveAdvancedFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filter Drawer / Panel */}
      {isAdvancedOpen && (
        <div className="p-6 rounded-2xl bg-white border border-purple-200 shadow-lg shadow-purple-500/5 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-800">
              Ольфакторные фильтры ароматов
            </div>
            {hasActiveAdvancedFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-purple-600 hover:text-purple-800 underline cursor-pointer"
              >
                Сбросить все фильтры
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Season Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4A56] mb-2">
                Сезон раскрытия
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onSelectSeason('all')}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    selectedSeason === 'all'
                      ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                      : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                  }`}
                >
                  Любой
                </button>
                {seasonsList.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectSeason(s.id)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      selectedSeason === s.id
                        ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                        : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time of Day */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4A56] mb-2">
                Время дня
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onSelectTimeOfDay('all')}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    selectedTimeOfDay === 'all'
                      ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                      : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => onSelectTimeOfDay('day')}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    selectedTimeOfDay === 'day'
                      ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                      : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                  }`}
                >
                  Дневные
                </button>
                <button
                  onClick={() => onSelectTimeOfDay('evening')}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    selectedTimeOfDay === 'evening'
                      ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                      : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                  }`}
                >
                  Вечерние
                </button>
              </div>
            </div>

            {/* Key Accord */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4A56] mb-2">
                Ключевой аккорд
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                <button
                  onClick={() => onSelectAccord('all')}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    selectedAccord === 'all'
                      ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                      : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                  }`}
                >
                  Все
                </button>
                {accordsList.map((accord) => (
                  <button
                    key={accord}
                    onClick={() => onSelectAccord(accord)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      selectedAccord === accord
                        ? 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                        : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:text-[#26232E]'
                    }`}
                  >
                    {accord}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#4E4A56] mb-2">
                Парфюмерный дом
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => onSelectBrand(e.target.value)}
                className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-[#26232E] focus:outline-none focus:border-purple-400"
              >
                <option value="all">Все дома</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      )}

      {/* Item count status line */}
      <div className="flex items-center justify-between text-xs text-[#6E6A7A]">
        <span>В каталоге представлено: <strong className="text-[#26232E] tabular-nums font-semibold">{totalCount} ароматов</strong></span>
        {hasActiveAdvancedFilters && (
          <span className="text-purple-700 font-medium">Применены ботанические фильтры</span>
        )}
      </div>
    </div>
  );
};
