import React, { useState } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import { Box, Typography, TextField, Button, Dialog } from "@material-ui/core"
import { useHistory, useParams } from "react-router-dom"
import { VideoCall } from "@material-ui/icons"
import MoonLoader from "react-spinners/MoonLoader"
import resource from "../../resource"
import fireStore from "../../fireStore"

function NurseDoctorFinishedChecking() {
  const history = useHistory()
  const { bookingId, doctorId, userId } = useParams()
  const [additionalSymptom, setAdditionalSymptom] = useState("")
  const [action, setAction] = useState("complete")
  const [open, setOpen] = useState(false)

  const userDetail = resource.user.detail.read(userId)
  const doctorDetail = resource.doctor.detail.read(doctorId)

  function handleSelectAction(
    act: "" | "complete" | "referToDoctor" | "nextAppointment"
  ) {
    return () => {
      setAction(act)
    }
  }

  function handleClose() {
    setOpen(false)
  }

  async function handleSubmit() {
    try {
      setOpen(true)
      const response = await fireStore.booking.updateFinishedChecking({
        bookingId: bookingId || "",
        additionalSymptom,
        // @ts-ignore
        status: action,
      })
      setOpen(false)

      history.replace("/nurse/home")
    } catch (error) {
      setOpen(false)
      console.log("error => ", error)
      setTimeout(() => {
        alert("Update failure")
      }, 1000)
    }
  }

  return (
    <div>
      <Box marginTop={2}>
        <DoctorInfo
          isPreview
          name={`${doctorDetail.profile?.firstName} ${doctorDetail.profile?.lastName}`}
          skill={doctorDetail.graduate}
          location={doctorDetail.hospital}
          image={doctorDetail.profile.imageProfile}
          rating={0}
        />
      </Box>
      <Box marginTop={2} display="flex" flexDirection="row">
        <Box>
          <Typography style={{ fontWeight: "bold" }} color="secondary">
            Patient
          </Typography>
          <Typography
            style={{ fontWeight: "bold" }}
            variant="h5"
            component="h4"
          >
            {`${userDetail.profile.firstName} ${userDetail.profile.lastName}`}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          style={{
            borderRadius: "100px",
            height: 34,
            border: "1px solid #ECECEC",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
            color: "#06D81E",
            fontWeight: "bold",
            fontSize: 10,
          }}
        >
          Complete
        </Button>
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
      <Box marginTop={4} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          // fullWidth
          onClick={handleSubmit}
          style={{
            width: 160,
            height: 44,
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          <VideoCall />
          <Typography>Video call</Typography>
        </Button>
        <Button
          variant="outlined"
          // fullWidth
          onClick={handleSubmit}
          style={{
            width: 160,
            height: 44,
            color: "##D6D6D6",
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

export default function NurseDoctorFinishedCheckingPage() {
  return (
    <NavbarLayout pageTitle="Medical records">
      <React.Suspense fallback={<Loading />}>
        <NurseDoctorFinishedChecking />
      </React.Suspense>
    </NavbarLayout>
  )
}
