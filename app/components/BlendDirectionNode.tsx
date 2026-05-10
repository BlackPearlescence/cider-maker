"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";
import { calculateBlendProfile } from "../lib/calculateBlendProfile";
import { evaluateBlendRules } from "../lib/evaluateBlendRules";

const severityStyles = {
  info: "border-[var(--cider-border)] bg-[var(--cider-bg)]",
  warning: "border-[#d4a574]/50 bg-[var(--cider-soft)]",
  risk: "border-[#c0392b]/40 bg-[var(--cider-soft)]",
};

export const BlendDirectionNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const profile = calculateBlendProfile(apples);
  const insights = evaluateBlendRules(profile);

  return (
    <div className="w-150 border border-[var(--cider-border)] bg-[var(--cider-surface)] p-4 text-[var(--cider-text)] shadow-sm">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">Blend Direction</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          {insights.length} rule-based insights
        </p>
      </div>

      <div className=" space-y-2 overflow-y-auto pr-1 grid grid-cols-3 gap-4">
        {insights.length > 0 ? (
          insights.map((insight) => (
            <div
              key={insight.id}
              className={`border p-3 ${severityStyles[insight.severity]}`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="text-sm font-bold">{insight.title}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {insight.severity}
                </span>
              </div>

              <p className="text-xs leading-5 opacity-80">{insight.message}</p>

              <div className="mt-2 flex flex-wrap gap-1">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--cider-border)] px-1.5 py-0.5 text-[10px] uppercase tracking-widest opacity-60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="border border-[var(--cider-border)] bg-[var(--cider-bg)] p-3">
            <p className="text-sm font-bold">No direction insights yet</p>
            <p className="mt-1 text-xs leading-5 opacity-75">
              Add apples and set blend weights to generate rule-based forecast
              notes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
