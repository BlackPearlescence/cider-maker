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

const nodeTypes = {
  blendComposition: BlendCompositionNode,
};

const initialNodes: Node[] = [
  {
    id: "blend-composition",
    type: "blendComposition",
    position: { x: 100, y: 100 },
    data: {},
  },
];

const initialEdges: Edge[] = [];

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
    </div>
  );
};
