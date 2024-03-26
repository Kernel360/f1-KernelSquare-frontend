import { GetQnaSEOResponse } from "@/interfaces/dto/seo/get-qna-seo-list"
import { apiInstance } from "./axios"
import { GetCodingMeetingSEOResponse } from "@/interfaces/dto/seo/get-coding-meeting-seo-list"

export async function getQnaSEOList() {
  const res = await apiInstance.get<GetQnaSEOResponse>("/api/v1/questions/seo")

  return res
}

export async function getCodingMeetingSEOList() {
  const res = await apiInstance.get<GetCodingMeetingSEOResponse>(
    "/api/v1/coding-meetings/seo",
  )

  return res
}
