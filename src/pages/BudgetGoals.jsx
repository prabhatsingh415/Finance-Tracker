import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyType from "../components/CurrencyType";
import { Target, Plus, AlertCircle, AlertTriangle } from "lucide-react";
import Card from "../components/Card";
import { addBudget, updateBudget, deleteBudget } from "../redux/budgetSlice";
import Dropdown from "../components/Dropdown";

function BudgetGoals() {
  const categories = [
    "Food & Dining",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills & Utilities",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investment",
  ];

  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budget);
  const baseCurrency = useSelector((state) => state.currency.base);
  const transactions = useSelector((state) => state.transaction.list);

  // Total budget
  const totalBudget = budgets.reduce((sum, b) => sum + (b.budget || 0), 0);

  const totalSpent = budgets.reduce((sum, b) => {
    const spentForCategory = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category?.trim().toLowerCase() === b.category?.trim().toLowerCase()
      )
      .reduce((s, t) => s + (t.amount || 0), 0);
    return sum + spentForCategory;
  }, 0);

  const percentUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const remaining = totalBudget - totalSpent;

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ category: "", budget: "" });
  const formRef = useRef(null);

  const handleAddBudget = (e) => {
    e.preventDefault();

    if (!modalData.category) {
      alert("Please select a category");
      return;
    }

    const formData = new FormData(formRef.current);
    const budgetAmount = parseFloat(formData.get("budget"));

    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }

    const budget = {
      category: modalData.category,
      budget: budgetAmount,
    };

    if (budgets.some((b) => b.category === modalData.category)) {
      dispatch(updateBudget(budget));
    } else {
      dispatch(addBudget(budget));
    }

    setShowModal(false);
    formRef.current.reset();
    setModalData({ category: "", budget: "" });
  };

  const handleDeleteBudget = (category) => {
    dispatch(deleteBudget(category));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[#000000] dark:text-white gap-6 p-4 md:p-8 w-full max-w-4xl mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
        <div className="w-full flex flex-col justify-start items-start">
          <h1 className="text-3xl font-semibold mb-1">Budget Goals</h1>
          <p className="text-gray-500 text-sm md:text-md">
            Set and track your monthly spending limits
          </p>
        </div>
        <button
          onClick={() => {
            setModalData({ category: "", budget: "" });
            setShowModal(true);
          }}
          className="w-fit px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700 transition font-medium text-base whitespace-nowrap"
        >
          <Plus size={18} />
          Add Budget Goal
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl w-full max-w-md mx-2 p-6 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {modalData.category ? "Edit Budget Goal" : "Add Budget Goal"}
            </h2>
            <form
              ref={formRef}
              className="space-y-4"
              onSubmit={handleAddBudget}
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Dropdown
                  options={categories}
                  value={modalData.category}
                  onChange={(value) =>
                    setModalData((prev) => ({ ...prev, category: value }))
                  }
                  placeholder="Select Category"
                  showPlaceholder={false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Monthly Budget
                </label>
                <input
                  type="number"
                  name="budget"
                  min="0"
                  required
                  defaultValue={modalData.budget}
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 dark:bg-zinc-900 px-4 py-2 focus:outline-none text-base"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition font-medium"
                >
                  {modalData.category ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Total Budget Overview */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Target size={20} className="text-teal-600" />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Total Budget Overview
          </span>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Total Budget</span>
            <span className="text-2xl font-bold flex items-center">
              <CurrencyType
                baseCurrency={baseCurrency}
                iconSize={20}
                className="mr-1"
              />
              {totalBudget.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 mb-1">Total Spent</span>
            <span className="text-2xl font-bold flex items-center text-green-600">
              <CurrencyType
                baseCurrency={baseCurrency}
                iconSize={20}
                className="mr-1"
              />
              {totalSpent.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-800 mt-2 mb-1 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0a0a23] transition-all duration-500"
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center w-full text-xs mt-1">
          <span className="text-gray-500">
            {percentUsed.toFixed(1)}% of budget used
          </span>
          <span className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
            <CurrencyType
              baseCurrency={baseCurrency}
              iconSize={14}
              className="inline-block mr-0.5"
            />
            {remaining >= 0
              ? `${baseCurrency} ${remaining.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })} remaining`
              : `${baseCurrency} ${Math.abs(remaining).toLocaleString(
                  undefined,
                  { minimumFractionDigits: 0, maximumFractionDigits: 2 }
                )} overspent`}
          </span>
        </div>
      </div>

      {/* Individual Budget Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {budgets.map((b) => {
          const spent = transactions
            .filter(
              (t) =>
                t.type === "expense" &&
                t.category?.trim().toLowerCase() ===
                  b.category?.trim().toLowerCase()
            )
            .reduce((sum, t) => sum + (t.amount || 0), 0);

          const percentUsed = b.budget > 0 ? (spent / b.budget) * 100 : 0;
          const remaining = b.budget - spent;

          // Status logic
          let statusIcon, statusLabel;
          if (remaining < 0) {
            statusIcon = <AlertCircle size={18} className="text-red-600" />;
            statusLabel = "Over Budget";
          } else if (percentUsed >= 90) {
            statusIcon = (
              <AlertTriangle size={18} className="text-yellow-500" />
            );
            statusLabel = "Near Limit";
          } else {
            statusIcon = <Target size={18} className="text-green-600" />;
            statusLabel = "On Track";
          }

          return (
            <Card
              key={b.category}
              category={b.category}
              spent={spent}
              budget={b.budget}
              percent={percentUsed}
              leftOrOverText={
                remaining < 0
                  ? `$${Math.abs(remaining)} over`
                  : `$${remaining} left`
              }
              leftOrOverColor={
                remaining < 0
                  ? "text-red-600 font-semibold"
                  : "text-green-600 font-semibold"
              }
              statusLabel={statusLabel}
              statusIcon={statusIcon}
              progressBar={
                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-800 mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      remaining < 0
                        ? "bg-red-600"
                        : percentUsed >= 90
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  ></div>
                </div>
              }
              onEdit={() => {
                setModalData({ category: b.category, budget: b.budget });
                setShowModal(true);
              }}
              onDelete={() => handleDeleteBudget(b.category)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BudgetGoals;
