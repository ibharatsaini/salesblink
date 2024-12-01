import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
// import 'reactflow/dist/style.css';
import LeadsModal from "./modals/leadsModal";
import NodeModal from "./NodeModal";
import { useFlowNodes } from "./hooks/useFlowNodes";
import { createEdgeFromConnection } from "./utils/edgeUtils";
import { createInitialNodes } from "./utils/nodeUtils";
import LeadsNode from "./nodes/LeadsNode";
import ProcessNode from "./nodes/ProcessNode";
import StartNode from "./nodes/StartNode";
import AddNode from "./nodes/AddNode";
import { useEditing } from "../../context/editContext";
import { NodeDataType } from "../../lib/types";

const nodeTypes = {
  leads: LeadsNode,
  process: ProcessNode,
  start: StartNode,
  add: AddNode,
};

const FlowEditor = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e-start-add", source: "start-node", target: "add-1" },
  ]);
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const { handleSelectNodeType, handleEditProcessNode, handleLeadsFileSelect } =
    useFlowNodes(
      nodes,
      setNodes,
      setEdges,
      activeNodeId,
      setIsNodeModalOpen,
      setActiveNodeId
    );

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;
      setEdges((eds) => addEdge(createEdgeFromConnection(params), eds));
    },
    [setEdges]
  );

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "leads") {
          return {
            ...node,
            data: {
              ...node.data,
              onLeadsImport: () => {
                setActiveNodeId(node.id);
                setIsLeadsModalOpen(true);
              },
            },
          };
        }
        if (node.type === "add") {
          console.log(node.type);
          return {
            ...node,
            data: {
              ...node.data,
              onAddNode: () => {
                console.log(`clicked`, node.id);
                setActiveNodeId(node.id);
                setIsNodeModalOpen(true);
              },
            },
          };
        }
        console.log(node);
        return node;
      })
    );
  }, [setNodes]);
  const { editing } = useEditing();

  useEffect(() => {
    console.log(`editing`, editing);
    if (!editing) return;
    setIsNodeModalOpen(true);
    setActiveNodeId(editing);
  }, [editing]);

  return (
    <div className="grow h-[700px]" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        {/* <Panel position="top-left" className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Workflow Editor</h3>
          <p className="text-sm text-gray-600 mb-4">Import leads and design your email sequence</p>
        </Panel> */}
        {/* <MiniMap /> */}
        <Background />
        <MiniMap />
      </ReactFlow>
      <NodeModal
        isOpen={isNodeModalOpen}
        onClose={(update?: boolean) => {
          setIsNodeModalOpen(false);
          if (!update) setActiveNodeId(null);
        }}
        onSelectNode={(
          type: string,
          data: { emailBody?: string; type?: string; time?: number }
        ) => handleSelectNodeType(type, data)}
        onEdit={(id: string, data: NodeDataType) =>
          handleEditProcessNode(id, data)
        }
      />
      <LeadsModal
        isOpen={isLeadsModalOpen}
        onClose={(update?: boolean) => {
          setIsLeadsModalOpen(false);
          if (!update) setActiveNodeId(null);
        }}
        onFileSelect={(file: File, data: string[]) =>
          handleLeadsFileSelect(file, activeNodeId, data)
        }
      />
    </div>
  );
};

export default () => {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
};

// export default FlowEditor;
