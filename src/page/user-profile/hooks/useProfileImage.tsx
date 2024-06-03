import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { errorMessage } from "@/constants/message/error"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import successMessage from "@/constants/message/success"
import { useUpdateUserProfileImage } from "./introduction/useUpdateUserProfileImage"
import { useUploadImage } from "@/hooks/image/useUploadImage"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { QUESTION_QUERY_KEY, USER_QUERY_KEY } from "@/constants/queryKey"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"

const useProfileImage = () => {
  const queryClient = useQueryClient()
  const { user, clientSessionUpdate, clientSessionReset } = useClientSession()

  const { openModal, closeModal } = useModal()

  const { deleteImageApi } = useDeleteImage()

  const { updateUserProfileImageApi, updateUserProfileImageApiStatus } =
    useUpdateUserProfileImage({
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

            return
          }
        }

        toast.error("이미지 업로드 중 에러가 발생했습니다", {
          position: "top-center",
          toastId: "updateProfileImageError",
        })
      },
    })

  const { uploadImageApi, uploadImageApiStatus } = useUploadImage({
    category: "member",
    onSuccess(response, variables, context) {
      const image_url = response.data.data!.image_url

      updateUserProfileImageApi(
        { image_url },
        {
          onSuccess(data, variables, context) {
            clientSessionUpdate({
              image_url,
            })

            queryClient.invalidateQueries({
              queryKey: QUESTION_QUERY_KEY.questionList,
            })

            queryClient.invalidateQueries({
              queryKey: USER_QUERY_KEY.getUser(user!.member_id),
            })

            revalidatePage("/", "layout")

            setTimeout(() => {
              toast.success("이미지 변경 성공", {
                position: "top-center",
              })
            }, 0)
          },
          onError(error, variables, context) {
            toast.error(errorMessage.uploadImage, {
              position: "top-center",
              toastId: "failToUpdateProfileImage",
            })
          },
        },
      )
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

          return
        }

        toast.error(
          response?.data.msg ?? "이미지 업로드 중 에러가 발생했습니다",
          {
            position: "top-center",
          },
        )

        return
      }

      toast.error("이미지 업로드 중 에러가 발생했습니다", {
        position: "top-center",
        toastId: "updateProfileImageError",
      })
    },
    onValidateFileError(validateFileError) {
      toast.error(validateFileError.message, {
        position: "top-center",
        toastId: `uploadImageValidate:${validateFileError.type}`,
      })
    },
  })

  const updateUserProfileImage = ({ file }: { file: File }) => {
    if (uploadImageApiStatus === "pending") return
    if (updateUserProfileImageApiStatus === "pending") return

    uploadImageApi({ file })
  }

  const resetUserProfileImage = () => {
    const currentImageUrl = user?.image_url

    if (!currentImageUrl) {
      toast.error("현재 기본 프로필 이미지로 설정 되있습니다", {
        position: "top-center",
        toastId: "alreadyInitialImage",
      })

      return
    }

    if (updateUserProfileImageApiStatus === "pending") return

    const resetProfileImage = () =>
      updateUserProfileImageApi(
        { image_url: null },
        {
          onSuccess(data, variables, context) {
            clientSessionUpdate({
              image_url: null,
            })

            queryClient.invalidateQueries({
              queryKey: QUESTION_QUERY_KEY.questionList,
            })

            queryClient.invalidateQueries({
              queryKey: USER_QUERY_KEY.getUser(user!.member_id),
            })

            revalidatePage("/", "layout")

            setTimeout(() => {
              toast.success(successMessage.editResetProfileImage, {
                position: "top-center",
                toastId: "successToResetProfileImage",
              })

              deleteImageApi({ imageUrl: currentImageUrl })
            }, 0)
          },
          onError(error, variables, context) {
            toast.error(errorMessage.resetImage, {
              position: "top-center",
              toastId: "failToResetProfileImage",
            })
          },
        },
      )

    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={resetProfileImage}
          onCancel={closeModal}
          situation="resetProfileImage"
        />
      ),
    })
  }

  return {
    updateUserProfileImage,
    resetUserProfileImage,
    updateUserProfileIsPending:
      uploadImageApiStatus === "pending" ||
      updateUserProfileImageApiStatus === "pending",
    resetUserProfileIsPending: updateUserProfileImageApiStatus === "pending",
    isPending:
      uploadImageApiStatus === "pending" ||
      updateUserProfileImageApiStatus === "pending",
  }
}

export default useProfileImage
