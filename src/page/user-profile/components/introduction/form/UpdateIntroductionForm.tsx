"use client"

import TextCounter from "@/components/shared/TextCounter"
import Button from "@/components/shared/button/Button"
import { USER_PROFILE_LIMITS } from "@/constants/limitation"
import { IntroductionFormData } from "@/interfaces/form/introduction-form"
import useIntroduction from "@/page/user-profile/hooks/useIntroduction"
import { Editor } from "@toast-ui/react-editor"
import { useRef, lazy, Suspense } from "react"
import { FieldErrors, useController, useForm } from "react-hook-form"
import { introductionRules } from "../rules/introduction-rules"
import { useSetRecoilState } from "recoil"
import { IntroductionEditModeAtom } from "@/recoil/atoms/editor/mode"
import { toast } from "react-toastify"
import { INTRODUCTION_EDITOR_PLACEHOLDER } from "@/constants/editor"

interface UpdateIntroductionFormProps {
  initialIntroduction?: string
}

const ContentEditor = lazy(
  () => import("@/components/shared/toast-ui-editor/editor/ContentEditor"),
)

function UpdateIntroductionForm({
  initialIntroduction,
}: UpdateIntroductionFormProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IntroductionFormData>({
    defaultValues: {
      introduction: initialIntroduction ?? "",
    },
  })
  const { field } = useController({
    control,
    name: "introduction",
    rules: introductionRules,
  })

  const setIntroductionEditMode = useSetRecoilState(IntroductionEditModeAtom)

  const { updateUserIntroduction } = useIntroduction({
    updateCallback: {
      onSuccess() {
        setIntroductionEditMode(false)
      },
    },
  })

  const editorRef = useRef<Editor>(null)

  const updateIntroductionField = () => {
    setValue(
      "introduction",
      editorRef?.current?.getInstance()?.getMarkdown() ?? "",
    )
  }

  const cancelWriteIntroduction = () => {
    setIntroductionEditMode(false)
  }

  const onSubmit = ({ introduction }: IntroductionFormData) => {
    updateUserIntroduction({ introduction: introduction ?? "" })
  }

  const onInvalid = (errors: FieldErrors<IntroductionFormData>) => {
    const { type, message } = errors.introduction!

    editorRef.current?.getInstance().focus()

    toast.error(message, {
      position: "top-center",
      toastId: `introduction-${type}`,
    })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Suspense>
        <ContentEditor
          ref={editorRef}
          autofocus={true}
          includeImageToolbarItem={false}
          includeColorSyntaxPlugins
          initialValue={initialIntroduction}
          placeholder={INTRODUCTION_EDITOR_PLACEHOLDER}
          onChange={updateIntroductionField}
          onLoad={() => {
            editorRef.current?.getInstance()?.moveCursorToStart()
          }}
        />
      </Suspense>
      <TextCounter
        text={field.value}
        min={USER_PROFILE_LIMITS.introduction.minLength}
        max={USER_PROFILE_LIMITS.introduction.maxLength}
        className="text-lg block text-right h-5 py-2 font-light"
      />
      <div className="flex justify-center gap-x-2.5 mt-[20px]">
        <Button
          buttonTheme="third"
          className="basis-[70px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
          disabled={isSubmitting}
          onClick={cancelWriteIntroduction}
        >
          취소
        </Button>
        <Button
          buttonTheme="primary"
          className="basis-[70px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
          type="submit"
          disabled={isSubmitting}
          onClick={(e) => {
            if (e.detail === 0) e.preventDefault()
          }}
        >
          저장
        </Button>
      </div>
    </form>
  )
}

export default UpdateIntroductionForm
