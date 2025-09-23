import React from "react";

const CommentHeader = ({ author, status, totalTime, date, time }) => {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium">{author}</span>
      <div className="flex items-center gap-2 text-gray-500">
        <span>
          <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-xs text-white font-bold rounded">
            On-Going
          </span>
        </span>
        <span>|</span>
        <span>
          Total Time:{" "}
          <span className="text-red-400 font-semibold"> 22h:42m</span>
        </span>
        <span>|</span>
        <span>
          Date:{" "}
          <span className="text-orange-400 font-semibold">22/10/2025</span>
        </span>
        <span>|</span>
        <span>
          Time: <span className="text-green-400 font-semibold">12:00 PM</span>
        </span>
      </div>
    </div>
  );
};

export default CommentHeader;
