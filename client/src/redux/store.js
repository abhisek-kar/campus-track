import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlices";

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export default store;
