export const users = [
  {
    id: 1,
    name: "John Doe",
    role: "DEVELOPER",
    status: "Present",
    storyPoints: 47,
    totalTime: "127:45",
  },
  // ... other users
];

export const backlogTasks = [
  {
    id: "b1",
    title: "User Authentication System",
    description: "Implement OAuth 2.0 authentication with Google and Facebook integration",
    priority: "High",
    createdBy: "John Doe",
    createdAt: "2025-01-15",
    deadline: "2025-01-25",
    project: "DNCRP",
  },
  // ... other backlog tasks
];


export const initialUserTasks = {
  1: [
    {
      id: "t1",
      title: "Login Page Design",
      status: "ongoing",
      priority: "High",
      assignedDate: "2025-01-20",
      assignedBy: "Emily Davis",
      timeSpent: "02:30:00",
      description: "Design the login page UI",
      deadline: "2025-01-25",
      project: "DNCRP",
    },
    // ... other tasks for user 1
  ],
  // ... other users' tasks
};