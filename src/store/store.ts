import { Client, Project, User } from "@prisma/client";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const getUserData = () => {
  fetch("/api/user");
};

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    image: "",
    projects: [] as Project[],
    clients: [] as Client[],
  },
};

//create a slice of the state for session
export const sessionSlice = createSlice({
  name: "session",
  initialState,

  reducers: {
    addProject: (state, action) => {
      state.user.projects = [...state.user.projects, action.payload];
    },
    addClient: (state, action) => {
      state.user.clients = [...state.user.clients, action.payload];
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { session: sessionSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
