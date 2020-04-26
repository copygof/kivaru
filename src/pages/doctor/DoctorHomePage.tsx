import React from "react"
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import Menu from "@material-ui/icons/Menu"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import HomeIcon from "@material-ui/icons/Home"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import PersonIcon from "@material-ui/icons/Person"
import MenuBox from "../../components/common/MenuBox"
import { ImageSources } from "../../assets"
import Banner from "../../components/common/Banner"

const useStyles = makeStyles({
  root: {
    position: "fixed",
    zIndex: 999999,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffff",
    boxShadow: "0px -1px 4px 0px rgba(209,205,209,1)",
  },
})

function TabHome() {
  const history = useHistory()

  function handleMenu(menu: string) {
    return () => {
      switch (menu) {
        case "appointments":
          history.push("/doctor/appointment")
          break
        case "profile":
          history.push("/doctor/profile")
          break
        case "medicineDispense":
        case "prescription":
        default:
          break
      }
    }
  }

  return (
    <Box
      flex={1}
      flexDirection="column"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        flex={1}
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <MenuBox
          title="Profile"
          image={ImageSources.DOCTOR_PROFILE}
          onClick={handleMenu("profile")}
        />
        <MenuBox
          title="Appointment"
          image={ImageSources.DOCTOR_APPOINTMENT}
          onClick={handleMenu("appointments")}
        />
        <MenuBox
          title="Medicine Dispense"
          image={ImageSources.DOCTOR_MEDICINE_DISPENSE}
          onClick={handleMenu("medicineDispense")}
        />
        <MenuBox
          title="Prescription"
          image={ImageSources.DOCTOR_PRESCRIPTION}
          onClick={handleMenu("prescription")}
        />
      </Box>
      <Banner image={ImageSources.BANNER_1} />
    </Box>
  )
}

export default function HomePage() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  let history = useHistory()

  function handleClick() {
    history.goBack()
  }

  return (
    <Box display="flex" flex={1} height="100" flexDirection="column">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            // onClick={handleClick}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Home</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          display: "flex",
        }}
      >
        {value === 0 && <TabHome />}
      </Container>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Appointment"
          icon={<CalendarTodayIcon />}
        />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  )
}
