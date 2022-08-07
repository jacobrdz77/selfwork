import { Client, Project, User } from "@prisma/client";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createClient } from "../lib/clientFunctions";
import { createProject } from "../lib/projectsFunctions";
import { createTask } from "../lib/tasksFunctions";

const getUserData = () => {
  fetch("/api/user");
};

//*** Add Project Modal ***//
export const addProjectModalFormSlice = createSlice({
  name: "ProjectForm",
  initialState: {
    name: "",
    isNameError: false,
    isNameTouched: false,
    selectedclient: "",
    isClientTouched: false,
    isClientError: false,
    description: "",
    priority: "NONE",
    startDate: new Date(),
    endDate: null,
    isFirstFormValid: false,
    isFormValid: false,
    hourlyRate: 0,
    page: "1",
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedClient(state, action) {
      state.selectedclient = action.payload;
    },
    setClient(state, action) {
      state.selectedclient = action.payload;
    },
    setIsNameError(state, action) {
      state.isNameError = action.payload;
    },
    setIsClientError(state, action) {
      state.isClientError = action.payload;
    },
    setIsNameTouched(state, action) {
      state.isNameTouched = action.payload;
    },
    setIsClientTouched(state, action) {
      state.isClientTouched = action.payload;
    },
    setIsFirstFormValid(state, action) {
      state.isFirstFormValid = action.payload;
    },
    setFormValid(state, action) {
      state.isFormValid = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setHourlyRate: (state, action) => {
      state.hourlyRate = action.payload;
    },
    submitProject(state, action) {
      createProject(action.payload);
      this.reset(state);
    },
    reset(state) {
      state.name = "";
      state.isNameError = false;
      state.isNameTouched = false;
      state.selectedclient = "";
      state.isClientTouched = false;
      state.isClientError = false;
      state.description = "";
      state.hourlyRate = 0;
      state.priority = "NONE";
      state.startDate = new Date();
      state.endDate = null;
      state.isFirstFormValid = false;
      state.isFormValid = false;
    },
  },
});

//*** Session ***//
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

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

//*** Client ***/

// slice of the client form state
export const clientFormSlice = createSlice({
  name: "clientForm",
  initialState: {
    name: "",
    userId: "",
    isNameError: false,
    description: "",
    phone: "",
    email: "",
    website: "",
    businessAdress: "",
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setWebsite(state, action) {
      state.website = action.payload;
    },
    setBusinessAdress(state, action) {
      state.businessAdress = action.payload;
    },
    setIsNameError(state, action) {
      state.isNameError = action.payload;
    },
    reset(state) {
      state.name = "";
      state.isNameError = false;
      state.description = "";
      state.phone = "";
      state.email = "";
      state.website = "";
      state.businessAdress = "";
    },
    submitClient(state, action) {
      createClient(action.payload.client);
      this.reset(state);
    },
  },
});

//** Task Form ***/
export const taskFormSlice = createSlice({
  name: "taskForm",
  initialState: {
    name: "",
    isNameError: false,
    description: "",
    startDate: new Date(),
    dueDate: null,
    projectId: "",
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload.name;
    },
    setProjectId(state, action) {
      state.projectId = action.payload.projectId;
    },
    setIsNameError(state, action) {
      state.isNameError = action.payload.isNameError;
    },
    setDescription(state, action) {
      state.description = action.payload.description;
    },
    setStartDate(state, action) {
      state.startDate = action.payload.startDate;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload.dueDate;
    },
    reset(state) {
      state.name = "";
      state.isNameError = false;
      state.description = "";
      state.startDate = new Date();
      state.dueDate = null;
      state.projectId = "";
    },
    submitTask(state, action) {
      createTask(action.payload.task);
      state.name = "";
      state.isNameError = false;
      state.description = "";
      state.startDate = new Date();
      state.dueDate = null;
      state.projectId = "";
    },
  },
});

//** User Form ***/
// export const userFormSlice = createSlice({
//   name: "userForm",
//   initialState: {
//     //data of user
//     //name, email, image,
//   },
// });

export const store = configureStore({
  reducer: {
    userSession: sessionSlice.reducer,
    addProjectModalForm: addProjectModalFormSlice.reducer,
    clientForm: clientFormSlice.reducer,
  },
});

export const sessionActions = sessionSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
