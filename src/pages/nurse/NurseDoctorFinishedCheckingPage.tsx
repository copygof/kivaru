import React, { useState, useEffect } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import { Box, Typography, TextField, Button, Dialog } from "@material-ui/core"
import { useHistory, useParams } from "react-router-dom"
import { VideoCall } from "@material-ui/icons"
import MoonLoader from "react-spinners/MoonLoader"
import resource from "../../resource"
import fireStore from "../../fireStore"
import { getDoctorById, getDoctorProfileByUserId } from "../../fireStore/doctor"
import { useDispatch } from "react-redux"
import { startFinishingFlow } from "../../redux/nurseFinishing"
import { statusWordingMapping } from "../../config/status"

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

// function useDoctorDetail(userId: string) {
//   const [status, setStatus] = useState<
//     "idle" | "loading" | "success" | "failure" | "empty"
//   >("idle")
//   const [data, setData] = useState<any>({})

//   useEffect(() => {
//     async function getData() {
//       try {
//         setStatus("loading")
//         const response = await getDoctorProfileByUserId(userId)

//         setStatus("success")
//         setData(response)
//       } catch (error) {
//         setStatus("failure")
//         setData({})
//       }
//     }

//     getData()
//   }, [userId])

//   return { data, status }
// }

function NurseDoctorFinishedChecking() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { bookingId, doctorId, userId } = useParams()
  const [additionalSymptom, setAdditionalSymptom] = useState<string>("")
  const [action, setAction] = useState<
    "complete" | "referToDoctor" | "nextAppointment"
  >("complete")
  const [open, setOpen] = useState(false)

  const { data, status } = useQueryBookingDetail(bookingId || "")

  useEffect(() => {
    if (status === "success") {
      setAction(data.checkingDetail?.status || "complete")
      setAdditionalSymptom(data.checkingDetail?.additionalSymptom)
    }
  }, [data.checkingDetail, status])

  const userDetail = data.user
  const doctorDetail = data.doctor

  // console.log("data => ", data)
  // console.log("doctorDetail => ", doctorDetail)

  function handleSelectAction(
    act: "complete" | "referToDoctor" | "nextAppointment"
  ) {
    return () => {
      setAction(act)
    }
  }

  function handleClose() {
    setOpen(false)
  }

  async function handleSubmit() {
    if (action === "complete") {
      try {
        setOpen(true)
        await fireStore.booking.updateFinishedChecking({
          doctorId: data.doctorId,
          bookingId: bookingId || "",
          status: action,
          bookingDateTime: data.datetime,
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

    if (action === "referToDoctor") {
      dispatch(
        startFinishingFlow({
          doctorId: data.doctorId,
          bookingId: bookingId || "",
          status: action,
          bookingDateTime: data.datetime,
        })
      )
      history.replace("/nurse/find-doctor")
    }

    if (action === "nextAppointment") {
      dispatch(
        startFinishingFlow({
          doctorId: data.doctorId,
          bookingId: bookingId || "",
          status: action,
          bookingDateTime: data.datetime,
        })
      )
      history.replace("/nurse/find-doctor")
    }
  }

  function handleClickVideoCall() {
    const friendName = `${userDetail.profile.firstName} ${userDetail.profile.lastName}`
    const friendID = userId || ""
    history.push(`/nurse/video-call/${friendID}/${friendName}`)
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <div>
      <Box marginTop={2}>
        <DoctorInfo
          isPreview
          name={`${doctorDetail?.profile?.firstName} ${doctorDetail?.profile?.lastName}`}
          skill={doctorDetail?.graduate}
          location={doctorDetail?.hospital}
          image={doctorDetail?.profile?.imageProfile}
          rating={0}
        />
      </Box>
      <Box marginTop={2} display="flex" flexDirection="row">
        <Box>
          <Typography style={{ fontWeight: "bold" }} color="secondary">
            ชื่อคนไข้
          </Typography>
          <Typography
            style={{ fontWeight: "bold" }}
            variant="h5"
            component="h4"
          >
            {`${userDetail?.profile?.firstName} ${userDetail?.profile?.lastName}`}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          style={{
            borderRadius: "100px",
            height: 34,
            border: "1px solid #ECECEC",
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
            // @ts-ignore
            color: "#06D81E",
            fontWeight: "bold",
            fontSize: 10,
          }}
        >
          {/**  @ts-ignore */}
          {data.checkingDetail?.status}
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
          นัดพบครั้งถัดไป
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
          ส่งต่อไปยังหมอ
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
          ปิดเคส
        </Button>
      </Box>

      <Box marginTop={2}>
        <TextField
          disabled
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
          onClick={handleClickVideoCall}
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
        <div style={{ overflow: "hidden" }}>
          <MoonLoader color="#FF2E29" />
        </div>
      </Dialog>
    </div>
  )
}

export default function NurseDoctorFinishedCheckingPage() {
  return (
    <NavbarLayout pageTitle="บันทึกทางการแพทย์">
      <React.Suspense fallback={<Loading />}>
        <NurseDoctorFinishedChecking />
      </React.Suspense>
    </NavbarLayout>
  )
}
