import React, { useContext, useEffect, useState } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import { taskLogAPI } from "../../api/endpoints/taskLog.api";
import { AuthContext } from "../../provider/AuthProvider";
import { notificationAPI } from "../../api/endpoints/notification.api";

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
}) {
  console.log(data, "data datadata data data ");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskNotification, setTaskNotification] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchTaskLogByTaskLogId = async () => {
    try {
      setLoading(true);
      const response = await taskLogAPI.getTaskLogById(data?.task?._id);
      setTask(response.data);
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
      console.log(response.data, "TAsk status change notifcation response");
    } catch (error) {
      console.log(error, "Fetch Task STatus Notification error");
    }
  };

  useEffect(() => {
    if (data) {
      fetchTaskLogByTaskLogId();
      fetchTaskStatusByTaskIdandUserId();
    }
  }, [data]);

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
        <TaskModal
          user={user}
          task={task}
          onClose={() => setSelectedTask(null)}
          users={users}
          sections={sections}
          sectionTitles={sectionTitles}
          moveTask={moveTask}
          updateTask={updateTask}
          changeStatusTask={changeStatusTask}
        />
      ) : null}
    </div>
  );
}

export default TaskModalWrapper;
