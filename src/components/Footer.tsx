import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenSommelier: () => void;
  onOpenDiscoveryBuilder: () => void;
  onOpenFlowerMatcher?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenSommelier,
  onOpenDiscoveryBuilder,
  onOpenFlowerMatcher,
}) => {
  return (
    <footer className="bg-[#F5EFEB] border-t border-purple-200/80 text-[#5E5968] py-16 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-2xl font-serif font-bold text-[#26232E] tracking-[0.15em] block">
              AURA FLORALE
            </span>
            <p className="text-[#6E6A7A] leading-relaxed text-xs">
              Бутик селективной ботанической парфюмерии и цветочных концентратов. Официальные органические поставки из Грасса и Прованса.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#26232E]">
              Коллекции
            </h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-purple-700 transition-colors">Бестселлеры сезона</a></li>
              <li><a href="#families" className="hover:text-purple-700 transition-colors">Горная лаванда</a></li>
              <li><a href="#families" className="hover:text-purple-700 transition-colors">Майская роза Грасса</a></li>
              <li><a href="#families" className="hover:text-purple-700 transition-colors">Пудровые пионы & ирис</a></li>
              <li><a href="#families" className="hover:text-purple-700 transition-colors">Сливочная ваниль & сандал</a></li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#26232E]">
              Сервисы и опыт
            </h4>
            <ul className="space-y-2">
              {onOpenFlowerMatcher && (
                <li>
                  <button onClick={onOpenFlowerMatcher} className="hover:text-purple-700 transition-colors cursor-pointer text-left flex items-center gap-1.5 font-semibold text-purple-900">
                    <span>💐</span>
                    <span>Виртуальный Букет (Flower Matcher)</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenSommelier} className="hover:text-purple-700 transition-colors cursor-pointer text-left flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Парфюм AI-Match (Онлайн-сомелье)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenDiscoveryBuilder} className="hover:text-purple-700 transition-colors cursor-pointer text-left">
                  Конструктор Discovery Set (-20%)
                </button>
              </li>
              <li>
                <PWAInstallButton variant="footer" />
              </li>
              <li><span className="text-[#7A7485]">Подарочные пастельные шкатулки</span></li>
              <li><span className="text-[#7A7485]">Бесплатные сэмплы при заказе</span></li>
            </ul>
          </div>

          {/* Boutique Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#26232E]">
              Шоурум и оранжерея
            </h4>
            <p className="text-[#5E5968] leading-relaxed">
              Москва, Чистопрудный бульвар, 8<br />
              Ежедневно с 10:00 до 22:00
            </p>
            <p className="text-[#5E5968]">
              Консьерж-сервис: <span className="text-[#26232E] font-semibold">+7 (495) 720-30-50</span>
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 transition-colors cursor-pointer font-medium"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Панель администратора</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#7A7485] text-[11px]">
          <p>© {new Date().getFullYear()} AURA FLORALE Haute Parfumerie Botanique. Все права защищены.</p>
          <div className="flex gap-6">
            <span>Политика конфиденциальности</span>
            <span>Сертификаты органического сырья</span>
            <span>Договор оферты</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
