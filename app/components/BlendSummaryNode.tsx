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

  return (
    <div className="w-105 border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <h2 className="font-serif text-xl font-bold">Blend Summary</h2>
      <div>
        <div className="grid grid-cols-[1fr_120px] items-center gap-3">
          <span>Total Weight</span>
          <span>{totalWeight.toFixed(2)} lbs</span>

          <span>Estimated Brix</span>
          <span>{estimatedBrix.toFixed(2)} °Bx </span>

          <span>Estimated Tannin</span>
          <span>{estimatedTannin.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
