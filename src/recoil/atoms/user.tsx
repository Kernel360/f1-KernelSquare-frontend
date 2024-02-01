import dayjs from "dayjs"
import { atom, selector } from "recoil"
import { login } from "@/service/auth"
import { AxiosError } from "axios"
import { decrypt, encrypt } from "@/util/crypto"
import {
  deleteAuthCookie,
  deleteUserPayloadCookie,
  getPayloadCookie,
  setAuthCookie,
  updateUserPayloadCookie,
} from "@/util/actions/cookie"
import { ENCRYPTED_PAYLOAD_KEY } from "@/constants/token"
import { errorMessage } from "@/constants/message"
import { USER_LOCAL_STORAGE_KEY } from "@/constants/editor"
import type { LoginUserPayload } from "@/interfaces/dto/auth/login.dto"
import type { User } from "@/interfaces/user"

export type SessionPayload = (LoginUserPayload & { expires: string }) | null

interface UpdateMemberInfoRequest
  extends Partial<Pick<User, "image_url" | "introduction">> {
  id: number
}

export const userAtom = atom<SessionPayload>({
  key: "user-atom",
  default: null,
  effects: [
    ({ setSelf, trigger, onSet }) => {
      if (trigger === "get") {
        if (typeof window !== "undefined") {
          const userStorage = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

          if (userStorage) {
            const userPayload = JSON.parse(decrypt(userStorage))

            const isExpired = dayjs().isAfter(dayjs(userPayload.expires))

            setSelf(isExpired ? null : userPayload)

            isExpired && localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
          }
        }

        if (typeof window === "undefined") {
          const { cookies } = require("next/headers")

          const payloadCookie =
            cookies().get(ENCRYPTED_PAYLOAD_KEY)?.value ?? null

          if (payloadCookie) {
            const userPayload = JSON.parse(decrypt(payloadCookie))

            const isExpired = dayjs().isAfter(dayjs(userPayload.expires))

            setSelf(isExpired ? null : userPayload)
          }
        }
      }

      onSet((newPayload, currentPayload, isReset) => {
        isReset || newPayload === null
          ? localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
          : localStorage.setItem(
              USER_LOCAL_STORAGE_KEY,
              encrypt(JSON.stringify(newPayload)),
            )
      })
    },
  ],
})

export const userClientSession = selector({
  key: "user-client-session",
  get: ({ getCallback }) => {
    /**
     * 로그인
     *
     * `로그인 성공시`
     * - recoil 유저 atom에 user 페이로드 저장
     * - 새로고침 대응을 위해 암호화된 페이로드를 쿠키로 설정
     * - 응답 body의 액세스 토큰과 리프레시 토큰을 httpOnly 쿠키로 설정(효율적으로 관리하기 위해 쿠키로 관리)
     *
     * `로그인 실패시`
     * - 로그인 에러를 그대로 throw하여 호출한 곳에서 별도의 에러처리를 할 수 있도록 함
     */
    const clientSessionLogin = getCallback(
      ({ set }) =>
        async ({ email, password }: { email: string; password: string }) => {
          try {
            const loginResponse = await login({ email, password })

            const { token_dto, ...userPayload } = loginResponse.data.data!

            const { access_token, refresh_token } = token_dto
            const payload = {
              ...userPayload,
            }

            const expires = dayjs().add(1, "hours").startOf("second").toDate()

            const stringifyPayload = JSON.stringify({
              ...payload,
              expires: expires.toISOString(),
            } as SessionPayload)
            const encryptedPayload = encrypt(stringifyPayload)

            await setAuthCookie(
              access_token,
              refresh_token,
              encryptedPayload,
              expires,
            )

            set(userAtom, {
              ...payload,
              expires: expires.toJSON(),
            })
          } catch (error) {
            if (!(error instanceof AxiosError)) {
              console.log({ sessionError: error })
            }

            throw error
          }
        },
    )

    /**
     * 로그아웃
     *
     * - 프론트에서 설정한 쿠키를 삭제하여 클라이언트에서 유저 상태를 클리어 하는 목적
     * - 실제 로그아웃은 별도로 api를 호출해서 진행해야 함
     *
     */
    const clientSessionLogout = getCallback(({ set }) => async () => {
      await deleteAuthCookie()

      set(userAtom, null)
    })

    /**
     * 세션 리셋
     *
     * - 리프레시 토큰은 유지시키고, 클라이언트 유저 상태를 클리어
     *
     */
    const clientSessionReset = getCallback(({ set }) => async () => {
      await deleteUserPayloadCookie()

      set(userAtom, null)
    })

    /**
     * 수정된 사용자 정보 반영
     *
     * - 프론트에서 수정한 사용자 정보(프로필 이미지, 자기소개)를 쿠키에 반영하는 목적
     *
     *
     */
    const clientSessionUpdate = getCallback(
      ({ set }) =>
        async ({
          image_url,
          introduction,
        }: Omit<UpdateMemberInfoRequest, "id">) => {
          try {
            const payloadResponse = await getPayloadCookie()

            if (payloadResponse === null) {
              console.error(errorMessage.emptyCookie)

              throw new Error(errorMessage.emptyCookie)
            }

            const editedPayload = JSON.parse(
              decrypt(payloadResponse),
            ) as NonNullable<SessionPayload>

            if (image_url) editedPayload.image_url = image_url
            if (introduction) editedPayload.introduction = introduction

            const stringifyPayload = JSON.stringify(editedPayload)
            const encryptedPayload = encrypt(stringifyPayload)

            await updateUserPayloadCookie(
              encryptedPayload,
              dayjs(editedPayload.expires).startOf("second").toDate(),
            )

            set(userAtom, editedPayload)
          } catch (error) {
            if (!(error instanceof AxiosError)) {
              console.log({ sessionError: error })
            }

            throw error
          }
        },
    )

    return {
      clientSessionLogin,
      clientSessionLogout,
      clientSessionUpdate,
      clientSessionReset,
    }
  },
})

/**
 * cookie에서 정보 가져오기
 *
 * 1. SSR 또는 서버 환경에서 실행되는 경우
 * 1) next/headers를 동적으로 import하여 해당 모듈을 사용할 수 있게 한다.
 * 2) 쿠키에서 암호화된 Payload를 가져온다.
 * 3) Payload가 존재하면 해당 값을 복호화 + LoaginUserPayload 타입으로 파싱한다.
 *
 * 2. 클라이언트 환경에서 실행되는 경우
 * 1) getPayloadCookie에서 암호화된 사용자 Payload를 가져온다.
 * 2) Payload가 존재하면 해당 값을 복호화 + LoaginUserPayload 타입으로 파싱한다.
 */

async function getPayload(): Promise<SessionPayload> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers")
    const payloadCookie = cookies().get(ENCRYPTED_PAYLOAD_KEY)

    return payloadCookie ? JSON.parse(decrypt(payloadCookie.value)) : null
  }

  const payloadCookie = await getPayloadCookie()

  return payloadCookie ? JSON.parse(decrypt(payloadCookie)) : null
}
