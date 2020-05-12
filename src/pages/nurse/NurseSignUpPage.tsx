import React, { useState } from "react"
import SignUpForm from "../../components/features/signup/SignUpForm"
import fireStore from "../../fireStore"
import { Dialog } from "@material-ui/core"
import MoonLoader from "react-spinners/MoonLoader"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { useHistory } from "react-router-dom"

const NurseSignUpPage = () => {
  const history = useHistory()
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  async function handleSubmit(values: any) {
    try {
      setOpen(true)
      const response = await fireStore.nurse.createNurse({
        userGroup: "nurse",
        profile: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: "",
          phoneNumber: values.phone,
          dob: new Date(),
          gender: values.gender,
          imageProfile: values.image || "",
        },
        address: {
          address: "",
          addressLine1: "",
          addressLine2: "",
          addressLine3: "",
          postCode: "",
          city: "",
          zip: "",
          state: "",
          country: "",
        },
        account: {
          type: "normal",
          identityChannel: "phoneNumber",
          identity: {
            facebook: {},
            google: {},
            phoneNumber: {},
          },
          userName: values.phone,
          password: values.password,
          tempPassword: "",
          isForceResetPassword: false,
          isCompleteRegister: false,
        },
      })
      setOpen(false)
      history.replace(`/nurse/register/${response.userId}`)
    } catch (error) {
      setOpen(false)
      console.log("error => ", error)
      setTimeout(() => {
        alert("Signup failure" + JSON.stringify(error))
      }, 1000)
    }
  }

  return (
    <NavbarLayout pageTitle="Sign up">
      <>
        <SignUpForm onSubmit={handleSubmit} />
        <Dialog onClose={handleClose} open={open}>
          <MoonLoader color="#FF2E29" />
        </Dialog>
      </>
    </NavbarLayout>
  )
}

export default NurseSignUpPage
