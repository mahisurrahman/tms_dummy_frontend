import React, { useContext, useEffect, useState } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import EditTaskForm from "../components/EditTaskForm/EditTaskForm"; // Import the EditTaskForm
import { taskLogAPI } from "../../api/endpoints/taskLog.api";
import { AuthContext } from "../../provider/AuthProvider";
import { notificationAPI } from "../../api/endpoints/notification.api";
import toast from "react-hot-toast";
import { taskAPI } from "../../api/endpoints/task.api";

function TaskModalWrapper({
  data,
  onClose,
  users,
  sections,
  sectionTitles,
  moveTask,
  updateTask,
  changeStatusTask,
  selectedTask,
  setSelectedTask,
  setRefresNotis,
  refreshNotis,
  handleEditTask, // Add this prop
  editLoading,
}) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskNotification, setTaskNotification] = useState([]);
  const [commentNotification, setCommentNotification] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const { user } = useContext(AuthContext);

  const fetchTaskLogByTaskLogId = async () => {
    try {
      setLoading(true);
      if (data?.userId === null) {
        setTask({
          ...data.task,
          taskDetails: data.task,
        });
      } else {
        const response = await taskLogAPI.getTaskLogById(data?.task?._id);
        setTask(response.data);
      }
    } catch (error) {
      console.log(error, "Fetch Task Log By Task Log ID error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskStatusByTaskIdandUserId = async () => {
    try {
      const body = { taskId: data?.task?.taskId, userId: user?._id };
      const response = await notificationAPI.getByTaskIdAndUserId(body);
      setTaskNotification(response.data);
    } catch (error) {
      console.log(error, "Fetch Task STatus Notification error");
    }
  };

  const fetchCommentTaskStatusByTaskIdandUserId = async () => {
    try {
      const body = { taskId: data?.task?.taskId, userId: user?._id };
      const response =
        await notificationAPI.getCommentNotificationByTaskIdAndUserId(body);
      setCommentNotification(response.data);
    } catch (error) {
      console.log(error, "Fetch Comment Notification error");
    }
  };

  useEffect(() => {
    if (data) {
      fetchTaskLogByTaskLogId();
      fetchTaskStatusByTaskIdandUserId();
      fetchCommentTaskStatusByTaskIdandUserId();
    }
  }, [data]);

  const handleUpdateTask = async (priority) => {
    try {
      if (data?.task?.taskId) {
        const response = await taskAPI.update(data?.task?.taskId, {
          taskPriority: priority,
        });

        if (response.data) {
          toast.success("Priority updated successfully!");
          fetchTaskLogByTaskLogId();
        } else {
          toast.error(response.message || "Failed to update priority");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong while updating priority");
    }
  };

  const refreshTask = async () => {
    await fetchTaskLogByTaskLogId();
  };

  const handleReadNotification = async () => {
    try {
      const body = { taskId: data?.task?.taskId, userId: user?._id };
      const response = await notificationAPI.readByTaskIdAndUserId(body);
      if (response?.data) {
        toast.success("Change Status Notification Seen");
        setRefresNotis(!refreshNotis);
      }
    } catch (error) {
      console.log("Notification Read Failed", error);
    }
  };

  const handleSeenComment = async (commentId) => {
    try {
      const body = { taskId: data?.task?.taskId, userId: user?._id, commentId };
      const response = await notificationAPI.readCommentByTaskIdAndUserId(body);
      if (response?.data) {
        toast.success("Comment's Notification Seen");
        setCommentNotification((prev) =>
          prev.filter((notification) => notification.commentId !== commentId)
        );
        setRefresNotis(!refreshNotis);
      }
    } catch (error) {
      console.log("Notification Read Failed", error);
    }
  };

  // Handler for edit button click
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  // Update the handleEditFormSubmit to ensure loading state flows through
  const handleEditFormSubmit = (editData, notifyPayload) => {
    if (handleEditTask) {
      handleEditTask(editData, notifyPayload);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading task details...</p>
          </div>
        </div>
      ) : task ? (
        <>
          <TaskModal
            onEdit={handleEditClick}
            user={user}
            task={task}
            onClose={onClose}
            users={users}
            sections={sections}
            sectionTitles={sectionTitles}
            moveTask={moveTask}
            updateTask={updateTask}
            changeStatusTask={changeStatusTask}
            taskNotification={taskNotification}
            handleReadNotification={handleReadNotification}
            refreshTask={refreshTask}
            commentNotification={commentNotification}
            handleSeenComment={handleSeenComment}
            refreshNotis={refreshNotis}
            setRefresNotis={setRefresNotis}
            handleUpdateTask={handleUpdateTask}
          />

          {/* Edit Task Modal */}
          {showEditModal && (
            <EditTaskForm
              onClose={() => setShowEditModal(false)}
              task={task}
              users={users}
              handleEditTask={handleEditFormSubmit}
              loading={editLoading}
              user={user}
            />
          )}
        </>
      ) : null}
    </div>
  );
}

export default TaskModalWrapper;
