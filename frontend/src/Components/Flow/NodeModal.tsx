import React, { useEffect, useState } from "react";
import { Mail, Clock, ChevronDown, X } from "lucide-react";
import axiosInstance from "../../lib/configureAxios";
import { ButtonTypeProps, NodeModalProps } from "../../lib/types";




const NodeModal = ({ isOpen, onClose, onSelectNode }:NodeModalProps) => {
  const [showComp, setShowComp] = useState("");
  function handleChange(show:string) {
    setShowComp(show);
  }

  function handleClose() {
    setShowComp("");
    onClose();
  }

  if (!isOpen) return null;

  return showComp ? (
    showComp == "cold-email" ? (
      // <SampleEmailModal onClose={handleClose} />
      <EditColdEmail onClose={handleClose} />
    ) : (
      <CounterModal onClose={handleClose} />
    )
  ) : (
    <NodeTypes onClose={onClose} handleChange={handleChange} />
  );
};

function NodeTypes({ handleChange, onClose }:{handleChange:Function,onClose:()=>void}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add Next Step</h2>
        <div className="space-y-3">
          <ButtonType
            subText={` Add an email sequence node`}
            icon={<Mail className="text-green-500" size={20} />}
            text={`Type A - Cold Email`}
            className={`border-green-400 hover:bg-green-50`}
            handleChange={() => handleChange("cold-email")}
          />
          <ButtonType
            subText={`Add a delay between actions`}
            icon={<Clock className="text-purple-500" size={20} />}
            text={`Type B - Wait for 10 mins`}
            className={`border-purple-400 hover:bg-purple-50`}
            handleChange={() => handleChange("wait")}
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ButtonType({ handleChange, text, icon, className, subText }:ButtonTypeProps) {
  return (
    <button
      className={`w-full p-4 text-left rounded-lg border-2  transition ${className}`}
      // onClick={() => onSelectNode('cold-email')}
      onClick={()=>handleChange()}
    >
      <div className="font-semibold flex items-center gap-2">
        {icon}
        {text}
      </div>
      <div className="text-sm text-gray-600 mt-1">{subText}</div>
    </button>
  );
}
const CounterModal = ({ onClose }:{onClose:()=>void}) => {
  const [count, setCount] = useState(10);

  const decrement = () => setCount((prev) => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col">
        <h3 className="text-lg mb-4">Counter</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{count}</span>
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Decrement
          </button>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const EditColdEmail = ({ onClose }:{onClose:()=>void}) => {
  const [emails,setEmails] = useState()
  useEffect(()=>{
     const data= axiosInstance(`/api/emails/sample-email`).then(res=>res.data).then(data=>data)
     console.log(data)
  },[])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[800px] px-10 py-5 h-[calc(100vh-10px)] border rounded-md my-10 gap-4 flex flex-col bg-white">
        <div className="w-full text-left">
          <h2 className="text-2xl font-semibold">Edit Cold Email</h2>
          <span className="text-base font-normal">Send an Email to lead.</span>
        </div>
        <div className="text-left">
          <div className="">
            <h3 className="text-lg font-semibold">Edit Template</h3>
            <SelectBox />
          </div>
        </div>
        <div className="flex gap-5 mt-auto">
          <button
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
            onClick={onClose}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectBox = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleClearSelection = () => {
    setSelectedOption(""); // This will clear the selection
  };

  return (
    <div className="w-full text-left mx-auto mt-10 h-60	relative">
      <label
        htmlFor="options"
        className="block text-gray-700 font-semibold mb-2"
      >
        Choose an option
      </label>
      <select
        id="options"
        value={selectedOption}
        onChange={(e)=>handleChange(e)}
        className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none"
      >
        <option value="" disabled>
          Select an option...
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
        {/* <option value="clear" className="text-red-500">
          <span className="text-xs">Clear Selection (X)</span>
        </option> */}
      </select>

      {/* Custom Arrow Icon */}
      <div className="absolute top-[57px] right-3 transform -translate-y-1/2 pointer-events-none">
        {selectedOption && selectedOption !== "clear" && (
          <X
            onClick={handleClearSelection}
            className="absolute top-1/2 mr-3 cursor-pointer text-sm right-3 transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none"
          />
        )}
        <ChevronDown className="text-gray-500" />
      </div>

      {/* Clear 'X' Button */}
    </div>
  );
};

export default NodeModal;
