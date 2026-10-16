"use client";

import { useEffect } from "react";
import { BOARD_KEYS, isBoardMode, markActive } from "@/lib/active";

export default function LayerSync() {
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    document.querySelectorAll<HTMLElement>("[data-token]").forEach((el) => {
      const name = el.dataset.token;
      const value = name ? styles.getPropertyValue(name).trim() : "";
      if (value) el.textContent = value.toUpperCase();
    });

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-key]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
          const key = entry.target.dataset.key;
          if (!key) return;
          if (isBoardMode() && BOARD_KEYS.includes(key)) return;
          markActive(key);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));

    const foot = document.querySelector(".site-foot");
    const end = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) markActive("contact");
    });
    if (foot) end.observe(foot);
    if (!isBoardMode() && window.scrollY < 8) markActive("home");

    return () => {
      io.disconnect();
      end.disconnect();
    };
  }, []);

  return null;
}
