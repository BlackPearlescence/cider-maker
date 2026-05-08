"use client";

import Link from "next/link";
import { useBatchStore } from "../stores/useBatchStore";
import "@xyflow/react/dist/style.css";

import {
  ReactFlow,
  Background,
  Controls,
  type Edge,
  type Node,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { BlendCompositionNode } from "./BlendCompositionNode";
import { BlendSummaryNode } from "./BlendSummaryNode";
import { BlendDirectionNode } from "./BlendDirectionNode";
import { FruitMustPreparationNode } from "./FruitMustPreparationNode";
import { PreparedMustForecastNode } from "./PreparedMustForecastNode";
import { FermentationPlanNode } from "./FermentationPlanNode";

const nodeTypes = {
  blendComposition: BlendCompositionNode,
  blendSummary: BlendSummaryNode,
  blendDirection: BlendDirectionNode,
  fruitMustPreparation: FruitMustPreparationNode,
  preparedMustForecast: PreparedMustForecastNode,
  fermentationPlan: FermentationPlanNode,
};

const initialNodes: Node[] = [
  {
    id: "blend-composition",
    type: "blendComposition",
    position: { x: 100, y: 100 },
    data: {},
  },
  {
    id: "blend-summary",
    type: "blendSummary",
    position: { x: 100, y: 0 },
    data: {},
  },
  {
    id: "blend-direction",
    type: "blendDirection",
    position: { x: -380, y: 0 },
    data: {},
  },
  {
    id: "fruit-must-preparation",
    type: "fruitMustPreparation",
    position: { x: -380, y: 720 },
    data: {},
  },
  {
    id: "prepared-must-forecast",
    type: "preparedMustForecast",
    position: { x: -380, y: 1380 },
    data: {},
  },
  {
    id: "fermentation-plan",
    type: "fermentationPlan",
    position: { x: -380, y: 1880 },
    data: {},
  },
];

const initialEdges: Edge[] = [
  {
    id: "summary-to-composition",
    source: "blend-composition",
    target: "blend-summary",
  },
  {
    id: "summary-to-direction",
    source: "blend-summary",
    target: "blend-direction",
  },
  {
    id: "direction-to-fruit-must-preparation",
    source: "blend-direction",
    target: "fruit-must-preparation",
  },
  {
    id: "fruit-must-preparation-to-prepared-must-forecast",
    source: "fruit-must-preparation",
    target: "prepared-must-forecast",
  },
  {
    id: "prepared-must-forecast-to-fermentation-plan",
    source: "prepared-must-forecast",
    target: "fermentation-plan",
  },
];

export const BlendFlow = () => {
  const apples = useBatchStore((state) => state.apples);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div className="flex h-screen flex-col">
      <div>
        <h1>Blend Process</h1>
        <p>{apples.length} apples selected</p>
        <Link href="/">Return to Selection</Link>
      </div>
      {apples.length > 0 ? (
        <ReactFlow
          className="h-full w-full bg-[#fdfaf5]"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background h-full />
          <Controls />
        </ReactFlow>
      ) : null}
    </div>
  );
};
