import React from "react";
import { ChevronRight, Plus, Trophy, Timer } from "lucide-react";

const QuickCreateColumn = ({
  showRightColumn,
  setShowRightColumn,
  users,
  setSelectedUserForCreate,
  setShowCreateTask,
}) => {
  if (!showRightColumn) return null;

  return (
    <div className="w-1/6 bg-white/10 backdrop-blur-md border-l border-white/20 p-2 md:p-4 overflow-y-auto transition-all duration-300 ease-in-out shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-2">
            <Plus className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
          Quick Create
        </h2>
        <button
          onClick={() => setShowRightColumn(false)}
          className="p-1 bg-white/20 rounded-md text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => {
          setSelectedUserForCreate(null);
          setShowCreateTask(true);
        }}
        className="w-full flex items-center justify-center gap-x-1 md:gap-x-2 bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded font-semibold text-sm md:text-base hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
      >
        <Plus className="w-3 h-3 md:w-4 md:h-4" />
        New Task
      </button>

      <div className="space-y-2 md:space-y-3 mt-3 md:mt-5">
        <div className="flex items-center justify-start gap-x-1 md:gap-x-2">
          <h1 className="text-sm md:text-md font-bold text-white">
            Mahisur Rahman
          </h1>
          <p className="text-xs md:text-sm font-bold text-blue-400">
            (Junior Frontend Developer)
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">
              Total Tasks
            </span>
            <span className="text-white font-bold text-base md:text-lg">
              24
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">Completed</span>
            <span className="text-green-400 font-bold text-base md:text-lg">
              12
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">
              In Progress
            </span>
            <span className="text-blue-400 font-bold text-base md:text-lg">
              8
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">Overdue</span>
            <span className="text-red-400 font-bold text-base md:text-lg animate-pulse">
              4
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 flex items-center">
          <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-yellow-400" />
          Top Performers
        </h3>
        <div className="space-y-1 md:space-y-2">
          {users
            .sort((a, b) => b.storyPoints - a.storyPoints)
            .slice(0, 3)
            .map((user, index) => (
              <div
                key={user.id}
                className="flex items-center space-x-2 md:space-x-3 bg-white/20 rounded-lg p-1 md:p-2"
              >
                <div
                  className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : "bg-orange-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white text-xs md:text-sm font-medium">
                    {user.name}
                  </div>
                  <div className="text-white/60 text-xs">
                    {user.storyPoints} points
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuickCreateColumn;
