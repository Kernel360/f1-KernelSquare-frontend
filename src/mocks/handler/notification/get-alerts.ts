import { GetAlertListResponse } from "@/interfaces/dto/sse/get-alret-list"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const getAlerts = http.get<
  PathParams,
  DefaultBodyType,
  GetAlertListResponse
>(`${process.env.NEXT_PUBLIC_SSE}${RouteMap.alert.getAlertList}`, async () => {
  return HttpResponse.json(
    {
      code: 6140,
      msg: "나의 알림 모두 조회 성공",
      data: {
        personal_alert_list: [
          {
            id: "alt_w258JhuskFjRwq2n",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T11:01:45Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "X테스트X",
              questionId: "359",
            },
          },
          {
            id: "alt_ybgeUI54Cw67ykkX",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T13:12:38Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "자바덕",
              questionId: "359",
            },
          },
          {
            id: "alt_Zm4xnaCjkto4sUxv",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T13:14:18Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "자바덕",
              questionId: "359",
            },
          },
          {
            id: "alt_nyYBC3cLvbSrB5IM",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T13:16:00Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "자바덕",
              questionId: "359",
            },
          },
          {
            id: "alt_EiFj23yFFDre3pxx",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T13:21:18Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "자바덕",
              questionId: "359",
            },
          },
          {
            id: "alt_R3cWFkw9pnmukm4R",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T13:23:30Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "자바덕",
              questionId: "359",
            },
          },
          {
            id: "alt_0W45KVIYCrpWBE8s",
            alert_type: "QUESTION_REPLY",
            recipient: "ryan",
            send_time: "2024-03-26T14:05:48Z",
            payload: {
              questionTitle: "SSE 알림 테스트 입니다",
              sender: "자바덕",
              questionId: "359",
            },
          },
          {
            id: "alt_eSJI6yIg3V8Ep0mR",
            alert_type: "RANK_ANSWER",
            recipient: "ryan",
            send_time: "2024-04-03T17:00:03Z",
            payload: {
              questionTitle: "SSE 알림 확인용 게시글입니다.",
              rank: "1",
              questionId: "365",
            },
          },
          {
            id: "alt_2fSOfBqER5xuwrqp",
            alert_type: "RANK_ANSWER",
            recipient: "ryan",
            send_time: "2024-04-03T17:00:03Z",
            payload: {
              questionTitle:
                "Blue Green 배포에 대하여 최대한 상세하게 답변해주세요.",
              rank: "1",
              questionId: "368",
            },
          },
          {
            id: "alt_2fSOfBqAQ1xuwrqp",
            alert_type: "COFFEE_CHAT_REQUEST",
            recipient: "ryan",
            send_time: "2024-04-03T17:01:00Z",
            payload: {
              sender: mockUsers[2].nickname,
              senderId: mockUsers[2].id,
            },
          },
        ],
      },
    },
    {
      status: HttpStatusCode.Ok,
    },
  )
})
