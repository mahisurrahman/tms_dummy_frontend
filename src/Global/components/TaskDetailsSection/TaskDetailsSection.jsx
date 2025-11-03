import {
  Play,
  Square,
  Bell,
  Download,
  Pin,
  PauseCircle,
  LoaderIcon,
  BellDot,
} from "lucide-react";
import { useEffect, useState } from "react";
import PriorityModal from "../PriorityModa/PriorityModal";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";
import { getPriorityColor, getStatusColor } from "../../Utils/TaskUtils";
import { taskLogAPI } from "../../../api/endpoints/taskLog.api";
import { notiFyCntrlAPI } from "../../../api/endpoints/notificationControll.api";
import toast from "react-hot-toast";

export default function TaskDetailsSection({
  setLoading,
  loading,
  notifyControll,
  allComments,
  data,
  user,
  onStatusChange,
  onPriorityChange,
  taskNotification,
  handleReadNotification,
  handlePriorityChange,
  showPriorityModal,
  setShowPriorityModal,
}) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [startClicked, setStartClicked] = useState(false);
  const [localStartTime, setLocalStartTime] = useState(null);
  const [isPaused, setIsPaused] = useState(data?.isPause || false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [mentionChecked, setMentionChecked] = useState(false);
  const [commentChecked, setCommentChecked] = useState(false);
  const [everythingChecked, setEverythingChecked] = useState(false);
  const [seen, isSeen] = useState(false);

  useEffect(() => {
    if (!notifyControll || !notifyControll.followers || !user?._id) return;

    setLoading(true);
    const follower = notifyControll.followers.find(
      (f) => f.receiverId === user._id
    );

    if (follower && Array.isArray(follower.controlType)) {
      setMentionChecked(follower.controlType.includes(1));
      setCommentChecked(follower.controlType.includes(2));
      setEverythingChecked(follower.controlType.includes(3));
      setLoading(false);
    }
    setLoading(false);
  }, [notifyControll, user?._id]);

  const startTask = async () => {
    try {
      const response = await taskLogAPI.startTask(data?._id);
      const totalOnGoing = response.data.totalOnGoingTime || 0;

      data.totalOnGoingTime = totalOnGoing;

      setStartClicked(true);
      setLocalStartTime(new Date());
      setIsPaused(false);
    } catch (error) {
      console.log(error, "Failed to start Task");
    }
  };

  const pauseTask = async () => {
    try {
      const response = await taskLogAPI.pauseTask(data?._id);
      const updatedTotal = response.data.totalOnGoingTime;

      setIsPaused(true);
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
      data.totalOnGoingTime = updatedTotal;
    } catch (error) {
      console.log(error, "Failed to pause Task");
    }
  };

  useEffect(() => {
    if (data?.isPause !== undefined) {
      setIsPaused(data.isPause);
    }
    if (data?.startTime && data.startTime !== 0) {
      setStartClicked(true);
    }
    if (!data?.startTime || data.startTime === 0) {
      setStartClicked(false);
      setLocalStartTime(null);
    }
  }, [data?.totalOnGoingTime, data?.startTime]);

  useEffect(() => {
    if (isPaused && data?.totalOnGoingTime) {
      let totalMs;

      if (typeof data.totalOnGoingTime === "string") {
        const [hours, minutes, seconds] = data.totalOnGoingTime
          .split(":")
          .map(Number);
        totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
      } else {
        totalMs = data.totalOnGoingTime;
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

    if ((!data?.startTime || data.startTime === 0) && !startClicked) {
      setElapsedTime("00:00:00");
      return;
    }

    const startTime = startClicked
      ? localStartTime
      : data?.startTime
      ? new Date(data.startTime)
      : null;

    if (!startTime) return;

    const updateTimer = () => {
      const now = new Date();
      const currentSessionMs = now - startTime;
      let existingTotalMs = 0;
      if (data?.totalOnGoingTime) {
        if (typeof data.totalOnGoingTime === "string") {
          const [hours, minutes, seconds] = data.totalOnGoingTime
            .split(":")
            .map(Number);
          existingTotalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
        } else {
          existingTotalMs = data.totalOnGoingTime;
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
  }, [data?.startTime, data?.totalOnGoingTime, localStartTime]);

  useEffect(() => {
    if (data?.isPause !== undefined) {
      setIsPaused(data.isPause);
    }

    if (data?.isPause && data?.totalOnGoingTime) {
      if (typeof data.totalOnGoingTime === "string") {
        setElapsedTime(data.totalOnGoingTime);
      } else {
        const totalMs = data.totalOnGoingTime;
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
    if (data?.startTime === 0 && !startClicked) {
      setElapsedTime("00:00:00");
    }
  }, [data?.totalOnGoingTime, data?.startTime]);

  const handleCheckboxChange = async (type, checked, receiverId) => {
    const follower = notifyControll?.followers?.find(
      (f) => f.receiverId === receiverId
    );
    if (!follower) return;
    setLoading(true);

    const payload = {
      taskId: data?.taskId,
      receiverId: receiverId,
      controlTypes: [type],
    };

    const response = checked
      ? await notiFyCntrlAPI.addControllTypes(payload)
      : await notiFyCntrlAPI.removeControllTypes(payload);

    if (response?.data) {
      toast.success("Notification Control Updated");
      setLoading(false);
    }
    setLoading(false);
  };

  const priorities = [
    { value: "high", label: "High", color: "#ea580c" },
    { value: "medium", label: "Medium", color: "#d97706" },
    { value: "low", label: "Low", color: "#16a34a" },
  ];

  const getCurrentPriority = () => {
    const priorityValue = data?.taskDetails.taskPriority;
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
              className={`ml-2 bg-gradient-to-r ${
                currentPriority.label === "high"
                  ? "bg-red-700"
                  : currentPriority.label === "medium"
                  ? "bg-yellow-700"
                  : "bg-green-700"
              } text-white px-3 py-0.5 rounded text-sm font-medium cursor-pointer transition-all`}
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
                {isPaused && (
                  <span className="text-yellow-600 text-sm ml-2">(Paused)</span>
                )}
              </h1>
            </div>

            {!data?.taskDetails?.backlog &&
              ((user?._id === data?.assignedToId && user?.userType === 2) ||
                user?.userType === 1) && (
                <>
                  {data?.taskStatus === "ongoing" && (
                    <div className="flex gap-1">
                      <button
                        onClick={startTask}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-1 px-2 rounded cursor-pointer hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </button>

                      <button
                        onClick={pauseTask}
                        className="flex-1 bg-gradient-to-r from-yellow-700 to-yellow-700 text-white text-lg py-1 px-2 rounded cursor-pointer hover:from-yellow-600 hover:to-pink-600 transition-all flex items-center justify-center"
                      >
                        <PauseCircle className="w-3 h-3 mr-1" />
                        Pause
                      </button>
                    </div>
                  )}
                </>
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
        <div className="space-y-0.5 text-sm text-gray-700 mb-8 flex items-start justify-between">
          <div>
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
              {data?.taskDetails?.expectedDeadline !== ""
                ? formatReadableDateTime(data?.taskDetails?.expectedDeadline)
                : "Not Given"}
            </div>
          </div>
          {taskNotification.length > 0 && (
            <div>
              <h1 className="font-bold">Status Changed</h1>
              {!seen ? (
                <button
                  onClick={() => {
                    isSeen(!seen);
                    handleReadNotification();
                  }}
                  className="px-2 py-1 rounded text-xs font-semibold bg-gradient-to-br from-purple-700 to-blue-700 text-white w-full hover:from-purple-800 hover:to-from-blue-800 duration-500 hover:scale-110 cursor-pointer flex items-center justify-center  gap-x-1"
                >
                  <BellDot size={13} /> Notified
                </button>
              ) : (
                <button className="px-2 py-1 rounded text-xs font-semibold bg-gray-400 text-white w-full text-center">
                  Seen
                </button>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-1">Task Description:</h3>
          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-200 whitespace-pre-wrap">
            {data?.taskDetails?.taskDescription}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-start justify-between">
            {data?.assignedToDetails && (
              <div>
                <h3 className="font-bold text-gray-800 mb-1 -mt-1">
                  Assigned To:
                </h3>
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
            )}
            {loading === true ? (
              <LoaderIcon />
            ) : (
              <>
                {notifyControll?.followers && (
                  <div className="">
                    <h1 className="font-semibold mb-2">
                      Notification Controls:
                    </h1>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-center border-b">
                              User
                            </th>
                            {/* <th className="px-4 py-2 text-left border-b">
                          Status Change
                        </th>
                        <th className="px-4 py-2 text-left border-b">
                          Comments & Mentions
                        </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {notifyControll?.followers?.map((follower) => (
                            <tr
                              key={follower.receiverId}
                              className="border-b last:border-b-0"
                            >
                              <td className="px-4 py-2">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                                    {follower.receiverData?.username
                                      ?.split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <span className="font-medium">
                                    {follower.receiverData?.username}
                                  </span>
                                </div>
                              </td>
                              {/* <td className="px-4 py-2">
                            <input
                              type="checkbox"
                              checked={follower.controlType?.includes(1)}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  1,
                                  e.target.checked,
                                  follower.receiverId
                                )
                              }
                              // disabled={follower.receiverId !== user?._id}
                              disabled
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="checkbox"
                              checked={follower.controlType?.includes(2)}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  2,
                                  e.target.checked,
                                  follower.receiverId
                                )
                              }
                              // disabled={follower.receiverId !== user?._id}
                              disabled
                            />
                          </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {!data?.taskDetails?.backlog &&
          ((user?._id === data?.assignedToId && user?.userType === 2) ||
            user?.userType === 1) && (
            <div className="w-full flex items-center gap-x-2">
              <button
                onClick={onStatusChange}
                className="w-full py-3 bg-blue-700 text-white rounded-lg font-extrabold cursor-pointer hover:bg-blue-800"
              >
                Change Status
              </button>

              <button
                onClick={onPriorityChange}
                className="w-full py-3 bg-orange-700 text-white rounded-lg font-extrabold cursor-pointer hover:bg-orange-800"
              >
                Change Priority
              </button>
            </div>
          )}
      </div>

      {/* Priority Modal */}
      {showPriorityModal && (
        <PriorityModal
          priorities={priorities}
          onPriorityChange={handlePriorityChange} // This should call the prop to handle the change
          onClose={() => setShowPriorityModal(false)}
        />
      )}
    </>
  );
}
