import React from "react";

export default function Card({
  category,
  spent,
  budget,
  leftOrOverText,
  leftOrOverColor,
  statusLabel,
  statusIcon,
  progressBar,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{category}</h3>
        <div className="flex items-center gap-1 text-sm">
          {statusIcon} {statusLabel}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Spent: {spent} / Budget: {budget}
      </div>

      {/* Progress Bar */}
      {progressBar}

      <div className={`text-sm ${leftOrOverColor}`}>{leftOrOverText}</div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={onEdit}
          className="flex-1 py-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
