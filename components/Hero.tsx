"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { Counter } from "./Chrome";
import { ui, marqueeStack } from "@/lib/content";

const stats = [
  { value: 5, suffix: "+", key: "years" as const },
  { value: 3, suffix: "", key: "projects" as const },
  { value: 2, suffix: "", key: "stores" as const },
  { value: 3, suffix: "", key: "domains" as const },
];

export function Hero() {
  const { t } = useLang();

  // Mouse tilt/parallax on the photo card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onCardLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      {/* mesh + aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="mesh absolute inset-0 opacity-45 blur-2xl" />
        <div className="absolute -left-24 top-10 h-[380px] w-[380px] rounded-full bg-lav-soft aurora animate-float-slow" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-sky-soft aurora animate-float-slower" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            {t(ui.hero.available)}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-ink-soft"
          >
            <span>Jaime Randle</span>
            <span className="h-1 w-1 rounded-full bg-lav" />
            <span className="text-muted">{t(ui.hero.role)}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.02em] text-balance sm:text-[3.7rem]"
          >
            {t(ui.hero.headline)
              .split(" ")
              .map((word, i, arr) => {
                const isLast = i >= arr.length - 2;
                return (
                  <span key={i} className={isLast ? "text-gradient" : ""}>
                    {word}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                );
              })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base"
          >
            {t(ui.hero.sub)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="btn-glow group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-bg shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {t(ui.hero.ctaWork)}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-lav/50 hover:bg-lav-wash"
            >
              {t(ui.hero.ctaContact)}
            </a>
            <span className="inline-flex items-center gap-1.5 pl-1 text-sm text-muted">
              <MapPin size={15} className="text-lav" />
              {t(ui.hero.location)}
            </span>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid max-w-lg grid-cols-4 gap-4 border-t border-line pt-6"
          >
            {stats.map((s) => (
              <div key={s.key}>
                <dt className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-[11px] leading-tight text-muted sm:text-xs">
                  {t(ui.stats[s.key])}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="relative mx-auto w-full max-w-sm [transform-style:preserve-3d]"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-lav-soft via-sky-soft to-mint-soft opacity-70 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-card shadow-lift">
            <div className="absolute inset-0 bg-gradient-to-tr from-lav-wash via-transparent to-sky-wash" />
            <Image
              src="/jaime.png"
              alt="Jaime Randle"
              width={900}
              height={900}
              priority
              className="relative h-auto w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl glass px-3.5 py-2.5 shadow-soft">
              <div>
                <p className="font-display text-sm font-bold leading-none">
                  {t(ui.hero.role)}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Pulppo · ex-Santander
                </p>
              </div>
              <span className="rounded-lg bg-mint-wash px-2 py-1 text-[10px] font-bold text-mint">
                ● {t(ui.hero.available)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="relative mt-16 overflow-hidden border-y border-line py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max animate-marquee gap-10">
          {[...marqueeStack, ...marqueeStack].map((tech, i) => (
            <span
              key={i}
              className="font-display text-lg font-semibold text-muted/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
