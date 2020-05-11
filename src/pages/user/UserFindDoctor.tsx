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
import { useDoctorList } from "../nurse/NurseFindDoctor"

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
}

function Item(props: ItemProps) {
  const classes = useStyle()

  return (
    <ButtonBase className={classes.item} onClick={props.onClick}>
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


function DoctorList() {
  const history = useHistory()
  const { data: doctorList, status } = useDoctorList()

  function handleClickDoctor(doctorId?: string) {
    return () => {
      history.push(`/user/doctor-appointment/${doctorId}`)
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
    <NavbarLayout pageTitle="เลือกปรึกษาแพทย์">
      <React.Suspense fallback={<Loading />}>
        <DoctorList />
      </React.Suspense>
    </NavbarLayout>
  )
}

export default UserFindDoctor
