import { Edge, Connection, MarkerType } from "@xyflow/react";

export const createEdge = (source: string, target: string) => {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
  };
};

export const createEdgeFromConnection = (connection: Connection): Edge => ({
  ...connection,
  id: `e-${connection.source}-${connection.target}`,
  markerEnd: { type: MarkerType.ArrowClosed },
});
