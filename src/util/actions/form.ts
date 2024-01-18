"use server"

import { APIResponse } from "@/interfaces/dto/api-response"
import {
  SubmitAskQuestionData,
  SubmitUpdateQuestionData,
} from "@/page/askQuestion/components/AskQuestionForm"
import { createQuestion, updateQuestion } from "@/service/question"
import { AxiosError } from "axios"

interface SubmitResultBase {
  success: boolean
  error?: any
}

interface CreateQuestionResult extends SubmitResultBase {
  createdQuestionId?: number
}

interface UpdateQuestionResult extends SubmitResultBase {}

export async function onSubmitQuestion({
  title,
  content,
  member_id,
  image_url,
  skills,
}: SubmitAskQuestionData): Promise<CreateQuestionResult> {
  "use server"

  console.log("[question submit]")

  try {
    const res = await createQuestion({
      member_id,
      title,
      content,
      image_url: image_url || null,
      skills,
    })

    return {
      success: true,
      createdQuestionId: res.data.data!.question_id,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      console.log("[질문 작성 submit api 에러]", response?.data)
    } else {
      console.log("[질문 작성 submit 에러]", error)
    }

    return {
      success: false,
      error,
    }
  }
}

export async function onSubmitUpdateQuestion({
  title,
  content,
  image_url,
  skills,
  question_id,
}: SubmitUpdateQuestionData): Promise<UpdateQuestionResult> {
  "use server"

  console.log("[question update]")
  console.log({
    title,
    content,
    image_url,
    skills,
    question_id,
  })

  try {
    await updateQuestion({
      questionId: question_id,
      title,
      content,
      image_url: image_url || null,
      skills,
    })

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      console.log("[질문 수정 submit api 에러]", response?.data)
    } else {
      console.log("[질문 수정 submit 에러]", error)
    }

    return {
      success: false,
      error,
    }
  }
}
