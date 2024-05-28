"use server"

import { createQuestion, updateQuestion } from "@/service/question"
import { AxiosError } from "axios"
import type { APIResponse } from "@/interfaces/dto/api-response"
import { CreateQuestionRequest } from "@/interfaces/dto/question/create-question.dto"
import { UpdateQuestionRequest } from "@/interfaces/dto/question/update-question.dto"

export interface SubmitResultBase {
  success: boolean
  error?: {
    api?: {
      status: number
      message: string
    }
    app?: {
      message: string
    }
  }
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
}: CreateQuestionRequest): Promise<CreateQuestionResult> {
  "use server"

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

      return {
        success: false,
        error: {
          api: {
            status: response!.status,
            message: response?.data.msg ?? "질문 작성 중 에러가 발생했습니다",
          },
        },
      }
    }

    console.log("[질문 작성 submit 에러]", error)

    return {
      success: false,
      error: {
        app: {
          message:
            (error as Error).message ?? "질문 작성 중 에러가 발생했습니다",
        },
      },
    }
  }
}

export async function onSubmitUpdateQuestion({
  title,
  content,
  image_url,
  skills,
  questionId,
}: UpdateQuestionRequest): Promise<UpdateQuestionResult> {
  "use server"

  try {
    await updateQuestion({
      questionId,
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

      return {
        success: false,
        error: {
          api: {
            status: response!.status,
            message: response?.data.msg ?? "질문 수정 중 에러가 발생했습니다",
          },
        },
      }
    }

    console.log("[질문 수정 submit 에러]", error)

    return {
      success: false,
      error: {
        app: {
          message:
            (error as Error).message ?? "질문 수정 중 에러가 발생했습니다",
        },
      },
    }
  }
}
