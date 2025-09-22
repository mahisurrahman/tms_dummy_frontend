import React from "react";
import { ChevronLeft, Clock } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";

const BacklogSection = ({
  showBacklog,
  setShowBacklog,
  backlogTasks,
  setSelectedTask,
}) => {
  if (!showBacklog) return null;

  return (
    <div className="w-1/7 bg-white/10 backdrop-blur-md border-r border-white/20 p-2 md:p-4 overflow-y-auto shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-2">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
          Backlog
        </h2>
        <button
          onClick={() => setShowBacklog(false)}
          className="p-1 bg-white/20 rounded-md text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2 md:space-y-3">
        {backlogTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isBacklog={true}
            onClick={() => setSelectedTask({ task, userId: null })}
          />
        ))}
      </div>
    </div>
  );
};

export default BacklogSection;
