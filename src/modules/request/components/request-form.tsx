"use client";

import { startTransition, useActionState, useState } from "react";
import Link from "next/link";
import { rupiah } from "@/lib/format";
import { site } from "@/lib/site";
import { btnGhost, field, hint, label, pillAccent } from "@/lib/ui";
import { WhatsAppIcon } from "@/components/shared/icons";
import { submitRequestAction, type RequestState } from "../actions";
import { estimateFee, estimateTotal, ONGKIR, type Delivery } from "../fee";
import { nextStoreRun, runDay, runTime } from "../store-run";


const sizePreset = ["38", "39", "40", "41", "42", "43", "44"];

const range = (r: { min: number; max: number }) =>
  r.min === r.max ? rupiah(r.min) : `${rupiah(r.min)} – ${rupiah(r.max)}`;

/** Pesan error di bawah field, dihubungkan lewat aria-describedby. */
function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-danger">
      {msg}
    </p>
  ) : null;
}

export function RequestForm({
  defaultItem = "",
  defaultSize = "",
  waNumber,
}: {
  defaultItem?: string;
  defaultSize?: string;
  waNumber: string;
}) {
  const [item, setItem] = useState(defaultItem);
  const [size, setSize] = useState(defaultSize);
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("cod");
  const [state, action, pending] = useActionState<RequestState, FormData>(submitRequestAction, null);
  const [another, setAnother] = useState(false);

  const netPrice = Number(price) || 0;
  const fee = estimateFee(netPrice);
  const total = estimateTotal(netPrice, delivery);
  const err: Partial<Record<string, string>> = (state && !state.ok && state.errors) || {};
  const a11y = (k: string) =>
    err[k] ? { "aria-invalid": true, "aria-describedby": `${k}-err` } : {};

  if (state?.ok && !another) {
    const run = nextStoreRun(new Date(state.cutoff));
    const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(
      `Hi ${site.brand}, I just sent request ${state.id} (${item}, size ${size}).`,
    )}`;
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 p-6 sm:p-8" role="status">
        <span className="inline-flex items-center gap-2 rounded-full bg-warning-soft px-3 py-1 text-xs font-medium text-warning">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden />
          Waiting for admin confirmation
        </span>
        <h2 className="mt-4 text-2xl font-bold">Request received</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Your request ID is <span className="font-mono font-semibold text-ink">{state.id}</span>.
          Nothing to pay yet — we check stock and the exact price with the store
          first, then send you the final price over WhatsApp.
        </p>

        <ol className="mt-6 divide-y divide-zinc-200 rounded-xl border border-zinc-200 text-sm">
          {[
            ["Request cutoff", `${runDay(run.cutoff)}, ${runTime(run.cutoff)} WIB`],
            ["Final price sent to you", `${runDay(run.quote)}, evening`],
            ["Transfer in full by", `${runDay(run.payBy)}, ${runTime(run.payBy)} WIB`],
            ["We shop, check & pack", runDay(run.shop)],
            ["Shipped / COD", `${runDay(run.ship)} — Monday at the latest`],
          ].map(([k, v]) => (
            <li key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
              <span className="text-zinc-500">{k}</span>
              <span className="text-right font-medium">{v}</span>
            </li>
          ))}
        </ol>

        <p className="mt-4 rounded-xl bg-zinc-100 px-4 py-3 text-xs leading-relaxed text-zinc-700">
          Please double-check your size: <strong>wrong-size items can&rsquo;t be returned or exchanged</strong>.
          We send the brand&rsquo;s official size chart together with your final price.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Ask something on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setAnother(true)}
            className={`${btnGhost} min-h-12 px-5`}
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      // onSubmit, bukan `action` prop: action prop me-reset field kalau validasi gagal.
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setAnother(false);
        startTransition(() => action(f));
      }}
      noValidate
      className="grid gap-5 lg:grid-cols-[1fr_21rem] lg:gap-6"
    >
      <div className="min-w-0 space-y-6 rounded-2xl border border-zinc-200 p-4 sm:p-6">
        {/* Honeypot — tersembunyi dari manusia & screen reader. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="nama">
              Name
            </label>
            <input id="nama" name="nama" required autoComplete="name" className={field} placeholder="Your name" {...a11y("nama")} />
            <FieldError id="nama" msg={err.nama} />
          </div>
          <div>
            <label className={label} htmlFor="wa">
              WhatsApp number
            </label>
            <input
              id="wa"
              name="wa"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className={field}
              placeholder="08xxxxxxxxxx"
              {...a11y("wa")}
            />
            <FieldError id="wa" msg={err.wa} />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="kota">
            City
          </label>
          <input
            id="kota"
            name="kota"
            required
            autoComplete="address-level2"
            className={field}
            placeholder="e.g. Tangerang"
            {...a11y("kota")}
          />
          <FieldError id="kota" msg={err.kota} />
        </div>

        <div>
          <label className={label} htmlFor="item">
            What should we buy?
          </label>
          <input
            id="item"
            name="item"
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className={field}
            placeholder="e.g. Nike Revolution 7"
            {...a11y("item")}
          />
          <FieldError id="item" msg={err.item} />
        </div>

        <div>
          <label className={label} htmlFor="ukuran">
            Size
          </label>
          <div className="no-scrollbar -mx-4 mb-2 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {sizePreset.map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={size === u}
                onClick={() => setSize(u)}
                className={`h-11 w-12 shrink-0 cursor-pointer rounded-lg border text-sm font-medium transition-colors duration-200 ${
                  size === u
                    ? "border-ink bg-ink text-paper"
                    : "border-zinc-300 bg-white text-ink hover:border-ink"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
          <input
            id="ukuran"
            name="ukuran"
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={field}
            placeholder="Or type another size (e.g. 37.5 / US 9)"
            {...a11y("ukuran")}
          />
          <FieldError id="ukuran" msg={err.ukuran} />
          <div className="mt-3 flex items-center gap-3">
            <label htmlFor="kakiCm" className="text-xs text-zinc-700">
              Foot length <span className="text-zinc-600">(optional, helps us check the fit)</span>
            </label>
            <div className="relative w-28 shrink-0">
              <input
                id="kakiCm"
                name="kakiCm"
                type="number"
                inputMode="decimal"
                step={0.5}
                min={15}
                max={35}
                className={`${field} pr-10`}
                placeholder="26.5"
              />
              <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-xs text-zinc-600">
                cm
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="harga">
            Rough item price
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base font-semibold text-zinc-700 sm:text-sm">
              Rp
            </span>
            <input
              id="harga"
              name="harga"
              type="number"
              inputMode="numeric"
              min={50_000}
              step={1000}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${field} pl-11`}
              placeholder="750000"
              {...a11y("harga")}
            />
          </div>
          <FieldError id="harga" msg={err.harga} />
          <p className={hint}>
            A number from the catalog range is enough — we check the exact price
            with the store and confirm it before you pay anything.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="referensi">
            Reference link <span className="font-normal text-zinc-600">(optional)</span>
          </label>
          <input
            id="referensi"
            name="referensi"
            type="url"
            inputMode="url"
            className={field}
            placeholder="Product link or IG post"
          />
        </div>

        <fieldset>
          <legend className={label}>How do you want it delivered?</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {(
              [
                ["cod", `COD ${site.serviceArea}`, "Free, handed over in person"],
                ["kirim", "Courier, out of town", `Shipping ${range(ONGKIR.kirim)} · J&T, tracked`],
              ] as const
            ).map(([value, title, note]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                  delivery === value ? "border-ink ring-1 ring-ink" : "border-zinc-300 hover:border-zinc-400"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={value}
                  checked={delivery === value}
                  onChange={() => setDelivery(value)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-ink transition-colors ${
                    delivery === value ? "bg-ink" : "bg-white"
                  }`}
                />
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="text-xs text-zinc-500">{note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className={label} htmlFor="catatan">
            Notes <span className="font-normal text-zinc-600">(optional)</span>
          </label>
          <textarea
            id="catatan"
            name="catatan"
            rows={3}
            className={field}
            placeholder="Colour, backup size, anything else."
          />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-ink"
              {...a11y("consent")}
            />
            <span className="text-zinc-700">
              I agree that {site.brand} stores my name, WhatsApp number and city to
              process this request, as described in the{" "}
              <Link href="/privacy" className="font-medium text-ink underline underline-offset-2">
                privacy policy
              </Link>
              .
            </span>
          </label>
          <FieldError id="consent" msg={err.consent} />
        </div>
      </div>

      {/* Rincian: sidebar sticky di desktop, kartu biasa di mobile. */}
      <aside className="mb-28 h-fit space-y-4 rounded-2xl bg-zinc-100 p-5 lg:sticky lg:top-24 lg:mb-0">
        <h2 className="font-bold">Cost estimate</h2>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-600">Item price</dt>
            <dd>{rupiah(netPrice)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-600">Service fee</dt>
            <dd className="text-right">{netPrice ? range(fee) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-600">Shipping + packing</dt>
            <dd className="text-right">{delivery === "cod" ? "Free" : range(ONGKIR.kirim)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-zinc-300 pt-3 text-base font-bold">
            <dt>Estimated total</dt>
            <dd className="text-right">{netPrice ? range(total) : "—"}</dd>
          </div>
        </dl>

        <p className="text-xs leading-relaxed text-zinc-600">
          An <strong className="text-ink">indicative range</strong>. The fee follows the final net price
          after store discounts. We confirm the exact total before you pay, then
          you transfer once, in full — no deposit. Cancelling before you transfer
          costs nothing.
        </p>

        {Object.keys(err).length > 0 && (
          <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-xs font-medium text-danger">
            A few fields need a look — see the messages in red.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={`${pillAccent} w-full max-lg:!hidden disabled:cursor-wait disabled:opacity-70`}
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </aside>

      {/* Mobile: bar aksi melayang di atas bottom nav, total selalu kelihatan. */}
      <div className="bottom-safe fixed inset-x-3 z-40 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-paper/95 p-3 shadow-lg backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-zinc-500">Estimated total</p>
          <p className="truncate text-sm font-bold">{netPrice ? range(total) : "Add a price first"}</p>
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`${pillAccent} shrink-0 px-5 disabled:opacity-70`}
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}
