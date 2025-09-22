import React from "react";
import { Route, Routes } from "react-router";
import KanbanBoard from "./Global/Pages/KanbanBoard";
import KanbanBoardThree from "./Global/Pages/KanbanBoardThree";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/three" element={<KanbanBoardThree />} />
      </Routes>
    </div>
  );
}

export default App;
