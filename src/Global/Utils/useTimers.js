import { useState, useEffect } from "react";
import { taskLogAPI } from "../../api/endpoints/taskLog.api";

const useTimers = () => {
  const [timers, setTimers] = useState({});
  const [localStartTimes, setLocalStartTimes] = useState({});
  const [pausedStates, setPausedStates] = useState({});

  useEffect(() => {
    return () => {
      Object.values(timers).forEach((timer) => {
        if (timer.intervalId) clearInterval(timer.intervalId);
      });
    };
  }, [timers]);

  const parseTimeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
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

  // Convert milliseconds to time string
  const formatMillisecondsToTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Parse time string to milliseconds
  const parseTimeToMilliseconds = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m, s] = timeStr.split(":").map(Number);
    return (h * 3600 + m * 60 + s) * 1000;
  };

  const pauseAllOtherTasks = (userId, currentTaskId, userTasks) => {
    setTimers((prev) => {
      const newTimers = { ...prev };
      (userTasks[userId] || []).forEach((t) => {
        if (
          t._id !== currentTaskId &&
          t.taskStatus === "ongoing" &&
          newTimers[t._id]?.isRunning
        ) {
          const ex = newTimers[t._id];
          if (ex.intervalId) clearInterval(ex.intervalId);
          newTimers[t._id] = { ...ex, isRunning: false, intervalId: undefined };
        }
      });
      return newTimers;
    });
  };

  const handleStart = async (taskId, userId, userTasks, moveTask) => {
    try {
      // Call backend API to start task
      const response = await taskLogAPI.startTask(taskId);
      const totalOnGoing = response.data.totalOnGoingTime || 0;

      // If task is pending, move it to ongoing
      const task = findTaskById(userTasks, userId, taskId);
      if (task?.taskStatus === "pending") {
        moveTask(userId, taskId, "ongoing");
      }

      // Pause all other running tasks
      pauseAllOtherTasks(userId, taskId, userTasks);

      // Calculate initial accumulated time
      let accumulatedMs = 0;
      if (totalOnGoing) {
        if (typeof totalOnGoing === "string") {
          accumulatedMs = parseTimeToMilliseconds(totalOnGoing);
        } else {
          accumulatedMs = totalOnGoing;
        }
      }

      // Set local start time for accurate timer calculation
      setLocalStartTimes((prev) => ({
        ...prev,
        [taskId]: new Date(),
      }));

      setPausedStates((prev) => ({
        ...prev,
        [taskId]: false,
      }));

      // Start the timer interval
      const intervalId = setInterval(() => {
        setTimers((prev) => {
          const existing = prev[taskId];
          if (!existing) return prev;

          const localStart = localStartTimes[taskId] || new Date();
          const currentSessionMs = new Date() - localStart;
          const totalMs = accumulatedMs + currentSessionMs;

          return {
            ...prev,
            [taskId]: {
              ...existing,
              accumulated: totalMs,
              displayTime: formatMillisecondsToTime(totalMs),
            },
          };
        });
      }, 1000);

      setTimers((prev) => ({
        ...prev,
        [taskId]: {
          accumulated: accumulatedMs,
          isRunning: true,
          intervalId,
          displayTime: formatMillisecondsToTime(accumulatedMs),
          totalOnGoingTime: totalOnGoing,
        },
      }));
    } catch (error) {
      console.error("Failed to start task:", error);
    }
  };

  const handlePause = async (taskId) => {
    try {
      // Call backend API to pause task
      const response = await taskLogAPI.pauseTask(taskId);
      const updatedTotal = response.data.totalOnGoingTime;

      // Stop the timer
      setTimers((prev) => {
        const existing = prev[taskId];
        if (!existing || !existing.isRunning) return prev;

        if (existing.intervalId) clearInterval(existing.intervalId);

        // Update with final time from backend
        let finalAccumulated = existing.accumulated;
        if (updatedTotal) {
          if (typeof updatedTotal === "string") {
            finalAccumulated = parseTimeToMilliseconds(updatedTotal);
          } else {
            finalAccumulated = updatedTotal;
          }
        }

        return {
          ...prev,
          [taskId]: {
            ...existing,
            accumulated: finalAccumulated,
            isRunning: false,
            intervalId: undefined,
            displayTime: formatMillisecondsToTime(finalAccumulated),
            totalOnGoingTime: updatedTotal,
          },
        };
      });

      setPausedStates((prev) => ({
        ...prev,
        [taskId]: true,
      }));
    } catch (error) {
      console.error("Failed to pause task:", error);
    }
  };

  const handleResume = async (taskId, userId, userTasks) => {
    try {
      // For resume, we'll use startTask API which should handle resuming
      const response = await taskLogAPI.startTask(taskId);
      const totalOnGoing = response.data.totalOnGoingTime || 0;

      // Pause all other running tasks
      pauseAllOtherTasks(userId, taskId, userTasks);

      // Calculate accumulated time from backend
      let accumulatedMs = 0;
      if (totalOnGoing) {
        if (typeof totalOnGoing === "string") {
          accumulatedMs = parseTimeToMilliseconds(totalOnGoing);
        } else {
          accumulatedMs = totalOnGoing;
        }
      }

      // Set new local start time
      setLocalStartTimes((prev) => ({
        ...prev,
        [taskId]: new Date(),
      }));

      setPausedStates((prev) => ({
        ...prev,
        [taskId]: false,
      }));

      // Start the timer interval
      const intervalId = setInterval(() => {
        setTimers((prev) => {
          const existing = prev[taskId];
          if (!existing) return prev;

          const localStart = localStartTimes[taskId] || new Date();
          const currentSessionMs = new Date() - localStart;
          const totalMs = accumulatedMs + currentSessionMs;

          return {
            ...prev,
            [taskId]: {
              ...existing,
              accumulated: totalMs,
              displayTime: formatMillisecondsToTime(totalMs),
            },
          };
        });
      }, 1000);

      setTimers((prev) => ({
        ...prev,
        [taskId]: {
          accumulated: accumulatedMs,
          isRunning: true,
          intervalId,
          displayTime: formatMillisecondsToTime(accumulatedMs),
          totalOnGoingTime: totalOnGoing,
        },
      }));
    } catch (error) {
      console.error("Failed to resume task:", error);
    }
  };

  const handleEnd = async (taskId, userId, userTasks, moveTask) => {
    try {
      // Stop the timer
      setTimers((prev) => {
        const existing = prev[taskId];
        if (existing) {
          if (existing.intervalId) clearInterval(existing.intervalId);
          const { [taskId]: _, ...rest } = prev;
          return rest;
        }
        return prev;
      });

      // Clear local states
      setLocalStartTimes((prev) => {
        const { [taskId]: _, ...rest } = prev;
        return rest;
      });

      setPausedStates((prev) => {
        const { [taskId]: _, ...rest } = prev;
        return rest;
      });

      // Move task to completed
      moveTask(userId, taskId, "completed");
    } catch (error) {
      console.error("Failed to end task:", error);
    }
  };

  // Helper function to find task by ID
  const findTaskById = (userTasks, userId, taskId) => {
    return (userTasks[userId] || []).find((t) => t._id === taskId);
  };

  // Get display time for a task
  const getDisplayTime = (taskId) => {
    const timer = timers[taskId];
    if (timer?.displayTime) {
      return timer.displayTime;
    }

    // Fallback to accumulated time calculation
    if (timer?.accumulated) {
      return formatMillisecondsToTime(timer.accumulated);
    }

    return "00:00:00";
  };

  // Check if task is running
  const isTaskRunning = (taskId) => {
    return timers[taskId]?.isRunning || false;
  };

  // Check if task is paused
  const isTaskPaused = (taskId) => {
    return pausedStates[taskId] || false;
  };

  return {
    timers,
    handleStart,
    handlePause,
    handleResume,
    handleEnd,
    parseTimeToSeconds,
    formatSecondsToTime,
    formatMillisecondsToTime,
    parseTimeToMilliseconds,
    pauseAllOtherTasks,
    getDisplayTime,
    isTaskRunning,
    isTaskPaused,
  };
};

export default useTimers;
