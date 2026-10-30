"use client";

import { useLayoutEffect, useRef, useState } from "react";

export const PAGE_WIDTH_PX = (210 * 96) / 25.4;

interface DocumentViewportProps {
  children: React.ReactNode;
  /** Never scale above this (1 = actual size). */
  maxScale?: number;
  className?: string;
}

/**
 * Scales a fixed-width (210mm) document down to fit the width of its container,
 * and reserves the scaled height so the page flows normally around it.
 */
export function DocumentViewport({ children, maxScale = 1, className = "" }: DocumentViewportProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const width = outer.clientWidth;
      if (!width) return;
      const nextScale = Math.min(maxScale, width / PAGE_WIDTH_PX);
      setScale(nextScale);
      setHeight(inner.offsetHeight * nextScale);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [maxScale]);

  return (
    <div ref={outerRef} className={`doc-viewport ${className}`} style={{ height }}>
      <div ref={innerRef} style={{ width: PAGE_WIDTH_PX, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
