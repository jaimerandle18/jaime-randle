"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  index,
  kicker,
  title,
  children,
  className,
  center = false,
}: {
  index: string;
  kicker: string;
  title: string;
  children?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <Reveal
      className={
        className ?? (center ? "mx-auto max-w-2xl text-center" : "max-w-2xl")
      }
    >
      <div
        className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}
      >
        <span className="section-index text-xs font-semibold text-muted">
          {index}
        </span>
        <span className="h-px w-8 bg-line" />
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-lav">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-balance sm:text-[2.75rem]">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
