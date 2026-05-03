"use client";

import Link from "next/link";
import { useBatchStore } from "../stores/useBatchStore";
import {
  ReactFlow,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
export const BlendFlow = () => {
  const apples = useBatchStore((state) => state.apples);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div>
      <h1>Blend Process</h1>
      <p>{apples.length} apples selected</p>
      <Link href="/">Return to Selection</Link>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
