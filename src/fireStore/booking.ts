import { createUser, UserSchema, getUserById, uploadImage } from "./user"
import db from "../config/firestore"
import * as firebase from "firebase/app"
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
  isGeneralDoctor?: boolean
  userId: string
  symptom: string
  dayOfSymptom: number
  attachment: any[]
  // nurse
  screeningDetail: {
    evaluation: "noPlan" | "moderate" | "verySevere"
    temperature: string
    nurseComment: string
    status: "" | "noReferToDoctor" | "referToDoctor" | "nextAppointment"
  }
  checkingDetail: {
    additionalSymptom: string
    status: "" | "complete" | "referToDoctor" | "nextAppointment"
  }
  nurseFinishedChecking: {
    status: "" | "complete" | "referToDoctor" | "nextAppointment"
  }
  status: "waitForScanning" | "waitForChecking" | "waitForComplete" | "complete"
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
  parentId?: BookingSchema["parentId"]
}) {
  let attachmentId = []

  if (booking.attachment.length) {
    attachmentId = await Promise.all(
      booking.attachment.map((att: any) => uploadImage(att?.rawImage || ""))
    )
  }

  const addResult = await db.collection("booking").add({
    parentId: booking.parentId || "",
    datetime: booking.datetime,
    doctorId: booking.doctorId,
    isReferToDoctor: !!booking.doctorId,
    isGeneralDoctor: false,
    userId: booking.userId,
    symptom: booking.symptom,
    dayOfSymptom: booking.dayOfSymptom,
    attachment: attachmentId,
    screeningDetail: {
      evaluation: "noPlan",
      temperature: "",
      nurseComment: "",
      status: "noReferToDoctor",
    },
    checkingDetail: {
      additionalSymptom: "",
      status: "",
    },
    nurseFinishedChecking: {
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

  return result.sort(
    (a: any, b: any) =>
      // @ts-ignore
      new Date(moment(b.datetime?.seconds * 1000).toDate()).getTime() -
      // @ts-ignore
      new Date(moment(a.datetime?.seconds * 1000).toDate()).getTime()
  )
}

export async function getAllBookingRefToDocByDate(
  date: Date,
  isGeneralDoctor: boolean = false,
  filterStatus: string[] = ["waitForScanning", "waitForComplete"]
) {
  let start = new Date(date)
  let end = new Date(date)
  start.setDate(start.getDate() - 1)
  end.setDate(start.getDate() + 1)

  const startDate = firebase.firestore.Timestamp.fromDate(start)
  const endDate = firebase.firestore.Timestamp.fromDate(end)

  try {
    const bookingList = await db
      .collection("booking")
      .where("datetime", ">", startDate)
      .where("datetime", "<", endDate)
      .get()
      .then(snapshotAll)
      .then(loggingSuccess("Get booking list by date"))
      .catch(loggingError("Get booking list by date"))

    if (bookingList) {
      const result = await Promise.all(
        bookingList
          // .filter((bk: any) => bk.isGeneralDoctor === isGeneralDoctor)
          .filter((bk: any) => bk.isReferToDoctor === true)
          .filter((bk: any) => filterStatus.includes(bk.status))
          .map(async (booking: BookingSchema) => {
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
  } catch (error) {
    return []
  }
}

export async function getAllBookingNoRefToDocByDate(date: Date) {
  const result = await getAllBookingRefToDocByDate(date, true)
  return result
}

export async function getAllBookingByDocIdAndByDate(
  doctorId: string,
  date: Date
) {
  const result = await getAllBookingRefToDocByDate(date, false, [
    "waitForChecking",
  ])
  const doctorListById = result?.filter((bkl: any) => bkl.doctorId === doctorId)
  return doctorListById
}

export async function getBookingById(bookingId: string) {
  const bookingDetail = await db
    .collection("booking")
    .doc(bookingId)
    .get()
    .then(snapshotOne)

  const doctor = await getDoctorById(bookingDetail.doctorId)
  const user = await getUserById(bookingDetail.userId)

  return {
    ...bookingDetail,
    doctor,
    user,
  }
}

export async function updateScreening({
  doctorId,
  bookingId,
  status,
  screeningDetail,
  bookingDateTime,
}: {
  doctorId?: string
  bookingId: string
  status: "noReferToDoctor" | "referToDoctor" | "nextAppointment"
  screeningDetail: {
    evaluation: "noPlan" | "moderate" | "verySevere"
    temperature: string
    nurseComment: string
    status: "noReferToDoctor" | "referToDoctor" | "nextAppointment"
  }
  bookingDateTime?: BookingSchema["datetime"]
}) {
  const caseStatus = status === "referToDoctor" ? "waitForChecking" : "complete"

  const updateResponse = await db
    .collection("booking")
    .doc(bookingId)
    .update({
      screeningDetail,
      isReferToDoctor:
        status === "referToDoctor" || status === "nextAppointment",
      doctorId,
      status: caseStatus,
    })
    .then(loggingSuccess("Update booking doc by id"))
    .catch(loggingError("Update booking doc by id"))

  if (status === "nextAppointment" && doctorId) {
    const bookingDetail = await getBookingById(bookingId)
    const createBookingResponse = await createBooking({
      ...bookingDetail,
      parentId: bookingDetail.parentId,
      doctorId,
      datetime: bookingDateTime || new Date(),
    })

    return createBookingResponse
  }

  return updateResponse
}

export async function updateCheckingDetail({
  bookingId,
  additionalSymptom,
  status,
}: {
  bookingId: string
  additionalSymptom: string
  status: "complete" | "referToDoctor" | "nextAppointment"
}) {
  const updateResponse = await db
    .collection("booking")
    .doc(bookingId)
    .update({
      "checkingDetail.additionalSymptom": additionalSymptom,
      "checkingDetail.status": status,
      status: "waitForComplete",
    })
    .then(loggingSuccess("Update booking doc by id"))
    .catch(loggingError("Update booking doc by id"))

  return updateResponse
}

export async function updateFinishedChecking({
  doctorId,
  bookingId,
  status,
  bookingDateTime,
}: {
  doctorId?: string
  bookingId: string
  status: "complete" | "referToDoctor" | "nextAppointment"
  bookingDateTime?: BookingSchema["datetime"]
}) {
  const updateResponse = await db.collection("booking").doc(bookingId).update({
    "nurseFinishedChecking.status": status,
    status: "complete",
  })

  if (status !== "complete") {
    const bookingDetail = await getBookingById(bookingId)
    const createBookingResponse = await createBooking({
      ...bookingDetail,
      parentId: bookingDetail.parentId,
      doctorId,
      datetime: bookingDateTime || new Date(),
    })

    return createBookingResponse
  }

  return updateResponse
}
