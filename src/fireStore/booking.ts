import { createUser, UserSchema } from "./user"
import db from "../config/firestore"
import { type } from "os"
import {
  snapshotOneOfList,
  loggingError,
  loggingSuccess,
  snapshotAll,
  snapshotOne,
  removeUserNameAndPassword,
} from "./utils"
import { getDoctorById } from "./doctor"

const booking = {
  _id: "",
  parent_id: "",
  requestBy: "user_id",
  requestTo: "doctor_id",
  state: "", // waitForScreening, scanning ,waitForDoctor, diagnosing, diagnosed
  status: "", // booking, cancel, complete, completeWithCondition
  datetime: "",
  symptom: "",
  dayOfSymptom: 0,
  attachment: "",
  updateBy: "nurse_id",
  doctorComment: "",
  isSendingToSpecialized: false,
  sendingDetail: {
    department: "",
  },
  createData: "",
  updateDate: "",
}

export type BookingSchema = {
  parent_id: string
  datetime: Date
  symptom: string
  dayOfSymptom: number
  attachment: string
  state:
    | "waitForScreening"
    | "scanning"
    | "waitForDoctor"
    | "diagnosing"
    | "diagnosed"
  status: "booking" | "cancel" | "complete" | "completeWithCondition"
  doctorComment: string
  isSendingToSpecialized: boolean
  sendingDetail: {
    department: string
  }
  requestBy: string
  requestTo: string
  updateBy: string
  createData: Date
  updateDate: Date
}

export async function createBooking(booking: {
  requestBy: BookingSchema["requestBy"]
  requestTo: BookingSchema["requestTo"]
  symptom: BookingSchema["symptom"]
  dayOfSymptom: BookingSchema["dayOfSymptom"]
  attachment: BookingSchema["attachment"]
  datetime: BookingSchema["datetime"]
}) {
  const addResult = await db.collection("booking").add({
    parent_id: "",
    state: "waitForScreening",
    status: "booking",
    requestBy: booking.requestBy,
    requestTo: booking.requestTo,
    datetime: booking.datetime,
    symptom: booking.symptom,
    dayOfSymptom: booking.dayOfSymptom,
    attachment: booking.attachment,
    updateBy: "",
    doctorComment: "",
    isSendingToSpecialized: false,
    sendingDetail: {
      department: "",
    },
    createData: new Date(),
    updateDate: new Date(),
  })

  return addResult.get().then(snapshotOne)
}

export async function getBookingByUserId(userId: string) {
  //   datetime
  // fullName
  // detail
  const bookingList = await db
    .collection("booking")
    .where("requestBy", "==", userId)
    .get()
    .then(snapshotAll)
    .then(loggingSuccess("Get booking list by user id"))
    .catch(loggingError("Get booking list by user id"))

  const result = await Promise.all(
    bookingList.map(async (booking: BookingSchema) => {
      const doctor = await getDoctorById(booking.requestTo)
      return {
        ...booking,
        doctor,
      }
    })
  )

  return result
}
