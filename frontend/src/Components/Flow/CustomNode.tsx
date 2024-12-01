import React from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeData } from "../../lib/types";
import { PencilRuler } from "lucide-react";
import { useEditing } from "../../context/editContext";

const CustomNode: React.FC<NodeData> = ({ data }: any) => {
  console.log(data.type);
  const isStart = data.type === "start";
  const isAddNode = data.type === "add";
  const nodeColor = isStart
    ? "border-blue-400"
    : data.type === "cold-email"
    ? "border-green-400"
    : data.type === "wait"
    ? "border-purple-400"
    : "border-gray-300";

  const { editing, handleEdit } = useEditing();
  function handleClick() {
    console.log(editing);
    handleEdit(data.id);
  }
  if (isAddNode) {
    return (
      <div
        className="px-4 py-2 relative shadow-md rounded-md bg-white border-2 border-gray-300 hover:border-gray-400 cursor-pointer min-w-[180px]"
        onClick={data.onAddNode}
      >
        <PencilRuler className="absolute top-6" onClick={handleClick} />

        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <div className="flex items-center justify-center py-1">
          <div className="text-sm font-medium text-gray-600">
            + Add Next Step
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${nodeColor} min-w-[180px] `}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-bold">{data.label}</div>
          {!isStart && (
            <div className="text-xs text-gray-500 mt-1">
              {data.type === "cold-email" ? "Email Sequence" : "Delay Action"}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default CustomNode;
