import { useEffect, useMemo, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskStats from "../components/tasks/TaskStats";
import { createTask, fetchTasks, updateTask } from "../services/taskService";
import { STATUS_OPTIONS, TASK_STATUS } from "../utils/constants";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError("Unable to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const counts = useMemo(() => {
    return {
      total: tasks.length,
      planned: tasks.filter((task) => task.status === TASK_STATUS.PLANNED).length,
      inProgress: tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length,
      complete: tasks.filter((task) => task.status === TASK_STATUS.COMPLETE).length,
    };
  }, [tasks]);

  const handleCreateTask = async (formData) => {
    const newTask = await createTask(formData);
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingId(taskId);
    try {
      const updated = await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === updated._id ? updated : task))
      );
    } catch (err) {
      setError("Unable to update task. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">
            {counts.total} tasks | {counts.inProgress} in progress | {counts.complete} complete
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span>
          New Task
        </button>
      </header>

      <TaskStats tasks={tasks} />

      <div className="flex flex-wrap gap-2">
        {["All", ...STATUS_OPTIONS].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === option
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        loading={loading}
        updatingId={updatingId}
      />

      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} onSubmit={handleCreateTask} />
      )}
    </div>
  );
}
