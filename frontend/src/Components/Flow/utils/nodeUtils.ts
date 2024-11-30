import { Node } from '@xyflow/react';
// import { NodeData } from '../types';

export const calculateNodePosition = (
  sourceNode: Node,
  nodes: Node[],
  isAddNode: boolean = false
) => {
  const spacing = isAddNode ? 80 : 160;
  const nodesBelow = nodes.filter(n => n.position.y > sourceNode.position.y);
  const maxY = nodesBelow.length > 0
    ? Math.max(...nodesBelow.map(n => n.position.y))
    : sourceNode.position.y;
  
  return {
    x: sourceNode.position.x,
    y: maxY + spacing
  };
};

export const createInitialNodes = () => {
  const startNode: Node = {
    id: 'start-node',
    type: 'start',
    position: { x: 50, y: 50 },
    data: {},
  };

  const importLeadsNode:Node = {
    id: 'import-leads-1',
    type: 'leads',
    position: { x: 50, y: -40 },
    data: {
      onLeadsImport: () => {},
    },
  };

  const addNode:Node = {
    id: 'add-1',
    type: 'add',
    position: { x: 50, y: 150 },
    data: {
      onAddNode: () => {},
    },
  };

  return [startNode, importLeadsNode, addNode];
};

export const createLeadsNode = (
  position: { x: number; y: number },
  onLeadsImport:()=>void
):Node => ({
  id: `leads-${Date.now()}`,
  type: 'leads',
  position,
  data: {
    onLeadsImport,
  },
});

export const createProcessNode = (
  id:string,
  type:string,
  position:{x:number,y:number}
):Node => ({
  id,
  type: 'process',
  position,
  data: {
    label: type === 'cold-email' ? 'Cold Email' : 'Wait for 10 mins',
    type,
  },
});