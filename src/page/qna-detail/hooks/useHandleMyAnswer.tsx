"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import useModal from "@/hooks/useModal"
import { deleteAnswer } from "@/service/answers"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import useQnADetail from "./useQnADetail"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import queryKey from "@/constants/queryKey"
import type {
  AnswerProps,
  DeleteValueProps,
  EditValueProps,
} from "./useHandleMyAnswer.types"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import Regex from "@/constants/regex"
import { answerQueries } from "@/react-query/answers"
import type { Answer } from "@/interfaces/answer"

const useHandleMyAnswer = ({ answerId, questionId }: AnswerProps) => {
  const [isAnswerEditMode, setIsAnswerEditMode] = useRecoilState(
    AnswerEditMode(answerId),
  )
  const queryClient = useQueryClient()
  const { openModal } = useModal()
  const { checkNullValue } = useQnADetail({ questionId })
  const { deleteImage } = useDeleteImage()
  const { updateAnswer } = answerQueries.useUpdateAnswer()

  const handleEditValue = ({ submitValue, answer }: EditValueProps) => {
    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    const imageUrl = answer.content?.match(Regex.mdImage)
    console.log("image", answer, imageUrl)

    updateAnswer(
      {
        answerId: answer.answer_id,
        content: submitValue as string,
      },
      {
        onSuccess: () => {
          toast.success(successMessage.updateAnswer, {
            position: "top-center",
          })
          setIsAnswerEditMode(false)
          return queryClient.invalidateQueries({
            queryKey: [queryKey.answer],
          })
        },
        onError: () =>
          toast.error(errorMessage.updateAnswer, { position: "top-center" }),
      },
    )
  }

  const handleDeleteValue = async ({
    answer,
    successModal,
  }: DeleteValueProps) => {
    const onSuccess = async () => {
      try {
        const imageUrl = answer.content?.match(Regex.mdImage)

        const res = await deleteAnswer({
          answerId: answer.answer_id,
        })

        console.log("success", res.data.msg)
        openModal({
          content: successModal,
          onClose() {
            queryClient.invalidateQueries({
              queryKey: [queryKey.answer],
            })
          },
        })
        sleep(5000).then(() => {
          queryClient.invalidateQueries({
            queryKey: [queryKey.answer],
          })
          if (imageUrl)
            for (let image of imageUrl) {
              const url = image.split("(")[1].split(")")[0]
              deleteImage(url)
            }
        })
      } catch (err) {
        console.error(err)
      }
    }
    const onCancel = () => {
      toast.error(notificationMessage.cancleDeleteAnswer, {
        position: "top-center",
      })
    }
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="deleteContent"
        />
      ),
    })
  }

  const handleEditMode = (answer: Answer) => {
    setIsAnswerEditMode((prev: boolean) => !prev)
    console.log("a", answer.content)
    const imageUrl = answer.content.match(Regex.mdImage)
    if (imageUrl)
      for (let image of imageUrl) {
        const url = image.split("(")[1].split(")")[0]
        deleteImage(url)
      }
  }

  return {
    isAnswerEditMode,
    setIsAnswerEditMode,
    handleEditMode,
    handleEditValue,
    handleDeleteValue,
  }
}

export default useHandleMyAnswer
