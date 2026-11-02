import React from 'react';
import { CartItem, DiscoverySetItem, OrderItem } from '../types/perfume';
import { X, Trash2, Plus, Minus, Gift, Sparkles, ArrowRight, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  freeSample: { name: string; brand: string } | undefined;
  onSelectFreeSample: (sample: { name: string; brand: string } | undefined) => void;
  giftWrapping: boolean;
  onToggleGiftWrapping: (enabled: boolean) => void;
  giftCardMessage: string;
  onGiftCardMessageChange: (msg: string) => void;
  onProceedToCheckout: () => void;
}

const COMPLIMENTARY_SAMPLES = [
  { name: 'Lavande Céleste (Extrait 1.5 мл)', brand: 'AURA FLORALE Paris' },
  { name: 'Aura de Rose & Soie (Extrait 1.5 мл)', brand: 'Maison Soie & Pétales' },
  { name: 'Fleur d’Ivoire & Vanille (EdP 1.5 мл)', brand: 'Atelier Lilas & Pivoine' },
  { name: 'Pivoine Poudrée & Lilas (EdP 1.5 мл)', brand: 'Hortus Botanicus Grasse' },
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  freeSample,
  onSelectFreeSample,
  giftWrapping,
  onToggleGiftWrapping,
  giftCardMessage,
  onGiftCardMessageChange,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_SAMPLE_THRESHOLD = 5000;
  const FREE_DELIVERY_THRESHOLD = 15000;

  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => {
    if (item.type === 'discovery_set') {
      return sum + item.price * item.quantity;
    } else {
      return sum + item.format.price * item.quantity;
    }
  }, 0);

  const giftWrapFee = giftWrapping ? 500 : 0;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 490;
  const total = subtotal + giftWrapFee + deliveryFee;

  const isEligibleForFreeSample = subtotal >= FREE_SAMPLE_THRESHOLD;
  const progressToSample = Math.min(100, Math.round((subtotal / FREE_SAMPLE_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-purple-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-purple-200 text-[#26232E] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-purple-50/40">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#26232E]">
                Ваша парфюмерная шкатулка
              </h2>
              <p className="text-xs text-[#6E6A7A] font-sans mt-0.5">
                {items.length === 0
                  ? 'Пока пусто'
                  : `Выбрано позиций: ${items.reduce((acc, it) => acc + it.quantity, 0)}`}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Threshold Progress Bar */}
          <div className="px-6 py-3 bg-gradient-to-r from-purple-50 via-rose-50 to-purple-50 border-b border-purple-100 text-xs font-sans">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#5E5968] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                {isEligibleForFreeSample ? (
                  <span className="text-purple-800 font-bold">Подарочный сэмпл разблокирован!</span>
                ) : (
                  <span>
                    Добавьте на <strong className="text-[#26232E] tabular-nums">{(FREE_SAMPLE_THRESHOLD - subtotal).toLocaleString('ru-RU')} ₽</strong> для подарка
                  </span>
                )}
              </span>
              <span className="text-purple-700 font-bold tabular-nums">{progressToSample}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-purple-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-rose-400 transition-all duration-300"
                style={{ width: `${progressToSample}%` }}
              />
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3 text-[#8E8A99] font-sans">
                <p className="text-sm">Шкатулка пока пуста</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium transition-colors"
                >
                  Перейти к цветам
                </button>
              </div>
            ) : (
              items.map((item) => {
                if (item.type === 'discovery_set') {
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-rose-600 font-sans font-bold">
                            Discovery Box (-20%)
                          </span>
                          <h4 className="text-sm font-serif font-bold text-[#26232E]">
                            {item.title}
                          </h4>
                          {item.customBoxName && (
                            <p className="text-[11px] text-purple-800 italic">
                              Гравировка: «{item.customBoxName}»
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#5E5968] space-y-0.5 pl-2 border-l border-purple-200">
                        {item.vials.map((v, i) => (
                          <div key={i} className="truncate">
                            · {v.perfume.name} ({v.ml} мл)
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-purple-200/60">
                        <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-purple-200 shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded hover:bg-purple-50 text-zinc-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2 font-bold tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded hover:bg-purple-50 text-zinc-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-serif font-bold text-rose-600 tabular-nums">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  );
                }

                // Regular Perfume Item
                const cartItem = item as CartItem;
                return (
                  <div
                    key={cartItem.id}
                    className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs flex gap-4 items-center"
                  >
                    <img
                      src={cartItem.perfume.image}
                      alt={cartItem.perfume.name}
                      className="w-16 h-16 rounded-xl object-cover bg-purple-50 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-purple-700/80 truncate">
                            {cartItem.perfume.brand}
                          </p>
                          <h4 className="text-sm font-serif font-bold text-[#26232E] truncate">
                            {cartItem.perfume.name}
                          </h4>
                          <p className="text-xs text-rose-600 font-sans font-medium">
                            {cartItem.format.label}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-100">
                        <div className="flex items-center gap-1.5 bg-purple-50 rounded-xl p-0.5 border border-purple-100">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, -1)}
                            className="p-1 rounded hover:bg-white text-zinc-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2 font-bold tabular-nums">{cartItem.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, 1)}
                            className="p-1 rounded hover:bg-white text-zinc-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-serif font-bold text-[#26232E] tabular-nums">
                          {(cartItem.format.price * cartItem.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Free Sample Selector */}
            {items.length > 0 && isEligibleForFreeSample && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-rose-50 border border-purple-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900 font-sans">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Подарочный сэмпл (0 ₽)</span>
                  </div>
                  <span className="text-[11px] text-[#6E6A7A]">1 на выбор</span>
                </div>

                <div className="space-y-1.5">
                  {COMPLIMENTARY_SAMPLES.map((sample, idx) => {
                    const isChosen = freeSample?.name === sample.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSelectFreeSample(isChosen ? undefined : sample)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          isChosen
                            ? 'bg-purple-100 border-purple-400 text-purple-950 font-semibold'
                            : 'bg-white border-purple-100 text-[#4E4A56] hover:border-purple-200'
                        }`}
                      >
                        <span className="truncate">{sample.name}</span>
                        {isChosen ? (
                          <Check className="w-4 h-4 text-purple-700 shrink-0" />
                        ) : (
                          <span className="text-[10px] text-purple-600 font-medium">Выбрать</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Gift Wrapping & Greeting Card Toggle */}
            {items.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold text-[#26232E]">
                      Подарочная упаковка в пастельный бокс
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => onToggleGiftWrapping(e.target.checked)}
                    className="rounded accent-purple-600 cursor-pointer w-4 h-4"
                  />
                </label>

                {giftWrapping && (
                  <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                    <p className="text-[11px] text-[#6E6A7A]">
                      Нежно-розовая шкатулка с лавандовой шелковой лентой (+500 ₽)
                    </p>
                    <textarea
                      placeholder="Текст для открытки от руки (например: Для тебя с любовью)..."
                      value={giftCardMessage}
                      onChange={(e) => onGiftCardMessageChange(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-xl bg-white border border-rose-200 text-xs text-[#26232E] placeholder-[#9E9AA8] focus:outline-none focus:border-rose-400"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-purple-100 bg-[#FAF7F5] space-y-4">
              <div className="space-y-1.5 text-xs text-[#6E6A7A] font-sans">
                <div className="flex justify-between">
                  <span>Товары ({items.length}):</span>
                  <span className="text-[#26232E] font-medium tabular-nums">{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                {giftWrapping && (
                  <div className="flex justify-between text-rose-700">
                    <span>Подарочная шкатулка & открытка:</span>
                    <span className="tabular-nums">+500 ₽</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-600">Бесплатно</strong>
                    ) : (
                      `${deliveryFee} ₽`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#26232E] pt-2 border-t border-purple-200">
                  <span>Итого к оплате:</span>
                  <span className="text-purple-900 tabular-nums">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
