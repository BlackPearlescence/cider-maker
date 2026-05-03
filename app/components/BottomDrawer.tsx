"use client";

import { useEffect, useState } from "react";
import { useBatchStore } from "../stores/useBatchStore";
import { AppleDrawerCard } from "./AppleDrawerCard";

export const BottomDrawer = () => {
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const apples = useBatchStore((state) => state.apples);

  return (
    <div>
      {apples.length > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2d5a27]/20 bg-[#fdfaf5] shadow-[0_-12px_30px_rgba(45,90,39,0.12)]">
          <div className="max-h-[40vh] overflow-y-auto px-4 pb-4 flex flex-row">
            {apples.map((apple) => (
              <AppleDrawerCard
                key={apple.id}
                appleId={apple.id}
                appleName={apple.name}
                appleSpecies={apple.species}
                appleOrigin={apple.origin}
                appleCategory={apple.category}
                appleImage={apple.imageUrl || "https://placehold.co/600x400"}
                appleFlavor={apple.flavor}
                appleBrix={apple.brix}
                appleTannin={apple.tannin}
                applepH={apple.ph}
              />
            ))}
          </div>
          <button className="w-full border border-[#2d5a27] bg-[#2d5a27] px-4 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 ease-out hover:bg-transparent hover:text-[#2d5a27] hover:shadow-[0_8px_20px_rgba(45,90,39,0.18)] active:translate-y-px disabled:cursor-not-allowed disabled:border-[#2d5a27]/20 disabled:bg-[#2d5a27]/20 disabled:text-[#2d5a27]/40 disabled:shadow-none">
            Proceed to Blend
          </button>
        </div>
      ) : null}
    </div>
  );
};
