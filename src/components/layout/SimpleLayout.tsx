import React, { ReactChild } from "react"
import { Box, Container, Typography } from "@material-ui/core"

export type SimpleLayoutProps = {
  children: ReactChild
  pageTitle: string
}

const SimpleLayout = ({ children, pageTitle }: SimpleLayoutProps) => {
  return (
    <Container maxWidth="xs">
      <Box marginTop={10} display="flex">
        <Typography variant="h4" component="h4" color="primary">
          {pageTitle}
        </Typography>
      </Box>
      {children}
    </Container>
  )
}

export default SimpleLayout
