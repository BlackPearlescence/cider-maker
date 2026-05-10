"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";
import { Pie, PieChart, Sector, Tooltip } from "recharts";

export const BlendCompositionNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const updateWeight = useBatchStore((state) => state.updateWeight);
  const totalWeight = apples.reduce((sum, apple) => sum + apple.weight, 0);

  const chartData = apples.map((apple) => ({
    name: apple.name,
    value: totalWeight > 0 ? (apple.weight / totalWeight) * 100 : 0,
  }));

  const chartColors = [
    "#2d5a27", // orchard green
    "#c0392b", // cider red
    "#d4a574", // golden apple
    "#8b4513", // tannin brown
    "#6a0dad", // bittersharp purple
    "#f2c94c", // pale gold
    "#4f8f6f", // leaf green
    "#a23e48", // deep apple skin
    "#7b5e3b", // oak
    "#e07a5f", // warm coral
  ];

  return (
    <div className="w-105 border border-[var(--cider-border)] bg-[var(--cider-surface)] p-4 text-[var(--cider-text)] shadow-sm">
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
                  className="nodrag w-20 border border-[var(--cider-border)] bg-transparent px-2 py-1 text-right text-sm"
                />
                <span className="text-xs font-bold">lb</span>
              </label>
            </div>
          );
        })}

        <PieChart width={300} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={100}
            paddingAngle={2}
            shape={(props) => {
              const index = props.index ?? 0;

              return (
                <Sector
                  {...props}
                  fill={chartColors[index % chartColors.length]}
                  stroke="#fdfaf5"
                  strokeWidth={2}
                />
              );
            }}
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};
