import React from "react"
import { Typography, ButtonBase } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  box: {
    border: "1px solid #FF2E29",
    width: 155,
    height: 88,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    "&:active": {
      boxShadow: "0px 5px 7px 1px rgba(254, 165,1,0.18)",
    },
    "&:hover": {
      boxShadow: "0px 5px 7px 1px rgba(254, 165,1,0.18)",
    },
  },
  boxActive: {
    boxShadow: "0px 5px 7px 1px rgba(254, 165,1,0.18)",
  },
  image: {
    display: "flex",
    // height: 38,
    // marginBottom: 10,
    // marginTop: 10,
  },
  baseButton: {
    marginBottom: 20,
  },
  wrapImage: {
    display: "flex",
    // backgroundColor: "pink",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export type MenuBoxProps = {
  title: string
  image?: any
  isActive?: boolean
  onClick?: () => void
}

const MenuBox = (props: MenuBoxProps) => {
  const classes = useStyles()
  return (
    <ButtonBase onClick={props.onClick} className={classes.baseButton}>
      <div className={classes.box}>
        <div className={classes.wrapImage}>
          <img
            alt={props.title}
            src={props.image}
            className={classes.image}
          ></img>
        </div>
        <Typography>{props.title}</Typography>
      </div>
    </ButtonBase>
  )
}

export default MenuBox
