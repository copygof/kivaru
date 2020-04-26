import { createUser, UserSchema } from "./user"
import db from "../config/firestore"
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

export type NurseSchema = {
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
}

export async function createNurse(userData: UserSchema) {
  const user = await createUser({
    ...userData,
    userGroup: "nurse",
  })

  const addResult = await db.collection("nurse").add({
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
  })

  return addResult.get().then(snapshotOne)
}

export async function updateNurseWorking({
  nurseId,
  workingData,
}: {
  nurseId: string
  workingData: {
    day: WorkingDay[]
    time: WorkingTime[]
  }
}) {
  const updateResponse = await db
    .collection("nurse")
    .doc(nurseId)
    .update({
      working: workingData,
    })
    .then(loggingSuccess("Update doctor working  doc by id"))
    .catch(loggingError("Update doctor working  doc by id"))

  return updateResponse
}

export async function registerNurse(nurse: NurseSchema) {
  const nurseId = await db
    .collection("nurse")
    .where("userId", "==", nurse.userId)
    .get()
    .then(snapshotOneOfList)
    .then((doc: any) => doc.id)
    .then(loggingSuccess("Register nurse get doc id"))
    .catch(loggingError("Register nurse get doc id"))

  const updateResponse = await db
    .collection("nurse")
    .doc(nurseId)
    .update(nurse)
    .then(loggingSuccess("Update nurse doc by id"))
    .catch(loggingError("Update nurse doc by id"))

  // console.log("doctor => doctor", doctor)
  await db
    .collection("users")
    .doc(nurse.userId)
    .update({ "account.isCompleteRegister": true })

  return updateResponse
}

export async function getAllNurse() {
  const nurseList = await db.collection("nurse").get().then(snapshotAll)

  const result = await Promise.all(
    nurseList.map(async (doctor: NurseSchema) => {
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

export async function getNurseById(nurseId: string) {
  const nurseDetail = await db
    .collection("nurse")
    .doc(nurseId)
    .get()
    .then(snapshotOne)

  const userDetail = await db
    .collection("users")
    .doc(nurseDetail.userId)
    .get()
    .then(snapshotOne)

  return {
    ...removeUserNameAndPassword(userDetail),
    ...nurseDetail,
  }
}

export async function getNurseProfileByUserId(userId: string) {
  const userDetail = await db
    .collection("users")
    .doc(userId)
    .get()
    .then(snapshotOne)

  const nurseDetail = await db
    .collection("nurse")
    .where("userId", "==", userId)
    .get()
    .then(snapshotOneOfList)

  return {
    ...removeUserNameAndPassword(userDetail),
    ...nurseDetail,
  }
}
