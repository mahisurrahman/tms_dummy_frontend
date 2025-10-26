import React, { useState, useEffect, useContext } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import CreateTaskForm from "../components/CreateTaskForm/CreateTaskForm";
import FloatingButtons from "../components/FloatingButtons/FloatingButtons";
import { useScreenSize } from "../Utils/useScreenSize";
import useTimers from "../Utils/useTimers";
import useTask from "../Utils/useTask";
import {
  backlogTasks,
  filterOptions,
  attendanceOptions,
  roleOptions,
  priorityOptions,
  statusOptions,
  sections,
  sectionTitles,
} from "../Utils/mockData";
import Header from "../components/Header/Header";
import BacklogSection from "../components/BacklogSection/BacklogSection";
import UserColumns from "../components/UserColumns/UserColumns";
import QuickCreateColumn from "../components/QuickCreateColumn/QuickCreateColumn";
import { userAPI } from "../../api/endpoints/user.api";
import CreateUserForm from "../components/CreateUserForm/CreateUserForm";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";
import { taskAPI } from "../../api/endpoints/task.api";
import { taskLogAPI } from "../../api/endpoints/taskLog.api";
import TaskModalWrapper from "../Wrapper/TaskModalWrapper";
import { notiFyCntrlAPI } from "../../api/endpoints/notificationControll.api";
import { notificationAPI } from "../../api/endpoints/notification.api";

function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedUserForCreate, setSelectedUserForCreate] = useState(null);
  const [showRightColumn, setShowRightColumn] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userTaskLogs, setUserTaskLogs] = useState({});
  const [backlogs, setBacklogs] = useState([]);
  const [allNotis, setAllNotis] = useState([]);
  const [refreshNotis, setRefresNotis] = useState(false);
  const [totalTasks, setTotalTasks] = useState([]);
  const [completedTotalTasks, setCompletedTotalTasks] = useState([]);
  const [ongoingTotalTasks, setOngoingTotalTasks] = useState([]);
  const [pendingTotalTasks, setPendingTotalTasks] = useState([]);
  const [inqueTotalTasks, setInqueTotalTasks] = useState([]);
  const [reviewTotalTasks, setreviewTotalTasks] = useState([]);

  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  // const fetchTotalTasks = async () => {
  //   try {
  //     const response = await taskAPI.getAllTaskByUserId(user?._id);
  //     setTotalTasks(response.data);
  //   } catch (error) {
  //     console.error("Fetch Users Error:", error.message);
  //   }
  // };

  const fetchTotalCompletedTasks = async () => {
    try {
      const response = await taskAPI.getAllCompletedTaskByUserId(user?._id);
      setCompletedTotalTasks(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  const fetchTotalOngoingTasks = async () => {
    try {
      const response = await taskAPI.getAllOnGoingTaskByUserId(user?._id);
      setOngoingTotalTasks(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  const fetchTotalPendingTasks = async () => {
    try {
      const response = await taskAPI.getAllPendingTaskByUserId(user?._id);
      setPendingTotalTasks(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  const fetchTotalInQueTasks = async () => {
    try {
      const response = await taskAPI.getAllInQueTaskByUserId(user?._id);
      setInqueTotalTasks(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  const fetchTotalReviewTasks = async () => {
    try {
      const response = await taskAPI.getAllReviewTaskByUserId(user?._id);
      setreviewTotalTasks(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  const fetchBacklogs = async () => {
    try {
      const response = await taskAPI.getAllTask();
      const backlogTasksFiltered = response.data.filter(
        (task) => task.backlog === true
      );
      setBacklogs(backlogTasksFiltered);
    } catch (error) {
      console.error("Fetch Backlogs Error:", error.message);
    }
  };

  // Updated fetchTaskLogFilter — only filters by startDate and endDate now
  const fetchTaskLogFilter = async () => {
    try {
      setLoading(true);

      const startDate = new Date("2025-01-01T00:00:00.000Z").toISOString();
      const endDate = new Date("2025-12-31T23:59:59.999Z").toISOString();

      // Single API call with start and end date only
      const payload = { startDate, endDate };
      const response = await taskLogAPI.getTaskLogFilter(payload);

      if (response && response.data) {
        const allData = response.data;

        // Group fetched tasks by assignedToId for Kanban board display
        const groupedByUser = {};
        users.forEach((user) => {
          groupedByUser[user._id] = allData.filter(
            (task) => task.assignedToId === user._id
          );
        });

        setUserTaskLogs(groupedByUser);
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch Task Log Filter Error", error);
      setLoading(false);
    }
  };

  const fetchAllNotifications = async () => {
    try {
      const response = await notificationAPI.getNotificationsByUserId(
        user?._id
      );
      setAllNotis(response.data);
    } catch (error) {
      console.error("Fetch Users Error:", error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
      await fetchBacklogs();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      fetchTaskLogFilter();
      fetchAllNotifications();
      // fetchTotalTasks();
      fetchTotalCompletedTasks();
      fetchTotalOngoingTasks();
      fetchTotalPendingTasks();
      fetchTotalInQueTasks();
      fetchTotalReviewTasks();
    }
  }, [users, refreshNotis]);

  // Change status of a task
  const changeStatusTask = async (
    taskLogId,
    taskId,
    newStatus,
    startTime,
    endTime
  ) => {
    try {
      let updateResponse = null;
      if (!newStatus === "ongoing") {
        updateResponse = await taskLogAPI.updateTaskStatus(taskId, {
          startTime,
          endTime,
          newStatus,
          isStateComplete: true,
        });
      } else {
        updateResponse = await taskLogAPI.updateTaskStatus(taskId, {
          startTime,
          endTime,
          newStatus,
          isStateComplete: false,
        });
      }

      if (updateResponse.error === false) {
        // 2️⃣ Find the original task log from current state
        const originalTaskLog = Object.values(userTaskLogs)
          .flat()
          .find((task) => task._id === taskLogId || task.taskId === taskId);

        if (originalTaskLog) {
          // 3️⃣ Prepare new task log payload
          const newTaskLogPayload = {
            startTime: new Date(),
            assignedDate: originalTaskLog.assignedDate,
            expectedDuration: originalTaskLog.expectedDuration || null,
            taskStatus: newStatus.toLowerCase(),
            taskId: originalTaskLog.taskId || taskId,
            assignedToId: originalTaskLog.assignedToId,
            creatorId: originalTaskLog.creatorId,
          };

          // 4️⃣ Create new task log
          const createTaskLogResponse = await taskLogAPI.create(
            newTaskLogPayload
          );

          if (createTaskLogResponse.error === false) {
            // 5️⃣ Refresh data to update the UI
            await fetchUsers();
            await fetchBacklogs();

            // 6️⃣ Update state
            setUserTaskLogs((prev) => {
              const updated = { ...prev };
              Object.keys(updated).forEach((userId) => {
                updated[userId] = updated[userId].map((task) => {
                  if (task._id === taskId || task.taskId === taskId) {
                    return {
                      ...task,
                      taskStatus: newStatus.toLowerCase(),
                    };
                  }
                  return task;
                });
              });
              return updated;
            });

            toast.success("Status Changed"); // MOVE THIS HERE - only show once
            setSelectedTask(null);
          } else {
            toast.error(
              "Task Status updated but failed to create new Task Log"
            );
          }
        }
      }
    } catch (error) {
      console.log("Status Change of Task Failed", error);
      toast.error("Failed to change task status");
    }
  };

  // Logout handler
  const handleLogoutButton = async () => {
    try {
      const logoutData = await handleLogout();
      if (logoutData) {
        toast.success("Successfully logged out", {
          duration: 2000,
          position: "top-center",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error("There was a problem while logging out", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const isMobileView = useScreenSize();
  const {
    timers,
    handleStart,
    handlePause,
    handleResume,
    handleEnd,
    formatSecondsToTime,
  } = useTimers();
  const { moveTask, updateTask } = useTask();

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

  const handleAddTask = async (formData) => {
    try {
      setLoading(true);
      let payload = {};

      if (formData.assignedTo === "") {
        payload = {
          taskTitle: formData.title,
          taskDescription: formData.description,
          taskPriority: formData.priority,
          taskAssignedTo: "",
          backlog: true,
          taskCreatedBy: user._id,
          taskAssignedBy: "",
          deadline: formData.deadline,
          assignedDate: null,
          labels: formData.labels || [],
        };
      } else {
        payload = {
          taskTitle: formData.title,
          taskDescription: formData.description,
          taskPriority: formData.priority,
          taskAssignedTo: formData.assignedTo,
          backlog: false,
          taskCreatedBy: user._id,
          taskAssignedBy: "",
          deadline: formData.deadline,
          assignedDate: new Date(),
          labels: formData.labels || [],
        };
      }

      const response = await taskAPI.create(payload);
      if (response.data) {
        if (formData.assignedTo !== "") {
          const taskLogPayload = {
            startTime: new Date(),
            assignedDate: new Date(),
            expectedDuration: formData.deadline,
            taskStatus: "pending",
            taskId: response?.data?._id,
            assignedToId: formData.assignedTo,
            creatorId: user._id,
          };
          const taskLogResponse = await taskLogAPI.create(taskLogPayload);
          if (taskLogResponse.data) {
            const data = {
              taskId: response.data._id,
              taskTitle: payload.taskTitle,
              taskActive: response.data.isActive,
              assignedById: payload.taskCreatedBy,
              assignedToId: payload.taskAssignedTo,
            };

            const notificationControllCreate = await notiFyCntrlAPI.create(
              data
            );
            if (notificationControllCreate.data) {
              fetchUsers();
              toast.success("Task Created Sir !!");
              setShowCreateTask(false);
            }
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Create Task Failed", error);
      setLoading(false);
    }
  };

  const toggleSection = (userId, status) => {
    const key = `${userId}-${status}`;
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCreateUser = async (userData) => {
    try {
      setLoading(true);
      const response = await userAPI.create(userData);

      if (response.error === false) {
        toast.success("User created successfully!");
        setShowCreateUser(false);
        fetchUsers();
      } else {
        toast.error(response.message || "Failed to create user");
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong while creating the user");
      setLoading(false);
    }
  };

  return (
    <>
      {user && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-800">
          <Header
            filterOptions={filterOptions}
            attendanceOptions={attendanceOptions}
            roleOptions={roleOptions}
            priorityOptions={priorityOptions}
            statusOptions={statusOptions}
            setShowCreateTask={setShowCreateTask}
            setSelectedUserForCreate={setSelectedUserForCreate}
          />

          <div className="flex h-[calc(100vh-78px)]">
            {user && user?.userType === 1 && (
              <BacklogSection
                showBacklog={showBacklog}
                setShowBacklog={setShowBacklog}
                backlogTasks={backlogs} // updated from backlogTasks
                setSelectedTask={setSelectedTask}
              />
            )}

            {loading ? (
              <div className="w-full text-center flex items-center justify-center text-4xl font-extrabold text-white">
                <h1>Loading ....</h1>
              </div>
            ) : (
              <UserColumns
                users={users}
                userTasks={userTaskLogs}
                sections={sections}
                sectionTitles={sectionTitles}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                timers={timers}
                formatSecondsToTime={formatSecondsToTime}
                handleStart={handleStart}
                handlePause={handlePause}
                handleResume={handleResume}
                handleEnd={handleEnd}
                moveTask={moveTask}
                setSelectedTask={setSelectedTask}
                setSelectedUserForCreate={setSelectedUserForCreate}
                setShowCreateTask={setShowCreateTask}
                changeStatusTask={changeStatusTask}
                allNotis={allNotis}
              />
            )}

            <QuickCreateColumn
              showRightColumn={showRightColumn}
              setShowRightColumn={setShowRightColumn}
              users={users}
              setSelectedUserForCreate={setSelectedUserForCreate}
              setShowCreateTask={setShowCreateTask}
              setShowCreateUser={setShowCreateUser}
              handleLogoutButton={handleLogoutButton}
              totalTasks={totalTasks}
              completedTotalTasks={completedTotalTasks}
              ongoingTotalTasks={ongoingTotalTasks}
              pendingTotalTasks={pendingTotalTasks}
              inqueTotalTasks={inqueTotalTasks}
              reviewTotalTasks={reviewTotalTasks}
            />

            <FloatingButtons
              showRightColumn={showRightColumn}
              setShowRightColumn={setShowRightColumn}
              showBacklog={showBacklog}
              setShowBacklog={setShowBacklog}
              isMobileView={isMobileView}
              setSelectedUserForCreate={setSelectedUserForCreate}
              setShowCreateTask={setShowCreateTask}
            />
          </div>

          {selectedTask && (
            <TaskModalWrapper
              data={selectedTask}
              onClose={() => setSelectedTask(null)}
              users={users}
              sections={sections}
              sectionTitles={sectionTitles}
              moveTask={moveTask}
              updateTask={updateTask}
              changeStatusTask={changeStatusTask}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              setRefresNotis={setRefresNotis}
              refreshNotis={refreshNotis}
            />
          )}

          {showCreateTask && (
            <CreateTaskForm
              onClose={() => setShowCreateTask(false)}
              defaultUserId={selectedUserForCreate}
              users={users}
              handleAddTask={handleAddTask}
              loading={loading}
              user={user}
            />
          )}

          {showCreateUser && (
            <CreateUserForm
              onClose={() => setShowCreateUser(false)}
              onCreateUser={handleCreateUser}
              loading={loading}
            />
          )}
        </div>
      )}
    </>
  );
}

export default KanbanBoard;
