import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import NavbarLayout from "../../components/layout/NavbarLayout"
import resource from "../../resource"
import { useSelector } from "react-redux"
import DoctorWorkingDate from "../../components/features/doctor/DoctorWorkingDate"
import MoonLoader from "react-spinners/MoonLoader"
import {
  DoctorSchema,
  WorkingDay,
  WorkingTime,
  getDoctorById,
} from "../../fireStore/doctor"

import { Button, Dialog, Box } from "@material-ui/core"
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

  const dayList = doctorDetail.isGeneralDoctor
    ? []
    : doctorDetail.working?.day || []
  const timeList = doctorDetail.isGeneralDoctor
    ? []
    : doctorDetail.working?.time || []

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
        name={`${doctorDetail?.profile?.firstName} ${doctorDetail?.profile?.lastName}`}
        skill={doctorDetail?.graduate}
        location={doctorDetail?.hospital}
        isGeneralDoctor={doctorDetail?.isGeneralDoctor || false}
        image={doctorDetail?.profile?.imageProfile}
        rating={0}
      />
      <DoctorWorkingDate
        isDisabledDate={false}
        isDisabledTime={false}
        isDisabledDateList
        isDisabledTimeList
        dayList={dayList}
        timeList={timeList}
        onClickDate={handleDateChange}
        onClickTime={handleTimeChange}
      />
      {!doctorDetail?.isGeneralDoctor ? (
        <DoctorSpecial skill={doctorDetail.specificSkill} />
      ) : (
        <Box marginTop={2} />
      )}
      <Button variant="contained" color="primary" onClick={onSubmit}>
        ระบุวันที่นัดหมาย
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <MoonLoader color="#FF2E29" />
      </Dialog>
    </div>
  )
}

export function useDoctorDetail(doctorId: string) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure" | "empty"
  >("idle")
  const [data, setData] = useState<any>({})

  useEffect(() => {
    async function getDoctorDetail() {
      try {
        setStatus("loading")
        const response = await getDoctorById(doctorId)

        setStatus("success")
        setData(response)
      } catch (error) {
        setStatus("failure")
        setData({})
      }
    }

    getDoctorDetail()
  }, [doctorId])

  return { data, status }
}

function DoctorProfileFetcher() {
  const { id } = useParams()
  const { data: doctorDetail, status } = useDoctorDetail(id || "")

  if (status === "loading") {
    return <Loading />
  }

  return <DoctorProfile doctorDetail={doctorDetail} />
}

const UserAppointment = () => {
  return (
    <NavbarLayout pageTitle="รายละเอียดหมอ">
      <React.Suspense fallback={<Loading />}>
        <DoctorProfileFetcher />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default UserAppointment
