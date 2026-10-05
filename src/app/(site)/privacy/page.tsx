import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// Ringkas sesuai Business Operations 7.3 (UU 27/2022 PDP).
const points = [
  ["What we collect", "Only what a request needs: your name, WhatsApp number, city, the item and size, and — for courier delivery — your shipping address."],
  ["Why", "To check stock and price, confirm your order, and deliver it. We never sell your data or use it for anything else."],
  ["How long", "Order details are kept for our records. Shipping addresses are deleted or anonymised 6 months after the order is completed."],
  ["Who sees it", `Only the ${site.brand} admin. The admin panel is password-protected.`],
  ["If something goes wrong", "If your data is ever exposed, we tell you within 3 × 24 hours."],
  ["Your rights", "Ask us any time over WhatsApp to see, correct, or delete your data."],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="UU 27/2022 PDP"
        title="Privacy policy"
        desc={`How ${site.brand} handles the data you send through the request form.`}
      />
      <Section className="!pt-6">
        <dl className="max-w-3xl divide-y divide-zinc-200 border-y border-zinc-200">
          {points.map(([k, v]) => (
            <div key={k} className="py-4">
              <dt className="font-semibold">{k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-600">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
