import React, { useState, useEffect } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { useHistory, useParams } from "react-router-dom"
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Dialog,
  Select,
  MenuItem,
  InputBase,
  withStyles,
  Theme,
  createStyles,
  ButtonBase,
} from "@material-ui/core"

import MoonLoader from "react-spinners/MoonLoader"
import { ImageSources } from "../../assets"
import fireStore from "../../fireStore"
import { useDispatch } from "react-redux"
import { refToDocPrepared } from "../../redux/nurseScreening"

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      color: "#19769F",
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase)

function Evaluation({
  onEvaluation,
  evaluation,
}: {
  onEvaluation: (evaluation: "noPlan" | "moderate" | "verySevere") => void
  evaluation: "noPlan" | "moderate" | "verySevere"
}) {
  function handleSelectEvaluation(value: "noPlan" | "moderate" | "verySevere") {
    return () => {
      onEvaluation(value)
    }
  }

  return (
    <Box>
      <Typography style={{ color: "#3D3D3D", fontWeight: "bold" }}>
        การประเมินผล
      </Typography>
      <Box display="flex" justifyContent="space-around" paddingTop="22px">
        <ButtonBase onClick={handleSelectEvaluation("noPlan")}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{ width: 65, height: 65 }}
              alt="select-evaluation"
              src={ImageSources.NO_PLAN}
            />
            <Typography
              style={{
                color: evaluation === "noPlan" ? "#3D3D3D" : "#D6D6D6",
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              ปกติ
            </Typography>
          </Box>
        </ButtonBase>
        <ButtonBase onClick={handleSelectEvaluation("moderate")}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{ width: 65, height: 65 }}
              alt="select-evaluation"
              src={ImageSources.MODERATE}
            />
            <Typography
              style={{
                color: evaluation === "moderate" ? "#3D3D3D" : "#D6D6D6",
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              ปานกลาง
            </Typography>
          </Box>
        </ButtonBase>
        <ButtonBase onClick={handleSelectEvaluation("verySevere")}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{ width: 65, height: 65 }}
              alt="select-evaluation"
              src={ImageSources.VERY_SEVERE}
            />
            <Typography
              style={{
                color: evaluation === "verySevere" ? "#3D3D3D" : "#D6D6D6",
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              รุนแรงมาก
            </Typography>
          </Box>
        </ButtonBase>
      </Box>
    </Box>
  )
}

function useQueryBookingDetail(bookingId: string) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure" | "empty"
  >("idle")
  const [data, setData] = useState<any>({})

  useEffect(() => {
    async function getBookingList() {
      try {
        setStatus("loading")
        const response = await fireStore.booking.getBookingById(bookingId || "")

        setStatus("success")
        setData(response)
      } catch (error) {
        setStatus("failure")
        setData({})
      }
    }

    getBookingList()
  }, [bookingId])

  return { data, status }
}

function NurseReFerProcess() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { bookingId } = useParams()
  const [additionalSymptom, setAdditionalSymptom] = useState("")
  const [temperature, setTemperature] = useState("")
  const [action, setAction] = useState<
    "noReferToDoctor" | "referToDoctor" | "nextAppointment"
  >("noReferToDoctor")
  const [evaluation, setEvaluation] = useState<
    "noPlan" | "moderate" | "verySevere"
  >("noPlan")
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  const { data, status } = useQueryBookingDetail(bookingId || "")

  useEffect(() => {
    if (status === "success") {
      setAction(data.screeningDetail?.status || "noReferToDoctor")
      setEvaluation(data.screeningDetail?.evaluation || "noPlan")
      setTemperature(data.screeningDetail?.temperature || "")
      setAdditionalSymptom(data.screeningDetail?.nurseComment || "")
    }
  }, [data.screeningDetail, status])

  async function handleSubmit() {
    const requestBody = {
      doctorId: data.doctorId,
      bookingId: bookingId || "",
      status: action,
      screeningDetail: {
        evaluation,
        temperature,
        nurseComment: additionalSymptom,
        status: action,
      },
      bookingDateTime: data.datetime,
    }

    if (action === "noReferToDoctor") {
      try {
        setOpen(true)
        await fireStore.booking.updateScreening(requestBody)
        setOpen(false)
        history.replace("/nurse/home")
      } catch (error) {
        setOpen(false)
        console.log("error => ", error)
        setTimeout(() => {
          alert("Failure")
        }, 1000)
      }
    }

    if (action === "referToDoctor") {
      dispatch(refToDocPrepared(requestBody))
      history.replace("/nurse/find-doctor")
    }

    if (action === "nextAppointment") {
      dispatch(refToDocPrepared(requestBody))
      history.replace("/nurse/find-doctor")
    }
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between"></Box>
      <Box marginTop={2}>
        <FormControl fullWidth>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={action}
            onChange={(e: any) => setAction(e.target?.value || "")}
            input={<BootstrapInput />}
          >
            <MenuItem value="noReferToDoctor">ปิดเคส</MenuItem>
            <MenuItem value="referToDoctor">ส่งต่อหมอ</MenuItem>
            <MenuItem value="nextAppointment">นัดครั้งต่อไป</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box marginTop={2}>
        <Evaluation onEvaluation={setEvaluation} evaluation={evaluation} />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="อุณหภูมิ"
          type="textArea"
          variant="outlined"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </Box>
      <Box marginTop={2} display="flex" flex={1}>
        <TextField
          multiline
          rows={5}
          fullWidth
          id="outlined-password-input"
          label="ความเห็นเพิ่มเติม"
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
          ถัดไป
        </Button>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <MoonLoader color="#FF2E29" />
      </Dialog>
    </div>
  )
}

export default function NurseReFerProcessPage() {
  return (
    <NavbarLayout pageTitle="การวินิจฉัยเบื้องต้น">
      <React.Suspense fallback={<Loading />}>
        <NurseReFerProcess />
      </React.Suspense>
    </NavbarLayout>
  )
}
