import { createSlice } from "@reduxjs/toolkit";
const email = localStorage.getItem("name");
const isLogin = email ? true : false;
const initialLoginState = {
  isLogin: isLogin,
  isSignUp: false,
  token: JSON.parse(email),
};

// create slice
const LoginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    // login function set state to true
    login: (state) => {
      state.isLogin = true;
    },

    // logout function set state to false
    logout: (state) => {
      state.isLogin = false;
    },

    signUp: (state) => {
      state.isSignUp = !state.isSignUp;
    },
  },
});

export const loginAction = LoginSlice.actions;
export default LoginSlice.reducer;
