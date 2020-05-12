import React, { useState } from "react"
import { Box, Dialog } from "@material-ui/core"
import SignUpForm from "./signup/SignUpForm"
import { useDispatch, useSelector } from "react-redux"
import {
  userProfileSelector,
  userIdSelector,
  updateUser,
} from "../../redux/user"
import MoonLoader from "react-spinners/MoonLoader"
import { updateProfile } from "../../fireStore/user"

export default function UserProfileById() {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const userProfile = useSelector(userProfileSelector)
  const [open, setOpen] = useState(false)

  const initialValues = {
    phone: userProfile.phoneNumber,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    password: userProfile.password,
    gender: userProfile.gender,
    image: userProfile.imageProfile,
  }

  function handleClose() {
    setOpen(false)
  }

  async function handleSubmit(value: any) {
    try {
      setOpen(true)
      const response = await updateProfile(
        {
          firstName: value.firstName || "",
          lastName: value.lastName || "",
          phoneNumber: value.phone || "",
          gender: value.gender || "",
          imageProfile: value.image,
        },
        userId
      )
      setOpen(false)
      dispatch(updateUser(response))
    } catch (error) {
      setOpen(false)
    }
  }

  return (
    <Box marginTop={10}>
      <SignUpForm
        isEditing
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
      <Dialog onClose={handleClose} open={open}>
        <MoonLoader color="#FF2E29" />
      </Dialog>
    </Box>
  )
}
