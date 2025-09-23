import React, { useState, useRef } from "react";
import SimpleTextEditor from "../SimpleTextEditor/SimpleTextEditor";
import CommentHeader from "../CommentHeader/CommentHeader";

const Comment = ({ comment, level = 0, onReply, replyingTo, onAddReply }) => {
  const [replyContent, setReplyContent] = useState("");
  const replyEditorRef = useRef(null);

  const handleAdd = () => {
    if (!replyContent.trim()) return;
    onAddReply(comment.id, replyContent);
    setReplyContent("");
    if (replyEditorRef.current) {
      replyEditorRef.current.clear();
    }
  };

  return (
    <div
      className={`bg-gray-50 p-3 rounded-lg mb-2 ${
        level > 0 ? "ml-4 border-l-2 border-gray-300" : ""
      }`}
    >
      <CommentHeader
        author={comment.author}
        status={comment.status}
        totalTime={comment.totalTime}
        date={comment.date}
        time={comment.time}
      />

      <div
        className="text-sm mt-1"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />

      <button
        onClick={() => onReply(comment.id)}
        className="text-blue-500 text-xs mt-1"
      >
        Reply
      </button>

      {replyingTo === comment.id && (
        <ReplySection
          replyContent={replyContent}
          onReplyChange={setReplyContent}
          onAddReply={handleAdd}
          editorRef={replyEditorRef}
        />
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

const ReplySection = ({
  replyContent,
  onReplyChange,
  onAddReply,
  editorRef,
}) => (
  <div className="mt-2">
    <SimpleTextEditor
      ref={editorRef}
      onChange={onReplyChange}
      placeholder="Add reply..."
    />
    <button
      onClick={onAddReply}
      className="mt-1 bg-blue-500 text-white px-2 py-1 rounded"
    >
      Submit
    </button>
  </div>
);

export default Comment;
