import { User } from "@/interfaces/user"
import dayjs from "dayjs"

interface UserPayload extends User {}

export class AppServerSession {
  static token: string
  static expiredDate: string
  static payload: UserPayload | null

  constructor() {}

  static get() {
    this.update()

    return {
      token: this.token,
      expiredDate: this.expiredDate,
      payload: this.payload,
    }
  }

  static getUser() {
    this.update()

    return this.payload
  }

  static set({
    token,
    maxAge,
    payload,
  }: {
    token: string
    maxAge: number
    payload: UserPayload
  }) {
    const now = new Date()

    this.token = token
    this.expiredDate = dayjs(now)
      .add(maxAge, "seconds")
      .format("YYYY-MM-DD HH:mm:ss")
    this.payload = payload
  }

  static update() {
    const now = new Date()

    if (dayjs(now).isAfter(dayjs(this.expiredDate))) {
      this.clear()
    }
    if (dayjs(now).isSame(dayjs(this.expiredDate))) {
      this.clear()
    }
  }

  static clear() {
    this.token = ""
    this.expiredDate = ""
    this.payload = null
  }
}

// export const appServerSession = new AppServerSession()

// export function getAppServerSession() {
//   return appServerSession.get()
// }
