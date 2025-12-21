import { baseApi } from "../baseApi";
import { ENDPOINTS } from "../endpoints";
import { setSession, clearSession } from "../../store/authSlice";
import { clearAuthUser, saveAuthUser } from "../../utils/authStorage";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
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
        }
      },
      invalidatesTags: [{ type: "Auth", id: "SESSION" }],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: ENDPOINTS.AUTH.REFRESH,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          const accessToken = res?.data?.accessToken ?? null;
          if (accessToken) dispatch(setSession({ accessToken }));
        } catch {
          dispatch(clearSession());
          clearAuthUser();
        }
      },
      invalidatesTags: [{ type: "Auth", id: "SESSION" }],
    }),

    logout: builder.mutation({
      query: () => ({
        url: ENDPOINTS.AUTH.LOGOUT,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearSession());
          clearAuthUser();
          dispatch(baseApi.util.resetApiState());
        }
      },
      invalidatesTags: [{ type: "Auth", id: "SESSION" }],
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApi;
