const express = require("express")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")

const SSEChannel = require("sse-pubsub")

const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

app.use(bodyParser.json())

const sseSessions = new Map()

const mockJWTSecret = {
  accessToken: "testMockAccessTokenSecret",
  refreshToken: "testMockRefreshTokenSecret",
}

app.get(`/oauth2/authorization/github`, (req, res) => {
  const accessToken = jwt.sign(
    { auth: "ROLE_USER" },
    mockJWTSecret.accessToken,
    { expiresIn: "1h", subject: "7" },
  )
  const refreshToken = jwt.sign(
    { auth: "ROLE_USER" },
    mockJWTSecret.refreshToken,
    { expiresIn: "14d", subject: "7" },
  )

  const user = {
    memberId: 7,
    nickname: "oauthUser@github.com",
    experience: 60,
    introduction: "",
    imageUrl: null,
    level: 1,
    roles: ["ROLE_USER"],
    tokenDto: {
      accessToken,
      refreshToken,
    },
  }

  const encodedUser = Buffer.from(JSON.stringify(user)).toString("base64")

  const encodedUserCookie = cookie.serialize("loginResponse", encodedUser, {
    path: "/",
    maxAge: 60 * 10,
  })

  res.setHeader("Set-Cookie", encodedUserCookie)

  return res.redirect("http://localhost:3000/oauth/github")
})

app.get("/api/v1/alerts/sse", (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      code: 1105,
      msg: "해당 기능은 로그인이 필요합니다.",
    })
  }

  const payload = jwt.decode(token.replace("Bearer ", ""))

  const channel = new SSEChannel({
    pingInterval: false,
  })

  req.on("close", () => {
    channel.close()
    sseSessions.delete(payload.id || payload.sub)
  })

  channel.subscribe(req, res)

  sseSessions.set(payload?.id || payload.sub, channel)
})

app.post(`/api/v1/alerts/sse`, (req, res) => {
  const { targetUserId, message } = req.body

  const target = sseSessions.get(targetUserId)

  if (target) {
    return target.publish(message, message.alert_type)
  }

  return res.status(500).json({
    code: 500,
    msg: "알림 전송에 실패했습니다",
  })
})

app.listen(8501, () => {
  console.log(`Server is running on http://localhost:8501`)
})
