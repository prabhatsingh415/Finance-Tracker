import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: savedTheme },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload; // "light" or "dark"
      localStorage.setItem("theme", state.mode);
      document.body.style.backgroundColor =
        state.mode === "light" ? "white" : "#000000";
    },
    toggleTheme: (state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      // just reuse setTheme logic
      state.mode = newMode;
      localStorage.setItem("theme", newMode);
      document.body.style.backgroundColor =
        newMode === "light" ? "white" : "#000000";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
