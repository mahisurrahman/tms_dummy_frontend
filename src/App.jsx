
import { Route, Routes } from "react-router";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
      </Routes>
    </div>
  );
}

export default App;
