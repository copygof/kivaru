import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

let persistor = persistStore(store)

export { store, persistor }
