import React, { useState, useEffect, useContext } from "react";
import TaskModal from "../components/TaskModal/TaskModal";
import CreateTaskForm from "../components/CreateTaskForm/CreateTaskForm";
import FloatingButtons from "../components/FloatingButtons/FloatingButtons";
import { useScreenSize } from "../Utils/useScreenSize";
import useTimers from "../Utils/useTimers";
import useTask from "../Utils/useTask";
import {
  // users,
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
// import Spinner from "../components/Spinner/Spinner";
import { userAPI } from "../../api/endpoints/user.api";
import CreateUserForm from "../components/CreateUserForm/CreateUserForm";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";
import { taskAPI } from "../../api/endpoints/task.api";
import { taskLogAPI } from "../../api/endpoints/taskLog.api";

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

  // const [tasks, setTasks] = useState([]);
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchTaskLogFilter = async () => {
    try {
      setLoading(true);

      const startDate = new Date("2025-01-01").toISOString();
      const endDate = new Date("2025-12-31").toISOString();
      const statuses = ["pending", "ongoing", "inqueue", "review", "complete"];

      if (users && users.length > 0) {
        const allPromises = [];

        users.forEach((user) => {
          statuses.forEach((status) => {
            const payload = {
              assignedToId: user._id,
              taskStatus: status,
              startDate,
              endDate,
            };
            allPromises.push(taskLogAPI.getTaskLogFilter(payload));
          });
        });

        const responses = await Promise.all(allPromises);
        const allData = responses.map((r) => r.data).flat();

        const groupedByUser = {};
        users.forEach((user) => {
          const tasksForUser = allData.filter(
            (task) => task.assignedToId === user._id
          );
          groupedByUser[user._id] = tasksForUser;
        });
        console.log(groupedByUser, "groupedByUser");
        setUserTaskLogs(groupedByUser);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch Task Log Filter Error", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      fetchTaskLogFilter();
    }
  }, [users]);

  const changeStatusTask = async (taskId, status) => {
    try {
      const response = await taskLogAPI.updateTaskStatus(taskId, {
        taskStatus: status.toLowerCase(),
      });

      // Update local state without refetching
      if (response.error === false) {
        setUserTaskLogs((prev) => {
          const updated = { ...prev };

          // Find and update the task in userTaskLogs
          Object.keys(updated).forEach((userId) => {
            updated[userId] = updated[userId].map((task) => {
              if (task._id === taskId || task.taskId === taskId) {
                return {
                  ...task,
                  taskStatus: status.toLowerCase(),
                };
              }
              return task;
            });
          });

          toast.success("Task Status Updated");
          return updated;
        });
      }
    } catch (error) {
      console.log("Status Change of Task Failed", error);
    }
  };
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
    parseTimeToSeconds,
    formatSecondsToTime,
    pauseAllOtherTasks,
  } = useTimers();
  const { userTasks, moveTask, updateTask } = useTask();

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
        };
      }

      const response = await taskAPI.create(payload);
      if (response.error === false) {
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
          if (taskLogResponse.error === false) {
            fetchUsers();
            toast.success("Task Created Sir !!");
            setShowCreateTask(false);
            setLoading(false);
          }
          setLoading(false);
        }
        setLoading(false);
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
        setLoading(false);
        fetchUsers();
      } else {
        toast.error(response.message || "Failed to create user");
        setLoading(false);
      }
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
            <BacklogSection
              showBacklog={showBacklog}
              setShowBacklog={setShowBacklog}
              backlogTasks={backlogTasks}
              setSelectedTask={setSelectedTask}
            />

            {loading === true ? (
              <div className="w-full h-full text-center flex items-center justify-center text-4xl font-extrabold text-white">
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
            <TaskModal
              data={selectedTask}
              onClose={() => setSelectedTask(null)}
              users={users}
              sections={sections}
              sectionTitles={sectionTitles}
              moveTask={moveTask}
              updateTask={updateTask}
            />
          )}

          {showCreateTask && (
            <CreateTaskForm
              onClose={() => setShowCreateTask(false)}
              defaultUserId={selectedUserForCreate}
              users={users}
              handleAddTask={handleAddTask}
              loading={loading}
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
