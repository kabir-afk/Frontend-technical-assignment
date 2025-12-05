import { useState } from "react";
import { Handle, Position } from "reactflow";

export const NAME = ({ data, id }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <div style={{ width: 200, border: "1px solid" }}>
      <div>{/* <span>{type}</span> */}</div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
};
