import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: theme },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
      document.body.style.backgroundColor =
        state.mode === "light" ? "white" : "#000000";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
