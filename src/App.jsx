import { PipelineToolbar } from "./toolbar.jsx";
import { PipelineUI } from "./ui.jsx";
import { SubmitButton } from "./submit.jsx";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
