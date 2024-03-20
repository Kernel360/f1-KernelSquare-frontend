"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { deleteCookie } from "@/util/actions/cookie"
import { redirect } from "next/navigation"
import { useEffect } from "react"

function OAuthGithubRedirect() {
  const { user } = useClientSession()

  useEffect(() => {
    deleteCookie("loginResponse")

    if (user && user.nickname.includes("@")) {
      redirect(`/profile/nickname`)
    }

    redirect(`/qna?page=0`)
  }, []) /* eslint-disable-line */

  return <div>redirect</div>
}

export default OAuthGithubRedirect
