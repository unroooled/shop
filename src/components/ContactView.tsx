import { useState } from 'react';
import { FAQ_ITEMS } from '../data/shopData';
import { CommissionTicket } from '../types';
import { CommissionTicketSection } from './CommissionTicketSection';

interface ContactViewProps {
  onSubmitTicket: (
    ticket: Omit<CommissionTicket, 'id' | 'createdAt' | 'estimatedPrice'>
  ) => CommissionTicket;
  recentTickets: CommissionTicket[];
}

export function ContactView({ onSubmitTicket, recentTickets }: ContactViewProps) {
  const [copiedDm, setCopiedDm] = useState(false);

  const dmTemplate =
    'hi unroooled! ✿ i would love to order a custom clay piece (pet magnet / tote pin). here is my idea: ';

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(dmTemplate);
      setCopiedDm(true);
      setTimeout(() => setCopiedDm(false), 2400);
    } catch {
      setCopiedDm(true);
      setTimeout(() => setCopiedDm(false), 2400);
    }
  };

  return (
    <div className="w-full py-8 flex flex-col gap-10">
      <div className="px-5 md:px-10 max-w-5xl mx-auto w-full flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm lowercase w-max shadow-[2px_2px_0px_#1b1836]">
          <span className="material-symbols-outlined text-[14px]">chat</span>
          <span>direct studio hotline</span>
        </span>
        <h1 className="font-headline-lg lowercase font-extrabold text-on-surface tracking-tight">
          contact &amp; DM the clay club ✦
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl">
          Whether you want a goofy portrait of your cat, 50 wedding favor pins, or help tracking a
          parcel, drop a ticket below or DM @unroooled anytime.
        </p>

        {/* Quick-copy Instagram DM starter */}
        <div className="mt-3 p-4 rounded-[1.5rem] bg-surface-container-lowest shadow-[3px_3px_0px_#1b1836] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="font-label-sm lowercase text-tertiary">quick DM starter message</span>
            <p className="font-body-sm text-on-surface truncate">&quot;{dmTemplate}&quot;</p>
          </div>
          <button
            type="button"
            onClick={handleCopyTemplate}
            className="px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm lowercase shadow-[2px_2px_0px_#1b1836] hover:bg-secondary-fixed transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copiedDm ? 'check' : 'content_copy'}
            </span>
            <span>{copiedDm ? 'copied to clipboard!' : 'copy DM template'}</span>
          </button>
        </div>
      </div>

      {/* Commission Ticket Section */}
      <CommissionTicketSection onSubmitTicket={onSubmitTicket} recentTickets={recentTickets} />

      {/* Submitted Tickets List if any */}
      {recentTickets.length > 0 && (
        <section className="px-5 md:px-10 max-w-5xl mx-auto w-full flex flex-col gap-3">
          <h2 className="font-headline-sm lowercase text-on-surface">your submitted requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-[1.5rem] bg-surface-container-lowest shadow-[3px_3px_0px_#1b1836] flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-primary">#{t.id}</span>
                  <span className="font-label-sm text-on-surface-variant">{t.createdAt}</span>
                </div>
                <span className="font-headline-sm text-[17px] lowercase text-on-surface">
                  {t.vibe} · {t.instagramHandle}
                </span>
                <p className="font-body-sm text-on-surface-variant line-clamp-2">{t.details}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick FAQs */}
      <section className="px-5 md:px-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAQ_ITEMS.map((faq) => (
          <div
            key={faq.question}
            className="p-5 rounded-[1.75rem] bg-surface-container-low shadow-[3px_3px_0px_#1b1836] flex flex-col gap-2"
          >
            <h3 className="font-headline-sm text-[16px] lowercase text-on-surface">
              {faq.question}
            </h3>
            <p className="font-body-sm text-on-surface-variant">{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
