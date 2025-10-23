import React, { useContext } from "react";
import {
  ChevronRight,
  Plus,
  Trophy,
  Timer,
  User,
  Settings,
  LogOut,
  BadgeAlertIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../provider/AuthProvider";

const QuickCreateColumn = ({
  showRightColumn,
  setShowRightColumn,
  users,
  setSelectedUserForCreate,
  setShowCreateTask,
  setShowCreateUser,
  handleLogoutButton,
  totalTasks,
  completedTotalTasks,
  ongoingTotalTasks,
  pendingTotalTasks,
  inqueTotalTasks,
  reviewTotalTasks,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!showRightColumn) return null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-1/6 bg-white/10 backdrop-blur-md border-l border-white/20 p-2 md:p-4 overflow-y-auto transition-all duration-300 ease-in-out shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-2">
            <BadgeAlertIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
          At a glance
        </h2>
        <button
          onClick={() => setShowRightColumn(false)}
          className="p-1 bg-white/20 rounded-md text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {user && user.userType === 1 && (
        <div>
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
          <button
            onClick={() => {
              setSelectedUserForCreate(null);
              setShowCreateUser(true);
            }}
            className="w-full flex items-center justify-center gap-x-1 md:gap-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded font-semibold text-sm md:text-base hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
          >
            <User className="w-3 h-3 md:w-4 md:h-4" />
            Add User
          </button>
        </div>
      )}

      <div className="space-y-2 md:space-y-3 mt-3 md:mt-5">
        <div className="flex flex-col items-center justify-center gap-x-1 md:gap-x-2">
          <h1 className="text-sm md:text-lg font-bold text-white">
            {user?.username}
          </h1>
          <p className="text-xs md:text-sm font-bold text-blue-400">
            ({user?.designation})
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">
              Total Tasks
            </span>
            <span className="text-white font-bold text-base md:text-lg">
              {totalTasks?.length}
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">Completed</span>
            <span className="text-green-400 font-bold text-base md:text-lg">
              {completedTotalTasks.length}
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">On Going</span>
            <span className="text-blue-400 font-bold text-base md:text-lg">
              {ongoingTotalTasks.length}
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">Pending</span>
            <span className="text-white font-bold text-base md:text-lg">
              {pendingTotalTasks.length}
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">In Que</span>
            <span className="text-red-500 font-bold text-base md:text-lg">
              {inqueTotalTasks.length}
            </span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/30">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs md:text-sm">Review</span>
            <span className="text-purple-400 font-bold text-base md:text-lg">
              {reviewTotalTasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="mt-4 md:mt-6">
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
      </div> */}

      {/* Navigation Buttons */}
      <div className="mt-6 md:mt-4 space-y-2 md:space-y-3">
        {/* <button
          onClick={() => handleNavigation("/profile")}
          className="w-full flex items-center justify-start gap-x-2 md:gap-x-3 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 transform hover:scale-105 border border-white/20 hover:border-white/30"
        >
          <User className="w-4 h-4 md:w-5 md:h-5" />
          Profile
        </button>

        <button
          onClick={() => handleNavigation("/settings")}
          className="w-full flex items-center justify-start gap-x-2 md:gap-x-3 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 transform hover:scale-105 border border-white/20 hover:border-white/30"
        >
          <Settings className="w-4 h-4 md:w-5 md:h-5" />
          Settings
        </button> */}

        <button
          onClick={handleLogoutButton}
          className="w-full flex items-center justify-start gap-x-2 md:gap-x-3 bg-red-800/80 hover:bg-red-800/70 text-red-300 hover:text-red-200 py-2 px-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 transform hover:scale-105 border border-red-400/20 hover:border-red-400/30"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default QuickCreateColumn;
