import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Circle,
  ClipboardList,
  Clock,
  Hourglass,
  Loader,
  PlayCircle,
  XCircle,
} from "lucide-react";

export const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "un-assigned":
      return <Circle className="w-4 h-4 text-gray-400" />;

    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;

    case "in queue":
      return <Hourglass className="w-4 h-4 text-blue-500" />;

    case "on going":
      return <Loader className="w-4 h-4 text-green-500 animate-spin" />;

    case "finished":
      return <CheckCircle className="w-4 h-4 text-green-600" />;

    case "review":
      return <ClipboardList className="w-4 h-4 text-purple-500" />;

    case "completed":
      return <CheckCircle className="w-4 h-4 text-emerald-600" />;

    case "resume":
      return <PlayCircle className="w-4 h-4 text-indigo-500" />;

    case "cancelled":
      return <XCircle className="w-4 h-4 text-red-500" />;

    case "scheduled":
      return <Calendar className="w-4 h-4 text-blue-400" />;

    case "due":
      return <AlertCircle className="w-4 h-4 text-orange-500" />;

    default:
      return <Circle className="w-4 h-4 text-gray-400" />;
  }
};
