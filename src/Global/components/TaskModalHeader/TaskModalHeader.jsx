import React from "react";
import { X } from "lucide-react";

const TaskModalHeader = ({ title, onClose, onStatusChange }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl rounded-b-none">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onStatusChange}
            className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100"
          >
            Change Status
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModalHeader;
