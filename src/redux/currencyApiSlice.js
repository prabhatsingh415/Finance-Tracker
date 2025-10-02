import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_API_KEY;

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://v6.exchangerate-api.com/v6/${API_KEY}/`,
  }),
  endpoints: (builder) => ({
    getRates: builder.query({
      query: (baseCurrency) => `latest/${baseCurrency}`,
    }),
  }),
});

export const { useGetRatesQuery } = currencyApi;
