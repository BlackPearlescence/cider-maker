"use client";

import { Handle, Position } from "@xyflow/react";
import { useBatchStore } from "../stores/useBatchStore";
import { calculateBlendProfile } from "../lib/calculateBlendProfile";
import { evaluateBlendRules } from "../lib/evaluateBlendRules";

const severityStyles = {
  info: "border-[#2d5a27]/15 bg-[#fdfaf5]",
  warning: "border-[#d4a574]/50 bg-[#fff8ec]",
  risk: "border-[#c0392b]/40 bg-[#fff1ef]",
};

export const BlendDirectionNode = () => {
  const apples = useBatchStore((state) => state.apples);
  const profile = calculateBlendProfile(apples);
  const insights = evaluateBlendRules(profile);

  return (
    <div className="w-105 border border-[#2d5a27]/20 bg-white p-4 text-[#2d5a27] shadow-sm">
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />

      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold">Blend Direction</h2>
        <p className="text-xs uppercase tracking-widest opacity-60">
          {insights.length} rule-based insights
        </p>
      </div>

      <div className="max-h-[460px] space-y-2 overflow-y-auto pr-1">
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
                    className="border border-[#2d5a27]/10 px-1.5 py-0.5 text-[10px] uppercase tracking-widest opacity-60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="border border-[#2d5a27]/10 bg-[#fdfaf5] p-3">
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
