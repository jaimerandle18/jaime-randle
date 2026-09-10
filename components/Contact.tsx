"use client";

import { useState } from "react";
import { Copy, Check, Mail, FileText } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "./LanguageProvider";
import { ui, contactInfo } from "@/lib/content";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className={className} aria-hidden>
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3v10zM6.5 7.7a1.8 1.8 0 1 1 0-3.5 1.8 1.8 0 0 1 0 3.5zM19 19h-3v-5.3c0-1.3-.5-2.1-1.6-2.1-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.3c.4-.6 1.1-1.5 2.8-1.5 2 0 3.6 1.3 3.6 4.2V19z" />
    </svg>
  );
}

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  const socials = [
    { icon: GithubIcon, label: contactInfo.githubLabel, href: contactInfo.github },
    { icon: LinkedinIcon, label: contactInfo.linkedinLabel, href: contactInfo.linkedin },
    {
      icon: ({ className }: { className?: string }) => (
        <FileText size={15} className={className} />
      ),
      label: t(ui.nav.resume),
      href: contactInfo.resume,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card p-8 shadow-lift sm:p-14">
            {/* aurora */}
            <div className="pointer-events-none absolute inset-0 -z-0">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lav-soft aurora animate-float-slow" />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-mint-soft aurora animate-float-slower" />
            </div>

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lav">
                {t(ui.contact.kicker)}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                {t(ui.contact.title)}
              </h2>
              <p className="mt-4 max-w-md text-ink-soft">{t(ui.contact.sub)}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="btn-glow inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-bg shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Mail size={16} />
                  {t(ui.contact.emailCta)}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-lav/50 hover:bg-lav-wash"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-mint" />
                      {t(ui.contact.copied)}
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      {contactInfo.email}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-lav/40 hover:text-ink"
                  >
                    <s.icon className="text-lav" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted sm:flex-row">
        <p>
          © {2026} Jaime Randle. {t(ui.footer.rights)}
        </p>
        <p className="text-xs">{t(ui.footer.built)}</p>
      </div>
    </footer>
  );
}
