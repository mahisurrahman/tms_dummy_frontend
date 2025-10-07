import React from "react";
import { ChevronDown } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";

const TaskSection = ({
  userId,
  status,
  title,
  tasks,
  isExpanded,
  onToggle,
  timers,
  formatSecondsToTime,
  handleStart,
  handlePause,
  handleResume,
  handleEnd,
  moveTask,
  setSelectedTask,
}) => {
  // console.log(tasks, "tasks");
  return (
    <div key={status}>
      <div
        className="flex justify-between items-center mb-2 cursor-pointer bg-white/10 p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
        onClick={onToggle}
      >
        <h4 className="text-white font-semibold text-sm md:text-base">
          {title} ({tasks.length})
        </h4>
        <ChevronDown
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
      {isExpanded && (
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                index={index + 1}
                task={task}
                userTask={task}
                userId={userId}
                timers={timers}
                formatSecondsToTime={formatSecondsToTime}
                handleStart={handleStart}
                handlePause={handlePause}
                handleResume={handleResume}
                handleEnd={handleEnd}
                moveTask={moveTask}
                onClick={() => setSelectedTask({ task, userId })}
              />
            ))
          ) : (
            <div className="text-center py-4 text-white/60">No tasks</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
