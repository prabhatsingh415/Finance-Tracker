import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CircleX,
  CreditCard,
  Goal,
  Home,
  PanelLeft,
  Settings,
  TrendingUp,
} from "lucide-react";

function SidePannel() {
  const [open, setOpen] = useState(false);

  const options = [
    { id: 1, icon: <Home size={20} />, title: "Dashboard", path: "/" },
    {
      id: 2,
      icon: <CreditCard size={20} />,
      title: "Transactions",
      path: "/transactions",
    },
    {
      id: 3,
      icon: <Goal size={20} />,
      title: "Budget Goals",
      path: "/budget-goals",
    },

    {
      id: 4,
      icon: <Settings size={20} />,
      title: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      <div className="md:hidden h-fit flex items-start p-4 dark:bg-[#000000] dark:text-white ">
        <button onClick={() => setOpen(!open)}>
          <PanelLeft size={28} />
        </button>
      </div>
      <div
        className={`
          fixed top-0 z-50 left-0 h-full w-60 p-6 bg-white dark:bg-[#000000] dark:text-white
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
           md:flex flex-col 
        `}
      >
        <button className="my-4 md:hidden" onClick={() => setOpen(!open)}>
          <CircleX size={25} />
        </button>
        <h2 className="text-2xl font-bold mb-8">FinanceTracker</h2>
        <div className="flex flex-col gap-4 w-full ">
          {options.map((option) => (
            <NavLink
              key={option.id}
              to={option.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-800 font-bold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              {option.icon}
              <span className="text-base">{option.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default SidePannel;
