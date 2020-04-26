import db from "../config/firestore"
import {
  snapshotAll,
  snapshotOneOfList,
  snapshotOne,
  getResultBeforeSnap,
  loggingError,
  loggingSuccess,
} from "./utils"

export type ProfileSchema = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dob: Date
  gender: "male" | "female"
  imageProfile: string
}

export type AddressSchema = {
  address: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  postCode: string
  city: string
  zip: string
  state: string
  country: string
}

export type AccountSchema = {
  type: "normal"
  identityChannel: "facebook" | "google" | "phoneNumber"
  identity: {
    facebook: any
    google: any
    phoneNumber: any
  }
  userName: string
  password: string
  tempPassword: string
  isForceResetPassword: boolean
  isCompleteRegister: boolean
}

export type UserSchema = {
  userGroup: "doctor" | "patient" | "nurse"
  profile: ProfileSchema
  address: AddressSchema
  account: AccountSchema
}

export async function createUser(userData: UserSchema) {
  return db
    .collection("users")
    .add(userData)
    .then(getResultBeforeSnap)
    .then(snapshotOne)
    .then(loggingSuccess("Create user"))
    .catch(loggingError("Create user"))
}

export function loginWithPhone(phoneNumber: string, password: string) {
  return db
    .collection("users")
    .where("account.userName", "==", phoneNumber)
    .where("account.password", "==", password)
    .get()
    .then(snapshotOneOfList)
    .then(loggingSuccess("Login with phone number"))
    .catch(loggingError("Login with phone number"))
}

export function getUserList() {
  return db
    .collection("users")
    .get()
    .then(snapshotAll)
    .then(loggingSuccess("Get user list"))
    .catch(loggingError("Get user list"))
}
