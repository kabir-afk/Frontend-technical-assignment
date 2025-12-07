// llmNode.js

import { Handle, Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
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
        id={`${id}-system`}
        style={{
          top: `${100 / 3}%`,
          border: "1px solid blue",
          backgroundColor: "white",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{
          top: `${200 / 3}%`,
          border: "1px solid blue",
          backgroundColor: "white",
        }}
      />
      <div className="flex gap-1 bg-purple-light text-purple-dark font-medium rounded-md p-1">
        <span>LLM</span>
      </div>
      <div>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{
          border: "1px solid blue",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};
