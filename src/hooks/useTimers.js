import { useState, useEffect, useCallback } from 'react';
import { parseTimeToSeconds, formatSecondsToTime } from '../utils/timeUtils';

export const useTimers = () => {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    return () => {
      Object.values(timers).forEach((timer) => {
        if (timer.intervalId) clearInterval(timer.intervalId);
      });
    };
  }, [timers]);

  const startTimer = useCallback((taskId, initialTime = "00:00:00") => {
    setTimers((prev) => {
      const existing = prev[taskId];
      if (existing && existing.isRunning) return prev;

      const baseSeconds = existing ? existing.accumulated : parseTimeToSeconds(initialTime);
      const intervalId = setInterval(() => {
        setTimers((p) => ({
          ...p,
          [taskId]: { ...p[taskId], accumulated: p[taskId].accumulated + 1 },
        }));
      }, 1000);

      return { 
        ...prev, 
        [taskId]: { accumulated: baseSeconds, isRunning: true, intervalId } 
      };
    });
  }, []);

  const pauseTimer = useCallback((taskId) => {
    setTimers((prev) => {
      const existing = prev[taskId];
      if (!existing || !existing.isRunning) return prev;
      
      if (existing.intervalId) clearInterval(existing.intervalId);
      return { 
        ...prev, 
        [taskId]: { ...existing, isRunning: false, intervalId: undefined } 
      };
    });
  }, []);

  const stopTimer = useCallback((taskId) => {
    setTimers((prev) => {
      const existing = prev[taskId];
      if (existing?.intervalId) clearInterval(existing.intervalId);
      
      const { [taskId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const getFormattedTime = useCallback((taskId, fallbackTime = "00:00:00") => {
    const timer = timers[taskId];
    return timer ? formatSecondsToTime(timer.accumulated) : fallbackTime;
  }, [timers]);

  return {
    timers,
    startTimer,
    pauseTimer,
    stopTimer,
    getFormattedTime,
    isRunning: (taskId) => timers[taskId]?.isRunning || false,
  };
};