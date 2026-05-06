"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";
import { useProcessStore } from "../stores/useProcessStore";
import { calculateBlendProfile } from "../lib/calculateBlendProfile";

export const PreparedMustForecastNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const fruitMustPreparation = useProcessStore(
    (state) => state.fruitMustPreparation,
  );
  const baseProfile = calculateBlendProfile(apples);

  return (
    <div className="w-115 border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">Prepared Must Forecast</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          Effects of fruit and must preparation
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_120px] gap-2 text-sm">
          <span>Base Brix</span>
          <span className="text-right font-bold">
            {baseProfile.estimatedBrix.toFixed(2)} °Bx
          </span>

          <span>Base pH</span>
          <span className="text-right font-bold">
            {baseProfile.estimatedPh.toFixed(2)}
          </span>

          <span>Base Tannin</span>
          <span className="text-right font-bold">
            {baseProfile.estimatedTannin.toFixed(2)}
          </span>
        </div>

        <div className="border border-[#2d5a27]/10 bg-[#fdfaf5] p-3">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">
            Selected Preparation
          </p>
          <div className="mt-2 grid grid-cols-[1fr_150px] gap-2 text-xs">
            <span>Sweating</span>
            <span className="text-right">{fruitMustPreparation.sweating}</span>

            <span>Milling</span>
            <span className="text-right">
              {fruitMustPreparation.millingMethod}
            </span>

            <span>Maceration</span>
            <span className="text-right">
              {fruitMustPreparation.maceration}
            </span>

            <span>Sulfite</span>
            <span className="text-right">
              {fruitMustPreparation.prePressSulfite}
            </span>

            <span>Press</span>
            <span className="text-right">
              {fruitMustPreparation.pressingMethod}
            </span>

            <span>Settling</span>
            <span className="text-right">
              {fruitMustPreparation.juiceSettling}
            </span>
          </div>
        </div>

        <div className="border-t border-[#2d5a27]/10 pt-3">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">
            Forecast Placeholder
          </p>
          <p className="mt-1 text-sm leading-5 opacity-75">
            Add preparation effect logic here: adjusted chemistry, juice yield,
            solids load, oxidation risk, microbial risk, nutrient availability,
            and report notes.
          </p>
        </div>
      </div>
    </div>
  );
};
