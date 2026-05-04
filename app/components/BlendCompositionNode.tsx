"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";

export const BlendCompositionNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const updateWeight = useBatchStore((state) => state.updateWeight);
  const totalWeight = apples.reduce((sum, apple) => sum + apple.weight, 0);

  return (
    <div className="w-[420px] border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="source" position={Position.Right} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">Blend Composition</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          Total weight: {totalWeight.toFixed(1)} lb
        </p>
      </div>

      <div className="space-y-3">
        {apples.map((apple) => {
          const percentage =
            totalWeight > 0 ? (apple.weight / totalWeight) * 100 : 0;

          return (
            <div
              key={apple.id}
              className="grid grid-cols-[1fr_120px] items-center gap-3"
            >
              <div>
                <p className="truncate text-sm font-bold">{apple.name}</p>
                <p className="text-xs opacity-60">
                  {apple.flavor} • {percentage.toFixed(1)}%
                </p>
              </div>

              <label className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={apple.weight}
                  onChange={(event) =>
                    updateWeight(apple.id, Number(event.target.value))
                  }
                  className="nodrag w-20 border border-[#2d5a27]/20 bg-transparent px-2 py-1 text-right text-sm"
                />
                <span className="text-xs font-bold">lb</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
