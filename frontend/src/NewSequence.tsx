import { ChevronDown } from "lucide-react";
import FlowEditor from "./Components/Flow/FlowEditor";

function NewSequence() {
  return (
    <main className=" mx-12 my-10 h-full flex flex-col">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-start text-3xl font-semibold">New</h2>
          <span className="text-base font-normal">Click on a block to configure and add it in sequence.</span>
        </div>
        <div className=" mr-10 flex h-10 cursor-pointer items-center rounded text-white px-4 flex-row gap-2 bg-blue-600">
          <h3 className="text-lg mx-auto font-medium">Publish</h3>
          <div className="ml-10 font-bold">|</div>
          <ChevronDown className="" />
        </div>
      </div>
      <FlowEditor />
      
    </main>
  );
}

export default NewSequence;
