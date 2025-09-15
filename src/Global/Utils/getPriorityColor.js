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
