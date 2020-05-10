import io from "socket.io-client"

const socket = io("https://fathomless-mesa-78979.herokuapp.com", {
  path: "/bridge",
})

export default socket
