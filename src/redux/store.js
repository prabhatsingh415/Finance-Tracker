import { configureStore } from "@reduxjs/toolkit";
import transaction from "./transactionalSlice";
import budget from "./budgetSlice";
import theme from "./themeSlice";
import { currencyApi } from "./currencyApiSlice";

const store = configureStore({
  reducer: {
    transaction,
    budget,
    theme,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),
});

export default store;
