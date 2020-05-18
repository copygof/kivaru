const app = require("./app")
// const socket = require('socket.io');
const socket = require("./lib/socket")

const PORT = process.env.PORT || 80

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

socket(server)
