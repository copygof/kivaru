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

function UserSymptom({ symptom }: { symptom: string }) {
  const classes = useStyle()
  return (
    <div className={classes.symptom}>
      <p className={classes.symptomTitle}>Symptom</p>
      <p className={classes.symptomDescription}>{symptom}</p>
    </div>
  )
}

function UserSymptomDay({ day }: { day: string }) {
  const classes = useStyle()
  return (
    <div className={classes.symptomDay}>
      <p className={classes.symptomTitle}>Day of Symptom</p>
      <p className={classes.symptomDescription}>{day}</p>
    </div>
  )
}

export function UserAttachment(props: any) {
  const classes = useStyle()
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const photos = (props.attachment || []).map((img: string, i: number) => ({
    source: img,
    caption: `attachment ${i + 1}`,
  }))

  return (
    <div className={classes.attachment}>
      <p className={classes.attachmentTitle}>Attach</p>
      <div className={classes.imageRowWrapper}>
        <div className={classes.imageRow}>
          {photos.map((v: any, i: number) => (
            <Button key={v.source} onClick={() => openLightbox(i)}>
              <img className={classes.imageItem} alt="alt" src={v.source} />
            </Button>
          ))}
        </div>
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={photos} />
          </Modal>
        ) : null}
      </ModalGateway>
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

function NurseScreening() {
  const history = useHistory()
  const { bookingId } = useParams()
  const { data, status } = useQueryBookingDetail(bookingId || "")

  function handleClickVideoCall() {
    const friendName = `${data.user?.profile?.firstName} ${data.user?.profile?.lastName}`
    const friendID = data.userId || ""
    history.push(`/nurse/video-call/${friendID}/${friendName}`)
  }

  function handleClickNext() {
    history.push(`/nurse/refer-process/${bookingId}`)
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

const NurseScreeningPage = () => {
  return (
    <NavbarLayout pageTitle="Check">
      <React.Suspense fallback={<Loading />}>
        <NurseScreening />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default NurseScreeningPage
