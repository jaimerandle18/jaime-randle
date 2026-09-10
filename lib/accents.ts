import type { Accent } from "./content";

/** Static class maps so Tailwind can see every class at build time. */
export const accentText: Record<Accent, string> = {
  lav: "text-lav",
  mint: "text-mint",
  peach: "text-peach",
  sky: "text-sky",
  gold: "text-gold",
};

export const accentBg: Record<Accent, string> = {
  lav: "bg-lav",
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
  gold: "bg-gold",
};

export const accentWash: Record<Accent, string> = {
  lav: "bg-lav-wash",
  mint: "bg-mint-wash",
  peach: "bg-peach-wash",
  sky: "bg-sky-wash",
  gold: "bg-gold-soft/30",
};

export const accentSoftBg: Record<Accent, string> = {
  lav: "bg-lav-soft",
  mint: "bg-mint-soft",
  peach: "bg-peach-soft",
  sky: "bg-sky-soft",
  gold: "bg-gold-soft",
};

export const accentBorder: Record<Accent, string> = {
  lav: "border-lav-soft",
  mint: "border-mint-soft",
  peach: "border-peach-soft",
  sky: "border-sky-soft",
  gold: "border-gold-soft",
};

export const accentRing: Record<Accent, string> = {
  lav: "hover:border-lav/50",
  mint: "hover:border-mint/50",
  peach: "hover:border-peach/50",
  sky: "hover:border-sky/50",
  gold: "hover:border-gold/50",
};

/** Raw hex for inline gradients / glows. */
export const accentHex: Record<Accent, string> = {
  lav: "#8b87f0",
  mint: "#48c398",
  peach: "#f5926f",
  sky: "#5cabee",
  gold: "#e5b567",
};
