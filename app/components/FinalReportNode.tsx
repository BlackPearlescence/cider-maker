"use client";

import { Handle, Position } from "@xyflow/react";
import { useRef } from "react";
import { useBatchStore } from "../stores/useBatchStore";
import { useProcessStore } from "../stores/useProcessStore";
import { calculateBlendProfile } from "../lib/calculateBlendProfile";
import { evaluateBlendRules } from "../lib/evaluateBlendRules";
import { calculatePreparationEffects } from "../lib/calculatePreparationEffects";
import { calculateFermentationForecast } from "../lib/calculateFermentationForecast";

export const FinalReportNode = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const apples = useBatchStore((state) => state.apples);
  const fruitMustPreparation = useProcessStore(
    (state) => state.fruitMustPreparation,
  );
  const fermentationPlan = useProcessStore((state) => state.fermentationPlan);

  const blendProfile = calculateBlendProfile(apples);
  const blendInsights = evaluateBlendRules(blendProfile);
  const preparationForecast = calculatePreparationEffects(fruitMustPreparation);
  const fermentationForecast = calculateFermentationForecast(
    fermentationPlan,
    preparationForecast,
  );

  const exportReportAsPdf = () => {
    const reportMarkup = reportRef.current?.outerHTML;
    const printWindow = window.open("", "_blank", "width=900,height=1200");

    if (!reportMarkup || !printWindow) {
      return;
    }

    const documentStyles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style'),
    )
      .map((styleElement) => styleElement.outerHTML)
      .join("");

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Final Cider Report</title>
          ${documentStyles}
          <style>
            @page {
              margin: 0.5in;
            }

            body {
              margin: 0;
              background: #ffffff;
              color: #2d5a27;
              font-family: Arial, Helvetica, sans-serif;
            }

            .ciderina-print-report {
              width: 100% !important;
              max-width: none !important;
              border: 0 !important;
              box-shadow: none !important;
              background: #ffffff !important;
            }

            .ciderina-print-section {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .no-print,
            .react-flow__handle {
              display: none !important;
            }
          </style>
        </head>
        <body>
          ${reportMarkup}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div
      ref={reportRef}
      className="ciderina-print-report w-[760px] border border-[var(--cider-border)] bg-[var(--cider-surface)] p-5 text-[var(--cider-text)] shadow-sm"
    >
      <Handle type="target" position={Position.Left} />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold">Final Cider Report</h2>
          <p className="text-xs uppercase tracking-widest opacity-60">
            Draft production plan and expected profile
          </p>
        </div>

        <button
          type="button"
          onClick={exportReportAsPdf}
          className="nodrag no-print border border-[var(--cider-border)] bg-[var(--cider-text)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--cider-text-strong)] hover:shadow-md"
          aria-label="Export final cider report as PDF"
        >
          Export PDF
        </button>
      </div>

      <div className="grid gap-5">
        <section className="ciderina-print-section">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
            Batch Ingredients
          </h3>
          <div className="grid grid-cols-[1fr_90px_90px] gap-2 text-sm">
            {apples.map((apple) => {
              const percentage =
                blendProfile.totalWeight > 0
                  ? (apple.weight / blendProfile.totalWeight) * 100
                  : 0;

              return (
                <div key={apple.id} className="contents">
                  <span>{apple.name}</span>
                  <span className="text-right">
                    {apple.weight.toFixed(1)} lb
                  </span>
                  <span className="text-right">{percentage.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="ciderina-print-section grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Blend Summary
            </h3>
            <div className="grid grid-cols-[1fr_100px] gap-2 text-sm">
              <span>Total Weight</span>
              <span className="text-right">
                {blendProfile.totalWeight.toFixed(1)} lb
              </span>
              <span>Brix</span>
              <span className="text-right">
                {blendProfile.estimatedBrix.toFixed(2)} °Bx
              </span>
              <span>pH</span>
              <span className="text-right">
                {blendProfile.estimatedPh.toFixed(2)}
              </span>
              <span>Tannin</span>
              <span className="text-right">
                {blendProfile.estimatedTannin.toFixed(2)}
              </span>
              <span>Potential ABV</span>
              <span className="text-right">
                {blendProfile.estimatedAbv.toFixed(2)}%
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Expected Direction
            </h3>
            <div className="space-y-2">
              {blendInsights.slice(0, 4).map((insight) => (
                <div
                  key={insight.id}
                  className="border border-[var(--cider-border)] bg-[var(--cider-bg)] p-2"
                >
                  <p className="text-sm font-bold">{insight.title}</p>
                  <p className="text-xs leading-5 opacity-75">
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ciderina-print-section grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Fruit & Must Preparation
            </h3>
            <div className="grid grid-cols-[1fr_150px] gap-2 text-sm">
              <span>Sweating</span>
              <span className="text-right">
                {fruitMustPreparation.sweating}
              </span>
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

          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Preparation Forecast
            </h3>
            <div className="grid grid-cols-[1fr_110px] gap-2 text-sm">
              <span>Sugar</span>
              <span className="text-right">
                {preparationForecast.sugarImpact}
              </span>
              <span>Acidity</span>
              <span className="text-right">
                {preparationForecast.acidityImpact}
              </span>
              <span>Tannin</span>
              <span className="text-right">
                {preparationForecast.tanninImpact}
              </span>
              <span>Clarity</span>
              <span className="text-right">{preparationForecast.clarity}</span>
              <span>Spoilage Risk</span>
              <span className="text-right">
                {preparationForecast.spoilageRisk}
              </span>
            </div>
          </div>
        </section>

        <section className="ciderina-print-section grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Fermentation Plan
            </h3>
            <div className="grid grid-cols-[1fr_130px] gap-2 text-sm">
              <span>Style</span>
              <span className="text-right">
                {fermentationPlan.fermentationStyle}
              </span>
              <span>Yeast</span>
              <span className="text-right">
                {fermentationPlan.yeastCategory}
              </span>
              <span>Temperature</span>
              <span className="text-right">
                {fermentationPlan.fermentationTemperature}
              </span>
              <span>Nutrients</span>
              <span className="text-right">
                {fermentationPlan.nutrientPlan}
              </span>
              <span>Target Finish</span>
              <span className="text-right">
                {fermentationPlan.targetFinish}
              </span>
              <span>Vessel</span>
              <span className="text-right">{fermentationPlan.vessel}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Fermentation Forecast
            </h3>
            <div className="grid grid-cols-[1fr_120px] gap-2 text-sm">
              <span>Reliability</span>
              <span className="text-right">
                {fermentationForecast.reliability}
              </span>
              <span>Pace</span>
              <span className="text-right">{fermentationForecast.pace}</span>
              <span>Aroma</span>
              <span className="text-right">
                {fermentationForecast.aromaPreservation}
              </span>
              <span>Off-Flavor Risk</span>
              <span className="text-right">
                {fermentationForecast.offFlavorRisk}
              </span>
              <span>Monitoring</span>
              <span className="text-right">
                {fermentationForecast.monitoringNeeds}
              </span>
            </div>
          </div>
        </section>

        <section className="ciderina-print-section">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest opacity-60">
            Practical Notes
          </h3>
          <div className="grid gap-2">
            {[...preparationForecast.notes, ...fermentationForecast.notes]
              .slice(0, 8)
              .map((note) => (
                <p
                  key={note}
                  className="border border-[var(--cider-border)] bg-[var(--cider-bg)] p-2 text-xs leading-5 opacity-80"
                >
                  {note}
                </p>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};
