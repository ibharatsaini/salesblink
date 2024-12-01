import { ChevronDown } from "lucide-react";
import FlowEditor from "./Components/Flow/FlowEditor";
import { useSequence } from "./context/sequenceContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addCampaign } from "./lib/dbQueries";

function NewSequence() {
  const { leads, steps } = useSequence();
  const {mutate} = useMutation({
    mutationFn: addCampaign,
    onSuccess: ()=>{
        toast.success(`Sequence started check your email.`)
    },
    onError: ()=>{
      toast.error(`Oops! Something went wrong, Please try again.`)
    }
  })
  function handleSubmit() {
    if(!leads || !leads.length || !steps || !steps.length){
        toast.error(`Please add leads and steps in correct manner.`)
        return
    }
    console.log(
      leads,steps
    )
    mutate({leads,steps})

  }
  return (
    <main className=" mx-12 my-10 h-full flex flex-col">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-start text-3xl font-semibold">New</h2>
          <span className="text-base font-normal">
            Click on a block to configure and add it in sequence.
          </span>
        </div>
        {
          <div
            onClick={handleSubmit}
            className=" mr-10 flex h-10 cursor-pointer items-center rounded text-white px-4 flex-row gap-2 bg-blue-600"
          >
            <h3 className="text-lg mx-auto font-medium">Publish</h3>
            <div className="ml-10 font-bold">|</div>
            <ChevronDown className="" />
          </div>
        }
      </div>
      <FlowEditor />
    </main>
  );
}

export default NewSequence;
