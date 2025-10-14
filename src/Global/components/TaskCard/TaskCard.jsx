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
  PlayCircle,
  PauseCircle,
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
  const [elapsedTime, setElapsedTime] = useState(""); // Since Assigned
  const [statusElapsedTime, setStatusElapsedTime] = useState(""); // Status Duration

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

  useEffect(() => {
    if (!task?.startTime) return;

    const updateStatusElapsed = () => {
      const start = new Date(task.startTime);
      const now = new Date();
      const diff = Math.floor((now - start) / 1000);

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setStatusElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateStatusElapsed();
    const interval = setInterval(updateStatusElapsed, 1000);
    return () => clearInterval(interval);
  }, [task?.startTime]);

  const handleStatusChange = (newStatus) => {
    const startTime = task?.startTime;
    const endTime = new Date().toISOString();
    changeStatusTask(task._id, task?.taskId, newStatus, startTime, endTime);
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
        className={`${
          task?.taskDetails?.taskPriority === "High"
            ? "border-red-600"
            : task?.taskDetails?.taskPriority === "Medium"
            ? "border-orange-600"
            : task?.taskDetails?.taskPriority === "Low"
            ? "border-green-600"
            : "border-white"
        } rounded-lg p-3 mb-2 transition-all duration-300 cursor-pointer border-4 bg-white hover:-translate-y-1 ${
          priorityStyles[task?.taskDetails?.taskPriority] ||
          "border-l-gray-500 shadow-gray-100"
        }`}
        onClick={onClick}
      >
        {/* HEADER */}
        <div>
          {!isBacklog ? (
            <h4 className="font-bold text-lg mb-1 text-gray-900 leading-tight">
              {index + 1}. {task?.taskDetails?.taskTitle}
            </h4>
          ) : (
            <h4 className="font-bold text-md mb-1 text-gray-900 leading-tight">
              {index + 1}. {task?.taskTitle}
            </h4>
          )}
          {!isBacklog && task?.taskStatus === "ongoing" && (
            <div className="w-full flex items-center justify-center">
              {/* Status Duration */}
              {task?.startTime && (
                <div className="mb-2 flex items-center gap-x-2 justify-center">
                  <div className="flex items-center justify-center gap-1.5 text-blue-700">
                    <span className="text-sm text-center font-semibold capitalize">
                      <PlayCircle />
                    </span>
                  </div>
                  <span className="text-md font-mono font-bold text-indigo-900 block mt-0.5">
                    {statusElapsedTime}
                  </span>
                </div>
              )}
            </div>
          )}

          {!isBacklog && (
            <div className="grid grid-cols-2 items-start gap-x-2 ">
              <div className="flex-1 w-full">
                <div className="w-full flex items-center gap-2 mb-1">
                  <span
                    className={`w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded text-[10px] font-semibold bg-gradient-to-r ${getPriorityColor(
                      task?.taskDetails?.taskPriority
                    )} text-white shadow-sm`}
                  >
                    Priority:
                    <Flag className="w-3 h-3" />
                    {task?.taskDetails?.taskPriority}
                  </span>
                </div>
              </div>

              <div className="w-full animate-pulse flex flex-col items-end gap-2">
                <span
                  className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold bg-gradient-to-r ${getStatusColor(
                    task?.taskStatus
                  )} text-white shadow-md`}
                >
                  {" "}
                  Status:
                  <span className="capitalize">{task?.taskStatus}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {/* {task?.taskDetails?.taskDescription && (
          <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              {truncateText(task?.taskDetails?.taskDescription, 150)}
            </p>
          </div>
        )} */}

        {/* INFO GRID */}
        <div className="grid grid-cols-1 mb-1">
          <div className="flex items-center gap-2 text-sm">
            {!isBacklog ? (
              <div className="flex items-center gap-x-2">
                <span className="text-[10px] font-semibold text-black block">
                  Assigned By :
                </span>
                <span className="text-[10px] text-gray-900">
                  {task?.creatorDetails?.username}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <span className="text-[10px] font-semibold text-black block">
                  Assigned By:{" "}
                </span>
                <span className="text-[10px] text-gray-900">
                  {task?.taskCreatedBy?.username}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-x-2">
              <span className="text-[10px] font-semibold text-black block">
                Assigned Date:{" "}
              </span>
              <span className="text-[10px] text-gray-900">
                {formatReadableDateTime(task?.assignedDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {!isBacklog ? (
              <div className="flex items-center gap-x-2">
                <span className="text-[10px] font-semibold text-black block">
                  Expected Deadline
                </span>
                <span className="text-[10px] text-gray-900">
                  {formatReadableDateTime(task?.taskDetails?.expectedDeadline)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <span className="text-[10px]font-semibold text-black block">
                  Deadline
                </span>
                <span className="text-[10px] text-gray-900">
                  {formatReadableDateTime(task?.expectedDeadline)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center flex-wrap gap-x-1 gap-y-1">
              <span className="text-[10px] font-semibold text-black block">
                Label/Project :
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                DOL
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                MOLE
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                TRAIBUN
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                DOL
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                DOL
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                DOL
              </span>
              <span className="text-[10px] text-gray-900 px-2 py-0.2 rounded-xs border">
                DOL
              </span>
            </div>
          </div>
        </div>

        {/* TIMER BUTTONS */}
        {task?.taskStatus?.toLowerCase() === "ongoing" && (
          <div className="grid grid-cols-2 gap-x-2 mt-2">
            <button className=" w-full text-[12px] py-1 bg-green-700 cursor-pointer hover:bg-green-800 text-white rounded flex items-center gap-x-1 justify-center">
              <PlayCircle size={13} /> Start
            </button>
            <button className=" w-full  text-[12px] py-1 bg-yellow-700 cursor-pointer hover:bg-yellow-800 text-white rounded flex items-center gap-x-1 justify-center">
              <PauseCircle size={13} /> Pause
            </button>
          </div>
        )}

        {/* CHANGE STATUS BUTTON */}
        {/* {task?.taskDetails?.backlog === false && (
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
        )} */}
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
                  complete: "bg-green-600",
                  ongoing: "bg-blue-600",
                  pending: "bg-orange-500",
                  inqueue: "bg-violet-600",
                  review: "bg-rose-600",
                };

                const hoverGradientMap = {
                  complete: "hover:bg-green-600",
                  ongoing: "hover:bg-blue-600",
                  pending: "hover:bg-orange-500",
                  inqueue: "hover:bg-violet-600",
                  review: "hover:bg-rose-600",
                };

                const gradient = gradientMap[status.toLowerCase()];
                const hoverGradient = hoverGradientMap[status.toLowerCase()];

                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-4 py-3.5 cursor-pointer rounded-xl text-sm font-semibold text-left transition-all duration-200
                ${
                  isSelected
                    ? `${gradient} text-white shadow-lg scale-105`
                    : `bg-gray-50 text-gray-700 border-2 border-transparent hover:text-white hover:shadow-md ${hoverGradient}`
                }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">{status}</span>
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
