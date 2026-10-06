import { Check, StoreIcon, TagIcon, TruckIcon } from "@/components/shared/icons";
import { FeatureList } from "@/components/shared/feature-list";
import { homeContent } from "../content";

const icons = { official: StoreIcon, prices: TagIcon, checked: Check, delivery: TruckIcon };

/** Why PickmenPack — kenapa percaya. Soal bayar ada di HowItWorks, soal uang di Pricing. */
export function Why() {
  return <FeatureList items={homeContent.why.items.map((it) => ({ ...it, icon: icons[it.key] }))} />;
}
