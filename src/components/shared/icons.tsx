/** Ikon SVG inline (stroke 1.8) — satu tempat supaya gaya garisnya seragam. */

type P = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function WhatsAppIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.6 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" {...stroke} strokeWidth={2.2} />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" {...stroke} strokeWidth={2.4} />
    </svg>
  );
}

export function Plus({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" {...stroke} strokeWidth={2.2} />
    </svg>
  );
}

export function StoreIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5.5 12v8h13v-8M10 20v-4.5h4V20" {...stroke} />
    </svg>
  );
}

export function TagIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1l8 8a1.4 1.4 0 0 1 0 2l-7.1 7.1a1.4 1.4 0 0 1-2 0z" {...stroke} />
      <circle cx="8.3" cy="8.3" r="1.4" {...stroke} />
    </svg>
  );
}

export function WalletIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 7.5V18a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 18v-8.5A1.5 1.5 0 0 0 18.5 8H5.5A1.5 1.5 0 0 1 4 6.5 1.5 1.5 0 0 1 5.5 5H17" {...stroke} />
      <circle cx="16" cy="13.75" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6z" {...stroke} />
      <path d="m9 12 2.2 2.2L15.5 10" {...stroke} />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" {...stroke} />
      <path d="m16 16 4 4" {...stroke} />
    </svg>
  );
}

export function TruckIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 6.5h11v9H3zM14 9.5h3.5l3 3.2v2.8H14" {...stroke} />
      <circle cx="7" cy="17.5" r="1.8" {...stroke} />
      <circle cx="17" cy="17.5" r="1.8" {...stroke} />
    </svg>
  );
}
