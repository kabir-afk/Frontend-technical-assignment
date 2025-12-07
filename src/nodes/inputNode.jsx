// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
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
      <div className=" bg-purple-light p-1 rounded-md">
        <div className="flex gap-1 text-purple-dark font-medium rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5957A3"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-480H160v120H80v-120q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm300-140-56-58 83-82H80v-80h407l-83-82 56-58 180 180-180 180Z" />
          </svg>
          <span>Input</span>
        </div>
        <p className="text-xs">Pass data of different types in your workflow</p>
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
            value={inputType}
            onChange={handleTypeChange}
            className="w-full text-base border-2 border-purple-light rounded-sm my-1 focus:border-purple-light focus:outline-none focus:ring-0"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{ border: "1px solid blue", backgroundColor: "white" }}
      />
    </div>
  );
};
