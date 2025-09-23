import React, { useState, useRef } from "react";
import TaskDetailsSection from "../TaskDetailsSection/TaskDetailsSection.jsx";
import HorizontalTimeline from "../HorizontalTimeline/HorizontalTimeline.jsx";
import StatusModal from "../StatusModal/StatusModal.jsx";
import CommentsSection from "../CommentsSection/CommentsSection.jsx";
import TaskModalHeader from "../TaskModalHeader/TaskModalHeader.jsx";
import PriorityModal from "../PriorityModa/PriorityModal.jsx";

const TaskModal = ({
  data,
  onClose,
  users,
  sections,
  sectionTitles,
  moveTask,
  updateTask,
}) => {
  const { task, userId } = data;
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const commentEditorRef = useRef(null);

  const calculateTotalTaskTime = () => {
    if (!task.history || task.history.length === 0) return "0h 0m";
    const startDate = new Date(task.history[0].date);
    const endDate = new Date(task.history[task.history.length - 1].date);
    const diffMs = endDate - startDate;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCom = {
      id: `c${Date.now()}`,
      author: "Current User",
      text: newComment,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: task.status,
      totalTime: calculateTotalTaskTime(),
      replies: [],
    };

    updateTask(userId, task.id, {
      comments: [...(task.comments || []), newCom],
    });
    setNewComment("");
    if (commentEditorRef.current) {
      commentEditorRef.current.clear();
    }
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
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                status: task.status,
                totalTime: calculateTotalTaskTime(),
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

  const handleStatusChange = (status) => {
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
  };

  const handlePriorityChange = (priority) => {
    updateTask(userId, task.id, {
      priority: priority,
    });
    setShowPriorityModal(false);
  };

  const handleAddCustomPriority = () => {
    const customPriority = prompt("Enter custom priority name:");
    if (customPriority) {
      updateTask(userId, task.id, {
        priority: customPriority.toLowerCase(),
      });
    }
    setShowPriorityModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-transparent rounded-2xl max-w-4xl w-full max-h-[100vh] overflow-y-auto">
        <TaskModalHeader
          title={task.title}
          onClose={onClose}
          onStatusChange={() => setShowStatusModal(true)}
        />

        <div className="space-y-6">
          <div className="mt-5">
            <TaskDetailsSection
              onStatusChange={() => setShowStatusModal(true)}
            />
          </div>

          <div>
            <HorizontalTimeline />
          </div>

          <CommentsSection
            comments={task.comments}
            replyingTo={replyingTo}
            newComment={newComment}
            onCommentChange={setNewComment}
            onAddComment={handleAddComment}
            onReply={handleReply}
            onAddReply={handleAddReply}
            editorRef={commentEditorRef}
            onClose={onClose}
          />
        </div>

        {showStatusModal && (
          <StatusModal
            sections={sections}
            sectionTitles={sectionTitles}
            onStatusChange={handleStatusChange}
            onClose={() => setShowStatusModal(false)}
          />
        )}

        {showPriorityModal && (
          <PriorityModal
            priorities={[
              { value: "extreme", label: "Extreme", color: "#dc2626" },
              { value: "high", label: "High", color: "#ea580c" },
              { value: "medium", label: "Medium", color: "#d97706" },
              { value: "low", label: "Low", color: "#16a34a" },
              { value: "extra", label: "Extra", color: "#9333ea" },
            ]}
            onPriorityChange={handlePriorityChange}
            onAddCustom={handleAddCustomPriority}
            onClose={() => setShowPriorityModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskModal;
