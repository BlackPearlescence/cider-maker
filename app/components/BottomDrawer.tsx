"use client";

import { useEffect, useState } from "react";
import { useBatchStore } from "../stores/useBatchStore";
import { AppleDrawerCard } from "./AppleDrawerCard";
import Link from "next/link";

export const BottomDrawer = () => {
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const apples = useBatchStore((state) => state.apples);

  useEffect(() => {
    const unsubscribe = useBatchStore.subscribe((state, previousState) => {
      if (state.apples.length > previousState.apples.length) {
        setIsBatchOpen(true);
      }

      if (state.apples.length === 0) {
        setIsBatchOpen(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleCloseBatch = () => {
    setIsBatchOpen(false);
  };

  return (
    <div className="fixed  bottom-0 left-0 right-0 z-50 border-t border-[#2d5a27]/20 bg-[#fdfaf5] shadow-[0_-12px_30px_rgba(45,90,39,0.12)]">
      {isBatchOpen && apples.length > 0 ? (
        <>
          <div className="flex max-h-[40vh] flex-row gap-4 overflow-y-auto px-4 pb-4 pt-4">
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

          <div className="grid grid-cols-2">
            <Link
              href="/blend"
              className="block border border-[#2d5a27] bg-[#2d5a27] px-4 py-3 text-center text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 ease-out hover:bg-transparent hover:text-[#2d5a27] hover:shadow-[0_8px_20px_rgba(45,90,39,0.18)]"
            >
              Proceed to Blend
            </Link>
            <button
              onClick={handleCloseBatch}
              className="border border-[#2d5a27]/20 px-4 py-3 text-center text-sm font-bold uppercase tracking-widest text-[#2d5a27] transition-all duration-200 ease-out hover:border-[#2d5a27] hover:bg-[#2d5a27]/10"
            >
              Close Batch
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <span className="text-sm font-bold uppercase tracking-widest text-[#2d5a27]">
            {apples.length > 0 ? `${apples.length} in Batch` : "Empty Batch"}
          </span>

          <button
            onClick={() => setIsBatchOpen(true)}
            disabled={apples.length === 0}
            className="border border-[#2d5a27] bg-[#2d5a27] px-4 py-2 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 ease-out hover:bg-transparent hover:text-[#2d5a27] disabled:cursor-not-allowed disabled:border-[#2d5a27]/20 disabled:bg-[#2d5a27]/20 disabled:text-[#2d5a27]/40"
          >
            Open Batch
          </button>
        </div>
      )}
    </div>
  );
};
