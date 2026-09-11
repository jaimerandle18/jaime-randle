"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Trophy,
  X,
  Apple,
  Play,
  Globe,
} from "lucide-react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { ui, projects, type Project } from "@/lib/content";
import {
  accentText,
  accentBg,
  accentWash,
  accentSoftBg,
  accentBorder,
  accentHex,
} from "@/lib/accents";

function LinkIcon({ kind }: { kind: string }) {
  if (kind === "apple") return <Apple size={15} />;
  if (kind === "play") return <Play size={15} />;
  return <Globe size={15} />;
}

function Preview({ project }: { project: Project }) {
  const { t } = useLang();
  if (project.media?.type === "gif") {
    return (
      <Image
        src={project.media.src}
        alt={t(project.media.caption)}
        width={640}
        height={400}
        unoptimized
        className="h-full w-full object-cover object-top"
      />
    );
  }
  if (project.id === "data-jury" && project.icon) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={project.icon}
          alt="Data Jury"
          width={128}
          height={128}
          className="h-24 w-24 rounded-[22px] shadow-lift"
        />
      </div>
    );
  }
  if (project.id === "simple-ai") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-24 w-24 place-items-center rounded-[22px] bg-white shadow-lift">
          <Image
            src="/simple-ai-icon.png"
            alt="Simple-AI"
            width={128}
            height={128}
            className="h-[76px] w-[76px] object-contain"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Trophy size={64} strokeWidth={1.4} className="text-peach" />
    </div>
  );
}

function Poster({
  project,
  active,
  onClick,
}: {
  project: Project;
  active: boolean;
  onClick: () => void;
}) {
  const { t } = useLang();
  return (
    <button
      onClick={onClick}
      tabIndex={active ? 0 : -1}
      className={`flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-left transition-shadow duration-300 ${
        active ? "border-line shadow-lift" : "border-line/70 shadow-soft"
      }`}
    >
      <div
        className={`relative flex-1 overflow-hidden ${accentWash[project.accent]}`}
      >
        <Preview project={project} />
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold shadow-soft backdrop-blur">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              project.statusTone === "live" ? "bg-mint" : "bg-gold"
            }`}
          />
          {t(project.status)}
        </div>
      </div>

      <div className="shrink-0 border-t border-line bg-card px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-bold tracking-tight">
            {project.name}
          </h3>
          <span className="text-xs font-medium text-muted">{project.year}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-ink-soft">
          {t(project.tagline)}
        </p>
        <span
          className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity ${accentText[project.accent]} ${
            active ? "opacity-100" : "opacity-0"
          }`}
        >
          {t(ui.work.viewCase)}
          <ArrowUpRight size={15} />
        </span>
      </div>
    </button>
  );
}

function Coverflow({ onOpen }: { onOpen: (p: Project) => void }) {
  const [active, setActive] = useState(1);
  const [narrow, setNarrow] = useState(false);
  const startX = useRef<number | null>(null);

  const clamp = (n: number) =>
    Math.max(0, Math.min(projects.length - 1, n));
  const go = (dir: number) => setActive((a) => clamp(a + dir));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const cardW = narrow ? "clamp(210px, 72vw, 300px)" : "clamp(240px, 68vw, 320px)";
  const cardH = narrow ? "clamp(300px, 98vw, 400px)" : "clamp(320px, 80vw, 410px)";
  const spread = narrow ? 40 : 56;
  const zBack = narrow ? 110 : 170;
  const scaleStep = narrow ? 0.12 : 0.06;
  const rot = narrow ? 32 : 40;

  return (
    <div className="select-none">
      <div
        className="relative mx-auto h-[clamp(370px,104vw,470px)] [perspective:1600px]"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current == null) return;
          const dx = e.clientX - startX.current;
          if (dx > 45) go(-1);
          else if (dx < -45) go(1);
          startX.current = null;
        }}
        onPointerLeave={() => (startX.current = null)}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {projects.map((p, i) => {
            const delta = i - active;
            const abs = Math.abs(delta);
            const isActive = delta === 0;
            const style: React.CSSProperties = {
              width: cardW,
              height: cardH,
              left: "50%",
              top: "50%",
              marginLeft: `calc(${cardW} / -2)`,
              marginTop: `calc(${cardH} / -2)`,
              transform: `translateX(${delta * spread}%) translateZ(${-abs * zBack}px) rotateY(${-delta * rot}deg) scale(${1 - abs * scaleStep})`,
              zIndex: 100 - abs,
              opacity: abs > 1.8 ? 0 : 1,
              transition:
                "transform 550ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease",
            };
            (style as Record<string, unknown>).WebkitBoxReflect =
              "below 14px linear-gradient(transparent 62%, rgba(22,21,31,0.10))";
            return (
              <article key={p.id} className="absolute" style={style}>
                <Poster
                  project={p}
                  active={isActive}
                  onClick={() => (isActive ? onOpen(p) : setActive(i))}
                />
              </article>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous project"
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-ink shadow-soft transition-all hover:border-lav/50 hover:-translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              aria-label={`Go to ${p.name}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-lav" : "w-2 bg-line hover:bg-lav-soft"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={active === projects.length - 1}
          aria-label="Next project"
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-ink shadow-soft transition-all hover:border-lav/50 hover:translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/** Clean vertical stack used on phones instead of the 3D coverflow. */
function ProjectStack({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-5">
      {projects.map((p) => (
        <button
          key={p.id}
          onClick={() => onOpen(p)}
          className="group w-full overflow-hidden rounded-3xl border border-line bg-card text-left shadow-soft transition-transform active:scale-[0.99]"
        >
          <div className={`relative aspect-[16/10] overflow-hidden ${accentWash[p.accent]}`}>
            <Preview project={p} />
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold shadow-soft backdrop-blur">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  p.statusTone === "live" ? "bg-mint" : "bg-gold"
                }`}
              />
              {t(p.status)}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight">
                {p.name}
              </h3>
              <span className="text-xs font-medium text-muted">{p.year}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {t(p.tagline)}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className={`rounded-md border ${accentBorder[p.accent]} ${accentWash[p.accent]} px-2 py-0.5 text-[11px] font-medium ${accentText[p.accent]}`}
                >
                  {s}
                </span>
              ))}
            </div>
            <span
              className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${accentText[p.accent]}`}
            >
              {t(ui.work.viewCase)}
              <ArrowUpRight size={15} />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-bg shadow-lift sm:rounded-3xl"
      >
        {/* header media */}
        <div
          className={`relative aspect-[16/9] overflow-hidden ${accentWash[project.accent]}`}
        >
          <Preview project={project} />
          <button
            onClick={onClose}
            aria-label={t(ui.work.close)}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-ink shadow-soft backdrop-blur transition-transform hover:scale-105"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${accentWash[project.accent]} px-2.5 py-1 text-xs font-semibold ${accentText[project.accent]}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${accentBg[project.accent]}`} />
              {t(project.status)}
            </span>
            <span className="text-sm text-muted">{project.year}</span>
          </div>

          <p className="mt-4 leading-relaxed text-ink-soft">
            {t(project.description)}
          </p>

          {project.media && (
            <p className="mt-3 flex items-start gap-2 text-xs text-muted">
              <Info size={14} className="mt-0.5 shrink-0 text-lav" />
              {t(project.media.caption)}
            </p>
          )}

          {/* role */}
          <div className="mt-6 rounded-2xl border border-line bg-card p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {t(ui.work.role)}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">{t(project.role)}</p>
          </div>

          {/* highlights */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {t(ui.work.highlights)}
            </p>
            <ul className="mt-3 space-y-2.5">
              {t(project.highlights).map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <span
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${accentSoftBg[project.accent]}`}
                  >
                    <Check size={11} className="text-ink" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* stack */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {t(ui.work.stack)}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-card px-2.5 py-1 text-xs font-medium text-ink-soft"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* links */}
          {project.links && project.links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
                  style={{ boxShadow: `0 10px 30px -12px ${accentHex[project.accent]}` }}
                >
                  <LinkIcon kind={link.kind} />
                  {t(link.label)}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useLang();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="01"
          kicker={t(ui.work.kicker)}
          title={t(ui.work.title)}
          center
        >
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">
            {t(ui.work.intro)}
          </p>
          <p className="mx-auto mt-4 flex max-w-xl items-start gap-2 rounded-xl border border-lav-soft bg-lav-wash px-4 py-3 text-left text-sm text-ink-soft">
            <Info size={16} className="mt-0.5 shrink-0 text-lav" />
            {t(ui.work.liveNote)}
          </p>
        </SectionHeader>

        {/* desktop: 3D coverflow · mobile: clean vertical stack */}
        <Reveal className="mt-14 hidden md:block">
          <Coverflow onOpen={(p) => setActive(p)} />
        </Reveal>
        <Reveal className="mt-10 md:hidden">
          <ProjectStack onOpen={(p) => setActive(p)} />
        </Reveal>
      </div>

      <AnimatePresence>
        {active && <Modal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
