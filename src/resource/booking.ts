import createResource from "./createResource"
import fireStore from "../fireStore"

export const listByUserId = createResource(fireStore.booking.getBookingByUserId)
export const listRefToDocByDate = createResource(
  fireStore.booking.getAllBookingRefToDocByDate
)
