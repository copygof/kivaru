import React, { ReactChild } from "react"
import { Switch, Route } from "react-router-dom"
import DoctorLoginPage from "../pages/doctor/DoctorLoginPage"
import PrivateDoctorRoute from "./private/PrivateDoctorRoute"
import DoctorSignUpPage from "../pages/doctor/DoctorSignUpPage"
import DoctorRegisterPage from "../pages/doctor/DoctorRegisterPage"
import DoctorHomePage from "../pages/doctor/DoctorHomePage"
import DoctorProfile from "../pages/doctor/DoctorProfilePage"
import DoctorAppointmentList from "../pages/doctor/DoctorAppointmentList"
import DoctorCheckPage from "../pages/doctor/DoctorCheckPage"
import DoctorMedicalRecordsPage from "../pages/doctor/DoctorMedicalRecordsPage"

export default function DoctorRoute() {
  return (
    <Switch>
      <Route path="/doctor/signup">
        <DoctorSignUpPage />
      </Route>
      <Route path="/doctor/register/:id">
        <DoctorRegisterPage />
      </Route>
      <Route exact path="/doctor/login">
        <DoctorLoginPage />
      </Route>
      <PrivateDoctorRoute path="/doctor/home">
        <DoctorHomePage />
      </PrivateDoctorRoute>
      <PrivateDoctorRoute path="/doctor/appointment">
        <DoctorAppointmentList />
      </PrivateDoctorRoute>
      <PrivateDoctorRoute path="/doctor/check">
        <DoctorCheckPage />
      </PrivateDoctorRoute>
      <PrivateDoctorRoute path="/doctor/medical-records">
        <DoctorMedicalRecordsPage />
      </PrivateDoctorRoute>
      <Route path="/doctor/profile">
        <DoctorProfile />
      </Route>
      <Route path="*">
        <p>Not found doctor</p>
      </Route>
    </Switch>
  )
}
