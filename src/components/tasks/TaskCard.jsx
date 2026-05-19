import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function TaskCard({ task, onStatusChange, isUpdating = false }) {
  const statusOptions = ["Planned", "In Progress", "Complete"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <StatusBadge status={task.status} />
        <div className="text-xs text-gray-400">Created: {formatDate(task.createdAt)}</div>
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">{task.title}</h3>
      {task.description && (
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{task.description}</p>
      )}
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        {statusOptions.map((status) => {
          const isCurrent = status === task.status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => !isCurrent && onStatusChange(task._id, status)}
              disabled={isCurrent || isUpdating}
              className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${
                isCurrent
                  ? "bg-indigo-600 text-white cursor-default"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
}
