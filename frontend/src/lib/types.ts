import { ReactNode } from "react";

export interface NodeModalProps {
  isOpen: boolean;
  onClose: (arg0?: boolean) => void;
  onSelectNode: SelectNodeProps;
  onEdit: (id: string, data: NodeDataType) => void;
}
export type SelectNodeProps = (type: NodeTypes, data: NodeDataType) => void;
export type NodeDataType = { emailBody?: string; type?: string; time?: number };
export interface ButtonTypeProps {
  handleChange: Function;
  text: string;
  icon: ReactNode;
  className: string;
  subText: string;
}

export interface AddNodeProps {
  data: {
    onAddNode: () => void;
  };
}

export interface LeadsNodeProps {
  data: {
    fileName?: string;
    onLeadsImport: () => void;
  };
}

export interface ProcessNodeProps {
  data: {
    label: string;
    type: "cold-email" | "wait";
    id: string;
    data: {
      emailBody: string;
      delay: {
        time: number;
        type: string;
      };
    };
  };
}

export type NodeData = {
  label?: string;
  type?: "start" | "cold-email" | "wait" | "add" | "leads";
  onAddNode?: () => void;
  onLeadsImport?: () => void;
  fileName?: string;
};
// export const NODE_TYPES = {
//   start: "start",
//   "cold-email": "cold-email",
//   wait: "wait",
//   add: "add",
// } as const;

export type NodeTypes = "cold-email" | "wait";
