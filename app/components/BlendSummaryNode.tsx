"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";
import { calculateBlendProfile } from "../lib/calculateBlendProfile";
import { evaluateBlendRules } from "../lib/evaluateBlendRules";

export const BlendSummaryNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const profile = calculateBlendProfile(apples);
  const {
    totalWeight,
    estimatedBrix,
    estimatedPh,
    estimatedTannin,
    estimatedAbv,
    flavorDistribution,
  } = profile;

  return (
    <div className="w-105 border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="target" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <h2 className="font-serif text-xl font-bold">Blend Summary</h2>
      <div>
        <div className="grid grid-cols-[1fr_120px] items-center gap-3">
          <span>Total Weight</span>
          <span>{totalWeight.toFixed(2)} lbs</span>

          <span>Estimated Brix</span>
          <span>{estimatedBrix.toFixed(2)} °Bx </span>

          <span>Estimated Tannin</span>
          <span>{estimatedTannin.toFixed(2)}</span>

          <span>Estimated pH</span>
          <span>{estimatedPh.toFixed(2)}</span>

          <span>Potential ABV</span>
          <span>{estimatedAbv.toFixed(2)}%</span>

          <span>{"Sweet"}</span>
          <span>{(flavorDistribution.Sweet ?? 0).toFixed(1)}%</span>
          <span>{"Sharp"}</span>
          <span>{(flavorDistribution.Sharp ?? 0).toFixed(1)}%</span>
          <span>{"Bittersweet"}</span>
          <span>{(flavorDistribution.Bittersweet ?? 0).toFixed(1)}%</span>
          <span>{"Bittersharp"}</span>
          <span>{(flavorDistribution.Bittersharp ?? 0).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
