import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';
import { calculateNodePosition, createProcessNode, createLeadsNode } from '../utils/nodeUtils';
import { createEdge } from '../utils/edgeUtils';

export const useFlowNodes = (
  nodes: Node[],
  setNodes: (callback: (nodes: Node[]) => Node[]) => void,
  setEdges: (callback: (edges: Edge[]) => Edge[]) => void,
  activeNodeId: string | null,
  setIsModalOpen: (isOpen: boolean) => void,
  setActiveNodeId: (id: string | null) => void
) => {
  const handleAddNode = useCallback((nodeId:string) => {
    setActiveNodeId(nodeId);
    setIsModalOpen(true);
  }, [setActiveNodeId, setIsModalOpen]);

  const handleLeadsFileSelect = useCallback((file:File, nodeId:string|null) => {
    if (!nodeId) return;

    const currentNode = nodes.find(n => n.id === nodeId);
    if (!currentNode) return;

    // Create a new node for the imported file
    const newFileNode = {
      id: `leads-file-${Date.now()}`,
      type: 'leads',
      position: {
        x: currentNode.position.x,
        y: Math.max(...nodes.map(n => n.position.y)) + 20 * nodes.length
      },
      data: {
        fileName: file.name,
        isImported: true,
        onLeadsImport: () => {} // Imported nodes can't be clicked
      }
    };

    // Add the new node
    setNodes((nds) => [...nds, newFileNode]);

    // Connect the new node to the start node
    setEdges((eds) => {
      // const startNode = nodes.find(n => n.type === 'start');
      // console.log(startNode)
      // if (!startNode) return eds;
      console.log(eds)
      return [...eds, createEdge(newFileNode.id,'start-node')];
    });
    
  }, [nodes, setNodes, setEdges]);

  const handleSelectNodeType = useCallback((type:string) => {
    const newNodeId = `process-${Date.now()}`;
    const addNodeId = `add-${Date.now()}`;

    setNodes((nds) => {
      const sourceNode = nds.find((n) => n.id === activeNodeId);
      if (!sourceNode) return nds;

      const filteredNodes = nds.filter(n => n.id !== activeNodeId);
      // const newNodeId = `process-${Date.now()}`;
      // const addNodeId = `add-${Date.now()}`;

      const newPosition = calculateNodePosition(sourceNode, nds);
      const newNode = createProcessNode(newNodeId, type, newPosition);
      
      const addNodePosition = calculateNodePosition(newNode, [...filteredNodes, newNode], true);
      const addNode = {
        id: addNodeId,
        type: 'add',
        position: addNodePosition,
        data: {
          onAddNode: () => handleAddNode(addNodeId),
        },
      };

      return [...filteredNodes, newNode, addNode];
    });

    setEdges((eds) => {
      const sourceEdge = eds.find(e => e.target === activeNodeId);
      const sourceId = sourceEdge ? sourceEdge.source : 'start-node';

      const filteredEdges = eds.filter(e => e.source !== activeNodeId && e.target !== activeNodeId);
      
      return [
        ...filteredEdges,
        createEdge(sourceId, newNodeId),
        createEdge(newNodeId, addNodeId),
      ];
    });

    setIsModalOpen(false);
    setActiveNodeId(null);
  }, [activeNodeId, setNodes, setEdges, setIsModalOpen, setActiveNodeId, handleAddNode]);

  return {
    handleSelectNodeType,
    handleAddNode,
    handleLeadsFileSelect,
  };
};