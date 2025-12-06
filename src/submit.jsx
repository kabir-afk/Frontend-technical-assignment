// submit.js
import { useStore } from "./store";
import axios from "axios";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      const nodesData = nodes.map((e) => e.id);
      const edgesData = edges.map((e) => {
        return { id: e.id, source: e.source, target: e.target };
      });
      const res = await axios.post("http://localhost:8000/pipelines/parse", {
        nodesData,
        edgesData,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <button
        type="submit"
        onClick={handleSubmit}
        className="border cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};
