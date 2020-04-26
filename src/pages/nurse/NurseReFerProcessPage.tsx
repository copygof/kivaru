import React, { useState } from "react"
import NavbarLayout from "../../components/layout/NavbarLayout"
import { Loading } from "../../components/common/Loading"
import { useHistory } from "react-router-dom"
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  withStyles,
  Theme,
  createStyles,
  ButtonBase,
} from "@material-ui/core"
import { ImageSources } from "../../assets"

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      color: "#19769F",
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase)

function Evaluation() {
  const [evaluation, setEvaluation] = useState<
    "noPlan" | "moderate" | "verySevere"
  >("noPlan")

  function handleSelectEvaluation(value: "noPlan" | "moderate" | "verySevere") {
    return () => {
      setEvaluation(value)
    }
  }

  return (
    <Box>
      <Typography style={{ color: "#3D3D3D", fontWeight: "bold" }}>
        Evaluation
      </Typography>
      <Box display="flex" justifyContent="space-around" paddingTop="22px">
        <ButtonBase onClick={handleSelectEvaluation("noPlan")}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{ width: 65, height: 65 }}
              alt="select-evaluation"
              src={ImageSources.NO_PLAN}
            />
            <Typography
              style={{
                color: evaluation === "noPlan" ? "#3D3D3D" : "#D6D6D6",
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              No Plan
            </Typography>
          </Box>
        </ButtonBase>
        <ButtonBase onClick={handleSelectEvaluation("moderate")}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{ width: 65, height: 65 }}
              alt="select-evaluation"
              src={ImageSources.MODERATE}
            />
            <Typography
              style={{
                color: evaluation === "moderate" ? "#3D3D3D" : "#D6D6D6",
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              Moderate
            </Typography>
          </Box>
        </ButtonBase>
        <ButtonBase onClick={handleSelectEvaluation("verySevere")}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{ width: 65, height: 65 }}
              alt="select-evaluation"
              src={ImageSources.VERY_SEVERE}
            />
            <Typography
              style={{
                color: evaluation === "verySevere" ? "#3D3D3D" : "#D6D6D6",
                fontWeight: "bold",
                marginTop: 8,
              }}
            >
              Very Severe
            </Typography>
          </Box>
        </ButtonBase>
      </Box>
    </Box>
  )
}

function NurseReFerProcess() {
  const history = useHistory()
  const [additionalSymptom, setAdditionalSymptom] = useState("")
  const [temperature, setTemperature] = useState("")
  const [action, setAction] = useState("referToDoctor")

  function handleSubmit() {
    // TODO fetch api
    history.replace("/nurse/home")
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between"></Box>
      <Box marginTop={2}>
        <FormControl fullWidth>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={action}
            onChange={(e: any) => setAction(e.target?.value || "")}
            input={<BootstrapInput />}
          >
            <MenuItem value="referToDoctor">Not Refer to Doctor</MenuItem>
            <MenuItem value="noRefer">Refer to Doctor</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box marginTop={2}>
        <Evaluation />
      </Box>
      <Box marginTop={2}>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Temperature"
          type="textArea"
          variant="outlined"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </Box>
      <Box marginTop={2} display="flex" flex={1}>
        <TextField
          multiline
          rows={5}
          fullWidth
          id="outlined-password-input"
          label="Additional"
          type="textArea"
          variant="outlined"
          value={additionalSymptom}
          onChange={(e) => setAdditionalSymptom(e.target.value)}
          style={{
            minHeight: 150,
          }}
        />
      </Box>
      <Box marginTop={4} display="flex">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          style={{
            height: 44,
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Save
        </Button>
      </Box>
    </div>
  )
}

export default function NurseReFerProcessPage() {
  return (
    <NavbarLayout pageTitle="Refer to Doctor">
      <React.Suspense fallback={<Loading />}>
        <NurseReFerProcess />
      </React.Suspense>
    </NavbarLayout>
  )
}
