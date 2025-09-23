import React from "react";

const PriorityModal = ({
  priorities,
  onPriorityChange,
  onClose,
  onAddCustom,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Change Priority
        </h3>
        <div className="space-y-2">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              onClick={() => onPriorityChange(priority.value)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left px-4 font-medium text-gray-700 transition-all flex items-center justify-between"
            >
              <span>{priority.label}</span>
              {priority.color && (
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: priority.color }}
                ></span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={onAddCustom}
          className="mt-4 w-full py-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 font-medium transition-all"
        >
          Add Custom Priority
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full py-3 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PriorityModal;
