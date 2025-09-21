import React from 'react';
import { sections, sectionTitles } from '../../../utils/constants';
import TaskSection from './TaskSection';

const UserColumn = ({ user, tasks, expandedSections, onToggleSection, onTaskSelect, ...actionProps }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    const stat = task.status;
    if (!acc[stat]) acc[stat] = [];
    acc[stat].push(task);
    return acc;
  }, {});

  return (
    <div className="w-[45vw] md:w-[30vw] lg:w-[20vw] bg-white/10 backdrop-blur-md rounded-2xl p-2 md:p-4 border border-white/20">
      {/* User Header */}
      <div className="mb-2 md:mb-4">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                user?.status === "Present" ? "bg-green-500" : "bg-red-500"
              } text-white font-bold text-xs md:text-sm`}
            >
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">{user.name}</h3>
              <p className="text-xs md:text-sm text-white/70">{user.role}</p>
            </div>
          </div>
          {/* User stats */}
        </div>
      </div>

      <div className="max-h-[95vh] overflow-y-auto">
        {sections.map((status) => (
          <TaskSection
            key={status}
            userId={user.id}
            status={status}
            title={sectionTitles[status]}
            tasks={groupedTasks[status] || []}
            isExpanded={expandedSections[`${user.id}-${status}`]}
            onToggle={onToggleSection}
            onTaskSelect={onTaskSelect}
            {...actionProps}
          />
        ))}
      </div>
    </div>
  );
};

export default UserColumn;