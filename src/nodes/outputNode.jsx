// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div
      style={{
        width: 200,
        boxShadow: "0 0 0 2px #D7D8EC",
        padding: "4px",
        borderRadius: "4px",
        backgroundColor: "white",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{ border: "1px solid blue", backgroundColor: "white" }}
      />
      <div className=" bg-purple-light p-1 rounded-md">
        <div className="flex gap-1 text-purple-dark font-medium rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5957A3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v80h-80v-80H200v560h560v-80h80v80q0 33-23.5 56.5T760-120H200Zm480-160-56-56 103-104H360v-80h367L624-624l56-56 200 200-200 200Z" />
          </svg>
          <span>Output</span>
        </div>
        <p className="text-xs">Output of your workflow</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2">
        <label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="w-full bg-purple-light text-purple-dark my-2 rounded-sm text-center font-medium border-transparent focus:border-purple-light focus:outline-none focus:ring-0"
          />
        </label>
        <label className="w-full text-xs">
          <div className="flex justify-between">
            <span className="font-bold">Type:</span>
            <span className="bg-purple-medium text-white rounded-sm px-1">
              Dropdown
            </span>
          </div>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="w-full text-base border-2 border-purple-light rounded-sm my-1 focus:border-purple-light focus:outline-none focus:ring-0"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
};
