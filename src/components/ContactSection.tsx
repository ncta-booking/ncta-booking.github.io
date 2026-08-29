import React, { useState, useEffect, useRef } from 'react';
import { Send, PhoneCall, Mail, MapPin, Sparkles, CheckCircle2, MessageSquare, MessageCircle, Instagram, Youtube, Facebook, Video, Share2 } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';

// NCTA hotline — the same number is used for calls, WhatsApp and Zalo.
const HOTLINE_LOCAL = '0906790700'; // display / tel / Zalo
const HOTLINE_INTL = '84906790700'; // WhatsApp requires country code, no leading 0

// Web3Forms delivers submissions to the owner's inbox. This key is public by
// design (it can only submit to the configured email, not read anything).
const WEB3FORMS_KEY = '2dc03b0a-20f0-4965-963c-2c1abd3e33d5';

interface ContactSectionProps {
  initialService?: string;
  initialProp?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, initialProp }) => {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'performance',
    eventDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        notes: prev.notes
          ? `${prev.notes} (${t('contact.noteServiceInterestParen')} ${initialService})`
          : `${t('contact.noteServiceInterest')} ${initialService}`
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialService]);

  useEffect(() => {
    if (initialProp) {
      setFormData((prev) => ({
        ...prev,
        serviceType: 'prop_custom',
        notes: prev.notes
          ? `${prev.notes} (${t('contact.notePropConsultParen')} ${initialProp})`
          : `${t('contact.notePropConsult')} ${initialProp}`
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProp]);

  const serviceTypeLabel = (): string => {
    switch (formData.serviceType) {
      case 'performance':
        return t('contact.optPerformance');
      case 'prop_custom':
        return t('contact.optPropCustom');
      case 'prop_rental':
        return t('contact.optPropRental');
      case 'workshop':
        return t('contact.optWorkshop');
      case 'other':
        return t('contact.optOther');
      default:
        return formData.serviceType;
    }
  };

  // Assemble the form into a readable message for WhatsApp / Zalo.
  const buildMessage = (): string => {
    return [
      `🎇 NCTA — ${t('contact.badge')}`,
      `• ${t('contact.labelName')}: ${formData.name}`,
      `• ${t('contact.labelPhone')}: ${formData.phone}`,
      formData.email ? `• ${t('contact.labelEmail')}: ${formData.email}` : '',
      `• ${t('contact.labelServiceType')}: ${serviceTypeLabel()}`,
      formData.eventDate ? `• ${t('contact.labelDate')}: ${formData.eventDate}` : '',
      formData.notes ? `• ${t('contact.labelNotes')}: ${formData.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${HOTLINE_INTL}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openZalo = () => {
    // Zalo's chat link has no pre-fill param, so copy the message for pasting.
    if (navigator.clipboard) {
      navigator.clipboard.writeText(buildMessage()).catch(() => {});
    }
    window.open(`https://zalo.me/${HOTLINE_LOCAL}`, '_blank', 'noopener,noreferrer');
  };

  // Primary submit — email the request to the owner via Web3Forms (guaranteed
  // capture). Native required-field validation runs before this fires.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: real users never fill this hidden field; bots do.
    const honeypot = formRef.current?.elements.namedItem('botcheck') as HTMLInputElement | null;
    if (honeypot && honeypot.value) return;

    setIsSubmitting(true);
    setError(false);

    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `NCTA — ${serviceTypeLabel()} — ${formData.name}`,
      from_name: 'NCTA Website',
      name: formData.name,
      phone_zalo: formData.phone,
      service: serviceTypeLabel(),
      event_date: formData.eventDate,
      message: formData.notes,
    };
    // Reply straight to the customer when they leave an email.
    if (formData.email) {
      payload.email = formData.email;
      payload.replyto = formData.email;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick-chat buttons aren't submits, so enforce required fields manually.
  const handleWhatsApp = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;
    openWhatsApp();
    setSubmitted(true);
  };

  const handleZalo = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;
    openZalo();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0d0d15] border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#f00ac0]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#00e5ff]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('contact.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#8b2fe8] to-[#f00ac0]">NCTA</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Direct Information Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-[#12121e] border border-purple-500/30 shadow-xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00e5ff]" />
                <span>{t('contact.directTitle')}</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t('contact.directDesc')}
              </p>

              {/* Direct Quick Contact Items */}
              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${HOTLINE_LOCAL}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00e5ff]/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">{t('contact.hotlineLabel')}</span>
                    <p className="text-sm font-display font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                      0906 790 700
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:nctavn@gmail.com"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#f00ac0]/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f00ac0]/10 border border-[#f00ac0]/30 flex items-center justify-center text-[#f00ac0] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(240,10,192,0.3)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">{t('contact.emailLabel')}</span>
                    <p className="text-sm font-display font-bold text-white group-hover:text-[#f00ac0] transition-colors">
                      nctavn@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-[#ff8a00]/10 border border-[#ff8a00]/30 flex items-center justify-center text-[#ff8a00]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">{t('contact.studioLabel')}</span>
                    <p className="text-sm text-slate-200">
                      {t('contact.studioAddress')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels with Glowing Hover */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  {t('contact.socialLabel')}
                </span>
                
                <div className="flex items-center gap-3">
                  {[
                    { name: 'Instagram', icon: Instagram, color: '#f00ac0', href: 'https://instagram.com' },
                    { name: 'TikTok', icon: Video, color: '#00e5ff', href: 'https://www.tiktok.com/@nguoichetao' },
                    { name: 'YouTube', icon: Youtube, color: '#ff0000', href: 'https://youtube.com' },
                    { name: 'Facebook', icon: Facebook, color: '#1877f2', href: 'https://www.facebook.com/nghiatannct' },
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-[#1a1a2b] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
                      style={{
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                      }}
                      title={soc.name}
                    >
                      <soc.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Note about Domain */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 flex items-center justify-between">
              <span className="font-mono text-slate-400">{t('contact.domainLabel')}</span>
              <span className="font-mono font-bold text-[#00e5ff]">https://ncta.vn</span>
            </div>

          </div>

          {/* Interactive Booking & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#12121e] border border-white/10 shadow-2xl relative overflow-hidden">
              
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00ff88]/20 border-2 border-[#00ff88] flex items-center justify-center text-[#00ff88] shadow-[0_0_25px_rgba(0,255,136,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                    {t('contact.successBefore')}<strong>NCTA</strong>{t('contact.successAfter')}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        serviceType: 'performance',
                        eventDate: '',
                        notes: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                  >
                    {t('contact.successAgain')}
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        {t('contact.labelName')} <span className="text-[#f00ac0]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('contact.placeholderName')}
                        className="w-full px-4 py-3 rounded-xl bg-[#19192b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                      />
                    </div>

                    {/* Phone / Zalo */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        {t('contact.labelPhone')} <span className="text-[#f00ac0]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('contact.placeholderPhone')}
                        className="w-full px-4 py-3 rounded-xl bg-[#19192b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        {t('contact.labelEmail')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#19192b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        {t('contact.labelServiceType')}
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#19192b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                      >
                        <option value="performance">{t('contact.optPerformance')}</option>
                        <option value="prop_custom">{t('contact.optPropCustom')}</option>
                        <option value="prop_rental">{t('contact.optPropRental')}</option>
                        <option value="workshop">{t('contact.optWorkshop')}</option>
                        <option value="other">{t('contact.optOther')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Event / Desired Date */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      {t('contact.labelDate')}
                    </label>
                    <input
                      type="text"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      placeholder={t('contact.placeholderDate')}
                      className="w-full px-4 py-3 rounded-xl bg-[#19192b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                    />
                  </div>

                  {/* Notes / Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      {t('contact.labelNotes')}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={t('contact.placeholderNotes')}
                      className="w-full px-4 py-3 rounded-xl bg-[#19192b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all resize-none"
                    />
                  </div>

                  {/* Honeypot (anti-spam) — hidden from real users */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {/* Primary: email the request to the owner (Web3Forms) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] text-white font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(240,10,192,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('contact.submitting')}
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('contact.submit')}</span>
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-[11px] text-center text-red-400">{t('contact.sendError')}</p>
                  )}

                  {/* Quick chat channels — same hotline number */}
                  <div className="pt-2">
                    <p className="text-[11px] text-center text-slate-500 mb-2">{t('contact.orQuickChat')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all hover:scale-[1.02] active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t('contact.sendWhatsApp')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleZalo}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0068FF] to-[#0047b3] text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,104,255,0.3)] hover:shadow-[0_0_30px_rgba(0,104,255,0.5)] transition-all hover:scale-[1.02] active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t('contact.sendZalo')}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-center text-slate-400 leading-relaxed">
                    {t('contact.sendHint')}
                  </p>
                  <p className="text-[11px] text-center text-slate-400">
                    {t('contact.privacy')}
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
