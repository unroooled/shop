import { useState } from 'react';
import { ClayProduct } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: ClayProduct | null;
  onClose: () => void;
  onAddToCart: (product: ClayProduct, quantity: number, note?: string) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  if (!product) return null;

  const handleClaim = () => {
    onAddToCart(product, quantity, note.trim() || undefined);
    setQuantity(1);
    setNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-surface-container-lowest rounded-[2.5rem] p-6 md:p-8 shadow-[6px_6px_0px_#1b1836] grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-surface-container hover:bg-secondary-container text-on-surface shadow-[2px_2px_0px_#1b1836] transition-all"
        >
          <span className="material-symbols-outlined text-[20px] block">close</span>
        </button>

        {/* Left Image */}
        <div className="md:col-span-6">
          <div className="aspect-square rounded-[1.5rem] bg-surface-container-low overflow-hidden relative shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]">
            <ResilientImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badgeText && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] -rotate-2">
                {product.badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Right Details */}
        <div className="md:col-span-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="font-label-sm lowercase text-tertiary">{product.category}</span>
            <div className="flex items-baseline justify-between gap-2 pr-8">
              <h3 className="font-headline-md lowercase text-on-surface leading-tight">
                {product.name}
              </h3>
              <span className="font-headline-md text-primary-container tabular-nums shrink-0">
                ₹{product.price}
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant">{product.description}</p>

            {/* Specs */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5 font-label-sm lowercase text-on-surface-variant">
              <div className="flex justify-between gap-2">
                <span>size</span>
                <span className="text-on-surface">{product.dimensions}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>hardware</span>
                <span className="text-on-surface">{product.hardware}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>batch stock</span>
                <span className="text-primary tabular-nums">{product.stockLeft} ready to ship</span>
              </div>
            </div>

            {/* Optional Note */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm lowercase text-on-surface">
                cute gift note or color tweak (optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. extra pink cheek blush please!"
                className="w-full px-4 py-2 rounded-full bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-2 focus:outline-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-1 bg-surface-container-low rounded-full px-2 py-1.5 shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full hover:bg-surface-container-high font-label-md flex items-center justify-center"
              >
                -
              </button>
              <span className="px-2 font-label-md tabular-nums">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockLeft, q + 1))}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full hover:bg-surface-container-high font-label-md flex items-center justify-center"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleClaim}
              className="flex-1 py-3 px-5 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>claim for ₹{(product.price * quantity).toFixed(0)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
