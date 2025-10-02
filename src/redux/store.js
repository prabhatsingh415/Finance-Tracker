import { configureStore } from "@reduxjs/toolkit";
import transaction from "./transactionalSlice";
import budget from "./budgetSlice";
import theme from "./themeSlice";
import { currencyApi } from "./currencyApiSlice";
import currency from "./currencySlice";

const store = configureStore({
  reducer: {
    transaction,
    budget,
    theme,
    currency,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),
});

export default store;
