import React, { useState } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { Box, Typography, TextField, Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"

function DoctorMedicalRecords(params: any) {
  const history = useHistory()
  const [additionalSymptom, setAdditionalSymptom] = useState("")
  const [action, setAction] = useState("complete")

  function handleSelectAction(
    act: "complete" | "nextAppointment" | "refToDoctor"
  ) {
    return () => {
      setAction(act)
    }
  }

  function handleSubmit() {
    // TODO fetch api

    history.replace("/doctor/home", 0)
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
          onClick={handleSelectAction("refToDoctor")}
          style={{
            borderRadius: "100px",
            height: 44,
            border: "1px solid #ECECEC",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
            color: action === "refToDoctor" ? "#FF2E29" : "#19769F",
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
