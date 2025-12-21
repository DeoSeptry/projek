import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearSession, setSession } from "../store/authSlice";
import { clearAuthUser } from "../utils/authStorage";

let refreshPromise = null;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL, 
  credentials: "include", 
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const REFRESH_URL = "/auth/refresh-token"; 

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const is401 = result?.error?.status === 401;
  const isRefreshCall =
    typeof args === "object" && args?.url && String(args.url).includes(REFRESH_URL);

  if (is401 && !isRefreshCall) {
    if (!refreshPromise) {
      refreshPromise = rawBaseQuery(
        { url: REFRESH_URL, method: "POST" },
        api,
        extraOptions
      )
        .then((refreshRes) => {
          const newToken = refreshRes?.data?.data?.accessToken;
          if (newToken) {
            api.dispatch(setSession({ accessToken: newToken }));
            return true;
          }
          return false;
        })
        .catch(() => false)
        .finally(() => {
          refreshPromise = null;
        });
    }

    const ok = await refreshPromise;

    if (ok) {
      return rawBaseQuery(args, api, extraOptions);
    }

    api.dispatch(clearSession());
    clearAuthUser();
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
