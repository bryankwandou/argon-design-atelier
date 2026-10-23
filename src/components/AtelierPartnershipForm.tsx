import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierPartnershipForm() {
  const { t, locale } = useAtelier();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [scope, setScope] = useState('DESIGN_SYSTEM');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !company) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTicketId(`ATELIER-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    }, 900);
  };

  return (
    <section id="partnership" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Brief & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent font-bold">
                {t.partnership.tag}
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl text-fg font-normal leading-tight">
                {t.partnership.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base font-sans text-fg-muted leading-relaxed">
                {t.partnership.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-line">
              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-wire-green shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-xs font-bold text-fg">
                    {locale === 'id' ? 'Kerahasiaan NDA Enterprise' : 'Enterprise NDA Confidentiality'}
                  </span>
                  <p className="text-[11px] text-fg-muted mt-0.5">
                    {locale === 'id'
                      ? 'Seluruh spesifikasi sistem dan skema data mitra terlindungi perjanjian kerahasiaan penuh.'
                      : 'All architecture specifications and data schemas are strictly bound under bilateral NDA.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="size-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-xs font-bold text-fg">
                    {locale === 'id' ? 'Audit Arsitektur 24 Jam' : '24-Hour Architectural Scoping'}
                  </span>
                  <p className="text-[11px] text-fg-muted mt-0.5">
                    {locale === 'id'
                      ? 'Proposal teknis awal dan rekomendasi token sistem desain diserahkan dalam 24 jam kerja.'
                      : 'Preliminary technical proposals and token schema recommendations delivered within 24 business hours.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 rounded-2xl border border-line-strong bg-bg-elevated p-6 sm:p-8 md:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-wire-green/15 text-wire-green">
                  <CheckCircle2 className="size-7" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-fg font-normal">
                  {t.partnership.successTitle}
                </h3>
                <div className="inline-block rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-xs text-accent">
                  Case Record Ticket: {ticketId}
                </div>
                <p className="mx-auto max-w-md text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {t.partnership.successDesc}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="rounded-full border border-line bg-bg px-6 py-2.5 font-sans text-xs font-bold text-fg hover:border-accent transition-colors"
                  >
                    {locale === 'id' ? 'Kirim Permintaan Baru' : 'Submit Another Request'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                    {t.partnership.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.partnership.namePlaceholder}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Email & Company Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                      {t.partnership.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.partnership.emailPlaceholder}
                      className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                      {t.partnership.companyLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.partnership.companyPlaceholder}
                      className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Scope Selection */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                    {t.partnership.scopeLabel}
                  </label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="DESIGN_SYSTEM">{t.partnership.scopeDesignSystem}</option>
                    <option value="SPATIAL">{t.partnership.scopeSpatial}</option>
                    <option value="MULTI_AGENT">{t.partnership.scopeMultiAgent}</option>
                    <option value="FULLSTACK">{t.partnership.scopeFullstack}</option>
                  </select>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                    {t.partnership.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.partnership.messagePlaceholder}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-fg py-3.5 font-sans text-xs sm:text-sm font-semibold text-bg shadow-xl hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <Send className="size-4" />
                    <span>{submitting ? t.partnership.submitting : t.partnership.submit}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
