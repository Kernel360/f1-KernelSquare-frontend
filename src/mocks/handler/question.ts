import { APIPagenationResponse } from "@/interfaces/dto/api-response"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const questionHandler = [
  http.get<PathParams, DefaultBodyType, APIPagenationResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.getQuestionList}`,
    () => {
      return HttpResponse.json(
        {
          status: HttpStatusCode.Ok,
          msg: "성공",
          data: {
            nextPage: null,
            payload: "payload",
          },
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
]
