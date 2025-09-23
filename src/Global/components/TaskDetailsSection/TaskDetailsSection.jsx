import { Play, Square, Bell, Download, Pin } from "lucide-react";
import { useState } from "react";
import PriorityModal from "../PriorityModa/PriorityModal";

export default function TaskDetailsSection({
  onStatusChange,
  onPriorityChange,
}) {
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  // Define priorities with colors
  const priorities = [
    { value: "extreme", label: "Extreme", color: "#dc2626" },
    { value: "high", label: "High", color: "#ea580c" },
    { value: "medium", label: "Medium", color: "#d97706" },
    { value: "low", label: "Low", color: "#16a34a" },
    { value: "extra", label: "Extra", color: "#9333ea" },
  ];

  const handlePriorityChange = (priority) => {
    if (onPriorityChange) {
      onPriorityChange(priority);
    }
    setShowPriorityModal(false);
  };

  const handleAddCustomPriority = () => {
    // You can implement custom priority logic here
    const customPriority = prompt("Enter custom priority name:");
    if (customPriority && onPriorityChange) {
      onPriorityChange(customPriority.toLowerCase());
    }
    setShowPriorityModal(false);
  };

  // Get current priority info
  const currentPriority = priorities.find((p) => p.value === "low") || {
    label: "Low",
    color: "#16a34a",
  };

  return (
    <>
      <div className="bg-white border-4 border-green-500 rounded-2xl p-4 w-full">
        {/* Header with title and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Task Title:{" "}
              <span className="text-orange-600">Ongoing Task 1</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={onStatusChange}
              className="bg-gradient-to-r from-blue-600 to-sky-400 text-white px-3 py-1 rounded cursor-pointer text-xs font-medium"
            >
              Ongoing
            </button>
            <span className="text-yellow-600 text-2xl font-bold">00:45:00</span>
          </div>
        </div>

        {/* Priority badge - Now clickable */}
        <div className="-mt-10 mb-4">
          <span className="font-semibold">Priority:</span>
          <button
            onClick={() => setShowPriorityModal(true)}
            className="ml-2 bg-gradient-to-r from-green-500 to-lime-600 text-white px-3 py-1 rounded text-sm font-medium cursor-pointer hover:from-green-600 hover:to-lime-700 transition-all"
            style={{
              background:
                currentPriority.value === "low"
                  ? "linear-gradient(to right, #16a34a, #22c55e)"
                  : `linear-gradient(to right, ${currentPriority.color}, ${currentPriority.color})`,
            }}
          >
            {currentPriority.label}
          </button>
        </div>

        {/* Rest of your component remains the same */}
        <div className="space-y-1 text-sm text-gray-700 mb-4">
          <div>
            <span className="font-bold">Assigned By:</span> Admin
          </div>
          <div>
            <span className="font-bold">Assigned Date:</span> 2025-09-11, 11:00
            AM
          </div>
          <div>
            <span className="font-bold">Project Title:</span> DOL
          </div>
          <div className="text-red-600">
            <span className="font-bold">Expected Deadline:</span> 2025-01-20,
            12:00 PM
          </div>
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-1">Task Description:</h3>
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-200">
            Complete the user authentication module with login, registration,
            and password recovery features. Ensure all security protocols are
            implemented according to company standards.
          </p>
        </div>

        {/* Task Attachments */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-2">Task Attachments:</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-blue-600">PDF</span>
                </div>
                <span className="text-sm text-gray-700">requirements.pdf</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-green-600">DOC</span>
                </div>
                <span className="text-sm text-gray-700">guidelines.docx</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Assigned To Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Assigned To:</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                  JS
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    John Smith
                  </span>
                  <span className="text-xs text-gray-600 ml-2">
                    (Senior Developer)
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm py-2 px-3 rounded-lg shadow-sm cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all">
              <Pin className="w-4 h-4 mr-1" />
              Poke
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full grid grid-cols-2 gap-2">
          <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm py-2 px-1 rounded shadow-sm shadow-black cursor-pointer hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center">
            <Play className="w-3 h-3 mr-1" />
            Start
          </button>
          <button className="w-full bg-gradient-to-r from-red-700 to-pink-700 text-white text-sm py-2 px-1 rounded shadow-sm shadow-black cursor-pointer hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center">
            <Square className="w-3 h-3 mr-1" />
            End
          </button>
        </div>
      </div>

      {/* Priority Modal */}
      {showPriorityModal && (
        <PriorityModal
          priorities={priorities}
          onPriorityChange={handlePriorityChange}
          onAddCustom={handleAddCustomPriority}
          onClose={() => setShowPriorityModal(false)}
        />
      )}
    </>
  );
}
