import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteUserFaliure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteUserStart: (state) => {
      state.loading = true
    },
signOutSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    signOutFaliure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signOutStart: (state) => {
      state.loading = true
    }
  },
});

export const {
  deleteUserSuccess,
  deleteUserFaliure,
  deleteUserStart,
  signInStart,
  signInSuccess,
  signInFaliure,
  updateUserStart,
  updateUserSuccess,
  updateUserFaliure,
  signOutFaliure,
  signOutStart,
  signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;
