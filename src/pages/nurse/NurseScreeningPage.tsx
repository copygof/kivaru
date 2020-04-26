import React, { useState } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { Button, makeStyles } from "@material-ui/core"
import UserInfo from "../../components/features/doctor/UserInfo"
import { VideoCall } from "@material-ui/icons"
import Carousel, { Modal, ModalGateway } from "react-images"
import { useHistory } from "react-router-dom"

const useStyle = makeStyles({
  symptom: {
    marginTop: 23,
    padding: "18px 22px",
    borderTop: "1px solid #D5D5D5",
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

function UserAttachment() {
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

  const photos = [
    {
      source: "https://picsum.photos/200",
      title: "Alt",
    },
    {
      source: "https://picsum.photos/200",
      title: "Alt",
    },
    {
      source: "https://picsum.photos/200",
      title: "Alt",
    },
    {
      source: "https://picsum.photos/200",
      title: "Alt",
    },
  ]

  return (
    <div className={classes.attachment}>
      <p className={classes.attachmentTitle}>Attach</p>
      <div className={classes.imageRowWrapper}>
        <div className={classes.imageRow}>
          {photos.map((v, i) => (
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

function NurseScreening() {
  const history = useHistory()
  const symptom = `My ankle is red and swollen. , I feel itchy on my ankle. ,
  My ankle is stiff and sore`

  function handleClickVideoCall() {
    // DoctorMedicalRecordsPage
    history.push("/nurse/refer-process")
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
        image=""
        name="Preecha Sattabut"
        isPreview
        date="Monday, April 14, 2020 "
        time="06:00"
      />
      <UserSymptom symptom={symptom} />
      <UserAttachment />
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
