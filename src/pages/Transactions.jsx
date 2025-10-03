import { Filter, Search, Trash2, SquarePen, Plus } from "lucide-react";
import React, { useMemo, useState } from "react";
import Dropdown from "../components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../redux/transactionalSlice";
import CurrencyType from "../components/CurrencyType";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

function Transactions({
  open,
  setOpen,
  editingTransaction,
  setEditingTransaction,
}) {
  const baseCurrency = useSelector((state) => state.currency.base);
  const convert = useCurrencyConverter();
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
  const types = ["Income", "Expense"];

  const transactions = useSelector((state) => state.transaction.list);
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const size = transactions.length;

  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransaction(id));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredTransactions = useMemo(() => {
    let result = [...sortedTransactions];

    if (searchQuery.trim()) {
      result = result.filter((t) =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (selectedType) {
      result = result.filter(
        (t) => t.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    return result;
  }, [searchQuery, selectedCategory, selectedType, sortedTransactions]);

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[#000000] dark:text-white gap-10 p-4 md:p-8 w-full max-w-4xl mx-auto overflow-x-hidden">
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
            setTimeout(() => setOpen(true), 0);
          }}
          className="hidden w-fit px-4 py-2 bg-teal-600 text-white rounded-lg md:flex items-center gap-2 hover:bg-teal-700 transition font-medium text-base whitespace-nowrap"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      <div className="w-full flex flex-col items-start gap-4 border border-gray-300 rounded-2xl p-4">
        <span className="w-full flex items-center text-base font-semibold mb-1">
          <span className="mr-2">
            <Filter size={20} />
          </span>
          Filters
        </span>
        <div className="w-full flex flex-col gap-3 md:flex-row md:gap-4 md:items-center mt-2">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 p-2 w-full rounded-lg border-0 bg-[#f5f5f7] dark:bg-zinc-900 text-gray-800 dark:text-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Dropdown
              onChange={(value) => setSelectedCategory(value)}
              placeholder="All Categories"
              options={categories}
              className="w-full bg-[#f5f5f7] border-0 shadow rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Dropdown
              onChange={(value) => setSelectedType(value)}
              placeholder="All Types"
              options={types}
              className="w-full bg-[#f5f5f7] border-0 shadow rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-md md:max-w-none flex flex-col gap-3 border border-gray-300 rounded-2xl p-4 bg-white dark:bg-[#000000]">
          <span className="font-semibold text-base mb-2 ml-1">
            Transactions ({filteredTransactions.length})
          </span>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 md:p-4 rounded-xl bg-[#f5f5f7] dark:bg-[#000000] shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 min-w-0 md:w-1/2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      transaction.type === "expense"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-base truncate">
                      {transaction.description}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-xs font-medium text-gray-700">
                        {transaction.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {transaction.date}
                      </span>
                    </div>
                    {transaction.note && (
                      <span className="text-xs text-gray-500 mt-1 truncate">
                        {transaction.note}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 md:w-1/2 md:justify-end mt-2 md:mt-0 flex-wrap md:flex-nowrap">
                  <span
                    className={`font-bold text-base md:text-lg flex items-center gap-1 min-w-[100px] truncate ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    <span>{transaction.type === "expense" ? "-" : "+"}</span>
                    <CurrencyType
                      baseCurrency={baseCurrency}
                      iconSize="18"
                      className="inline-block mb-0.5"
                    />
                    <span className="truncate">
                      {convert(transaction.amount, transaction.currency)}
                    </span>
                  </span>

                  <button
                    onClick={() => {
                      setEditingTransaction(transaction);
                      setTimeout(() => setOpen(true), 0);
                    }}
                    className="p-1 rounded hover:bg-gray-100 transition shrink-0"
                    title="Edit"
                  >
                    <SquarePen size={20} />
                  </button>

                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="p-1 rounded hover:bg-red-50 transition shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No transactions found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
