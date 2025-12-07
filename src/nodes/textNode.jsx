// textNode.js

import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [height, setHeight] = useState("auto");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && height === "fit") {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
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
      <div className="flex gap-1 bg-purple-light text-purple-dark font-medium rounded-md p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5957A3"
        >
          <path d="M200-280h560v-80H200v80Zm0-160h560v-80H200v80Zm0-160h400v-80H200v80Zm-40 440q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
        </svg>
        <span>Text</span>
      </div>
      <div className="px-2 py-1">
        <label className="block w-full">
          <textarea
            style={{ height }}
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            onInput={handleTextChange}
            rows={1}
            className="w-full p-1 resize-none overflow-hidden border-2 border-purple-light rounded-sm focus:border-purple-light focus:outline-none focus:ring-0"
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          border: "1px solid blue",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};
