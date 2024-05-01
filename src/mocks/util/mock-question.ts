import { TechTag } from "@/interfaces/tech-tag"
import { mockQuestions } from "../db/questions"
import { mockUsers } from "../db/user"
import dayjs from "dayjs"
import badge_url from "@/assets/images/badges"
import { UpdateQuestionRequest } from "@/interfaces/dto/question/update-question.dto"

export function createMockQuestion({
  member_id,
  title,
  content,
  image_url,
  skills,
  question_id,
}: {
  member_id: number
  title: string
  content: string
  skills: Array<TechTag>
  image_url?: string | null
  question_id?: number
}) {
  const targetId =
    question_id ?? Math.max(...mockQuestions.map((question) => question.id)) + 1

  const createdDate = new Date()

  const user = mockUsers.find((user) => user.id === member_id)

  mockQuestions.splice(0, 0, {
    id: targetId,
    title,
    content,
    question_image_url: image_url ?? "",
    member_image_url: user?.image_url ?? "",
    view_count: 0,
    nickname: user!.nickname,
    skills,
    close_status: false,
    created_date: dayjs(createdDate).format("YYYY-MM-DDTHH:mm:ss"),
    member_id,
    modified_date: dayjs(createdDate).format("YYYY-MM-DDTHH:mm:ss"),
    level: user!.level,
    level_image_url: badge_url[user!.level],
    list: [],
  })

  return targetId
}

export function updateMockQuestion({
  questionId,
  title,
  content,
  image_url,
  skills,
}: UpdateQuestionRequest) {
  const modifiedDate = new Date()

  const targetIndex = mockQuestions.findIndex(
    (mockQuestion) => mockQuestion.id === questionId,
  )

  const targetMockQuestion = mockQuestions[targetIndex]

  targetMockQuestion.title = title
  targetMockQuestion.content = content
  targetMockQuestion.question_image_url = image_url || ""
  targetMockQuestion.skills = skills

  targetMockQuestion.modified_date = dayjs(modifiedDate).format(
    "YYYY-MM-DDTHH:mm:ss",
  )
}
