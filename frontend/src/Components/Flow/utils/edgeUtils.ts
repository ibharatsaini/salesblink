import { Edge, Connection, MarkerType } from '@xyflow/react';

export const createEdge = (source:string, target:string) => {
  console.log(source,target)
  return {
  id: `e-${source}-${target}`,
  source,
  target,
  // markerEnd: { type: MarkerType.ArrowClosed },
  // type: 'smoothstep',
}};

export const createEdgeFromConnection = (connection:Connection):Edge => ({
  ...connection,
  id: `e-${connection.source}-${connection.target}`,
  markerEnd: { type: MarkerType.ArrowClosed },
  // type: 'smoothstep',
});