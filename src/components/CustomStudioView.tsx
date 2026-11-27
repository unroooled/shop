import { useState } from 'react';
import { IMAGES } from '../data/shopData';
import { CartItem, CommissionTicket } from '../types';

interface CustomStudioViewProps {
  onAddCustomToCart: (item: CartItem) => void;
  onSubmitTicket: (
    ticket: Omit<CommissionTicket, 'id' | 'createdAt' | 'estimatedPrice'>
  ) => CommissionTicket;
}

const VIBES = [
  { id: 'face-badge', label: 'customised face badge', basePrice: 60, icon: 'face', shape: 'blob' },
  { id: 'lip-balm', label: 'lip balm case', basePrice: 99, icon: 'spa', shape: 'blob' },
  { id: 'name-keychain', label: 'name keychain', basePrice: 150, icon: 'key', shape: 'blob' },
  { id: 'diva-combo', label: 'keychain + diva badge', basePrice: 238, icon: 'auto_awesome', shape: 'blob' },
  { id: 'badge-duo', label: '2 custom badges (penguin/cat)', basePrice: 250, icon: 'pets', shape: 'pet' },
  { id: 'fridge-magnet', label: 'fridge magnet', basePrice: 299, icon: 'attractions', shape: 'blob' },
  { id: 'four-badges', label: '4 custom badges pack', basePrice: 450, icon: 'palette', shape: 'flower' },
  { id: 'pet', label: 'pet portrait', basePrice: 150, icon: 'pets', shape: 'pet' },
  { id: 'fruit', label: 'weird fruit', basePrice: 125, icon: 'nutrition', shape: 'fruit' },
  { id: 'flower', label: 'chunky flower', basePrice: 125, icon: 'local_florist', shape: 'flower' },
  { id: 'blob', label: 'squishy blob', basePrice: 100, icon: 'sentiment_very_satisfied', shape: 'blob' },
];

const HARDWARES = [
  { id: 'pin', label: 'locking pin back', add: 0, icon: 'push_pin' },
  { id: 'magnet', label: 'neodymium fridge magnet', add: 30, icon: 'attractions' },
  { id: 'keychain', label: 'custom keychain loop', add: 20, icon: 'key' },
  { id: 'lipbalm', label: 'lip balm cap / sleeve fit', add: 0, icon: 'spa' },
];

const GLAZES = [
  { id: 'triple-gloss', label: 'triple-gloss uv resin', add: 0 },
  { id: 'satin-matte', label: 'velvet satin matte', add: 0 },
  { id: 'sparkle', label: 'holographic glitter coat', add: 20 },
];

const PALETTES = [
  { id: 'butter', name: 'butter yellow', hex: '#f5e071', cheek: '#df0b81' },
  { id: 'dopamine-pink', name: 'dopamine pink', hex: '#ffb0cb', cheek: '#df0b81' },
  { id: 'lilac-dream', name: 'lilac dream', hex: '#c9bfff', cheek: '#df0b81' },
  { id: 'sky-pop', name: 'sky pop', hex: '#8bd8ff', cheek: '#ff7aa8' },
  { id: 'matcha', name: 'matcha cream', hex: '#b7ecc7', cheek: '#ff7aa8' },
];

export function CustomStudioView({ onAddCustomToCart, onSubmitTicket }: CustomStudioViewProps) {
  const [selectedVibe, setSelectedVibe] = useState(VIBES[0]);
  const [selectedHardware, setSelectedHardware] = useState(HARDWARES[0]);
  const [selectedGlaze, setSelectedGlaze] = useState(GLAZES[0]);
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0]);
  const [quantity, setQuantity] = useState(1);
  const [customTitle, setCustomTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [igHandle, setIgHandle] = useState('');
  const [ticketSent, setTicketSent] = useState<CommissionTicket | null>(null);

  const unitPrice = selectedVibe.basePrice + selectedHardware.add + selectedGlaze.add;
  const hasBatchDiscount = quantity >= 15;
  const subtotal = unitPrice * quantity;
  const finalTotal = hasBatchDiscount ? Math.round(subtotal * 0.85) : subtotal;

  const handleAddConfigured = () => {
    const label = customTitle.trim()
      ? `custom ${selectedVibe.label}: ${customTitle.trim()}`
      : `custom ${selectedVibe.label}`;
    onAddCustomToCart({
      id: `custom-${selectedVibe.id}-${selectedHardware.id}-${selectedPalette.id}-${Date.now()}`,
      name: label.toLowerCase(),
      price: hasBatchDiscount ? Math.round(unitPrice * 0.85) : unitPrice,
      image: selectedVibe.id === 'pet' ? IMAGES.corgiMagnets : IMAGES.mascot,
      quantity,
      isCustom: true,
      meta: `${selectedHardware.label} · ${selectedPalette.name} · ${selectedGlaze.label}`,
      note: notes.trim() || undefined,
    });
  };

  const handleSendForQuote = () => {
    const created = onSubmitTicket({
      name: customTitle.trim() || 'custom studio guest',
      instagramHandle: igHandle.trim()
        ? igHandle.trim().startsWith('@')
          ? igHandle.trim()
          : `@${igHandle.trim()}`
        : '@unroooled_friend',
      vibe: selectedVibe.label,
      hardware: selectedHardware.label,
      details: `${quantity}x in ${selectedPalette.name}, ${selectedGlaze.label}. ${notes.trim()}`,
    });
    setTicketSent(created);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] mb-2 sm:-rotate-1">
            <span className="material-symbols-outlined text-[14px]">palette</span>
            <span>interactive commission bench</span>
          </span>
          <h1 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
            custom clay badge &amp; magnet studio <span className="text-primary-container">✦</span>
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
            Mix your clay palette, choose your hardware, preview the glaze, and claim a custom
            slot right into your bag or send a sketch ticket.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-surface-container-lowest shadow-[2px_2px_0px_#1b1836] font-label-sm lowercase text-on-surface self-start md:self-end">
          15+ pieces = automatic 15% event discount ★
        </div>
      </div>

      {/* Main Configurator Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Controls (7 cols) */}
        <div className="lg:col-span-7 min-w-0 bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-[5px_5px_0px_#1b1836] flex flex-col gap-6">
          {/* 1. Sculpture Vibe */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md lowercase text-on-surface">
              01. pick your sculpture vibe
            </span>
            <div className="flex flex-wrap gap-2">
              {VIBES.map((vibe) => {
                const active = selectedVibe.id === vibe.id;
                return (
                  <button
                    key={vibe.id}
                    type="button"
                    onClick={() => setSelectedVibe(vibe)}
                    className={`px-4 py-2 rounded-full font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{vibe.icon}</span>
                    <span>{vibe.label}</span>
                    <span className="opacity-70 tabular-nums">₹{vibe.basePrice}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Hardware */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md lowercase text-on-surface">
              02. choose hardware backing
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HARDWARES.map((hw) => {
                const active = selectedHardware.id === hw.id;
                return (
                  <button
                    key={hw.id}
                    type="button"
                    onClick={() => setSelectedHardware(hw)}
                    className={`px-4 py-3 rounded-2xl font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] transition-all flex items-center justify-between ${
                      active
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">{hw.icon}</span>
                      <span>{hw.label}</span>
                    </span>
                    <span className="tabular-nums">{hw.add === 0 ? 'included' : `+₹${hw.add}`}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Clay Palette */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md lowercase text-on-surface">
              03. primary pastel clay base ({selectedPalette.name})
            </span>
            <div className="flex flex-wrap gap-3">
              {PALETTES.map((pal) => {
                const active = selectedPalette.id === pal.id;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPalette(pal)}
                    aria-label={pal.name}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] transition-all ${
                      active
                        ? 'bg-on-surface text-surface'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-on-surface/30"
                      style={{ backgroundColor: pal.hex }}
                    />
                    <span>{pal.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Glaze Finish */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md lowercase text-on-surface">04. surface glaze coat</span>
            <div className="flex flex-wrap gap-2">
              {GLAZES.map((glaze) => {
                const active = selectedGlaze.id === glaze.id;
                return (
                  <button
                    key={glaze.id}
                    type="button"
                    onClick={() => setSelectedGlaze(glaze)}
                    className={`px-4 py-2 rounded-full font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] transition-all ${
                      active
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {glaze.label} {glaze.add > 0 ? `(+₹${glaze.add})` : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Name, Quantity & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm lowercase text-on-surface">
                pet name / badge label
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Mochi the Shiba"
                className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm lowercase text-on-surface">
                quantity (15+ saves 15%)
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-full bg-surface-container-low shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full hover:bg-surface-container-high font-label-lg"
                  >
                    -
                  </button>
                  <span className="font-headline-sm tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full hover:bg-surface-container-high font-label-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity(15)}
                  className="px-3 py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] whitespace-nowrap"
                >
                  15+ pack
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm lowercase text-on-surface">
                instagram @handle (for sketch pic)
              </label>
              <input
                type="text"
                value={igHandle}
                onChange={(e) => setIgHandle(e.target.value)}
                placeholder="@yourhandle"
                className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm lowercase text-on-surface">
                quirky features / ear markings
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. one floppy ear + tiny red bandana"
                className="w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] focus:outline-2 focus:outline-primary"
              />
            </div>
          </div>
        </div>

        {/* Right Live Tactile Preview & Summary (5 cols) */}
        <div className="lg:col-span-5 min-w-0 flex flex-col gap-5 lg:sticky lg:top-24">
          <div className="bg-surface-container-high p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-[5px_5px_0px_#1b1836] flex flex-col items-center text-center gap-4">
            <div className="w-full flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836]">
                live clay preview
              </span>
              <span className="font-label-sm lowercase text-tertiary">
                {selectedHardware.label}
              </span>
            </div>

            {/* Tactile Clay SVG Mockup */}
            <div className="w-48 h-48 sm:w-60 sm:h-60 max-w-full rounded-[2rem] bg-surface-container-lowest shadow-[inset_0_4px_10px_rgba(27,24,54,0.08)] flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[4px_6px_0px_rgba(27,24,54,0.25)]">
                {/* Keychain loop if keychain selected */}
                {selectedHardware.id === 'keychain' && (
                  <g>
                    <circle cx="100" cy="24" r="12" fill="none" stroke="#8d6f78" strokeWidth="5" />
                    <circle cx="100" cy="40" r="6" fill="#f5e071" stroke="#1b1836" strokeWidth="2.5" />
                  </g>
                )}

                {/* Base Clay Silhouette by Vibe */}
                {selectedVibe.shape === 'flower' ? (
                  <g>
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <circle
                        key={deg}
                        cx={100 + 36 * Math.cos((deg * Math.PI) / 180)}
                        cy={105 + 36 * Math.sin((deg * Math.PI) / 180)}
                        r="28"
                        fill={selectedPalette.hex}
                        stroke="#1b1836"
                        strokeWidth="3.5"
                      />
                    ))}
                    <circle cx="100" cy="105" r="34" fill="#fffbff" stroke="#1b1836" strokeWidth="3.5" />
                  </g>
                ) : selectedVibe.shape === 'pet' ? (
                  <g>
                    {/* Cute ears */}
                    <path d="M52 78 L42 34 L82 58 Z" fill={selectedPalette.hex} stroke="#1b1836" strokeWidth="3.5" strokeLinejoin="round" />
                    <path d="M148 78 L158 34 L118 58 Z" fill={selectedPalette.hex} stroke="#1b1836" strokeWidth="3.5" strokeLinejoin="round" />
                    <ellipse cx="100" cy="112" rx="56" ry="48" fill={selectedPalette.hex} stroke="#1b1836" strokeWidth="3.5" />
                  </g>
                ) : selectedVibe.shape === 'fruit' ? (
                  <g>
                    <path d="M96 42 Q100 22 118 24 Q112 46 96 42 Z" fill="#82c985" stroke="#1b1836" strokeWidth="3" />
                    <path
                      d="M100 45 C145 45 156 95 144 134 C134 162 115 168 100 168 C85 168 66 162 56 134 C44 95 55 45 100 45 Z"
                      fill={selectedPalette.hex}
                      stroke="#1b1836"
                      strokeWidth="3.5"
                    />
                  </g>
                ) : (
                  <path
                    d="M100 46 C138 44 160 72 158 108 C156 144 134 162 100 160 C66 162 44 142 42 108 C40 72 62 48 100 46 Z"
                    fill={selectedPalette.hex}
                    stroke="#1b1836"
                    strokeWidth="3.5"
                  />
                )}

                {/* Kawaii Eyes & Smile */}
                <circle cx="80" cy="105" r="6" fill="#1b1836" />
                <circle cx="78" cy="103" r="2" fill="#ffffff" />
                <circle cx="120" cy="105" r="6" fill="#1b1836" />
                <circle cx="118" cy="103" r="2" fill="#ffffff" />
                <ellipse cx="68" cy="116" rx="8" ry="4.5" fill={selectedPalette.cheek} opacity="0.6" />
                <ellipse cx="132" cy="116" rx="8" ry="4.5" fill={selectedPalette.cheek} opacity="0.6" />
                <path
                  d="M91 114 Q100 124 109 114"
                  fill="none"
                  stroke="#1b1836"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Glossy UV Highlight */}
                {selectedGlaze.id !== 'satin-matte' && (
                  <path
                    d="M66 66 Q84 56 104 60"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                )}
                {/* Sparkle specks */}
                {selectedGlaze.id === 'sparkle' && (
                  <g fill="#ffffff">
                    <circle cx="130" cy="75" r="3" />
                    <circle cx="70" cy="135" r="2.5" />
                    <circle cx="136" cy="130" r="2.5" />
                  </g>
                )}
              </svg>

              {customTitle.trim() && (
                <span className="absolute bottom-3 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm lowercase shadow-[1px_1px_0px_#1b1836] max-w-[90%] truncate">
                  {customTitle.trim()}
                </span>
              )}
            </div>

            {/* Pricing Breakdown */}
            <div className="w-full p-4 rounded-2xl bg-surface-container-lowest flex flex-col gap-2 text-left">
              <div className="flex justify-between font-body-sm text-on-surface-variant">
                <span>
                  {selectedVibe.label} × {quantity}
                </span>
                <span className="tabular-nums text-on-surface">₹{subtotal}</span>
              </div>
              {hasBatchDiscount && (
                <div className="flex justify-between font-label-sm text-primary">
                  <span>15% bulk event discount</span>
                  <span className="tabular-nums">-₹{subtotal - finalTotal}</span>
                </div>
              )}
              <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-baseline">
                <span className="font-label-md lowercase text-on-surface">estimated total</span>
                <span className="font-headline-md text-primary-container tabular-nums">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleAddConfigured}
                className="w-full py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                <span>add custom piece to bag ✿</span>
              </button>

              <button
                type="button"
                onClick={handleSendForQuote}
                className="w-full py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-container transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>save as sketch ticket instead</span>
              </button>

              {ticketSent && (
                <div className="p-3 rounded-2xl bg-secondary-fixed text-on-secondary-fixed font-label-sm lowercase shadow-[2px_2px_0px_#1b1836]">
                  saved ticket #{ticketSent.id}! we&apos;ll DM {ticketSent.instagramHandle} soon ✦
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
