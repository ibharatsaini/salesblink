import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { PencilRuler, Plus } from 'lucide-react';
import { AddNodeProps } from '../../../lib/types';
import { useEditing } from '../../../context/editContext';



const AddNode: React.FC<AddNodeProps>= ({ data }) => {
  const {handleEdit,editing} = useEditing()
  function handleClick(){
    console.log(editing)

  }
  // console.log(data.onAddNode)
  return (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-300 hover:border-gray-400 cursor-pointer min-w-[180px] transition-colors"
      onClick={data.onAddNode}
    >
      {/* <PencilRuler onClick={handleClick} /> */}
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center justify-center py-1 gap-2">
        <Plus size={16} className="text-gray-600" />
        <div className="text-sm font-medium text-gray-600">Add Next Step</div>
      </div>
    </div>
  );
};

export default AddNode;