import React from "react"
import SimpleLayout from "../../components/layout/SimpleLayout"
import { Box, Button } from "@material-ui/core"
import { useHistory, Link } from "react-router-dom"

//  "doctor" | "patient" | "nurse"

const UserSelector = () => {
  const history = useHistory()
  function handleClickSelect(selected: string) {
    return () => {
      switch (selected) {
        case "patient":
          history.push("/user/login")
          break
        case "doctor":
          history.push("/doctor/login")
          break
        case "nurse":
          history.push("/nurse/login")
          break
        default:
          break
      }
    }
  }

  return (
    <SimpleLayout pageTitle="Welcome to OPD online">
      <Box>
        <Box marginTop={5} display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSelect("patient")}
          >
            Are you patient ?
          </Button>
        </Box>
        <Box marginTop={2} display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSelect("doctor")}
          >
            Are you doctor ?
          </Button>
        </Box>
        <Box marginTop={2} display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSelect("nurse")}
          >
            Are you nurse ?
          </Button>
        </Box>
      </Box>
    </SimpleLayout>
  )
}

export default UserSelector
