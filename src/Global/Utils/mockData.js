export const users = [
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
];

export const backlogTasks = [
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
];

export const filterOptions = [
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

export const projectOptions = ["All", "DNCRP", "DOLE", "MOL", "PRET-A-MED"];
export const attendanceOptions = ["All", "Present", "Absent"];
export const roleOptions = ["All", "DEVELOPER", "HR", "ADMIN"];
export const priorityOptions = ["All", "High", "Medium", "Low"];
export const statusOptions = [
  "All",
  "completed",
  "ongoing",
  "pending",
  "in-queue",
  "finished",
  "review",
];

export const sections = [
  "ongoing",
  "in-queue",
  "pending",
  // "finished",
  "review",
  "completed",
];

export const sectionTitles = {
  ongoing: "Ongoing",
  "in-queue": "In Queue",
  pending: "Pending",
  finished: "Finished",
  review: "Under Review",
  completed: "Completed",
};

// Initial tasks data would go here, but it's quite long so I've omitted it for brevity
// You would need to copy the original userTasks object from the original component
