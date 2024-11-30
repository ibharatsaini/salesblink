import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

const StartNode:React.FC = () => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-400 min-w-[180px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-bold flex items-center gap-2">
            <Play size={16} className="text-blue-500" />
            Sequence Start Point
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default StartNode;