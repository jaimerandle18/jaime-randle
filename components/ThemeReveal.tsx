"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/**
 * Left-edge drag handle. Drag it across and the page reveals the opposite theme
 * for real (a cloned, fully-themed layer — images stay exactly as they are, no
 * negatives). Release past the threshold to commit; the handle stays on the side
 * that matches the active theme (left = light, right = dark).
 */
export function ThemeReveal() {
  const { dark, setDark } = useTheme();
  const [w, setW] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startX = useRef(0);
  const moved = useRef(false);
  const draggingRef = useRef(false);
  const wRef = useRef(0);

  const track = (x: number) => {
    const c = clamp(x);
    wRef.current = c;
    setW(c);
  };

  const vw = () => (typeof window !== "undefined" ? window.innerWidth : 0);
  const clamp = (x: number) => Math.max(0, Math.min(vw(), x));

  // Keep the handle parked on the correct side when not dragging.
  useEffect(() => {
    if (!dragging) setW(dark ? vw() : 0);
  }, [dark, dragging]);

  const buildClone = () => {
    const src = document.getElementById("page-root");
    const inner = innerRef.current;
    if (!src || !inner) return;
    inner.innerHTML = "";
    inner.className = dark ? "theme-light" : "theme-dark";
    inner.style.top = `${-window.scrollY}px`;
    inner.style.width = `${window.innerWidth}px`;
    const clone = src.cloneNode(true) as HTMLElement;
    clone.removeAttribute("id");
    inner.appendChild(clone);
  };

  const onDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    startX.current = e.clientX;
    moved.current = false;
    draggingRef.current = true;
    buildClone();
    setVisible(true);
    setDragging(true);
    track(e.clientX);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    if (Math.abs(e.clientX - startX.current) > 4) moved.current = true;
    track(e.clientX);
  };

  const onUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);

    const cur = wRef.current;
    if (!moved.current) {
      // treated as a click → toggle with the CSS wipe transition
      setDark(!dark);
      setW(!dark ? vw() : 0);
    } else {
      let goDark = dark;
      if (!dark && cur > vw() * 0.4) goDark = true;
      else if (dark && vw() - cur > vw() * 0.4) goDark = false;
      if (goDark !== dark) setDark(goDark, false);
      setW(goDark ? vw() : 0);
    }

    setVisible(false);
    clearTimer.current = setTimeout(() => {
      if (innerRef.current) innerRef.current.innerHTML = "";
    }, 320);
  };

  // Reveal band: light→ from the left (width w); dark→ from the right (width vw-w)
  const clipPath = dark
    ? `inset(0 0 0 ${w}px)`
    : `inset(0 ${Math.max(0, vw() - w)}px 0 0)`;

  const handleLeft = Math.min(Math.max(w, 0), vw() - 30);

  return (
    <>
      {/* cloned, real-theme reveal layer */}
      <div
        aria-hidden
        className="fixed inset-0 overflow-hidden"
        style={{
          zIndex: 70,
          pointerEvents: "none",
          clipPath,
          opacity: visible ? 1 : 0,
          transition: visible ? "none" : "opacity 0.3s ease",
        }}
      >
        <div ref={innerRef} style={{ position: "absolute", left: 0 }} />
      </div>

      {/* boundary line while dragging */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: w,
          width: 2,
          zIndex: 78,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, transparent, rgba(139,135,240,0.85), rgba(92,171,238,0.85), transparent)",
          opacity: dragging ? 1 : 0,
          transition: dragging ? "none" : "opacity 0.3s ease",
        }}
      />

      {/* drag handle */}
      <button
        type="button"
        aria-label="Drag to switch theme"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="group fixed top-1/2 z-[80] flex h-16 w-8 -translate-y-1/2 touch-none cursor-ew-resize items-center justify-center rounded-xl border border-line bg-card/95 text-ink-soft shadow-lift backdrop-blur hover:text-ink"
        style={{
          left: handleLeft,
          transition: dragging
            ? "none"
            : "left 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <ChevronsLeftRight
          size={16}
          className="transition-transform group-hover:scale-110"
        />
      </button>
    </>
  );
}
