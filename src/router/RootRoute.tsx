import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom"
import UserRoute from "./UserRoute"
import DoctorRoute from "./DoctorRoute"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import UserSelector from "../pages/user/UserSelector"

export default function RootRoute() {
  // let location = useLocation()

  return (
    <Router>
      <TransitionGroup>
        <CSSTransition
          // key={location.key}
          classNames="page"
          timeout={{
            enter: 1000,
            exit: 1000,
          }}
        >
          <Switch>
            <Route exact path="/">
              <UserSelector />
            </Route>
            <Route path="/user">
              <UserRoute />
            </Route>
            <Route path="/doctor">
              <DoctorRoute />
            </Route>
            <Route path="/test">
              <p>Not test</p>
            </Route>
            <Route path="*">
              <p>Not found</p>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  )
}
