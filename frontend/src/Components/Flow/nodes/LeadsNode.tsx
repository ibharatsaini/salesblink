import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileText } from 'lucide-react';
import { LeadsNodeProps } from '../../../lib/types';


const LeadsNode: React.FC<LeadsNodeProps> = ({ data }) => {
  return (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-yellow-400 min-w-[180px] cursor-pointer hover:border-yellow-500 transition-colors"
      onClick={data.onLeadsImport}
    >
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-bold flex items-center gap-2">
            <FileText size={16} className="text-yellow-500" />
            {data.fileName || 'Import Leads'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.fileName ? 'Click to import more leads' : 'Click to import leads file'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsNode;