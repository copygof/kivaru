import React, { useState, useEffect } from "react"
import _ from "lodash"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { makeStyles, ButtonBase, Box } from "@material-ui/core"
import moment from "moment"
import {
  ArrowLeft,
  ArrowRight,
  Watch,
  PeopleSharp,
  People,
  Person,
} from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import resource from "../../resource"
import ErrorBoundary from "../../components/common/ErrorBoundary"
import fireStore from "../../fireStore"
import { statusWordingMapping, statusColorMapping } from "../../config/status"

const useStyles = makeStyles({
  dateCounter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 71,
    boxShadow: "0px 2px 3px 1px rgba(255, 42, 42, 0.11)",
  },
  dateText: {
    fontSize: 20,
    color: "#3D3D3D",
  },
  checkStatus: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkStatusBadge: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: 12,
    backgroundColor: "#19769F",
    padding: 0,
  },
  checkStatusText: {
    fontSize: 12,
    marginTop: 8,
    color: "#3D3D3D",
    fontWeight: 400,
    width: 100,
  },
  "checkStatus-next": {
    backgroundColor: "#FF2A2A",
  },
  "checkStatus-checking": {
    backgroundColor: "#06D81E",
  },
  "checkStatus-scanning": {
    backgroundColor: "#6E78F7",
  },
  "checkStatusText-next": {
    color: "#FF2A2A",
  },
  "checkStatusText-checking": {
    color: "#06D81E",
  },
  "checkStatusText-scanning": {
    color: "#6E78F7",
  },
  appointmentCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 71,
    borderRadius: 4,
    border: "1px solid #D5D5D5",
    paddingLeft: 26,
    paddingRight: 16,
  },
  appointmentLeftSection: {
    display: "flex",
    width: 50,
    backgroundColor: "blue",
    flex: "0 0 50px",
    flexDirection: "column",
  },
  iconItem: {
    width: 24,
    height: 24,
    display: "flex",
    flex: "0 0 24px",
  },
  appointmentContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  appointmentStatus: {
    width: 44,
    flexShrink: 0,
    margin: 1,
    flex: "0 0 44px",
  },
  appointmentContentTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  appointmentContentTextTitleDoctor: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#19769F",
  },
  appointmentContentTextDescription: {
    fontSize: 12,
    color: "#95989A",
    // marginTop: 8,
  },
  appointmentContentTextLabel: {
    fontSize: 14,
    color: "#95989A",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

type DateCounterProps = {
  onChangeDate: (date: Date) => void
}

function DateCounter(props: DateCounterProps) {
  const classes = useStyles()
  const [date, setDate] = useState(new Date())

  function handleIncrease() {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + 1)
    setDate(nextDate)
  }
  function handleDecrease() {
    const prevDate = new Date(date)
    prevDate.setDate(date.getDate() - 1)
    setDate(prevDate)
  }

  useEffect(() => {
    props.onChangeDate(date)
  }, [date, props])

  return (
    <div className={classes.dateCounter}>
      <ButtonBase onClick={handleDecrease}>
        <ArrowLeft fontSize="large" />
      </ButtonBase>
      <p className={classes.dateText}>{moment(date).format("DD MMM YYYY")}</p>
      <ButtonBase onClick={handleIncrease}>
        <ArrowRight fontSize="large" />
      </ButtonBase>
    </div>
  )
}

function AppointmentCheckStatus(props: any) {
  const classes = useStyles()
  return (
    <div className={classes.checkStatus}>
      <p
        className={`${classes.checkStatusBadge} ${
          // @ts-ignore
          classes[`checkStatus-${props.status}`]
        }`}
        style={{
          backgroundColor: props.statusColor,
        }}
      >
        {props.number}
      </p>
      <p
        className={`${classes.checkStatusText} ${
          // @ts-ignore
          classes[`checkStatusText-${props.status}`]
        }`}
        style={{
          color: props.statusColor,
        }}
      >
        {_.upperFirst(props.statusText)}
      </p>
    </div>
  )
}

function AppointmentCard(props: {
  number: number
  status: "next" | "checking" | "scanning"
  statusText: string
  statusColor: string
  name: string
  doctorName: string
  time: string
  onClick: () => void
}) {
  const classes = useStyles()
  return (
    <ButtonBase
      onClick={props.onClick}
      style={{
        marginTop: 20,
      }}
    >
      <div
        className={classes.appointmentCard}
        style={{
          ...(props.status === "next"
            ? {
                border: "1px solid #FF2A2A",
              }
            : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            // width: 50,
            flex: "0 0 50px",
            flexDirection: "column",
          }}
        >
          <div className={classes.iconItem}>
            <Person fontSize="small" color="secondary" />
          </div>
          <div className={classes.iconItem}>
            <Watch
              fontSize="small"
              color="secondary"
              style={{ marginTop: 4 }}
            />
          </div>
        </div>

        <div className={classes.appointmentContent}>
          <div className={classes.row}>
            <p className={classes.appointmentContentTextLabel}>ชื่อคนไข้:</p>
            <p className={classes.appointmentContentTextTitle}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${props.name}`}
            </p>
          </div>
          <div className={classes.row}>
            <p className={classes.appointmentContentTextLabel}>พบคุณหมอ:</p>
            <p className={classes.appointmentContentTextTitleDoctor}>
              &nbsp;{`${props.doctorName}`}
            </p>
          </div>
          <div className={classes.row}>
            <p className={classes.appointmentContentTextLabel}>เวลา:</p>
            <p className={classes.appointmentContentTextDescription}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${props.time}`}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 50,
            flex: "0 0 50px",
            flexDirection: "column",
          }}
        >
          <AppointmentCheckStatus
            number={props.number}
            status={props.status}
            statusText={props.statusText}
            statusColor={props.statusColor}
          />
        </div>
      </div>
    </ButtonBase>
  )
}

function useQueryBookingList(date: Date, isNoRefToDoc: boolean) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure" | "empty"
  >("idle")
  const [bookingList, setBookingList] = useState<any>([])

  useEffect(() => {
    async function getBookingList() {
      try {
        setStatus("loading")
        let response

        if (isNoRefToDoc) {
          response = await fireStore.booking.getAllBookingNoRefToDocByDate(date)
        } else {
          response = await fireStore.booking.getAllBookingRefToDocByDate(date)
        }

        setStatus("success")
        setBookingList(response)
      } catch (error) {
        setStatus("failure")
        setBookingList([])
      }
    }

    getBookingList()
  }, [date, isNoRefToDoc])

  return { data: bookingList, status }
}

function AppointmentCardList({
  date,
  isNoRefToDoc,
}: {
  date: Date
  isNoRefToDoc: boolean
}) {
  const history = useHistory()
  const { data: bookingList, status } = useQueryBookingList(date, isNoRefToDoc)

  function handleClickSelectCase(data: any) {
    const doctorId = data.doctorId
    const userId = data.userId
    const bookingId = data.id

    if (data.status === "waitForComplete") {
      return history.push(
        `/nurse/doctor-finished-checking/${bookingId}/${doctorId}/${userId}`
      )
    }

    return history.push(`/nurse/screening/${bookingId}`)
  }

  function displayStatus(bookingStatus: string) {
    // @ts-ignore
    return statusWordingMapping[bookingStatus]
    // @ts-ignore
    return {
      waitForScanning: "scanning",
      waitForChecking: "scanning",
      waitForComplete: "checking",
      complete: "complete",
    }[bookingStatus]
  }

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          // flex: "none",
          flexFlow: "column",
          marginTop: 20,
        }}
      >
        <Loading />
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        // flex: "none",
        flexFlow: "column",
      }}
    >
      {bookingList.map((data: any, index: number) => (
        <AppointmentCard
          key={data.id}
          onClick={() => handleClickSelectCase(data)}
          number={index + 1}
          status={data.status}
          statusText={displayStatus(data.status)}
          // @ts-ignore
          statusColor={statusColorMapping[data.status]}
          name={`${data.user?.profile?.firstName} ${data.user?.profile?.lastName}`}
          doctorName={
            data.doctor.isGeneralDoctor
              ? "-"
              : `${data.doctor?.profile?.firstName} ${data.doctor?.profile?.lastName}`
          }
          time={moment(data.datetime.seconds * 1000).format("HH:mm")}
        />
      ))}
    </div>
  )
}

function NurseReFer({ isNoRefToDoc }: { isNoRefToDoc: boolean }) {
  const history = useHistory()
  const [date, setDate] = useState(new Date())

  function handleChangeDate(dat: Date) {
    setDate(dat)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          height: 77,
          flex: "0 0",
          marginBottom: 20,
        }}
      >
        <DateCounter onChangeDate={handleChangeDate} />
      </div> */}
      <Box>
        <DateCounter onChangeDate={handleChangeDate} />
        <AppointmentCardList date={date} isNoRefToDoc={isNoRefToDoc} />
      </Box>
      {/* <p style={{ fontSize: 20, textAlign: "center" }}>Not found</p> */}
    </div>
  )
}

export default function NurseReFerPage({
  isNoRefToDoc,
}: {
  isNoRefToDoc: boolean
}) {
  return (
    <NavbarLayout
      // pageTitle={isNoRefToDoc ? "Not Refer to Doctor" : "Refer to Doctor"}
      pageTitle="ตารางนัดหมาย"
    >
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <NurseReFer isNoRefToDoc={isNoRefToDoc} />
        </React.Suspense>
      </ErrorBoundary>
    </NavbarLayout>
  )
}
