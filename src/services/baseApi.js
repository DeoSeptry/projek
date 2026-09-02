import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setSession, clearSession } from "../store/authSlice";
import { clearAuthUser, saveAuthUser } from "../utils/authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Buat instance mutex untuk mencegah race condition saat refresh token
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL, // Pastikan ini berakhiran dengan '/api/v1' agar path cookie cocok
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("accept", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Tunggu jika ada proses refresh token yang sedang berjalan
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Cek apakah mutex sedang tidak terkunci
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Coba dapatkan token baru
        // Pastikan endpoint ini sesuai dengan path backend. Jika methodnya POST, ubah jadi POST.
        const refreshResult = await baseQuery(
          { url: '/auth/refresh-token', method: 'GET' }, 
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const newAccessToken = refreshResult.data.data.accessToken;
          
          // Update Redux state
          api.dispatch(setSession({ accessToken: newAccessToken }));
          
          // Update Local Storage
          const { user, role } = api.getState().auth;
          saveAuthUser({ user, role, accessToken: newAccessToken });

          // Ulangi request asli yang gagal
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Jika refresh token gagal (misal expired), logout user
          api.dispatch(clearSession());
          clearAuthUser();
        }
      } finally {
        // Lepas kunci agar request lain yang mengantre bisa melanjutkan proses
        release();
      }
    } else {
      // Jika mutex terkunci, berarti ada request lain yang sedang melakukan refresh token.
      // Tunggu sampai refresh token itu selesai, lalu ulangi request asli.
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Transactions", "Students", "Teachers", "Profile", "Parents"],
  endpoints: () => ({}),
});