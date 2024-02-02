const express = require("express")
const http = require("http")
const sockjs = require("sockjs")
const redis = require("redis")
const { WebSocket } = require("ws")

Object.assign(global, { WebSocket })

const app = express()
const server = http.createServer(app)
const sockjsServer = sockjs.createServer()
const redisClient = redis.createClient()

// SockJS 연결 설정
sockjsServer.on("connection", (conn) => {
  console.log("SockJS client connected")

  conn.on("data", (message) => {
    console.log(`Received message from SockJS client: ${message}`)
    // SockJS로 받은 메시지를 Redis Pub/Sub 채널에 발행
    redisClient.publish("messages", message)
  })
})

// Redis Pub/Sub에서 메시지 받기
redisClient.subscribe("messages")
redisClient.on("message", (channel, message) => {
  console.log(
    `Received message from Redis Pub/Sub channel ${channel}: ${message}`,
  )
  // 받은 메시지를 SockJS 클라이언트에 전송
  sockjsServer.clients.forEach((client) => {
    client.write(message)
  })
})

// SockJS 서버 연결
sockjsServer.installHandlers(server, { prefix: "/kernel-square" })

// HTTP 서버 실행
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// const http = require("http")
// const sockJS = require("sockjs")
// const { WebSocket, WebSocketServer } = require("ws")

// Object.assign(global, { WebSocket })

// const httpServer = http.createServer()

// websocketServer.on("connection", (ws) => {
//   console.log("WebSocket client connected")

//   ws.on("message", (message) => {
//     console.log("ws Received: " + message)
//   })
// })

// const sockServer = sockJS.createServer({ prefix: "/kernel-square" })

// sockServer.on("connection", (conn) => {
//   console.log("<SockJS client connected>")

//   console.log("<active>", client.active)
//   console.log("<connected>", client.connected)
// })

// sockServer.installHandlers(httpServer)

// httpServer.on("upgrade", (request, socket, head) => {
//   console.log("upgrade")
//   // console.log({ request, socket, head })
// })

// client.activate()

// httpServer.listen(8080)
