import { createSlice } from "@reduxjs/toolkit";

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
      //! Need a thunk
      //   createTask(action.payload.task);
      state.name = "";
      state.isNameError = false;
      state.description = "";
      state.startDate = new Date();
      state.dueDate = null;
      state.projectId = "";
    },
  },
});
