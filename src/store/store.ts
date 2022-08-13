import { configureStore } from "@reduxjs/toolkit";
import addProjectModalFormSlice from "./slices/addProjectFormSlice";
import { clientFormSlice } from "./slices/clientFormSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    addProjectModalForm: addProjectModalFormSlice.reducer,
    clientForm: clientFormSlice.reducer,
  },
});

export const sessionActions = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
