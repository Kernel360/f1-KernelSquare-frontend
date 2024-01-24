"use client"

import { AxiosError } from "axios"
import { FallbackProps } from "react-error-boundary"
import { ApiStatus } from "@/constants/response/api"
import { revalidatePage } from "@/util/actions/revalidatePage"
import type { APIResponse } from "@/interfaces/dto/api-response"

function UserProfileApiErrorBoundary({ error }: FallbackProps) {
  if (error instanceof AxiosError) {
    const { response } = error as AxiosError<APIResponse>

    if (
      response?.status === ApiStatus.Member.getMember.Unauthorized.HttpStatus
    ) {
      revalidatePage("/profile/[id]", "page")

      return null
    }

    if (response?.status === ApiStatus.Member.getMember.NotFound.HttpStatus) {
      return <div>존재하지 않는 유저</div>
    }
  }

  return <>유저 프로필 에러</>
}

export default UserProfileApiErrorBoundary
