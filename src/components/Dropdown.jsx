import React from "react";

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  showPlaceholder = true,
}) {
  return (
    <div className="flex items-center gap-2 w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
          bg-white dark:bg-zinc-900 text-sm text-gray-700 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
      >
        {showPlaceholder && <option value="">{placeholder}</option>}
        {options.map((opt, idx) => {
          if (typeof opt === "string") {
            return (
              <option key={idx} value={opt}>
                {opt}
              </option>
            );
          }
          return (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
