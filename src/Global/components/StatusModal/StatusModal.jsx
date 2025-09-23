import React from "react";

const StatusModal = ({ sections, sectionTitles, onStatusChange, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Change Status</h3>
        <div className="space-y-2">
          {sections.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left px-4 font-medium text-gray-700 transition-all"
            >
              {sectionTitles[status]}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
