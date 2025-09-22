import React from "react";
import { Filter, Plus } from "lucide-react";
import logo from "../../../assets/images/Final-V.png";

const Header = ({
  filterOptions,
  attendanceOptions,
  roleOptions,
  priorityOptions,
  statusOptions,
  setShowCreateTask,
  setSelectedUserForCreate
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="px-4 md:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <img src={logo} className="w-20 h-40 object-contain" alt="" />
            </div>
            Traban
          </h1>

          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-white/80 text-sm md:text-lg">Attendance:</span>
                <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                  {attendanceOptions.map((option) => (
                    <option key={option} className="text-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-white/80 text-sm md:text-lg">Role:</span>
                <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                  {roleOptions.map((option) => (
                    <option key={option} className="text-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-white/80 text-sm md:text-lg">Priority:</span>
                <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                  {priorityOptions.map((option) => (
                    <option key={option} className="text-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-white/80 text-sm md:text-lg">Status:</span>
                <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                  {statusOptions.map((option) => (
                    <option key={option} className="text-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 md:w-5 md:h-5 text-white" />
                <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                  {filterOptions.map((option) => (
                    <option key={option} className="text-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="px-2 py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-md text-white rounded hover:bg-white/30 transition-all text-xs md:text-lg">
              Clear Filters
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                setSelectedUserForCreate(null);
                setShowCreateTask(true);
              }}
              className="animate-pulse text-white text-xs md:text-sm w-full bg-gradient-to-r from-green-600 to-lime-800 px-3 py-1 md:px-4 md:py-2 rounded shadow-md flex items-center gap-x-1 md:gap-x-2 hover:scale-110 hover:cursor-pointer transition-all duration-200"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;