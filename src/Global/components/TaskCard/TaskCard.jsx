import React from "react";
import { User, Calendar, Flag, Play, Pause, Square, ClipboardList, CheckCircle, Bell } from "lucide-react";
import { getPriorityColor, getStatusColor, getStatusIcon } from "../../Utils/TaskUtils";

const TaskCard = ({
  index,
  task,
  isBacklog = false,
  userId,
  timers,
  formatSecondsToTime,
  handleStart,
  handlePause,
  handleResume,
  handleEnd,
  moveTask,
  onClick
}) => {
  console.log("TaskCard props", { task, timers, userId });
  const timer = task[task?.id];
  const isRunning = timer ? timer.isRunning : false;
  const displayTime = timer
    ? formatSecondsToTime(timer.accumulated)
    : task.timeSpent;


  return (
    <div
      className={`bg-white rounded-xl p-4 mb-3 transition-all duration-300 transform cursor-pointer  ${
        task.priority === "High"
          ? "border-red-500 shadow-red-100"
          : task.priority === "Medium"
          ? "border-yellow-500 shadow-yellow-100"
          : "border-green-500 shadow-green-100"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2 relative">
        {isBacklog ? (
          <h4 className="font-bold text-gray-800 truncate flex-1">
            {task.title}
          </h4>
        ) : (
          <h4 className="font-bold text-gray-800 truncate flex-1">
            {index}. {task.title}
          </h4>
        )}
        {!isBacklog && (
          <span
            className={`inline-flex items-center  mt-3 px-2 py-1 rounded animate-pulse text-xs font-medium bg-gradient-to-r ${getStatusColor(
              task.status
            )} text-white`}
          >
            {getStatusIcon(task.status)}
            <span className="ml-1 capitalize">{task.status}</span>
          </span>
        )}
        {!isBacklog && task.comments?.length > 0 && (
          <div className="absolute top-[-8px] right-[-8px]">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        )}
      </div>

      {isBacklog ? (
        <div className="space-y-2 text-sm text-gray-600">
          <p className="text-xs leading-relaxed">{task.description}</p>
          <div className="flex flex-col items-start justify-between">
            <span className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {task.createdBy}
            </span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {task.deadline}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
                task.priority
              )} text-white`}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </span>
            <span
              className={`text-yellow-600 text-xl font-bold ${
                isRunning ? "animate-pulse" : ""
              }`}
            >
              {displayTime}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>By: {task.assignedBy}</span>
            <span>{task.assignedDate}</span>
          </div>

          <div className="flex gap-1 mt-3">
            {task.status === "pending" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(task, userId);
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center"
              >
                <Play className="w-3 h-3 mr-1" />
                Start
              </button>
            )}
            {task.status === "ongoing" && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isRunning) {
                      handlePause(task, userId);
                    } else {
                      handleResume(task, userId);
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center"
                >
                  {isRunning ? (
                    <Pause className="w-3 h-3 mr-1" />
                  ) : (
                    <Play className="w-3 h-3 mr-1" />
                  )}
                  {isRunning ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnd(task, userId);
                  }}
                  className="flex-1 bg-gradient-to-r from-red-700 to-pink-700 text-white text-lg py-2 px-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center"
                >
                  <Square className="w-3 h-3 mr-1" />
                  End
                </button>
              </>
            )}
            {task.status === "completed" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveTask(userId, task.id, "review");
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-violet-700 text-white text-lg py-2 px-2 rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all flex items-center justify-center"
              >
                <ClipboardList className="w-3 h-3 mr-1" />
                Review this task
              </button>
            )}
            {task.status === "review" && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveTask(userId, task.id, "pending");
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-700 text-white text-lg py-2 px-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Re-assign
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveTask(userId, task.id, "finished");
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-lime-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-lime-600 transition-all flex items-center justify-center"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Confirmed
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;