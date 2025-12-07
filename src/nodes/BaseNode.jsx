import { Handle, Position } from "reactflow";

export const NAME = ({ data, id }) => {
  const { label, handles, Icon } = data;
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
        {Icon ? (
          <div
            className="node-icon"
            dangerouslySetInnerHTML={{ __html: Icon }}
          />
        ) : null}
        <span>{label}</span>
      </div>
      <div>This is {label} node</div>
      {Array.from({ length: handles.source }).map((_, index) => {
        return (
          <Handle
            key={index}
            type="source"
            position={Position.Right}
            id={`${id}-value`}
            style={{
              top: `${((index + 1) * 100) / (handles.source + 1)}%`,
              border: "1px solid blue",
              backgroundColor: "white",
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
              border: "1px solid blue",
              backgroundColor: "white",
            }}
          />
        );
      })}
    </div>
  );
};
