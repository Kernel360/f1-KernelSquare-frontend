"use client"

import { errorMessage } from "@/constants/message/error"
import queryKey from "@/constants/queryKey"
import { APIResponse } from "@/interfaces/dto/api-response"
import {
  UpdateCodingMeetingRequest,
  UpdateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"
import { updateCodingMeeting } from "@/service/coding-meetings"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { serializeCmToken } from "../../util/cm-token"
import { useFormContext } from "react-hook-form"
import { CodingMeetingFormData } from "@/interfaces/form"

interface UseUpdateCodingMeeting {
  handleManual?: boolean
  onSuccess?: (
    data: AxiosResponse<UpdateCodingMeetingResponse, any>,
    variables: UpdateCodingMeetingRequest,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: UpdateCodingMeetingRequest,
    context: unknown,
  ) => void
}

export function useUpdateCodingMeeting({
  handleManual,
  onSuccess,
  onError,
}: UseUpdateCodingMeeting = {}) {
  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { reset } = useFormContext<CodingMeetingFormData>()

  const { mutate, status } = useMutation({
    mutationKey: [queryKey.codingMeeting, "update"],
    mutationFn: (request: UpdateCodingMeetingRequest) =>
      updateCodingMeeting({ ...request }),
    async onSuccess(response, variables, context) {
      if (handleManual) {
        onSuccess && onSuccess(response, variables, context)
        return
      }

      reset()

      queryClient.resetQueries({
        queryKey: [queryKey.codingMeeting],
      })

      await revalidatePage("/coding-meetings/[token]", "page")

      setTimeout(() => {
        replace(
          `/coding-meetings/${serializeCmToken(
            variables.coding_meeting_token,
          )}`,
        )
      }, 0)
    },
    onError(error, variables, context) {
      if (handleManual) {
        onError && onError(error, variables, context)
        return
      }

      const toastId = "codingMeetingUpdateError"

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          revalidatePage("/coding-meetings/post/[token]", "page")

          setTimeout(() => {
            toast.error("로그인 후 다시 작성해주세요", {
              position: "top-center",
            })
          }, 0)

          return
        }

        toast.error(response?.data.msg ?? errorMessage.updateCodingMeeting, {
          position: "top-center",
          toastId,
        })

        return
      }

      toast.error(errorMessage.createCodingMeeting, {
        position: "top-center",
        toastId,
      })
    },
  })

  return {
    updateCodingMeetingApi: mutate,
    updateCodingMeetingApiStatus: status,
  }
}
