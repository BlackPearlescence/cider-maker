import Image from "next/image";
import { AppleCardProps } from "../types";

export const AppleCard = ({
  key,
  appleName,
  appleSpecies,
  appleCategory,
  appleImage,
  appleFlavor,
}: AppleCardProps) => {
  return (
    <div
      key={key}
      className="group bg-white border border-[#2d5a27]/10 p-4 hover:border-[#2d5a27]/40 transition-all shadow-sm"
    >
      <div className="relative aspect-square mb-4 overflow-hidden bg=[#f9f9f9]">
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

      <button className="w-full mt-6 py-2 border border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
        Add to Batch
      </button>
    </div>
  );
};
