"use client";

import Image from "next/image";
import { AppleCardProps } from "../types";
import { useBatchStore } from "../stores/useBatchStore";
import { useEffect } from "react";

export const AppleCard = ({
  key,
  appleId,
  appleName,
  appleSpecies,
  appleOrigin,
  appleCategory,
  appleImage,
  appleFlavor,
  appleBrix,
  appleTannin,
  applepH,
}: AppleCardProps) => {
  const addApple = useBatchStore((state) => state.addApple);
  const removeApple = useBatchStore((state) => state.removeApple);

  // Apple Batch State
  const apples = useBatchStore((state) => state.apples);

  const isAdded = useBatchStore((state) =>
    state.apples.some((apple) => apple.id === appleId),
  );

  useEffect(() => {
    console.log(apples);
  }, [apples]);

  const handleBatchClick = () => {
    if (isAdded) {
      removeApple(appleId);
      return;
    }
    addApple({
      id: appleId,
      name: appleName,
      imageUrl: appleImage,
      category: appleCategory,
      species: appleSpecies,
      origin: appleOrigin ? appleOrigin : "",
      flavor: appleFlavor,
      brix: appleBrix,
      ph: applepH,
      tannin: appleTannin,
      description: "",
    });
  };

  return (
    <div
      key={key}
      className="group bg-[var(--cider-surface)] border border-[var(--cider-border)] p-4 hover:border-[var(--cider-border-strong)] transition-all shadow-sm"
    >
      <div className="relative mb-4 aspect-square overflow-hidden bg-[var(--cider-soft)]">
        <Image
          src={appleImage}
          alt={appleName}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-tighter opacity-60">
          {appleCategory.replace("_", " ")}
        </span>
        <h3 className="text-xl font-bold font-serif">{appleName}</h3>
        <p className="text-xs italic opacity-80">{appleSpecies}</p>

        <div className="flex gap-2 mt-3">
          <span
            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
              appleFlavor === "Sharp"
                ? "bg-red-100 text-red-800"
                : appleFlavor === "Sweet"
                  ? "bg-yellow-100 text-yellow-800"
                  : appleFlavor === "Bittersweet"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-purple-100 text-purple-800"
            }`}
          >
            {appleFlavor}
          </span>
        </div>
      </div>

      <button
        className="w-full mt-6 py-2 border border-[var(--cider-text)] text-[var(--cider-text)] hover:bg-[var(--cider-text)] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        onClick={handleBatchClick}
      >
        {isAdded ? "Remove from Batch" : "Add to Batch"}
      </button>
    </div>
  );
};
