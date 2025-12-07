// submit.js
import { useStore } from "./store";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      const nodesData = nodes.map((e) => e.id);
      const edgesData = edges.map((e) => {
        return { source: e.source, target: e.target };
      });
      const res = await axios.post("http://localhost:8000/pipelines/parse", {
        nodesData,
        edgesData,
      });
      const { num_nodes, num_edges, is_dag } = res.data;
      toast.custom(() => (
        <div className="flex flex-col bg-white p-2 rounded-md">
          <p>Number of Nodes : {num_nodes}</p>
          <p>Number of Edges : {num_edges}</p>
          <p>Is pipeline DAG : {JSON.stringify(is_dag)}</p>
        </div>
      ));
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div>
        <Toaster />
      </div>
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
