import { Node, NodeTypes } from "@xyflow/react";
import { NodeDataType } from "../../../lib/types";
// import { NodeData } from '../types';

export const calculateNodePosition = (
  sourceNode: Node,
  nodes: Node[],
  isAddNode: boolean = false
) => {
  const spacing = 80
  const nodesBelow = nodes.filter((n) => n.position.y > sourceNode.position.y);
  const maxY =
    nodesBelow.length > 0
      ? Math.max(...nodesBelow.map((n) => n.position.y))
      : sourceNode.position.y;

  return {
    x: sourceNode.position.x,
    y: maxY + spacing,
  };
};

export const createInitialNodes = () => {
  const startNode: Node = {
    id: "start-node",
    type: "start",
    position: { x: 50, y: 50 },
    data: {},
  };

  const importLeadsNode: Node = {
    id: "import-leads-1",
    type: "leads",
    position: { x: 50, y: -40 },
    data: {
      onLeadsImport: () => {},
    },
  };

  const addNode: Node = {
    id: "add-1",
    type: "add",
    position: { x: 50, y: 150 },
    data: {
      onAddNode: () => {},
    },
  };

  return [startNode, importLeadsNode, addNode];
};

export const createLeadsNode = (
  position: { x: number; y: number },
  onLeadsImport: () => void
): Node => ({
  id: `leads-${Date.now()}`,
  type: "leads",
  position,
  data: {
    onLeadsImport,
  },
});

export const createProcessNode = (
  id: string,
  type: string,
  position: { x: number; y: number },
  emailBody?: string,
  delay?: {
    type: string;
    time: number;
  }
): Node => ({
  id,
  type: "process",
  position,
  data: {
    label:
      type === "cold-email"
        ? "Cold Email"
        : `Wait for ${delay?.time} ${delay?.type}`,
    type,
    id,
    emailBody,
    delay,
  },
});

export const editProcessNode = (
  nodeData: Node,
  editData: NodeDataType
): Node => {
  console.log(nodeData, editData);
  return {
    ...nodeData,
    data: {
      ...nodeData.data,
      ...editData,
      label:
        nodeData.data.type === "cold-email"
          ? "Cold Email"
          : `Wait for ${editData?.time} ${editData?.type}`,
    },
  };
};
