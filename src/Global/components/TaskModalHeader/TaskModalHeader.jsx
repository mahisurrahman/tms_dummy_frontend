import React from "react";
import { X, Edit3 } from "lucide-react";

const TaskModalHeader = ({ title, onClose, onEdit }) => {
  return (
    <div className="mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-white font-bold">
          {1}. Task Title: {title}
        </h2>
        <div className="flex items-center gap-4">
          {/* <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 border border-white/30 hover:border-white/50 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span className="font-semibold">Edit</span>
          </button> */}
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
