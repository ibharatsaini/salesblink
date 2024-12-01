import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Mail, Clock, PencilRuler, Trash2 } from "lucide-react";
import { ProcessNodeProps } from "../../../lib/types";
import { useEditing } from "../../../context/editContext";
// import { clsx } from 'clsx';

const ProcessNode: React.FC<ProcessNodeProps> = ({ data }) => {
  // const
  // console.log(data)
  const nodeColor =
    data.type === "cold-email" ? "border-green-400" : "border-purple-400";
  const Icon = data.type === "cold-email" ? Mail : Clock;
  const {editing,handleEdit} = useEditing()
  function handleClick(){
      console.log(editing)
      handleEdit(data.id)
  }


  return (
    <div
      className={`px-4 py-2 relative shadow-md rounded-md bg-white border-2 ${nodeColor} min-w-[180px]`}
    >
      <PencilRuler className="absolute right-[-5px] mr-1 bg-purple-200 px-px w-4 text-base py-py top-[-12px] text-purple-900 cursor-pointer " onClick={handleClick} />
      {/* <Trash2 className="absolute right-[-5px] top-[-12px] bg-purple-200 px-px w-4 text-base py-py text-purple-900 cursor-pointer" /> */}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-bold flex items-center gap-2">
            <Icon
              size={16}
              className={
                data.type === "cold-email"
                  ? "text-green-500"
                  : "text-purple-500"
              }
            />
            {data.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.type === "cold-email" ? "Email Sequence" : "Delay Action"}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default ProcessNode;
