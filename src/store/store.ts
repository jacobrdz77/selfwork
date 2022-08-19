import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
  },
});

export const sessionActions = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
