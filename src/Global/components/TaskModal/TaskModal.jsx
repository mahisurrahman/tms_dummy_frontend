import React, { useState } from "react";
import { X, Timer, MessageSquare } from "lucide-react";
import Comment from "../Comment/Comment";
import { getColorForIndex } from "../../Utils/TaskUtils.jsx";

const TaskModal = ({
  data,
  onClose,
  users,
  sections,
  sectionTitles,
  moveTask,
  updateTask
}) => {
  const { task, userId } = data;
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCom = {
      id: `c${Date.now()}`,
      author: "Current User",
      text: newComment,
      date: new Date().toISOString().split("T")[0],
      replies: [],
    };
    updateTask(userId, task.id, {
      comments: [...(task.comments || []), newCom],
    });
    setNewComment("");
  };

  const handleReply = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleAddReply = (parentId) => {
    if (!newReply.trim()) return;
    const updateComments = (comments) =>
      comments.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [
              ...(c.replies || []),
              {
                id: `r${Date.now()}`,
                author: "Current User",
                text: newReply,
                date: new Date().toISOString().split("T")[0],
                replies: [],
              },
            ],
          };
        }
        if (c.replies) {
          return { ...c, replies: updateComments(c.replies) };
        }
        return c;
      });
    updateTask(userId, task.id, {
      comments: updateComments(task.comments || []),
    });
    setNewReply("");
    setReplyingTo(null);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowStatusModal(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100"
              >
                Change Status
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">
                  Task Description
                </label>
                <div className="w-full min-h-80 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-red-50 text-gray-800">
                  {task.description || "No description provided"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-lime-700 mb-2">
                  Assigned To
                </label>
                <div className="w-full p-3 border border-gray-200 rounded-lg bg-lime-50 text-gray-800">
                  {users.find((u) => u.id === userId)?.name || "Unknown"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Deadline
                </label>
                <div className="w-full p-3 border border-gray-200 rounded-lg bg-sky-50 text-gray-800">
                  {task.deadline}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-700 mb-2">
                  Priority
                </label>
                <div className="w-full p-3 border border-gray-200 rounded-lg bg-yellow-50 text-gray-800">
                  {task.priority}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Status
                </label>
                <div className="w-full p-3 border border-gray-200 rounded-lg bg-purple-50 text-gray-800 capitalize">
                  {task.status}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Timer className="w-5 h-5 mr-2 text-blue-600" />
              Timeline
            </h3>
            <div className="overflow-x-scroll max-w-4xl flex space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300">
              <div className="relative w-full">
                <div className="absolute mt-3 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 rounded-full"></div>
                {task.history.map((entry, idx) => (
                  <div
                    key={idx}
                    className="relative inline-block min-w-[160px] text-center"
                    style={{ marginLeft: idx === 0 ? "0" : "10px" }}
                  >
                    <div
                      className={`absolute  w-8 h-8 rounded-full border-4 flex items-center justify-center ${getColorForIndex(
                        idx
                      )}`}
                      style={{ left: "50%", transform: "translateX(-50%)" }}
                    >
                      <span className="text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="mt-10 p-2 bg-white border border-gray-200 rounded-lg shadow">
                      <p className="font-medium text-gray-700 capitalize">
                        {entry.status}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {entry.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Comments & Updates
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {task.comments.length === 0 ? (
                <p className="text-gray-500 text-center">No comments yet</p>
              ) : (
                task.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    replyingTo={replyingTo}
                    onAddReply={(value) => {
                      if (typeof value === "string") {
                        setNewReply(value);
                      } else {
                        handleAddReply(comment.id);
                      }
                    }}
                  />
                ))
              )}
            </div>
            <div className="mt-4">
              <textarea
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Close
            </button>
          </div>
        </div>

        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Change Status
              </h3>
              <div className="space-y-2">
                {sections.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      const newStat = status;
                      moveTask(userId, task.id, newStat);
                      updateTask(userId, task.id, {
                        history: [
                          ...task.history,
                          {
                            status: newStat,
                            date: new Date().toISOString().split("T")[0],
                          },
                        ],
                      });
                      setShowStatusModal(false);
                    }}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left px-4 font-medium text-gray-700 transition-all"
                  >
                    {sectionTitles[status]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowStatusModal(false)}
                className="mt-4 w-full py-3 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;