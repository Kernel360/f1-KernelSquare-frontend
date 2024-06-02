import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import { USER_QUERY_KEY } from "@/constants/queryKey"
import successMessage from "@/constants/message/success"
import {
  UpdateIntroductionVariables,
  UpdateUserIntroductionCallback,
  useUpdateUserIntroduction,
} from "./introduction/useUpdateIntroduction"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"

interface UseIntroduction {
  updateCallback?: UpdateUserIntroductionCallback
}

const useIntroduction = ({ updateCallback }: UseIntroduction = {}) => {
  const queryClient = useQueryClient()
  const { user, clientSessionReset } = useClientSession()

  const { updateUserIntroductionApi, updateUserIntroductionApiStatus } =
    useUpdateUserIntroduction({
      async onSuccess(data, variables, context) {
        toast.success(successMessage.editIntroduction, {
          toastId: "successToEditIntroduction",
          position: "top-center",
        })

        await queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEY.getUser(user?.member_id ?? -1),
        })

        updateCallback?.onSuccess &&
          updateCallback.onSuccess(data, variables, context)
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인 후 이용 가능합니다", {
                position: "top-center",
              })
            }, 0)

            updateCallback?.onError &&
              updateCallback.onError(error, variables, context)

            return
          }

          toast.error(
            response?.data?.msg ?? "자기소개 수정 중 에러가 발생했습니다",
            { position: "top-center" },
          )
          updateCallback?.onError &&
            updateCallback.onError(error, variables, context)

          return
        }

        toast.error("자기소개 수정 중 에러가 발생했습니다", {
          toastId: "failToEditIntroduction",
          position: "top-center",
        })

        updateCallback?.onError &&
          updateCallback.onError(error, variables, context)
      },
    })

  const updateUserIntroduction = ({
    introduction,
  }: UpdateIntroductionVariables) => {
    if (updateUserIntroductionApiStatus === "pending") return

    updateUserIntroductionApi({ introduction })
  }

  return {
    updateUserIntroduction,
  }
}

export default useIntroduction
