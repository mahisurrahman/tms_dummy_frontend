import React from "react";

const Comment = ({ comment, level = 0, onReply, replyingTo, onAddReply }) => {
  return (
    <div
      className={`bg-gray-50 p-3 rounded-lg mb-2 ${
        level > 0 ? "ml-4 border-l-2 border-gray-300" : ""
      }`}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{comment.author}</span>
        <span className="text-gray-500">{comment.date}</span>
      </div>
      <p className="text-sm mt-1">{comment.text}</p>
      <button
        onClick={() => onReply(comment.id)}
        className="text-blue-500 text-xs mt-1"
      >
        Reply
      </button>
      {replyingTo === comment.id && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded"
            rows="2"
            placeholder="Add reply..."
            onChange={(e) => onAddReply(e.target.value)}
          />
          <button
            onClick={() => onAddReply(true)}
            className="mt-1 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Submit
          </button>
        </div>
      )}
      {comment.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          level={level + 1}
          onReply={onReply}
          replyingTo={replyingTo}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  );
};

export default Comment;