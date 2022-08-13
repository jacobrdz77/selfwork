import { configureStore, createSlice } from "@reduxjs/toolkit";

const addProjectModalFormSlice = createSlice({
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
    startDate: new Date().toDateString(),
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
      //! Add a thunk
      //   createProject(action.payload);
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
      state.startDate = new Date().toDateString();
      state.endDate = null;
    },
  },
});

export default addProjectModalFormSlice;
