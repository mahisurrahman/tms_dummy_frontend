import React, { useContext, useEffect } from "react";
import { Plus, Timer, Star } from "lucide-react";
import TaskSection from "../TaskSection/TaskSection";
import { AuthContext } from "../../../provider/AuthProvider";

const UserColumn = ({
  userCol,
  userTasks,
  sections,
  sectionTitles,
  expandedSections,
  toggleSection,
  timers,
  formatSecondsToTime,
  handleStart,
  handlePause,
  handleResume,
  handleEnd,
  moveTask,
  setSelectedTask,
  setSelectedUserForCreate,
  setShowCreateTask,
  changeStatusTask,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-[45vw] md:w-[19vw] bg-transparent p-2 md:p-4">
      <div className="mb-2 md:mb-4 border rounded-lg pt-2 px-4 border-white/20 bg-white/20 backdrop-blur-3xl">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                userCol.status === true ? "bg-green-500" : "bg-red-500"
              } text-white font-bold text-xs md:text-xs`}
            >
              {userCol.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-xs">
                {userCol.username}
              </h3>
              <p className="text-xs md:text-sm text-white/70">
                {userCol.userType === 1
                  ? "Admin"
                  : user.userType === 2
                  ? "Developer"
                  : user.userType === 3
                  ? "Management"
                  : null}
              </p>
            </div>
          </div>
          <div>
            <div className="flex text-sm md:text-lg text-white flex-col items-end justify-between">
              <div className="flex items-center gap-x-1">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                <span className="font-bold text-orange-400 text-xs md:text-sm">
                  {userCol.storyPoints || "0.00"}
                </span>
                <span className="text-red-400 font-semibold text-xs md:text-sm">
                  PTS
                </span>
              </div>
              <div className="mt-1 flex items-center font-semibold space-x-1">
                <Timer className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-medium text-xs md:text-sm">
                  {userCol.totalTime || "00:00"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {sections.map((status) => (
          <TaskSection
            key={status}
            userId={userCol._id}
            user={user}
            status={status}
            title={sectionTitles[status]}
            tasks={userTasks?.filter((task) => task?.taskStatus === status)}
            isExpanded={expandedSections[`${userCol._id}-${status}`]}
            onToggle={() => toggleSection(userCol._id, status)}
            timers={timers}
            formatSecondsToTime={formatSecondsToTime}
            handleStart={handleStart}
            handlePause={handlePause}
            handleResume={handleResume}
            handleEnd={handleEnd}
            moveTask={moveTask}
            setSelectedTask={setSelectedTask}
            changeStatusTask={changeStatusTask}
          />
        ))}
      </div>

      {user && user.userType === 2 && user._id === userCol?._id && (
        <button
          onClick={() => {
            setSelectedUserForCreate(user.id);
            setShowCreateTask(true);
          }}
          className="w-full mt-4 bg-transparent border text-white py-2 rounded-lg font-medium hover:bg-slate-950 cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      )}
    </div>
  );
};

export default UserColumn;
