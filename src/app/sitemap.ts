import { GetCodingMeetingSEOResponse } from "@/interfaces/dto/seo/get-coding-meeting-seo-list"
import { GetQnaSEOResponse } from "@/interfaces/dto/seo/get-qna-seo-list"
import { serializeCmToken } from "@/page/coding-meetings/util/cm-token"
import { getCodingMeetingSEOList, getQnaSEOList } from "@/service/seo"
import { AxiosResponse } from "axios"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const qnaSEOListPayload = await getQnaSEOList()
  const getCodingMeetingSEOListPayload = await getCodingMeetingSEOList()

  return [
    {
      url: "https://kernelsquare.live",
    },
    ...createQnaSEO(qnaSEOListPayload),
    ...createCodingMeetingSEO(getCodingMeetingSEOListPayload),
    {
      url: "https://kernelsquare.live/faq",
    },
  ]
}

function createQnaSEO(
  res: AxiosResponse<GetQnaSEOResponse, any>,
): MetadataRoute.Sitemap {
  const baseQnaSEO: MetadataRoute.Sitemap = [
    { url: "https://kernelsquare.live/qna?page=0" },
  ]

  const list = res.data.data?.question_id_list

  return list?.length
    ? [
        ...baseQnaSEO,
        ...list.map(({ question_id }) => ({
          url: `https://kernelsquare.live/question/${question_id}`,
        })),
      ]
    : [...baseQnaSEO]
}

function createCodingMeetingSEO(
  res: AxiosResponse<GetCodingMeetingSEOResponse, any>,
): MetadataRoute.Sitemap {
  const baseCodingMeetingSEO: MetadataRoute.Sitemap = [
    {
      url: `https://kernelsquare.live/coding-meetings?page=0&amp;size=10&amp;filter=all`,
    },
  ]

  const list = res.data.data?.coding_meeting_token_list

  return list?.length
    ? [
        ...baseCodingMeetingSEO,
        ...list.map(({ coding_meeting_token }) => ({
          url: `https://kernelsquare.live/coding-meetings/${serializeCmToken(
            coding_meeting_token,
          )}`,
        })),
      ]
    : [...baseCodingMeetingSEO]
}
