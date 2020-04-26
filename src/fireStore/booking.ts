import { createUser, UserSchema, getUserById } from "./user"
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
import moment from "moment"

// const booking = {
//   _id: "",
//   parent_id: "",
//   requestBy: "user_id",
//   requestTo: "doctor_id",
//   state: "", // waitForScreening, scanning ,waitForDoctor, diagnosing, diagnosed
//   status: "", // booking, cancel, complete, completeWithCondition
//   datetime: "",
//   symptom: "",
//   dayOfSymptom: 0,
//   attachment: "",
//   updateBy: "nurse_id",
//   doctorComment: "",
//   isSendingToSpecialized: false,
//   sendingDetail: {
//     department: "",
//   },
//   createData: "",
//   updateDate: "",
// }

// export type BookingsSchema = {
//   parent_id: string
//   datetime: Date
//   symptom: string
//   dayOfSymptom: number
//   attachment: string
//   state:
//     | "waitForScreening"
//     | "scanning"
//     | "waitForDoctor"
//     | "diagnosing"
//     | "diagnosed"
//   status: "booking" | "cancel" | "complete" | "completeWithCondition"
//   doctorComment: string
//   isSendingToSpecialized: boolean
//   sendingDetail: {
//     department: string
//   }
//   requestBy: string
//   requestTo: string
//   updateBy: string
//   createData: Date
//   updateDate: Date
// }

export type BookingSchema = {
  // user
  parentId: string
  datetime: Date
  doctorId: string
  isReferToDoctor: boolean
  userId: string
  symptom: string
  dayOfSymptom: number
  attachment: string[]
  // nurse
  screeningDetail: {
    evaluation: "noPlan" | "moderate" | "verySevere"
    temperature: string
    nurseComment: string
    status: "" | "complete" | "referToDoctor" | "nextAppointment"
  }
  checkingDetail: {
    additionalSymptom: string
    status: "" | "complete" | "referToDoctor" | "nextAppointment"
  }
  doctorFinishedChecking: {
    additionalSymptom: string
    status: "" | "complete" | "referToDoctor" | "nextAppointment"
  }
  status:
    | "waitForScanning"
    | "scanning"
    | "waitForChecking"
    | "checking"
    | "waitForComplete"
    | "complete"
  createDate: Date
  updateDate: Date
}

export async function createBooking(booking: {
  doctorId: BookingSchema["doctorId"]
  userId: BookingSchema["userId"]
  datetime: BookingSchema["datetime"]
  symptom: BookingSchema["symptom"]
  dayOfSymptom: BookingSchema["dayOfSymptom"]
  attachment: BookingSchema["attachment"]
}) {
  const addResult = await db.collection("booking").add({
    parentId: "",
    datetime: booking.datetime,
    doctorId: booking.doctorId,
    isReferToDoctor: !!booking.doctorId,
    userId: booking.userId,
    symptom: booking.symptom,
    dayOfSymptom: booking.dayOfSymptom,
    attachment: booking.attachment || [],
    screeningDetail: {
      evaluation: "noPlan",
      temperature: "",
      nurseComment: "",
      status: "",
    },
    checkingDetail: {
      additionalSymptom: "",
      status: "",
    },
    doctorFinishedChecking: {
      additionalSymptom: "",
      status: "",
    },
    status: "waitForScanning",
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
    .where("userId", "==", userId)
    .get()
    .then(snapshotAll)
    .then(loggingSuccess("Get booking list by user id"))
    .catch(loggingError("Get booking list by user id"))

  const result = await Promise.all(
    bookingList.map(async (booking: BookingSchema) => {
      const doctor = await getDoctorById(booking.doctorId)
      return {
        ...booking,
        doctor,
      }
    })
  )

  return result
}

export async function getAllBookingRefToDocByDate(date: Date) {
  const bookingList = await db
    .collection("booking")
    .where("status", "==", "waitForScanning")
    .where("isReferToDoctor", "==", true)
    .get()
    .then(snapshotAll)
    .then(loggingSuccess("Get booking list by user id"))
    .catch(loggingError("Get booking list by user id"))

  const result = await Promise.all(
    bookingList.map(async (booking: BookingSchema) => {
      const doctor = await getDoctorById(booking.doctorId)
      const user = await getUserById(booking.userId)
      return {
        ...booking,
        doctor,
        user,
      }
    })
  )

  return result
}

export async function updateFinishedChecking({
  bookingId,
  additionalSymptom,
  status,
}: {
  doctorId: string
  bookingId: string
  additionalSymptom: string
  status: "" | "complete" | "referToDoctor" | "nextAppointment"
}) {
  const updateResponse = await db
    .collection("booking")
    .doc(bookingId)
    .update({
      "doctorFinishedChecking.additionalSymptom": additionalSymptom,
      "doctorFinishedChecking.status": status,
      status: "complete",
    })
    .then(loggingSuccess("Update booking doc by id"))
    .catch(loggingError("Update booking doc by id"))

  return updateResponse
}
