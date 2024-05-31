import Button from "@/components/shared/button/Button"
import buttonMessage from "@/constants/message/button"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import { useClientSession } from "@/hooks/useClientSession"
import { AnswerFormData } from "@/interfaces/form"
import { useCreateAnswer } from "@/page/qna-detail/hooks/answer/useCreateAnswer"
import { lazy } from "react"
import { FieldErrors } from "react-hook-form"
import { toast } from "react-toastify"
import SuccessModalContent from "../../SuccessModalContent"
import successMessage from "@/constants/message/success"
import useModal from "@/hooks/useModal"

interface CreateAnswerFormProps {
  questionId: number
}

const CreateAnswerEditor = lazy(
  () => import("../../Answers/editor/CreateAnswerEditor"),
)

function CreateAnswerForm({ questionId }: CreateAnswerFormProps) {
  const { user } = useClientSession()

  const { openModal } = useModal()

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    formReset,
  } = useAnswerFormContext()

  const { createAnswerApi, createAnswerApiStatus } = useCreateAnswer({
    questionId,
    onSuccess() {
      formReset()

      setTimeout(() => {
        openModal({
          content: (
            <SuccessModalContent message={successMessage.createAnswer} />
          ),
        })
      }, 400)
    },
  })

  const onSubmit = async ({ answer, images }: AnswerFormData) => {
    if (createAnswerApiStatus === "pending") return

    createAnswerApi({
      questionId,
      content: answer,
      member_id: user?.member_id ?? -1,
      ...(images.length && { image_url: images[0].uploadURL }),
    })
  }

  const onInvalid = (errors: FieldErrors<AnswerFormData>) => {
    const { errorField, type, message } = pickFirstError(errors)!

    toast.error(message, {
      position: "top-center",
      toastId: `${errorField}-${type}`,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <CreateAnswerEditor />
      <div className="flex w-full justify-center my-2">
        <Button
          disabled={isSubmitting || createAnswerApiStatus === "pending"}
          buttonTheme="primary"
          className="w-[200px] h-fit text-base disabled:bg-colorsGray disabled:text-colorsDarkGray"
          type="submit"
          onClick={(e) => {
            if (e.detail === 0) e.preventDefault()
          }}
        >
          {isSubmitting || createAnswerApiStatus === "pending"
            ? "답변 생성 중"
            : buttonMessage.postMyAnswer}
        </Button>
      </div>
    </form>
  )
}

export default CreateAnswerForm

const pickFirstError = (errors: FieldErrors<AnswerFormData>) => {
  const sortedKey: (keyof AnswerFormData)[] = [
    "answer",
    "images",
    "imagesToDelete",
  ]

  for (const field of sortedKey) {
    const targetError = errors[field]

    if (targetError) return { ...targetError, errorField: field }
  }

  return null
}
