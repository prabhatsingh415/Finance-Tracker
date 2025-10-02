import React from "react";
import { Routes, Route } from "react-router-dom";
import SidePannel from "./components/SidePannel";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import BudgetGoals from "./pages/BudgetGoals.jsx";
import Insights from "./pages/Insights.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-[#000000] dark:text-white ">
      <SidePannel />
      <div className="flex-1 p-6 md:ml-60">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget-goals" element={<BudgetGoals />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
