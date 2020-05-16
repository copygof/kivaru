import io from "socket.io-client"

// const socket = io("https://fathomless-mesa-78979.herokuapp.com", {
const socket = io("https://localhost:8081", {
  path: "/bridge",
})

export default socket
