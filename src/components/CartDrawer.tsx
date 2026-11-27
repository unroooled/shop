import { FormEvent, useState } from 'react';
import { CartItem } from '../types';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'shipping' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerHandle, setCustomerHandle] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo === 'CLAYCLUB10' ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shippingCost = discountedSubtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
  const total = discountedSubtotal + shippingCost;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const shippingProgress = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'CLAYCLUB10') {
      setAppliedPromo('CLAYCLUB10');
      setPromoFeedback('10% clay club discount applied!');
    } else {
      setPromoFeedback('try code CLAYCLUB10 for 10% off ✨');
    }
  };

  const handleConfirmOrder = (e: FormEvent) => {
    e.preventDefault();
    const newId = `UNR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newId);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleResetAndClose = () => {
    setCheckoutStep('bag');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-on-surface/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
    >
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <div className="relative z-10 w-full max-w-md bg-surface h-full flex flex-col shadow-[-6px_0_0_#1b1836] overflow-hidden">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-surface-container-lowest border-b border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-full bg-secondary-container text-on-secondary-container shadow-[2px_2px_0px_#1b1836]">
              <span className="material-symbols-outlined text-[20px] block">shopping_bag</span>
            </span>
            <div>
              <h2 className="font-headline-sm lowercase text-on-surface">
                {checkoutStep === 'confirmed'
                  ? 'order unrolled! ✿'
                  : checkoutStep === 'shipping'
                  ? 'tracked shipping details'
                  : 'your cute clay bag'}
              </h2>
              <p className="font-label-sm lowercase text-on-surface-variant tabular-nums">
                {checkoutStep === 'confirmed'
                  ? `receipt #${orderId}`
                  : `${items.reduce((acc, i) => acc + i.quantity, 0)} goodies inside`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close shopping bag"
            className="p-2 rounded-full bg-surface-container hover:bg-secondary-container text-on-surface shadow-[2px_2px_0px_#1b1836] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] block">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {checkoutStep === 'confirmed' ? (
            <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-[4px_4px_0px_#1b1836] flex flex-col items-center text-center gap-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-[3px_3px_0px_#1b1836]">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h3 className="font-headline-md lowercase text-on-surface">
                yay {customerName || 'friend'}! order #{orderId} confirmed
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                we&apos;re wrapping your glazed charms in honeycomb paper &amp; sticker confetti!
                tracked dispatch details will go to{' '}
                <strong className="text-on-surface">{customerEmail}</strong>
                {customerHandle ? ` & DM ${customerHandle}` : ''}.
              </p>
              <div className="w-full p-4 rounded-2xl bg-surface-container-low text-left font-label-sm lowercase text-on-surface-variant flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span>status</span>
                  <span className="text-primary">preparing parcel</span>
                </div>
                <div className="flex justify-between">
                  <span>dispatch window</span>
                  <span className="text-on-surface">1–2 studio days</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary transition-all"
              >
                back to clay drops ✿
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center shadow-[3px_3px_0px_#1b1836]">
                <span className="material-symbols-outlined text-[36px] text-primary-container">
                  sentiment_satisfied
                </span>
              </div>
              <h3 className="font-headline-sm lowercase text-on-surface">your basket is empty!</h3>
              <p className="font-body-sm text-on-surface-variant max-w-xs">
                claim a glossy fridge magnet set, chunky pin badge, or configure a bespoke pet
                charm to get started.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-secondary-fixed transition-all"
              >
                browse cute drops ✧
              </button>
            </div>
          ) : checkoutStep === 'shipping' ? (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setCheckoutStep('bag')}
                className="self-start text-on-surface-variant hover:text-primary font-label-sm lowercase flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>back to bag</span>
              </button>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm lowercase text-on-surface">full name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Cleo Kim"
                  className="w-full px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm lowercase text-on-surface">
                  email for tracking link
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="cleo@sweetmail.com"
                  className="w-full px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm lowercase text-on-surface">
                  instagram @handle (optional for progress pics)
                </label>
                <input
                  type="text"
                  value={customerHandle}
                  onChange={(e) => setCustomerHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm lowercase text-on-surface">
                  shipping address &amp; postal code
                </label>
                <textarea
                  rows={3}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Indiranagar, 100 Feet Road, Bengaluru, Karnataka 560038"
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-secondary-fixed/70 text-on-secondary-fixed font-label-sm lowercase flex items-center justify-between">
                <span>tracked pan-india parcel total</span>
                <span className="font-headline-sm text-on-surface tabular-nums">
                  ₹{Math.round(total)}
                </span>
              </div>
            </form>
          ) : (
            <>
              {/* Free Shipping Progress Bar */}
              <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[2px_2px_0px_#1b1836]">
                <div className="flex items-center justify-between font-label-sm lowercase mb-2">
                  <span className="text-on-surface">
                    {remainingForFreeShipping === 0
                      ? 'yay! you unlocked free tracked pan-india shipping ✿'
                      : `add ₹${Math.ceil(remainingForFreeShipping)} more for free tracked shipping!`}
                  </span>
                  <span className="text-primary tabular-nums">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-primary-container transition-all duration-300 rounded-full"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-[3px_3px_0px_#1b1836] flex gap-3 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-surface-container-low overflow-hidden shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-label-md lowercase text-on-surface truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-outline hover:text-error transition-colors shrink-0"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      {item.meta && (
                        <p className="font-label-sm lowercase text-tertiary truncate mt-0.5">
                          {item.meta}
                        </p>
                      )}
                      {item.note && (
                        <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                          note: {item.note}
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 bg-surface-container-low rounded-full px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="w-6 h-6 rounded-full hover:bg-surface-container-high font-label-md flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="px-2 font-label-sm tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            className="w-6 h-6 rounded-full hover:bg-surface-container-high font-label-md flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-label-lg text-primary-container tabular-nums">
                          ₹{Math.round(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <form onSubmit={handleApplyPromo} className="flex flex-col gap-1.5">
                <div className="flex gap-2 min-w-0">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="promo code (try CLAYCLUB10)"
                    aria-label="Promo code"
                    className="flex-1 min-w-0 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-body-sm placeholder:text-outline shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-container transition-all whitespace-nowrap shrink-0"
                  >
                    apply
                  </button>
                </div>
                {promoFeedback && (
                  <span className="font-label-sm lowercase text-primary px-2">{promoFeedback}</span>
                )}
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/40 flex flex-col gap-3">
            <div className="flex flex-col gap-1 font-body-sm text-on-surface-variant">
              <div className="flex justify-between">
                <span>subtotal</span>
                <span className="tabular-nums text-on-surface">₹{Math.round(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>clayclub10 (10% off)</span>
                  <span className="tabular-nums">-₹{Math.round(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>tracked pan-india post</span>
                <span className="tabular-nums text-on-surface">
                  {shippingCost === 0 ? 'free ★' : `₹${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-outline-variant/30 font-headline-sm text-on-surface">
                <span>total</span>
                <span className="tabular-nums text-primary-container">₹{Math.round(total)}</span>
              </div>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('shipping')}
                className="w-full py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                <span>continue to shipping</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                <span>place handmade order ✿</span>
                <span className="material-symbols-outlined text-[18px]">check</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
