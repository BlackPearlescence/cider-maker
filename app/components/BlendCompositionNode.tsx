"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";

export const BlendCompositionNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const updatePercentage = useBatchStore((state) => state.updatePercentage);
  const total = apples.reduce((sum, apple) => sum + apple.percentage, 0);

  return (
    <div className="w-[420px] border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="source" position={Position.Right} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">Blend Composition</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          Total: {Math.round(total)}%
        </p>
      </div>

      <div className="space-y-3">
        {apples.map((apple) => (
          <div
            key={apple.id}
            className="grid grid-cols-[1fr_80px] items-center gap-3"
          >
            <div>
              <p className="truncate text-sm font-bold">{apple.name}</p>
              <p className="text-xs opacity-60">{apple.flavor}</p>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(apple.percentage)}
                onChange={(event) =>
                  updatePercentage(apple.id, Number(event.target.value))
                }
                className="nodrag w-16 border border-[#2d5a27]/20 bg-transparent px-2 py-1 text-right text-sm"
              />
              <span className="text-xs font-bold">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
