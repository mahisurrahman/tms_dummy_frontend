import React from "react";
import { Plus } from "lucide-react";
import UserColumn from "../UserColumn/UserColumn";

const UserColumns = ({
  users,
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
  allNotis,
  handleDeleteTask,
}) => {
  const devUsers = users?.filter((user) => user.userType === 2) || [];

  return (
    <div className="relative p-2 md:p-4 overflow-x-auto transition-all duration-300 ease-in-out w-full">
      <div className="flex space-x-2 md:space-x-0 min-w-max">
        {devUsers.length > 0 ? (
          devUsers.map((user) => (
            <UserColumn
              key={user._id}
              userCol={user}
              userTasks={userTasks[user?._id] || []}
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
              changeStatusTask={changeStatusTask}
              allNotis={allNotis}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          // 👇 Blurred message overlay
          <div className="m-5 absolute inset-0 flex items-center justify-center border-2 border-gray-500 rounded-lg">
            <p className="text-gray-500 font-semibold text-lg">
              😤 No developer integrated yet !!!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserColumns;
