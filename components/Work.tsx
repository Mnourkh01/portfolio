"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MoveRight,
} from "lucide-react";
import Screws from "@/components/Screws";
import { projects } from "@/lib/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

/** Green LED for shipped/flagship units, amber for the rest. */
const isLive = (tag: string) => /live|flagship/i.test(tag);

/**
 * Official GSAP seamless-loop helper: builds a timeline that scrubs a raw
 * staggered sequence so the card train appears to loop forever in either
 * direction.
 */
function buildSeamlessLoop(
  items: HTMLElement[],
  spacing: number,
  animateFunc: (el: HTMLElement) => gsap.core.Timeline
) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;
  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // works around a rare edge-case bug fixed in GSAP 3.6.1
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const t = this as any;
      t._time === t._dur && (t._tTime += t._dur - 0.01);
    },
  });
  const l = items.length + overlap * 2;
  for (let i = 0; i < l; i++) {
    const index = i % items.length;
    const time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
  }
  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      }
    );
  return seamlessLoop;
}

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const proxy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop + motion: infinite seamless card loop (scroll scrubs it while
      // the rack is pinned; drag and the channel keys wrap forever). Mobile /
      // reduced-motion skip this branch and keep the static grid.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(track.current!.children);
        const n = panels.length;
        const spacing = 0.1;
        const snapTime = gsap.utils.snap(spacing);

        gsap.set(panels, { xPercent: 400, opacity: 0, scale: 0 });

        const animateFunc = (element: HTMLElement) => {
          const tl = gsap.timeline();
          tl.fromTo(
            element,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false,
            }
          ).fromTo(
            element,
            { xPercent: 400 },
            { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
            0
          );
          return tl;
        };

        const seamlessLoop = buildSeamlessLoop(panels, spacing, animateFunc);
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
        const playhead = { offset: 0 };
        let iteration = 0;

        // the centered unit ignites (same .is-lit lamp as before)
        let litIndex = -1;
        const updateLit = () => {
          const idx =
            ((Math.round(wrapTime(playhead.offset) / spacing) % n) + n) % n;
          if (idx !== litIndex) {
            if (litIndex >= 0) panels[litIndex].classList.remove("is-lit");
            panels[idx].classList.add("is-lit");
            litIndex = idx;
          }
        };

        const scrub = gsap.to(playhead, {
          offset: 0,
          onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset));
            updateLit();
          },
          duration: 0.5,
          ease: "power3",
          paused: true,
        });

        // initial fan-out so the rack is not empty while approaching the pin
        seamlessLoop.time(wrapTime(0));
        updateLit();

        const trigger = ScrollTrigger.create({
          trigger: gallery.current!,
          start: "top top",
          end: "+=3000",
          pin: true,
          refreshPriority: 1,
          onUpdate(self) {
            scrub.vars.offset =
              (iteration + self.progress) * seamlessLoop.duration();
            scrub.invalidate().restart();
          },
        });

        // Map a loop progress back to a page-scroll position INSIDE the pin
        // range (the original demo wraps the whole page; here drag/keys wrap
        // while normal scrolling can still leave the section).
        const progressToScroll = (progress: number) =>
          gsap.utils.clamp(
            trigger.start + 1,
            trigger.end - 1,
            trigger.start +
              gsap.utils.wrap(0, 1, progress) * (trigger.end - trigger.start)
          );

        const scrollToOffset = (offset: number) => {
          const snappedTime = snapTime(offset);
          const progress =
            (snappedTime - seamlessLoop.duration() * iteration) /
            seamlessLoop.duration();
          const scroll = progressToScroll(progress);
          if (progress >= 1 || progress < 0) iteration += Math.floor(progress);
          trigger.scroll(scroll);
          trigger.update();
        };

        // snap to the nearest unit when scrolling stops inside the rack
        const onScrollEnd = () => {
          if (trigger.isActive) scrollToOffset(Number(scrub.vars.offset));
        };
        ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

        // channel keys
        const prevBtn =
          section.current!.querySelector<HTMLButtonElement>(".gallery__ctrl--prev")!;
        const nextBtn =
          section.current!.querySelector<HTMLButtonElement>(".gallery__ctrl--next")!;
        const goPrev = () => scrollToOffset(Number(scrub.vars.offset) - spacing);
        const goNext = () => scrollToOffset(Number(scrub.vars.offset) + spacing);
        prevBtn.addEventListener("click", goPrev);
        nextBtn.addEventListener("click", goNext);

        // drag the train (proxy element, official pattern)
        let startOffset = 0;
        const drag = Draggable.create(proxy.current!, {
          type: "x",
          trigger: track.current!,
          onPress() {
            startOffset = Number(scrub.vars.offset);
          },
          onDrag() {
            scrub.vars.offset = startOffset + (this.startX - this.x) * 0.001;
            scrub.invalidate().restart();
          },
          onDragEnd() {
            scrollToOffset(Number(scrub.vars.offset));
          },
        })[0];

        return () => {
          ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
          prevBtn.removeEventListener("click", goPrev);
          nextBtn.removeEventListener("click", goNext);
          drag.kill();
          trigger.kill();
          scrub.kill();
          seamlessLoop.kill();
          panels.forEach((p) => p.classList.remove("is-lit"));
        };
      });
    },
    { scope: section }
  );

  return (
    <section className="work" id="work" ref={section}>
      <div className="shell">
        <h2 className="section-label reveal">
          <span className="num" aria-hidden="true">
            02
          </span>{" "}
          <span>Selected work</span>
          <span className="rule" aria-hidden="true" />
        </h2>
      </div>

      <div className="gallery" ref={gallery}>
        <div className="gallery__track" ref={track}>
          {projects.map((p) => (
            <a
              key={p.index}
              className="card project gallery__panel"
              href={p.href}
              target="_blank"
              rel="noreferrer"
            >
              <Screws />
              <div className="project__top">
                <span className="project__index">{p.index}</span>
                <span className="project__tagline">
                  <span className="project__tag">
                    <span
                      className={
                        isLive(p.tag) ? "led led--green" : "led led--amber"
                      }
                      aria-hidden="true"
                    />
                    {p.tag}
                  </span>
                  <span className="project__year">{p.year}</span>
                </span>
              </div>

              <h3 className="project__title">
                <span className="project__title-text">{p.title}</span>
                <ArrowUpRight
                  className="arrow"
                  size={24}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </h3>
              <p className="project__blurb">{p.blurb}</p>
              <div className="project__meta">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="gallery__ctrl">
          <button
            type="button"
            className="gallery__ctrl-btn gallery__ctrl--prev"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="gallery__ctrl-btn gallery__ctrl--next"
            aria-label="Next project"
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="gallery__hint" aria-hidden="true">
          scroll
          <MoveRight size={16} strokeWidth={1.8} />
        </div>

        <div className="drag-proxy" ref={proxy} aria-hidden="true" />
      </div>
    </section>
  );
}
