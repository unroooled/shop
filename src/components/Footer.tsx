import { FormEvent, useState } from 'react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribedEmail(email.trim());
    setEmail('');
  };

  const goTo = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-low relative overflow-hidden mt-14">
      {/* Top Scrolling Yellow Ticker */}
      <div className="w-full bg-secondary-container py-2.5 text-on-secondary-container overflow-hidden flex items-center shadow-[inset_0_2px_0_rgba(255,255,255,0.7)]">
        <div className="animate-marquee items-center gap-8 whitespace-nowrap font-label-md uppercase tracking-wider">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8">
              <span>✦ tiny charms, big joy</span>
              <span aria-hidden="true">•</span>
              <span>air-dry &amp; polymer handcrafted</span>
              <span aria-hidden="true">•</span>
              <span>squishy vibe magnets</span>
              <span aria-hidden="true">•</span>
              <span>batch drop 04 restocked</span>
              <span aria-hidden="true">•</span>
              <span>pan-india clay dispatch</span>
              <span aria-hidden="true">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 md:px-10 py-10 sm:py-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {/* Brand Summary */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col gap-3 min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md lowercase text-on-surface">unroooled</span>
              <span className="font-headline-sm text-primary-container">✦</span>
            </div>
            <p className="font-body-sm text-on-surface-variant max-w-sm">
              handcrafted tactile sculptures, glossy fridge magnets, statement badges, and soft art
              school dopamine for your daily routine.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <a
                href="https://instagram.com/unroooled"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-container hover:text-on-secondary-container transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">alternate_email</span>
                <span>unroooled</span>
              </a>
              <button
                type="button"
                onClick={() => goTo('custom-orders')}
                className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm shadow-[2px_2px_0px_#1b1836] hover:bg-primary-container hover:text-on-primary-container transition-all"
              >
                studio open
              </button>
            </div>
          </div>

          {/* Restock Alerts Signup */}
          <div className="md:col-span-2 md:order-3 lg:order-2 lg:col-span-5 flex flex-col gap-3 bg-surface-container-lowest p-5 sm:p-6 md:p-8 rounded-[2rem] shadow-[3px_3px_0px_#1b1836] min-w-0">
            <span className="font-headline-sm lowercase text-on-surface flex items-center gap-2">
              restock alerts 💌
            </span>
            <p className="font-body-sm text-on-surface-variant">
              drops sell out quick! get a cute nudge 15 minutes before the next charm batch goes
              live.
            </p>
            {subscribedEmail ? (
              <div className="mt-1 px-4 py-3 rounded-2xl bg-secondary-fixed text-on-secondary-fixed font-label-sm lowercase flex flex-wrap items-center justify-between gap-2 shadow-[2px_2px_0px_#1b1836]">
                <span className="break-all">yay! {subscribedEmail} is on the drop 05 VIP list ✨</span>
                <button
                  type="button"
                  onClick={() => setSubscribedEmail(null)}
                  className="underline hover:text-primary shrink-0"
                >
                  change
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-1 min-w-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="claylover@sweetmail.com"
                  aria-label="Email for restock alerts"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-primary hover:text-on-primary active:translate-x-[1px] active:translate-y-[1px] transition-all whitespace-nowrap shrink-0"
                >
                  join list ✨
                </button>
              </form>
            )}
          </div>

          {/* Guarantee & Footer Links */}
          <div className="md:col-span-1 md:order-2 lg:order-3 lg:col-span-3 flex flex-col items-start md:items-end justify-between h-full gap-6 min-w-0">
            <div className="p-5 rounded-[2rem] bg-secondary-fixed text-on-secondary-fixed sm:rotate-2 shadow-[3px_3px_0px_#1b1836] w-full sm:max-w-[230px]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm uppercase tracking-wide">clay guarantee</span>
              </div>
              <p className="font-label-sm lowercase leading-tight opacity-90">
                100% pinched, baked, coated &amp; packaged by two messy human hands.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-on-surface-variant font-label-sm lowercase">
              <button
                type="button"
                onClick={() => goTo('our-story')}
                className="hover:text-primary transition-colors"
              >
                shipping &amp; packing
              </button>
              <button
                type="button"
                onClick={() => goTo('contact-and-dm')}
                className="hover:text-primary transition-colors"
              >
                faq
              </button>
              <button
                type="button"
                onClick={() => goTo('our-story')}
                className="hover:text-primary transition-colors"
              >
                charm care
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-5 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-label-sm lowercase">
          <span>© 2026 unroooled ceramic &amp; clay laboratory. all rights squished.</span>
          <span>crafted with dopamine &amp; kiln love</span>
        </div>
      </div>
    </footer>
  );
}
