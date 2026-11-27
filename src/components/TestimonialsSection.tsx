import { TESTIMONIALS } from '../data/shopData';
import { ResilientImage } from './ResilientImage';

export function TestimonialsSection() {
  return (
    <section className="relative z-10 w-full px-5 md:px-10 py-14 bg-surface-container-low my-5">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] -rotate-1">
            <span className="material-symbols-outlined text-[14px]">favorite</span>
            <span>wall of love</span>
          </span>
          <h2 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
            happy unboxings <span className="text-primary-container">✦</span>
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg">
            Real DMs and reactions from real people — straight from their WhatsApp to your screen.
          </p>
        </div>

        {/* Masonry-style screenshot wall */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className={`break-inside-avoid inline-block w-full bg-surface-container-lowest rounded-[1.5rem] shadow-[3px_3px_0px_#1b1836] overflow-hidden hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1b1836] transition-all duration-300 ${t.rotation}`}
            >
              <ResilientImage
                src={t.image}
                alt={t.quote}
                className="w-full object-cover rounded-t-[1.5rem]"
              />
              <div className="px-3 py-2.5">
                <p className="font-body-sm text-on-surface-variant text-[11px] leading-snug line-clamp-3">
                  {t.quote}
                </p>
                <span className="mt-1.5 inline-block font-label-sm text-[10px] text-primary lowercase">
                  — {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust nudge */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
            <span>all reactions 100% unsolicited</span>
          </span>
          <span className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-secondary">chat</span>
            <span>real whatsapp & instagram dms</span>
          </span>
        </div>
      </div>
    </section>
  );
}
