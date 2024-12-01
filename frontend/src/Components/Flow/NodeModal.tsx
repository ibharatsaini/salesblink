import React, { useEffect, useState } from "react";
import { Mail, Clock, ChevronDown, X } from "lucide-react";
import axiosInstance from "../../lib/configureAxios";
import {
  ButtonTypeProps,
  NodeDataType,
  NodeModalProps,
  NodeTypes,
  SelectNodeProps,
} from "../../lib/types";
import { getSampleEmails } from "../../lib/dbQueries";
import { useQuery } from "@tanstack/react-query";
import { useSequence } from "../../context/sequenceContext";
// import { useFlowNodes } from "./hooks/useFlowNodes";
import { useReactFlow } from "@xyflow/react";
import { useEditing } from "../../context/editContext";

const NodeModal = ({
  isOpen,
  onClose,
  onSelectNode,
  onEdit,
}: NodeModalProps) => {
  const { editing } = useEditing();
  const { steps } = useSequence();
  const [showComp, setShowComp] = useState("");
  function handleChange(show: string) {
    setShowComp(show);
  }
  const { getNodes } = useReactFlow();
  const nodes = getNodes();
  // console.log(steps,getNodes())

  function handleClose(canEdit?: boolean) {
    !canEdit && setShowComp("");
    onClose();
  }
  useEffect(() => {
    if (!editing) return;
    const node = nodes.find((el) => el.id == editing);
    setShowComp(node?.data.type as string);
  }, [editing]);

  if (!isOpen) return null;

  return showComp ? (
    showComp == "cold-email" ? (
      // <SampleEmailModal onClose={handleClose} />
      <EditColdEmail
        onEdit={onEdit}
        onSelectNode={onSelectNode}
        onClose={handleClose}
      />
    ) : (
      <EditDelays
        onEdit={onEdit}
        onSelectNode={onSelectNode}
        onClose={handleClose}
      />
    )
  ) : (
    <NodeTypesModal onClose={onClose} handleChange={handleChange} />
  );
};

function NodeTypesModal({
  handleChange,
  onClose,
}: {
  handleChange: Function;
  onClose: () => void;
}) {
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

function ButtonType({
  handleChange,
  text,
  icon,
  className,
  subText,
}: ButtonTypeProps) {
  return (
    <button
      className={`w-full p-4 text-left rounded-lg border-2  transition ${className}`}
      // onClick={() => onSelectNode('cold-email')}
      onClick={() => handleChange()}
    >
      <div className="font-semibold flex items-center gap-2">
        {icon}
        {text}
      </div>
      <div className="text-sm text-gray-600 mt-1">{subText}</div>
    </button>
  );
}

const EditDelays = ({
  onClose,
  onSelectNode,
  onEdit,
}: {
  onClose: (arg0?: boolean) => void;
  onSelectNode: (
    type: NodeTypes,
    data: { emailBody?: string; type?: string; time?: number }
  ) => void;
  onEdit: (id: string, delay: { time: number; type: string }) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [delayTime, setDelayTime] = useState(1);
  const { editing, handleEdit } = useEditing();
  //   const { data: lists } = useQuery({
  //   queryKey: ["sampleEmail"],
  //   queryFn: () => getSampleEmails(),
  // });
  const lists = [{ title: "days" }, { title: "hours" }, { title: "minutes" }];
  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleDelayChange = (num: number) => {
    setDelayTime(num);
  };

  const handleClose = () => {
    handleEdit(null);
    onClose();
  };
  const { getNodes } = useReactFlow();
  useEffect(() => {
    if (!editing) return;
    const nodes = getNodes();
    for (let node in nodes) {
      if (nodes[node].id == editing) {
        console.log(nodes[node].data);
        const delayData = nodes[node].data.delay as NodeDataType;
        setSelectedOption(delayData.type as string);
        setDelayTime(delayData.time as number);
        // console.log(editing,`editing`)
        // console.log()
        // onEdit(editing,e)
      }
      // if(key.id == editing)
    }
  }, [editing]);
  function handleUpdate() {
    console.log(editing);
    if (editing) {
      onEdit(editing as string, { time: delayTime, type: selectedOption });
      handleEdit(null);
      onClose(false);
      return;
    }
    onSelectNode("wait", { type: selectedOption, time: delayTime });

    return;

    // handleSteps({ type: "cold-email", emailBody: selectedOption,id:'d',stepNumber:1 });
    // onEdit(editing,selectedOption)
    // onClose()
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[800px] px-10 py-5 h-[calc(100vh-10px)] border rounded-md my-10 gap-4 flex flex-col bg-white">
        <div className="w-full text-left">
          <h2 className="text-2xl font-semibold">Edit Delays</h2>
          <span className="text-base font-normal">
            Send an Email with delays.
          </span>
        </div>
        <div className="text-left">
          <div className="">
            <h3 className="text-lg font-semibold">Edit time</h3>
            {lists && (
              <SelectBox
                selectedOption={selectedOption}
                handleChange={handleChange}
                options={lists}
                labelText="Choose delay"
              />
            )}
            {selectedOption && (
              <InputBox num={delayTime} handleNum={handleDelayChange} />
            )}
          </div>
        </div>
        <div className="flex gap-5 mt-auto">
          <button
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const EditColdEmail = ({
  onClose,
  onSelectNode,
  onEdit,
}: {
  onSelectNode: SelectNodeProps;
  onClose: (canEdit?: boolean) => void;
  onEdit: (id: string, data: NodeDataType) => void;
}) => {
  // const [emails,setEmails] = useState()

  // useEffect(()=>{
  //    const data= axiosInstance(`/api/emails/sample-email`).then(res=>res.data).then(data=>data)
  //    console.log(data)
  // },[])
  const { data: lists } = useQuery({
    queryKey: ["sampleEmail"],
    queryFn: () => getSampleEmails(),
  });
  const [selectedOption, setSelectedOption] = useState("");
  const { handleEdit, editing } = useEditing();
  const { getNodes, getNode } = useReactFlow();
  function handleUpdate() {
    if (editing) {
      onEdit(editing as string, { emailBody: selectedOption });
      handleEdit(null);
      onClose(false);
      return;
    }
    onSelectNode("cold-email", { emailBody: selectedOption });
    onClose();

    return;

    // handleSteps({ type: "cold-email", emailBody: selectedOption,id:'d',stepNumber:1 });
    // onEdit(editing,selectedOption)
    // onClose()
  }

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleClose = () => {
    handleEdit(null);
    onClose();
  };

  useEffect(() => {
    if (!editing) return;
    const nodes = getNodes();
    for (let node in nodes) {
      if (nodes[node].id == editing) {
        setSelectedOption(nodes[node].data.emailBody as string);
        // console.log(editing,`editing`)
        // console.log()
        // onEdit(editing,e)
      }
      // if(key.id == editing)
    }
  }, [editing]);

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
            <SelectBox
              selectedOption={selectedOption}
              handleChange={handleChange}
              options={lists}
              labelText="Choose an option"
            />
          </div>
        </div>
        <div className="flex gap-5 mt-auto">
          <button
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectBox = ({
  options,
  handleChange,
  selectedOption,
  labelText,
}: {
  handleChange: (arg0: string) => void;
  selectedOption: string;
  options: { title: string }[];
  labelText: string;
}) => {
  const updateSequence = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e.target.value);
  };

  const handleClearSelection = () => {
    handleChange(""); // This will clear the selection
  };
  return (
    <div className="w-full text-left mx-auto mt-10	relative">
      <label
        htmlFor="options"
        className="block text-gray-700 font-semibold mb-2"
      >
        {labelText}
      </label>
      <select
        id="options"
        value={selectedOption}
        onChange={(e) => updateSequence(e)}
        className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none"
      >
        <option value="">Please choose an option</option>
        {options &&
          options.map((item: { title: string }) => (
            <option value={item.title}>{item.title}</option>
          ))}
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

function InputBox({
  num,
  handleNum,
}: {
  num: number;
  handleNum: (num: number) => void;
}) {
  return (
    <div className="w-full mt-6 text-md">
      <label htmlFor="delay" className="block text-gray-700 font-semibold">
        Delay
      </label>
      <input
        className="block mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none"
        type="number"
        min={1}
        max={100}
        value={num}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleNum(Number(e.target.value))
        }
      />
    </div>
  );
}

export default NodeModal;
