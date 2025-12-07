// submit.js
import { useStore } from "./store";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  const [isValidGraph, setIsValidGraph] = useState(false);
  useEffect(() => setIsValidGraph(edges.length >= 1 ? true : false), [edges]);

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
        <div className="flex flex-col border p-2 rounded-md bg-purple-light font-semibold">
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
        className={`border p-2 rounded-md bg-purple-light text-purple-medium font-semibold ${
          isValidGraph ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        disabled={!isValidGraph}
      >
        Submit
      </button>
    </div>
  );
};
