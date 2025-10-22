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

  const bgColor = isHighlighted ? "bg-purple-100" : "bg-white";
  const borderColor = isHighlighted ? "border-purple-400" : "border-gray-300";

  const handleClick = () => {
    if (isHighlighted) {
      handleSeenComment(comment?._id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-lg border-2 ${bgColor} ${borderColor} mb-10 hover:scale-95 cursor-pointer duration-500`}
    >
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
        className="text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: comment.comment }}
      />
    </div>
  );
};

export default Comment;