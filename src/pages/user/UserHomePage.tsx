import React from "react"
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
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
import WrappingVideoCall from "../video/VideoCall"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import { OfflinePin, SettingsPower } from "@material-ui/icons"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/auth"
import { clearUser } from "../../redux/user"

const useStyles = makeStyles({
  root: {
    position: "fixed",
    zIndex: 9999,
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
        case "findDoctor":
          history.push("/user/find-doctor")
          break
        case "appointments":
          history.push("/user/appointment")
          break
        case "medicineDispense":
        case "emergency":
        case "medicineShop":
        case "catchUp":
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
          title="เลือกปรึกษาแพทย์"
          image={ImageSources.DOCTOR}
          onClick={handleMenu("findDoctor")}
        />
        <MenuBox
          title="ตารางนัดตรวจ"
          image={ImageSources.APPOINTMENTS}
          onClick={handleMenu("appointments")}
        />
        {/* <MenuBox
          title="Medicine Dispense"
          image={ImageSources.MEDICINE_DISPENSE}
          onClick={handleMenu("medicineDispense")}
        />
        <MenuBox
          title="Emergency"
          image={ImageSources.EMERGENCY}
          onClick={handleMenu("emergency")}
        />
        <MenuBox
          title="Medicine Shop"
          image={ImageSources.MEDICINE_SHOP}
          onClick={handleMenu("medicineShop")}
        />
        <MenuBox
          title="Catch Up"
          image={ImageSources.CATCH_UP}
          onClick={handleMenu("catchUp")}
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
        <BottomNavigationAction label="หน้าแรก" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="ตารางนัดตรวจ"
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
        </div>
      </Drawer>
    </Box>
  )
}
