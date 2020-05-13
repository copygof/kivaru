import React, { useState, useEffect } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { Button, makeStyles } from "@material-ui/core"
import UserInfo from "../../components/features/doctor/UserInfo"
import { VideoCall } from "@material-ui/icons"
import Carousel, { Modal, ModalGateway } from "react-images"
import { useHistory, useParams } from "react-router-dom"
import fireStore from "../../fireStore"
import moment from "moment"
import {
  UserAttachment,
  UserSymptom,
  UserSymptomDay,
} from "../nurse/NurseScreeningPage"

const useStyle = makeStyles({
  symptom: {
    marginTop: 23,
    padding: "18px 22px",
    borderTop: "1px solid #D5D5D5",
    borderBottom: "1px solid #D5D5D5",
  },
  symptomDay: {
    padding: "18px 22px",
    borderBottom: "1px solid #D5D5D5",
  },
  symptomTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  symptomDescription: {
    fontSize: 12,
    color: "#95989A",
    marginTop: 8,
  },
  attachment: {
    padding: "18px 22px",
    borderBottom: "1px solid #D5D5D5",
  },
  attachmentTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  imageRowWrapper: {
    display: "flex",
    overflowX: "scroll",
    // overflowX: "scroll",
    // overflow: "hidden",
    width: "450px",
  },
  imageRow: {
    display: "flex",
    flexDirection: "row",
    // flex: "0 0 500px",
  },
  imageItem: {
    height: 130,
    width: 105,
    marginRight: 15,
  },
})

// function UserSymptom({ symptom }: { symptom: string }) {
//   const classes = useStyle()
//   return (
//     <div className={classes.symptom}>
//       <p className={classes.symptomTitle}>Symptom</p>
//       <p className={classes.symptomDescription}>{symptom}</p>
//     </div>
//   )
// }

// function UserSymptomDay({ day }: { day: string }) {
//   const classes = useStyle()
//   return (
//     <div className={classes.symptomDay}>
//       <p className={classes.symptomTitle}>Day of Symptom</p>
//       <p className={classes.symptomDescription}>{day}</p>
//     </div>
//   )
// }

function NurseScreening({ comment }: { comment: string }) {
  const classes = useStyle()
  return (
    <div className={classes.symptomDay}>
      <p className={classes.symptomTitle}>ความเห็นของพยาบาล</p>
      <p className={classes.symptomDescription}>
        {comment.split("\n").map((item, key) => {
          return (
            <React.Fragment key={key}>
              {item}
              <br />
            </React.Fragment>
          )
        })}
      </p>
    </div>
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

function DoctorScreening() {
  const history = useHistory()
  const { bookingId } = useParams()
  const { data, status } = useQueryBookingDetail(bookingId || "")

  function handleClickVideoCall() {
    const friendName = `${data.user?.profile?.firstName} ${data.user?.profile?.lastName}`
    const friendID = data.userId || ""
    history.push(`/doctor/video-call/${friendID}/${friendName}`)
  }

  function handleClickNext() {
    history.push(`/doctor/medical-records/${bookingId}`)
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <div
      style={{
        display: "flex",
        // backgroundColor: "pink",
        flexDirection: "column",
      }}
    >
      <UserInfo
        isPreview
        image={data.user?.profile?.imageProfile || ""}
        name={`${data.user?.profile?.firstName} ${data.user?.profile?.lastName}`}
        date={moment(data.datetime?.seconds * 1000).format("dddd, MMM D, YYYY")}
        time={moment(data.datetime?.seconds * 1000).format("HH:mm")}
      />
      <UserSymptom symptom={data.symptom} />
      <UserSymptomDay day={data.dayOfSymptom} />
      <NurseScreening
        comment={`
  การประเมินผล: ${data.screeningDetail?.evaluation || "-"}\n
  อุณหภูมิ: ${data.screeningDetail?.temperature || "-"}\n
  ความเห็นเพิ่มเติม: ${data.screeningDetail?.nurseComment || "-"}
`}
      />
      <UserAttachment attachment={data.attachment} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClickVideoCall}
        >
          <VideoCall />
          <p style={{ marginLeft: 8 }}>Video call</p>
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClickNext}
          style={{ marginLeft: 20 }}
        >
          <p style={{ marginLeft: 8 }}>Next</p>
        </Button>
      </div>
    </div>
  )
}

const DoctorScreeningPage = () => {
  return (
    <NavbarLayout pageTitle="ข้อมูลคนไข้">
      <React.Suspense fallback={<Loading />}>
        <DoctorScreening />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default DoctorScreeningPage
