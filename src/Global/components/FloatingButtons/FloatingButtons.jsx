import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const FloatingButtons = ({
  showRightColumn,
  setShowRightColumn,
  showBacklog,
  setShowBacklog,
  isMobileView,
  setSelectedUserForCreate,
  setShowCreateTask
}) => {
  return (
    <>
      {!showRightColumn && !isMobileView && (
        <button
          onClick={() => setShowRightColumn(true)}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 rounded-l-lg z-10 hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {!showBacklog && !isMobileView && (
        <button
          onClick={() => setShowBacklog(true)}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 rounded-r-lg z-10 hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {isMobileView && (
        <>
          <div className="fixed bottom-20 right-4">
            <button
              onClick={() => setShowRightColumn(!showRightColumn)}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
            >
              {showRightColumn ? (
                <ChevronRight className="w-6 h-6" />
              ) : (
                <ChevronLeft className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="fixed bottom-20 left-4">
            <button
              onClick={() => setShowBacklog(!showBacklog)}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
            >
              {showBacklog ? (
                <ChevronLeft className="w-6 h-6" />
              ) : (
                <ChevronRight className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => {
                setSelectedUserForCreate(null);
                setShowCreateTask(true);
              }}
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingButtons;