import React, { useState, useEffect } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import resource from "../../resource"
import { useSelector } from "react-redux"
import DoctorWorkingDate from "../../components/features/doctor/DoctorWorkingDate"
import DoctorSpecial from "./DoctorSpecial"
import MoonLoader from "react-spinners/MoonLoader"
import { DoctorSchema, WorkingDay, WorkingTime } from "../../fireStore/doctor"
import { UserSchema } from "../../fireStore/user"
import { Button, Dialog } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import fireStore from "../../fireStore"

type DoctorDetail = DoctorSchema & UserSchema

type DoctorProfileProps = {
  doctorDetail: DoctorDetail
}

function DoctorProfile({ doctorDetail }: DoctorProfileProps) {
  const history = useHistory()
  const [dayList, setDayList] = useState<WorkingDay[]>([])
  const [timeList, setTimeList] = useState<WorkingTime[]>([])
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  useEffect(() => {
    setDayList(doctorDetail.working?.day || [])
    setTimeList(doctorDetail.working?.time || [])
  }, [doctorDetail.working])

  function handleSelectTime(time: any) {
    const mapTime = (value: any) =>
      value.name === time.name ? { ...time, isActive: !time.isActive } : value

    setTimeList(timeList.map(mapTime))
  }

  function handleSelectDay(day: any) {
    const mapDay = (value: any) =>
      value.name === day.name ? { ...day, isActive: !day.isActive } : value

    setDayList(dayList.map(mapDay))
  }

  async function onSubmit() {
    try {
      setOpen(true)
      await fireStore.doctor.updateDoctorWorking({
        doctorId: doctorDetail.id || "",
        workingData: {
          day: dayList,
          time: timeList,
        },
      })
      setOpen(false)

      history.goBack()
    } catch (error) {
      setOpen(false)
      setTimeout(() => {
        alert("Update doctor working time failure")
      }, 1000)
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
        rating={0}
      />
      <DoctorWorkingDate
        isDisabledDate
        isDisabledTime
        dayList={dayList}
        timeList={timeList}
        onSelectDay={handleSelectDay}
        onSelectTime={handleSelectTime}
        onClickDate={() => {}}
        onClickTime={() => {}}
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
  const userId = useSelector((state: any) => state?.auth?.userId)

  const doctorDetail: DoctorDetail = resource.doctor.profileByUserId.read(
    userId
  )
  return <DoctorProfile doctorDetail={doctorDetail} />
}

function DoctorProfilePage() {
  return (
    <NavbarLayout pageTitle="Doctor details">
      <React.Suspense fallback={<Loading />}>
        <DoctorProfileFetcher />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default DoctorProfilePage
