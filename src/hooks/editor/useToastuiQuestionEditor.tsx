"use client"

import {
  questionEditorAtomFamily,
  questionEditorLoadedAtomFamily,
} from "@/recoil/atoms/questionEditor"
import { deleteImages } from "@/service/images"
import { onSubmitQuestion, onSubmitUpdateQuestion } from "@/util/actions/form"
import { useCallback } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import type { EditMode } from "@/page/askQuestion/components/AskQuestionPageControl"

interface UseToastUiEditorOption {
  uniqueKey: string
}

export function useToastUiQuestionEditor({
  uniqueKey,
}: UseToastUiEditorOption) {
  const [editorState, setEditorState] = useRecoilState(
    questionEditorAtomFamily(uniqueKey),
  )
  const resetEditorState = useResetRecoilState(
    questionEditorAtomFamily(uniqueKey),
  )

  const loaded = useRecoilValue(questionEditorLoadedAtomFamily(uniqueKey))

  const updateQuestionEditorState = useCallback(
    (payload: Partial<typeof editorState>) => {
      setEditorState((prev) => ({
        ...prev,
        ...payload,
      }))
    },
    [setEditorState],
  )

  const clearQuestionEditorState = useCallback(() => {
    resetEditorState()
  }, [resetEditorState])

  // submit
  const createQuestionSubmit = async (member_id: number) => {
    const payload = {
      title: editorState.title,
      content: editorState.content,
      skills: editorState.skills,
      image_url: editorState.fileUploadImageLinks[0] ?? "",
      member_id,
    }

    const res = await onSubmitQuestion({
      ...payload,
    })

    return res
  }

  const updateQuestionSubmit = async (question_id: number) => {
    const payload = {
      title: editorState.title,
      content: editorState.content,
      skills: editorState.skills,
      image_url: editorState.fileUploadImageLinks[0] ?? "",
      question_id,
    }

    const res = await onSubmitUpdateQuestion({
      ...payload,
    })

    return res
  }

  // 작성, 수정 취소
  const cancelQuestionSubmit = async ({ editMode }: { editMode: EditMode }) => {
    if (editMode === "create") {
      if (editorState.fileUploadImageLinks.length) {
        await Promise.allSettled([
          editorState.fileUploadImageLinks.map((deleteTargetUploadUrl) =>
            deleteImages({ imageUrl: deleteTargetUploadUrl }),
          ),
        ])
      }
    }

    clearQuestionEditorState()
  }

  return {
    editorState,
    updateQuestionEditorState,
    clearQuestionEditorState,
    loaded,
    createQuestionSubmit,
    updateQuestionSubmit,
    cancelQuestionSubmit,
  }
}
