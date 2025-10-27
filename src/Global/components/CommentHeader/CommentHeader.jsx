import { Trash2, Clock, Activity } from "lucide-react";
import React from "react";

const CommentHeader = ({
  comments,
  index,
  author,
  status,
  date,
  time,
  commentDelete,
  comment,
}) => {
  return (
    <div className="space-y-2">
      {/* Author and Delete Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 text-sm">{author}</span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-gray-500 text-xs">{date}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            commentDelete(comment?._id);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Status and Duration */}
      <div className="flex items-center gap-3 text-xs">
        {status && (
          <div className="flex items-center gap-1.5">
            <Activity size={12} className="text-gray-400" />
            <span className="text-gray-600">Status:</span>
            <span
              className={`px-2 py-0.5 rounded-full font-medium ${
                status === "ongoing"
                  ? "bg-green-100 text-green-700"
                  : status === "pending"
                  ? "bg-orange-100 text-orange-700"
                  : status === "review"
                  ? "bg-red-100 text-red-700"
                  : status === "inqueue"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {status}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-gray-400" />
          <span className="text-gray-600">Duration:</span>
          <span className="text-gray-900 font-medium">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentHeader;
