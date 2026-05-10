"use client";

import { Handle, Position } from "@xyflow/react";
import { useProcessStore } from "../stores/useProcessStore";

const mustAdjustmentOptions = ["Sugar", "Acid", "Tannin", "Nutrients"] as const;

export const FruitMustPreparationNode = () => {
  const fruitMustPreparation = useProcessStore(
    (state) => state.fruitMustPreparation,
  );

  const updateFruitMustPreparation = useProcessStore(
    (state) => state.updateFruitMustPreparation,
  );

  const toggleMustAdjustment = useProcessStore(
    (state) => state.toggleMustAdjustment,
  );

  const {
    sortingWashing,
    sweating,
    millingMethod,
    maceration,
    prePressSulfite,
    pressingMethod,
    juiceSettling,
    mustAdjustments,
  } = fruitMustPreparation;

  return (
    <div className="w-115 border border-[var(--cider-border)] bg-[var(--cider-surface)] p-4 text-[var(--cider-text)] shadow-sm">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">
          Fruit & Must Preparation
        </h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          Pre-fermentation process choices
        </p>
      </div>

      <div className="nodrag space-y-4">
        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Sorting / Washing
          </span>
          <select
            value={sortingWashing}
            onChange={(e) =>
              updateFruitMustPreparation(
                "sortingWashing",
                e.target.value as "yes" | "no",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Sweating
          </span>
          <select
            value={sweating}
            onChange={(e) =>
              updateFruitMustPreparation(
                "sweating",
                e.target.value as "none" | "short" | "medium" | "long",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="none">None: 0 days</option>
            <option value="short">Short: 2-5 days</option>
            <option value="medium">Medium: 1-2 weeks</option>
            <option value="long">Long: 2-4 weeks</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Milling Method
          </span>
          <select
            value={millingMethod}
            onChange={(e) =>
              updateFruitMustPreparation(
                "millingMethod",
                e.target.value as
                  | "coarse-grind"
                  | "standard-crush"
                  | "fine-grind",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="coarse-grind">Coarse Grind</option>
            <option value="standard-crush">Standard Crush</option>
            <option value="fine-grind">Fine Grind</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Maceration
          </span>
          <select
            value={maceration}
            onChange={(e) =>
              updateFruitMustPreparation(
                "maceration",
                e.target.value as "none" | "short" | "overnight",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="none">None: 0 hours</option>
            <option value="short">Short: 2-6 hours</option>
            <option value="overnight">Overnight: 12-24 hours</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Pre-Press Sulfite
          </span>
          <select
            value={prePressSulfite}
            onChange={(e) =>
              updateFruitMustPreparation(
                "prePressSulfite",
                e.target.value as "none" | "low" | "standard",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="standard">Standard</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Pressing Method
          </span>
          <select
            value={pressingMethod}
            onChange={(e) =>
              updateFruitMustPreparation(
                "pressingMethod",
                e.target.value as
                  | "basket-press"
                  | "rack-and-cloth"
                  | "bladder-press"
                  | "hydraulic-pack",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="basket-press">Basket Press</option>
            <option value="rack-and-cloth">Rack-and-Cloth Press</option>
            <option value="bladder-press">Bladder Press</option>
            <option value="hydraulic-pack">Hydraulic Pack Press</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Juice Settling
          </span>
          <select
            value={juiceSettling}
            onChange={(e) =>
              updateFruitMustPreparation(
                "juiceSettling",
                e.target.value as "none" | "cold-settle" | "room-temp-settle",
              )
            }
            className="border border-[var(--cider-border)] bg-transparent px-2 py-2"
          >
            <option value="none">None</option>
            <option value="cold-settle">Cold Settle</option>
            <option value="room-temp-settle">Room-Temperature Settle</option>
          </select>
        </label>

        <fieldset className="grid gap-2 border border-[var(--cider-border)] p-3">
          <legend className="px-1 text-xs font-bold uppercase tracking-widest opacity-60">
            Must Adjustments
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {mustAdjustmentOptions.map((adjustment) => (
              <label
                key={adjustment}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={mustAdjustments.includes(adjustment)}
                  onChange={() => toggleMustAdjustment(adjustment)}
                  className="accent-[var(--cider-text)]"
                />
                <span>{adjustment}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};
