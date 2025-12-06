import { useState } from "react";
import { Handle, Position } from "reactflow";

export const NAME = ({ data, id }) => {
  const { label, handles } = data;
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <div style={{ width: 200, border: "1px solid" }}>
      <div>
        <span>{label}</span>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
      </div>
      {Array.from({ length: handles.source }).map((_, index) => {
        return (
          <Handle
            key={index}
            type="source"
            position={Position.Right}
            id={`${id}-value`}
            style={{
              top: `${((index + 1) * 100) / (handles.source + 1)}%`,
            }}
          />
        );
      })}
      {Array.from({ length: handles.target }).map((_, index) => {
        return (
          <Handle
            key={index}
            type="target"
            position={Position.Left}
            id={`${id}-value`}
            style={{
              top: `${((index + 1) * 100) / (handles.target + 1)}%`,
            }}
          />
        );
      })}
    </div>
  );
};
