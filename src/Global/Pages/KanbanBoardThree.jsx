import React, { useState, useEffect } from "react";
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
  PauseCircle,
  PlayCircle,
  ClipboardList,
  Hourglass,
  Loader,
  ChevronDown,
  Bell,
} from "lucide-react";
import logo from "../../assets/images/Final-V.png";

function KanbanBoardThree() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedUserForCreate, setSelectedUserForCreate] = useState(null);
  const [showRightColumn, setShowRightColumn] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [timers, setTimers] = useState({}); // taskId: { accumulated: seconds, isRunning: boolean, intervalId?: number }
  const [userTasks, setUserTasks] = useState({
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
        history: [
          { status: "created", date: "2025-01-20" },
          { status: "pending", date: "2025-01-20" },
          { status: "ongoing", date: "2025-01-21" },
        ],
        comments: [
          {
            id: "c1",
            author: "John Doe",
            text: "Started working on this.",
            date: "2025-01-21",
            replies: [
              {
                id: "r1",
                author: "Emily Davis",
                text: "Looks good!",
                date: "2025-01-22",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: "t2",
        title: "Password Reset Feature",
        status: "completed",
        priority: "Medium",
        assignedDate: "2025-01-19",
        assignedBy: "Sarah Chen",
        timeSpent: "04:15:00",
        description: "Implement password reset",
        deadline: "2025-01-24",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-01-19" },
          { status: "pending", date: "2025-01-19" },
          { status: "ongoing", date: "2025-01-20" },
          { status: "review", date: "2025-01-23" },
          { status: "completed", date: "2025-01-24" },
        ],
        comments: [],
      },
      {
        id: "p1-1",
        title: "Pending Task 1",
        status: "pending",
        priority: "Low",
        assignedDate: "2025-09-10",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Pending description",
        deadline: "2025-09-20",
        project: "MOL",
        history: [{ status: "created", date: "2025-09-10" }],
        comments: [],
      },
      {
        id: "p1-2",
        title: "Pending Task 2",
        status: "pending",
        priority: "High",
        assignedDate: "2025-09-11",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Another pending",
        deadline: "2025-09-21",
        project: "PRET-A-MED",
        history: [{ status: "created", date: "2025-09-11" }],
        comments: [],
      },
      {
        id: "r1-1",
        title: "Review Task 1",
        status: "review",
        priority: "Medium",
        assignedDate: "2025-09-12",
        assignedBy: "Admin",
        timeSpent: "01:00:00",
        description: "Review this",
        deadline: "2025-09-22",
        project: "DNCRP",
        history: [
          { status: "created", date: "2025-09-12" },
          { status: "ongoing", date: "2025-09-13" },
          { status: "review", date: "2025-09-14" },
        ],
        comments: [
          {
            id: "c2",
            author: "Admin",
            text: "Needs review.",
            date: "2025-09-14",
            replies: [],
          },
        ],
      },
      {
        id: "c1-1",
        title: "Cancelled Task 1",
        status: "in-queue",
        priority: "Low",
        assignedDate: "2025-09-13",
        assignedBy: "Admin",
        timeSpent: "00:30:00",
        description: "Cancelled",
        deadline: "2025-09-23",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-09-13" },
          { status: "in-queue", date: "2025-09-13" },
        ],
        comments: [],
      },
      {
        id: "s1-1",
        title: "Scheduled Task 1",
        status: "in-queue",
        priority: "High",
        assignedDate: "2025-09-14",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Scheduled",
        deadline: "2025-09-24",
        project: "MOL",
        history: [
          { status: "created", date: "2025-09-14" },
          { status: "in-queue", date: "2025-09-14" },
        ],
        comments: [],
      },
      {
        id: "f1-1",
        title: "Finished Task 1",
        status: "finished",
        priority: "Medium",
        assignedDate: "2025-09-15",
        assignedBy: "Admin",
        timeSpent: "03:00:00",
        description: "Finished",
        deadline: "2025-09-25",
        project: "PRET-A-MED",
        history: [
          { status: "created", date: "2025-09-15" },
          { status: "ongoing", date: "2025-09-16" },
          { status: "finished", date: "2025-09-17" },
        ],
        comments: [],
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
        timeSpent: "00:00:00",
        description: "Design schema",
        deadline: "2025-01-26",
        project: "DNCRP",
        history: [{ status: "created", date: "2025-01-21" }],
        comments: [],
      },
      {
        id: "t4",
        title: "Data Validation",
        status: "ongoing",
        priority: "Medium",
        assignedDate: "2025-01-20",
        assignedBy: "Mike Johnson",
        timeSpent: "01:45:00",
        description: "Validate data",
        deadline: "2025-01-25",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-01-20" },
          { status: "ongoing", date: "2025-01-21" },
        ],
        comments: [],
      },
      {
        id: "p2-1",
        title: "Pending Task 1",
        status: "pending",
        priority: "Low",
        assignedDate: "2025-09-10",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Pending",
        deadline: "2025-09-20",
        project: "MOL",
        history: [{ status: "created", date: "2025-09-10" }],
        comments: [],
      },
      {
        id: "r2-1",
        title: "Review Task 1",
        status: "review",
        priority: "High",
        assignedDate: "2025-09-11",
        assignedBy: "Admin",
        timeSpent: "00:45:00",
        description: "Review",
        deadline: "2025-09-21",
        project: "PRET-A-MED",
        history: [
          { status: "created", date: "2025-09-11" },
          { status: "review", date: "2025-09-12" },
        ],
        comments: [],
      },
      {
        id: "comp2-1",
        title: "Completed Task 1",
        status: "completed",
        priority: "Medium",
        assignedDate: "2025-09-12",
        assignedBy: "Admin",
        timeSpent: "02:00:00",
        description: "Completed",
        deadline: "2025-09-22",
        project: "DNCRP",
        history: [
          { status: "created", date: "2025-09-12" },
          { status: "completed", date: "2025-09-13" },
        ],
        comments: [],
      },
      {
        id: "c2-1",
        title: "Cancelled Task 1",
        status: "in-queue",
        priority: "Low",
        assignedDate: "2025-09-13",
        assignedBy: "Admin",
        timeSpent: "00:15:00",
        description: "Cancelled",
        deadline: "2025-09-23",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-09-13" },
          { status: "in-queue", date: "2025-09-13" },
        ],
        comments: [],
      },
      {
        id: "s2-1",
        title: "Scheduled Task 1",
        status: "in-queue",
        priority: "High",
        assignedDate: "2025-09-14",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Scheduled",
        deadline: "2025-09-24",
        project: "MOL",
        history: [
          { status: "created", date: "2025-09-14" },
          { status: "in-queue", date: "2025-09-14" },
        ],
        comments: [],
      },
      {
        id: "f2-1",
        title: "Finished Task 1",
        status: "finished",
        priority: "Medium",
        assignedDate: "2025-09-15",
        assignedBy: "Admin",
        timeSpent: "04:00:00",
        description: "Finished",
        deadline: "2025-09-25",
        project: "PRET-A-MED",
        history: [
          { status: "created", date: "2025-09-15" },
          { status: "finished", date: "2025-09-16" },
        ],
        comments: [],
      },
    ],
    3: [
      {
        id: "t5",
        title: "Employee Onboarding",
        status: "in-queue",
        priority: "Low",
        assignedDate: "2025-01-22",
        assignedBy: "Lisa Wang",
        timeSpent: "00:00:00",
        description: "Onboard employees",
        deadline: "2025-01-27",
        project: "HR Project",
        history: [{ status: "created", date: "2025-01-22" }],
        comments: [],
      },
      {
        id: "p3-1",
        title: "Pending Task 1",
        status: "pending",
        priority: "Medium",
        assignedDate: "2025-09-10",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Pending",
        deadline: "2025-09-20",
        project: "DNCRP",
        history: [{ status: "created", date: "2025-09-10" }],
        comments: [],
      },
      {
        id: "r3-1",
        title: "Review Task 1",
        status: "review",
        priority: "High",
        assignedDate: "2025-09-11",
        assignedBy: "Admin",
        timeSpent: "01:15:00",
        description: "Review",
        deadline: "2025-09-21",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-09-11" },
          { status: "review", date: "2025-09-12" },
        ],
        comments: [],
      },
      {
        id: "comp3-1",
        title: "Completed Task 1",
        status: "completed",
        priority: "Low",
        assignedDate: "2025-09-12",
        assignedBy: "Admin",
        timeSpent: "00:50:00",
        description: "Completed",
        deadline: "2025-09-22",
        project: "MOL",
        history: [
          { status: "created", date: "2025-09-12" },
          { status: "completed", date: "2025-09-13" },
        ],
        comments: [],
      },
      {
        id: "f3-1",
        title: "Finished Task 1",
        status: "finished",
        priority: "High",
        assignedDate: "2025-09-15",
        assignedBy: "Admin",
        timeSpent: "05:00:00",
        description: "Finished",
        deadline: "2025-09-25",
        project: "DNCRP",
        history: [
          { status: "created", date: "2025-09-15" },
          { status: "finished", date: "2025-09-16" },
        ],
        comments: [],
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
        timeSpent: "03:20:00",
        description: "Backup system",
        deadline: "2025-01-23",
        project: "Admin Project",
        history: [
          { status: "created", date: "2025-01-18" },
          { status: "completed", date: "2025-01-19" },
        ],
        comments: [],
      },
      {
        id: "t7",
        title: "Security Audit",
        status: "ongoing",
        priority: "High",
        assignedDate: "2025-01-21",
        assignedBy: "David Brown",
        timeSpent: "05:10:00",
        description: "Audit security",
        deadline: "2025-01-26",
        project: "Security",
        history: [
          { status: "created", date: "2025-01-21" },
          { status: "ongoing", date: "2025-01-22" },
        ],
        comments: [],
      },
      {
        id: "p4-1",
        title: "Pending Task 1",
        status: "pending",
        priority: "Low",
        assignedDate: "2025-09-10",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Pending",
        deadline: "2025-09-20",
        project: "DOLE",
        history: [{ status: "created", date: "2025-09-10" }],
        comments: [],
      },
      {
        id: "r4-1",
        title: "Review Task 1",
        status: "review",
        priority: "Medium",
        assignedDate: "2025-09-11",
        assignedBy: "Admin",
        timeSpent: "00:30:00",
        description: "Review",
        deadline: "2025-09-21",
        project: "MOL",
        history: [
          { status: "created", date: "2025-09-11" },
          { status: "review", date: "2025-09-12" },
        ],
        comments: [],
      },
      {
        id: "s4-1",
        title: "Scheduled Task 1",
        status: "in-queue",
        priority: "Low",
        assignedDate: "2025-09-14",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Scheduled",
        deadline: "2025-09-24",
        project: "DNCRP",
        history: [
          { status: "created", date: "2025-09-14" },
          { status: "in-queue", date: "2025-09-14" },
        ],
        comments: [],
      },
      {
        id: "f4-1",
        title: "Finished Task 1",
        status: "finished",
        priority: "Medium",
        assignedDate: "2025-09-15",
        assignedBy: "Admin",
        timeSpent: "02:30:00",
        description: "Finished",
        deadline: "2025-09-25",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-09-15" },
          { status: "finished", date: "2025-09-16" },
        ],
        comments: [],
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
        timeSpent: "00:00:00",
        description: "Review code",
        deadline: "2025-01-26",
        project: "Development",
        history: [{ status: "created", date: "2025-01-21" }],
        comments: [],
      },
      {
        id: "p5-1",
        title: "Pending Task 1",
        status: "pending",
        priority: "High",
        assignedDate: "2025-09-10",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Pending",
        deadline: "2025-09-20",
        project: "MOL",
        history: [{ status: "created", date: "2025-09-10" }],
        comments: [],
      },
      {
        id: "o5-1",
        title: "Ongoing Task 1",
        status: "ongoing",
        priority: "Low",
        assignedDate: "2025-09-11",
        assignedBy: "Admin",
        timeSpent: "00:45:00",
        description: "Ongoing",
        deadline: "2025-09-21",
        project: "PRET-A-MED",
        history: [
          { status: "created", date: "2025-09-11" },
          { status: "ongoing", date: "2025-09-12" },
        ],
        comments: [],
      },
      {
        id: "r5-1",
        title: "Review Task 1",
        status: "review",
        priority: "Medium",
        assignedDate: "2025-09-12",
        assignedBy: "Admin",
        timeSpent: "01:00:00",
        description: "Review",
        deadline: "2025-09-22",
        project: "DNCRP",
        history: [
          { status: "created", date: "2025-09-12" },
          { status: "review", date: "2025-09-13" },
        ],
        comments: [],
      },
      {
        id: "comp5-1",
        title: "Completed Task 1",
        status: "completed",
        priority: "High",
        assignedDate: "2025-09-13",
        assignedBy: "Admin",
        timeSpent: "03:00:00",
        description: "Completed",
        deadline: "2025-09-23",
        project: "DOLE",
        history: [
          { status: "created", date: "2025-09-13" },
          { status: "completed", date: "2025-09-14" },
        ],
        comments: [],
      },
      {
        id: "s5-1",
        title: "Scheduled Task 1",
        status: "in-queue",
        priority: "Medium",
        assignedDate: "2025-09-15",
        assignedBy: "Admin",
        timeSpent: "00:00:00",
        description: "Scheduled",
        deadline: "2025-09-25",
        project: "PRET-A-MED",
        history: [
          { status: "created", date: "2025-09-15" },
          { status: "in-queue", date: "2025-09-15" },
        ],
        comments: [],
      },
      {
        id: "f5-1",
        title: "Finished Task 1",
        status: "finished",
        priority: "High",
        assignedDate: "2025-09-16",
        assignedBy: "Admin",
        timeSpent: "06:00:00",
        description: "Finished",
        deadline: "2025-09-26",
        project: "DNCRP",
        history: [
          { status: "created", date: "2025-09-16" },
          { status: "finished", date: "2025-09-17" },
        ],
        comments: [],
      },
    ],
  });

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
  ];

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
    "in-queue",
    "finished",
    "review",
  ];

  const sections = [
    "ongoing",
    "in-queue",
    "pending",
    "finished",
    "review",
    "completed",
  ];

  const sectionTitles = {
    ongoing: "Ongoing",
    "in-queue": "In Queue",
    pending: "Pending",
    finished: "Finished",
    review: "Under Review",
    completed: "Completed",
  };

  // Initialize expanded sections with ongoing open by default
  useEffect(() => {
    const initialExpanded = {};
    users.forEach((user) => {
      sections.forEach((status) => {
        const key = `${user.id}-${status}`;
        initialExpanded[key] = status === "ongoing";
      });
    });
    setExpandedSections(initialExpanded);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timers).forEach((timer) => {
        if (timer.intervalId) clearInterval(timer.intervalId);
      });
    };
  }, [timers]);

  // Check screen size on component mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const parseTimeToSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + (s || 0);
  };

  const formatSecondsToTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const pauseAllOtherTasks = (userId, currentTaskId) => {
    setTimers((prev) => {
      const newTimers = { ...prev };
      (userTasks[userId] || []).forEach((t) => {
        if (
          t.id !== currentTaskId &&
          t.status === "ongoing" &&
          newTimers[t.id]?.isRunning
        ) {
          const ex = newTimers[t.id];
          if (ex.intervalId) clearInterval(ex.intervalId);
          newTimers[t.id] = { ...ex, isRunning: false, intervalId: undefined };
        }
      });
      return newTimers;
    });
  };

  const moveTask = (userId, taskId, newStatus) => {
    setUserTasks((prev) => {
      const userT = prev[userId] || [];
      const taskIndex = userT.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;
      const newTasks = [...userT];
      newTasks[taskIndex] = { ...newTasks[taskIndex], status: newStatus };
      return { ...prev, [userId]: newTasks };
    });
  };

  const handleStart = (task, userId) => {
    const taskId = task.id;
    if (task.status === "pending") {
      moveTask(userId, taskId, "ongoing");
    }
    pauseAllOtherTasks(userId, taskId);
    setTimers((prev) => {
      const existing = prev[taskId];
      if (existing && existing.isRunning) return prev;
      const baseSeconds = existing
        ? existing.accumulated
        : parseTimeToSeconds(task.timeSpent);
      const intervalId = setInterval(() => {
        setTimers((p) => ({
          ...p,
          [taskId]: { ...p[taskId], accumulated: p[taskId].accumulated + 1 },
        }));
      }, 1000);
      return {
        ...prev,
        [taskId]: { accumulated: baseSeconds, isRunning: true, intervalId },
      };
    });
  };

  const handlePause = (task, userId) => {
    const taskId = task.id;
    setTimers((prev) => {
      const existing = prev[taskId];
      if (!existing || !existing.isRunning) return prev;
      if (existing.intervalId) clearInterval(existing.intervalId);
      return {
        ...prev,
        [taskId]: { ...existing, isRunning: false, intervalId: undefined },
      };
    });
  };

  const handleResume = (task, userId) => {
    const taskId = task.id;
    pauseAllOtherTasks(userId, taskId);
    setTimers((prev) => {
      const existing = prev[taskId];
      if (!existing || existing.isRunning) return prev;
      const intervalId = setInterval(() => {
        setTimers((p) => ({
          ...p,
          [taskId]: { ...p[taskId], accumulated: p[taskId].accumulated + 1 },
        }));
      }, 1000);
      return {
        ...prev,
        [taskId]: { ...existing, isRunning: true, intervalId },
      };
    });
  };

  const handleEnd = (task, userId) => {
    const taskId = task.id;
    setTimers((prev) => {
      const existing = prev[taskId];
      if (existing) {
        if (existing.intervalId) clearInterval(existing.intervalId);
        const newTime = formatSecondsToTime(existing.accumulated);
        setUserTasks((prevTasks) => ({
          ...prevTasks,
          [userId]: prevTasks[userId].map((t) =>
            t.id === taskId ? { ...t, timeSpent: newTime } : t
          ),
        }));
        const { [taskId]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
    moveTask(userId, taskId, "completed");
  };

  const handleAddTask = (newTask, userId) => {
    newTask.id = `t${Date.now()}`;
    newTask.status = "pending";
    newTask.history = [
      { status: "created", date: new Date().toISOString().split("T")[0] },
    ];
    newTask.comments = [];
    setUserTasks((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newTask],
    }));
  };

  const updateTask = (userId, taskId, updates) => {
    setUserTasks((prev) => {
      const userT = [...(prev[userId] || [])];
      const taskIndex = userT.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;
      userT[taskIndex] = { ...userT[taskIndex], ...updates };
      return { ...prev, [userId]: userT };
    });
  };

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
      case "in-queue":
        return "from-purple-500 to-violet-500";
      case "finished":
        return "from-green-600 to-lime-600";
      case "review":
        return "from-indigo-500 to-purple-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "in-queue":
        return <Hourglass className="w-4 h-4 text-blue-500" />;
      case "ongoing":
        return <Loader className="w-4 h-4 text-green-500 animate-spin" />;
      case "finished":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "review":
        return <ClipboardList className="w-4 h-4 text-purple-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleSection = (userId, status) => {
    const key = `${userId}-${status}`;
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const TaskCard = ({ index, task, isBacklog = false, userId }) => {
    const timer = timers[task.id];
    const isRunning = timer ? timer.isRunning : false;
    const displayTime = timer
      ? formatSecondsToTime(timer.accumulated)
      : task.timeSpent;

    return (
      <div
        className={`bg-white rounded-xl p-4 mb-3 transition-all duration-300 transform cursor-pointer  ${
          task.priority === "High"
            ? "border-red-500 shadow-red-100"
            : task.priority === "Medium"
            ? "border-yellow-500 shadow-yellow-100"
            : "border-green-500 shadow-green-100"
        }`}
        onClick={() => setSelectedTask({ task, userId })}
      >
        <div className="flex items-center justify-between mb-2 relative">
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
              className={`inline-flex items-center  mt-3 px-2 py-1 rounded animate-pulse text-xs font-medium bg-gradient-to-r ${getStatusColor(
                task.status
              )} text-white`}
            >
              {getStatusIcon(task.status)}
              <span className="ml-1 capitalize">{task.status}</span>
            </span>
          )}
          {!isBacklog && task.comments?.length > 0 && (
            <div className="absolute top-[-8px] right-[-8px]">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
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
                )} text-white`}
              >
                <Flag className="w-3 h-3 mr-1" />
                {task.priority}
              </span>
              <span
                className={`text-yellow-600 text-xl font-bold ${
                  isRunning ? "animate-pulse" : ""
                }`}
              >
                {displayTime}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>By: {task.assignedBy}</span>
              <span>{task.assignedDate}</span>
            </div>

            <div className="flex gap-1 mt-3">
              {task.status === "pending" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStart(task, userId);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Start
                </button>
              )}
              {task.status === "ongoing" && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isRunning) {
                        handlePause(task, userId);
                      } else {
                        handleResume(task, userId);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center"
                  >
                    {isRunning ? (
                      <Pause className="w-3 h-3 mr-1" />
                    ) : (
                      <Play className="w-3 h-3 mr-1" />
                    )}
                    {isRunning ? "Pause" : "Resume"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnd(task, userId);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-700 to-pink-700 text-white text-lg py-2 px-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center"
                  >
                    <Square className="w-3 h-3 mr-1" />
                    End
                  </button>
                </>
              )}
              {task.status === "completed" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveTask(userId, task.id, "review");
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-violet-700 text-white text-lg py-2 px-2 rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all flex items-center justify-center"
                >
                  <ClipboardList className="w-3 h-3 mr-1" />
                  Review this task
                </button>
              )}
              {task.status === "review" && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTask(userId, task.id, "pending");
                    }}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-700 text-white text-lg py-2 px-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Re-assign
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTask(userId, task.id, "finished");
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-lime-700 text-white text-lg py-2 px-2 rounded-lg hover:from-green-600 hover:to-lime-600 transition-all flex items-center justify-center"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Confirmed
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const Comment = ({ comment, level = 0, onReply, replyingTo, onAddReply }) => {
    return (
      <div
        className={`bg-gray-50 p-3 rounded-lg mb-2 ${
          level > 0 ? "ml-4 border-l-2 border-gray-300" : ""
        }`}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{comment.author}</span>
          <span className="text-gray-500">{comment.date}</span>
        </div>
        <p className="text-sm mt-1">{comment.text}</p>
        <button
          onClick={() => onReply(comment.id)}
          className="text-blue-500 text-xs mt-1"
        >
          Reply
        </button>
        {replyingTo === comment.id && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded"
              rows="2"
              placeholder="Add reply..."
              onChange={(e) => onAddReply(e.target.value)}
            />
            <button
              onClick={() => onAddReply(true)}
              className="mt-1 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Submit
            </button>
          </div>
        )}
        {comment.replies?.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            level={level + 1}
            onReply={onReply}
            replyingTo={replyingTo}
            onAddReply={onAddReply}
          />
        ))}
      </div>
    );
  };

  const TaskModal = ({ data, onClose }) => {
    const { task, userId } = data;
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [newReply, setNewReply] = useState("");

    const handleAddComment = () => {
      if (!newComment.trim()) return;
      const newCom = {
        id: `c${Date.now()}`,
        author: "Current User",
        text: newComment,
        date: new Date().toISOString().split("T")[0],
        replies: [],
      };
      updateTask(userId, task.id, {
        comments: [...(task.comments || []), newCom],
      });
      setNewComment("");
    };

    const handleReply = (commentId) => {
      setReplyingTo(replyingTo === commentId ? null : commentId);
    };

    const handleAddReply = (parentId) => {
      if (!newReply.trim()) return;
      const updateComments = (comments) =>
        comments.map((c) => {
          if (c.id === parentId) {
            return {
              ...c,
              replies: [
                ...(c.replies || []),
                {
                  id: `r${Date.now()}`,
                  author: "Current User",
                  text: newReply,
                  date: new Date().toISOString().split("T")[0],
                  replies: [],
                },
              ],
            };
          }
          if (c.replies) {
            return { ...c, replies: updateComments(c.replies) };
          }
          return c;
        });
      updateTask(userId, task.id, {
        comments: updateComments(task.comments || []),
      });
      setNewReply("");
      setReplyingTo(null);
    };

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{task.title}</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100"
                >
                  Change Status
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Task Description
                  </label>
                  <div className="w-full min-h-80 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-red-50 text-gray-800">
                    {task.description || "No description provided"}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lime-700 mb-2">
                    Assigned To
                  </label>
                  <div className="w-full p-3 border border-gray-200 rounded-lg bg-lime-50 text-gray-800">
                    {users.find((u) => u.id === userId)?.name || "Unknown"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Deadline
                  </label>
                  <div className="w-full p-3 border border-gray-200 rounded-lg bg-sky-50 text-gray-800">
                    {task.deadline}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-yellow-700 mb-2">
                    Priority
                  </label>
                  <div className="w-full p-3 border border-gray-200 rounded-lg bg-yellow-50 text-gray-800">
                    {task.priority}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Status
                  </label>
                  <div className="w-full p-3 border border-gray-200 rounded-lg bg-purple-50 text-gray-800 capitalize">
                    {task.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Timer className="w-5 h-5 mr-2 text-blue-600" />
                Timeline
              </h3>
              <div className="overflow-x-scroll max-w-4xl flex space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                <div className="relative w-full">
                  <div className="absolute mt-3 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 rounded-full"></div>
                  {task.history.map((entry, idx) => (
                    <div
                      key={idx}
                      className="relative inline-block min-w-[160px] text-center"
                      style={{ marginLeft: idx === 0 ? "0" : "10px" }}
                    >
                      <div
                        className={`absolute  w-8 h-8 rounded-full border-4 flex items-center justify-center ${getColorForIndex(
                          idx
                        )}`}
                        style={{ left: "50%", transform: "translateX(-50%)" }}
                      >
                        <span className="text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="mt-10 p-2 bg-white border border-gray-200 rounded-lg shadow">
                        <p className="font-medium text-gray-700 capitalize">
                          {entry.status}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {entry.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                Comments & Updates
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {task.comments.length === 0 ? (
                  <p className="text-gray-500 text-center">No comments yet</p>
                ) : (
                  task.comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      onReply={handleReply}
                      replyingTo={replyingTo}
                      onAddReply={(value) => {
                        if (typeof value === "string") {
                          setNewReply(value);
                        } else {
                          handleAddReply(comment.id);
                        }
                      }}
                    />
                  ))
                )}
              </div>
              <div className="mt-4">
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>

          {showStatusModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Change Status
                </h3>
                <div className="space-y-2">
                  {sections.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        const newStat = status;
                        moveTask(userId, task.id, newStat);
                        updateTask(userId, task.id, {
                          history: [
                            ...task.history,
                            {
                              status: newStat,
                              date: new Date().toISOString().split("T")[0],
                            },
                          ],
                        });
                        setShowStatusModal(false);
                      }}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left px-4 font-medium text-gray-700 transition-all"
                    >
                      {sectionTitles[status]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="mt-4 w-full py-3 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Helper function to determine color based on index
  const getColorForIndex = (index) => {
    const colors = [
      "border-yellow-400 bg-yellow-500",
      "border-red-400 bg-red-500",
      "border-purple-400 bg-purple-500",
      "border-green-400 bg-green-500",
      "border-blue-400 bg-blue-500",
    ];
    return colors[index % colors.length] || "border-gray-400 bg-gray-500";
  };

  const CreateTaskForm = ({ onClose, defaultUserId }) => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      priority: "Medium",
      project: "DNCRP",
      assignedTo: defaultUserId || users[0].id,
      deadline: "",
      assignedBy: "Current User",
      assignedDate: new Date().toISOString().split("T")[0],
      timeSpent: "00:00:00",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      handleAddTask(formData, formData.assignedTo);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Create New Task</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
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
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
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
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
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
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-800 ">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <img src={logo} className="w-20 h-40 object-contain" alt="" />
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

      <div className="flex h-[calc(100vh-78px)]">
        {/* Backlog Section - Collapsible */}
        {showBacklog && (
          <div className="w-1/7 bg-white/10 backdrop-blur-md border-r border-white/20 p-2 md:p-4 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-2">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                Backlog
              </h2>
              <button
                onClick={() => setShowBacklog(false)}
                className="p-1 bg-white/20 rounded-md text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 md:space-y-3">
              {backlogTasks.map((task) => (
                <TaskCard key={task.id} task={task} isBacklog={true} />
              ))}
            </div>
          </div>
        )}

        {/* User Columns */}
        <div
          className={`p-2 md:p-4 overflow-x-auto transition-all duration-300 ease-in-out ${
            showBacklog && showRightColumn
              ? "w-full"
              : showBacklog || showRightColumn
              ? "w-full"
              : "w-full"
          }`}
        >
          <div className="flex space-x-2 md:space-x-4 min-w-max">
            {users.map((user) => {
              const groupedTasks = (userTasks[user.id] || []).reduce(
                (acc, task) => {
                  const stat = task.status;
                  if (!acc[stat]) acc[stat] = [];
                  acc[stat].push(task);
                  return acc;
                },
                {}
              );

              return (
                <div
                  key={user.id}
                  className="w-[45vw] md:w-[30vw] lg:w-[20vw] bg-white/10 backdrop-blur-md rounded-2xl p-2 md:p-4 border border-white/20"
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
                            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                            <span className="font-bold text-orange-400 text-xs md:text-sm">
                              {user.storyPoints}
                            </span>
                            <span className="text-red-400 font-semibold text-xs md:text-sm">
                              PTS
                            </span>
                          </div>
                          <div className="mt-1 flex items-center font-semibold space-x-1">
                            <Timer className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="font-medium text-xs md:text-sm">
                              {user.totalTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Tasks Sections */}
                  <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {sections.map((status) => {
                      const key = `${user.id}-${status}`;
                      const isExpanded = expandedSections[key];
                      const tasks = groupedTasks[status] || [];
                      return (
                        <div key={status}>
                          <div
                            className="flex justify-between items-center mb-2 cursor-pointer bg-white/10 p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                            onClick={() => toggleSection(user.id, status)}
                          >
                            <h4 className="text-white font-semibold text-sm md:text-base">
                              {sectionTitles[status]} ({tasks.length})
                            </h4>
                            <ChevronDown
                              className={`w-5 h-5 text-white transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                          {isExpanded && (
                            <div className="space-y-3">
                              {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                  <TaskCard
                                    key={task.id}
                                    index={index + 1}
                                    task={task}
                                    userId={user.id}
                                  />
                                ))
                              ) : (
                                <div className="text-center py-4 text-white/60">
                                  No tasks
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedUserForCreate(user.id);
                      setShowCreateTask(true);
                    }}
                    className="w-full mt-4 bg-transparent border text-white py-3 rounded-lg font-medium hover:bg-slate-950 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Task
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Create Column */}
        {showRightColumn && (
          <div className="w-1/6 bg-white/10 backdrop-blur-md border-l border-white/20 p-2 md:p-4 overflow-y-auto transition-all duration-300 ease-in-out shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-2">
                  <Plus className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                Quick Create
              </h2>
              <button
                onClick={() => setShowRightColumn(false)}
                className="p-1 bg-white/20 rounded-md text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedUserForCreate(null);
                setShowCreateTask(true);
              }}
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

        {/* Toggle buttons */}
        {!showRightColumn && (
          <button
            onClick={() => setShowRightColumn(true)}
            className="hidden lg:flex fixed right-0 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 rounded-l-lg z-10 hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {!showBacklog && (
          <button
            onClick={() => setShowBacklog(true)}
            className="hidden lg:flex fixed left-0 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 rounded-r-lg z-10 hover:bg-white/30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Mobile toggles */}
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

        <div className="fixed bottom-20 left-4 lg:hidden">
          <button
            onClick={() => setShowBacklog(!showBacklog)}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
          >
            {showBacklog ? (
              <ChevronLeft className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Modals */}
        {selectedTask && (
          <TaskModal
            data={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}

        {showCreateTask && (
          <CreateTaskForm
            onClose={() => setShowCreateTask(false)}
            defaultUserId={selectedUserForCreate}
          />
        )}

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <button
            onClick={() => {
              setSelectedUserForCreate(null);
              setShowCreateTask(true);
            }}
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoardThree;
