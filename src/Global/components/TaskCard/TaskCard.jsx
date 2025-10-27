import React, { useState, useEffect } from "react";
import {
  Flag,
  PlayCircle,
  PauseCircle,
  ClipboardList,
  Calendar,
  User,
} from "lucide-react";
import { getPriorityColor, getStatusColor } from "../../Utils/TaskUtils";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";
import { truncateText } from "../../Utils/truncateText";
import { taskLogAPI } from "../../../api/endpoints/taskLog.api";

const TaskCard = ({
  loading,
  handleDeleteTask,
  index,
  task,
  userTask,
  user,
  isBacklog = false,
  userId,
  moveTask,
  onClick,
  changeStatusTask,
  allNotis = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(task?.isPause || false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [startClicked, setStartClicked] = useState(false);
  const [localStartTime, setLocalStartTime] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [localDeleteLoading, setLocalDeleteLoading] = useState(false);

  const hasNotification = allNotis.some(
    (noti) => noti.taskId === task._id || noti.taskId === task.taskId
  );

  const statuses = ["Pending", "InQueue", "Ongoing", "Review", "Complete"];

  useEffect(() => {
    if (task?.isPause !== undefined) {
      setIsPaused(task.isPause);
    }

    if (task?.startTime && task.startTime !== 0) {
      setStartClicked(true);
    }

    if (!task?.startTime || task.startTime === 0) {
      setStartClicked(false);
      setLocalStartTime(null);
      setElapsedTime("00:00:00");
    }
  }, [task?.startTime, task?.isPause]);

  useEffect(() => {
    if (isPaused && task?.totalOnGoingTime) {
      let totalMs;
      if (typeof task.totalOnGoingTime === "string") {
        const [hours, minutes, seconds] = task.totalOnGoingTime
          .split(":")
          .map(Number);
        totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
      } else {
        totalMs = task.totalOnGoingTime;
      }

      const hours = Math.floor(totalMs / (1000 * 60 * 60));
      const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
      return;
    }

    if ((!task?.startTime || task.startTime === 0) && !startClicked) {
      setElapsedTime("00:00:00");
      return;
    }

    const startTime = startClicked
      ? localStartTime
      : task?.startTime
      ? new Date(task.startTime)
      : null;

    if (!startTime) return;

    const updateTimer = () => {
      const now = new Date();
      const currentSessionMs = now - startTime;

      let existingTotalMs = 0;
      if (task?.totalOnGoingTime) {
        if (typeof task.totalOnGoingTime === "string") {
          const [hours, minutes, seconds] = task.totalOnGoingTime
            .split(":")
            .map(Number);
          existingTotalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
        } else {
          existingTotalMs = task.totalOnGoingTime;
        }
      }

      const totalDiffMs = currentSessionMs + existingTotalMs;

      const hours = Math.floor(totalDiffMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (totalDiffMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((totalDiffMs % (1000 * 60)) / 1000);

      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer();

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const interval = setInterval(updateTimer, 1000);
    setTimerInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    task?.startTime,
    task?.totalOnGoingTime,
    localStartTime,
    startClicked,
    isPaused,
  ]);

  useEffect(() => {
    if (task?.isPause !== undefined) {
      setIsPaused(task.isPause);
    }

    if (task?.isPause && task?.totalOnGoingTime) {
      if (typeof task.totalOnGoingTime === "string") {
        setElapsedTime(task.totalOnGoingTime);
      } else {
        const totalMs = task.totalOnGoingTime;
        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }

    if (task?.startTime === 0 && !startClicked) {
      setElapsedTime("00:00:00");
    }
  }, [task?.totalOnGoingTime, task?.startTime, startClicked]);

  const startTask = async () => {
    try {
      const response = await taskLogAPI.startTask(task?._id);
      const totalOnGoing = response.data.totalOnGoingTime || 0;

      task.totalOnGoingTime = totalOnGoing;

      if (task?.taskStatus === "pending") {
        moveTask(userId, task._id, "ongoing");
      }

      setStartClicked(true);
      setLocalStartTime(new Date());
      setIsPaused(false);
      setIsRunning(true);
    } catch (error) {
      console.log(error, "Failed to start Task");
    }
  };

  const pauseTask = async () => {
    try {
      const response = await taskLogAPI.pauseTask(task?._id);
      const updatedTotal = response.data.totalOnGoingTime;

      setIsPaused(true);
      setIsRunning(false);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }

      if (updatedTotal) {
        let totalMs;
        if (typeof updatedTotal === "string") {
          const [h, m, s] = updatedTotal.split(":").map(Number);
          totalMs = (h * 3600 + m * 60 + s) * 1000;
        } else {
          totalMs = updatedTotal;
        }

        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }

      task.totalOnGoingTime = updatedTotal;
    } catch (error) {
      console.log(error, "Failed to pause Task");
    }
  };

  const handleStatusChange = (newStatus) => {
    const startTime = task?.startTime;
    const endTime = new Date().toISOString();
    changeStatusTask(task._id, task?.taskId, newStatus, startTime, endTime);
    setShowModal(false);
  };

  const priorityStyles = {
    High: "shadow-red-100 hover:shadow-red-200",
    Medium: "shadow-amber-100 hover:shadow-amber-200",
    Low: "shadow-emerald-100 hover:shadow-emerald-200",
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
        } relative rounded-lg p-3 mb-2 transition-all duration-300 cursor-pointer border-4 bg-white hover:-translate-y-1 ${
          priorityStyles[task?.taskDetails?.taskPriority] || " shadow-gray-100"
        }`}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDelete((prev) => !prev);
        }}
      >
        {/* HEADER */}
        <div>
          {!isBacklog ? (
            <div className="flex mb-1 items-center justify-between">
              <h4 className="font-bold text-lg text-gray-900 leading-tight">
                {index + 1}. {task?.taskDetails?.taskTitle}
              </h4>
              {/* Notification Dot */}
              {hasNotification && (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse z-10"></div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-md text-gray-900 leading-tight">
                {task?.taskTitle}
              </h4>
              {/* Notification Dot */}
              {hasNotification && (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse z-10"></div>
              )}
            </div>
          )}
          {!isBacklog && task?.taskStatus === "ongoing" && (
            <div className="w-full flex items-center justify-center">
              <div className="mb-2 flex items-center gap-x-2 justify-center">
                <div className="flex items-center justify-center gap-1.5 text-blue-700">
                  <span className="text-sm text-center font-semibold capitalize">
                    <PlayCircle />
                  </span>
                </div>
                <span className="text-md font-mono font-bold text-indigo-900 block mt-0.5">
                  {elapsedTime}
                  {isPaused && (
                    <span className="text-yellow-600 text-sm ml-2">
                      (Paused)
                    </span>
                  )}
                </span>
              </div>
            </div>
          )}

          {!isBacklog && (
            <div className="grid grid-cols-2 items-start gap-x-2">
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
                  Status:
                  <span className="capitalize">{task?.taskStatus}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 mb-1">
          <div className="flex items-center gap-2 text-sm">
            {!isBacklog ? (
              <div className="flex items-center gap-x-2">
                <span className="text-[10px] font-semibold text-black block">
                  Assigned By:
                </span>
                <span className="text-[10px] text-gray-900">
                  {task?.creatorDetails?.username}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <span className="text-[10px] font-semibold text-black block">
                  Assigned By:
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
                Assigned Date:
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
                <span className="text-[10px] font-semibold text-black block">
                  Deadline
                </span>
                <span className="text-[10px] text-gray-900">
                  {task.expectedDeadline ? (
                    <>{formatReadableDateTime(task?.expectedDeadline)} </>
                  ) : (
                    "No Deadline Assigned"
                  )}
                </span>
              </div>
            )}
          </div>

          {!isBacklog && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center flex-wrap gap-x-1 gap-y-1">
                <span className="text-[10px] font-semibold text-black block">
                  Label/Project:
                </span>
                {task?.taskDetails?.labels.map((lbl) => (
                  <span className="text-[10px] text-gray-50 bg-slate-900 rounded-lg px-2 py-0.2 shadow-md border">
                    {lbl.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* TIMER BUTTONS */}
        {user && user?._id === task?.assignedToId && (
          <>
            {" "}
            {task?.taskStatus?.toLowerCase() === "ongoing" && (
              <div className="grid grid-cols-2 gap-x-2 mt-2">
                <button
                  onClick={startTask}
                  className="w-full text-[12px] py-1 bg-green-700 cursor-pointer hover:bg-green-800 text-white rounded flex items-center gap-x-1 justify-center"
                >
                  <PlayCircle size={13} /> Start
                </button>
                <button
                  onClick={pauseTask}
                  className="w-full text-[12px] py-1 bg-yellow-700 cursor-pointer hover:bg-yellow-800 text-white rounded flex items-center gap-x-1 justify-center"
                >
                  <PauseCircle size={13} /> Pause
                </button>
              </div>
            )}
          </>
        )}

        {/* DELETE BUTTONS - Positioned at top right inside card */}
        {showDelete && (
          <div className="flex justify-end gap-2 mt-3 ">
            <button
              onClick={async (e) => {
                e.stopPropagation();
                setLocalDeleteLoading(true); // Add this - immediate visual feedback
                setShowDelete(false); // Hide delete buttons immediately
                {
                  !isBacklog
                    ? await handleDeleteTask(task?.taskId)
                    : await handleDeleteTask(task?._id);
                }
                setLocalDeleteLoading(false); // Reset loading state
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer shadow-md transition-colors"
            >
              {localDeleteLoading ? "Deleting..." : "Delete"}{" "}
              {/* Use local loading state */}
            </button>
          </div>
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
