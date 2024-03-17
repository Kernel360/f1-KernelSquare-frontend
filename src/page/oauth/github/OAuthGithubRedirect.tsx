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

    // [TODO] 닉네임 변경 페이지로 이동
    if (user && validator.validateEmail(user.nickname).format()) {
      redirect(`/profile/${user.member_id}`)
    }

    redirect(`/qna?page=0`)
  }, []) /* eslint-disable-line */

  return <div>redirect</div>
}

export default OAuthGithubRedirect
