import { Route, Redirect } from "react-router-dom"
import React, { ReactChild } from "react"
import { useSelector } from "react-redux"

type PrivateRouteProps = {
  children: ReactChild
  path: string
}

export default function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
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
              pathname: "/user/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
