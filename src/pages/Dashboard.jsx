import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ExpensePieChart from "../components/PieChart";
import CurrencyType from "../components/CurrencyType";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

function Dashboard() {
  const convert = useCurrencyConverter();
  const baseCurrency = useSelector((state) => state.currency.base);
  const transactions = useSelector((state) => state.transaction.list);

  // Memoize total calculations
  const { totalIncome, totalExpenses, savings } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + convert(t.amount, t.currency), 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + convert(t.amount, t.currency), 0);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      savings: income - expenses,
    };
  }, [transactions, convert]);

  const data = [
    {
      id: 1,
      title: "Total Income",
      value: totalIncome,
      color: "text-green-500",
    },
    {
      id: 2,
      title: "Total Expenses",
      value: totalExpenses,
      color: "text-red-500",
    },
    {
      id: 3,
      title: "Savings",
      value: savings,
      color: savings < 0 ? "text-red-500" : "text-green-500",
    },
  ];

  // Prepare expense data for Pie Chart
  const expenseMap = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const converted = convert(t.amount, t.currency);
      if (expenseMap[t.category]) expenseMap[t.category] += converted;
      else expenseMap[t.category] = converted;
    });

  const expenseData = Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value,
  }));

  // Sort transactions by date descending
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div
      className="flex flex-col justify-center items-center bg-white dark:bg-[#000000] dark:text-white gap-10 p-4 md:p-8 w-full max-w-4xl mx-auto  
      overflow-x-hidden"
    >
      {/* Dashboard Title */}
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-3xl font-semibold mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm md:text-md">
          Welcome back! Here's your financial overview
        </p>
      </div>

      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-around items-center gap-6 w-full">
        {data.map(({ id, title, value, color }) => (
          <div
            key={id}
            className="w-full sm:w-72 md:w-full p-4 md:p-6 border border-gray-300 dark:border-gray-700 rounded-xl flex md:flex-col justify-around md:justify-center items-center gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {title}
            </span>
            <span
              className={`text-3xl md:text-4xl font-bold flex items-center ${color}`}
            >
              <CurrencyType
                baseCurrency={baseCurrency}
                iconSize="28"
                className="mr-2"
              />
              {value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Pie Chart (only if there are expenses) */}
      {expenseData.length > 0 && (
        <div className="w-full flex justify-center items-center border border-gray-300 rounded-2xl p-2 overflow-x-auto min-h-[220px]">
          <div className="w-full max-w-xs flex items-center justify-center h-auto min-h-[300px] md:min-h-[320px] px-2">
            <ExpensePieChart data={expenseData} />
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      {sortedTransactions.length > 0 && (
        <div className="w-fit md:w-full flex flex-col gap-3 border border-gray-300 rounded-2xl p-4 bg-white dark:bg-[#000000] overflow-x-hidden">
          <span className="font-semibold text-base mb-2 ml-1">
            Recent Transactions
          </span>
          {sortedTransactions.slice(0, 5).map((transaction) => {
            const convertedAmount = convert(
              transaction.amount,
              transaction.currency
            );
            return (
              <div
                key={transaction.id}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#f5f5f7] dark:border border-[#f5f5f7] dark:bg-[#000000] shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
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
                    <span className="text-xs text-gray-500 truncate">
                      {transaction.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end min-w-[70px]">
                  <span
                    className={`font-bold text-base ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    <CurrencyType
                      baseCurrency={baseCurrency}
                      iconSize="18"
                      className="inline-block mb-0.5"
                    />
                    {convertedAmount.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {transaction.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
