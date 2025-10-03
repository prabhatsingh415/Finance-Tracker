import { createSlice } from "@reduxjs/toolkit";

// Load saved budgets from localStorage
const savedBudgets = JSON.parse(localStorage.getItem("budgets"));

// Initial state: use saved budgets or empty, add currency if missing (assume INR for old)
const initialBudgets =
  savedBudgets && savedBudgets.length > 0
    ? savedBudgets.map((b) => ({ ...b, currency: b.currency || "INR" }))
    : [];

// Ensure localStorage always has initial budgets
if (!savedBudgets || savedBudgets.length === 0) {
  localStorage.setItem("budgets", JSON.stringify([]));
}

const budgetSlice = createSlice({
  name: "budget",
  initialState: initialBudgets,
  reducers: {
    addBudget: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("budgets", JSON.stringify(state));
    },
    updateBudget: (state, action) => {
      const index = state.findIndex(
        (b) => b.category === action.payload.category
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem("budgets", JSON.stringify(state));
      }
    },
    deleteBudget: (state, action) => {
      const newState = state.filter((b) => b.category !== action.payload);
      localStorage.setItem("budgets", JSON.stringify(newState));
      return newState;
    },
    clearBudgets: () => {
      localStorage.removeItem("budgets");
      return [];
    },
  },
});

export const { addBudget, updateBudget, deleteBudget, clearBudgets } =
  budgetSlice.actions;

export default budgetSlice.reducer;
