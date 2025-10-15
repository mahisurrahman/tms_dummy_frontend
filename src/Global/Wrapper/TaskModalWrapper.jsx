import React, { useContext, useEffect, useState } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import { taskLogAPI } from "../../api/endpoints/taskLog.api";
import { Loader } from "lucide-react";
import { AuthContext } from "../../provider/AuthProvider";

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
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);

  const fetchTaskLogByTaskLogId = async () => {
    try {
      setLoading(true);
      const response = await taskLogAPI.getTaskLogById(data?.task?._id);
      setTask(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "Fetch Task Log By Task Log ID error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchTaskLogByTaskLogId();
    }
  }, [data]);
  return (
    <div>
      {loading === false && task ? (
        <TaskModal
          task={task}
          onClose={() => setSelectedTask(null)}
          users={users}
          sections={sections}
          sectionTitles={sectionTitles}
          moveTask={moveTask}
          updateTask={updateTask}
          changeStatusTask={changeStatusTask}
        />
      ) : (
        <loading />
      )}
    </div>
  );
}

export default TaskModalWrapper;
