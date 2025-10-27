import React from "react";
import { ChevronDown } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";

const TaskSection = ({
  userId,
  user,
  status,
  title,
  tasks,
  isExpanded,
  onToggle,
  timers,
  formatSecondsToTime,
  handleStart,
  handlePause,
  handleResume,
  handleEnd,
  moveTask,
  setSelectedTask,
  changeStatusTask,
  allNotis,
}) => {
  const notificationCount = tasks.filter((task) =>
    allNotis.some(
      (noti) => noti.taskId === task._id || noti.taskId === task.taskId
    )
  ).length;

  return (
    <div key={status}>
      <div
        className="flex justify-between items-center mb-2 cursor-pointer bg-white/10 p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
        onClick={onToggle}
      >
        <h4 className="text-white font-semibold text-sm md:text-base">
          {title} ({tasks.length})
        </h4>
        <div className="flex items-center gap-x-2">
          {notificationCount > 0 && (
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
          <ChevronDown
            className={`w-5 h-5 text-white transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="gap-y-1">
          {tasks?.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard
                key={task?._id}
                index={index}
                task={task}
                userTask={task}
                user={user}
                userId={userId}
                timers={timers}
                formatSecondsToTime={formatSecondsToTime}
                handleStart={handleStart}
                handlePause={handlePause}
                handleResume={handleResume}
                handleEnd={handleEnd}
                moveTask={moveTask}
                onClick={() => setSelectedTask({ task, userId })}
                changeStatusTask={changeStatusTask}
                allNotis={allNotis}
              />
            ))
          ) : (
            <div className="text-center py-4 text-white/60 w-full h-full border-2 rounded-lg border-gray-600">
              😊 No tasks yet !!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
