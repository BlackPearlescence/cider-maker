"use client";

import Link from "next/link";
import { useBatchStore } from "../stores/useBatchStore";
import "@xyflow/react/dist/style.css";

import {
  ReactFlow,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { BlendCompositionNode } from "./BlendCompositionNode";
export const BlendFlow = () => {
  const apples = useBatchStore((state) => state.apples);

  const nodeTypes = {
    blendComposition: BlendCompositionNode,
  };

  const initialNodes = [
    {
      id: "blend-composition",
      type: "blendComposition",
      position: { x: 100, y: 100 },
      data: {},
    },
  ];

  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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
