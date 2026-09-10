"use client";

import { motion } from "framer-motion";
import { staggerChild, staggerParent } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { useLang } from "./LanguageProvider";
import { ui, skills } from "@/lib/content";
import { accentBg, accentText, accentWash } from "@/lib/accents";

export function Skills() {
  const { t } = useLang();

  return (
    <section className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="03"
          kicker={t(ui.skills.kicker)}
          title={t(ui.skills.title)}
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((group) => (
            <motion.div
              key={group.label.en}
              variants={staggerChild}
              className="rounded-2xl border border-line bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accentBg[group.accent]}`} />
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-soft">
                  {t(group.label)}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-lg ${accentWash[group.accent]} px-2.5 py-1 text-sm font-medium ${accentText[group.accent]}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
