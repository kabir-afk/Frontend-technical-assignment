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
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div style={{ width: 200, border: "1px solid black" }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label className="block w-full">
          Text:
          <textarea
            style={{ height }}
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            onInput={handleTextChange}
            rows={1}
            className="w-full p-1 resize-none overflow-hidden border rounded"
          />
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
