import React from "react";

const StatusModal = ({
  sections,
  sectionTitles,
  currentStatus,
  onStatusChange,
  onClose,
  loading = false, // Add loading prop
}) => {
  const statuses = ["Pending", "InQueue", "Ongoing", "Review", "Complete"];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
          {loading ? "Changing Status..." : "Change Task Status"}
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5 mb-6">
              {statuses.map((status) => {
                const isSelected =
                  currentStatus?.toLowerCase() === status.toLowerCase();

                const gradientMap = {
                  complete: "bg-green-600",
                  ongoing: "bg-blue-600",
                  pending: "bg-orange-500",
                  inqueue: "bg-violet-600",
                  review: "bg-rose-600",
                };

                const hoverGradientMap = {
                  complete: "hover:bg-green-600",
                  ongoing: "hover:bg-blue-600",
                  pending: "hover:bg-orange-500",
                  inqueue: "hover:bg-violet-600",
                  review: "hover:bg-rose-600",
                };

                const gradient = gradientMap[status.toLowerCase()];
                const hoverGradient = hoverGradientMap[status.toLowerCase()];

                return (
                  <button
                    key={status}
                    onClick={() => onStatusChange(status)}
                    disabled={loading}
                    className={`px-4 py-3.5 cursor-pointer rounded-xl text-sm font-semibold text-left transition-all duration-200
                      ${
                        isSelected
                          ? `${gradient} text-white shadow-lg scale-105`
                          : `bg-gray-50 text-gray-700 border-2 border-transparent hover:text-white hover:shadow-md ${hoverGradient}`
                      }
                      ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">{status}</span>
                      {isSelected && <span className="text-lg">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className={`w-full bg-red-500 hover:bg-red-600 text-gray-50 font-semibold py-3 rounded-xl transition-all
                ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusModal;
