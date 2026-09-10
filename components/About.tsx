"use client";

import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { useLang } from "./LanguageProvider";
import { ui } from "@/lib/content";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative scroll-mt-24 bg-bg-alt py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          index="04"
          kicker={t(ui.about.kicker)}
          title={t(ui.about.title)}
          className="max-w-3xl"
        />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.05}>
            <p className="leading-relaxed text-ink-soft">{t(ui.about.p1)}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="leading-relaxed text-ink-soft">{t(ui.about.p2)}</p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-peach-soft bg-peach-wash px-5 py-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card text-2xl shadow-soft">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 2l2.4 5.2L20 8l-4 4 1 6-5-2.8L7 18l1-6-4-4 5.6-.8L12 2z"
                  fill="#f5926f"
                />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-peach">
                {t(ui.about.funKicker)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {t(ui.about.fun)}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
