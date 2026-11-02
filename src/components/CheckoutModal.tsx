import React, { useState } from 'react';
import { Order, OrderItem } from '../types/perfume';
import { X, CheckCircle2, ShieldCheck, Truck, ShoppingBag, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  items: OrderItem[];
  freeSample?: { name: string; brand: string };
  giftWrapping: boolean;
  giftCardMessage?: string;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  freeSample,
  giftWrapping,
  giftCardMessage,
  onClose,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'courier'>('courier');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((sum, item) => {
    if (item.type === 'discovery_set') {
      return sum + item.price * item.quantity;
    } else {
      return sum + item.format.price * item.quantity;
    }
  }, 0);

  const giftWrapFee = giftWrapping ? 500 : 0;
  const isFreeDelivery = subtotal >= 15000;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 490;
  const total = subtotal + giftWrapFee + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    const newOrder: Order = {
      id: `AF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || 'client@auraflorale.com',
      address: address.trim(),
      items: [...items],
      freeSample,
      giftWrapping,
      giftCardMessage: giftCardMessage?.trim(),
      subtotal,
      discount: 0,
      deliveryFee,
      total,
      status: 'новый',
    };

    setCompletedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-purple-200 shadow-2xl overflow-hidden text-[#26232E] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-serif font-bold text-[#26232E]">
              {completedOrder ? 'Заказ бережно оформлен' : 'Оформление цветочного заказа'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[85vh]">
          {completedOrder ? (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto border border-purple-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-purple-800 font-sans font-bold">
                  Номер заказа: <strong className="font-mono text-[#26232E] text-sm">{completedOrder.id}</strong>
                </p>
                <h3 className="text-2xl font-serif font-bold text-[#26232E]">
                  Благодарим за выбор AURA FLORALE
                </h3>
                <p className="text-xs text-[#6E6A7A] font-sans max-w-md mx-auto leading-relaxed">
                  Мы бережно подготовим ваши флаконы и доставим их с персональной открыткой. Наш флорист свяжется с вами по номеру <strong className="text-[#26232E]">{completedOrder.phone}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/80 text-left space-y-3 text-xs font-sans">
                <div className="flex justify-between text-[#6E6A7A]">
                  <span>Получатель:</span>
                  <span className="text-[#26232E] font-semibold">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-[#6E6A7A]">
                  <span>Адрес:</span>
                  <span className="text-[#26232E] font-medium">{completedOrder.address}</span>
                </div>
                {completedOrder.freeSample && (
                  <div className="flex justify-between text-purple-800 font-medium">
                    <span>Подарочный сэмпл:</span>
                    <span>{completedOrder.freeSample.name}</span>
                  </div>
                )}
                {completedOrder.giftWrapping && (
                  <div className="flex justify-between text-rose-700 font-medium">
                    <span>Пастельная шкатулка:</span>
                    <span>Включено</span>
                  </div>
                )}
                <div className="pt-2 border-t border-purple-200 flex justify-between text-sm font-serif font-bold text-[#26232E]">
                  <span>Итого к оплате:</span>
                  <span className="text-purple-900">{completedOrder.total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-950 text-xs font-bold transition-colors cursor-pointer"
              >
                Вернуться в бутик
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
                  1. Данные получателя
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4E4A56] mb-1">Имя и фамилия *</label>
                    <input
                      type="text"
                      required
                      placeholder="София Романова"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-purple-400 text-xs text-[#26232E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4E4A56] mb-1">Номер телефона *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 999 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-purple-400 text-xs text-[#26232E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4E4A56] mb-1">Электронная почта</label>
                  <input
                    type="email"
                    placeholder="sofia@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-purple-400 text-xs text-[#26232E] focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-4 pt-4 border-t border-purple-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
                  2. Доставка
                </h3>

                <div>
                  <label className="block text-xs font-medium text-[#4E4A56] mb-1">Адрес доставки *</label>
                  <input
                    type="text"
                    required
                    placeholder="г. Москва, Чистопрудный бульвар, д. 8"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-purple-400 text-xs text-[#26232E] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4 border-t border-purple-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
                  3. Способ оплаты
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('courier')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      paymentMethod === 'courier'
                        ? 'bg-purple-100/70 border-purple-300 text-purple-950'
                        : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:border-purple-200'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#26232E]">Оплата при получении</div>
                      <div className="text-[11px] text-[#7A7485]">Курьеру после распаковки</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-purple-100/70 border-purple-300 text-purple-950'
                        : 'bg-zinc-50 border-zinc-200 text-[#6E6A7A] hover:border-purple-200'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#26232E]">Картой онлайн</div>
                      <div className="text-[11px] text-[#7A7485]">Безопасная оплата Mir / Visa</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Calculation Line */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1.5 text-xs text-[#6E6A7A] font-sans">
                <div className="flex justify-between">
                  <span>Сумма товаров:</span>
                  <span className="text-[#26232E] font-medium tabular-nums">{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                {giftWrapping && (
                  <div className="flex justify-between text-rose-700">
                    <span>Подарочная шкатулка:</span>
                    <span className="tabular-nums">+500 ₽</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? <strong className="text-emerald-600">Бесплатно</strong> : `${deliveryFee} ₽`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#26232E] pt-2 border-t border-purple-200">
                  <span>К оплате:</span>
                  <span className="text-purple-900 tabular-nums">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Подтвердить заказ ({total.toLocaleString('ru-RU')} ₽)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
