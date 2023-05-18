import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./login-slice";
export default configureStore({
  reducer: {
    login: LoginSlice,
  },
});
