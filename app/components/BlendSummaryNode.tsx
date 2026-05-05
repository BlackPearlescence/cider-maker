"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";

export const BlendSummaryNode = () => {
  const apples = useBatchStore((state) => state.apples);

  const totalWeight = apples.reduce((sum, apple) => sum + apple.weight, 0);
  const estimatedBrix =
    totalWeight > 0
      ? apples.reduce((sum, apple) => sum + apple.brix * apple.weight, 0) /
        totalWeight
      : 0;

  const estimatedTannin =
    totalWeight > 0
      ? apples.reduce((sum, apple) => sum + apple.tannin * apple.weight, 0) /
        totalWeight
      : 0;

  const estimatedPh =
    totalWeight > 0
      ? -Math.log10(
          apples.reduce(
            (sum, apple) => sum + Math.pow(10, -apple.ph) * apple.weight,
            0,
          ) / totalWeight,
        )
      : 0;

  const flavorWeights = apples.reduce<Record<string, number>>((acc, apple) => {
    acc[apple.flavor] = (acc[apple.flavor] ?? 0) + apple.weight;
    return acc;
  }, {});

  const flavorDistribution = Object.entries(flavorWeights).map(
    ([flavor, weight]) => ({
      flavor,
      percentage: totalWeight > 0 ? (weight / totalWeight) * 100 : 0,
    }),
  );

  console.log(flavorDistribution);

  return (
    <div className="w-105 border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="target" position={Position.Bottom} />
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

          <span>{"Sweet"}</span>
          <span>{flavorDistribution[0]?.percentage ?? 0}%</span>
          <span>{"Sharp"}</span>
          <span>{flavorDistribution[1]?.percentage ?? 0}%</span>
          <span>{"Bittersweet"}</span>
          <span>{flavorDistribution[2]?.percentage ?? 0}%</span>
          <span>{"Bittersharp"}</span>
          <span>{flavorDistribution[3]?.percentage ?? 0}%</span>
        </div>
      </div>
    </div>
  );
};
