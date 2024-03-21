"use client"

import { UserRole } from "@/interfaces/user"
import { userAtom } from "@/recoil/atoms/user"
import { setAuthCookie } from "@/util/actions/cookie"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { encrypt } from "@/util/crypto"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"

interface GithubOAuthUserPayload {
  memberId: number
  nickname: string
  experience: number
  introduction: string
  imageUrl: string | null
  level: number
  roles: Array<UserRole>
}

interface GithubOAuthTokenPayload {
  accessToken: string
  refreshToken: string
}

type GithubOAuthLoginResponse = GithubOAuthUserPayload & {
  tokenDto: GithubOAuthTokenPayload
}

interface OAuthGithubSuccessProps {
  decodedCookie: string
}

function OAuthGithubSuccess({ decodedCookie }: OAuthGithubSuccessProps) {
  const setUserAtom = useSetRecoilState(userAtom)

  useEffect(() => {
    if (!decodedCookie) return
    ;(async () => {
      const {
        tokenDto: { accessToken, refreshToken },
        ...userPayload
      } = JSON.parse(decodedCookie) as GithubOAuthLoginResponse

      const expires = dayjs().add(1, "hours").startOf("second").toDate()

      const stringifyUserPayload = JSON.stringify({
        ...userPayload,
        expires: expires.toJSON(),
      })

      const encryptedUserPayload = encrypt(stringifyUserPayload)

      await setAuthCookie(
        accessToken,
        refreshToken,
        encryptedUserPayload,
        expires,
      )

      setUserAtom({
        member_id: userPayload.memberId,
        nickname: userPayload.nickname,
        experience: userPayload.experience,
        introduction: userPayload.introduction,
        image_url: userPayload.imageUrl,
        level: userPayload.level,
        roles: userPayload.roles,
        expires: expires.toJSON(),
      })

      await revalidatePage("/oauth/github", "page")
    })()
  }, []) /* eslint-disable-line */

  return null
}

export default OAuthGithubSuccess
