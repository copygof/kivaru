import React, { Component } from "react"

type ErrorBoundaryProps = {
  errorText?: string
  trigger?: any
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false, prevTrigger: null }

  static propTypes = {}

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.trigger !== state.prevTrigger) {
      return {
        prevTrigger: props.trigger,
        hasError: false,
      }
    }

    return null
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo)
  // }

  render() {
    const errorText = this.props.errorText || "Something went wrong."

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{errorText}</h1>
    }

    return this.props.children
  }
}
