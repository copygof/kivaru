import React, { ReactChild } from "react"
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import Backspace from "@material-ui/icons/ArrowBack"

export type NavbarLayoutProps = {
  pageTitle: string
  children: ReactChild
}

export default function NavbarLayout({
  pageTitle,
  children,
}: NavbarLayoutProps) {
  let history = useHistory()

  function handleClick() {
    history.goBack()
  }

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleClick}
          >
            <Backspace />
          </IconButton>
          <Typography variant="h6">{pageTitle}</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          height: "100%",
          // justifyContent: "flex-start",
          // alignItems: "flex-start",
        }}
      >
        <Box
          marginTop={10}
          display="flex"
          flexDirection="column"
          height="80%"
          // justifyContent="flex-start"
          // alignItems="flex-start"
        >
          {children}
        </Box>
      </Container>
    </React.Fragment>
  )
}
