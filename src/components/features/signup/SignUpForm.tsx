import React, { useState } from "react"
import {
  Box,
  ButtonGroup,
  Button,
  Badge,
  Avatar,
  Typography,
  TextField,
  ButtonBase,
} from "@material-ui/core"
import fireStore from "../../../fireStore"
import { storage } from "../../../config/firestore"

export type SignUpFormProps = {
  onSubmit: (value: any) => void
}

export default function SignUpForm(props: SignUpFormProps) {
  const [phone, setPhone] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("male")
  const [lang, setLang] = useState("en")
  const [image, setImage] = useState({
    filePath: "",
    rawImage: null,
  })

  function handleSubmit() {
    props.onSubmit({
      firstName,
      lastName,
      phone,
      password,
      gender,
      image: image.rawImage,
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

  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0]
    setImage({
      filePath: URL.createObjectURL(image),
      rawImage: image,
    })
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box display="flex">
          {/* <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => setLang("th")}
              style={{
                backgroundColor: lang === "th" ? "#FF2E29" : "#ffffff",
                color: lang === "th" ? "#ffffff" : "#313131",
              }}
            >
              TH
            </Button>
            <Button
              onClick={() => setLang("en")}
              style={{
                backgroundColor: lang === "en" ? "#FF2E29" : "#ffffff",
                color: lang === "en" ? "#ffffff" : "#313131",
              }}
            >
              EN
            </Button>
          </ButtonGroup> */}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <input
            type="file"
            onChange={handleImageAsFile}
            id="contained-button-file"
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <ButtonBase component="span">
              <Badge
                badgeContent="+"
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                overlap="circle"
              >
                <Avatar
                  style={{
                    width: 77,
                    height: 77,
                  }}
                  src={image.filePath || ""}
                ></Avatar>
              </Badge>
            </ButtonBase>
          </label>
        </Box>
      </Box>
      <Box marginTop={2} display="flex">
        <Typography variant="h4" component="h4" color="primary">
          สมัครสมาชิก
        </Typography>
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-phonne-input"
          label="เบอร์มือถือ"
          type="number"
          variant="outlined"
          value={phone}
          onChange={handleOnChange("phone")}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-name-input"
          label="ชื่อ"
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
          label="นามสกุล"
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
          label="รหัสผ่าน"
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
      <Box marginTop={2} display="flex" justifyContent="space-between">
        <Button
          variant={gender === "male" ? "contained" : "outlined"}
          color="primary"
          style={{
            boxShadow: "none",
            width: 150,
          }}
          onClick={() => setGender("male")}
        >
          ชาย
        </Button>
        <Button
          variant={gender === "female" ? "contained" : "outlined"}
          color="primary"
          style={{ width: 150 }}
          onClick={() => setGender("female")}
        >
          หญิง
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
          สมัครสมาชิก
        </Button>
      </Box>
    </>
  )
}
