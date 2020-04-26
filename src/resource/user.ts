import createResource from "./createResource"
import fireStore from "../fireStore"

export const detail = createResource(fireStore.user.getUserById)
