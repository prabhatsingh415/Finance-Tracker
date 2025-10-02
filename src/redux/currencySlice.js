import { createSlice } from "@reduxjs/toolkit";

const persisted = localStorage.getItem("baseCurrency") || "INR";

const currencySlice = createSlice({
  name: "currency",
  initialState: { base: persisted },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.base = action.payload;
      localStorage.setItem("baseCurrency", action.payload);
    },
  },
});

export const { setBaseCurrency } = currencySlice.actions;
export default currencySlice.reducer;
