import React from "react"
import { Box, ButtonBase } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles, withStyles } from "@material-ui/core/styles"

import NavbarLayout from "../../components/layout/NavbarLayout"
import DoctorInfo from "../../components/features/doctor/DoctorInfo"
import fireStore from "../../fireStore"
import resource from "../../resource"
import { DoctorSchema } from "../../fireStore/doctor"
import { UserSchema } from "../../fireStore/user"
import { useHistory } from "react-router-dom"
import { Loading } from "../../components/common/Loading"

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
  rating: number
  onClick?: () => void
}

function Item(props: ItemProps) {
  const classes = useStyle()

  return (
    <ButtonBase className={classes.item} onClick={props.onClick}>
      <DoctorInfo
        name={props.name}
        skill={props.skill}
        location={props.location}
        rating={props.rating}
      />
    </ButtonBase>
  )
}

function DoctorList() {
  const history = useHistory()
  const doctorList = resource.doctor.list.read()

  function handleClickDoctor(doctorId?: string) {
    return () => {
      history.push(`/user/doctor-appointment/${doctorId}`)
    }
  }

  return (
    <Box display="flex" justifyContent="space-between" flexDirection="column">
      {doctorList.map((doctor: DoctorSchema & UserSchema) => (
        <Item
          key={doctor.id}
          name={`${doctor?.profile?.firstName} ${doctor?.profile?.lastName}`}
          skill={doctor.specificSkill || "-"}
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
