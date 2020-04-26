import { createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"

import lightBlue from "@material-ui/core/colors/lightBlue"

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#FF2A2A",
      contrastText: "#ffffff",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#18628D",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  overrides: {
    // @ts-ignore
    // MuiPickersDay: {
    //   day: {
    //     color: lightBlue.A700,
    //   },
    //   daySelected: {
    //     backgroundColor: lightBlue["400"],
    //   },
    //   dayDisabled: {
    //     color: lightBlue["100"],
    //   },
    //   current: {
    //     color: lightBlue["900"],
    //   },
    // },
    // MuiPickersModal: {
    //   dialogAction: {
    //     color: lightBlue["400"],
    //   },
    // },
  },
})

export default theme
