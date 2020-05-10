import React, { ReactChild } from "react"
import { Switch, Route } from "react-router-dom"

import PrivateNurseRoute from "./private/PrivateNurseRoute"
import NurseLoginPage from "../pages/nurse/NurseLoginPage"
import NurseSignUpPage from "../pages/nurse/NurseSignUpPage"
import NurseRegisterPage from "../pages/nurse/NurseRegisterPage"
import NurseHomePage from "../pages/nurse/NurseHomePage"
import NurseNoReFerPage from "../pages/nurse/NurseNoReFerPage"
import NurseScreeningPage from "../pages/nurse/NurseScreeningPage"
import NurseReFerProcessPage from "../pages/nurse/NurseReFerProcessPage"
import NurseReFerPage from "../pages/nurse/NurseReFerPage"
import NurseDoctorFinishedCheckingPage from "../pages/nurse/NurseDoctorFinishedCheckingPage"
import VideoCall from "../pages/video/VideoCall"
import NurseFindDoctor from "../pages/nurse/NurseFindDoctor"
import NurseAppointment from "../pages/nurse/NurseAppointment"

export default function NurseRoute() {
  return (
    <Switch>
      <Route path="/nurse/login">
        <NurseLoginPage />
      </Route>
      <Route path="/nurse/signup">
        <NurseSignUpPage />
      </Route>
      <Route path="/nurse/register/:id">
        <NurseRegisterPage />
      </Route>
      <PrivateNurseRoute path="/nurse/home">
        <NurseHomePage />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/refer-process/:bookingId">
        <NurseReFerProcessPage />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/refer-to-doctor">
        <NurseReFerPage isNoRefToDoc={false} />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/no-refer">
        <NurseReFerPage isNoRefToDoc />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/screening/:bookingId">
        <NurseScreeningPage />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/find-doctor">
        <NurseFindDoctor />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/doctor-appointment/:id">
        <NurseAppointment />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/video-call/:friendID/:friendName">
        <VideoCall />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/doctor-finished-checking/:bookingId/:doctorId/:userId">
        <NurseDoctorFinishedCheckingPage />
      </PrivateNurseRoute>
      <Route path="*">
        <p>Not found nurse</p>
      </Route>
    </Switch>
  )
}
