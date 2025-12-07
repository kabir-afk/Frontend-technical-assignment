// textNode.js
import { useStore } from "../store";
import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const nodes = useStore((state) => state.nodes);
  const [isError, setIsError] = useState(false);
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [isJSVariable, setIsJSVariable] = useState(new Set());
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
    const matches = e.target.value.match(/\{\{.*?\}\}/g);
    if (matches) {
      setIsJSVariable(new Set(matches));
    } else {
      setIsJSVariable(new Set());
    }
  };

  useEffect(() => {
    const variables = Array.from(isJSVariable).map((e) =>
      e.replace(/\{\{|\}\}/g, "")
    );
    const nodeNames = nodes.map((node) => node.data.name);
    variables.forEach((variable) => {
      setIsError(
        nodeNames.find((nodeName) => nodeName === variable) ? false : true
      );
    });
  }, [isJSVariable, nodes]);

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
      <div className="bg-purple-light p-1 rounded-md">
        <div className="flex gap-1 text-purple-dark font-medium rounded-md">
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
        <p className="text-xs">
          Use double curly brackets to declare Javascript Variables
        </p>
      </div>
      <div className="px-2 py-1">
        {isError && (
          <div className=" p-1 mb-1 text-red-600 bg-red-100 font-semibold text-sm rounded-md">
            Please delete invalid variables
          </div>
        )}
        <label className="block w-full">
          <textarea
            style={{ height }}
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
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
      {isJSVariable.size > 0 &&
        Array.from(isJSVariable).map((_, index) => {
          return (
            <Handle
              key={index}
              type="target"
              position={Position.Left}
              id={`${id}-var-output`}
              style={{
                top: `${((index + 1) * 100) / (isJSVariable.size + 1)}%`,
                border: "1px solid blue",
                backgroundColor: "white",
              }}
            />
          );
        })}
    </div>
  );
};
