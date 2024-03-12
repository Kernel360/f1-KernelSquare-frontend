"use client"

import { AxiosError } from "axios"
import { FallbackProps } from "react-error-boundary"
import { ApiStatus } from "@/constants/response/api"
import { revalidatePage } from "@/util/actions/revalidatePage"
import type { APIResponse } from "@/interfaces/dto/api-response"
import UserProfileNotFound from "@/components/shared/animation/UserProfileNotFound"
import type { PropsWithChildren } from "react"

function UserProfileApiErrorBoundary({ error }: FallbackProps) {
  if (error instanceof AxiosError) {
    const { response } = error as AxiosError<APIResponse>

    if (
      response?.status === ApiStatus.Member.getMember.Unauthorized.HttpStatus
    ) {
      revalidatePage("/profile/[id]", "page")

      return null
    }

    // 존재하지 않는 사용자 페이지 접근 시
    if (response?.status === ApiStatus.Member.getMember.NotFound.HttpStatus) {
      return (
        <UserProfileErrorContainer>
          <div>존재하지 않는 사용자입니다.</div>
        </UserProfileErrorContainer>
      )
    }
  }

  return (
    <UserProfileErrorContainer>
      <div>유저 프로필 에러가 발생했습니다.</div>
    </UserProfileErrorContainer>
  )
}

export default UserProfileApiErrorBoundary

const UserProfileErrorContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full text-center">
      <UserProfileNotFound className="w-[300px] m-auto" />
      <div className="text-slate-400 text-xl mb-5 mt-[-50px]">{children}</div>
    </div>
  )
}
