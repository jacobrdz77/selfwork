import { Client, Project } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
//*** User ***//
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "cl6saletw002362gpbq4yq7o7",
      name: "",
      email: "",
      image: "",
      projects: [] as Project[],
      clients: [] as Client[],
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.image = action.payload.image;
      state.user.projects = action.payload.projects;
      state.user.clients = action.payload.clients;
    },

    addProject: (state, action) => {
      state.user.projects = [...state.user.projects, action.payload];
    },
    addClient: (state, action) => {
      state.user.clients = [...state.user.clients, action.payload];
    },
  },
});
