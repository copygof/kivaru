// import { unstable_createResource as createResource } from "react-cache"
// import { unstable_createResource as createResource } from "./createResource"
import createResource from "./createResource"
import fireStore from "../fireStore"

export const list = createResource(fireStore.doctor.getAllDoctor)
export const detail = createResource(fireStore.doctor.getDoctorById)
export const profileByUserId = createResource(
  fireStore.doctor.getDoctorProfileByUserId
)
