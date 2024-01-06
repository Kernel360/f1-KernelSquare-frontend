"use server"

import { APIResponse } from "@/interfaces/dto/api-response"
import { SubmitAskQuestionData } from "@/page/askQuestion/components/AskQuestionForm"
import { createQuestion } from "@/service/question"
import { AxiosError } from "axios"

export async function onSubmitQuestion({
  title,
  content,
  member_id,
  image_url,
  skills,
}: SubmitAskQuestionData): Promise<{
  success: boolean
  error?: any
  createdQuestionId?: number
}> {
  "use server"

  console.log("[question submit]")
  console.log({ title, content, image_url, member_id, skills })

  try {
    const res = await createQuestion({
      member_id,
      title,
      content,
      image_url,
      skills,
    })

    return {
      success: true,
      createdQuestionId: res.data.data!,
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
    }
  }
}
