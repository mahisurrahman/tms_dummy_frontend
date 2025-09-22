import { useState } from "react";

const useTask = () => {
  const [userTasks, setUserTasks] = useState({
    // ... your initial tasks data
  });

  const moveTask = (userId, taskId, newStatus) => {
    setUserTasks((prev) => {
      const userT = prev[userId] || [];
      const taskIndex = userT.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;
      const newTasks = [...userT];
      newTasks[taskIndex] = { ...newTasks[taskIndex], status: newStatus };
      return { ...prev, [userId]: newTasks };
    });
  };

  const updateTask = (userId, taskId, updates) => {
    setUserTasks((prev) => {
      const userT = [...(prev[userId] || [])];
      const taskIndex = userT.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;
      userT[taskIndex] = { ...userT[taskIndex], ...updates };
      return { ...prev, [userId]: userT };
    });
  };

  const handleAddTask = (newTask, userId) => {
    newTask.id = `t${Date.now()}`;
    newTask.status = "pending";
    newTask.history = [
      { status: "created", date: new Date().toISOString().split("T")[0] },
    ];
    newTask.comments = [];
    setUserTasks((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newTask],
    }));
  };

  return {
    userTasks,
    setUserTasks,
    moveTask,
    updateTask,
    handleAddTask
  };
};

export default useTask;