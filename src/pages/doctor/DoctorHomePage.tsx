import React from "react"
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import { useDispatch } from "react-redux"
import { logout } from "../../redux/auth"
import { clearUser } from "../../redux/user"
import { SettingsPower } from "@material-ui/icons"
import DoctorAppointmentList from "./DoctorAppointmentList"
import UserProfileById from "../../components/features/UserProfileById"

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
      marginTop={10}
    >
      <Box
        flex={1}
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <MenuBox
          title="เวลาเข้างาน"
          image={ImageSources.DOCTOR_PROFILE}
          onClick={handleMenu("profile")}
        />
        <MenuBox
          title="ตารางนัดหมาย"
          image={ImageSources.DOCTOR_APPOINTMENT}
          onClick={handleMenu("appointments")}
        />
        {/* <MenuBox
          title="Medicine Dispense"
          image={ImageSources.DOCTOR_MEDICINE_DISPENSE}
          onClick={handleMenu("medicineDispense")}
        />
        <MenuBox
          title="Prescription"
          image={ImageSources.DOCTOR_PRESCRIPTION}
          onClick={handleMenu("prescription")}
        /> */}
      </Box>
      <Banner image={ImageSources.BANNER_1} />
    </Box>
  )
}

export default function HomePage() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)
  const [isDrawerVisible, setDrawerVisible] = React.useState(false)

  function toggleDrawer() {
    setDrawerVisible(!isDrawerVisible)
  }

  function handleLogout() {
    setDrawerVisible(false)
    dispatch(logout())
    dispatch(clearUser())
    history.replace("/")
  }

  return (
    <Box display="flex" flex={1} height="100" flexDirection="column">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">หน้าแรก</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        style={{
          // paddingTop: 100,
          // paddingBottom: 100,
          display: "flex",
        }}
      >
        {value === 0 && <TabHome />}
        {value === 1 && <DoctorAppointmentList />}
        {value === 2 && <UserProfileById />}
      </Container>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="หน้าแรก" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="ตารางนัดหมาย"
          icon={<CalendarTodayIcon />}
        />
        <BottomNavigationAction label="โปรไฟล์" icon={<PersonIcon />} />
      </BottomNavigation>
      <Drawer open={isDrawerVisible} onClose={toggleDrawer}>
        <div role="presentation">
          {/* <div style={{ height: 80 }} /> */}
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <SettingsPower />
              </ListItemIcon>
              <ListItemText primary="ออกจากระบบ" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </Box>
  )
}
