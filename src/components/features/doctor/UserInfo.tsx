import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Badge, Avatar, Typography, Box } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import {
  PlaceOutlined,
  CalendarTodayOutlined,
  WatchLaterOutlined,
} from "@material-ui/icons"
import StarRatingComponent from "react-star-rating-component"

export type DoctorInfoProps = {
  image?: string
  name: string
  isPreview?: boolean
  date: string
  time: string
}

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge)

const useStyle = makeStyles({
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    color: "#19769F",
    fontSize: 16,
    textAlign: "left",
    flex: 1,
  },
  skill: {
    color: "#95989A",
    fontSize: 14,
    textAlign: "left",
  },
  location: {
    color: "#51565F",
    fontSize: 12,
    alignItems: "flex-start",
    display: "flex",
  },
  iconPlace: {
    color: "#19769F",
    marginRight: 4,
    marginTop: 4,
    width: 14,
    height: 14,
    marginLeft: -4,
  },
  rating: {
    color: "#FF2E29",
    marginLeft: 4,
    marginTop: 2,
    textAlign: "center",
  },
})
const usePreviewStyle = makeStyles({
  avatar: {
    width: 77,
    height: 77,
  },
  name: {
    color: "#19769F",
    fontSize: 18,
    textAlign: "left",
    flex: 1,
  },
  skill: {
    color: "#51565F",
    fontSize: 16,
    textAlign: "left",
  },
  location: {
    color: "#51565F",
    fontSize: 16,
    alignItems: "flex-start",
    display: "flex",
  },
  iconPlace: {
    color: "#19769F",
    marginRight: 4,
    marginTop: 4,
    width: 14,
    height: 14,
    marginLeft: 1,
  },
  rating: {
    color: "#FF2E29",
    marginLeft: 4,
    marginTop: 2,
    textAlign: "center",
  },
})

const UserInfo = (props: DoctorInfoProps) => {
  const defaultStyle = useStyle()
  const previewStyle = usePreviewStyle()
  const classes = props.isPreview ? previewStyle : defaultStyle

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="77px"
    >
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        variant="dot"
      >
        <Avatar alt={props.name} className={classes.avatar} src={props.image} />
      </StyledBadge>
      <Box
        display="flex"
        flexDirection="column"
        marginLeft={props.isPreview ? 2 : 1}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h5" className={classes.name}>
            {props.name}
          </Typography>
        </Box>
        <Typography className={classes.location}>
          <CalendarTodayOutlined className={classes.iconPlace} />
          {props.date}
        </Typography>
        <Typography className={classes.location}>
          <WatchLaterOutlined className={classes.iconPlace} />
          {props.time}
        </Typography>
      </Box>
    </Box>
  )
}

export default UserInfo
