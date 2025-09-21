export const getPriorityColor = (priority) => {
  switch (priority) {
    case "High": return "from-red-500 to-pink-500";
    case "Medium": return "from-yellow-500 to-orange-500";
    case "Low": return "from-green-500 to-emerald-500";
    default: return "from-gray-500 to-slate-500";
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "completed": return "from-green-500 to-emerald-600";
    case "ongoing": return "from-blue-500 to-cyan-500";
    case "pending": return "from-yellow-500 to-amber-500";
    case "scheduled": return "from-purple-500 to-violet-500";
    case "due": return "from-red-500 to-rose-500";
    case "cancelled": return "from-gray-500 to-slate-500";
    case "finished": return "from-green-600 to-lime-600";
    default: return "from-gray-400 to-gray-500";
  }
};

export const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "un-assigned": return <Circle className="w-4 h-4 text-gray-400" />;
    case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
    case "in queue": return <Hourglass className="w-4 h-4 text-blue-500" />;
    case "ongoing": return <Loader className="w-4 h-4 text-green-500 animate-spin" />;
    case "finished": return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "review": return <ClipboardList className="w-4 h-4 text-purple-500" />;
    case "completed": return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    case "resume": return <PlayCircle className="w-4 h-4 text-indigo-500" />;
    case "cancelled": return <XCircle className="w-4 h-4 text-red-500" />;
    case "scheduled": return <Calendar className="w-4 h-4 text-blue-400" />;
    case "due": return <AlertCircle className="w-4 h-4 text-orange-500" />;
    default: return <Circle className="w-4 h-4 text-gray-400" />;
  }
};