import { ApiStatus } from "@/constants/response/api"
import { GetCodingMeetingDetailResponse } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockCodingMeetingDetailApi = http.get<
  { coding_meeting_token: string },
  DefaultBodyType,
  GetCodingMeetingDetailResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.codingMeeting.getCodingMeetingDetail()}`,
  async ({ params }) => {
    // 모각코 상세
    const codingMeetingToken = params.coding_meeting_token

    const targetCodingMeeting = mockCodingMeetings.find(
      (codingMeeting) =>
        codingMeeting.coding_meeting_token === codingMeetingToken,
    )

    if (!targetCodingMeeting) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "해당 모각코를 찾을 수 없습니다",
        },
        { status: HttpStatusCode.NotFound },
      )
    }

    const { Code, HttpStatus } =
      ApiStatus.CodingMeetings.getCodingMeetingDetail.Ok

    return HttpResponse.json(
      {
        code: Code,
        msg: "모각코 상세 조회 성공",
        data: {
          ...targetCodingMeeting,
        },
      },
      { status: HttpStatus },
    )
  },
)
