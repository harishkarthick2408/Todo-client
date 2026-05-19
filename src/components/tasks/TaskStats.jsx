import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TASK_STATUS } from "../../utils/constants";

const COLORS = {
  [TASK_STATUS.PLANNED]: "#3B82F6",
  [TASK_STATUS.IN_PROGRESS]: "#F59E0B",
  [TASK_STATUS.COMPLETE]: "#10B981",
};

export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const plannedCount = tasks.filter((task) => task.status === TASK_STATUS.PLANNED).length;
  const inProgressCount = tasks.filter(
    (task) => task.status === TASK_STATUS.IN_PROGRESS
  ).length;
  const completeCount = tasks.filter((task) => task.status === TASK_STATUS.COMPLETE).length;

  const chartData = [
    { name: TASK_STATUS.PLANNED, value: plannedCount },
    { name: TASK_STATUS.IN_PROGRESS, value: inProgressCount },
    { name: TASK_STATUS.COMPLETE, value: completeCount },
  ].filter((entry) => entry.value > 0);

  const completionPct = total ? Math.round((completeCount / total) * 100) : 0;
  const percentOf = (count) => (total ? Math.round((count / total) * 100) : 0);

  const progressItems = [
    {
      label: TASK_STATUS.PLANNED,
      count: plannedCount,
      color: "bg-blue-500",
    },
    {
      label: TASK_STATUS.IN_PROGRESS,
      count: inProgressCount,
      color: "bg-amber-500",
    },
    {
      label: TASK_STATUS.COMPLETE,
      count: completeCount,
      color: "bg-green-500",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 7H16M8 11H16M8 15H12M7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 border-b-2 border-blue-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Planned</p>
              <p className="text-3xl font-bold text-gray-900">{plannedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 7V12L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 border-b-2 border-green-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Complete</p>
              <p className="text-3xl font-bold text-gray-900">{completeCount}</p>
            </div>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 lg:col-span-2">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Task Distribution</h3>
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-base font-semibold text-gray-900">Progress Overview</h3>
            <div className="flex items-center justify-center mt-6">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#10B981 ${completionPct * 3.6}deg, #E5E7EB ${completionPct * 3.6}deg)`,
                }}
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-semibold text-gray-900">
                  {completionPct}%
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {progressItems.map((item) => {
                const percent = percentOf(item.count);
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>{item.label}</span>
                      <span>{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
