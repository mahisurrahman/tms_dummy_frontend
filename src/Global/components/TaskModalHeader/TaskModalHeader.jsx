import React from "react";
import { X } from "lucide-react";

const TaskModalHeader = ({ title, onClose, onStatusChange }) => {
  return (
    <div className="mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-white font-bold">
          {1}. Task Title: {title}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-10 h-10 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModalHeader;
