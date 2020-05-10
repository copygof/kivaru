import React, { useState } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { Box, Typography, TextField, Button, Dialog } from "@material-ui/core"
import MoonLoader from "react-spinners/MoonLoader"

import { useHistory, useParams } from "react-router-dom"
import { updateCheckingDetail } from "../../fireStore/booking"

function DoctorMedicalRecords(params: any) {
  const history = useHistory()
  const { bookingId } = useParams()
  const [additionalSymptom, setAdditionalSymptom] = useState("")
  const [action, setAction] = useState<
    "complete" | "referToDoctor" | "nextAppointment"
  >("complete")
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  function handleSelectAction(
    act: "complete" | "referToDoctor" | "nextAppointment"
  ) {
    return () => {
      setAction(act)
    }
  }

  async function handleSubmit() {
    try {
      setOpen(true)
      await updateCheckingDetail({
        bookingId: bookingId || "",
        additionalSymptom,
        status: action,
      })
      setOpen(false)

      history.replace("/doctor/home", 0)
    } catch (error) {
      setOpen(false)
      console.log("error => ", error)
      setTimeout(() => {
        alert("failure")
      }, 1000)
    }
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between"></Box>
      <Box marginTop={2} display="flex">
        <Typography variant="h4" component="h4" color="primary">
          Medical Note
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
          value={additionalSymptom}
          onChange={(e) => setAdditionalSymptom(e.target.value)}
          style={{
            minHeight: 150,
          }}
        />
      </Box>
      <Box marginTop={4} display="flex">
        <Button
          variant="outlined"
          fullWidth
          onClick={handleSelectAction("nextAppointment")}
          style={{
            borderRadius: "100px",
            height: 44,
            border: "1px solid #ECECEC",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
            color: action === "nextAppointment" ? "#FF2E29" : "#19769F",
            fontWeight: "bold",
          }}
        >
          Next appointment
        </Button>
      </Box>
      <Box marginTop={4} display="flex">
        <Button
          variant="outlined"
          fullWidth
          onClick={handleSelectAction("referToDoctor")}
          style={{
            borderRadius: "100px",
            height: 44,
            border: "1px solid #ECECEC",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
            color: action === "referToDoctor" ? "#FF2E29" : "#19769F",
            fontWeight: "bold",
          }}
        >
          Refer to Doctor
        </Button>
      </Box>
      <Box marginTop={4} display="flex">
        <Button
          variant="outlined"
          fullWidth
          onClick={handleSelectAction("complete")}
          style={{
            borderRadius: "100px",
            height: 44,
            border: "1px solid #ECECEC",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
            color: action === "complete" ? "#FF2E29" : "#19769F",
            fontWeight: "bold",
          }}
        >
          Complete
        </Button>
      </Box>
      <Box marginTop={4} display="flex">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          style={{
            height: 44,
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Fisnished
        </Button>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <MoonLoader color="#FF2E29" />
      </Dialog>
    </div>
  )
}

const DoctorMedicalRecordsPage = () => {
  return (
    <NavbarLayout pageTitle="Medical records">
      <React.Suspense fallback={<Loading />}>
        <DoctorMedicalRecords />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default DoctorMedicalRecordsPage
