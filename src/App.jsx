import React from "react";
import { Route, Routes } from "react-router";
import KanbanBoard from "./Global/Pages/KanbanBoard";
import LoginPage from "./Global/Pages/LoginPage";
import ProfilePage from "./Global/Pages/ProfilePage";
import SettingsPage from "./Global/Pages/SettingsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
