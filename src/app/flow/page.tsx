"use client";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { v4 as uuid } from "uuid";



export default function FlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [label, setLabel] = useState("");


  useEffect(() => {
    fetch("/api/flow")
      .then((r) => r.json())
      .then((data) => {
        setNodes(
          data.nodes.map((n: any) => ({
            id: n.id,
            position: { x: n.positionX, y: n.positionY },
            data: { label: n.label },
            style: nodeStyle,
          }))
        );
        setEdges(data.edges);
      });
  }, []);


const createNode = () => {
  if (!label.trim()) return;

  setNodes((nds) => [
    ...nds,
    {
      id: uuid(),   
      position: {
        x: 200 + Math.random() * 200,
        y: 150 + Math.random() * 150,
      },
      data: { label },
      style: nodeStyle,
    },
  ]);

  setLabel("");
};


 const onConnect = useCallback(
  (params: any) =>
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: true,
          markerEnd: { type: "arrowclosed" },
          style: { stroke: "#38bdf8", strokeWidth: 2 },
        },
        eds
      )
    ),
  []
);


  const saveFlow = async () => {
    await fetch("/api/flow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    alert("Flow saved ");
  };


  const onNodesDelete = (deleted: any) => {
    deleted.forEach((n: any) => {
      fetch("/api/flow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: n.id, type: "node" }),
      });
    });
  };


  const onEdgeClick = (_: any, edge: any) => {
    fetch("/api/flow", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: edge.id, type: "edge" }),
    });

    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617]">

    
      <div className="p-4 border-b border-slate-800 flex gap-3 items-center">

        <input
          className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-white"
          placeholder="New task node..."
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button
          onClick={createNode}
          className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl text-white font-semibold"
        >
          Add Node
        </button>

        <button
          onClick={saveFlow}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white font-semibold"
        >
          Save Flow
        </button>

      
      </div>


      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={20} color="#1e293b" />
        </ReactFlow>
      </div>
    </div>
  );
}

const nodeStyle = {
  background: "#0f172a",
  color: "white",
  border: "1px solid #38bdf8",
  borderRadius: 12,
  padding: 10,
};