import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import NavbarLayout from "../../components/layout/NavbarLayout"
import resource from "../../resource"
import { useSelector } from "react-redux"
import DoctorWorkingDate from "../../components/features/doctor/DoctorWorkingDate"
import MoonLoader from "react-spinners/MoonLoader"
import { DoctorSchema, WorkingDay, WorkingTime } from "../../fireStore/doctor"

import { Button, Dialog } from "@material-ui/core"
import fireStore from "../../fireStore"
// import DateFnsUtils from "@date-io/date-fns"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { UserSchema } from "../../fireStore/user"
import DoctorSpecial from "../doctor/DoctorSpecial"
import { Loading } from "../../components/common/Loading"

type DoctorDetail = DoctorSchema & UserSchema

type DoctorProfileProps = {
  doctorDetail: DoctorDetail
}

function DoctorProfile({ doctorDetail }: DoctorProfileProps) {
  const history = useHistory()
  const [open, setOpen] = useState(false)

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null)

  const handleDateChange = (date: any | null) => {
    // const dateTime = moment(date).format("DD-MM-YYYY HH:mm:ss")
    // console.log("date => ", date)
    // console.log("handleDateChange => ", dateTime)
    setSelectedDate(date)
  }

  const handleTimeChange = (date: any | null) => {
    // console.log("handleTimeChange => ", date)
    setSelectedTime(date)
  }

  function handleClose() {
    setOpen(false)
  }

  async function onSubmit() {
    // @ts-ignore
    const selectedDateM = moment(selectedDate).format("DD-MM-YYYY")
    // @ts-ignore
    const selectedTimeM = moment(selectedTime).format("HH:mm:ss")
    const dateTime = moment(
      `${selectedDateM} ${selectedTimeM}`,
      "DD-MM-YYYY HH:mm:ss"
    )

    history.push(
      `/user/symptom/${doctorDetail.id}/${selectedDateM} ${selectedTimeM}`
    )
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        justifyContent: "flex-start",
      }}
    >
      <DoctorInfo
        isPreview
        name={`${doctorDetail.profile?.firstName} ${doctorDetail.profile?.lastName}`}
        skill={doctorDetail.graduate}
        location={doctorDetail.hospital}
        image={doctorDetail.profile.imageProfile}
        rating={0}
      />
      <DoctorWorkingDate
        isDisabledDate={false}
        isDisabledTime={false}
        isDisabledDateList
        isDisabledTimeList
        dayList={doctorDetail.working?.day || []}
        timeList={doctorDetail.working?.time || []}
        onClickDate={handleDateChange}
        onClickTime={handleTimeChange}
      />
      <DoctorSpecial skill={doctorDetail.specificSkill} />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Appointment
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <MoonLoader color="#FF2E29" />
      </Dialog>
    </div>
  )
}

function DoctorProfileFetcher() {
  const { id } = useParams()

  const doctorDetail: DoctorSchema & UserSchema = resource.doctor.detail.read(
    id
  )

  return <DoctorProfile doctorDetail={doctorDetail} />
}

const UserAppointment = () => {
  return (
    <NavbarLayout pageTitle="Doctor Details">
      <React.Suspense fallback={<Loading />}>
        <DoctorProfileFetcher />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default UserAppointment
