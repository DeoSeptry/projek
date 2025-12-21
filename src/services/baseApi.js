import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // kalau refresh token pakai cookie
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth", "Transactions", "Students", "Teachers", "Profile"],
  endpoints: () => ({}),
});
