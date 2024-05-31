"use client"

import { FieldErrors, useForm } from "react-hook-form"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import { useEffect, type PropsWithChildren } from "react"
import dynamic from "next/dynamic"
import { toast } from "react-toastify"
import { errorMessage } from "@/constants/message/error"
import { answerQueries } from "@/react-query/answers"
import { useQueryClient } from "@tanstack/react-query"
import queryKey, { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import type { Answer } from "@/interfaces/answer"
import { getUploadedImageLinkFromMarkdown } from "@/util/editor"
import { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import { deleteImages } from "@/service/images"
import successMessage from "@/constants/message/success"
import { validationMessage } from "@/constants/message/validation"
import UpdateAnswerEditor from "./editor/UpdateAnswerEditor"
import { AnswerFormData } from "@/interfaces/form"
import Button from "@/components/shared/button/Button"
import { useRecoilState } from "recoil"
import { answerEditorAtomFamily } from "@/recoil/atoms/answerEditor"

export type EditAnswerProps = {
  answer: Answer
}

const AnswerMdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
  loading(loadingProps) {
    // 답변 콘텐츠 로딩 (답변 viewer 로딩)
    return <div className="skeleton w-full h-9 rounded-md mt-2.5" />
  },
})

const AnswerContentBox: React.FC<EditAnswerProps> = ({ answer }) => {
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AnswerFormData>()

  const [answerEditorAtom, setAnswerEditorAtom] = useRecoilState(
    answerEditorAtomFamily(answer.answer_id),
  )

  const { isAnswerEditMode, setIsAnswerEditMode } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
    questionId: Number(answer.question_id),
  })

  const { updateAnswer } = answerQueries.useUpdateAnswer({
    answerId: answer.answer_id,
  })

  const onSubmit = (data: AnswerFormData) => {
    const markdown = data.answer

    const previousUploadedImageLink = answer.answer_image_url
    const uploadedImageLink = getUploadedImageLinkFromMarkdown(markdown)

    function getImagePayload({
      previousUploadedImageLink,
      uploadedImageLink,
    }: {
      previousUploadedImageLink: string | null
      uploadedImageLink: string | null
    }): { image_url: string | null; shouldDelete: boolean } {
      if (!uploadedImageLink) {
        /*
          - 현재 업로드 이미지 주소가 없을 경우 요청 이미지 주소는 null
          - 만약 이전 업로드 이미지 주소가 있을 경우 삭제 요청
        */
        return {
          image_url: null,
          shouldDelete: !!previousUploadedImageLink,
        }
      }

      if (previousUploadedImageLink === uploadedImageLink) {
        /*
          - 현재 이미지 주소와 이전 이미지 주소가 같을 경우 
            이미지 주소는 이전 이미지 주소
          - 이미지 삭제 요청하지 않음
        */
        return {
          image_url: previousUploadedImageLink,
          shouldDelete: false,
        }
      }

      /*
        - 현재 이미지 주소가 존재하고, 이전 이미지 주소와 다른 경우 
          이미지 주소는 현재 이미지 주소
        - 이전 이미지가 있을 경우 삭제 요청
      */
      return {
        image_url: uploadedImageLink,
        shouldDelete: !!previousUploadedImageLink,
      }
    }

    const imagePayload = getImagePayload({
      previousUploadedImageLink,
      uploadedImageLink,
    })

    const answerPayload: UpdateAnswerRequest = {
      answerId: answer.answer_id,
      content: markdown,
      image_url: imagePayload.image_url,
    }

    updateAnswer(answerPayload, {
      onSuccess: async (data, variables, context) => {
        if (!!previousUploadedImageLink && imagePayload.shouldDelete) {
          // 이미지 삭제API 에서 에러발생시 에러 전파 X
          // 이미지 삭제는 답변 수정에 의존하지 않는 개별적인 작업
          // (답변은 이미지 삭제 API에 의존하지 않음)
          await deleteImages({ imageUrl: previousUploadedImageLink }).catch(
            (error) => error,
          )
        }

        await queryClient.invalidateQueries({
          queryKey: QUESTION_QUERY_KEY.questionAnswers(answer.question_id),
        })

        setTimeout(() => {
          setIsAnswerEditMode(false)

          // 리코일 - update
          setAnswerEditorAtom((prev) => ({
            ...prev,
            content: markdown,
            fileUploadImageLinks: imagePayload.image_url
              ? [imagePayload.image_url]
              : [],
          }))

          toast.success(successMessage.updateAnswer, {
            toastId: "successToUpdateAnswer",
            position: "top-center",
          })
        }, 0)
      },
      onError: () =>
        toast.error(errorMessage.updateAnswer, { position: "top-center" }),
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

  useEffect(() => {
    // 리코일 - 이미지 initiailize
    if (
      !answerEditorAtom.fileUploadImageLinks?.length &&
      answer.answer_image_url
    ) {
      setAnswerEditorAtom((prev) => ({
        ...prev,
        fileUploadImageLinks: [answer.answer_image_url!],
      }))
    }
  }, []) /* eslint-disable-line */

  /**
   * 답변 보기 상태일 경우
   */
  if (!isAnswerEditMode)
    return (
      <Wrapper>
        <AnswerMdViewer content={answer.content} />
      </Wrapper>
    )

  /**
   * 답변 수정 상태일 경우
   */
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <UpdateAnswerEditor control={control} answer={answer} />
        <div className="flex gap-4 justify-center my-5">
          <Button
            type="submit"
            disabled={isSubmitting}
            buttonTheme="primary"
            className="p-2 w-[100px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
          >
            작성하기
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              setIsAnswerEditMode(false)
              setAnswerEditorAtom((prev) => ({
                ...prev,
                content: answer.content,
                fileUploadImageLinks: answer.answer_image_url
                  ? [answer.answer_image_url]
                  : [],
              }))
            }}
            buttonTheme="third"
            className="p-2 w-[100px] border-[#828282] text-#828282 hover:bg-[#828282] hover:text-white disabled:bg-colorsGray disabled:text-colorsDarkGray"
          >
            작성취소
          </Button>
        </div>
      </form>
    </Wrapper>
  )
}

export default AnswerContentBox

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
)
