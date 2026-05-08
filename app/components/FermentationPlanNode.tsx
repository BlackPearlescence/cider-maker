"use client";

import { Handle, Position } from "@xyflow/react";
import { useProcessStore } from "../stores/useProcessStore";

export const FermentationPlanNode = () => {
  const fermentationPlan = useProcessStore((state) => state.fermentationPlan);
  const updateFermentationPlan = useProcessStore(
    (state) => state.updateFermentationPlan,
  );

  const {
    fermentationStyle,
    yeastCategory,
    fermentationTemperature,
    nutrientPlan,
    targetFinish,
    vessel,
    primaryDuration,
  } = fermentationPlan;

  return (
    <div className="w-115 border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">Fermentation Plan</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          Hobbyist fermentation choices
        </p>
      </div>

      <div className="nodrag space-y-4">
        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Fermentation Style
          </span>
          <select
            value={fermentationStyle}
            onChange={(event) =>
              updateFermentationPlan(
                "fermentationStyle",
                event.target.value as
                  | "wild"
                  | "cider"
                  | "wine"
                  | "champagne"
                  | "ale",
              )
            }
            className="border border-[#2d5a27]/20 bg-transparent px-2 py-2"
          >
            <option value="wild">Wild / Spontaneous</option>
            <option value="cider">Cider Yeast</option>
            <option value="wine">Wine Yeast</option>
            <option value="champagne">Champagne Yeast</option>
            <option value="ale">Ale Yeast</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Fermentation Temperature
          </span>
          <select
            value={fermentationTemperature}
            onChange={(event) =>
              updateFermentationPlan(
                "fermentationTemperature",
                event.target.value as "cool" | "room-temp",
              )
            }
            className="border border-[#2d5a27]/20 bg-transparent px-2 py-2"
          >
            <option value="cool">Cool</option>
            <option value="room-temp">Room Temperature</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Nutrient Plan
          </span>
          <select
            value={nutrientPlan}
            onChange={(event) =>
              updateFermentationPlan(
                "nutrientPlan",
                event.target.value as "none" | "simple" | "staggered",
              )
            }
            className="border border-[#2d5a27]/20 bg-transparent px-2 py-2"
          >
            <option value="none">None</option>
            <option value="simple">Simple Addition</option>
            <option value="staggered">Staggered Addition</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Target Finish
          </span>
          <select
            value={targetFinish}
            onChange={(event) =>
              updateFermentationPlan(
                "targetFinish",
                event.target.value as "dry" | "off-dry" | "semi-sweet",
              )
            }
            className="border border-[#2d5a27]/20 bg-transparent px-2 py-2"
          >
            <option value="dry">Dry</option>
            <option value="off-dry">Off-Dry</option>
            <option value="semi-sweet">Semi-Sweet</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Vessel
          </span>
          <select
            value={vessel}
            onChange={(event) =>
              updateFermentationPlan(
                "vessel",
                event.target.value as "bucket" | "carboy" | "demijohn",
              )
            }
            className="border border-[#2d5a27]/20 bg-transparent px-2 py-2"
          >
            <option value="bucket">Bucket</option>
            <option value="carboy">Carboy</option>
            <option value="demijohn">Demijohn</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Primary Duration
          </span>
          <select
            value={primaryDuration}
            onChange={(event) =>
              updateFermentationPlan(
                "primaryDuration",
                event.target.value as "short" | "standard" | "slow",
              )
            }
            className="border border-[#2d5a27]/20 bg-transparent px-2 py-2"
          >
            <option value="short">Short</option>
            <option value="standard">Standard</option>
            <option value="slow">Slow</option>
          </select>
        </label>
      </div>
    </div>
  );
};
