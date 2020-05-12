import React, { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  ButtonBase,
} from "@material-ui/core"
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { useHistory, useParams } from "react-router-dom"
import { Dialog } from "@material-ui/core"
import MoonLoader from "react-spinners/MoonLoader"
import { useSelector } from "react-redux"
import fireStore from "../../fireStore"
import moment from "moment"
import { ImageSources } from "../../assets"

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

function PreviewImage(props: any) {
  return (
    <Box
      style={{
        height: 105,
        width: 190,
        padding: 20,
        border: "1px solid #D6D6D6",
        // backgroundColor: "pink",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <img
        alt="upload image"
        src={props.image}
        style={
          {
            // height: 105,
            // width: 190,
          }
        }
      />
    </Box>
  )
}

function UploadButton(props: any) {
  return (
    <Box
      style={{
        height: 63,
        width: 147.67,
        padding: 20,
        border: "1px solid #D6D6D6",
        // backgroundColor: "pink",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <img
        alt="upload alt"
        src={ImageSources.CLIPS}
        style={{
          width: 20.88,
          height: 18.62,
          display: "flex",
          alignSelf: "center",
          position: "absolute",
          right: "50%",
          marginRight: -(20.88 / 2),
        }}
      />
    </Box>
  )
}

const UserSymptomPage = () => {
  const history = useHistory()
  const { id, dateTime } = useParams()
  const [dayOfSymptom, setDayOfSymptom] = useState(1)
  const [open, setOpen] = useState(false)
  const [symptom, setSymptom] = useState("")
  const userId = useSelector((state: any) => state.auth.userId)

  const [attachments, setAttachment] = useState<
    {
      filePath: string
      rawImage: any
    }[]
  >([])

  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0]
    setAttachment((attachment) => [
      ...attachment,
      {
        filePath: URL.createObjectURL(image),
        rawImage: image,
      },
    ])
  }

  const handleDeleteAttachments = () => {
    setAttachment((attachment) => attachment.splice(0, attachment?.length - 1))
  }

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
      const datetime = moment(dateTime, "DD-MM-YYYY HH:mm:ss")
      // const bookingDate =  new Date(dateTime || "")
      const response = await fireStore.booking.createBooking({
        userId, // TODO
        doctorId: id || "",
        // datetime: bookingDate, // TODO
        datetime: datetime.utc().toDate(), // TODO
        symptom,
        dayOfSymptom: dayOfSymptom,
        attachment: attachments,
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
    <NavbarLayout pageTitle="อาการเบื้องต้น">
      <>
        <Box marginTop={2} display="flex">
          <Typography variant="h4" component="h4" color="primary">
            อาการเบื้องต้น
          </Typography>
        </Box>
        <Box marginTop={2}>
          <TextField
            multiline
            rows={5}
            fullWidth
            id="outlined-password-input"
            label="โปรดระบุอาการเบื้องต้น"
            type="textArea"
            variant="outlined"
            value={symptom}
            onChange={handleOnChange("symptom")}
          />
        </Box>
        <Box marginTop={2} display="flex">
          <Typography variant="h5" component="h4">
            ระยะเวลาที่มีอาการ ?
          </Typography>
        </Box>
        <Box
          marginTop={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
        <Box marginTop={2} display="flex">
          <Typography variant="h5" component="h4" style={{ color: "#19769F" }}>
            แนบไฟล์รูปภาพ
          </Typography>
        </Box>
        <Box marginTop={2}>
          {attachments.map((attachment) => (
            <PreviewImage image={attachment?.filePath} />
          ))}
          <input
            type="file"
            onChange={handleImageAsFile}
            id="contained-button-file"
            style={{ display: "none" }}
          />
          {!attachments.length && (
            <label htmlFor="contained-button-file">
              <ButtonBase component="span">
                <UploadButton />
              </ButtonBase>
            </label>
          )}
        </Box>
        <Box marginTop={2}>
          {!!attachments.length && (
            <label htmlFor="contained-button-file">
              <Button
                component="span"
                variant="outlined"
                color="primary"
                fullWidth
              >
                เพิมรูปภาพ
              </Button>
            </label>
          )}
        </Box>
        <Box marginTop={2} display="flex" />
        {!!attachments.length && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDeleteAttachments}
          >
            ลบรูปภาพ
          </Button>
        )}
        <Box marginTop={2} display="flex" />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          นัดตรวจ
        </Button>
        <Dialog onClose={handleClose} open={open}>
          <MoonLoader color="#FF2E29" />
        </Dialog>
      </>
    </NavbarLayout>
  )
}

export default UserSymptomPage
