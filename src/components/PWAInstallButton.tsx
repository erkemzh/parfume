import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Share, PlusSquare, X, Check, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running as an installed PWA on mobile/desktop, hide the install button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleInstallClick}
          className="group relative px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-purple-900 via-[#1C1A24] to-purple-950 text-white font-medium text-xs shadow-md shadow-purple-950/20 hover:shadow-purple-900/30 border border-purple-800/50 hover:border-amber-400/60 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          title="Установить Aura Noir как приложение на телефон"
        >
          <img
            src="/pwa-192x192.png"
            alt="Aura Noir icon"
            className="w-4 h-4 rounded-md object-cover ring-1 ring-amber-400/50 group-hover:scale-110 transition-transform"
          />
          <span className="font-semibold text-amber-200 hidden sm:inline">Установить</span>
          <span className="font-semibold text-amber-200 sm:hidden">App</span>
          <Download className="w-3.5 h-3.5 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}

      {variant === 'banner' && (
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#18181B] via-[#121214] to-[#241E33] text-white border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src="/pwa-192x192.png"
                alt="Aura Noir App Icon"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-2xl ring-2 ring-amber-400/40 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-purple-950 flex items-center justify-center text-xs font-bold shadow-md">
                ✓
              </div>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400 font-bold font-sans">
                <Sparkles className="w-3 h-3" />
                <span>PWA · Мобильное приложение</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAFAFA]">
                Установите Aura Noir на экран телефона
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
                Полноэкранный режим без рамок браузера, быстрый запуск с рабочего стола и мгновенный доступ к вашей коллекции и корзине.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={handleInstallClick}
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 text-[#121214] font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-[#121214]" />
              <span>Установить приложение</span>
            </button>
          </div>
        </div>
      )}

      {variant === 'footer' && (
        <button
          onClick={handleInstallClick}
          className="text-left flex items-center gap-2 text-purple-900 font-semibold hover:text-purple-700 transition-colors cursor-pointer text-xs"
        >
          <Smartphone className="w-3.5 h-3.5 text-purple-600" />
          <span>Установить Aura Noir на телефон</span>
        </button>
      )}

      {/* Guided Installation Modal (for iOS Safari and manual browser install) */}
      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0"
            onClick={() => setShowGuide(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-md bg-[#FAF7F5] rounded-3xl p-6 sm:p-7 border border-purple-200 shadow-2xl z-10 space-y-6 text-[#26232E]">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src="/pwa-192x192.png"
                  alt="Aura Noir Icon"
                  className="w-14 h-14 rounded-2xl shadow-md ring-2 ring-amber-400/40 object-cover"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#26232E]">
                    Aura Noir
                  </h3>
                  <p className="text-xs text-purple-700 font-medium">
                    Установка веб-приложения (PWA)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-2 rounded-full bg-white hover:bg-purple-100 text-zinc-500 hover:text-zinc-800 border border-purple-200/80 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps based on Platform */}
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-2xl bg-white border border-purple-100 space-y-1">
                <span className="font-semibold text-purple-950 block text-sm">
                  {isIOS ? 'Инструкция для iPhone / iPad (Safari):' : 'Инструкция для Android / Chrome:'}
                </span>
                <p className="text-[#5E5968] leading-relaxed">
                  Сайт работает по стандарту PWA (Progressive Web App) и устанавливается как обычное мобильное приложение прямо из браузера:
                </p>
              </div>

              {isIOS ? (
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <span className="font-semibold text-purple-950">Нажмите «Поделиться»</span>
                      <p className="text-[#5E5968] mt-0.5 flex items-center gap-1">
                        Иконка <Share className="w-3.5 h-3.5 text-purple-600 inline" /> в нижней панели Safari.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <span className="font-semibold text-purple-950">Выберите «На экран „Домой“»</span>
                      <p className="text-[#5E5968] mt-0.5 flex items-center gap-1">
                        Строка <PlusSquare className="w-3.5 h-3.5 text-purple-600 inline" /> «Add to Home Screen».
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </div>
                    <div>
                      <span className="font-semibold text-purple-950">Нажмите «Добавить»</span>
                      <p className="text-[#5E5968] mt-0.5">
                        В правом верхнем углу экрана. Фирменная иконка «Aura Noir» появится на рабочем столе вашего телефона!
                      </p>
                    </div>
                  </li>
                </ol>
              ) : (
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <span className="font-semibold text-purple-950">Откройте меню браузера (три точки ⋮)</span>
                      <p className="text-[#5E5968] mt-0.5">
                        В правом верхнем углу Chrome / Яндекс Браузера.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <span className="font-semibold text-purple-950">Нажмите «Установить приложение»</span>
                      <p className="text-[#5E5968] mt-0.5">
                        Или «Добавить на главный экран». Приложение установится на телефон с фирменной иконкой.
                      </p>
                    </div>
                  </li>
                </ol>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              Понятно, спасибо
            </button>
          </div>
        </div>
      )}
    </>
  );
};
