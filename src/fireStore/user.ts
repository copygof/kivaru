import db, { storage } from "../config/firestore"
import {
  snapshotAll,
  snapshotOneOfList,
  snapshotOne,
  getResultBeforeSnap,
  loggingError,
  loggingSuccess,
  removeUserNameAndPassword,
} from "./utils"

export type ProfileSchema = {
  firstName: string
  lastName: string
  email?: string
  phoneNumber: string
  dob?: Date
  gender: "male" | "female"
  imageProfile: string | any
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

export async function uploadImage(image: any) {
  const storageRef = storage.ref()

  try {
    const fileName = image?.name || `${Date.now}.jpg`
    const imageUrl = await storageRef
      .child(`images/${fileName}`)
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL())
    return imageUrl
  } catch (error) {
    console.log("upload image error => ", error)
    return Promise.reject(error)
  }
}

export async function createUser(userData: UserSchema) {
  try {
    const rest = await db
      .collection("users")
      .where("account.userName", "==", userData.account.userName)
      .where("userGroup", "==", userData.userGroup)
      .get()
      .then(snapshotOneOfList)

    if (rest) {
      console.log("rest => ", rest)
      return Promise.reject("User is already exits")
    }
  } catch (error) {}

  let imageProfile = ""

  if (userData.profile?.imageProfile) {
    imageProfile = await uploadImage(userData.profile?.imageProfile)
  }

  return db
    .collection("users")
    .add({
      ...userData,
      profile: {
        ...userData.profile,
        imageProfile,
      },
    })
    .then(getResultBeforeSnap)
    .then(snapshotOne)
    .then(loggingSuccess("Create user"))
    .catch(loggingError("Create user"))
}

export async function updateProfile(profile: ProfileSchema, userId: string) {
  let imageProfile = ""

  const userDetail: UserSchema = await getUserById(userId)
  const isImageProfileChanged =
    profile.imageProfile &&
    userDetail.profile.imageProfile !== profile.imageProfile

  if (isImageProfileChanged) {
    imageProfile = await uploadImage(profile.imageProfile)
  }

  await db
    .collection("users")
    .doc(userId)
    .update({
      "profile.firstName": profile.firstName,
      "profile.lastName": profile.lastName,
      "profile.phoneNumber": profile.phoneNumber,
      "profile.gender": profile.gender,
      ...(isImageProfileChanged && {
        "profile.imageProfile": imageProfile,
      }),
    })
    .then(loggingSuccess("Update user"))
    .catch(loggingError("Update user"))

  return getUserById(userId)
}

export async function loginWithPhone(
  phoneNumber: string,
  password: string,
  userGroup: "doctor" | "patient" | "nurse"
) {
  const userDetail = await db
    .collection("users")
    .where("account.userName", "==", phoneNumber)
    .where("account.password", "==", password)
    .where("userGroup", "==", userGroup)
    .get()
    .then(snapshotOneOfList)
    .then(loggingSuccess("Login with phone number"))
    .catch(loggingError("Login with phone number"))

  return removeUserNameAndPassword(userDetail)
}

export function getUserList() {
  return db
    .collection("users")
    .get()
    .then(snapshotAll)
    .then(loggingSuccess("Get user list"))
    .catch(loggingError("Get user list"))
}

export async function getUserById(userId: string) {
  const userDetail = await db
    .collection("users")
    .doc(userId)
    .get()
    .then(snapshotOne)

  return removeUserNameAndPassword(userDetail)
}
