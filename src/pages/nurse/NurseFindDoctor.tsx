import React, { useState, useEffect } from "react"
import { Box, ButtonBase } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles, withStyles } from "@material-ui/core/styles"

import NavbarLayout from "../../components/layout/NavbarLayout"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import fireStore from "../../fireStore"
import resource from "../../resource"
import { DoctorSchema, getAllDoctor } from "../../fireStore/doctor"
import { UserSchema } from "../../fireStore/user"
import { useHistory } from "react-router-dom"
import { Loading } from "../../components/common/Loading"
import { useSelector } from "react-redux"
import { nurseScreeningSelector } from "../../redux/nurseScreening"
import { nurseFinishingSelector } from "../../redux/nurseFinishing"

const useStyle = makeStyles({
  item: {
    height: 80,
    borderBottom: "1px solid #D5D5D5",
    backgroundColor: "#ffffff",
  },
})

export type ItemProps = {
  name: string
  skill: string
  location: string
  image: string | any
  rating: number
  onClick?: () => void
  isSelected: boolean
}

function Item(props: ItemProps) {
  const classes = useStyle()

  return (
    <ButtonBase
      className={classes.item}
      onClick={props.onClick}
      {...(props.isSelected && {
        style: {
          border: "1px solid #FF2E29",
          paddingLeft: 8,
          paddingRight: 8,
        },
      })}
    >
      <DoctorInfo
        name={props.name}
        image={props.image}
        skill={props.skill}
        location={props.location}
        rating={props.rating}
      />
    </ButtonBase>
  )
}

export function useDoctorList() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failure" | "empty"
  >("idle")
  const [data, setData] = useState<any>([])

  useEffect(() => {
    async function getDoctorList() {
      try {
        setStatus("loading")
        const response = await getAllDoctor()

        setStatus("success")
        setData(response)
      } catch (error) {
        setStatus("failure")
        setData([])
      }
    }

    getDoctorList()
  }, [])

  return { data, status }
}

function DoctorList() {
  const history = useHistory()
  const { data: doctorList, status } = useDoctorList()

  const isFinishingFlow = useSelector(nurseFinishingSelector.getIsFinishingFlow)
  const doctorId = useSelector(nurseScreeningSelector.getDoctorId)
  const doctorIdFinishingFlow = useSelector(nurseFinishingSelector.getDoctorId)

  const selectedDoctorId = isFinishingFlow ? doctorIdFinishingFlow : doctorId

  console.log("isFinishingFlow => ", isFinishingFlow)
  console.log("doctorIdFinishingFlow => ", doctorIdFinishingFlow)
  console.log("doctorId => ", doctorId)
  console.log("selectedDoctorId => ", selectedDoctorId)

  function handleClickDoctor(doctorId?: string) {
    return () => {
      history.push(`/nurse/doctor-appointment/${doctorId}`)
    }
  }

  if (status === "loading") {
    return <Loading />
  }

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      // alignItems="center"
      flexDirection="column"
    >
      {doctorList.map((doctor: DoctorSchema & UserSchema) => (
        <Item
          key={doctor.id}
          isSelected={selectedDoctorId === doctor.id}
          name={`${doctor?.profile?.firstName} ${doctor?.profile?.lastName}`}
          image={doctor.profile.imageProfile}
          skill={doctor.graduate || "-"}
          location={doctor.hospital || "-"}
          rating={doctor.ratings}
          onClick={handleClickDoctor(doctor.id)}
        />
      ))}
    </Box>
  )
}

const UserFindDoctor = () => {
  return (
    <NavbarLayout pageTitle="Find doctor">
      <React.Suspense fallback={<Loading />}>
        <DoctorList />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default UserFindDoctor
