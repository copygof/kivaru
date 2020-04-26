import React from "react"
import { ImageSources } from "../../assets"
import { useTheme, makeStyles } from "@material-ui/core"

export type DoctorSpecialProps = {
  skill: string
}

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexFlow: "row",
    marginTop: 18,
  },
  icon: {
    marginRight: 12,
    height: 15,
    width: 10,
    marginTop: 2,
  },
  textHightLight: {
    color: "#19769F",
    fontWeight: "bold",
  },
  text: {
    color: "#3C3C59",
    fontWeight: "normal",
  },
})

export default function DoctorSpecial(props: DoctorSpecialProps) {
  const classes = useStyles()
  return (
    <div className={classes.row}>
      <img
        className={classes.icon}
        src={ImageSources.DOCTOR_SKILL}
        alt="doctor-skill-icon"
      />
      <p className={classes.textHightLight}>
        Specialities : <span className={classes.text}>{props.skill}</span>
      </p>
    </div>
  )
}
