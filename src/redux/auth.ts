import { createSlice } from "@reduxjs/toolkit"

const initialStateAuth = {
  isAuthenticated: false,
  userId: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return initialStateAuth
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
