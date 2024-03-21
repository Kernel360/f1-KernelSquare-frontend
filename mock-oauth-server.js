const express = require("express")
const cookie = require("cookie")
const jwt = require("jsonwebtoken")

const app = express()

const mockJWTSecret = {
  accessToken: "testAccessSecret",
  refreshToken: "testRefreshSecret",
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

app.listen(8501, () => {
  console.log(`Server is running on http://localhost:8501`)
})
