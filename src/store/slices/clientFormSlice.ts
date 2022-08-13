import { createSlice } from "@reduxjs/toolkit";

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
      //! Create a thunk
      //   createClient(action.payload.client);
      this.reset(state);
    },
  },
});
