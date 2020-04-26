import React, { useState } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import RegisterForm from "../../components/features/signup/RegisterForm"
import { useParams, useHistory } from "react-router-dom"
import MoonLoader from "react-spinners/MoonLoader"
import fireStore from "../../fireStore"
import { Dialog } from "@material-ui/core"

const DoctorRegisterPage = () => {
  const { id } = useParams()

  const history = useHistory()
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  async function handleSubmit(values: any) {
    try {
      setOpen(true)
      const response = await fireStore.doctor.registerDoctor({
        userId: id || "",
        hospital: values.hospital,
        graduate: values.graduate,
        specificSkill: values.specificSkill,
        description: values.description,
        ratings: 5,
        review: [],
      })
      // console.log("response => ", response)
      setOpen(false)
      history.replace(`/doctor/login`)
    } catch (error) {
      setOpen(false)
      console.log("error => ", error)
      setTimeout(() => {
        alert("Login failure: \n" + JSON.stringify(error))
      }, 1000)
    }
  }

  return (
    <NavbarLayout pageTitle="Registration">
      <>
        <RegisterForm onSubmit={handleSubmit} />
        <Dialog onClose={handleClose} open={open}>
          <MoonLoader color="#FF2E29" />
        </Dialog>
      </>
    </NavbarLayout>
  )
}

export default DoctorRegisterPage
