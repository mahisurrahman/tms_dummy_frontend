import React from 'react';
import { getPriorityColor, getStatusColor, getStatusIcon } from '../../../utils/taskUtils';
import TaskActions from './TaskActions';

const TaskCard = ({ task, index, userId, onTaskSelect, onStart, onPause, onResume, onEnd, onMove, formattedTime, isRunning }) => {
  return (
    <div
      className={`bg-white rounded-xl p-4 mb-3 transition-all duration-300 transform cursor-pointer ${
        task.priority === "High"
          ? "border-red-500 shadow-red-100"
          : task.priority === "Medium"
          ? "border-yellow-500 shadow-yellow-100"
          : "border-green-500 shadow-green-100"
      }`}
      onClick={() => onTaskSelect(task)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-800 truncate flex-1">
          {index}. {task.title}
        </h4>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full animate-pulse text-xs font-medium bg-gradient-to-r ${getStatusColor(
            task.status
          )} text-white`}
        >
          {getStatusIcon(task.status)}
          <span className="ml-1 capitalize">{task.status}</span>
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
              task.priority
            )} text-white`}
          >
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </span>
          <span className={`text-yellow-600 text-xl font-bold ${isRunning ? "animate-pulse" : ""}`}>
            {formattedTime}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>By: {task.assignedBy}</span>
          <span>{task.assignedDate}</span>
        </div>

        <TaskActions
          task={task}
          userId={userId}
          isRunning={isRunning}
          onStart={onStart}
          onPause={onPause}
          onResume={onResume}
          onEnd={onEnd}
          onMove={onMove}
        />
      </div>
    </div>
  );
};

export default TaskCard;