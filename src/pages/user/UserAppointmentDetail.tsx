import React, { useState, useEffect } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Box, ButtonBase, Typography, Button } from "@material-ui/core"
import { Loading } from "../../components/common/Loading"
import { useHistory } from "react-router-dom"
import resource from "../../resource"
import moment from "moment"
import { DoctorSchema } from "../../fireStore/doctor"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { UserSchema } from "../../fireStore/user"
import { useSelector } from "react-redux"
import ErrorBoundary from "../../components/common/ErrorBoundary"
import { statusWordingMapping, statusColorMapping } from "../../config/status"
import { getBookingByUserId } from "../../fireStore/booking"

const useStyle = makeStyles({
  datetime: {
    color: "#51565F",
    // fontSize: 16,
    textAlign: "left",
  },
  name: {
    color: "#19769F",
    // fontSize: 18,
    textAlign: "left",
    flex: 1,
    fontWeight: "bold",
  },
  location: {
    color: "#95989A",
    // fontSize: 16,
    alignItems: "flex-start",
    display: "flex",
  },
  item: {
    height: 90,
    borderBottom: "1px solid #D5D5D5",
    backgroundColor: "#ffffff",
  },
})

type ItemProps = {
  datetime: number
  fullName: string
  detail: string
  onClick: () => void
  status: string
}

function Item(props: ItemProps) {
  const classes = useStyle()

  const momentTime = moment(props.datetime * 1000)

  // @ts-ignore
  const status = statusWordingMapping[props.status]
  // @ts-ignore
  const colorStatus = statusColorMapping[props.status]

  return (
    <ButtonBase className={classes.item} onClick={props.onClick}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box display="flex" flex={1}>
            <Typography variant="h5" className={classes.datetime}>
              {/* {"Wednesday, April 8, 2020 "} */}
              {/* {momentTime.format("dd dddd, MMM D, YYYY : HH:mm")} */}
              {`${momentTime.format("dddd ที่ D MMM YYYY, เวลา HH:mm")}`}
            </Typography>
          </Box>
          <Button
            disabled
            variant="outlined"
            style={{
              borderRadius: "100px",
              height: 34,
              border: "1px solid #ECECEC",
              boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
              color: colorStatus,
              fontWeight: "bold",
              fontSize: 10,
            }}
          >
            {status}
          </Button>
        </Box>
        <Typography className={classes.name}>{props.fullName}</Typography>
        <Typography className={classes.location}>{props.detail}</Typography>
      </Box>
    </ButtonBase>
  )
}

export function useQueryBookingListByUserId(userId: string) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure" | "empty"
  >("idle")
  const [data, setData] = useState<any>([])

  useEffect(() => {
    async function getBookingList() {
      try {
        setStatus("loading")
        const response = await getBookingByUserId(userId)

        setStatus("success")
        setData(response)
      } catch (error) {
        setStatus("failure")
        setData([])
      }
    }

    getBookingList()
  }, [userId])

  return { data, status }
}

function BookingList() {
  const history = useHistory()
  const userId = useSelector((state: any) => state.auth.userId)
  const { data: bookingList, status } = useQueryBookingListByUserId(
    userId || ""
  )

  function handleClickDoctor(doctorId?: string) {
    return () => {
      // history.push(`/user/doctor-appointment/${doctorId}`)
    }
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="column">
      {bookingList.map((booking: any) => (
        <Item
          key={booking.id}
          datetime={booking.datetime?.seconds}
          fullName={`${booking?.doctor?.profile?.firstName} ${booking?.doctor?.profile?.lastName}`}
          detail={booking.doctor?.graduate}
          onClick={handleClickDoctor(booking.id)}
          status={booking.status}
        />
      ))}
    </Box>
  )
}

export default function UserAppointmentDetail() {
  return (
    <NavbarLayout pageTitle="ตารางนัดตรวจ">
      <ErrorBoundary errorText="Not found">
        <React.Suspense fallback={<Loading />}>
          <BookingList />
        </React.Suspense>
      </ErrorBoundary>
    </NavbarLayout>
  )
}
