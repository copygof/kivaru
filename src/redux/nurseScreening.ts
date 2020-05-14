import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  doctorId: "",
  bookingId: "",
  status: "",
  screeningDetail: {
    evaluation: "",
    temperature: "",
    nurseComment: "",
    status: "",
  },
  bookingDateTime: "",
}

const nurseScreeningSlice = createSlice({
  name: "nurseScreening",
  initialState: initialState,
  reducers: {
    refToDocPrepared(state, action) {
      return action.payload
    },
    clearScreening() {
      return initialState
    },
  },
})

export const { refToDocPrepared, clearScreening } = nurseScreeningSlice.actions

export const nurseScreeningSelector = {
  getNurseScreening: (state: any) => state.nurseScreening,
  getNurseScreeningIsRefToDoc: (state: any) =>
    state.nurseScreening.screeningDetail.status === "referToDoctor",
  getDoctorId: (state: any) => state.nurseScreening.doctorId,
}

export default nurseScreeningSlice.reducer
