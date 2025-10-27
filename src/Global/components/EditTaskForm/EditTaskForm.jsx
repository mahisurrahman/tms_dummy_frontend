import React, { useEffect, useState } from "react";
import { X, Plus, Tag, Save } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import { labelAPI } from "../../../api/endpoints/label.api";
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
    title: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
    deadline: "", // Full ISO string for API
    displayDeadline: "", // YYYY-MM-DD for <input type="date">
    labels: [],
  });

  const [originalData, setOriginalData] = useState({});
  const [labels, setLabels] = useState([]);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [newLabel, setNewLabel] = useState({
    labelTitle: "",
    labelDescription: "",
  });
  const [labelLoading, setLabelLoading] = useState(false);

  // Fetch all labels
  const fetchAllLabels = async () => {
    try {
      const response = await labelAPI.getAllLabels();
      setLabels(response.data || []);
    } catch (error) {
      console.log(error, "Fetch All Label Errors");
    }
  };

  useEffect(() => {
    fetchAllLabels();
  }, []);

  // Initialize form when task loads
  useEffect(() => {
    if (task) {
      const taskDetails = task.taskDetails || task;

      // Handle expectedDeadline or deadline
      const isoDate =
        taskDetails.expectedDeadline || taskDetails.deadline || "";
      const displayDate = isoDate
        ? new Date(isoDate).toISOString().split("T")[0]
        : "";

      const initialData = {
        title: taskDetails.taskTitle || "",
        description: taskDetails.taskDescription || "",
        priority: taskDetails.taskPriority || "Medium",
        assignedTo: task.assignedToId || task.assignedTo || "",
        deadline: isoDate,
        displayDeadline: displayDate,
        labels: (taskDetails.labels || []).map((l) =>
          typeof l === "string" ? l : l._id
        ),
      };

      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [task]);

  const handleLabelRemove = async (id) => {
    try {
      const response = await labelAPI.removeLabel(id);
      if (response.data) {
        toast.success("Label removed");
        fetchAllLabels();
      }
    } catch (error) {
      console.log(error, "Removing Label Error");
      toast.error("Failed to remove label");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Special handler for deadline input
  const handleDeadlineChange = (e) => {
    const displayValue = e.target.value;
    const isoValue = displayValue ? new Date(displayValue).toISOString() : "";

    setFormData((prev) => ({
      ...prev,
      displayDeadline: displayValue,
      deadline: isoValue,
    }));
  };

  const handleLabelToggle = (labelId) => {
    setFormData((prev) => {
      const current = prev.labels || [];
      if (current.includes(labelId)) {
        return { ...prev, labels: current.filter((id) => id !== labelId) };
      } else {
        return { ...prev, labels: [...current, labelId] };
      }
    });
  };

  const handleNewLabelChange = (e) => {
    const { name, value } = e.target;
    setNewLabel((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateLabel = async () => {
    if (!newLabel.labelTitle.trim()) return;

    setLabelLoading(true);
    try {
      const payload = {
        labelTitle: newLabel.labelTitle,
        labelDescription: newLabel.labelDescription,
      };

      const response = await labelAPI.createLabel(payload);
      const createdLabel = response.data;

      setLabels((prev) => [...prev, createdLabel]);
      setFormData((prev) => ({
        ...prev,
        labels: [...(prev.labels || []), createdLabel._id],
      }));

      setNewLabel({ labelTitle: "", labelDescription: "" });
      setShowLabelModal(false);
      toast.success("Label created");
    } catch (error) {
      console.error("Error creating label:", error);
      toast.error("Failed to create label");
    } finally {
      setLabelLoading(false);
    }
  };

  // Get only changed fields
  const getChangedFields = () => {
    const changes = {};
    const currentLabels = labels.filter((l) =>
      formData.labels?.includes(l._id)
    );
    const originalLabels = labels.filter((l) =>
      originalData.labels?.includes(l._id)
    );

    Object.keys(formData).forEach((key) => {
      if (key === "labels") {
        if (JSON.stringify(currentLabels) !== JSON.stringify(originalLabels)) {
          changes.labels = currentLabels.map((l) => l._id);
        }
      } else if (key !== "displayDeadline") {
        if (
          JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])
        ) {
          changes[key] = formData[key];
        }
      }
    });

    return changes;
  };

  console.log(task, "task");

  const handleSubmit = () => {
    const changedFields = getChangedFields();

    if (Object.keys(changedFields).length === 0) {
      toast.error("No changes detected");
      return;
    }

    const taskData = {
      taskId: task?.taskId || task?._id,
      changes: {
        // Map UI fields → API fields
        taskTitle: changedFields.title,
        taskDescription: changedFields.description,
        taskPriority: changedFields.priority,
        taskAssignedTo: changedFields.assignedTo,
        expectedDeadline: changedFields.deadline,
        labels: changedFields.labels,
      },
    };

    // Clean up UI-only keys
    delete taskData.changes.title;
    delete taskData.changes.description;
    delete taskData.changes.priority;
    delete taskData.changes.assignedTo;
    delete taskData.changes.deadline;

    const notifyPayload = {
      taskId: taskData.taskId,
      taskTitle: changedFields.title || originalData.title,
      taskDescription: changedFields.description,
      taskPriority: changedFields.priority,
      taskAssignedTo: changedFields.assignedTo,
      expectedDeadline: changedFields.deadline,
      labels: changedFields.labels,
      isActive: task?.isActive,
      taskCreatedBy: task?.taskCreatedBy?._id,
    };

    handleEditTask(taskData, notifyPayload);
  };

  const getSelectedLabels = () => {
    return labels.filter((label) => formData.labels?.includes(label._id));
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
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Describe the task..."
              />
            </div>
            {/* Blank Commit */}
            {/* Labels Section */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Labels / Tags
              </label>
              <div className="space-y-3">
                {getSelectedLabels().length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getSelectedLabels().map((label) => (
                      <span
                        key={label._id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        {label.labelTitle}
                        <button
                          type="button"
                          onClick={() => handleLabelToggle(label._id)}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="relative">
                  {labels.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                      {labels.map((label) => (
                        <div
                          key={label._id}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={
                              formData.labels?.includes(label._id) || false
                            }
                            onChange={() => handleLabelToggle(label._id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            onClick={() => handleLabelToggle(label._id)}
                            className="text-sm text-gray-700 flex-1 cursor-pointer select-none"
                          >
                            {label.labelTitle}
                          </span>
                          {user?.userType === 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLabelRemove(label._id);
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 p-4 border rounded-lg">
                      <Tag className="w-4 h-4 mb-1 text-gray-400 mx-auto" />
                      <p className="text-sm">No labels found</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowLabelModal(true)}
                    className="mt-2 flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Label
                  </button>
                </div>
              </div>
            </div> */}
            {/* Priority & Assign To */}
            {user?.userType === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To
                  </label>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Developer</option>
                    {users
                      ?.filter((user) => user.userType == 2)
                      .map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.username}
                        </option>
                      ))}
                    {/* <option value="">Backlog</option> */}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            )}
            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                value={formData.displayDeadline}
                onChange={handleDeadlineChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center disabled:opacity-50 min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
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

      {/* Add New Label Modal */}
      {showLabelModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Create New Label</h2>
                <button
                  onClick={() => setShowLabelModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label Title *
                </label>
                <input
                  type="text"
                  name="labelTitle"
                  value={newLabel.labelTitle}
                  onChange={handleNewLabelChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., DOL, MOLE"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label Description
                </label>
                <textarea
                  name="labelDescription"
                  value={newLabel.labelDescription}
                  onChange={handleNewLabelChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Optional description..."
                />
              </div>
              emo{" "}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setShowLabelModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateLabel}
                  disabled={!newLabel.labelTitle.trim() || labelLoading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center disabled:opacity-50"
                >
                  {labelLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Label
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskForm;
