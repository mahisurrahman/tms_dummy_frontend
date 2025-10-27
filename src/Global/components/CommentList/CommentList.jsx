import React from "react";
import Comment from "../Comment/Comment";

const CommentList = ({
  comments,
  commentDelete,
  commentNotification,
  handleSeenComment,
}) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500 text-center">No comments yet</p>;
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {comments.map((comment, index) => (
        <Comment
          comments={comments}
          index={index}
          key={comment.id}
          comment={comment}
          commentDelete={commentDelete}
          commentNotification={commentNotification}
          handleSeenComment={handleSeenComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
