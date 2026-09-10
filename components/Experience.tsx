"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { useLang } from "./LanguageProvider";
import { ui, experience } from "@/lib/content";
import { accentBg, accentText, accentWash } from "@/lib/accents";

export function Experience() {
  const { t } = useLang();

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 bg-bg-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          index="02"
          kicker={t(ui.experience.kicker)}
          title={t(ui.experience.title)}
        />

        <div className="mt-12 space-y-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <article className="overflow-hidden rounded-3xl border border-line bg-card shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-6 py-5">
                  <div className="flex items-center gap-3">
                    {job.logo ? (
                      <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-line bg-white shadow-soft">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={44}
                          height={44}
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl ${accentWash[job.accent]} font-display text-sm font-bold ${accentText[job.accent]}`}
                      >
                        {job.company.slice(0, 2)}
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight">
                        {job.company}
                      </h3>
                      <p className="text-xs text-muted">{t(job.meta)}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-line">
                  {job.roles.map((role, ri) => (
                    <div key={ri} className="px-6 py-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="flex items-center gap-2 font-semibold text-ink">
                          <span className={`h-1.5 w-1.5 rounded-full ${accentBg[job.accent]}`} />
                          {t(role.title)}
                        </h4>
                        <span className="text-xs font-medium text-muted">
                          {t(role.period)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {t(role.body)}
                      </p>
                      {role.bullets && (
                        <ul className="mt-3 space-y-2">
                          {t(role.bullets).map((b, bi) => (
                            <li
                              key={bi}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                            >
                              <span
                                className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accentBg[job.accent]}`}
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
