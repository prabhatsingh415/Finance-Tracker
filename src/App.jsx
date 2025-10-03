import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SidePannel from "./components/SidePannel";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import BudgetGoals from "./pages/BudgetGoals.jsx";
import Settings from "./pages/Settings.jsx";
import { Plus } from "lucide-react";
import ThemeLoader from "./components/themeLoader.jsx";

function App() {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-[#000000] dark:text-white relative">
      <ThemeLoader />
      <SidePannel />
      <div className="flex-1 p-6 md:ml-60">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/transactions"
            element={
              <Transactions
                open={openTransactionModal}
                setOpen={setOpenTransactionModal}
              />
            }
          />
          <Route path="/budget-goals" element={<BudgetGoals />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setOpenTransactionModal(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-4 md:p-5 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition"
        title="Add Transaction"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

export default App;
