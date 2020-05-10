import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isFinishingProcess: false,
  doctorId: "",
  bookingId: "",
  status: "",
  bookingDateTime: "",
}

const nurseFinishingSlice = createSlice({
  name: "nurseFinishing",
  initialState: initialState,
  reducers: {
    startFinishingFlow(state, action) {
      return {
        isFinishingProcess: true,
        doctorId: action.payload.doctorId,
        bookingId: action.payload.bookingId,
        status: action.payload.status,
        bookingDateTime: action.payload.bookingDateTime,
      }
    },
    clearNurseFinishing() {
      return initialState
    },
  },
})

export const {
  startFinishingFlow,
  clearNurseFinishing,
} = nurseFinishingSlice.actions

export const nurseFinishingSelector = {
  getNurseFinishing: (state: any) => ({
    doctorId: state.nurseFinishing.doctorId,
    bookingId: state.nurseFinishing.bookingId,
    status: state.nurseFinishing.status,
    bookingDateTime: state.nurseFinishing.bookingDateTime,
  }),
  getIsFinishingFlow: (state: any) => state.nurseFinishing.isFinishingProcess,
  getDoctorId: (state: any) => state.nurseFinishing.doctorId,
}

export default nurseFinishingSlice.reducer
