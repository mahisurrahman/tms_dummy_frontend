import React, { useState, useEffect } from "react";
import {
  Flag,
  Play,
  Pause,
  Square,
  ClipboardList,
  Calendar,
  User,
  Clock,
  Target,
} from "lucide-react";
import {
  getPriorityColor,
  getStatusColor,
  getStatusIcon,
} from "../../Utils/TaskUtils";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";
import { truncateText } from "../../Utils/truncateText";

const TaskCard = ({
  index,
  task,
  userTask,
  isBacklog = false,
  userId,
  timers,
  formatSecondsToTime,
  handleStart,
  handlePause,
  handleResume,
  handleEnd,
  moveTask,
  onClick,
  changeStatusTask,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("");

  const statuses = ["Pending", "InQueue", "Ongoing", "Review", "Complete"];

  useEffect(() => {
    if (!task?.assignedDate) return;

    const updateElapsed = () => {
      const assigned = new Date(task.assignedDate);
      const now = new Date();
      const diff = Math.floor((now - assigned) / 1000);

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [task?.assignedDate]);

  const handleStatusChange = (newStatus) => {
    changeStatusTask(task?.taskId, newStatus);
    // moveTask(userId, task.id, newStatus.toLowerCase());
    setShowModal(false);
  };

  const priorityStyles = {
    High: "shadow-red-100 hover:shadow-red-200",
    Medium: " shadow-amber-100 hover:shadow-amber-200",
    Low: " shadow-emerald-100 hover:shadow-emerald-200",
  };

  return (
    <>
      <div
        className={`bg-white rounded-2xl p-5 mb-4 transition-all duration-300 cursor-pointer border-l-4 hover:-translate-y-1 ${
          priorityStyles[task?.taskDetails?.taskPriority] ||
          "border-l-gray-500 shadow-gray-100"
        }`}
        onClick={onClick}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                #{index}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-gradient-to-r ${getPriorityColor(
                  task?.taskDetails?.taskPriority
                )} text-white shadow-sm`}
              >
                <Flag className="w-3 h-3" />
                {task?.taskDetails?.taskPriority}
              </span>
            </div>
          </div>

          <div className="animate-pulse flex flex-col items-end gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-gradient-to-r ${getStatusColor(
                task?.taskStatus
              )} text-white shadow-md`}
            >
              {/* <span className="text-sm">{getStatusIcon(task?.taskStatus)}</span> */}
              <span className="capitalize">{task?.taskStatus}</span>
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 text-gray-900 leading-tight">
            {task?.taskDetails?.taskTitle}
          </h4>
          <div className="grid grid-cols-3 gap-x-2 items-center text-center">
              {task?.assignedDate && (
            <div className="mb-4 ">
              <div className="flex items-center justify-center gap-1.5 text-blue-700">
                {/* <Clock className="w-3.5 h-3.5" /> */}
                <span className="text-sm text-center font-semibold">Since Assigned</span>
              </div>
              <span className="text-md font-mono font-bold text-indigo-900 block mt-0.5">
                {elapsedTime}
              </span>
            </div>
          )}
          {task?.assignedDate && (
            <div className="mb-4 ">
              <div className="flex items-center justify-center gap-1.5 text-blue-700">
                {/* <Clock className="w-3.5 h-3.5" /> */}
                <span className="text-sm text-center font-semibold capitalize">{task?.taskStatus} For</span>
              </div>
              <span className="text-md font-mono font-bold text-indigo-900 block mt-0.5">
                {elapsedTime}
              </span>
            </div>
          )}
           {task?.assignedDate && (
            <div className="mb-4 ">
              <div className="flex items-center justify-center gap-1.5 text-blue-700">
                {/* <Clock className="w-3.5 h-3.5" /> */}
                <span className="text-sm text-center font-semibold">Pause Time</span>
              </div>
              <span className="text-md font-mono font-bold text-indigo-900 block mt-0.5">
                00:00:00
              </span>
            </div>
          )}
          </div>
        </div>

        {/* DESCRIPTION */}
        {task?.taskDetails?.taskDescription && (
          <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              {truncateText(task?.taskDetails?.taskDescription, 150)}
            </p>
          </div>
        )}

        {/* INFO GRID */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <User className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="flex-1">
              <span className="text-xs text-gray-500 block">Assigned By</span>
              <span className="font-semibold text-gray-900">
                {task?.creatorDetails?.username}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-700" />
            </div>
            <div className="flex-1">
              <span className="text-xs text-gray-500 block">Assigned Date</span>
              <span className="font-semibold text-gray-900">
                {formatReadableDateTime(task?.assignedDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Target className="w-4 h-4 text-orange-700" />
            </div>
            <div className="flex-1">
              <span className="text-xs text-gray-500 block">Deadline</span>
              <span className="font-semibold text-gray-900">
                {formatReadableDateTime(task?.taskDetails?.expectedDeadline)}
              </span>
            </div>
          </div>
        </div>

        {/* TIMER BUTTONS */}
        {task?.taskStatus?.toLowerCase() === "ongoing" && (
          <div className="flex gap-2 mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isRunning) {
                  handlePause(task, userId);
                  setIsRunning(false);
                } else {
                  handleResume(task, userId);
                  setIsRunning(true);
                }
              }}
              className={`flex-1 ${
                isRunning
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
              } text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2`}
            >
              {isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isRunning ? "Pause" : "Resume"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnd(task, userId);
              }}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:from-violet-700 hover:to-purple-800 transition-all flex items-center justify-center gap-2"
            >
              <Square className="w-4 h-4" />
              Complete
            </button>
          </div>
        )}

        {/* CHANGE STATUS BUTTON */}
        {task?.taskDetails?.backlog === false && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold py-3 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4" />
            Change Status
          </button>
        )}
      </div>

      {/* STATUS MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
              Change Task Status
            </h3>

            <div className="flex flex-col gap-2.5 mb-6">
              {statuses.map((status) => {
                const isSelected =
                  task?.taskStatus?.toLowerCase() === status.toLowerCase();

                const gradientMap = {
                  complete: "from-green-500 to-green-600",
                  ongoing: "from-blue-500 to-blue-600",
                  pending: "from-pink-600 to-orange-500",
                  inqueue: "from-purple-500 to-violet-600",
                  review: "from-red-600 to-rose-600",
                };

                const gradient =
                  gradientMap[status.toLowerCase()] ||
                  "from-gray-400 to-gray-500";

                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-4 py-3.5 cursor-pointer rounded-xl text-sm font-semibold text-left transition-all duration-200 ${
                      isSelected
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105`
                        : `bg-gray-50 hover:bg-gradient-to-r hover:${gradient} hover:text-white hover:shadow-md text-gray-700 border-2 border-transparent hover:border-transparent`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{status}</span>
                      {isSelected && <span className="text-lg">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-red-500 cursor-pointer hover:bg-red-600 text-gray-50 font-semibold py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
