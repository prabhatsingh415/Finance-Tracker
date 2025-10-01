import { createSlice, nanoid } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [
      {
        id: 1,
        type: "income",
        description: "Salary Deposite",
        amount: 5000,
        category: "Salary",
        date: "2025-10-01",
      },
      {
        id: 2,
        type: "expense",
        description: "Grocery Shopping",
        amount: 1200,
        category: "Food",
        date: "2025-10-02",
      },
      {
        id: 3,
        description: "Gas Station",
        amount: 1000,
        type: "expense",
        category: "Transportation",
        date: "2024-06-13",
      },
      {
        id: 4,
        description: "Movie Tickets",
        amount: 500,
        type: "expense",
        category: "Entertainment",
        date: "2024-06-12",
      },
      {
        id: 5,
        description: "Freelance Work",
        amount: 800,
        type: "income",
        category: "Freelance",
        date: "2024-06-11",
      },
      {
        id: 6,
        description: "Bought Course",
        amount: 600,
        type: "expense",
        category: "Education",
        date: "2024-06-12",
      },
    ],
  },
  reducers: {
    addTransactions: (state, action) => {
      state.list.push({
        id: nanoid(),
        ...action.payload,
      });
    },

    editTransaction: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
      }
    },

    deleteTransaction: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
