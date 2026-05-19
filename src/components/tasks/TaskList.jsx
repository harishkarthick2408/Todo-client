import TaskCard from "./TaskCard";

const COLUMNS = [
  {
    status: "Planned",
    label: "PLANNED",
    dotColor: "bg-blue-500",
    dividerColor: "bg-blue-400",
    headerBg: "bg-blue-50",
  },
  {
    status: "In Progress",
    label: "IN PROGRESS",
    dotColor: "bg-amber-500",
    dividerColor: "bg-amber-400",
    headerBg: "bg-amber-50",
  },
  {
    status: "Complete",
    label: "COMPLETE",
    dotColor: "bg-green-500",
    dividerColor: "bg-green-400",
    headerBg: "bg-green-50",
  },
];

export default function TaskList({ tasks, onStatusChange, loading, updatingId }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex flex-col gap-3">
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-3" />
            <div className="h-1 bg-gray-200 rounded animate-pulse mb-3" />
            {[0, 1].map((card) => (
              <div
                key={card}
                className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-indigo-500"
          >
            <path
              d="M7 8H17M7 12H17M7 16H13M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No tasks yet</h3>
        <p className="text-sm text-gray-500 mt-1">Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.status);
        return (
          <div key={column.status} className="flex flex-col gap-3">
            <div
              className={`flex items-center justify-between mb-2 px-3 py-2 rounded-lg ${column.headerBg}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`} />
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {column.label}
                </h3>
              </div>
              <span className="text-xs font-medium text-gray-400 bg-white/80 rounded-full px-2 py-0.5">
                {columnTasks.length}
              </span>
            </div>

            <div className={`h-1 rounded-full mb-3 ${column.dividerColor}`} />

            {columnTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={onStatusChange}
                isUpdating={updatingId === task._id}
              />
            ))}

            {columnTasks.length === 0 && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-400">No tasks</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
