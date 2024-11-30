import { ReactNode } from "react";

export interface NodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (type: string) => void;
}

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
  };
}

export interface NodeData {
    label?: string;
    type?: 'start' | 'cold-email' | 'wait' | 'add' | 'leads';
    onAddNode?: () => void;
    onLeadsImport?: () => void;
    fileName?: string;
  }
export const NODE_TYPES ={
  start: "start",
  "cold-email": "cold-email",
  wait: "wait",
  add: "add",
} as const;
