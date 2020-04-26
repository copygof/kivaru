import React, { useState } from "react"
import {
  Box,
  ButtonGroup,
  Button,
  Badge,
  Avatar,
  Typography,
  TextField,
} from "@material-ui/core"

export type RegisterFormProps = {
  onSubmit: (values: any) => void
}

export default function RegisterForm(props: RegisterFormProps) {
  const [hospital, setHospital] = useState("Thammasat University Hospital")
  const [graduate, setGraduate] = useState("")
  const [specificSkill, setSpecificSkill] = useState("")
  const [description, setDescription] = useState("")

  function handleOnChange(field: string) {
    return (event: any) => {
      const mapping = {
        hospital: setHospital,
        graduate: setGraduate,
        specificSkill: setSpecificSkill,
        description: setDescription,
      }
      // @ts-ignore
      mapping[field](event.target.value)
    }
  }

  function handleSubmit() {
    props.onSubmit({
      hospital,
      graduate,
      specificSkill,
      description,
    })
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between"></Box>
      <Box marginTop={2} display="flex">
        <Typography variant="h4" component="h4" color="primary">
          Registration
        </Typography>
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-phonne-input"
          label="Hospital / Clinic"
          type="text"
          variant="outlined"
          value={hospital}
          onChange={handleOnChange("hospital")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-name-input"
          label="Graduate"
          type="text"
          variant="outlined"
          value={graduate}
          onChange={handleOnChange("graduate")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-surname-input"
          label="Specialist doctor skill"
          type="text"
          variant="outlined"
          value={specificSkill}
          onChange={handleOnChange("specificSkill")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          multiline
          rows={5}
          fullWidth
          id="outlined-password-input"
          label="Description"
          type="textArea"
          variant="outlined"
          value={description}
          onChange={handleOnChange("description")}
        />
      </Box>
      <Box marginTop={4} display="flex">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
