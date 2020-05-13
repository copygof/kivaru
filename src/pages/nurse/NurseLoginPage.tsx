import React, { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Dialog,
} from "@material-ui/core"
import { css } from "@emotion/core"
import { useDispatch } from "react-redux"
import MoonLoader from "react-spinners/MoonLoader"
import { NavLink, useHistory } from "react-router-dom"
import SimpleLayout from "../../components/layout/SimpleLayout"
import fireStore from "../../fireStore"
import { login } from "../../redux/auth"
import { initUser } from "../../redux/user"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  background-color: transparent;
`

export default function NurseLoginPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  async function handleOnSubmit() {
    try {
      setOpen(true)
      const response = await fireStore.user.loginWithPhone(
        phone,
        password,
        "nurse"
      )
      setOpen(false)
      dispatch(
        login({
          isAuthenticated: true,
          userId: response.id,
        })
      )

      dispatch(initUser(response))

      if (response.account.isCompleteRegister) {
        history.replace("/nurse/home")
      } else {
        history.replace(`/nurse/register/${response.id}`)
      }
    } catch (error) {
      setOpen(false)
      console.log("error => ", error)
      setTimeout(() => {
        alert("Login failure")
      }, 1000)
    }
  }

  function handleOnChangeText(fieldName: string) {
    return (event: any) => {
      if (fieldName === "phone") {
        setPhone(event.target.value)
      } else {
        setPassword(event.target.value)
      }
    }
  }

  return (
    <SimpleLayout pageTitle="เข้าสู่ระบบ">
      <>
        <Box marginTop={5}>
          <TextField
            fullWidth
            id="outlined-phone-input"
            label="เบอร์มือถือ"
            type="phone"
            variant="outlined"
            value={phone}
            onChange={handleOnChangeText("phone")}
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
            onChange={handleOnChangeText("password")}
          />
        </Box>
        <Box marginTop={2} flexDirection="row" display="flex">
          <Box flexDirection="column" flex={1} display="flex">
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="จดจำรหัส"
              onClick={handleOnChangeText("isRemember")}
            />
          </Box>
          <Box
            flexDirection="column"
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography component="p">
              <Link href="#" onClick={() => {}}>
                ลืมรหัสผ่าน ?
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box marginTop={4} display="flex">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOnSubmit}
          >
            เข้าสู่ระบบ
          </Button>
        </Box>
        <Box marginTop={4} display="flex" justifyContent="center">
          <Typography component="p">
            <Link to="/nurse/signup" component={NavLink}>
              สมัครสมาชิกใหม่
            </Link>
          </Typography>
        </Box>
        <Dialog onClose={handleClose} open={open}>
          <div style={{ overflow: "hidden" }}>
            <MoonLoader color="#FF2E29" />
          </div>
        </Dialog>
      </>
    </SimpleLayout>
  )
}
