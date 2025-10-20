import React from "react";
import Comment from "../Comment/Comment";

const CommentList = ({ comments, commentDelete }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500 text-center">No comments yet</p>;
  }

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
      {comments.map((comment, index) => (
        <Comment
          comments={comments}
          index={index}
          key={comment.id}
          comment={comment}
          commentDelete={commentDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
