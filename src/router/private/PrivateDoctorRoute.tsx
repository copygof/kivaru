import { Route, Redirect } from "react-router-dom"
import React, { ReactChild } from "react"
import { useSelector } from "react-redux"

type PrivateDoctorRouteProps = {
  children: ReactChild
  path: string
}

export default function PrivateDoctorRoute({
  children,
  ...rest
}: PrivateDoctorRouteProps) {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  )
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/doctor/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
