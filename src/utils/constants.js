export const TASK_STATUS = {
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  COMPLETE: "Complete",
};

export const STATUS_OPTIONS = Object.values(TASK_STATUS);

export const STATUS_STYLES = {
  Planned: {
    badge: "bg-blue-100 text-blue-800 border border-blue-200",
    dot: "bg-blue-500",
  },
  "In Progress": {
    badge: "bg-amber-100 text-amber-800 border border-amber-200",
    dot: "bg-amber-500",
  },
  Complete: {
    badge: "bg-green-100 text-green-800 border border-green-200",
    dot: "bg-green-500",
  },
};
