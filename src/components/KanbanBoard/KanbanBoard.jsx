import React, { useState, useEffect } from "react";
import { useTimers } from '../../hooks/useTimers';
import { useTaskManagement } from '../../hooks/useTaskManagement';
import { useScreenSize } from '../../hooks/useScreenSize';
import { initialUserTasks, users, backlogTasks } from '../../utils/data';
import { sections, sectionTitles } from '../../utils/constants';
import Header from './Header/Header';
import UserColumn from './Columns/UserColumn';
import QuickCreateColumn from './Columns/QuickCreateColumn';
import TaskModal from './Modals/TaskModal';
import CreateTaskModal from './Modals/CreateTaskModal';
import FloatingActionButton from './UI/FloatingActionButton';
import ToggleButton from './UI/ToggleButton';
import BacklogColumns from "./Columns/BacklogColumns";

function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showRightColumn, setShowRightColumn] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const isMobileView = useScreenSize();
  const { timers, startTimer, pauseTimer, stopTimer, getFormattedTime, isRunning } = useTimers();
  const { userTasks, moveTask, addTask, updateTaskTime } = useTaskManagement(initialUserTasks);

  // Initialize expanded sections
  useEffect(() => {
    const initialExpanded = {};
    users.forEach((user) => {
      sections.forEach((status) => {
        const key = `${user.id}-${status}`;
        initialExpanded[key] = status === "ongoing";
      });
    });
    setExpandedSections(initialExpanded);
  }, []);

  const pauseAllOtherTasks = (userId, currentTaskId) => {
    (userTasks[userId] || []).forEach((task) => {
      if (task.id !== currentTaskId && task.status === "ongoing" && isRunning(task.id)) {
        pauseTimer(task.id);
      }
    });
  };

  const handleStart = (task, userId) => {
    if (task.status === "pending") {
      moveTask(userId, task.id, "ongoing");
    }
    pauseAllOtherTasks(userId, task.id);
    startTimer(task.id, task.timeSpent);
  };

  const handlePause = (task) => {
    pauseTimer(task.id);
  };

  const handleResume = (task, userId) => {
    pauseAllOtherTasks(userId, task.id);
    startTimer(task.id);
  };

  const handleEnd = (task, userId) => {
    const finalTime = getFormattedTime(task.id, task.timeSpent);
    updateTaskTime(userId, task.id, finalTime);
    stopTimer(task.id);
    moveTask(userId, task.id, "completed");
  };

  const toggleSection = (userId, status) => {
    const key = `${userId}-${status}`;
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-800">
      <Header 
        onAddTask={() => setShowCreateTask(true)}
        isMobileView={isMobileView}
      />

      <div className="flex h-[calc(100vh-78px)]">
        <BacklogColumns 
          isVisible={showBacklog}
          onToggle={() => setShowBacklog(!showBacklog)}
          tasks={backlogTasks}
          onTaskSelect={setSelectedTask}
        />

        <div className={`p-2 md:p-4 overflow-x-auto transition-all duration-300 ease-in-out ${
          showRightColumn ? "w-3/4 md:w-4/5 lg:w-[70%]" : "w-full"
        }`}>
          <div className="flex space-x-2 md:space-x-4 min-w-max">
            {users.map((user) => (
              <UserColumn
                key={user.id}
                user={user}
                tasks={userTasks[user.id] || []}
                expandedSections={expandedSections}
                onToggleSection={toggleSection}
                onTaskSelect={setSelectedTask}
                onStartTask={handleStart}
                onPauseTask={handlePause}
                onResumeTask={handleResume}
                onEndTask={handleEnd}
                onMoveTask={moveTask}
                getFormattedTime={getFormattedTime}
                isRunning={isRunning}
              />
            ))}
          </div>
        </div>

        <QuickCreateColumn
          isVisible={showRightColumn}
          onToggle={() => setShowRightColumn(!showRightColumn)}
          users={users}
          onAddTask={() => setShowCreateTask(true)}
        />

        <ToggleButton
          position="left"
          isVisible={!showBacklog}
          onClick={() => setShowBacklog(true)}
        />

        <ToggleButton
          position="right"
          isVisible={!showRightColumn}
          onClick={() => setShowRightColumn(true)}
        />

        <FloatingActionButton
          onAddTask={() => setShowCreateTask(true)}
          isMobileView={isMobileView}
        />
      </div>

      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          users={users}
        />
      )}

      {showCreateTask && (
        <CreateTaskModal 
          onClose={() => setShowCreateTask(false)} 
          users={users}
          onAddTask={addTask}
        />
      )}
    </div>
  );
}

export default KanbanBoard;