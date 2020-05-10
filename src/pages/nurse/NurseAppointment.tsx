import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import NavbarLayout from "../../components/layout/NavbarLayout"
import resource from "../../resource"
import { useSelector, useDispatch } from "react-redux"
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
import {
  nurseScreeningSelector,
  clearScreening,
} from "../../redux/nurseScreening"
import { nurseFinishingSelector } from "../../redux/nurseFinishing"
import { updateFinishedChecking } from "../../fireStore/booking"

type DoctorDetail = DoctorSchema & UserSchema

type DoctorProfileProps = {
  doctorDetail: DoctorDetail
}

function DoctorProfile({ doctorDetail }: DoctorProfileProps) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id: doctorId } = useParams()

  const [open, setOpen] = useState(false)
  const isFinishingFlow = useSelector(nurseFinishingSelector.getIsFinishingFlow)
  const nurseFinishing = useSelector(nurseFinishingSelector.getNurseFinishing)
  const nurseScreening = useSelector(nurseScreeningSelector.getNurseScreening)

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null)

  useEffect(() => {
    if (!isFinishingFlow && nurseScreening.bookingDateTime?.seconds) {
      const newDate = moment(nurseScreening.bookingDateTime?.seconds * 1000)
      // @ts-ignore
      setSelectedDate(newDate)
      // @ts-ignore
      setSelectedTime(newDate)
    }
  }, [
    isFinishingFlow,
    nurseScreening.bookingDateTime,
    nurseScreening.bookingDateTime.seconds,
  ])

  useEffect(() => {
    if (isFinishingFlow && nurseFinishing.bookingDateTime?.seconds) {
      const newDate = moment(nurseFinishing.bookingDateTime?.seconds * 1000)
      // @ts-ignore
      setSelectedDate(newDate)
      // @ts-ignore
      setSelectedTime(newDate)
    }
  }, [isFinishingFlow, nurseFinishing.bookingDateTime])

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (date: any | null) => {
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

    if (!isFinishingFlow) {
      const requestBody = {
        doctorId: doctorId,
        bookingId: nurseScreening.bookingId || "",
        status: nurseScreening.status,
        screeningDetail: nurseScreening.screeningDetail,
        bookingDateTime: dateTime.utc().toDate(),
      }

      try {
        setOpen(true)
        await fireStore.booking.updateScreening(requestBody)
        setOpen(false)
        dispatch(clearScreening())
        history.replace("/nurse/home")
      } catch (error) {
        setOpen(false)
        console.log("error => ", error)
        setTimeout(() => {
          alert("Failure")
        }, 1000)
      }
    } else {
      const requestBody = {
        ...nurseFinishing,
        doctorId: doctorId,
        bookingDateTime: dateTime.utc().toDate(),
      }

      try {
        setOpen(true)
        await updateFinishedChecking(requestBody)
        setOpen(false)
        dispatch(clearScreening())
        history.replace("/nurse/home")
      } catch (error) {
        setOpen(false)
        console.log("error => ", error)
        setTimeout(() => {
          alert("Failure")
        }, 1000)
      }
    }
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
        isEnableDefaultDateTime
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        dayList={doctorDetail.working?.day || []}
        timeList={doctorDetail.working?.time || []}
        onClickDate={handleDateChange}
        onClickTime={handleTimeChange}
      />
      <DoctorSpecial skill={doctorDetail.specificSkill} />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Complete
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
