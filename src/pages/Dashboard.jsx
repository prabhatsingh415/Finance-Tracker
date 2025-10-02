import React from "react";
import { useSelector } from "react-redux";
import { IndianRupee } from "lucide-react";
import ExpensePieChart from "../components/PieChart";

function Dashboard() {
  const transactions = useSelector((state) => state.transaction.list);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savings = totalIncome - totalExpenses;

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

  const expenseMap = {};

  const list = transactions.filter((t) => t.type === "expense");

  list.forEach((element) => {
    if (expenseMap[element.category]) {
      expenseMap[element.category] += Number(element.amount);
    } else {
      expenseMap[element.category] = Number(element.amount);
    }
  });

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const expenseData = Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[#000000] dark:text-white gap-10 p-4 md:p-8 w-full max-w-4xl mx-auto dark:border-l overflow-x-hidden">
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-3xl font-semibold mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm md:text-md">
          Welcome back! Here's your financial overview
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center gap-6 w-full">
        {data.map(({ id, title, value, color }) => (
          <div
            key={id}
            className="w-full sm:w-72 md:w-64 p-4 md:p-6 border border-gray-300 dark:border-gray-700 rounded-xl flex md:flex-col justify-around md:justify-center items-center gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {title}
            </span>
            <span
              className={`text-3xl md:text-4xl font-bold flex items-center ${color}`}
            >
              <IndianRupee size={28} className="mr-2" />
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center border border-gray-300 rounded-2xl p-2 overflow-x-auto min-h-[220px]">
        <div className="w-full max-w-xs flex items-center justify-center h-auto min-h-[300px] md:min-h-[320px] px-2">
          <ExpensePieChart data={expenseData} />
        </div>
      </div>

      <div className="w-fit md:w-full flex flex-col gap-3 border border-gray-300 rounded-2xl p-4 bg-white dark:bg-[#18181b] overflow-x-hidden">
        <span className="font-semibold text-base mb-2 ml-1">
          Recent Transactions
        </span>
        {sortedTransactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#f5f5f7] dark:bg-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`h-3 w-3 rounded-full ${
                  transaction.type === "expense" ? "bg-red-500" : "bg-green-500"
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
                <IndianRupee size={15} className="inline-block mb-0.5" />
                {transaction.amount}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {transaction.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
