import React from "react";
import CommentHeader from "../CommentHeader/CommentHeader";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime";

const Comment = ({ comments, index, comment, commentDelete }) => {
  return (
    <div className={`p-3 rounded-lg border-2 bg-purple-100 border-purple-400 mb-10`}>
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
