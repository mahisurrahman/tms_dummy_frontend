import { Clock, Hourglass, Loader, CheckCircle, ClipboardList, Circle } from "lucide-react";

export const getPriorityColor = (priority) => {
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

export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "from-green-500 to-emerald-600";
    case "ongoing":
      return "from-blue-500 to-cyan-500";
    case "pending":
      return "from-yellow-500 to-amber-500";
    case "inqueue":
      return "from-purple-500 to-violet-500";
    case "finished":
      return "from-green-600 to-lime-600";
    case "review":
      return "from-indigo-500 to-purple-500";
    default:
      return "from-gray-400 to-gray-500";
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 text-black" />;
    case "in-queue":
      return <Hourglass className="w-4 h-4 text-black" />;
    case "ongoing":
      return <Loader className="w-4 h-4 text-black animate-spin" />;
    case "finished":
      return <CheckCircle className="w-4 h-4 text-black" />;
    case "review":
      return <ClipboardList className="w-4 h-4 text-black" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 text-black" />;
    default:
      return <Circle className="w-4 h-4 text-black" />;
  }
};

export const getColorForIndex = (index) => {
  const colors = [
    "border-yellow-400 bg-yellow-500",
    "border-red-400 bg-red-500",
    "border-purple-400 bg-purple-500",
    "border-green-400 bg-green-500",
    "border-blue-400 bg-blue-500",
  ];
  return colors[index % colors.length] || "border-gray-400 bg-gray-500";
};