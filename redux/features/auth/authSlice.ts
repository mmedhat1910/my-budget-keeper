import { createSlice } from '@reduxjs/toolkit';
import User from '../../../interfaces/User';
import { HydratedDocument } from 'mongoose';
import { RootState } from '../../store';
export type AuthState = {
  loggedIn: boolean;
  user: HydratedDocument<User> | any | undefined;
  token: string | undefined;
};

const initialState: { value: AuthState } = {
  value: {
    loggedIn: false,
    user: undefined,
    token: undefined,
  },
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = {
        user: action.payload.user,
        loggedIn: true,
        token: action.payload.token,
      };
    },

    logout: (state, action) => {
      state.value = {
        user: undefined,
        loggedIn: false,
        token: undefined,
      };
    },
  },
});

export const selectAuth = (state: RootState) => state.auth.value;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
