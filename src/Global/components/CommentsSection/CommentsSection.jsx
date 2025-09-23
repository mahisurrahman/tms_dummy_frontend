import React from "react";
import { MessageSquare, X } from "lucide-react";
import CommentList from "../CommentList/CommentList";
import SimpleTextEditor from "../SimpleTextEditor/SimpleTextEditor";

const CommentsSection = ({
  comments,
  replyingTo,
  newComment,
  onCommentChange,
  onAddComment,
  onReply,
  onAddReply,
  editorRef,
  onClose,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border-4 border-blue-600">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
        Comments & Updates
      </h3>

      <CommentList
        comments={comments}
        replyingTo={replyingTo}
        onReply={onReply}
        onAddReply={onAddReply}
      />

      <div className="mt-4">
        <SimpleTextEditor
          ref={editorRef}
          onChange={onCommentChange}
          placeholder="Add a comment..."
        />
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onAddComment}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Add Comment
          </button>
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-all flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
