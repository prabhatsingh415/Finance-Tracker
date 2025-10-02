import React, { useState } from "react";

export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-green-400" : "bg-gray-300"
      }`}
    >
      <span className="sr-only">Toggle appearance</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
}
