"use client"

import dayjs from "dayjs"
import { atom, selector } from "recoil"
import { AxiosError } from "axios"
import { decrypt, encrypt } from "@/util/crypto"
import {
  deleteUserPayloadCookie,
  getPayloadCookie,
  updateUserPayloadCookie,
} from "@/util/actions/cookie"
import { ENCRYPTED_PAYLOAD_KEY } from "@/constants/token"
import { USER_LOCAL_STORAGE_KEY } from "@/constants/editor"
import type { LoginUserPayload } from "@/interfaces/dto/auth/login.dto"
import type { User } from "@/interfaces/user"
import notificationMessage from "@/constants/message/notification"

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
          nickname,
        }: Omit<UpdateMemberInfoRequest & { nickname?: string }, "id">) => {
          try {
            const payloadResponse = await getPayloadCookie()

            if (payloadResponse === null) {
              console.error(notificationMessage.emptyCookie)

              throw new Error(notificationMessage.emptyCookie)
            }

            const editedPayload = JSON.parse(
              decrypt(payloadResponse),
            ) as NonNullable<SessionPayload>

            editedPayload.image_url = image_url ?? null
            if (introduction) editedPayload.introduction = introduction
            if (nickname) editedPayload.nickname = nickname

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
