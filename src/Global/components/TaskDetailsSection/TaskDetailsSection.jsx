import { Play, Square, Bell, Download, Pin, PauseCircle } from "lucide-react";
import { useEffect, useState } from "react";
import PriorityModal from "../PriorityModa/PriorityModal";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";
import { getPriorityColor, getStatusColor } from "../../Utils/TaskUtils";

export default function TaskDetailsSection({
  data,
  onStatusChange,
  onPriorityChange,
}) {
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  console.log(data, "Data files");

  useEffect(() => {
    if (!data?.createdAt) return;

    const updateTimer = () => {
      const createdAt = new Date(data.createdAt);
      const now = new Date();
      const diffMs = now - createdAt;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data?.createdAt, data.taskStatus]);

  const priorities = [
    { value: "high", label: "High", color: "#ea580c" },
    { value: "medium", label: "Medium", color: "#d97706" },
    { value: "low", label: "Low", color: "#16a34a" },
  ];

  const handlePriorityChange = (priority) => {
    if (onPriorityChange) {
      onPriorityChange(priority);
    }
    setShowPriorityModal(false);
  };

  const getCurrentPriority = () => {
    const priorityValue = data.taskDetails.taskPriority;
    return {
      label: priorityValue,
      value: priorityValue.toLowerCase(),
    };
  };

  const currentPriority = getCurrentPriority();

  const getStatusInfo = () => {
    const status = data.taskStatus.toLowerCase();
    const gradient = getStatusColor(status);

    switch (status) {
      case "ongoing":
        return {
          text: "Ongoing",
          gradient: gradient,
          hover: "from-blue-700 to-sky-500",
        };
      case "completed":
        return {
          text: "Completed",
          gradient: gradient,
          hover: "from-green-700 to-emerald-500",
        };
      case "pending":
      default:
        return {
          text: "Pending",
          gradient: gradient,
          hover: "from-gray-700 to-gray-500",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <>
      <div className="bg-white border-4 border-green-500 rounded-2xl p-4 w-full">
        <div className="grid grid-cols-2 gap-x-2 mb-2 w-full items-center">
          <div className="w-full bg-orange-100 p-2 rounded-lg flex justify-center items-center">
            <span className="font-semibold">Priority:</span>
            <button
              className={`ml-2 bg-gradient-to-r ${getPriorityColor(
                currentPriority.label
              )} text-white px-3 py-0.5 rounded text-sm font-medium cursor-pointer transition-all`}
            >
              {currentPriority.label}
            </button>
          </div>

          <div className="w-full bg-blue-100 p-2 rounded-lg flex justify-center gap-x-2">
            <span className="font-bold">Task Status:</span>
            <button
              className={`bg-gradient-to-r ${statusInfo.gradient} capitalize animate-pulse text-white px-4 py-1 rounded text-xs font-medium transition-all`}
            >
              {data?.taskStatus}
            </button>
          </div>
        </div>
        {data?.taskStatus === "ongoing" && (
          <div className="bg-red-50 px-2 grid grid-cols-2 gap-x-4 py-2 border-t border-b justify-between items-center mb-5">
            <div>
              <h1 className="flex items-center font-extrabold text-3xl gap-x-2">
                <span className="capitalize">{data?.taskStatus}:</span>
                {elapsedTime}
              </h1>
            </div>

            {data?.taskStatus === "ongoing" && (
              <div className="flex gap-1 ">
                <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-1 px-2 rounded cursor-pointer hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center">
                  <Play className="w-3 h-3 mr-1" />
                  Start
                </button>
                <button className="flex-1 bg-gradient-to-r from-yellow-700 to-yellow-700 text-white text-lg py-1 px-2 rounded cursor-pointer hover:from-yellow-600 hover:to-pink-600 transition-all flex items-center justify-center">
                  <PauseCircle className="w-3 h-3 mr-1" />
                  Pause
                </button>
              </div>
            )}
          </div>
        )}

        {data?.taskStatus === "review" && (
          <div className="bg-red-50 px-2 grid grid-cols-2 gap-x-4 py-2 border-t border-b justify-between items-center mb-5">
            <div>
              <h1 className="flex items-center font-extrabold text-3xl gap-x-2">
                <span className="capitalize">Task Time :</span>
                {elapsedTime}
              </h1>
            </div>
          </div>
        )}
        <div className="space-y-0.5 text-sm text-gray-700 mb-8">
          <div>
            <span className="font-bold">Assigned By:</span>{" "}
            {data?.creatorDetails?.username}
          </div>
          <div>
            <span className="font-bold">Assigned Date:</span>{" "}
            {formatReadableDateTime(data?.taskDetails?.assignedDate)}
          </div>
          <div className="text-red-600 text-3xl">
            <span className="font-bold">Expected Deadline:</span>{" "}
            {formatReadableDateTime(data?.taskDetails?.expectedDeadline)}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-1">Task Description:</h3>
          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-200 whitespace-pre-wrap">
            {data?.taskDetails?.taskDescription}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Assigned To:</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                  {data?.assignedToDetails?.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {data?.assignedToDetails?.username}
                  </span>
                  <span className="text-xs text-gray-600 ml-2">
                    ({data?.assignedToDetails?.designation})
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm py-2 px-3 rounded-lg shadow-sm cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all">
              <Pin className="w-4 h-4 mr-1" />
              Poke
            </button>
          </div>
        </div>
        {/* Action buttons - conditionally render based on status */}
        {/* <div className="w-full grid grid-cols-2 gap-2">
          {data.taskStatus.toLowerCase() !== "completed" && (
            <>
              <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm py-2 px-1 rounded shadow-sm shadow-black cursor-pointer hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center">
                <Play className="w-3 h-3 mr-1" />
                {data.taskStatus.toLowerCase() === "ongoing"
                  ? "Resume"
                  : "Start"}
              </button>
              <button className="w-full bg-gradient-to-r from-red-700 to-pink-700 text-white text-sm py-2 px-1 rounded shadow-sm shadow-black cursor-pointer hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center">
                <Square className="w-3 h-3 mr-1" />
                {data.taskStatus.toLowerCase() === "ongoing" ? "Pause" : "End"}
              </button>
            </>
          )}
          {data.taskStatus.toLowerCase() === "completed" && (
            <button className="col-span-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm py-2 px-1 rounded shadow-sm shadow-black cursor-pointer hover:from-gray-700 hover:to-gray-800 transition-all flex items-center justify-center">
              <Play className="w-3 h-3 mr-1" />
              Reopen Task
            </button>
          )}
        </div> */}

        <div className="w-full flex items-center gap-x-2">
          <button
            onClick={onStatusChange}
            className="w-full py-3 bg-blue-700 text-white rounded-lg font-extrabold cursor-pointer hover:bg-blue-800"
          >
            Change Status
          </button>

          <button
            onClick={() => setShowPriorityModal(true)}
            className="w-full py-3 bg-orange-700 text-white rounded-lg font-extrabold cursor-pointer hover:bg-orange-800"
          >
            Change Priority
          </button>
        </div>
      </div>

      {/* Priority Modal */}
      {showPriorityModal && (
        <PriorityModal
          priorities={priorities}
          onPriorityChange={handlePriorityChange}
          // onAddCustom={handleAddCustomPriority}
          onClose={() => setShowPriorityModal(false)}
        />
      )}
    </>
  );
}
