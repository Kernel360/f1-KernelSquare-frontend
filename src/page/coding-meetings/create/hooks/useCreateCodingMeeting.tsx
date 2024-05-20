"use client"

import { errorMessage } from "@/constants/message/error"
import queryKey from "@/constants/queryKey"
import { APIResponse } from "@/interfaces/dto/api-response"
import {
  CreateCodingMeetingRequest,
  CreateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { createCodingMeeting } from "@/service/coding-meetings"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { serializeCmToken } from "../../util/cm-token"
import { useFormContext } from "react-hook-form"
import { CodingMeetingFormData } from "@/interfaces/form"

interface UseCreateCodingMeeting {
  handleManual?: boolean
  onSuccess?: (
    data: AxiosResponse<CreateCodingMeetingResponse, any>,
    variables: CreateCodingMeetingRequest,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: CreateCodingMeetingRequest,
    context: unknown,
  ) => void
}

export function useCreateCodingMeeting({
  handleManual,
  onSuccess,
  onError,
}: UseCreateCodingMeeting = {}) {
  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { reset } = useFormContext<CodingMeetingFormData>()

  const { mutate, status } = useMutation({
    mutationKey: [queryKey.codingMeeting, "create"],
    mutationFn: (request: CreateCodingMeetingRequest) =>
      createCodingMeeting({ ...request }),
    onSuccess(response, variables, context) {
      if (handleManual) {
        onSuccess && onSuccess(response, variables, context)

        return
      }

      reset()

      const payload = response.data.data

      queryClient.invalidateQueries({
        queryKey: [queryKey.codingMeeting],
      })

      replace(
        `/coding-meetings/${
          payload?.coding_meeting_token
            ? serializeCmToken(payload.coding_meeting_token)
            : ""
        }`,
      )
    },
    onError(error, variables, context) {
      if (handleManual) {
        onError && onError(error, variables, context)

        return
      }

      const toastId = "codingMeetingCreateError"

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          revalidatePage("/coding-meetings/create", "page")
          setTimeout(() => {
            toast.error("로그인 후 다시 작성해주세요", {
              position: "top-center",
            })
          }, 0)

          return
        }

        toast.error(response?.data.msg ?? errorMessage.createCodingMeeting, {
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
    createCodingMeetingApi: mutate,
    createCodingMeetingApiStatus: status,
  }
}
