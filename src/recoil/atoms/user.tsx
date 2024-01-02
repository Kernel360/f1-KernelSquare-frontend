import { AppServerSession } from "@/util/session/appServerSession"
import { atom, selector } from "recoil"
import jwt, { JwtPayload } from "jsonwebtoken"
import { getCookie } from "cookies-next"
import { ACCESS_TOKEN_KEY } from "@/constants/token"
import { getMemeber } from "@/service/member"
import { login } from "@/service/auth"
import { User } from "@/interfaces/user"

export const userAtom = atom<User | null>({
  key: "user-atom",
  default: null,
})

export const authSession = selector({
  key: "user-client-session",
  get: ({ get, getCallback }) => {
    const update = getCallback(({ reset, snapshot }) => async () => {
      const userSnapshot = await snapshot.getPromise(userAtom)

      const sessionUser = AppServerSession.getUser()

      if (userSnapshot && !sessionUser) {
        reset(userAtom)
      }
    })

    const getUser = getCallback(({ snapshot }) => async () => {
      await update()

      const userSnapshot = await snapshot.getPromise(userAtom)

      if (userSnapshot) return userSnapshot

      return await syncCookie()
    })

    const syncCookie = getCallback(({ set, snapshot }) => async () => {
      const token = getCookie(ACCESS_TOKEN_KEY)

      if (!token) {
        AppServerSession.clear()

        set(userAtom, null)

        return null
      }

      const { id } = jwt.decode(token) as JwtPayload & { id: number }

      try {
        const res = await getMemeber({ id })

        const user = res.data.data

        AppServerSession.set({
          token,
          maxAge: 60 * 60,
          payload: { ...user! },
        })

        set(userAtom, { ...user! })

        return user
      } catch (error) {
        return null
      }
    })

    const loginSession = getCallback(
      () =>
        async ({ email, password }: { email: string; password: string }) => {
          try {
            await login({ email, password })

            await syncCookie()
          } catch (error) {
            throw error
          }
        },
    )

    return {
      getUser,
      syncCookie,
      update,
      loginSession,
    }
  },
})

export const userSelector = selector({
  key: "user-selector",
  get: async ({ get }) => {
    return await get(authSession).getUser()
  },
})
