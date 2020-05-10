import { combineReducers } from "redux"
import auth from "./auth"
import user from "./user"
import nurseScreening from "./nurseScreening"
import nurseFinishing from "./nurseFinishing"

export default combineReducers({
  auth,
  user,
  nurseScreening,
  nurseFinishing,
})
