"use client";

import * as Slider from "@radix-ui/react-slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Slider States (min, max)
  const [brixRange, setBrixRange] = useState([10.0, 25.0]);
  const [tanninRange, setTanninRange] = useState([0.01, 0.4]);
  const [pHRange, setPHRange] = useState([3.0, 4.5]);

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

  const handleBrixRange = useDebouncedCallback((range: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("brixMin", range[0].toString());
    params.set("brixMax", range[1].toString());
    replace(`${pathname}?${params.toString()}`);
  }, 300);

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

      <div className="flex gap-2">
        <span>Show Advanced Filters</span>
        <input
          type="checkbox"
          checked={showAdvancedFilters}
          onChange={(e) => {
            setShowAdvancedFilters(e.currentTarget.checked);
            setBrixRange([10, 25]);
            setTanninRange([0.01, 0.4]);
            setPHRange([3, 4.5]);
          }}
        />
      </div>

      {showAdvancedFilters ? (
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <span>
              Brix: {brixRange[0]} - {brixRange[1]}
            </span>
            <Slider.Root
              value={brixRange}
              onValueChange={(range) => {
                setBrixRange(range);
                handleBrixRange(range);
              }}
              min={10}
              max={25}
              step={0.1}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <Slider.Track className="bg-[#fef7e6] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-[#d4a574] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-[#d4a574] border-2 border-white rounded-full shadow" />
              <Slider.Thumb className="block w-5 h-5 bg-[#d4a574] border-2 border-white rounded-full shadow" />
            </Slider.Root>
          </div>

          <div className="flex flex-col gap-2">
            <span>
              Tannin: {tanninRange[0]} - {tanninRange[1]}
            </span>
            <Slider.Root
              value={tanninRange}
              onValueChange={setTanninRange}
              min={0.01}
              max={0.4}
              step={0.01}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <Slider.Track className="bg-[#f5f0e6] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-[#8b4513] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-[#8b4513] border-2 border-white rounded-full shadow" />
              <Slider.Thumb className="block w-5 h-5 bg-[#8b4513] border-2 border-white rounded-full shadow" />
            </Slider.Root>
          </div>
          <div className="flex flex-col gap-2">
            <span>
              pH: {pHRange[0]} - {pHRange[1]}
            </span>
            <Slider.Root
              value={pHRange}
              onValueChange={setPHRange}
              min={3}
              max={4.5}
              step={0.1}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <Slider.Track className="bg-[#f0e6ff] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-[#6a0dad] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-[#6a0dad] border-2 border-white rounded-full shadow" />
              <Slider.Thumb className="block w-5 h-5 bg-[#6a0dad] border-2 border-white rounded-full shadow" />
            </Slider.Root>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
