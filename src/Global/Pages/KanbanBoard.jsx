import React, { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import CreateTaskForm from "../components/CreateTaskForm/CreateTaskForm";
import FloatingButtons from "../components/FloatingButtons/FloatingButtons";
import { useScreenSize } from "../Utils/useScreenSize";
import useTimers from "../Utils/useTimers";
import useTask from "../Utils/useTask";
import {
  users,
  backlogTasks,
  filterOptions,
  attendanceOptions,
  roleOptions,
  priorityOptions,
  statusOptions,
  sections,
  sectionTitles,
} from "../Utils/mockData";
import Header from "../components/Header/Header";
import BacklogSection from "../components/BacklogSection/BacklogSection";
import UserColumns from "../components/UserColumns/UserColumns";
import QuickCreateColumn from "../components/QuickCreateColumn/QuickCreateColumn";

function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedUserForCreate, setSelectedUserForCreate] = useState(null);
  const [showRightColumn, setShowRightColumn] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const isMobileView = useScreenSize();
  const {
    timers,
    handleStart,
    handlePause,
    handleResume,
    handleEnd,
    parseTimeToSeconds,
    formatSecondsToTime,
    pauseAllOtherTasks,
  } = useTimers();
  const { userTasks, moveTask, updateTask, handleAddTask } = useTask();

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

  const toggleSection = (userId, status) => {
    const key = `${userId}-${status}`;
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-800">
      <Header
        filterOptions={filterOptions}
        attendanceOptions={attendanceOptions}
        roleOptions={roleOptions}
        priorityOptions={priorityOptions}
        statusOptions={statusOptions}
        setShowCreateTask={setShowCreateTask}
        setSelectedUserForCreate={setSelectedUserForCreate}
      />

      <div className="flex h-[calc(100vh-78px)]">
        <BacklogSection
          showBacklog={showBacklog}
          setShowBacklog={setShowBacklog}
          backlogTasks={backlogTasks}
          setSelectedTask={setSelectedTask}
        />

        <UserColumns
          users={users}
          userTasks={userTasks}
          sections={sections}
          sectionTitles={sectionTitles}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          timers={timers}
          formatSecondsToTime={formatSecondsToTime}
          handleStart={handleStart}
          handlePause={handlePause}
          handleResume={handleResume}
          handleEnd={handleEnd}
          moveTask={moveTask}
          setSelectedTask={setSelectedTask}
          setSelectedUserForCreate={setSelectedUserForCreate}
          setShowCreateTask={setShowCreateTask}
        />

        <QuickCreateColumn
          showRightColumn={showRightColumn}
          setShowRightColumn={setShowRightColumn}
          users={users}
          setSelectedUserForCreate={setSelectedUserForCreate}
          setShowCreateTask={setShowCreateTask}
        />

        <FloatingButtons
          showRightColumn={showRightColumn}
          setShowRightColumn={setShowRightColumn}
          showBacklog={showBacklog}
          setShowBacklog={setShowBacklog}
          isMobileView={isMobileView}
          setSelectedUserForCreate={setSelectedUserForCreate}
          setShowCreateTask={setShowCreateTask}
        />
      </div>

      {selectedTask && (
        <TaskModal
          data={selectedTask}
          onClose={() => setSelectedTask(null)}
          users={users}
          sections={sections}
          sectionTitles={sectionTitles}
          moveTask={moveTask}
          updateTask={updateTask}
        />
      )}

      {showCreateTask && (
        <CreateTaskForm
          onClose={() => setShowCreateTask(false)}
          defaultUserId={selectedUserForCreate}
          users={users}
          handleAddTask={handleAddTask}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
