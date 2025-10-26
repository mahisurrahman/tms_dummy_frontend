import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";

const EditTaskForm = ({
  onClose,
  task,
  users,
  handleEditTask,
  loading,
  user,
}) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    taskPriority: "Medium",
    taskAssignedTo: "",
    deadline: "",
  });

  const [originalData, setOriginalData] = useState({});

  // Initialize form with task data when component mounts or task changes
  useEffect(() => {
    if (task) {
      console.log(task, "Edit Task");

      // Format deadline for date input (YYYY-MM-DD)
      const deadlineDate = task?.taskDetails?.deadline
        ? new Date(task.taskDetails.deadline).toISOString().split("T")[0]
        : "";

      const initialData = {
        taskTitle: task?.taskDetails?.taskTitle || "",
        taskDescription: task?.taskDetails?.taskDescription || "",
        taskPriority: task?.taskDetails?.taskPriority || "Medium",
        taskAssignedTo: task?.assignedToId || "",
        deadline: deadlineDate,
      };

      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Get only the changed fields
  const getChangedFields = () => {
    const changes = {};

    Object.keys(formData).forEach((key) => {
      if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) {
        changes[key] = formData[key];
      }
    });

    return changes;
  };

  const handleSubmit = () => {
    const changedFields = getChangedFields();

    // Convert deadline back to ISO string if it was changed
    if (changedFields.deadline) {
      changedFields.deadline = new Date(changedFields.deadline).toISOString();
    }

    const taskData = {
      taskId: task?.taskId || task?._id,
      changes: changedFields,
    };

    handleEditTask(taskData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Task</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                name="taskTitle"
                value={formData.taskTitle}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Describe the task..."
              />
            </div>

            {user && user?.userType === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="taskPriority"
                    value={formData.taskPriority}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {user && user?.userType === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign To
                    </label>
                    <select
                      name="taskAssignedTo"
                      value={formData.taskAssignedTo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Developer / Backlog</option>
                      {users?.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))}
                      <option value="">Backlog</option>
                    </select>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="taskPriority"
                    value={formData.taskPriority}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {user && user?.userType === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign To
                    </label>
                    <select
                      name="taskAssignedTo"
                      value={formData.taskAssignedTo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Developer / Backlog</option>
                      {users?.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))}
                      <option value="">Backlog</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Task
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTaskForm;
