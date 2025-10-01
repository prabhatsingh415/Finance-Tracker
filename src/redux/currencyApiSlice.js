import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://v6.exchangerate-api.com/v6/" }),
  endpoints: (builder) => ({
    getRates: builder.query({
      query: (apiKey) => `${apiKey}/latest/USD`,
    }),
  }),
});

export const { useGetRatesQuery } = currencyApi;
