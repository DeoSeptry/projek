import { createSlice } from "@reduxjs/toolkit";
import { loadAuthUser } from "../utils/authStorage";

const stored = loadAuthUser();

const initialState = {
  user: stored?.user ?? null,
  role: stored?.role ?? null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      const p = action.payload || {};
      state.user = p.user ?? state.user;
      state.role = p.role ?? state.role;
      
      // Hanya set accessToken jika benar-benar ada
      if (p.accessToken) {
        state.accessToken = p.accessToken;
        state.isAuthenticated = true;
      }
    },
    clearSession(state) {
      state.user = null;
      state.role = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectUser = (state) => state.auth.user;
