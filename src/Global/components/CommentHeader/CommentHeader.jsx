import { Delete, Eye, Trash } from "lucide-react";
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
    <div className="flex items-center justify-between text-xs text-gray-600">
      <div className="flex items-center space-x-2">
        <span className="font-normal">
          Commented By: <span className="font-bold">{author}</span>
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        <span>
          Commented At: <span className="text-red-600">{date}</span>
        </span>{" "}
        |
        <span>
          Task Status:{" "}
          {status && (
            <span
              className={`px-2 py-1 rounded-full font-bold ${
                status === "ongoing"
                  ? "text-green-700"
                  : status === "pending"
                  ? "text-orange-700"
                  : status === "review"
                  ? "text-red-600"
                  : status === "inqueue"
                  ? "text-yellow-700"
                  : status === "completed"
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {status}
            </span>
          )}
        </span>{" "}
        |
        <span>
          Task Duration: <span className="text-blue-600">{time}</span>
        </span>
        <span>
          <Trash
            onClick={() => commentDelete(comment?._id)}
            size={14}
            className="text-red-600 cursor-pointer hover:scale-110 duration-300"
          />
        </span>
      </div>
    </div>
  );
};

export default CommentHeader;
