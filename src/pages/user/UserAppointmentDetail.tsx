import React from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Box, ButtonBase, Typography } from "@material-ui/core"
import { Loading } from "../../components/common/Loading"
import { useHistory } from "react-router-dom"
import resource from "../../resource"
import moment from "moment"
import { DoctorSchema } from "../../fireStore/doctor"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { UserSchema } from "../../fireStore/user"
import { useSelector } from "react-redux"
import ErrorBoundary from "../../components/common/ErrorBoundary"

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
    height: 85,
    borderBottom: "1px solid #D5D5D5",
    backgroundColor: "#ffffff",
  },
})

type ItemProps = {
  datetime: number
  fullName: string
  detail: string
  onClick: () => void
}

function Item(props: ItemProps) {
  const classes = useStyle()

  return (
    <ButtonBase className={classes.item} onClick={props.onClick}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h5" className={classes.datetime}>
          {/* {"Wednesday, April 8, 2020 "} */}
          {moment(props.datetime * 1000).format("dddd, MMM D, YYYY : HH:mm")}
        </Typography>
        <Typography className={classes.name}>{props.fullName}</Typography>
        <Typography className={classes.location}>{props.detail}</Typography>
      </Box>
    </ButtonBase>
  )
}

function BookingList() {
  const history = useHistory()
  const userId = useSelector((state: any) => state.auth.userId)
  const bookingList = resource.booking.listByUserId.read(userId)

  function handleClickDoctor(doctorId?: string) {
    return () => {
      // history.push(`/user/doctor-appointment/${doctorId}`)
    }
  }

  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="column">
      {bookingList.map((booking: any) => (
        <Item
          key={booking.id}
          datetime={booking.datetime?.seconds}
          fullName={booking.fullName}
          detail={booking.detail}
          onClick={handleClickDoctor(booking.id)}
        />
      ))}
    </Box>
  )
}

export default function UserAppointmentDetail() {
  return (
    <NavbarLayout pageTitle="Appointment Detail">
      <ErrorBoundary errorText="Not found">
        <React.Suspense fallback={<Loading />}>
          <BookingList />
        </React.Suspense>
      </ErrorBoundary>
    </NavbarLayout>
  )
}
