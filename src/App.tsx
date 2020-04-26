import React from "react"
import "./App.css"
import { ThemeProvider } from "@material-ui/core/styles"
import RootRoute from "./router/RootRoute"
import { PersistGate } from "redux-persist/integration/react"
import theme from "./styles/theme"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <RootRoute />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
