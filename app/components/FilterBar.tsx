"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const toggleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get("category");

    if (current === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleTasteClass = (tasteClass: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get("flavor");

    if (current === tasteClass) {
      params.delete("flavor");
    } else {
      params.set("flavor", tasteClass);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-12 space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by variety or origin..."
          className="w-full bg-transparent border-b border-[#2d5a27]/30 py-3 text-lg focus:outline-none focus:border-[#2d5a27] transition-colors placeholder:text-[#2d5a27]/40"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>

      <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
        {["CULINARY", "HERITAGE_CIDER", "CRABAPPLE"].map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 border transition-all ${
              searchParams.get("category") === cat
                ? "bg-[#2d5a27] text-white border-[#2d5a27]"
                : "border-[#2d5a27]/20 text-[#2d5a27] hover:border-[#2d5a27]/60"
            }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>
      <div className="flex gap-4 text-[10px] font-bold tracking-widest">
        <button
          key={"Sweet"}
          onClick={() => toggleTasteClass("Sweet")}
          className={`px-4 py-2 border transition-all ${
            searchParams.get("flavor") === "Sweet"
              ? "bg-[#d4a574] text-white border-[#d4a574]"
              : "border-[#d4a574]/20 text-[#d4a574] hover:border-[#d4a574]/60"
          }`}
        >
          Sweet
        </button>
        <button
          key={"Sharp"}
          onClick={() => toggleTasteClass("Sharp")}
          className={`px-4 py-2 border transition-all ${
            searchParams.get("flavor") === "Sharp"
              ? "bg-[#c0392b] text-white border-[#c0392b]"
              : "border-[#c0392b]/20 text-[#c0392b] hover:border-[#c0392b]/60"
          }`}
        >
          Sharp
        </button>
        <button
          key={"Bittersweet"}
          onClick={() => toggleTasteClass("Bittersweet")}
          className={`px-4 py-2 border transition-all ${
            searchParams.get("flavor") === "Bittersweet"
              ? "bg-[#8b4513] text-white border-[#8b4513]"
              : "border-[#8b4513]/20 text-[#8b4513] hover:border-[#8b4513]/60"
          }`}
        >
          Bittersweet
        </button>
        <button
          key={"Bittersharp"}
          onClick={() => toggleTasteClass("Bittersharp")}
          className={`px-4 py-2 border transition-all ${
            searchParams.get("flavor") === "Bittersharp"
              ? "bg-[#6a0dad] text-white border-[#6a0dad]"
              : "border-[#6a0dad]/20 text-[#6a0dad] hover:border-[#6a0dad]/60"
          }`}
        >
          Bittersharp
        </button>
      </div>
    </div>
  );
};
