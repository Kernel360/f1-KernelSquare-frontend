"use server"

import { SubmitAskQuestionData } from "@/page/askQuestion/components/AskQuestionForm"
import { createQuestion } from "@/service/question"

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
    console.log(error)

    return {
      success: false,
    }
  }
}
