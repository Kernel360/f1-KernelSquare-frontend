const http = require("http")
const sockjs = require("sockjs")
const StompServer = require("stomp-broker-js")
// const StompJs = require('@stomp/stompjs');

const PORT = 8000

// Create a SockJS server
const sockjsServer = sockjs.createServer()
sockjsServer.on("connection", function (conn) {
  console.log("Client connected")

  // STOMP 프로토콜 처리
  const server = new StompServer({
    protocol: new StompServer.NodeStompServerProtocol(conn),
  })

  server.subscribe("/topic/chat", function (body, headers) {
    console.log("Received message:", body)
    // 가공된 메시지를 클라이언트로 전송
    conn.write(body)
  })

  conn.on("close", function () {
    console.log("Client disconnected")
  })
})

// Create a Node.js HTTP server
const server = http.createServer()
sockjsServer.installHandlers(server, { prefix: "/ws" })

// Start listening
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`)
})
