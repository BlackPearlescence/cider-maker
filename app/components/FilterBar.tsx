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
    </div>
  );
};
