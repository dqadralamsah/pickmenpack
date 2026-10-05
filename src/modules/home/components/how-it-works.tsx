import { connection } from "next/server";
import { nextStoreRun, runDay } from "@/modules/request/store-run";
import { fill, homeContent } from "../content";

const { banner, steps } = homeContent.howItWorks;

/** How it works bertanggal (gabungan "The weekly routine" + langkah lama).
 *  Kartu gelap = jangkar visual; semua tanggal dari nextStoreRun(). */
export async function HowItWorks() {
  await connection(); // tanggal tergantung jam sekarang — jangan di-prerender
  const run = nextStoreRun();
  const dates = {
    runDate: runDay(run.shop),
    cutoffDate: runDay(run.cutoff),
    priceDate: runDay(run.quote),
    shipDate: runDay(run.ship),
  };
  // Copy banner pakai " · " sebagai pemisah: status · judul · cutoff.
  const [status, headline, cutoff] = fill(run.open ? banner.open : banner.closed, dates).split(" · ");

  return (
    <div className="on-dark overflow-hidden rounded-3xl bg-ink text-paper">
      <div className="flex flex-wrap items-end justify-between gap-4 px-6 pt-7 sm:px-10 sm:pt-10">
        <div>
          <p className="flex items-center gap-2 text-sm text-paper/70">
            <span className="relative flex h-2 w-2" aria-hidden>
              {run.open && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60 motion-reduce:hidden" />
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${run.open ? "bg-neon" : "bg-pop-yellow"}`} />
            </span>
            {status}
          </p>
          {/* Tanggal run disorot hijau neon (12.5:1 di atas ink). */}
          <p className="mt-2 font-heading text-2xl font-bold sm:text-4xl">
            {headline.split(dates.runDate).map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="text-neon">{dates.runDate}</span>}
                {part}
              </span>
            ))}
          </p>
        </div>
        {cutoff && (
          <p className="rounded-full border border-paper/20 px-3 py-1.5 text-xs text-paper/80">{cutoff}</p>
        )}
      </div>

      {/* Timeline: vertikal di mobile, horizontal mulai lg. Garis penghubung
          digambar di belakang titik-titiknya. */}
      <ol className="relative grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-5 lg:gap-4">
        <span aria-hidden className="absolute top-[3.125rem] bottom-16 left-[2.625rem] w-px bg-paper/15 sm:top-[3.625rem] sm:left-[3.625rem] lg:right-10 lg:bottom-auto lg:left-10 lg:h-px lg:w-auto" />
        {steps.map((s, i) => (
          <li key={s.key} className="relative flex gap-4 lg:block">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neon font-heading text-sm font-bold text-ink ring-4 ring-ink">
              {i + 1}
            </span>
            <div className="lg:mt-4">
              <p className="text-xs font-medium text-neon">{fill(s.date, dates)}</p>
              <h3 className="mt-1 font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-paper/70">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
