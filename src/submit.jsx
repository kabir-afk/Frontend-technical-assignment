// submit.js
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  return (
    <div className="flex justify-center items-center">
      <button
        type="submit"
        onClick={() => console.log(nodes, edges)}
        className="border cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};
