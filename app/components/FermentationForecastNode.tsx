"use client";

import { Handle, Position } from "@xyflow/react";
import { useProcessStore } from "../stores/useProcessStore";
import { calculatePreparationEffects } from "../lib/calculatePreparationEffects";
import { calculateFermentationForecast } from "../lib/calculateFermentationForecast";

export const FermentationForecastNode = () => {
  const fruitMustPreparation = useProcessStore(
    (state) => state.fruitMustPreparation,
  );
  const fermentationPlan = useProcessStore((state) => state.fermentationPlan);

  const preparedMustForecast =
    calculatePreparationEffects(fruitMustPreparation);
  const fermentationForecast = calculateFermentationForecast(
    fermentationPlan,
    preparedMustForecast,
  );

  return (
    <div className="w-115 border border-[var(--cider-border)] bg-[var(--cider-surface)] p-4 text-[var(--cider-text)] shadow-sm">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">
          Fermentation Forecast
        </h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          What the fermentation plan suggests
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_140px] gap-2 text-sm">
          <span>Reliability</span>
          <span className="text-right font-bold">
            {fermentationForecast.reliability}
          </span>

          <span>Expected Pace</span>
          <span className="text-right font-bold">
            {fermentationForecast.pace}
          </span>

          <span>Aroma Preservation</span>
          <span className="text-right font-bold">
            {fermentationForecast.aromaPreservation}
          </span>

          <span>Off-Flavor Risk</span>
          <span className="text-right font-bold">
            {fermentationForecast.offFlavorRisk}
          </span>

          <span>Dryness Likelihood</span>
          <span className="text-right font-bold">
            {fermentationForecast.drynessLikelihood}
          </span>

          <span>Monitoring Needs</span>
          <span className="text-right font-bold">
            {fermentationForecast.monitoringNeeds}
          </span>
        </div>

        <div className="border-t border-[var(--cider-border)] pt-3">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60">
            Fermentation Notes
          </p>
          <div className="mt-3 space-y-2">
            {fermentationForecast.notes.map((note) => (
              <p
                key={note}
                className="border border-[var(--cider-border)] bg-[var(--cider-bg)] p-2 text-xs leading-5 opacity-80"
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
