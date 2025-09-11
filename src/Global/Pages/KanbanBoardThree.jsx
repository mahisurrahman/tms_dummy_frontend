import React, { useState } from "react";
import {
  Filter,
  Plus,
  Clock,
  Play,
  Pause,
  Square,
  Calendar,
  X,
  User,
  Flag,
  Upload,
  Star,
  Trophy,
  Timer,
  MessageSquare,
  CheckCircle,
  Circle,
  AlertCircle,
  XCircle,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function KanbanBoardThree() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showRightColumn, setShowRightColumn] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  // Dummy data
  const users = [
    {
      id: 1,
      name: "John Doe",
      role: "DEVELOPER",
      status: "Present",
      storyPoints: 47,
      totalTime: "127:45",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "DEVELOPER",
      status: "Present",
      storyPoints: 52,
      totalTime: "134:20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "HR",
      status: "Absent",
      storyPoints: 23,
      totalTime: "67:30",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "ADMIN",
      status: "Present",
      storyPoints: 38,
      totalTime: "98:15",
    },
    {
      id: 5,
      name: "Alex Kumar",
      role: "DEVELOPER",
      status: "Present",
      storyPoints: 41,
      totalTime: "112:40",
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "DEVELOPER",
      status: "Present",
      storyPoints: 35,
      totalTime: "89:25",
    },
    {
      id: 7,
      name: "David Brown",
      role: "HR",
      status: "Present",
      storyPoints: 29,
      totalTime: "76:10",
    },
    {
      id: 8,
      name: "Emma Wilson",
      role: "ADMIN",
      status: "Absent",
      storyPoints: 31,
      totalTime: "82:55",
    },
  ];

  const backlogTasks = [
    {
      id: "b1",
      title: "User Authentication System",
      description:
        "Implement OAuth 2.0 authentication with Google and Facebook integration",
      priority: "High",
      createdBy: "John Doe",
      createdAt: "2025-01-15",
      deadline: "2025-01-25",
      project: "DNCRP",
    },
    {
      id: "b2",
      title: "Database Migration",
      description: "Migrate legacy database to PostgreSQL with proper indexing",
      priority: "Medium",
      createdBy: "Sarah Chen",
      createdAt: "2025-01-16",
      deadline: "2025-01-28",
      project: "DOLE",
    },
    {
      id: "b3",
      title: "API Documentation",
      description: "Create comprehensive API documentation using Swagger",
      priority: "Low",
      createdBy: "Mike Johnson",
      createdAt: "2025-01-17",
      deadline: "2025-01-30",
      project: "MOL",
    },
    {
      id: "b4",
      title: "Mobile App Optimization",
      description: "Optimize mobile app performance and reduce bundle size",
      priority: "High",
      createdBy: "Emily Davis",
      createdAt: "2025-01-18",
      deadline: "2025-01-24",
      project: "PRET-A-MED",
    },
  ];

  const userTasks = {
    1: [
      {
        id: "t1",
        title: "Login Page Design",
        status: "ongoing",
        priority: "High",
        assignedDate: "2025-01-20",
        assignedBy: "Emily Davis",
        timeSpent: "02:30",
      },
      {
        id: "t2",
        title: "Password Reset Feature",
        status: "completed",
        priority: "Medium",
        assignedDate: "2025-01-19",
        assignedBy: "Sarah Chen",
        timeSpent: "04:15",
      },
    ],
    2: [
      {
        id: "t3",
        title: "Database Schema",
        status: "pending",
        priority: "High",
        assignedDate: "2025-01-21",
        assignedBy: "John Doe",
        timeSpent: "00:00",
      },
      {
        id: "t4",
        title: "Data Validation",
        status: "ongoing",
        priority: "Medium",
        assignedDate: "2025-01-20",
        assignedBy: "Mike Johnson",
        timeSpent: "01:45",
      },
    ],
    3: [
      {
        id: "t5",
        title: "Employee Onboarding",
        status: "scheduled",
        priority: "Low",
        assignedDate: "2025-01-22",
        assignedBy: "Lisa Wang",
        timeSpent: "00:00",
      },
    ],
    4: [
      {
        id: "t6",
        title: "System Backup",
        status: "completed",
        priority: "High",
        assignedDate: "2025-01-18",
        assignedBy: "Alex Kumar",
        timeSpent: "03:20",
      },
      {
        id: "t7",
        title: "Security Audit",
        status: "ongoing",
        priority: "High",
        assignedDate: "2025-01-21",
        assignedBy: "David Brown",
        timeSpent: "05:10",
      },
    ],
    5: [
      {
        id: "t8",
        title: "Code Review",
        status: "pending",
        priority: "Medium",
        assignedDate: "2025-01-21",
        assignedBy: "Emma Wilson",
        timeSpent: "00:00",
      },
    ],
    6: [
      {
        id: "t9",
        title: "UI Testing",
        status: "ongoing",
        priority: "Low",
        assignedDate: "2025-01-20",
        assignedBy: "John Doe",
        timeSpent: "02:00",
      },
    ],
    7: [
      {
        id: "t10",
        title: "Payroll System",
        status: "due",
        priority: "High",
        assignedDate: "2025-01-15",
        assignedBy: "Sarah Chen",
        timeSpent: "01:30",
      },
    ],
    8: [
      {
        id: "t11",
        title: "Server Maintenance",
        status: "cancelled",
        priority: "Medium",
        assignedDate: "2025-01-19",
        assignedBy: "Mike Johnson",
        timeSpent: "00:45",
      },
    ],
  };

  const filterOptions = [
    "All",
    "Project: DNCRP",
    "Project: DOLE",
    "Project: MOL",
    "Project: PRET-A-MED",
    "Priority: High",
    "Priority: Medium",
    "Priority: Low",
    "Team: DEVELOPER",
    "Team: HR",
    "Team: ADMIN",
    "Status: Present",
    "Status: Absent",
  ];

  const projectOptions = ["All", "DNCRP", "DOLE", "MOL", "PRET-A-MED"];
  const attendanceOptions = ["All", "Present", "Absent"];
  const roleOptions = ["All", "DEVELOPER", "HR", "ADMIN"];
  const priorityOptions = ["All", "High", "Medium", "Low"];
  const statusOptions = [
    "All",
    "completed",
    "ongoing",
    "pending",
    "scheduled",
    "due",
    "cancelled",
  ];

  // Check screen size on component mount and resize
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "from-red-500 to-pink-500";
      case "Medium":
        return "from-yellow-500 to-orange-500";
      case "Low":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-emerald-600";
      case "ongoing":
        return "from-blue-500 to-cyan-500";
      case "pending":
        return "from-yellow-500 to-amber-500";
      case "scheduled":
        return "from-purple-500 to-violet-500";
      case "due":
        return "from-red-500 to-rose-500";
      case "cancelled":
        return "from-gray-500 to-slate-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "ongoing":
        return <Circle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "scheduled":
        return <Calendar className="w-4 h-4" />;
      case "due":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const TaskCard = ({ task, isBacklog = false }) => (
    <div
      className={`bg-white rounded-xl p-4 mb-3 transition-all duration-300 transform cursor-pointer  ${
        task.priority === "High"
          ? "border-red-500 shadow-red-100"
          : task.priority === "Medium"
          ? "border-yellow-500 shadow-yellow-100"
          : "border-green-500 shadow-green-100"
      }`}
      onClick={() => setSelectedTask(task)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-800 truncate flex-1">
          {task.title}
        </h4>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
            task.priority
          )} text-white ${task.priority === "High" ? "animate-pulse" : ""}`}
        >
          <Flag className="w-3 h-3 mr-1" />
          {task.priority}
        </span>
      </div>

      {isBacklog ? (
        <div className="space-y-2 text-sm text-gray-600">
          <p className="text-xs leading-relaxed">{task.description}</p>
          <div className="flex flex-col items-start justify-between">
            <span className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {task.createdBy}
            </span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {task.deadline}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(
                task.status
              )} text-white`}
            >
              {getStatusIcon(task.status)}
              <span className="ml-1 capitalize">{task.status}</span>
            </span>
            <span className="text-gray-500">{task.timeSpent}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>By: {task.assignedBy}</span>
            <span>{task.assignedDate}</span>
          </div>

          <div className="flex gap-1 mt-3">
            <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center">
              <Play className="w-3 h-3 mr-1" />
              Start
            </button>
            <button className="flex-1 bg-gradient-to-r from-red-700 to-pink-700 text-white text-lg py-2 px-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center">
              <Square className="w-3 h-3 mr-1" />
              End
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const TaskModal = ({ task, onClose }) => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Description
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  defaultValue={task.description || "No description provided"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Pending</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {users.map((user) => (
                    <option key={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={task.deadline}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload files</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Comments & Updates
            </h3>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm mt-1">
                  Started working on the authentication module.
                </p>
              </div>
            </div>
            <div className="mt-3">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
                placeholder="Add a comment..."
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateTaskForm = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Create New Task</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-500 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter task title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="4"
              placeholder="Describe the task..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>DNCRP</option>
                <option>DOLE</option>
                <option>MOL</option>
                <option>PRET-A-MED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign To
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                {users.map((user) => (
                  <option key={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Click to upload files or drag and drop
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-800 ">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Trophy className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              Traban
            </h1>

            {/* Additional Filters Row */}
            <div className="flex flex-wrap justify-between gap-3">
              {/* Attendance Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm md:text-lg">
                    Attendance:
                  </span>
                  <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                    {attendanceOptions.map((option) => (
                      <option key={option} className="text-gray-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm md:text-lg">
                    Role:
                  </span>
                  <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                    {roleOptions.map((option) => (
                      <option key={option} className="text-gray-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm md:text-lg">
                    Priority:
                  </span>
                  <select className="bg-white/20 backdrop-blur-md text-white rounded px-2 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 text-xs md:text-sm">
                    {priorityOptions.map((option) => (
                      <option key={option} className="text-gray-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm md:text-lg">
                    Status:
                  </span>
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

              {/* Clear Filters Button */}
              <button className="px-2 py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-md text-white rounded hover:bg-white/30 transition-all text-xs md:text-lg">
                Clear Filters
              </button>
            </div>

            <div>
              <button className="animate-pulse text-white text-xs md:text-sm w-full bg-gradient-to-r from-green-600 to-lime-800 px-3 py-1 md:px-4 md:py-2 rounded shadow-md flex items-center gap-x-1 md:gap-x-2 hover:scale-110 hover:cursor-pointer transition-all duration-200">
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-78px)]">
        {/* Backlog Section - 20% */}
        <div className="w-1/4 md:w-1/5 lg:w-1/6 bg-white/10 backdrop-blur-md border-r border-white/20 p-2 md:p-4 overflow-y-auto">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-2">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            Backlog
          </h2>
          <div className="space-y-2 md:space-y-3">
            {backlogTasks.map((task) => (
              <TaskCard key={task.id} task={task} isBacklog={true} />
            ))}
          </div>
        </div>

        {/* User Columns - Adjustable width based on right column visibility */}
        <div
          className={`p-2 md:p-4 overflow-x-auto ${
            showRightColumn ? "w-3/4 md:w-4/5 lg:w-[70%]" : "w-full"
          }`}
        >
          <div className="flex space-x-2 md:space-x-4 min-w-max">
            {users.map((user) => (
              <div
                key={user.id}
                className="w-[45vw] md:w-[25vw] lg:w-[15vw] bg-white/10 backdrop-blur-md rounded-2xl p-2 md:p-4 border border-white/20"
              >
                {/* User Header */}
                <div className="mb-2 md:mb-4">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                          user.status === "Present"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } text-white font-bold text-xs md:text-sm`}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm md:text-base">
                          {user.name}
                        </h3>
                        <p className="text-xs md:text-sm text-white/70">
                          {user.role}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex text-sm md:text-lg text-white flex-col items-center justify-between">
                        <div className="flex items-center gap-x-1">
                          <Star
                            fill
                            className="w-4 h-4 md:w-5 md:h-5 text-yellow-400"
                          />
                          <span className="font-bold text-orange-400 text-xs md:text-sm">
                            {user.storyPoints}
                          </span>
                          <span className="text-red-400 font-semibold text-xs md:text-sm">
                            PTS
                          </span>
                        </div>
                        <div className="flex items-center font-semibold space-x-1">
                          <Timer className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-medium text-xs md:text-sm">
                            {user.totalTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Tasks */}
                <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
                  {(userTasks[user.id] || []).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                  {(!userTasks[user.id] || userTasks[user.id].length === 0) && (
                    <div className="text-center py-4 md:py-8 text-white/50">
                      <Circle className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-1 md:mb-2" />
                      <p className="text-xs md:text-sm">No tasks assigned</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Task Section - Toggleable */}
        {showRightColumn && (
          <div className="w-1/4 md:w-1/5 lg:w-[30%] bg-white/10 backdrop-blur-md border-l border-white/20 p-2 md:p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-2">
                  <Plus className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                Quick Create
              </h2>
              <button
                onClick={() => setShowRightColumn(false)}
                className="lg:hidden p-1 bg-white/20 rounded-md text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowCreateTask(true)}
              className="w-full flex items-center justify-center gap-x-1 md:gap-x-2 bg-gradient-to-r from-green-500 to-teal-500 text-white p-2 md:p-4 rounded font-semibold text-sm md:text-base hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              New Task
            </button>

            {/* Quick Stats */}
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
                  <span className="text-white/80 text-xs md:text-sm">
                    Completed
                  </span>
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
                  <span className="text-white/80 text-xs md:text-sm">
                    Overdue
                  </span>
                  <span className="text-red-400 font-bold text-base md:text-lg animate-pulse">
                    4
                  </span>
                </div>
              </div>
            </div>

            {/* Team Performance */}
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
        )}

        {/* Toggle button for right column */}
        {!showRightColumn && (
          <button
            onClick={() => setShowRightColumn(true)}
            className="hidden lg:flex fixed right-0 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 rounded-l-lg z-10 hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile toggle button for right column */}
      <div className="fixed bottom-20 right-4 lg:hidden">
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

      {/* Modals */}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      {showCreateTask && (
        <CreateTaskForm onClose={() => setShowCreateTask(false)} />
      )}

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => setShowCreateTask(true)}
          className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default KanbanBoardThree;
