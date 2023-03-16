import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  displayName: null,
  userEmail: null,
  userAvatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      displayName: payload.displayName,
      userEmail: payload.email,
      userAvatar: payload.avatar,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.avatar,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});
