import { useState } from 'react';
import { FAQ_ITEMS, IMAGES, STUDIO_STEPS } from '../data/shopData';
import { PageView } from '../types';
import { ResilientImage } from './ResilientImage';

interface OurStoryViewProps {
  onNavigate: (page: PageView) => void;
}

export function OurStoryView({ onNavigate }: OurStoryViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 max-w-6xl mx-auto flex flex-col gap-10 sm:gap-12">
      {/* Studio Story Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm lowercase w-max shadow-[2px_2px_0px_#1b1836] sm:-rotate-1">
            ✦ inside the clay laboratory
          </span>
          <h1 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
            two messy hands, one tiny oven, endless pastel clay
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            unroooled started at a sunlit kitchen table in 2023 with three blocks of polymer clay
            and an obsession with turning goofy pet photos into glossy desk companions.
          </p>
          <p className="font-body-md text-on-surface-variant">
            Every magnet, badge, and keychain is conditioned by hand (no molds!), double-baked for
            strength, hand-painted with superfine brushes, and sealed in crystal-clear UV resin.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('shop-cute-drops')}
              className="px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary transition-all"
            >
              shop drop 04 ✿
            </button>
            <button
              type="button"
              onClick={() => onNavigate('custom-orders')}
              className="px-6 py-3 rounded-full bg-surface-container-lowest text-on-surface font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-secondary-container transition-all"
            >
              commission a piece ✎
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 min-w-0">
          <div className="bg-surface-container-lowest p-2.5 sm:p-3 rounded-[2rem] shadow-[5px_5px_0px_#1b1836] sm:rotate-1">
            <ResilientImage
              src={IMAGES.studioHands}
              alt="Artisan hands sculpting pastel clay charms"
              className="w-full h-[260px] sm:h-[360px] object-cover rounded-[1.4rem]"
            />
          </div>
        </div>
      </section>

      {/* 48-Hour Process */}
      <section className="bg-surface-container-low p-6 md:p-8 rounded-[2.5rem] shadow-[4px_4px_0px_#1b1836] flex flex-col gap-6">
        <div>
          <h2 className="font-headline-md lowercase text-on-surface">
            how a lump of clay becomes your favorite badge (~48 hrs)
          </h2>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Zero shortcuts, zero plastic molds, 100% waterproof finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STUDIO_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-surface-container-lowest p-5 rounded-[1.75rem] shadow-[3px_3px_0px_#1b1836] flex flex-col gap-2.5"
            >
              <span
                className={`w-9 h-9 rounded-full font-label-md flex items-center justify-center shadow-[1px_1px_0px_#1b1836] tabular-nums ${step.bgClass}`}
              >
                {step.number}
              </span>
              <h3 className="font-headline-sm lowercase text-on-surface">{step.title}</h3>
              <p className="font-body-sm text-on-surface-variant">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Charm Care & Shipping */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary-fixed p-6 rounded-[2rem] shadow-[4px_4px_0px_#1b1836] text-on-secondary-fixed flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">spa</span>
            <h3 className="font-headline-sm lowercase">charm care guide</h3>
          </div>
          <ul className="font-body-sm flex flex-col gap-2 list-disc pl-5">
            <li>Resin-glazed clay is splash-proof and ready for rainy tote-bag commutes.</li>
            <li>Wipe gently with a soft microfiber cloth; avoid harsh acetone or soaking.</li>
            <li>Keep away from direct stovetop heat or playful chewing pups!</li>
          </ul>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-[4px_4px_0px_#1b1836] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            <h3 className="font-headline-sm lowercase text-on-surface">
              shipping &amp; plastic-free packing
            </h3>
          </div>
          <ul className="font-body-sm text-on-surface-variant flex flex-col gap-2 list-disc pl-5">
            <li>Ready-to-ship drops dispatch every Tuesday &amp; Friday across India with tracking.</li>
            <li>Custom pieces take 5–7 studio days (plus progress photo approval!).</li>
            <li>Free tracked pan-India shipping on orders ₹499+ tucked in biodegradable honeycomb paper.</li>
          </ul>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="flex flex-col gap-4">
        <h2 className="font-headline-md lowercase text-on-surface">frequently squished questions</h2>
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-surface-container-lowest rounded-[1.5rem] shadow-[3px_3px_0px_#1b1836] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-headline-sm text-[17px] lowercase text-on-surface"
                >
                  <span>{item.question}</span>
                  <span className="material-symbols-outlined text-primary shrink-0">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 font-body-sm text-on-surface-variant border-t border-outline-variant/30 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
