import { ApiStatus } from "@/constants/response/api"
import type {
  BaseCodingMeeting,
  MockCodingMeeting,
} from "@/interfaces/coding-meetings"
import type {
  CodingMeetingListFilter,
  GetCodingMeetingListResponse,
} from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import mockCodingMeetings from "../db/coding-meetings"
import type {
  CreateCodingMeetingRequest,
  CreateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { mockUsers } from "../db/user"
import { HttpStatusCode } from "axios"
import dayjs from "dayjs"
import badge_url from "@/assets/images/badges"
import type { DeleteCodingMeetingResponse } from "@/interfaces/dto/coding-meeting/delete-coding-meeting.dto"
import type {
  UpdateCodingMeetingRequest,
  UpdateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"

export const codingMeetingHandler = [
  // 모든 모각코 모집글 조회
  http.get<PathParams, DefaultBodyType, GetCodingMeetingListResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.codingMeeting.getCodingMeetingList}`,
    async ({ request }) => {
      try {
        const url = new URL(request.url)

        const page = Number(url.searchParams.get("page"))
        const perPage = Number(url.searchParams.get("size"))

        const filter = url.searchParams.get(
          "filter",
        ) as CodingMeetingListFilter | null

        const invalidQueries = []

        // page는 0부터 시작
        if (page < 0 || Number.isNaN(page)) invalidQueries.push("page")
        if (perPage <= 0 || Number.isNaN(perPage)) invalidQueries.push("size")
        if (
          filter &&
          filter !== "all" &&
          filter !== "open" &&
          filter !== "closed"
        ) {
          invalidQueries.push("filter")
        }

        if (invalidQueries.length) {
          const { Code, HttpStatus } =
            ApiStatus.CodingMeetings.getCodingMeetingList.BadRequest

          return HttpResponse.json(
            { code: Code, msg: "잘못된 요청입니다" },
            { status: HttpStatus },
          )
        }

        // 20페이지 이상의 페이지네이션 테스트 목적
        const targetList = [
          ...mockCodingMeetings.map((mockReservation) => {
            const { ...reservation } = mockReservation

            return { ...reservation }
          }),
          ...Array.from({ length: 200 }).map((_, index) => {
            const target = { ...mockCodingMeetings[0] }

            target.coding_meeting_token = "TMT" + (10000 + index)

            return target
          }),
        ].filter(({ coding_meeting_closed }) => {
          if (!filter || filter === "all") {
            return true
          }
          if (filter === "open") return coding_meeting_closed === false
          if (filter === "closed") return coding_meeting_closed === true

          return true
        })

        const { pages, maximumPage } = generatePagination<BaseCodingMeeting>(
          targetList,
          { perPage: 10 },
        )

        const pagePayload = pages[page] ?? []

        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.getCodingMeetingList.Ok

        if (mockCodingMeetings.length && !pagePayload?.length) {
          return HttpResponse.json(
            {
              code: Code,
              msg: "모각코 전체 조회 성공",
              data: {
                pagination: {
                  total_page: 0,
                  pageable: 10,
                  is_end: false,
                },
                list: [],
              },
            },
            { status: HttpStatus },
          )
        }

        return HttpResponse.json(
          {
            code: Code,
            msg: "모각코 전체 조회 성공",
            data: {
              pagination: {
                total_page: maximumPage,
                pageable: pagePayload.length,
                is_end: page === maximumPage - 1,
              },
              list: [...pagePayload],
            },
          },
          { status: HttpStatus },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.getCodingMeetingList.InternalServerError

        return HttpResponse.json(
          {
            code: Code,
            msg: "서버 오류",
          },
          { status: HttpStatus },
        )
      }
    },
  ),
  // 모각코 모집글 생성
  http.post<
    PathParams,
    CreateCodingMeetingRequest,
    CreateCodingMeetingResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.codingMeeting.createCodingMeeting}`,
    async ({ request }) => {
      const { member_id, ...createPayload } = await request.json()

      const targetMember = mockUsers.find((member) => member.id === member_id)

      if (!targetMember) {
        return HttpResponse.json(
          {
            code: -1,
            msg: "답변을 입력할 권한이 없습니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const token = "CMT" + (mockCodingMeetings.length + 10000)

      const newCoffeeChatPost: MockCodingMeeting = {
        member_id: targetMember.id,
        member_level: targetMember.level,
        member_nickname: targetMember.nickname,
        member_profile_url: targetMember.image_url,
        member_level_image_url: badge_url[targetMember.level],
        created_date: dayjs().format(),
        coding_meeting_token: token,
        ...createPayload,
        coding_meeting_closed: false,
        comments: [],
      }

      mockCodingMeetings.push(newCoffeeChatPost)

      return HttpResponse.json(
        {
          code: 5144,
          msg: "모각코 생성 성공",
          data: { coding_meeting_token: token },
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  // 모각코 모집글 삭제
  http.delete<
    { coding_meeting_token: string },
    DefaultBodyType,
    DeleteCodingMeetingResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.deleteCodingMeeting()}`,
    async ({ params }) => {
      const targetPost = mockCodingMeetings.findIndex(
        (post) => post.coding_meeting_token === params.coding_meeting_token,
      )

      mockCodingMeetings.splice(targetPost, 1)

      return HttpResponse.json(
        {
          code: 5144,
          msg: "모각코 삭제 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  // 모각코 모집글 수정
  http.put<
    { coding_meeting_token: string },
    UpdateCodingMeetingRequest,
    UpdateCodingMeetingResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.updateCodingMeeting()}`,
    async ({ params, request }) => {
      try {
        const header = request.headers
        const token = header.get("Authorization")

        if (!token) {
          const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.Unauthorized
          return HttpResponse.json(
            {
              code: Code,
              msg: "인증된 유저가 아닙니다",
            },
            { status: HttpStatus },
          )
        }

        const targetToken = params.coding_meeting_token

        const updatePayload = await request.json()

        const targetMockIdx = mockCodingMeetings.findIndex(
          (post) => post.coding_meeting_token === targetToken,
        )

        if (targetMockIdx < 0) {
          const { Code, HttpStatus } =
            ApiStatus.CodingMeetings.updateCodingMeeting.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "존재하지 않는 질문",
            },
            { status: HttpStatus },
          )
        }

        mockCodingMeetings[targetMockIdx] = {
          ...mockCodingMeetings[targetMockIdx],
          ...updatePayload,
        }

        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.updateCodingMeeting.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "질문 수정 성공",
          },
          { status: HttpStatus },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.updateCodingMeeting.InternalServerError

        return HttpResponse.json(
          {
            code: Code,
            msg: "서버 오류",
          },
          { status: HttpStatus },
        )
      }
    },
  ),
]
