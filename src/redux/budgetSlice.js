import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // demo entry (optional, testing ke liye)
  { category: "food", budget: 1400 },
];

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.push(action.payload);
    },
    updateBudget: (state, action) => {
      const budgetItem = state.find(
        (t) => t.category === action.payload.category
      );
      if (budgetItem) {
        budgetItem.budget = action.payload.budget;
      }
    },
    deleteBudget: (state, action) => {
      return state.filter((t) => t.category !== action.payload);
    },
  },
});

export const { setBudget, updateBudget, deleteBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
