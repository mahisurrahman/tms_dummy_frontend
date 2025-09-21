import { useState } from 'react';

export const useTaskManagement = (initialTasks) => {
  const [userTasks, setUserTasks] = useState(initialTasks);

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

  const addTask = (userId, newTask) => {
    setUserTasks((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newTask],
    }));
  };

  const updateTaskTime = (userId, taskId, newTime) => {
    setUserTasks((prev) => ({
      ...prev,
      [userId]: prev[userId].map((t) =>
        t.id === taskId ? { ...t, timeSpent: newTime } : t
      ),
    }));
  };

  return {
    userTasks,
    moveTask,
    addTask,
    updateTaskTime,
  };
};