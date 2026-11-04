import { ShoppingBag, Sparkles, Shield, Search } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSommelier: () => void;
  onOpenDiscoveryBuilder: () => void;
  onOpenFlowerMatcher: () => void;
  onOpenAdmin: () => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSommelier,
  onOpenDiscoveryBuilder,
  onOpenFlowerMatcher,
  onOpenAdmin,
  onSearchClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F5]/90 backdrop-blur-md border-b border-purple-100/90 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, whitespace-nowrap) */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-bold text-[#26232E] hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>AURA FLORALE</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-purple-600/80 font-sans font-medium hidden sm:inline">
            Grasse · Paris
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#524E5B]">
          <a
            href="#catalog"
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0"
          >
            Коллекция
          </a>
          <button
            onClick={onOpenFlowerMatcher}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-100/90 via-purple-100/90 to-pink-100/80 hover:from-rose-200 hover:to-purple-200 text-purple-900 border border-purple-200/80 font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>💐</span>
            <span>Виртуальный Букет</span>
          </button>
          <button
            onClick={onOpenSommelier}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-purple-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>AI-Сомелье</span>
          </button>
          <button
            onClick={onOpenDiscoveryBuilder}
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Собери Discovery Set
          </button>
          <a
            href="#craftsmanship"
            className="hover:text-purple-600 transition-colors whitespace-nowrap shrink-0"
          >
            Философия
          </a>
        </nav>

        {/* Zone 3: Primary action & controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <PWAInstallButton variant="header" />

          <button
            onClick={onSearchClick}
            aria-label="Поиск ароматов"
            className="p-2.5 rounded-xl text-zinc-600 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer border border-transparent hover:border-purple-200"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAdmin}
            title="Панель администратора"
            className="p-2.5 rounded-xl text-zinc-600 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer flex items-center gap-1 border border-transparent hover:border-purple-200"
          >
            <Shield className="w-4 h-4 text-purple-500" />
            <span className="text-xs hidden xl:inline font-medium">Вход</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Корзина покупок"
            className="relative px-4 py-2.5 rounded-xl bg-white border border-purple-200/80 hover:border-purple-400 text-[#26232E] text-sm font-medium transition-all hover:shadow-md hover:shadow-purple-500/10 flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Корзина</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
