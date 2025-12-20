import { api } from "./api";
import { setSession, clearSession } from "../store/authSlice";
import { saveAuthUser, clearAuthUser } from "../utils/authStorage";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          const d = res?.data;

          const user = d ? { id: d.id, username: d.username, email: d.email } : null;
          const role = d?.role ?? null;
          const accessToken = d?.accessToken ?? null;

          dispatch(setSession({ user, role, accessToken }));
          saveAuthUser({ user, role });
        } catch {
          dispatch(clearSession());
          clearAuthUser();
        }
      },
    }),

    refreshToken: builder.mutation({
      query: () => ({ url: "/auth/refresh-token", method: "GET" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          const accessToken = res?.data?.accessToken;
          if (accessToken) dispatch(setSession({ accessToken }));
        } catch {
          dispatch(clearSession());
          clearAuthUser();
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearSession());
          clearAuthUser();
          dispatch(api.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApi;
