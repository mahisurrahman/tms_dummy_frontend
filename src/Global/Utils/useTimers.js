import { useState, useEffect } from "react";

const useTimers = () => {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    return () => {
      Object.values(timers).forEach((timer) => {
        if (timer.intervalId) clearInterval(timer.intervalId);
      });
    };
  }, [timers]);

  const parseTimeToSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + (s || 0);
  };

  const formatSecondsToTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const pauseAllOtherTasks = (userId, currentTaskId, userTasks) => {
    setTimers((prev) => {
      const newTimers = { ...prev };
      (userTasks[userId] || []).forEach((t) => {
        if (
          t.id !== currentTaskId &&
          t.status === "ongoing" &&
          newTimers[t.id]?.isRunning
        ) {
          const ex = newTimers[t.id];
          if (ex.intervalId) clearInterval(ex.intervalId);
          newTimers[t.id] = { ...ex, isRunning: false, intervalId: undefined };
        }
      });
      return newTimers;
    });
  };

  const handleStart = (task, userId, userTasks, moveTask) => {
    const taskId = task.id;
    if (task.status === "pending") {
      moveTask(userId, taskId, "ongoing");
    }
    pauseAllOtherTasks(userId, taskId, userTasks);
    setTimers((prev) => {
      const existing = prev[taskId];
      if (existing && existing.isRunning) return prev;
      const baseSeconds = existing
        ? existing.accumulated
        : parseTimeToSeconds(task.timeSpent);
      const intervalId = setInterval(() => {
        setTimers((p) => ({
          ...p,
          [taskId]: { ...p[taskId], accumulated: p[taskId].accumulated + 1 },
        }));
      }, 1000);
      return {
        ...prev,
        [taskId]: { accumulated: baseSeconds, isRunning: true, intervalId },
      };
    });
  };

  const handlePause = (taskId) => {
    setTimers((prev) => {
      const existing = prev[taskId];
      if (!existing || !existing.isRunning) return prev;
      if (existing.intervalId) clearInterval(existing.intervalId);
      return {
        ...prev,
        [taskId]: { ...existing, isRunning: false, intervalId: undefined },
      };
    });
  };

  const handleResume = (task, userId, userTasks) => {
    const taskId = task.id;
    pauseAllOtherTasks(userId, taskId, userTasks);
    setTimers((prev) => {
      const existing = prev[taskId];
      if (!existing || existing.isRunning) return prev;
      const intervalId = setInterval(() => {
        setTimers((p) => ({
          ...p,
          [taskId]: { ...p[taskId], accumulated: p[taskId].accumulated + 1 },
        }));
      }, 1000);
      return {
        ...prev,
        [taskId]: { ...existing, isRunning: true, intervalId },
      };
    });
  };

  const handleEnd = (task, userId, userTasks, moveTask) => {
    const taskId = task.id;
    setTimers((prev) => {
      const existing = prev[taskId];
      if (existing) {
        if (existing.intervalId) clearInterval(existing.intervalId);
        const newTime = formatSecondsToTime(existing.accumulated);
        userTasks((prevTasks) => ({
          ...prevTasks,
          [userId]: prevTasks[userId].map((t) =>
            t.id === taskId ? { ...t, timeSpent: newTime } : t
          ),
        }));
        const { [taskId]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
    moveTask(userId, taskId, "completed");
  };

  return {
    timers,
    handleStart,
    handlePause,
    handleResume,
    handleEnd,
    parseTimeToSeconds,
    formatSecondsToTime,
    pauseAllOtherTasks
  };
};

export default useTimers;