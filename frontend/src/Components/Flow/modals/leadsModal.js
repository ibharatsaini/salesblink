import React, { useRef, useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import Papa from "papaparse";

const LeadsModal = ({ isOpen, onClose, onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [selectedColumns, setSelectedColumn] = useState();
  const [leadColumns, setLeadColumns] = useState([]);
  const [file,setFile] = useState()

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const current = event.target.files?.[0];
    if (current) {
      // onFileSelect(file);
      setFile(current)
      Papa.parse(current, {
        header: true, // Convert rows to objects using the header row
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed CSV Data:", results.data);
          if (results.meta && results.meta.fields) {
            setLeadColumns(results.meta.fields);

            // setColumns(result.meta.fields); // Set column names from the CSV
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
    // onClose();
  };
  console.log(leadColumns);
  function handleSelect(value) {
    setSelectedColumn(value);
  }
  function handleUpdate(){
    if(!selectedColumns) return
    // console.log(fileInputRef.files)
    Papa.parse(file,{
      header: true, // Ensures the first row is used as keys for objects
        skipEmptyLines: true,
        complete: (results) => {
          const extractedColumn = results.data.map((row) => row[selectedColumns]);
          onFileSelect(file,extractedColumn)
          onClose()
        }
    })
   
  }
  console.log(leadColumns);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Import Leads</h2>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
            {/* <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            /> */}
            {leadColumns.length ? (
              <SelectColumn options={leadColumns} selectedColumns={selectedColumns} handleSelect={handleSelect} />
            ) : (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {/* <CSVDownload data={csvData} target="_blank" />; */}
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Select File
                  </button>
                  <p className="mt-2 text-sm text-gray-600">
                    Supported formats: CSV
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
        <button
          className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
          onClick={onClose}
        >
          Cancel
        </button>
        {
          selectedColumns &&  <button
          className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full"
          onClick={handleUpdate}
        >
          Update
        </button>
        }
        </div>
      </div>
    </div>
  );
};

function SelectColumn({ options, handleSelect,selectedColumns }) {
  console.log(options, handleSelect);
  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="relative">
      <label htmlFor="" className="">Choose emails' column name:</label>
      <select
        id="options"
        value={selectedColumns}
        onChange={(e) => handleSelect(e.target.value)}
        className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 appearance-none"
      >
        
        <option value="">Please choose an option</option>
        {options && options.map((item) => <option value={item}>{item}</option>)}
      </select>
      <div className="absolute right-3 top-[50px] transform -translate-y-1/2 pointer-events-none">
        <ChevronDown className="text-gray-500" />
      </div>
     </div>
  );
}
export default LeadsModal;
