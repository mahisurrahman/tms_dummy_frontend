const TaskCard = ({ index, task, isBacklog = false, onClick }) => (
  <div
    className={`bg-white rounded-xl p-4 mb-3 transition-all duration-300 transform cursor-pointer  ${
      task.priority === "High"
        ? "border-red-500 shadow-red-100"
        : task.priority === "Medium"
        ? "border-yellow-500 shadow-yellow-100"
        : "border-green-500 shadow-green-100"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      {isBacklog ? (
        <h4 className="font-bold text-gray-800 truncate flex-1">
          {task.title}
        </h4>
      ) : (
        <h4 className="font-bold text-gray-800 truncate flex-1">
          {index}. {task.title}
        </h4>
      )}
      {!isBacklog && (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full animate-pulse text-xs font-medium bg-gradient-to-r ${getStatusColor(
            task.status
          )} text-white`}
        >
          {getStatusIcon(task.status)}
          <span className="ml-1 capitalize">{task.status}</span>
        </span>
      )}
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
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
              task.priority
            )} text-white ${task.priority === "High" ? "" : ""}`}
          >
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
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

export default TaskCard;