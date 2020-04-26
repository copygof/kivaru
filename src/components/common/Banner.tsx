import React from "react"
import { Typography, ButtonBase } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  box: {
    // border: "1px solid #D6D6D6",
    // width: 155,
    height: 133,
    borderRadius: 4,
    display: "flex",
    flexGrow: 1,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-end",
  },
  image: {
    display: "flex",
    flex: 1,
    // width: "100%",
    // height: "auto",
  },
})

export type BannerProps = {
  image?: any
  onClick?: () => void
}

const Banner = (props: BannerProps) => {
  const classes = useStyles()
  return (
    <div className={classes.box}>
      <ButtonBase onClick={props.onClick}>
        <img alt="banner" src={props.image} className={classes.image}></img>
      </ButtonBase>
    </div>
  )
}

export default Banner
