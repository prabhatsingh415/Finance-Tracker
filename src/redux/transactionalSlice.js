import { createSlice, nanoid } from "@reduxjs/toolkit";

// Get saved transactions from localStorage
const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

// Default transactions if none in localStorage
const defaultTransactions = [
  {
    id: "1",
    type: "income",
    currency: "INR",
    description: "Salary Deposite",
    amount: 5000,
    category: "Salary",
    date: "2025-10-01",
  },
  {
    id: "2",
    type: "expense",
    currency: "INR",
    description: "Grocery Shopping",
    amount: 1200,
    category: "Food",
    date: "2025-10-02",
  },
  {
    id: "3",
    type: "expense",
    currency: "INR",
    description: "Gas Station",
    amount: 1000,
    category: "Transportation",
    date: "2024-06-13",
  },
  {
    id: "4",
    type: "expense",
    currency: "INR",
    description: "Movie Tickets",
    amount: 500,
    category: "Entertainment",
    date: "2024-06-12",
  },
  {
    id: "5",
    type: "income",
    currency: "INR",
    description: "Freelance Work",
    amount: 800,
    category: "Freelance",
    date: "2024-06-11",
  },
  {
    id: "6",
    type: "expense",
    currency: "INR",
    description: "Bought Course",
    amount: 600,
    category: "Education",
    date: "2024-06-12",
  },
];

// Use saved transactions if exist, otherwise default
const initialTransactions =
  savedTransactions && savedTransactions.length > 0
    ? savedTransactions
    : defaultTransactions;

// Ensure localStorage always has initial transactions
if (!savedTransactions || savedTransactions.length === 0) {
  localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    list: initialTransactions,
  },
  reducers: {
    addTransaction: (state, action) => {
      const transaction = { id: nanoid(), ...action.payload };
      state.list.push(transaction);
      localStorage.setItem("transactions", JSON.stringify(state.list));
    },
    editTransaction: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
        localStorage.setItem("transactions", JSON.stringify(state.list));
      }
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.list));
    },
    clearTransactions: (state) => {
      state.list = [];
      localStorage.removeItem("transactions");
    },
  },
});

export const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  clearTransactions,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
