import React, { useState } from "react"
import { Box, Typography, TextField, Button } from "@material-ui/core"
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { useHistory, useParams } from "react-router-dom"
import { Dialog } from "@material-ui/core"
import MoonLoader from "react-spinners/MoonLoader"
import { useSelector } from "react-redux"
import fireStore from "../../fireStore"

function ButtonCountDay({ onClick, arrow }: any) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {arrow === "up" ? (
        <KeyboardArrowUp fontSize="large" />
      ) : (
        <KeyboardArrowDown fontSize="large" />
      )}
    </Button>
  )
}

const UserSymptomPage = () => {
  const history = useHistory()
  const { id, dateTime } = useParams()
  const [dayOfSymptom, setDayOfSymptom] = useState(1)
  const [open, setOpen] = useState(false)
  const [symptom, setSymptom] = useState("")
  const userId = useSelector((state: any) => state.auth.userId)

  function handleClose() {
    setOpen(false)
  }

  function handleOnChange(field: string) {
    return (event: any) => {
      const mapping = {
        symptom: setSymptom,
      }
      // @ts-ignore
      mapping[field](event.target.value)
    }
  }

  async function handleSubmit() {
    try {
      setOpen(true)
      const bookingDate = new Date(dateTime || "")
      const response = await fireStore.booking.createBooking({
        requestBy: userId, // TODO
        requestTo: id || "",
        datetime: bookingDate, // TODO
        symptom,
        dayOfSymptom: dayOfSymptom,
        attachment: "",
      })
      setOpen(false)
      history.replace(`/user/home`)
    } catch (error) {
      setOpen(false)
      console.log("error => ", error)
      setTimeout(() => {
        alert("Login failure")
      }, 1000)
    }
  }

  return (
    <NavbarLayout pageTitle="Symptom">
      <>
        <Box marginTop={2} display="flex">
          <Typography variant="h4" component="h4" color="primary">
            Symptom
          </Typography>
        </Box>
        <Box marginTop={2}>
          <TextField
            multiline
            rows={5}
            fullWidth
            id="outlined-password-input"
            label="Additional symptom"
            type="textArea"
            variant="outlined"
            value={symptom}
            onChange={handleOnChange("symptom")}
          />
        </Box>
        <Box marginTop={2} display="flex">
          <Typography variant="h5" component="h4">
            How many days?
          </Typography>
        </Box>
        <Box marginTop={2} display="flex" justifyContent="center">
          <ButtonCountDay
            arrow="down"
            onClick={() => setDayOfSymptom(dayOfSymptom - 1)}
          />
          <Typography
            variant="h4"
            component="h4"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            {dayOfSymptom}
          </Typography>
          <ButtonCountDay
            arrow="up"
            onClick={() => setDayOfSymptom(dayOfSymptom + 1)}
          />
        </Box>
        <Box marginTop={2} display="flex" />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Book Appointment
        </Button>
        <Dialog onClose={handleClose} open={open}>
          <MoonLoader color="#FF2E29" />
        </Dialog>
      </>
    </NavbarLayout>
  )
}

export default UserSymptomPage
