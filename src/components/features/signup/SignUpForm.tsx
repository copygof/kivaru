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

export type SignUpFormProps = {
  onSubmit: (value: any) => void
}

export default function SignUpForm(props: SignUpFormProps) {
  const [phone, setPhone] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("male")

  function handleSubmit() {
    props.onSubmit({
      firstName,
      lastName,
      phone,
      password,
      gender,
    })
  }

  function handleOnChange(field: string) {
    return (event: any) => {
      const mapping = {
        phone: setPhone,
        firstName: setFirstName,
        lastName: setLastName,
        password: setPassword,
      }
      // @ts-ignore
      mapping[field](event.target.value)
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button>TH</Button>
            <Button>EN</Button>
          </ButtonGroup>
        </Box>
        <Box display="flex">
          <Badge
            badgeContent="+"
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            overlap="circle"
          >
            <Avatar></Avatar>
          </Badge>
        </Box>
      </Box>
      <Box marginTop={2} display="flex">
        <Typography variant="h4" component="h4" color="primary">
          Sign Up
        </Typography>
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-phonne-input"
          label="Mobile Number"
          type="text"
          variant="outlined"
          value={phone}
          onChange={handleOnChange("phone")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-name-input"
          label="Name"
          type="text"
          variant="outlined"
          value={firstName}
          onChange={handleOnChange("firstName")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-surname-input"
          label="Surname"
          type="text"
          variant="outlined"
          value={lastName}
          onChange={handleOnChange("lastName")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handleOnChange("password")}
        />
      </Box>
      {/* <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type="password"
          variant="outlined"
        />
      </Box> */}
      <Box marginTop={2} display="flex" justifyContent="center">
        <Button
          variant={gender === "male" ? "contained" : "outlined"}
          color="primary"
          fullWidth
          style={{
            boxShadow: "none",
          }}
          onClick={() => setGender("male")}
        >
          Male
        </Button>
        <Box width={20} />
        <Button
          variant={gender === "female" ? "contained" : "outlined"}
          color="primary"
          fullWidth
          onClick={() => setGender("female")}
        >
          Female
        </Button>
      </Box>

      <Box marginTop={4} display="flex">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </>
  )
}
