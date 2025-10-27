import React from "react";
import CommentHeader from "../CommentHeader/CommentHeader";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";

const Comment = ({
  comments,
  index,
  comment,
  commentDelete,
  commentNotification,
  handleSeenComment,
}) => {
  const isHighlighted = commentNotification?.some(
    (notification) => notification.commentId === comment._id
  );

  const handleClick = () => {
    if (isHighlighted) {
      handleSeenComment(comment?._id);
    }
  };

  // Generate avatar with initials
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  // Generate color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    const index = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  return (
    <div
      onClick={handleClick}
      className={`relative ${
        index === 0 ? "mt-2" : ""
      } p-4 rounded-xl border transition-all duration-300 ${
        isHighlighted
          ? "bg-purple-50 border-purple-300 shadow-md"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          New
        </div>
      )}

      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full ${getAvatarColor(
              comment.commentBy
            )} flex items-center justify-center text-white font-semibold text-sm`}
          >
            {getInitials(comment.commentBy)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <CommentHeader
            comments={comments}
            index={index}
            author={comment.commentBy}
            status={comment.taskStatus}
            date={formatReadableDateTime(comment.createdAt)}
            time={comment.commentedOnTime}
            commentDelete={commentDelete}
            comment={comment}
          />

          <div
            className="w-full bg-gray-200 p-5 rounded-lg text-sm text-gray-700 mt-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: comment.comment }}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
