import React, { useEffect, useState, useRef } from "react";

// Single-file Kanban React Component (TailwindCSS required)
// Features added:
// 1) Glowing high-priority badges
// 2) Project dropdown in modal (with ability to add custom project)
// 3) Show project name on task cards
// 4) Show who assigned & when assigned
// 5) Start / Cancel / End controls per task with running timers
//    - Running tasks appear in right panel under Today's tasks
// 6) Dummy monthly stats on right panel

// Utility: generate a MongoDB-like ObjectId (24 hex chars)
const generateObjectId = () => {
  const hex = "0123456789abcdef";
  let id = "";
  for (let i = 0; i < 24; i++) id += hex[Math.floor(Math.random() * 16)];
  return id;
};

// Initial backlog items
const initialBacklog = {
  _id: generateObjectId(),
  name: "backlog",
  items: [
    {
      _id: generateObjectId(),
      title: "UI Improvements",
      description: "Polish header & theme",
      priority: "High",
      project: "dncrp",
      assignedBy: "PM",
      assignedAt: "2025-09-01 10:30",
    },
    {
      _id: generateObjectId(),
      title: "Login Bug Fix",
      description: "Fix token refresh flow",
      priority: "Medium",
      project: "mol",
      assignedBy: "Lead Dev",
      assignedAt: "2025-09-02 14:15",
    },
    {
      _id: generateObjectId(),
      title: "Add Unit Tests",
      description: "Core services coverage",
      priority: "Low",
      project: "None",
      assignedBy: "QA",
      assignedAt: "2025-09-03 09:00",
    },
  ],
};

// Users & their items
const initialUsers = [
  {
    _id: "u_" + generateObjectId(),
    name: "Akash",
    items: [
      {
        _id: generateObjectId(),
        title: "Market Research",
        priority: "Low",
        project: "dol",
        assignedBy: "Nirob",
        assignedAt: "2025-09-05 09:00",
      },
      {
        _id: generateObjectId(),
        title: "Web Template",
        priority: "Medium",
        project: "tms",
        assignedBy: "Arnab",
        assignedAt: "2025-09-06 11:20",
      },
    ],
  },
  { _id: "u_" + generateObjectId(), name: "Nirob", items: [] },
  { _id: "u_" + generateObjectId(), name: "Arnab", items: [] },
  { _id: "u_" + generateObjectId(), name: "Miraj", items: [] },
  { _id: "u_" + generateObjectId(), name: "Rimon", items: [] },
];

// Projects list (can add more via modal)
const initialProjects = [
  "dncrp",
  "mol",
  "dol",
  "ccms",
  "pret-a-med",
  "tms",
  "None",
];

const loggedInUser = {
  _id: "me_" + generateObjectId(),
  name: "You (LoggedIn)",
};

const todaysTasksJson = {
  morning: [
    { _id: generateObjectId(), title: "Standup notes" },
    { _id: generateObjectId(), title: "Review PR #42" },
  ],
  afternoon: [{ _id: generateObjectId(), title: "Client call" }],
};

export default function KanbanBoard() {
  const [backlog, setBacklog] = useState(initialBacklog);
  const [users, setUsers] = useState(initialUsers);
  const [projects, setProjects] = useState(initialProjects);

  // drag state
  const [dragged, setDragged] = useState(null); // { source: { type, id }, item }

  // modal + form
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignTo: initialBacklog._id,
    priority: "Medium",
    deadline: "",
    project: "None",
  });

  // running tasks and timers
  const [runningTasks, setRunningTasks] = useState([]); // array of { _id, title, userId }
  const [timers, setTimers] = useState({}); // { taskId: seconds }

  // dummy monthly stats
  const [monthlyStats, setMonthlyStats] = useState({
    completed: 12,
    pending: 30,
    avgMins: 35,
  });

  // tick every second for running tasks
  const tickRef = useRef(null);
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTimers((prev) => {
        // only increment timers for currently running tasks
        const updated = { ...prev };
        runningTasks.forEach((t) => {
          updated[t._id] = (updated[t._id] || 0) + 1;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [runningTasks]);

  // helper: format timer seconds to hh:mm:ss or mm:ss
  const formatTime = (sec) => {
    if (!sec && sec !== 0) return "00:00";
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    if (hours > 0)
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // priority color classes + glow for high
  const priorityClass = (p) => {
    switch ((p || "").toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-red-600 to-rose-500 text-white ring-2 ring-rose-500/60 animate-pulse shadow-lg";
      case "medium":
        return "bg-gradient-to-r from-yellow-300 to-amber-400 text-zinc-900";
      case "low":
        return "bg-gradient-to-r from-emerald-400 to-green-600 text-white";
      default:
        return "bg-zinc-700 text-white";
    }
  };

  // start a task timer and add to running list
  const startTask = (task, userId) => {
    // ensure timer exists
    setTimers((prev) => ({ ...prev, [task._id]: prev[task._id] || 0 }));
    // add to running tasks if not already
    setRunningTasks((prev) =>
      prev.find((t) => t._id === task._id)
        ? prev
        : [...prev, { ...task, userId }]
    );
  };

  // cancel: stop timer and reset to 0, remove from running list
  const cancelTask = (taskId) => {
    setRunningTasks((prev) => prev.filter((t) => t._id !== taskId));
    setTimers((prev) => ({ ...prev, [taskId]: 0 }));
  };

  // end: stop timer, remove from running list and increment monthly completed
  const endTask = (taskId) => {
    setRunningTasks((prev) => prev.filter((t) => t._id !== taskId));
    // keep timer value (final), but remove timer from active increments by removing from runningTasks
    // update stats (dummy behaviour)
    setMonthlyStats((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      pending: Math.max(0, prev.pending - 1),
    }));
  };

  // drag handlers
  const onDragStart = (sourceType, sourceId, item, e) => {
    setDragged({ source: { type: sourceType, id: sourceId }, item });
    try {
      e.dataTransfer.setData("text/plain", item._id);
    } catch (err) {
      /* some environments disallow setting data */
    }
  };
  const onDragOver = (e) => e.preventDefault();

  const onDropToUser = (e, targetUserId) => {
    e.preventDefault();
    if (!dragged) return;
    const { source, item } = dragged;
    if (source.type === "backlog") {
      setBacklog((prev) => ({
        ...prev,
        items: prev.items.filter((it) => it._id !== item._id),
      }));
      setUsers((prev) =>
        prev.map((u) =>
          u._id === targetUserId ? { ...u, items: [...u.items, item] } : u
        )
      );
    } else if (source.type === "user") {
      if (source.id === targetUserId) {
        setDragged(null);
        return;
      }
      setUsers((prev) => {
        const copy = prev.map((u) => ({ ...u, items: [...u.items] }));
        const srcIdx = copy.findIndex((u) => u._id === source.id);
        if (srcIdx !== -1)
          copy[srcIdx].items = copy[srcIdx].items.filter(
            (it) => it._id !== item._id
          );
        return copy.map((u) =>
          u._id === targetUserId ? { ...u, items: [...u.items, item] } : u
        );
      });
    }
    setDragged(null);
  };

  const onDropToBacklog = (e) => {
    e.preventDefault();
    if (!dragged) return;
    const { source, item } = dragged;
    if (source.type === "user") {
      setUsers((prev) =>
        prev.map((u) => ({
          ...u,
          items: u.items.filter((it) => it._id !== item._id),
        }))
      );
      setBacklog((prev) => ({ ...prev, items: [...prev.items, item] }));
    }
    setDragged(null);
  };

  // remove item
  const removeItem = (containerType, containerId, itemId) => {
    if (containerType === "backlog") {
      setBacklog((prev) => ({
        ...prev,
        items: prev.items.filter((it) => it._id !== itemId),
      }));
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === containerId
            ? { ...u, items: u.items.filter((it) => it._id !== itemId) }
            : u
        )
      );
      // if task was running remove it too
      setRunningTasks((prev) => prev.filter((t) => t._id !== itemId));
      setTimers((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
    }
  };

  // modal handlers
  const openModal = () => {
    setModalOpen(true);
    setForm((f) => ({ ...f, assignTo: backlog._id || initialBacklog._id }));
  };
  const closeModal = () => setModalOpen(false);

  const createTask = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newTask = {
      _id: generateObjectId(),
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      deadline: form.deadline,
      project: form.project === "None" ? "None" : form.project,
      assignedBy: loggedInUser.name,
      assignedAt: new Date().toLocaleString(),
    };
    if (form.assignTo === backlog._id)
      setBacklog((prev) => ({ ...prev, items: [...prev.items, newTask] }));
    else
      setUsers((prev) =>
        prev.map((u) =>
          u._id === form.assignTo ? { ...u, items: [...u.items, newTask] } : u
        )
      );

    // reset form
    setForm({
      title: "",
      description: "",
      assignTo: backlog._id,
      priority: "Medium",
      deadline: "",
      project: "None",
    });
    setModalOpen(false);
  };

  // project change handler (handles 'add_new')
  const onProjectChange = (value) => {
    if (value === "add_new") {
      const name = prompt("Enter new project name:");
      if (name && name.trim()) {
        setProjects((prev) => [name.trim(), ...prev]);
        setForm((f) => ({ ...f, project: name.trim() }));
      }
    } else setForm((f) => ({ ...f, project: value }));
  };

  // assign options build
  const assignOptions = [
    { id: backlog._id, label: "Backlog" },
    ...users.map((u) => ({ id: u._id, label: u.name })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white antialiased">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transform -rotate-3">
            <span className="font-bold tracking-wide">K</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight">
              Kanban • Project
            </div>
            <div className="text-sm text-zinc-400">Team • Tasks</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-zinc-300 mr-2 hidden md:block">
            Active: {users.length}
          </div>
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-400 via-yellow-400 to-rose-400 text-zinc-900 font-semibold shadow-lg hover:scale-105 transform transition duration-200"
          >
            + Add Task
          </button>
        </div>
      </header>

      {/* Layout: left 20%, center 70%, right 10% */}
      <div className="flex w-full" style={{ height: "calc(100vh - 72px)" }}>
        {/* Left backlog (20%) */}
        <div
          style={{ width: "20%" }}
          className="border-r border-zinc-800 bg-zinc-900 p-4 overflow-auto"
        >
          <h2 className="font-semibold mb-3">Backlog</h2>
          <div
            onDragOver={onDragOver}
            onDrop={onDropToBacklog}
            className="space-y-3"
          >
            {backlog.items.length === 0 ? (
              <div className="text-zinc-500 italic">No items</div>
            ) : (
              backlog.items.map((it) => (
                <div
                  key={it._id}
                  draggable
                  onDragStart={(e) =>
                    onDragStart("backlog", backlog._id, it, e)
                  }
                  className={`p-3 rounded-lg shadow-md flex flex-col gap-2 ${priorityClass(
                    it.priority
                  )}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-medium">{it.title}</div>
                    <button
                      onClick={() => removeItem("backlog", null, it._id)}
                      className="text-white/70 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  {it.description && (
                    <div className="text-xs text-zinc-100/80">
                      {it.description}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="text-[11px] px-2 py-1 rounded bg-black/30">
                      {it.project}
                    </div>
                    <div className="text-[11px] text-zinc-300">
                      By {it.assignedBy}
                    </div>
                    <div className="text-[11px] text-zinc-300">
                      At {it.assignedAt}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center users (70%) */}
        <div style={{ width: "70%" }} className="p-4 overflow-auto">
          <div className=" flex w-80 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex-shrink-0 w-full bg-zinc-800 rounded-2xl p-3 border-t-4 border-transparent"
                style={{ minWidth: 240 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-zinc-400">
                      {user.items.length} tasks
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 hidden md:block">
                    <button
                      onClick={() => {
                        if (!user.items.length) return;
                        setBacklog((prev) => ({
                          ...prev,
                          items: [...prev.items, ...user.items],
                        }));
                        setUsers((prev) =>
                          prev.map((u) =>
                            u._id === user._id ? { ...u, items: [] } : u
                          )
                        );
                      }}
                      className="px-2 py-1 rounded bg-zinc-700/50"
                    >
                      Move all to backlog
                    </button>
                  </div>
                </div>

                <div
                  onDragOver={onDragOver}
                  onDrop={(e) => onDropToUser(e, user._id)}
                  className="space-y-3 min-h-[220px]"
                >
                  {user.items.length === 0 ? (
                    <div className="text-zinc-500 italic text-sm p-4 rounded-lg bg-zinc-900/40">
                      Drop tasks here
                    </div>
                  ) : (
                    user.items.map((it) => (
                      <div
                        key={it._id}
                        draggable
                        onDragStart={(e) =>
                          onDragStart("user", user._id, it, e)
                        }
                        className={`p-3 rounded-lg shadow flex flex-col gap-2 ${priorityClass(
                          it.priority
                        )}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">{it.title}</div>
                            {it.description && (
                              <div className="text-xs text-zinc-100/80">
                                {it.description}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="text-[11px] px-2 py-1 rounded bg-black/30">
                              {it.project}
                            </div>
                            <button
                              onClick={() =>
                                removeItem("user", user._id, it._id)
                              }
                              className="text-white/70 hover:text-white"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-300">
                          <div>By {it.assignedBy}</div>
                          <div>{it.assignedAt}</div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-zinc-200">
                            {it.deadline ? `Due: ${it.deadline}` : ""}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startTask(it, user._id)}
                              className={`px-2 py-1 text-xs rounded ${
                                runningTasks.find((t) => t._id === it._id)
                                  ? "bg-green-700/80"
                                  : "bg-green-600"
                              }`}
                            >
                              Start
                            </button>
                            <button
                              onClick={() => cancelTask(it._id)}
                              className="px-2 py-1 text-xs rounded bg-amber-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => endTask(it._id)}
                              className="px-2 py-1 text-xs rounded bg-red-600"
                            >
                              End
                            </button>
                          </div>
                        </div>

                        {timers[it._id] !== undefined && (
                          <div className="text-xs text-zinc-100/80 mt-1">
                            ⏱ {formatTime(timers[it._id])}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel (10%) */}
        <div
          style={{ width: "20%" }}
          className="border-l border-zinc-800 p-4 bg-zinc-900/60 overflow-auto"
        >
          <div className="mb-4">
            <div className="font-semibold">{loggedInUser.name}</div>
            <div className="text-xs text-zinc-400 mt-1">Member • PM</div>
          </div>

          <div className="mb-4">
            <div className="font-semibold text-sm mb-2">Today's Tasks</div>
            <div className="text-xs text-zinc-300">Morning</div>
            <div className="space-y-1 mt-2">
              {todaysTasksJson.morning.map((t) => (
                <div
                  key={t._id}
                  className="text-xs px-2 py-1 rounded bg-zinc-800"
                >
                  • {t.title}
                </div>
              ))}
            </div>

            <div className="text-xs text-zinc-300 mt-3">Afternoon</div>
            <div className="space-y-1 mt-2">
              {todaysTasksJson.afternoon?.map((t) => (
                <div
                  key={t._id}
                  className="text-xs px-2 py-1 rounded bg-zinc-800"
                >
                  • {t.title}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="font-semibold text-sm mb-2">Running Tasks</div>
            <div className="space-y-2">
              {runningTasks.length === 0 ? (
                <div className="text-xs text-zinc-500">No active tasks</div>
              ) : (
                runningTasks.map((t) => (
                  <div key={t._id} className="text-xs bg-zinc-800 p-2 rounded">
                    <div className="font-medium">{t.title}</div>
                    <div className="text-[11px] text-zinc-300">
                      {formatTime(timers[t._id] || 0)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="font-semibold text-sm mb-2">
              Monthly Stats (Dummy)
            </div>
            <div className="text-xs">Completed: {monthlyStats.completed}</div>
            <div className="text-xs">Pending: {monthlyStats.pending}</div>
            <div className="text-xs">
              Avg time (min): {monthlyStats.avgMins}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          ></div>

          <form
            onSubmit={createTask}
            className="relative z-60 bg-zinc-900 rounded-lg p-6 w-full max-w-md shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Create Task</h3>

            <div className="grid gap-3">
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Title"
                required
                className="p-2 bg-zinc-800 rounded"
              />
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Description"
                className="p-2 bg-zinc-800 rounded"
              />

              <select
                value={form.assignTo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, assignTo: e.target.value }))
                }
                className="p-2 bg-zinc-800 rounded"
              >
                {assignOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <select
                value={form.project}
                onChange={(e) => onProjectChange(e.target.value)}
                className="p-2 bg-zinc-800 rounded"
              >
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
                <option value="add_new">+ Add new project</option>
              </select>

              <div className="flex gap-2">
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, priority: e.target.value }))
                  }
                  className="p-2 bg-zinc-800 rounded flex-1"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deadline: e.target.value }))
                  }
                  className="p-2 bg-zinc-800 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-gradient-to-r from-amber-400 via-yellow-400 to-rose-400 text-zinc-900 font-semibold"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
