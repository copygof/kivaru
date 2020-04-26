// import { unstable_createResource as createResource } from "react-cache"
// import { unstable_createResource as createResource } from "./createResource"
import createResource from "./createResource"
import fireStore from "../fireStore"

export const list = createResource(fireStore.nurse.getAllNurse)
export const detail = createResource(fireStore.nurse.getNurseById)
export const profileByUserId = createResource(
  fireStore.nurse.getNurseProfileByUserId
)
