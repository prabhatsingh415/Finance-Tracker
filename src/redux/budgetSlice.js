import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ category: "food & dining", budget: 1400 }];

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudget: (state, action) => {
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

export const { addBudget, updateBudget, deleteBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
