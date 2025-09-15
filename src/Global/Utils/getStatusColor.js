export const getStatusColor = (status) => {
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
