import React, { ReactChild } from "react"
import { Switch, Route } from "react-router-dom"
import UserSignUpPage from "../pages/user/UserSignUpPage"
import UserLoginPage from "../pages/user/UserLoginPage"
import PrivateRoute from "./private/PrivateUserRoute"
import UserHomePage from "../pages/user/UserHomePage"
import UserFindDoctor from "../pages/user/UserFindDoctor"
import UserAppointment from "../pages/user/UserAppointment"
import UserAppointmentDetail from "../pages/user/UserAppointmentDetail"
import UserSymptomPage from "../pages/user/UserSymptomPage"
import UserVideoCall from "../pages/user/UserVideoCall"

export default function UserRoute() {
  return (
    <Switch>
      <Route path="/user/signup">
        <UserSignUpPage />
      </Route>
      <Route path="/user/login">
        <UserLoginPage />
      </Route>
      <PrivateRoute path="/user/home">
        <UserHomePage />
      </PrivateRoute>
      <PrivateRoute path="/user/doctor-appointment/:id">
        <UserAppointment />
      </PrivateRoute>
      <PrivateRoute path="/user/symptom/:id/:dateTime">
        <UserSymptomPage />
      </PrivateRoute>
      <PrivateRoute path="/user/appointment">
        <UserAppointmentDetail />
      </PrivateRoute>
      <PrivateRoute path="/user/find-doctor">
        <UserFindDoctor />
      </PrivateRoute>
      <Route path="*">
        <p>Not fdfd</p>
      </Route>
    </Switch>
  )
}
