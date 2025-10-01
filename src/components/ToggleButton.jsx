import React from "react";

function ToggleButton({
  enabled,
  setEnabled,
  width = 56,
  height = 28,
  circleSize = 20,
  onColor = "bg-blue-500",
  offColor = "bg-gray-300",
}) {
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      style={{ width: width, height: height }}
      className={`flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        enabled ? onColor : offColor
      }`}
    >
      <div
        style={{
          width: circleSize,
          height: circleSize,
          transform: `translateX(${enabled ? width - circleSize - 2 : 0}px)`,
        }}
        className="bg-white rounded-full shadow-md transition-transform duration-300"
      ></div>
    </div>
  );
}

export default ToggleButton;
