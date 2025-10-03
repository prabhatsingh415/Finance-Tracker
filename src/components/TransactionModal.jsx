import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../redux/transactionalSlice";
import { Calendar } from "lucide-react";

function TransactionModal({
  open,
  setOpen,
  editingTransaction,
  setEditingTransaction,
}) {
  const dispatch = useDispatch();

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

  // Controlled state for all fields
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [type, setType] = useState("expense"); // "expense" or "income"
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description || "");
      setAmount(editingTransaction.amount || "");
      setCurrency(editingTransaction.currency || "INR");
      setType(editingTransaction.type || "expense");
      setCategory(editingTransaction.category || "");
      setDate(editingTransaction.date || "");
      setNote(editingTransaction.note || "");
    } else {
      // reset fields for adding new transaction
      setDescription("");
      setAmount("");
      setCurrency("INR");
      setType("expense");
      setCategory("");
      setDate("");
      setNote("");
    }
  }, [editingTransaction]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      description: description.trim(),
      amount: parseFloat(amount),
      currency,
      type,
      category,
      date,
      note: note.trim() || "",
    };

    if (editingTransaction) {
      dispatch(
        editTransaction({ id: editingTransaction.id, updatedData: transaction })
      );
    } else {
      dispatch(addTransaction(transaction));
    }

    // Reset form
    setEditingTransaction(null);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60">
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
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base"
            />
          </div>

          {/* Amount & Currency */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <div className="flex items-center bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 px-3">
                <span className="text-gray-400 mr-2">$</span>
                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent border-0 focus:ring-0 text-base py-2"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                name="currency"
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:bg-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base"
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
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
                  checked={type === "income"}
                  onChange={(e) =>
                    setType(e.target.checked ? "income" : "expense")
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-200 dark:bg-gray-700 rounded-full peer-checked:bg-teal-600 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all peer-checked:translate-x-5"></div>
              </label>
              <span className="text-sm">Income</span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              {editingTransaction ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
