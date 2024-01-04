import { atom, selector } from "recoil"
import jwt, { JwtPayload } from "jsonwebtoken"
import { getCookie } from "cookies-next"
import { ACCESS_TOKEN_KEY } from "@/constants/token"
import { getMemeber } from "@/service/member"
import { login } from "@/service/auth"
import { User } from "@/interfaces/user"
import { AxiosError } from "axios"
import { decrypt, encrypt } from "@/util/crypto"
import { deleteCookie, setAuthCookie } from "@/util/actions/cookie"

const cookiePayloadKey = "kernal-auth"

export const userAtom = atom<User | null>({
  key: "user-atom",
  default: getCookie(cookiePayloadKey)
    ? JSON.parse(decrypt(getCookie(cookiePayloadKey)!))
    : null,
})

export const userClientSession = selector({
  key: "user-client-session",
  get: ({ getCallback }) => {
    const clientSessionLogin = getCallback(
      ({ set }) =>
        async ({ email, password }: { email: string; password: string }) => {
          try {
            await login({ email, password })

            const token = getCookie(ACCESS_TOKEN_KEY)

            if (token) {
              const { id, exp } = jwt.decode(token) as JwtPayload & {
                id: number
              }

              const res = await getMemeber({ id })
              const payload = res.data.data ?? null

              if (payload) {
                const stringify = JSON.stringify(payload)
                const encryptedPayload = encrypt(stringify)

                await setAuthCookie(encryptedPayload, exp!)

                set(userAtom, payload)
              }
            }
          } catch (error) {
            if (!(error instanceof AxiosError)) {
              console.log({ sessionError: error })
            }

            throw error
          }
        },
    )

    const clientSessionLogout = getCallback(({ set }) => async () => {
      if (getCookie(cookiePayloadKey)) {
        await deleteCookie(cookiePayloadKey)
      }

      set(userAtom, null)
    })

    return {
      clientSessionLogin,
      clientSessionLogout,
    }
  },
})
