import { createSlice } from "@reduxjs/toolkit"

const initialStateUser = {
  isRemember: false,
  id: "",
  userGroup: "patient",
  address: {
    country: "",
    addressLine3: "",
    postCode: "",
    addressLine2: "",
    zip: "",
    address: "",
    addressLine1: "",
    city: "",
    state: "",
  },
  profile: {
    imageProfile: "",
    lastName: "",
    gender: "",
    firstName: "",
    phoneNumber: "",
    dob: {
      seconds: -1,
      nanoseconds: -1,
    },
    email: "",
  },
  account: {
    identity: {
      phoneNumber: {},
      google: {},
      facebook: {},
    },
    identityChannel: "phoneNumber",
    tempPassword: "",
    isForceResetPassword: false,
    type: "normal",
    isCompleteRegister: false,
  },
}

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    initUser(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    clearUser() {
      return initialStateUser
    },
  },
})

export const { initUser, clearUser, updateUser } = userSlice.actions

export const fullNameSelector = (state: any) =>
  `${state.user.profile.firstName} ${state.user.profile.lastName}`

export const userIdSelector = (state: any) => state.user.id
export const userIsRememberSelector = (state: any) => state.user.isRemember
export const userProfileSelector = (state: any) => state.user.profile

export default userSlice.reducer
