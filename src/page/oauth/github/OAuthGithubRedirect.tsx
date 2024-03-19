"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { deleteCookie } from "@/util/actions/cookie"
import { Validator } from "@/util/validate"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const validator = new Validator()

function OAuthGithubRedirect() {
  const { user } = useClientSession()

  useEffect(() => {
    deleteCookie("loginResponse")

    if (user && validator.validateEmail(user.nickname).format()) {
      redirect(`/profile/nickname`)
    }

    redirect(`/qna?page=0`)
  }, []) /* eslint-disable-line */

  return <div>redirect</div>
}

export default OAuthGithubRedirect
