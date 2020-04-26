// @ts-nocheck
import React from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { useParams, useHistory } from "react-router-dom"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import { Loading } from "../../components/common/Loading"
import { Button, Box, Grid } from "@material-ui/core"
// import DateFnsUtils from "@date-io/date-fns"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"

const doctorDetail = {
  id: "uiGainnyvn2wSbYTRY0t",
  userId: "uiGainnyvn2wSbYTRY0t",
  specificSkill: "Cosmetic Dermatology",
  description: "",
  review: [],
  hospital: "Thammasat University Hospital",
  graduate: "",
  ratings: 4.5,
  userGroup: "doctor",
  address: {
    country: "",
    addressLine3: "",
    postCode: "",
    addressLine2: "",
    zip: "",
    address: "",
    addressLine1: "",
    city: "",
    state: "",
  },
  profile: {
    gender: "male",
    firstName: "Dr. Gateorn",
    phoneNumber: "1111111111",
    dob: { seconds: 1587309685, nanoseconds: 532000000 },
    email: "dsadsa",
    imageProfile: "rewrwerew",
    lastName: "Pongarnar",
  },
  account: {
    tempPassword: "",
    isForceResetPassword: false,
    type: "normal",
    isCompleteRegister: false,
    identity: { phoneNumber: {}, google: {}, facebook: {} },
    identityChannel: "phoneNumber",
  },
}

function AppointmentDetail() {
  const history = useHistory()
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  // const doctorDetail: DoctorSchema & UserSchema = resource.doctor.detail.read(
  //   id
  // )

  function handleOnSubmit() {
    const dateTime = moment(selectedDate).format("DD-MM-YYYY HH:mm:ss")
    history.push(`/user/symptom/${id}/${selectedDate}`)
  }

  return (
    <>
      <DoctorInfo
        isPreview
        name={`${doctorDetail.profile?.firstName} ${doctorDetail.profile?.lastName}`}
        skill={doctorDetail.specificSkill}
        location={doctorDetail.hospital}
        rating={0}
      />
      <Box
        height="307px"
        borderColor="#19769F"
        border={1}
        padding={1}
        borderRadius={4}
        marginTop="18px"
        marginBottom={4}
        width="auto"
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid container justify="space-around">
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Box>
      <Button variant="contained" color="primary" onClick={handleOnSubmit}>
        Appointment
      </Button>
    </>
  )
}

const UserAppointment = () => {
  return (
    <NavbarLayout pageTitle="Doctor Details">
      <React.Suspense fallback={<Loading />}>
        <AppointmentDetail />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default UserAppointment
