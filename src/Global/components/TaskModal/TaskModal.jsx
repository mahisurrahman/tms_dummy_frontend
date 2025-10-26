import React, { useState, useRef, useContext, useEffect } from "react";
import TaskDetailsSection from "../TaskDetailsSection/TaskDetailsSection.jsx";
import HorizontalTimeline from "../HorizontalTimeline/HorizontalTimeline.jsx";
import StatusModal from "../StatusModal/StatusModal.jsx";
import CommentsSection from "../CommentsSection/CommentsSection.jsx";
import TaskModalHeader from "../TaskModalHeader/TaskModalHeader.jsx";
import PriorityModal from "../PriorityModa/PriorityModal.jsx";
import { formatReadableDateTime } from "../../Utils/formatReadableDateTime.js";
import { AuthContext } from "../../../provider/AuthProvider.jsx";
import { commentsApi } from "../../../api/endpoints/comments.api.js";
import toast from "react-hot-toast";
import { notiFyCntrlAPI } from "../../../api/endpoints/notificationControll.api.js";
import { notificationAPI } from "../../../api/endpoints/notification.api.js";

const TaskModal = ({
  onEdit,
  task,
  onClose,
  users,
  sections,
  sectionTitles,
  moveTask,
  updateTask,
  changeStatusTask,
  taskNotification,
  handleReadNotification,
  refreshTask,
  commentNotification,
  handleSeenComment,
  refreshNotis,
  setRefresNotis,
  handleUpdateTask,
}) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [notifyControll, setNotifyControll] = useState(null);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const commentEditorRef = useRef(null);
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const fetchComments = async () => {
    try {
      const response = await commentsApi.getAllCommentByTaskId(task?.taskId);
      setAllComments(response.data);
    } catch (error) {
      console.log(error, "Fetch Comments Failed");
    }
  };

  const notificationControll = async () => {
    try {
      setLoading(true);
      const response = await notiFyCntrlAPI.getByTaskId(task?.taskId);
      setNotifyControll(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(console.log("Notification Controll Fetch error", error));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    notificationControll();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const taggedUserIds = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(newComment, "text/html");
    const spans = doc.querySelectorAll('span[contenteditable="false"]');
    spans.forEach((span) => {
      const username = span.textContent.slice(1); // Remove '@' from username
      const taggedUser = users.find((u) => u.username === username);
      if (
        taggedUser &&
        taggedUser._id &&
        !taggedUserIds.includes(taggedUser._id)
      ) {
        taggedUserIds.push(taggedUser._id);
      }
    });

    // Create new comment object
    const newCommentObj = {
      taskLogId: task?._id,
      taskId: task?.taskId,
      userId: userId,
      author: user?.username,
      comment: newComment,
      taskStatus: task?.taskStatus,
      commentedOnTime: task?.totalOnGoingTime,
      taggedUsers: taggedUserIds, // Add tagged user IDs
    };

    try {
      const response = await commentsApi.create(newCommentObj);
      if (response.data) {
        toast.success("Comment Created");
        fetchComments();
      }
    } catch (error) {
      console.log(error, "Create Comment Failed");
    }

    setNewComment("");
    if (commentEditorRef.current) {
      commentEditorRef.current.clear();
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await commentsApi.removeComment(id);
      if (response.data) {
        toast.success("Comment Removed");
        fetchComments();
      }
    } catch (error) {
      console.log(error, "Remove Comment Failed");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusLoading(true);
      const startTime = task?.startTime;
      const endTime = new Date().toISOString();

      if (changeStatusTask) {
        await changeStatusTask(
          task._id,
          task?.taskId,
          newStatus,
          startTime,
          endTime
        );

        if (refreshTask) {
          await refreshTask();
        }
      }
      setRefresNotis(!refreshNotis);
      setShowStatusModal(false);
    } catch (error) {
      console.error("Failed to change status:", error);
    } finally {
      setStatusLoading(false);
    }
  };

  const handlePriorityChange = (priority) => {
    console.log(priority, "priority");
    let taskPriority = priority;
    handleUpdateTask(taskPriority);
    setShowPriorityModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-transparent rounded-2xl max-w-4xl w-full max-h-[100vh] overflow-y-auto">
        <TaskModalHeader
          title={task?.taskDetails?.taskTitle}
          onClose={onClose}
          onEdit={onEdit}
        />

        <div className="space-y-6">
          <div className="mt-5">
            <TaskDetailsSection
              setLoading={setLoading}
              loading={loading}
              notifyControll={notifyControll}
              allComments={allComments}
              data={task}
              user={user}
              onStatusChange={() => setShowStatusModal(true)}
              onPriorityChange={() => setShowPriorityModal(true)}
              taskNotification={taskNotification}
              handleReadNotification={handleReadNotification}
              handlePriorityChange={handlePriorityChange}
              setShowPriorityModal={setShowPriorityModal}
              showPriorityModal={showPriorityModal}
            />
          </div>

          <div>
            <HorizontalTimeline task={task} />
          </div>

          <CommentsSection
            users={users}
            taskId={task?.taskId}
            comments={allComments}
            newComment={newComment}
            onCommentChange={setNewComment}
            onAddComment={handleAddComment}
            editorRef={commentEditorRef}
            onClose={onClose}
            commentDelete={handleDeleteComment}
            commentNotification={commentNotification}
            handleSeenComment={handleSeenComment}
          />
        </div>

        {showStatusModal && (
          <StatusModal
            sections={sections}
            sectionTitles={sectionTitles}
            currentStatus={task?.taskStatus}
            onStatusChange={handleStatusChange}
            onClose={() => setShowStatusModal(false)}
            loading={statusLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TaskModal;
