"use client"

import { useCallback, useState } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import Button from "@/components/shared/button/Button"
import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import useQnADetail from "../hooks/useQnADetail"
import { Answer } from "@/interfaces/answer"
import { toast } from "react-toastify"
import Limitation from "@/constants/limitation"
import TextCounter from "@/components/shared/TextCounter"
import buttonMessage from "@/constants/message/button"
import { validationMessage } from "@/constants/message/validation"
import { AnswerFormData } from "@/interfaces/form"
import CreateAnswerEditor from "./Answers/editor/CreateAnswerEditor"
import { getUploadedImageLinkFromMarkdown } from "@/util/editor"
import { useClientSession } from "@/hooks/useClientSession"

export interface MyAnswerProps {
  questionId: number
  list?: Answer[]
  isQuestionAuthor: boolean
}

const MyAnswer: React.FC<MyAnswerProps> = ({
  questionId,
  list,
  isQuestionAuthor,
}) => {
  const { clientSessionReset } = useClientSession()

  const { openModal } = useModal()

  const { user, createAnswerSubmit, hasIncludeMyAnswer } = useQnADetail()

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<AnswerFormData>()

  const [answerField, setAnswerField] = useState("")
  const writableNewAnswer =
    user && !isQuestionAuthor && !hasIncludeMyAnswer(list)

  const onEditorChange = useCallback((markdown: string) => {
    setAnswerField(markdown)
  }, [])

  const onSubmit = async ({ answer }: AnswerFormData) => {
    const uploadedImageLink = getUploadedImageLinkFromMarkdown(answer)

    createAnswerSubmit({
      questionId,
      answer,
      onError(errorCase, error) {
        console.log({ errorCase, error })
        if (errorCase === "unauthorized") {
          clientSessionReset()

          setTimeout(() => {
            toast.error("로그인 후 답변 생성이 가능합니다", {
              position: "top-center",
              toastId: "answerUnauthorizedError",
            })
          }, 0)

          return
        }

        toast.error("답변 생성에 실패했습니다", {
          position: "top-center",
          toastId: "createAnswerError",
        })
      },
      ...(uploadedImageLink && { image_url: uploadedImageLink }),
    })
  }

  const onInvalid = (errors: FieldErrors<AnswerFormData>) => {
    if (errors.answer) {
      const { type } = errors.answer

      if (type === "required") {
        toast.error(validationMessage.noAnswerContent, {
          toastId: "emptyAnswerContent",
          position: "top-center",
        })
        return
      }

      if (type === "whiteSpaceOnly") {
        toast.error(validationMessage.notAllowedWhiteSpaceOnly, {
          toastId: "whiteSpaceOnlyAnswerContent",
          position: "top-center",
        })
        return
      }

      if (type === "minLength") {
        toast.error(validationMessage.underAnswerLimit, {
          toastId: "underAnswerLimit",
          position: "top-center",
        })
        return
      }

      if (type === "maxLength") {
        toast.error(validationMessage.overAnswerLimit, {
          toastId: "overAnswerLimit",
          position: "top-center",
        })
        return
      }
    }
  }

  if (!user) {
    return (
      <div className="box-border flex flex-col h-[342px] tablet:h-auto tablet:flex-row justify-between items-center px-[34px] py-6 tablet:py-0 mb-7 border border-[#E0E0E0] rounded-lg">
        <div className="flex flex-col items-center tablet:flex-row gap-6">
          <div className="w-[200px] min-h-[173px] tablet:w-[120px] tablet:min-h-[104px]">
            <CreateAnswerAnime />
          </div>
          <span className="text-primary font-bold">
            로그인 하고 댓글을 남겨보세요!
          </span>
        </div>
        <Button
          buttonTheme="primary"
          className="px-6 py-4"
          onClick={() => {
            openModal({
              content: <LoginForm />,
            })
          }}
        >
          로그인 하기
        </Button>
      </div>
    )
  }

  if (!writableNewAnswer) {
    return null
  }

  return (
    <div className="max-w-full box-border rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="font-semibold text-xl text-secondary">내 답변</div>
        <TextCounter
          text={answerField ?? ""}
          min={Limitation.answer_limit_under}
          max={Limitation.answer_limit_over}
          className="text-lg"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <CreateAnswerEditor control={control} onEditorChange={onEditorChange} />
        <div className="flex w-full justify-center my-2">
          <Button
            disabled={!isValid || isSubmitting}
            buttonTheme="primary"
            className="w-[200px] h-fit text-base disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
          >
            {isSubmitting ? "답변 생성 중" : buttonMessage.postMyAnswer}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MyAnswer
