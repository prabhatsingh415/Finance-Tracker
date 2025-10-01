import React from "react";
import { Routes, Route } from "react-router-dom";
import SidePannel from "./components/SidePannel";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import BudgetGoals from "./pages/BudgetGoals";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="flex h-screen w-screen">
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
