import React, { useEffect, useState } from "react";
import { X, Plus, Upload, Tag } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import { labelAPI } from "../../../api/endpoints/label.api";

const CreateTaskForm = ({
  onClose,
  defaultUserId,
  users,
  handleAddTask,
  loading,
  user,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    project: "DNCRP",
    assignedTo: user && user?.userType === 1 ? defaultUserId || "" : user?._id,
    deadline: "",
    assignedBy: "Current User",
    assignedDate: new Date().toISOString(),
    labels: [], // New field for selected labels
  });

  const [labels, setLabels] = useState([]);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [newLabel, setNewLabel] = useState({
    labelTitle: "",
    labelDescription: "",
  });
  const [labelLoading, setLabelLoading] = useState(false);

  const fetchAllLabels = async () => {
    try {
      const response = await labelAPI.getAllLabels();
      setLabels(response.data);
    } catch (error) {
      console.log(error, "Fetch All Label Errors");
    }
  };

  useEffect(() => {
    fetchAllLabels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deadline") {
      const isoDate = value ? new Date(value).toISOString() : "";
      setFormData({ ...formData, [name]: isoDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLabelToggle = (labelId) => {
    setFormData((prev) => {
      const currentLabels = prev.labels || [];
      if (currentLabels.includes(labelId)) {
        return {
          ...prev,
          labels: currentLabels.filter((id) => id !== labelId),
        };
      } else {
        return {
          ...prev,
          labels: [...currentLabels, labelId],
        };
      }
    });
  };

  const handleNewLabelChange = (e) => {
    const { name, value } = e.target;
    setNewLabel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateLabel = async () => {
    if (!newLabel.labelTitle.trim()) return;

    setLabelLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const payload = {
        labelTitle: newLabel.labelTitle,
        labelDescription: newLabel.labelDescription,
      };

      const response = await labelAPI.createLabel(payload);
      const createdLabel = response.data;

      setLabels((prev) => [...prev, createdLabel]);

      // Auto-select the newly created label (store the full object)
      setFormData((prev) => ({
        ...prev,
        labels: [...(prev.labels || []), createdLabel._id], // Still store IDs in form state for checkbox management
      }));

      setNewLabel({ labelTitle: "", labelDescription: "" });
      setShowLabelModal(false);
    } catch (error) {
      console.error("Error creating label:", error);
    } finally {
      setLabelLoading(false);
    }
  };

  const handleSubmit = () => {
    const selectedLabelObjects = getSelectedLabels(); // Get full label objects
    const taskData = {
      ...formData,
      labels: selectedLabelObjects, // Send full objects instead of just IDs
    };
    handleAddTask(taskData);
  };

  const getSelectedLabels = () => {
    return labels.filter((label) => formData.labels?.includes(label._id));
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Create New Task</h2>
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
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
                placeholder="Describe the task..."
              />
            </div>

            {/* Labels Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Labels / Tags
              </label>
              <div className="space-y-3">
                {/* Selected Labels Display */}
                {getSelectedLabels().length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getSelectedLabels().map((label) => (
                      <span
                        key={label._id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        {label.name}
                        <button
                          type="button"
                          onClick={() => handleLabelToggle(label._id)}
                          className="ml-1 hover:text-green-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Labels Dropdown */}
                <div className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                    {labels.map((label) => (
                      <label
                        key={label._id}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData.labels?.includes(label._id) || false
                          }
                          onChange={() => handleLabelToggle(label._id)}
                          className="rounded text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">
                          {label.name}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Add New Label Button */}
                  <button
                    type="button"
                    onClick={() => setShowLabelModal(true)}
                    className="mt-2 flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Label
                  </button>
                </div>
              </div>
            </div>

            {user && user?.userType === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                {user && user?.userType === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign To
                    </label>
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                {user && user?.userType === 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign To
                    </label>
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  value={
                    formData.deadline
                      ? new Date(formData.deadline).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all flex items-center"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
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
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter label title (e.g., DOL, MOLE)..."
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter label description..."
                />
              </div>

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
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CreateTaskForm;
