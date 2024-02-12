import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    error: null,
    success: null,
    info: null,
    notice: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setNotice: (state, action) => {
      state.notice = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearInfo: (state) => {
      state.info = null;
    },
    clearNotice: (state) => {
      state.notice = null;
    },
  },
});

export const {
  setError,
  setInfo,
  setNotice,
  setSuccess,
  clearError,
  clearInfo,
  clearNotice,
  clearSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;

//Selectors
export const selectNotificationError = (store) => store.notification.error;
export const selectNotificationSuccess = (store) => store.notification.success;
export const selectNotificationInfo = (store) => store.notification.info;
export const selectNotificationNotice = (store) => store.notification.notice;
