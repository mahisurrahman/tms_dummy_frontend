import React from "react";
import CommentHeader from "../CommentHeader/CommentHeader";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";

const Comment = ({ comment, commentDelete }) => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-10">
      <CommentHeader
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
