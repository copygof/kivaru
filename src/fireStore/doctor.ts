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

export type Review = {
  rating: number
  comment: string
}

export type WorkingDay = {
  name: "MON" | "WUE" | "WED" | "WHU" | "FRI" | "SAT" | "SUN"
  isActive: boolean
}

export type WorkingTime = {
  name:
    | "06:00"
    | "08:00"
    | "10:00"
    | "12:00"
    | "14:00"
    | "16:00"
    | "18:00"
    | "20:00"
  isActive: boolean
}

export type DoctorSchema = {
  id?: string
  userId: string
  hospital: string
  graduate: string
  specificSkill: string
  description: string
  ratings: number
  review: Review[]
  working?: {
    day: WorkingDay[]
    time: WorkingTime[]
  }
  isGeneralDoctor?: boolean
}

export async function createDoctor(userData: UserSchema) {
  const user = await createUser({
    ...userData,
    userGroup: "doctor",
  })

  const addResult = await db.collection("doctor").add({
    userId: user.id,
    hospital: "",
    graduate: "",
    specificSkill: "",
    description: "",
    ratings: 4.5,
    review: [],
    working: {
      day: [
        {
          name: "MON",
          isActive: false,
        },
        {
          name: "WUE",
          isActive: false,
        },
        {
          name: "WED",
          isActive: false,
        },
        {
          name: "WHU",
          isActive: false,
        },
        {
          name: "FRI",
          isActive: false,
        },
        {
          name: "SAT",
          isActive: false,
        },
        {
          name: "SUN",
          isActive: false,
        },
      ],
      time: [
        {
          name: "06:00",
          isActive: false,
        },
        {
          name: "08:00",
          isActive: false,
        },
        {
          name: "10:00",
          isActive: false,
        },
        {
          name: "12:00",
          isActive: false,
        },
        {
          name: "14:00",
          isActive: false,
        },
        {
          name: "16:00",
          isActive: false,
        },
        {
          name: "18:00",
          isActive: false,
        },
        {
          name: "20:00",
          isActive: false,
        },
      ],
    },
    isGeneralDoctor: false,
  })

  return addResult.get().then(snapshotOne)
}

export async function updateDoctorWorking({
  doctorId,
  workingData,
}: {
  doctorId: string
  workingData: {
    day: WorkingDay[]
    time: WorkingTime[]
  }
}) {
  const updateResponse = await db
    .collection("doctor")
    .doc(doctorId)
    .update({
      working: workingData,
    })
    .then(loggingSuccess("Update doctor working  doc by id"))
    .catch(loggingError("Update doctor working  doc by id"))

  return updateResponse
}

export async function registerDoctor(doctor: DoctorSchema) {
  const doctorId = await db
    .collection("doctor")
    .where("userId", "==", doctor.userId)
    .get()
    .then(snapshotOneOfList)
    .then((doc: any) => doc.id)
    .then(loggingSuccess("Register doctor get doc id"))
    .catch(loggingError("Register doctor get doc id"))

  const updateResponse = await db
    .collection("doctor")
    .doc(doctorId)
    .update(doctor)
    .then(loggingSuccess("Update doctor doc by id"))
    .catch(loggingError("Update doctor doc by id"))

  // console.log("doctor => doctor", doctor)
  await db
    .collection("users")
    .doc(doctor.userId)
    .update({ "account.isCompleteRegister": true })

  return updateResponse
}

export async function getAllDoctor() {
  const doctorList = await db.collection("doctor").get().then(snapshotAll)

  const result = await Promise.all(
    doctorList
      .sort((a: any, b: any) => {
        if (a.isGeneralDoctor === true) {
          return -1
        }
        return 0
      })
      .map(async (doctor: DoctorSchema) => {
        return {
          ...(await db
            .collection("users")
            .doc(doctor.userId)
            .get()
            .then(snapshotOne)),
          ...doctor,
        }
      })
  )

  return result.map(removeUserNameAndPassword)
}

export async function getDoctorById(doctorId: string) {
  const doctorDetail = await db
    .collection("doctor")
    .doc(doctorId)
    .get()
    .then(snapshotOne)

  const userDetail = await db
    .collection("users")
    .doc(doctorDetail.userId)
    .get()
    .then(snapshotOne)

  return {
    ...removeUserNameAndPassword(userDetail),
    ...doctorDetail,
  }
}

export async function getDoctorProfileByUserId(userId: string) {
  const userDetail = await db
    .collection("users")
    .doc(userId)
    .get()
    .then(snapshotOne)

  const doctorDetail = await db
    .collection("doctor")
    .where("userId", "==", userId)
    .get()
    .then(snapshotOneOfList)

  return {
    ...removeUserNameAndPassword(userDetail),
    ...doctorDetail,
  }
}
