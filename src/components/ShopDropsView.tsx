import { useState } from 'react';
import {
  CLAY_PRODUCTS,
  IMAGES,
  PAST_PROJECTS,
  STUDIO_STEPS,
} from '../data/shopData';
import {
  ClayProduct,
  CommissionTicket,
  PageView,
  PastProject,
  ProductCategory,
} from '../types';
import { CommissionTicketSection } from './CommissionTicketSection';
import { ResilientImage } from './ResilientImage';
import { TestimonialsSection } from './TestimonialsSection';

interface ShopDropsViewProps {
  onAddToCart: (product: ClayProduct) => void;
  onSelectProduct: (product: ClayProduct) => void;
  onSelectProject: (project: PastProject) => void;
  onNavigate: (page: PageView) => void;
  onSubmitTicket: (
    ticket: Omit<CommissionTicket, 'id' | 'createdAt' | 'estimatedPrice'>
  ) => CommissionTicket;
  recentTickets: CommissionTicket[];
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: `all goodies (${CLAY_PRODUCTS.length})` },
  { id: 'custom badges', label: 'custom badges' },
  { id: 'keychains', label: 'keychains' },
  { id: 'fridge magnets', label: 'fridge magnets' },
  { id: 'lip balm cases', label: 'lip balm cases' },
];

export function ShopDropsView({
  onAddToCart,
  onSelectProduct,
  onSelectProject,
  onNavigate,
  onSubmitTicket,
  recentTickets,
}: ShopDropsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [showAllDrops, setShowAllDrops] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const filteredProducts =
    selectedCategory === 'all'
      ? showAllDrops
        ? CLAY_PRODUCTS
        : CLAY_PRODUCTS.slice(0, 5)
      : CLAY_PRODUCTS.filter((p) => p.category === selectedCategory);

  const badgeToneClasses = (tone?: 'yellow' | 'lilac' | 'pink') => {
    if (tone === 'lilac') return 'bg-tertiary-fixed text-on-tertiary-fixed rotate-2';
    if (tone === 'pink') return 'bg-primary-fixed text-on-primary-fixed -rotate-2';
    return 'bg-secondary-fixed text-on-secondary-fixed -rotate-3';
  };

  return (
    <div className="flex flex-col w-full relative overflow-x-hidden">
      {/* Wavy Organic Vector Clay Ribbon Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90 select-none">
        <svg
          className="w-full min-h-[3400px] h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 3400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 680 -50 C 740 180, 1160 220, 1260 380 C 1360 540, 1020 720, 780 760 C 500 810, 240 850, 290 1100 C 340 1350, 920 1320, 1100 1560 C 1280 1800, 1050 2050, 850 2150 C 650 2250, 320 2400, 420 2700 C 520 3000, 980 3100, 920 3450"
            opacity="0.65"
            stroke="#f5e071"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="190"
          />
          <path
            d="M 680 -50 C 740 180, 1160 220, 1260 380 C 1360 540, 1020 720, 780 760 C 500 810, 240 850, 290 1100 C 340 1350, 920 1320, 1100 1560 C 1280 1800, 1050 2050, 850 2150 C 650 2250, 320 2400, 420 2700 C 520 3000, 980 3100, 920 3450"
            opacity="0.4"
            stroke="#fcf8ff"
            strokeDasharray="24 30"
            strokeLinecap="round"
            strokeWidth="12"
          />
          <path
            d="M 120 400 C 260 620, 520 640, 480 940 C 440 1240, 150 1480, 210 1820 C 270 2160, 820 2300, 860 2620 C 900 2940, 680 3200, 740 3400"
            opacity="0.5"
            stroke="#e5deff"
            strokeLinecap="round"
            strokeWidth="80"
          />
        </svg>
      </div>

      {/* SECTION 1: HERO (Dopamine Clay Splash & Iconic Kinetic Typo) */}
      <section className="relative z-10 w-full px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-12 sm:pb-14 flex flex-col items-center justify-center max-w-[1440px] mx-auto">
        {/* Top Micro Stickers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm shadow-[2px_2px_0px_#1b1836] sm:-rotate-2">
            batch 04 restock is live!
          </span>
          <span className="inline-flex items-center gap-1 px-3.5 sm:px-5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm shadow-[2px_2px_0px_#1b1836] sm:rotate-1">
            ✦ 100% pinched &amp; glazed
          </span>
          <span className="inline-flex items-center gap-1 px-3.5 sm:px-5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm shadow-[2px_2px_0px_#1b1836] sm:-rotate-1">
            ★ custom orders open
          </span>
        </div>

        {/* Hand-Drawn Splash Star Sparkle & Right Pill */}
        <div className="relative w-full max-w-6xl flex justify-between items-center pointer-events-none select-none px-1 sm:px-4">
          <div className="transform -rotate-12 sm:translate-y-4">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-secondary-fixed fill-current" viewBox="0 0 100 100">
              <path d="M 50 15 C 50 30, 48 45, 20 48 C 45 52, 50 68, 50 85 C 50 68, 55 52, 80 48 C 55 45, 50 30, 50 15 Z" />
              <circle cx="24" cy="24" fill="#f5e071" r="5" />
              <circle cx="78" cy="22" fill="#df0b81" r="7" />
            </svg>
          </div>
          <div className="transform rotate-6 sm:rotate-12 -translate-y-1 sm:-translate-y-2">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface-container-lowest text-primary shadow-[3px_3px_0px_#1b1836] font-label-sm sm:font-label-md uppercase tracking-wider whitespace-nowrap">
              hand-kneaded ★
            </span>
          </div>
        </div>

        {/* Mega Elongated Display Title */}
        <div className="relative w-full flex flex-col items-center justify-center my-1.5 text-center overflow-hidden py-1">
          <h1 className="font-headline-xl text-[clamp(2.2rem,11.2vw,9rem)] leading-[0.9] lowercase font-black text-primary-container tracking-tighter drop-shadow-[3px_3px_0px_#1b1836] sm:drop-shadow-[4px_4px_0px_#1b1836] select-none max-w-full cursor-default">
            unroooooooled
          </h1>
          <div className="mt-3 md:-mt-1 flex items-center justify-center max-w-full px-2">
            <span className="font-headline-md text-[clamp(1rem,4.2vw,1.75rem)] tracking-wide sm:tracking-wider text-tertiary lowercase px-4 sm:px-5 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-sm shadow-[2px_2px_0px_#1b1836] sm:rotate-1 text-center">
              clay shop &amp; tactile dopamine
            </span>
          </div>
        </div>

        {/* Hero Mascot & Interactive Centerpiece */}
        <div className="relative mt-6 flex flex-col items-center w-full">
          <div className="relative group my-4">
            <div className="absolute -inset-3 sm:-inset-5 rounded-full border-4 border-dashed border-primary-container/40 animate-[spin_20s_linear_infinite] pointer-events-none" />
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-secondary-fixed/50 p-2.5 sm:p-3 shadow-[5px_5px_0px_#1b1836] flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center relative shadow-[inset_0_4px_8px_rgba(27,24,54,0.08)]">
                <ResilientImage
                  src={IMAGES.logo}
                  alt="unroooled official blushing clay logo"
                  className="w-full h-full object-contain scale-125"
                />
                <div className="absolute top-3 right-4 text-primary animate-bounce">
                  <span className="material-symbols-outlined material-symbols-filled text-[24px] sm:text-[28px]">
                    star
                  </span>
                </div>
              </div>
            </div>

            {/* Floating sticker chips around mascot */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:-bottom-3 sm:-left-10 bg-surface-container-lowest text-on-surface px-3.5 sm:px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#1b1836] font-label-sm lowercase sm:-rotate-6 flex items-center gap-1.5 border border-on-surface/10 whitespace-nowrap">
              <span className="material-symbols-outlined text-[14px] text-secondary">water_drop</span>
              <span>super glossy &amp; waterproof</span>
            </div>
            <div className="absolute -top-4 right-0 sm:-top-3 sm:-right-10 bg-primary text-on-primary px-3.5 sm:px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#1b1836] font-label-sm lowercase rotate-3 sm:rotate-6 flex items-center gap-1 whitespace-nowrap">
              <span className="material-symbols-outlined text-[15px]">favorite</span>
              <span>baked with love</span>
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-center max-w-xl font-body-lg text-on-surface-variant font-medium px-1">
            Handcrafted squishy magnets, chunky pin badges, pet avatars, and quirky little
            kiln-fired serotonin charms designed to brighten up your desk, fridge, and tote bag.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#drops"
              className="px-8 py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg lowercase shadow-[4px_4px_0px_#1b1836] hover:bg-primary hover:text-on-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1b1836] transition-all flex items-center gap-2"
            >
              <span>browse drop 04 ✿</span>
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onNavigate('custom-orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg lowercase shadow-[4px_4px_0px_#1b1836] hover:bg-secondary-container hover:text-on-secondary-container active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1b1836] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
              <span>request custom piece ✎</span>
            </button>
          </div>

          {/* Quick Trust Counters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-on-surface-variant font-label-sm lowercase">
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-headline-sm tabular-nums">1,400+</span>
              <span>pins unrolled</span>
            </div>
            <span aria-hidden="true">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-secondary font-headline-sm tabular-nums">5★</span>
              <span>happy squeals</span>
            </div>
            <span aria-hidden="true">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">
                local_shipping
              </span>
              <span>tracked post</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE TICKER (Dopamine Ribbon) */}
      <div className="w-full overflow-hidden py-3 my-2 relative z-20">
        <div className="w-[104%] -ml-[2%] bg-secondary-container text-on-secondary-container py-3 shadow-[0_4px_0px_#1b1836] overflow-hidden select-none -rotate-1">
          <div className="animate-marquee whitespace-nowrap font-label-md uppercase tracking-wider">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10 pr-10">
                <span>★ CUSTOMISED FACE BADGES FROM ₹60</span>
                <span aria-hidden="true">✦</span>
                <span>HANDMADE CLAY FRIDGE MAGNETS</span>
                <span aria-hidden="true">✦</span>
                <span>DIVA BADGES, NAME KEYCHAINS &amp; LIP BALM CASES</span>
                <span aria-hidden="true">✦</span>
                <span>HEAVY DUTY NEODYMIUM MAGNETS</span>
                <span aria-hidden="true">✦</span>
                <span>PAN-INDIA PLASTIC-FREE PACKAGING</span>
                <span aria-hidden="true">✦</span>
                <span>★ MADE BY HAND IN INDIA</span>
                <span aria-hidden="true">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: FEATURED DROPS & COLLECTION CATALOG */}
      <section
        id="drops"
        className="relative z-10 w-full px-4 sm:px-6 md:px-10 py-12 sm:py-14 flex flex-col gap-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] mb-2">
              <span className="material-symbols-outlined text-[14px] text-primary">
                local_fire_department
              </span>
              <span>fresh out of the oven</span>
            </div>
            <h2 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
              featured cute drops <span className="text-primary-container">✧</span>
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-lg mt-1">
              Each batch is kneaded in small runs of 10–25 pieces. Once they find homes, the color
              palettes evolve into new experiments!
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-surface-container-lowest p-5 rounded-[2rem] shadow-[4px_4px_0px_#1b1836] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1b1836] transition-all duration-300 relative group"
            >
              {product.badgeText && (
                <span
                  className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] ${badgeToneClasses(
                    product.badgeTone
                  )}`}
                >
                  {product.badgeText}
                </span>
              )}

              {/* Image Viewport */}
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="w-full aspect-square rounded-[1rem] bg-surface-container-low overflow-hidden relative shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] text-left focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`Inspect ${product.name}`}
              >
                <ResilientImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm lowercase flex items-center gap-1 shadow-[1px_1px_0px_#1b1836]">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    {product.chipIcon}
                  </span>
                  <span>{product.chipText}</span>
                </div>
              </button>

              {/* Product Details */}
              <div className="mt-5 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left font-headline-sm lowercase text-on-surface hover:text-primary transition-colors"
                    >
                      {product.name}
                    </button>
                    <span className="font-headline-sm text-primary-container tabular-nums shrink-0">
                      ₹{product.price}
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mt-1">{product.description}</p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-outline-variant/30">
                  <span className="font-label-sm text-on-surface-variant lowercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {product.footerIcon}
                    </span>
                    <span>{product.footerText}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-primary hover:text-on-primary active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      add_shopping_cart
                    </span>
                    <span>claim set</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Bespoke Custom Pet Magnet Card (shown on 'all' or alongside filtered drops) */}
          {selectedCategory === 'all' && (
            <div className="flex flex-col bg-surface-container-high p-5 rounded-[2rem] shadow-[4px_4px_0px_#1b1836] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1b1836] transition-all duration-300 relative group justify-between border-2 border-dashed border-primary/20">
              <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] -rotate-2">
                custom commission ★
              </span>

              <div className="w-full aspect-square rounded-[1rem] bg-surface-container-lowest flex flex-col items-center justify-center p-5 text-center relative overflow-hidden shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]">
                <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-[3px_3px_0px_#1b1836] mb-3 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-[40px]">pets</span>
                </div>
                <span className="font-headline-sm lowercase text-on-surface">
                  your pet or face in clay!
                </span>
                <p className="font-body-sm text-on-surface-variant mt-1 max-w-[210px]">
                  send us a reference photo &amp; get a tiny 3D sculpted magnet of your fur baby
                </p>
                <div className="mt-3 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm">
                  turnaround: 5-7 days
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-headline-sm lowercase text-on-surface">
                    bespoke custom badge or magnet
                  </h3>
                  <span className="font-headline-sm text-primary-container tabular-nums">₹60+</span>
                </div>
                <p className="font-body-sm text-on-surface-variant">
                  Customised face badges (₹60), lip balm cases (₹99), name keychains (₹150), badge
                  duos (₹250+), or any custom vibe you want!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('custom-orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-container hover:text-on-secondary-container active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-1.5 mt-1"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  <span>configure custom piece</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Full Catalog Link when viewing default subset */}
        {selectedCategory === 'all' && !showAllDrops && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllDrops(true)}
              className="px-6 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-secondary-container transition-all flex items-center gap-2"
            >
              <span>view all {CLAY_PRODUCTS.length} clay goodies &amp; combos</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </section>

      {/* SECTION 4: 'WE CAN MAKE ANYTHING' INTERACTIVE STUDIO PREVIEW */}
      <section
        id="custom-studio"
        className="relative z-10 w-full px-5 md:px-10 py-14 bg-surface-container-low my-5"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm lowercase w-max shadow-[2px_2px_0px_#1b1836] -rotate-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span>clay magic studio</span>
              </div>
              <h2 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
                yes, we can sculpt <span className="text-primary-container">literally anything</span>{' '}
                ✦
              </h2>
              <p className="font-body-lg text-on-surface-variant font-medium">
                From your dog with mismatched ears to corporate logo favors for your indie coffee
                shop, our fingers pinch whatever fun idea is living in your head.
              </p>

              {/* Interactive Process Visualizer Steps */}
              <div className="mt-4 flex flex-col gap-3">
                {STUDIO_STEPS.map((step, index) => {
                  const isActive = activeStepIndex === index;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      className={`text-left flex items-start gap-3 p-4 rounded-[1.5rem] shadow-[2px_2px_0px_#1b1836] transition-all ${
                        isActive
                          ? 'bg-surface-container-lowest translate-x-1 shadow-[4px_4px_0px_#1b1836]'
                          : 'bg-surface-container-lowest/80 hover:bg-surface-container-lowest hover:translate-x-1'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full font-label-md flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#1b1836] tabular-nums ${step.bgClass}`}
                      >
                        {step.number}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-headline-sm lowercase text-on-surface">{step.title}</h4>
                        <p className="font-body-sm text-on-surface-variant mt-0.5">
                          {isActive ? step.detail : step.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Artisan Studio Craft Photo with Stickers */}
            <div className="lg:col-span-6 relative pb-2 sm:pb-6">
              <div className="relative rounded-[2rem] overflow-hidden bg-surface-container-lowest p-2 shadow-[5px_5px_0px_#1b1836] sm:rotate-1">
                <ResilientImage
                  src={IMAGES.studioHands}
                  alt="Artisan hands molding colorful pastel polymer clay in a bright craft workshop"
                  className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover rounded-[1.25rem]"
                />
                <div className="absolute top-4 left-4 max-w-[calc(100%-2rem)] px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary-container shrink-0">
                    brush
                  </span>
                  <span className="truncate">behind the scenes at unroooled studio</span>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-0 sm:right-4 w-full sm:max-w-[270px] bg-secondary-container p-3.5 rounded-[1.5rem] shadow-[3px_3px_0px_#1b1836] text-on-secondary-container font-label-sm sm:-rotate-2">
                <p className="leading-tight">
                  &quot;my cat&apos;s magnet looks literally identical down to his goofy crooked
                  whisker. i screamed when i opened it!&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-1 font-bold text-primary">
                  <span>★★★★★</span>
                  <span className="text-on-secondary-container font-normal">@milo_and_beans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WALL OF LOVE — REAL CUSTOMER TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 6: PAST PROJECTS HALL OF FAME (Archive Gallery & Mosaic) */}
      <section
        id="past-projects"
        className="relative z-10 w-full px-5 md:px-10 py-14 max-w-7xl mx-auto flex flex-col gap-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] mb-2">
              ★ the unroooled museum
            </span>
            <h2 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
              past projects hall of fame
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-xl mt-1">
              A glimpse into the 500+ custom batches baked since 2023. Wedding gifts, mascot badges,
              indie coffee pins, and personal desk totems.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigate('past-projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center gap-1.5 self-start md:self-end"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            <span>open full museum archive</span>
          </button>
        </div>

        {/* Gallery Bento Grid with playful rotation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
          {PAST_PROJECTS.slice(0, 3).map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              className={`text-left bg-surface-container-lowest p-3.5 pb-5 rounded-[2rem] shadow-[3px_3px_0px_#1b1836] ${project.rotationClass} hover:rotate-0 transition-transform duration-300 flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-primary`}
            >
              <div className="w-full aspect-[4/3] rounded-[1rem] bg-surface-container-low overflow-hidden">
                <ResilientImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-1 gap-2">
                <span className="font-headline-sm text-[16px] lowercase text-on-surface">
                  {project.title}
                </span>
                <span className={`font-label-sm shrink-0 ${project.batchColorClass}`}>
                  {project.batchCode}
                </span>
              </div>
              <span className="font-body-sm text-[12px] text-on-surface-variant">
                {project.summary}
              </span>
            </button>
          ))}

          {/* Polaroid Tile 4: Clay Facts Card */}
          <div className="bg-secondary-fixed p-5 rounded-[2rem] shadow-[3px_3px_0px_#1b1836] sm:rotate-1 flex flex-col justify-between text-on-secondary-fixed">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-primary">verified</span>
                <span className="font-label-md uppercase tracking-wider">clay facts</span>
              </div>
              <h4 className="font-headline-sm lowercase">each piece takes ~48 hours</h4>
              <p className="font-body-sm opacity-90">
                From initial ball of clay to conditioning, precision hand-sculpting, 2-stage kiln
                baking, micro-painting, and UV gloss curing.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-on-secondary-fixed/20 flex items-center justify-between">
              <span className="font-label-sm lowercase font-bold">100% human made</span>
              <span className="text-primary text-[20px]">✦</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DIRECT & SIMPLE CUSTOM ORDER INQUIRY / DM FORM */}
      <CommissionTicketSection onSubmitTicket={onSubmitTicket} recentTickets={recentTickets} />
    </div>
  );
}
