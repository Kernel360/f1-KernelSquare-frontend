"use client"

import { lazy } from "react"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import { AnswerFormData } from "@/interfaces/form"
import { FieldErrors } from "react-hook-form"
import { Answer } from "@/interfaces/answer"
import Button from "@/components/shared/button/Button"
import useHandleMyAnswer from "@/page/qna-detail/hooks/useHandleMyAnswer"
import { pickFirstAnswerFormError } from "@/util/hook-form/error"
import { toast } from "react-toastify"
import { deleteImages } from "@/service/images"

interface UpdateAnswerFormProps {
  answer: Answer
}

const UpdateAnswerEditor = lazy(() => import("../editor/UpdateAnswerEditor"))

function UpdateAnswerForm({ answer }: UpdateAnswerFormProps) {
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
    formReset,
  } = useAnswerFormContext()

  const { answerSetToViewMode, updateAnswer } = useHandleMyAnswer({
    answerId: answer.answer_id,
    questionId: answer.question_id,
    updateAnswerCallback: {
      onSuccess: () => {
        const imagesToDelete = getValues("imagesToDelete")

        if (imagesToDelete?.length) {
          Promise.allSettled(
            imagesToDelete.map(({ uploadURL }) =>
              deleteImages({ imageUrl: uploadURL }),
            ),
          )
        }

        formReset()
        answerSetToViewMode()
      },
    },
  })

  const onSubmit = ({ answer, images }: AnswerFormData) => {
    updateAnswer({
      content: answer,
      image_url: images.length ? images[0].uploadURL : null,
    })
  }

  const onInvalid = (errors: FieldErrors<AnswerFormData>) => {
    const { errorField, type, message } = pickFirstAnswerFormError(errors)!

    toast.error(message, {
      position: "top-center",
      toastId: `${errorField}-${type}`,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <UpdateAnswerEditor />
      <div className="flex gap-4 justify-center my-5">
        <Button
          type="submit"
          disabled={isSubmitting}
          buttonTheme="primary"
          className="p-2 w-[100px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
          onClick={(e) => {
            if (e.detail === 0) e.preventDefault()
          }}
        >
          수정하기
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            formReset()
            answerSetToViewMode()
          }}
          buttonTheme="third"
          className="p-2 w-[100px] border-[#828282] text-#828282 hover:bg-[#828282] hover:text-white disabled:bg-colorsGray disabled:text-colorsDarkGray"
        >
          수정 취소
        </Button>
      </div>
    </form>
  )
}

export default UpdateAnswerForm
