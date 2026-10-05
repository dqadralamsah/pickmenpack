"use client";

import { Children, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getMotion = () => window.matchMedia(motionQuery).matches;

const ctrl =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-ink transition-colors duration-200 hover:border-ink disabled:pointer-events-none disabled:opacity-40";

/**
 * Carousel shadcn + autoplay + titik (+ panah kalau bukan overlay) — dipakai banner Home &
 * ulasan. Autoplay berhenti saat kursor/fokus keyboard di dalam slider, dan
 * gak jalan sama sekali kalau user minta reduced motion (WCAG 2.2.2).
 *
 * `itemClassName` ngatur berapa slide per tampilan, mis.
 * "basis-[88%] sm:basis-1/2 lg:basis-1/3".
 */
export function Slider({
  children,
  label,
  itemClassName = "basis-full",
  delay = 5000,
  overlayControls = false,
}: {
  children: React.ReactNode;
  label: string;
  itemClassName?: string;
  delay?: number;
  /** true: cuma bullet, melayang di tengah-bawah slide (buat banner penuh). */
  overlayControls?: boolean;
}) {
  const slides = Children.toArray(children);
  // Lazy useState: plugin dibuat sekali & stabil antar render (bukan ref, biar boleh dibaca saat render).
  const [autoplay] = useState(() =>
    Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false }),
  );
  const [api, setApi] = useState<CarouselApi>();
  // Tanpa tombol jeda: autoplay mati kalau user minta reduced motion, dan
  // berhenti selama kursor/fokus keyboard ada di dalam slider.
  const paused = useSyncExternalStore(subscribeMotion, getMotion, () => false);

  // Posisi & jumlah titik dibaca langsung dari embla (sumber kebenarannya).
  const subscribe = useCallback(
    (cb: () => void) => {
      api?.on("select", cb).on("reInit", cb);
      return () => void api?.off("select", cb).off("reInit", cb);
    },
    [api],
  );
  const current = useSyncExternalStore(subscribe, () => api?.selectedScrollSnap() ?? 0, () => 0);
  const snapCount = useSyncExternalStore(subscribe, () => api?.scrollSnapList().length ?? 0, () => 0);

  useEffect(() => {
    if (!api) return; // plugin baru siap setelah embla init
    if (paused) autoplay.stop();
    else autoplay.play();
  }, [autoplay, paused, api]);

  const hold = useCallback(() => autoplay.stop(), [autoplay]);
  const resume = useCallback(() => {
    if (!paused) autoplay.play();
  }, [autoplay, paused]);

  const controls = (
    <div
      className={
        overlayControls
          ? "glass absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full px-1 sm:bottom-6"
          : "mt-5 flex items-center gap-2"
      }
    >

      {/* Titik = posisi; tiap titik tetap 24px area tekan biar ramah jempol. */}
      <div className={`flex items-center ${overlayControls ? "" : "flex-1"}`}>
        {Array.from({ length: snapCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            className="group flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-ink" : "w-1.5 bg-ink/25 group-hover:bg-ink/50"
              }`}
            />
          </button>
        ))}
      </div>

      {!overlayControls && (
        <>
          <button type="button" onClick={() => api?.scrollPrev()} className={ctrl} aria-label="Previous slide">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => api?.scrollNext()} className={ctrl} aria-label="Next slide">
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: "start" }}
      plugins={[autoplay]}
      aria-label={label}
      onMouseEnter={hold}
      onMouseLeave={resume}
      onFocusCapture={hold}
      onBlurCapture={resume}
    >
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={i} aria-label={`${i + 1} of ${slides.length}`} className={itemClassName}>
            {s}
          </CarouselItem>
        ))}
      </CarouselContent>
      {controls}
    </Carousel>
  );
}
