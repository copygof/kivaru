import React from "react"
import { Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

export function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Skeleton animation="wave" variant="circle" width={77} height={77} />
      <Box display="flex" flexDirection="column" marginLeft={1}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width={77} />
        <Skeleton animation="wave" width={100} />
      </Box>
    </Box>
  )
}
