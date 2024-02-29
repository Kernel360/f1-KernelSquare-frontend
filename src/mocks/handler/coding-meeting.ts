import { ApiStatus } from "@/constants/response/api"
import type {
  BaseCodingMeeting,
  MockCodingMeeting,
} from "@/interfaces/coding-meetings"
import type {
  CodingMeetingListFilter,
  GetCodingMeetingListRequest,
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
import { GetCodingMeetingDetailResponse } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"
import { GetCodingMeetingCommentListResponse } from "@/interfaces/dto/coding-meeting/comment/get-coding-meeting-comment-list.dto"
import { CloseCodingMeetingResponse } from "@/interfaces/dto/coding-meeting/close-coding-meeting.dto"
import {
  UpdateCodingMeetingCommentRequest,
  UpdateCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/update-coding-meeting-comment.dto"
import { DeleteCodingMeetingCommentResponse } from "@/interfaces/dto/coding-meeting/comment/delete-coding-meeting-comment.dto"
import {
  CreateCodingMeetingCommentRequest,
  CreateCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/create-coding-meeting-comment.dto"
import jwt, { JwtPayload } from "jsonwebtoken"

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
  // 특정 모각코 모집글 조회
  http.get<
    { coding_meeting_token: string },
    DefaultBodyType,
    GetCodingMeetingDetailResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.getCodingMeetingDetail()}`,
    async ({ params }) => {
      try {
        const codingMeetingToken = params.coding_meeting_token

        if (!codingMeetingToken) {
          const { Code, HttpStatus } =
            ApiStatus.CodingMeetings.getCodingMeetingDetail.BadRequest

          return HttpResponse.json(
            {
              code: Code,
              msg: "잘못된 요청입니다",
            },
            { status: HttpStatus },
          )
        }

        const targetCodingMeeting = mockCodingMeetings.find(
          (post) => post.coding_meeting_token === codingMeetingToken,
        )

        if (!targetCodingMeeting) {
          const { Code, HttpStatus } =
            ApiStatus.CodingMeetings.getCodingMeetingDetail.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "존재하지 않는 모각코 일정입니다",
            },
            { status: HttpStatus },
          )
        }

        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.getCodingMeetingDetail.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "모각코 일정을 조회했습니다.",
            data: {
              ...targetCodingMeeting,
            },
          },
          { status: HttpStatus },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.getCodingMeetingDetail.InternalServerError

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
      const { ...createPayload } = await request.json()

      const header = request.headers
      const header_token = header.get("Authorization")

      if (!header_token) {
        const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.Unauthorized
        return HttpResponse.json(
          {
            code: Code,
            msg: "인증된 유저가 아닙니다",
          },
          { status: HttpStatus },
        )
      }

      const decoded_token = jwt.decode(header_token) as JwtPayload & {
        id: number
      }

      const targetMember = mockUsers.find(
        (user) => user.id === decoded_token.id,
      )

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

      const newCodingMeetingPost: MockCodingMeeting = {
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

      mockCodingMeetings.push(newCodingMeetingPost)

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
  http.put<
    { coding_meeting_token: string },
    DefaultBodyType,
    CloseCodingMeetingResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.closeCodingMeeting()}`,
    async ({ params }) => {
      // 모각코 마감
      const codingMeetingToken = params.coding_meeting_token

      const targetCodingMeeting = mockCodingMeetings.find(
        (codingMeeting) =>
          codingMeeting.coding_meeting_token === codingMeetingToken,
      )

      if (targetCodingMeeting) {
        targetCodingMeeting.coding_meeting_closed = true
      }

      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.closeCodingMeeting.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "모각코 마감 성공",
        },
        { status: HttpStatus },
      )
    },
  ),
  http.get<
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
  ),
  http.get<
    { coding_meeting_token: string },
    DefaultBodyType,
    GetCodingMeetingCommentListResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.getCodingMeetingCommentList()}`,
    async ({ params }) => {
      // 댓글 조회
      const codingMeetingToken = params.coding_meeting_token

      const targetCodingMeeting = mockCodingMeetings.find(
        (codingMeeting) =>
          codingMeeting.coding_meeting_token === codingMeetingToken,
      )

      if (!targetCodingMeeting) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.getCodingMeetingComments.NotFound

        return HttpResponse.json(
          {
            code: Code,
            msg: "모각코 댓글을 찾을 수 없습니다",
          },
          { status: HttpStatus },
        )
      }

      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.getCodingMeetingComments.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "모각코 댓글 조회 성공",
          data: [...targetCodingMeeting.comments],
        },
        { status: HttpStatus },
      )
    },
  ),
  http.post<
    PathParams,
    CreateCodingMeetingCommentRequest,
    CreateCodingMeetingCommentResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.codingMeeting.createCodingMeetingComment}`,
    async ({ request }) => {
      const header = request.headers
      const token = header.get("Authorization")

      const { coding_meeting_comment_content, coding_meeting_token } =
        await request.json()

      if (!token) {
        return HttpResponse.json(
          {
            code: -1,
            msg: "로그인이 필요합니다",
          },
          { status: HttpStatusCode.Unauthorized },
        )
      }

      const { id } = jwt.decode(token.replace("Bearer ", "")) as JwtPayload & {
        id: number
      }
      const targetUser = mockUsers.find((user) => user.id === id)

      const targetCodingMeeting = mockCodingMeetings.find(
        (codingMeeting) =>
          codingMeeting.coding_meeting_token === coding_meeting_token,
      )

      if (targetCodingMeeting) {
        targetCodingMeeting.comments.push({
          member_id: targetUser!.id,
          member_nickname: targetUser!.nickname,
          member_level: targetUser!.level,
          member_level_image_url: badge_url[targetUser!.level],
          member_profile_url: targetUser!.image_url,
          coding_meeting_comment_token: `CT-${
            10000 + targetCodingMeeting.comments.length
          }`,
          coding_meeting_comment_content,
          created_date: new Date().toISOString(),
        })

        return HttpResponse.json(
          {
            code: -1,
            msg: "댓글 생성 성공",
          },
          { status: HttpStatusCode.Ok },
        )
      }

      return HttpResponse.json(
        {
          code: -1,
          msg: "해당 모각코를 찾을 수 없습니다",
        },
        { status: HttpStatusCode.NotFound },
      )
    },
  ),
  http.put<
    { coding_meeting_comment_token: string },
    Pick<UpdateCodingMeetingCommentRequest, "coding_meeting_comment_content">,
    UpdateCodingMeetingCommentResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.updateCodingMeetingComment()}`,
    async ({ request, params }) => {
      // 댓글 업데이트
      const { coding_meeting_comment_content } = await request.json()
      const codingMeetingCommentToken = params.coding_meeting_comment_token

      let targetCommentIndex = -1

      const targetCodingMeeting = mockCodingMeetings.find((codingMeeting) => {
        const { comments } = codingMeeting

        const commentIndex = comments.findIndex(
          (comment) =>
            comment.coding_meeting_comment_token === codingMeetingCommentToken,
        )

        if (commentIndex > -1) {
          targetCommentIndex = commentIndex
        }

        return commentIndex > -1
      })

      if (targetCommentIndex > -1) {
        targetCodingMeeting!.comments[
          targetCommentIndex
        ].coding_meeting_comment_content = coding_meeting_comment_content

        return HttpResponse.json(
          {
            code: -1,
            msg: "모각코 댓글 수정 성공",
          },
          { status: HttpStatusCode.Ok },
        )
      }

      return HttpResponse.json(
        {
          code: -1,
          msg: "모각코 댓글을 찾을 수 없습니다",
        },
        { status: HttpStatusCode.NotFound },
      )
    },
  ),
  http.delete<
    { coding_meeting_comment_token: string },
    DefaultBodyType,
    DeleteCodingMeetingCommentResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.codingMeeting.deleteCodingMeetingComment()}`,
    async ({ params }) => {
      // 댓글 삭제
      const codingMeetingCommentToken = params.coding_meeting_comment_token

      let targetCommentIndex = -1

      const targetCodingMeeting = mockCodingMeetings.find((codingMeeting) => {
        const { comments } = codingMeeting

        const commentIndex = comments.findIndex(
          (comment) =>
            comment.coding_meeting_comment_token === codingMeetingCommentToken,
        )

        if (commentIndex > -1) {
          targetCommentIndex = commentIndex
        }

        return commentIndex > -1
      })

      if (targetCommentIndex > -1) {
        targetCodingMeeting!.comments.splice(targetCommentIndex, 1)

        return HttpResponse.json(
          {
            code: -1,
            msg: "모각코 댓글 삭제 성공",
          },
          { status: HttpStatusCode.Ok },
        )
      }

      return HttpResponse.json(
        {
          code: -1,
          msg: "모각코 댓글을 찾을 수 없습니다",
        },
        { status: HttpStatusCode.NotFound },
      )
    },
  ),
]
