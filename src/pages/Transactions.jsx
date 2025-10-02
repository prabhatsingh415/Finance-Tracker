import {
  Filter,
  Search,
  Trash2,
  SquarePen,
  Plus,
  Calendar,
  IndianRupee,
} from "lucide-react";
import React, { useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../redux/transactionalSlice";

function Transactions() {
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
  const types = ["Income", "Expense"];

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.list);
  const size = transactions.length;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const formRef = useRef(null);

  const handleNewTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const transaction = {
      description: formData.get("description").trim(),
      amount: parseFloat(formData.get("amount")),
      currency: formData.get("currency"),
      type: formData.get("type") === "on" ? "income" : "expense",
      category: formData.get("category"),
      date: formData.get("date"),
      note: formData.get("notes")?.trim() || "",
    };

    if (editingTransaction) {
      dispatch(
        editTransaction({ id: editingTransaction.id, updatedData: transaction })
      );
    } else {
      dispatch(addTransaction(transaction));
    }

    setEditingTransaction(null);
    formRef.current.reset();
    setOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[#000000] dark:text-white gap-10 p-4 border-white md:p-8 w-full max-w-4xl mx-auto dark:border-l overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
        <div className="w-full flex flex-col justify-start items-start">
          <h1 className="text-3xl font-semibold mb-1">Transactions</h1>
          <p className="text-gray-500 text-sm md:text-md">
            Manage all your financial transactions
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTransaction(null);
            setOpen(true);
          }}
          className="w-fit px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700 transition font-medium text-base whitespace-nowrap"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      <div className="w-full flex flex-col items-start gap-4 border border-gray-300 rounded-2xl p-4">
        <span className="w-full flex justify-center items-center ml-4">
          <span className="mr-2">
            <Filter size={20} />{" "}
          </span>
          Filters
        </span>
        <div className="w-full flex flex-col sm:flex-row items-center gap-4 mt-4 ml-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 p-2 w-full rounded-lg min-w-[200px] border border-gray-300 dark:border-gray-700 bg-[#f5f5f7] dark:bg-zinc-900 text-gray-800 dark:text-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
            />
            <Search
              size={18}
              className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          </div>
          <Dropdown
            label="Category"
            placeholder="All"
            options={categories}
            className="w-full bg-[#f5f5f7] border-0 shadow rounded-xl min-w-[180px]"
          />
          <Dropdown
            label="Type"
            placeholder="All"
            options={types}
            className="bg-[#f5f5f7] border-0 shadow rounded-xl min-w-[180px]"
          />
        </div>
      </div>

      {/* Transactions List */}
      <div className="w-full flex flex-col justify-center items-center gap-4 border border-gray-300 p-4 rounded-2xl ">
        <div className="w-full flex justify-start items-start gap-2">
          <h1 className="text-md mb-1">Transactions</h1>
          <span>{`(${size})`}</span>
        </div>
        <div className="w-full flex flex-col gap-4 border border-gray-300 p-4 rounded-2xl">
          {sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl  bg-white border  dark:bg-[#000000] dark:text-white border-gray-100 shadow-sm hover:shadow transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`h-3 w-3 rounded-full ${
                    transaction.type === "expense"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="w-full flex flex-col min-w-0">
                  <span className="font-semibold text-base truncate">
                    {transaction.description}
                  </span>
                  <div className="w-full flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-xs font-medium text-gray-700">
                      {transaction.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {transaction.date}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    {transaction.note || ""}
                  </span>
                </div>
              </div>
              <div className="w-full flex items-center gap-4 mt-2 sm:mt-0">
                <span
                  className={`font-semibold text-lg ${
                    transaction.type === "expense"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {transaction.type === "expense" ? "-" : "+"}
                  <IndianRupee size={18} className="inline-block mb-0.5" />
                  {transaction.amount}
                </span>
                <button
                  onClick={() => {
                    setEditingTransaction(transaction);
                    setOpen(true);
                  }}
                  className="p-1 rounded hover:bg-gray-100 transition"
                  title="Edit"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  className="p-1 rounded hover:bg-red-50 transition"
                  title="Delete"
                >
                  <Trash2 size={20} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {open && (
        <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl w-full max-w-md mx-2 p-6 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={() => {
                setOpen(false);
                setEditingTransaction(null);
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
            </h2>
            <form
              ref={formRef}
              className="space-y-4"
              onSubmit={handleNewTransaction}
            >
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  placeholder="e.g., Grocery shopping"
                  defaultValue={editingTransaction?.description || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base"
                />
              </div>

              {/* Amount & Currency */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Amount
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 px-3">
                    <span className="text-gray-400 mr-2">$</span>
                    <input
                      type="number"
                      name="amount"
                      min="0"
                      step="0.01"
                      required
                      defaultValue={editingTransaction?.amount || ""}
                      className="w-full bg-transparent border-0 focus:ring-0 text-base py-2"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Currency
                  </label>
                  <select
                    name="currency"
                    required
                    defaultValue={editingTransaction?.currency || "USD"}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base"
                  >
                    <option value="USD">USD</option>
                    <option>INR</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                    <option>AUD</option>
                    <option>CAD</option>
                  </select>
                </div>
              </div>

              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction Type
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Expense</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="type"
                      className="sr-only peer"
                      defaultChecked={editingTransaction?.type === "income"}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-200 dark:bg-gray-700 rounded-full peer dark:peer-focus:ring-teal-800 transition-all peer-checked:bg-teal-600"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all peer-checked:translate-x-5"></div>
                  </label>
                  <span className="text-sm">Income</span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  required
                  defaultValue={editingTransaction?.category || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Calendar size={18} />
                  </span>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={editingTransaction?.date || ""}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base cursor-pointer"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  defaultValue={editingTransaction?.note || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base min-h-[60px]"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditingTransaction(null);
                  }}
                  className="flex-1 py-2 rounded-lg border border-gray-200 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition font-medium"
                >
                  {editingTransaction
                    ? "Update Transaction"
                    : "Add Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
