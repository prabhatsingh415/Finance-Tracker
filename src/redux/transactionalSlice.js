import { createSlice, nanoid } from "@reduxjs/toolkit";

// Get saved transactions from localStorage
const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

// Use saved transactions if exist, otherwise empty array
const initialTransactions =
  savedTransactions && savedTransactions.length > 0 ? savedTransactions : [];

// Ensure localStorage always has initial transactions
if (!savedTransactions || savedTransactions.length === 0) {
  localStorage.setItem("transactions", JSON.stringify([]));
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
