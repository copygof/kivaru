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
      <PrivateNurseRoute path="/nurse/no-refer">
        <NurseNoReFerPage />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/refer-process">
        <NurseReFerProcessPage />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/refer-to-doctor">
        <NurseReFerPage />
      </PrivateNurseRoute>
      <PrivateNurseRoute path="/nurse/screening">
        <NurseScreeningPage />
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
