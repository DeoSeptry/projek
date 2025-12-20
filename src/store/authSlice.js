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
      state.user = action.payload?.user ?? state.user;
      state.role = action.payload?.role ?? state.role;
      state.accessToken = action.payload?.accessToken ?? state.accessToken;
      state.isAuthenticated = Boolean(state.accessToken);
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
