const http = require("http")
const sockjs = require("sockjs")
const StompServer = require("stomp-broker-js")

const PORT = 8000

const sockjsServer = sockjs.createServer()
sockjsServer.on("connection", function (conn) {
  console.log("Client connected")

  // const server = new StompServer({
  //   protocol: new StompServer.NodeStompServerProtocol(conn),
  // })

  // server.subscribe("/topic/chat", function (body, headers) {
  //   console.log("Received message:", body)
  //   conn.write(body)
  // })

  conn.on("close", function () {
    console.log("Client disconnected")
  })
})

const server = http.createServer()
sockjsServer.installHandlers(server, { prefix: "/kernel-square" })

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`)
})
