import React from "react";
import { Route, Routes } from "react-router";
import KanbanBoard from "./Global/Pages/KanbanBoard";
import KanbanBoardTwo from "./Global/Pages/kanbanBoardTwo";
import KanbanBoardThree from "./Global/Pages/KanbanBoardThree";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/three" element={<KanbanBoard />} />
        <Route path="/two" element={<KanbanBoardTwo />} /> */}
        <Route path="/" element={<KanbanBoardThree />} />
      </Routes>
    </div>
  );
}

export default App;
