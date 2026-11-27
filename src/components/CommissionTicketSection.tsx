import { FormEvent, useState } from 'react';
import { CommissionTicket } from '../types';

interface CommissionTicketSectionProps {
  onSubmitTicket: (ticket: Omit<CommissionTicket, 'id' | 'createdAt' | 'estimatedPrice'>) => CommissionTicket;
  recentTickets?: CommissionTicket[];
}

export function CommissionTicketSection({
  onSubmitTicket,
  recentTickets = [],
}: CommissionTicketSectionProps) {
  const [name, setName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [vibe, setVibe] = useState('Customised Face Badge (₹60)');
  const [hardware, setHardware] = useState('Locking Pin Back (Jacket/Tote)');
  const [details, setDetails] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<CommissionTicket | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !instagramHandle.trim()) return;
    const created = onSubmitTicket({
      name: name.trim(),
      instagramHandle: instagramHandle.trim().startsWith('@')
        ? instagramHandle.trim()
        : `@${instagramHandle.trim()}`,
      vibe,
      hardware,
      details: details.trim() || 'surprise me with studio pastels!',
    });
    setSubmittedTicket(created);
    setName('');
    setInstagramHandle('');
    setDetails('');
  };

  return (
    <section
      id="custom-inquiry"
      className="relative z-10 w-full px-4 sm:px-6 md:px-10 py-12 sm:py-14 max-w-5xl mx-auto flex flex-col items-center"
    >
      {/* Outer Card Shell */}
      <div className="w-full bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-[6px_6px_0px_#1b1836] flex flex-col gap-6 sm:gap-8 relative overflow-hidden">
        {/* Top banner strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
          <div>
            <span className="font-label-sm lowercase text-primary-container font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">draw</span>
              <span>custom commission ticket</span>
            </span>
            <h3 className="font-headline-md lowercase font-bold text-on-surface mt-1">
              tell us what to unroll for you! ✎
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-sm lowercase">
              estimated reply: ~3 hours
            </span>
          </div>
        </div>

        {/* Two-Column Interactive Inquiry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Cute Inquiry Form or Confirmation Receipt */}
          <div className="lg:col-span-7 min-w-0">
            {submittedTicket ? (
              <div className="p-6 rounded-[2rem] bg-surface-container-low border-2 border-dashed border-primary/30 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm lowercase shadow-[2px_2px_0px_#1b1836]">
                    ticket #{submittedTicket.id} received ✿
                  </span>
                  <span className="font-label-sm lowercase text-primary tabular-nums">
                    est. ₹{submittedTicket.estimatedPrice}
                  </span>
                </div>
                <h4 className="font-headline-sm lowercase text-on-surface">
                  yay {submittedTicket.name}! your clay ticket is in our studio queue
                </h4>
                <p className="font-body-sm text-on-surface-variant">
                  we&apos;ll DM <strong className="text-on-surface">{submittedTicket.instagramHandle}</strong>{' '}
                  within ~3 studio hours to confirm colors &amp; sketch your{' '}
                  <strong className="text-on-surface">{submittedTicket.vibe.toLowerCase()}</strong>.
                </p>
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest font-label-sm lowercase text-on-surface-variant flex flex-col gap-1 shadow-[inset_0_1px_3px_rgba(27,24,54,0.06)]">
                  <span>hardware: {submittedTicket.hardware.toLowerCase()}</span>
                  <span className="truncate">notes: {submittedTicket.details}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="self-start px-5 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-container transition-all"
                >
                  send another request ✎
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm lowercase text-on-surface">
                      your name / nickname
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Cleo"
                      className="w-full px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-2 focus:outline-primary focus:bg-surface shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm lowercase text-on-surface">
                      instagram @handle (for DMs)
                    </label>
                    <input
                      type="text"
                      required
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="@yourhandle"
                      className="w-full px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-2 focus:outline-primary focus:bg-surface shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1 min-w-0">
                    <label className="font-label-sm lowercase text-on-surface">
                      what vibe do you want?
                    </label>
                    <select
                      value={vibe}
                      onChange={(e) => setVibe(e.target.value)}
                      className="w-full max-w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm focus:outline-2 focus:outline-primary focus:bg-surface shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] truncate"
                    >
                      <option>Customised Face Badge (₹60)</option>
                      <option>Lip Balm Case (₹99)</option>
                      <option>Personalised Name Keychain (₹150)</option>
                      <option>Custom Keychain &amp; Diva Badge Combo (₹238)</option>
                      <option>2 Custom Badges — Penguin, Cat or Custom (₹250–₹300)</option>
                      <option>Fridge Magnet + Pan-India Shipping (₹349)</option>
                      <option>4 Custom Badges Pack — BG, Cat &amp; More (₹450–₹796)</option>
                      <option>Custom Pet Avatar / Weird Fruit / Chunky Flower</option>
                      <option>Something completely weird &amp; custom</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <label className="font-label-sm lowercase text-on-surface">
                      finish &amp; hardware
                    </label>
                    <select
                      value={hardware}
                      onChange={(e) => setHardware(e.target.value)}
                      className="w-full max-w-full px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-sm focus:outline-2 focus:outline-primary focus:bg-surface shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] truncate"
                    >
                      <option>Locking Pin Back (Jacket/Tote)</option>
                      <option>Heavy Neodymium Fridge Magnet</option>
                      <option>Custom Keychain Loop</option>
                      <option>Lip Balm Case / Tube Cap Fit</option>
                      <option>Desk Standing Base</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm lowercase text-on-surface">
                    describe your dream charm or attach details
                  </label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us colors, pet breed, quirky features, or links to photos..."
                    className="w-full px-5 py-3 rounded-[1.5rem] bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-2 focus:outline-primary focus:bg-surface shadow-[inset_0_2px_4px_rgba(27,24,54,0.06)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-1 py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg lowercase shadow-[3px_3px_0px_#1b1836] hover:bg-primary hover:text-on-primary active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  <span>send custom request ✿</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Instagram DM Card */}
          <div className="lg:col-span-5 min-w-0 flex flex-col gap-4 p-5 bg-secondary-container text-on-secondary-container rounded-[2rem] shadow-[3px_3px_0px_#1b1836]">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-full bg-surface-container-lowest text-primary shadow-[2px_2px_0px_#1b1836]">
                <span className="material-symbols-outlined text-[20px] block">chat_bubble</span>
              </span>
              <h4 className="font-headline-sm lowercase">prefer direct DMs?</h4>
            </div>

            <p className="font-body-sm leading-relaxed">
              Skip forms entirely! Shoot us photos of your dog, inspiration sketches, or color
              palettes straight on Instagram. We brainstorm &amp; quote right in the chat.
            </p>

            <div className="bg-surface-container-lowest p-3 rounded-2xl text-on-surface flex items-center justify-between gap-2 shadow-[2px_2px_0px_#1b1836]">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="font-label-md truncate">@unroooled</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm whitespace-nowrap">
                  online now
                </span>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">send</span>
            </div>

            <a
              href="https://instagram.com/unroooled"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-surface-container-lowest text-on-surface font-label-md lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-surface-container-high transition-all text-center flex items-center justify-center gap-2"
            >
              <span>open instagram @unroooled</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>

            <div className="pt-2 border-t border-on-secondary-container/20 flex flex-wrap items-center justify-between gap-2 text-[12px] font-label-sm">
              <span>✓ sketch approved before bake</span>
              <span>✓ pan-india shipping</span>
            </div>
          </div>
        </div>

        {/* Recent Studio Queue Counter (only if tickets have been submitted) */}
        {recentTickets.length > 0 && (
          <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm lowercase">
            <span>
              your saved commission tickets this session:{' '}
              <strong className="text-on-surface tabular-nums">{recentTickets.length}</strong>
            </span>
            <span>
              latest: #{recentTickets[0].id} · {recentTickets[0].vibe.toLowerCase()}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
