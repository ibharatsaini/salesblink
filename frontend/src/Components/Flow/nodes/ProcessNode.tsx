import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Mail, Clock } from 'lucide-react';
import { ProcessNodeProps } from '../../../lib/types';
// import { clsx } from 'clsx';



const ProcessNode :React.FC<ProcessNodeProps> = ({ data }) => {
  const nodeColor = data.type === 'cold-email' ? 'border-green-400' : 'border-purple-400';
  const Icon = data.type === 'cold-email' ? Mail : Clock;

  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${nodeColor} min-w-[180px]`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-bold flex items-center gap-2">
            <Icon size={16} className={data.type === 'cold-email' ? 'text-green-500' : 'text-purple-500'} />
            {data.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.type === 'cold-email' ? 'Email Sequence' : 'Delay Action'}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default ProcessNode;