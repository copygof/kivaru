import io from "socket.io-client"

// const socket = io("https://fathomless-mesa-78979.herokuapp.com", {
const socket = io("http://203.154.83.208/api", {
  path: "/bridge",
})

export default socket
