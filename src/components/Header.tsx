import { useState } from 'react';
import { IMAGES } from '../data/shopData';
import { PageView } from '../types';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { id: PageView; label: string }[] = [
  { id: 'shop-cute-drops', label: 'shop cute drops' },
  { id: 'custom-orders', label: 'custom orders' },
  { id: 'past-projects', label: 'past projects' },
  { id: 'our-story', label: 'our story' },
  { id: 'contact-and-dm', label: 'contact & dm' },
];

export function Header({ activePage, onNavigate, cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(27,24,54,0.04)]">
      <div className="h-16 sm:h-20 w-full px-4 md:px-6 xl:px-10 flex items-center justify-between gap-3 md:gap-4 max-w-[1440px] mx-auto">
        {/* Left Brand Zone */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('shop-cute-drops')}
            className="p-0.5 rounded-full bg-white shadow-[2px_2px_0px_#1b1836] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary overflow-hidden"
            aria-label="Go to unroooled home"
          >
            <ResilientImage
              src={IMAGES.logo}
              alt="unroooled logo"
              className="w-9 h-9 rounded-full object-contain scale-125"
            />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop-cute-drops')}
            className="flex items-baseline gap-1 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            <span className="font-headline-sm lowercase tracking-tighter text-on-surface">
              unroooled
            </span>
          </button>
          <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm -rotate-3 shadow-[1px_1px_0px_#1b1836] whitespace-nowrap shrink-0">
            clay club ★
          </span>
        </div>

        {/* Center Navigation Pill Island */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center bg-surface-container-low px-3 py-1.5 rounded-full shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2 rounded-full lowercase transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-primary ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-label-lg shadow-[2px_2px_0px_#1b1836]'
                    : 'text-on-surface-variant font-label-md hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="https://instagram.com/unroooled"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex px-4 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary hover:text-on-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1b1836] transition-all items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>DM us on IG ✦</span>
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag (${cartCount} items)`}
            className="relative p-2.5 rounded-full bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface-variant shadow-[2px_2px_0px_#1b1836] transition-all active:translate-x-[1px] active:translate-y-[1px] focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span className="material-symbols-outlined text-[20px] block">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-primary-container text-on-primary-container font-label-sm flex items-center justify-center shadow-[1px_1px_0px_#1b1836] tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2.5 rounded-full bg-surface-container hover:bg-secondary-container text-on-surface shadow-[2px_2px_0px_#1b1836] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] block">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-t border-outline-variant/30 px-4 sm:px-6 py-4 shadow-[0_8px_24px_rgba(27,24,54,0.1)]">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-full lowercase transition-all font-label-md ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container shadow-[2px_2px_0px_#1b1836]'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <a
              href="https://instagram.com/unroooled"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full px-4 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md lowercase shadow-[2px_2px_0px_#1b1836] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>DM us on IG ✦</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
