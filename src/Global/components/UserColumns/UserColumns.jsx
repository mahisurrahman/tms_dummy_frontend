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
}) => {
  return (
    <div className="p-2 md:p-4 overflow-x-auto transition-all duration-300 ease-in-out w-full">
      <div className="flex space-x-2 md:space-x-0 min-w-max">
        {users &&
          users?.map((user) => {
            return (
              <UserColumn
                key={user._id}
                user={user}
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
              />
            );
          })}
      </div>
    </div>
  );
};

export default UserColumns;
